"""Measure public responses without disabling TLS. No deployment mutations."""
import argparse, concurrent.futures, hashlib, json, urllib.request, urllib.error
from html.parser import HTMLParser
from pathlib import Path

class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.robots=[]; self.canonical=[]; self.in_main=False; self.text=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='meta' and a.get('name','').lower() in ['robots','googlebot','bingbot','oai-searchbot']: self.robots.append(a)
        if tag=='link' and a.get('rel')=='canonical': self.canonical.append(a.get('href'))
        if tag=='main': self.in_main=True
    def handle_endtag(self, tag):
        if tag=='main': self.in_main=False
    def handle_data(self, text):
        if self.in_main: self.text.append(text)

def fetch(job):
    path,agent=job; url=BASE+path
    try:
        try: r=urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':AGENTS[agent]}),timeout=25)
        except urllib.error.HTTPError as e: r=e
        with r:
            b=r.read(); body=b.decode('utf-8',errors='replace'); p=Page();p.feed(body)
            row=dict(url=url,userAgent=agent,status=r.status,finalURL=r.geturl(),contentType=r.headers.get('Content-Type'),xRobotsTag=r.headers.get_all('X-Robots-Tag',[]),bytes=len(b),sha256=hashlib.sha256(b).hexdigest(),metaRobots=p.robots,canonical=p.canonical,mainTextCharacters=len(' '.join(p.text).strip()))
            if path in ['/robots.txt','/sitemap.xml']:row['body']=body
            SAVED.mkdir(parents=True,exist_ok=True);(SAVED/(agent+'-'+(path.strip('/').replace('/','-') or 'home')+'.txt')).write_text(body)
            return row
    except Exception as e:return dict(url=url,userAgent=agent,error=str(e))

args=argparse.ArgumentParser();args.add_argument('--label',required=True);opts=args.parse_args()
BASE='https://efactory-suzuka.github.io/efactory-english-site'
AGENTS={'browser':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','Googlebot':'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)','Bingbot':'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)','OAI-SearchBot':'OAI-SearchBot/1.3; +https://openai.com/searchbot'}
SAVED=Path('/tmp/efactory-search-'+opts.label)
paths=['/','/services/','/pricing/','/about/','/ecu-tuning/','/faq/','/contact/','/robots.txt','/sitemap.xml']
jobs=[(path,agent) for agent in AGENTS for path in paths]
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool: results=list(pool.map(fetch,jobs))
out=Path('docs/search-'+opts.label+'.json');out.write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n')
for r in results:print(r['userAgent'],r['url'].split(BASE)[-1],r.get('status',r.get('error')),r.get('xRobotsTag'),r.get('mainTextCharacters'))
print('Saved',out)
