"""Validate both build modes and confirm publication changes leave body/assets intact."""
import hashlib, json, xml.etree.ElementTree as ET, zipfile
from html.parser import HTMLParser
from pathlib import Path

class Head(HTMLParser):
    def __init__(self):super().__init__();self.robots=[];self.canonical=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='meta' and a.get('name')=='robots':self.robots.append(a.get('content'))
        if tag=='link' and a.get('rel')=='canonical':self.canonical.append(a.get('href'))

origin='https://efactory-english-site.pages.dev'
routes=['/','/services/','/pricing/','/about/','/ecu-tuning/','/faq/','/contact/']
results=[]
with zipfile.ZipFile('/workspace/efactory-pages-upload.zip') as baseline:
    old_assets={n:hashlib.sha256(baseline.read(n)).hexdigest() for n in baseline.namelist() if n.startswith('_astro/')}
    for directory,production in [('dist-production',True),('dist',False)]:
        root=Path(directory)
        for route in routes:
            name=route.lstrip('/')+'index.html'; html=(root/name).read_text();head=Head();head.feed(html)
            assert head.robots==['index, follow' if production else 'noindex, nofollow'], (directory,route,head.robots)
            assert head.canonical==[origin+route],(directory,route,head.canonical)
            old_body=baseline.read(name).decode().split('<body',1)[1];new_body=html.split('<body',1)[1]
            assert new_body==old_body,('Visible HTML body changed',directory,route)
        xml=ET.fromstring((root/'sitemap.xml').read_bytes())
        assert xml.tag=='{http://www.sitemaps.org/schemas/sitemap/0.9}urlset'
        locs=[e.text for e in xml.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
        assert len(locs)==7 and set(locs)=={origin+r for r in routes}
        robots=(root/'robots.txt').read_text();headers=(root/'_headers').read_text()
        if production:
            assert 'Disallow: /' not in robots
            for agent in ['Googlebot','Bingbot','OAI-SearchBot','*']:assert 'User-agent: '+agent+'\nAllow: /' in robots
            assert 'Sitemap: '+origin+'/sitemap.xml' in robots
            assert headers=='https://:preview.efactory-english-site.pages.dev/*\n  X-Robots-Tag: noindex, nofollow\n'
        else:
            assert robots=='User-agent: *\nDisallow: /\n'
            assert headers=='/*\n  X-Robots-Tag: noindex, nofollow\n'
        assets={str(p.relative_to(root)):hashlib.sha256(p.read_bytes()).hexdigest() for p in (root/'_astro').rglob('*') if p.is_file()}
        assert assets==old_assets,('Delivery images or styles changed',directory)
        results.append(dict(build=directory,mode='production' if production else 'preview',pages=7,canonicalURLs='pass',metaRobots='pass',sitemap='pass',robots='pass',headersFile='pass',visibleHTMLBodyUnchanged=True,assetsByteIdentical=True,assetCount=len(assets)))
Path('docs/search-build-check.json').write_text(json.dumps(results,indent=2)+'\n');print(json.dumps(results,indent=2))
