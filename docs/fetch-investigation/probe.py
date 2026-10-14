import concurrent.futures,urllib.request,urllib.error,hashlib,json,re,os
from html.parser import HTMLParser
from datetime import datetime,timezone,timedelta
from pathlib import Path
origin='https://efactory-english-site.pages.dev';root=Path('/workspace/efactory-english-site');saved=root/'docs/fetch-investigation';saved.mkdir(exist_ok=True)
routes=['/','/services/','/pricing/','/about/','/ecu-tuning/','/faq/','/contact/']
ua={'browser':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','ChatGPT-User':'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ChatGPT-User/1.0; +https://openai.com/bot)','ChatGPT-User-literal':'ChatGPT-User','Python-default':'Python-urllib/3.11'}
old=json.loads((root/'docs/search-after.json').read_text());baseline={r['url']:r for r in old if r['userAgent']=='browser'}
class Page(HTMLParser):
 def __init__(self):super().__init__();self.main=False;self.text=[];self.robots=[];self.canonical=[]
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if t=='main':self.main=True
  if t=='meta' and a.get('name')=='robots':self.robots.append(a.get('content'))
  if t=='link' and a.get('rel')=='canonical':self.canonical.append(a.get('href'))
 def handle_endtag(self,t):
  if t=='main':self.main=False
 def handle_data(self,d):
  if self.main:self.text.append(d)
class RedirectRecorder(urllib.request.HTTPRedirectHandler):
 def __init__(self):self.events=[]
 def redirect_request(self,req,fp,code,msg,headers,newurl):
  self.events.append({'status':code,'from':req.full_url,'to':newurl});return super().redirect_request(req,fp,code,msg,headers,newurl)
def fetch(job):
 agent,path=job;url=origin+path;redirect=RedirectRecorder();opener=urllib.request.build_opener(redirect)
 row={'url':url,'agent':agent,'userAgent':ua[agent],'at':datetime.now(timezone(timedelta(hours=9))).isoformat()}
 try:
  try:r=opener.open(urllib.request.Request(url,headers={'User-Agent':ua[agent]}),timeout=20)
  except urllib.error.HTTPError as e:r=e
  with r:
   b=r.read();html=b.decode('utf-8',errors='replace');p=Page();p.feed(html);digest=hashlib.sha256(b).hexdigest();text=' '.join(p.text).strip();before=baseline.get(url)
   signals=[s for s in ['<title>Just a moment','cf-chl-','/cdn-cgi/challenge-platform/','Attention Required! | Cloudflare','Sorry, you have been blocked'] if s.lower() in html.lower()]
   row.update(status=r.status,finalURL=r.geturl(),redirects=redirect.events,headers=list(r.headers.items()),sha256=digest,bytes=len(b),contentType=r.headers.get('Content-Type'),metaRobots=p.robots,canonical=p.canonical,mainTextCharacters=len(text),mainTextExcerpt=text[:350],challengeSignals=signals,cfMitigated=r.headers.get('cf-mitigated'),sameHTMLAsPrevious=bool(before and digest==before['sha256']),sameContentTypeAsPrevious=bool(before and r.headers.get('Content-Type')==before['contentType']))
   (saved/(agent+'-'+(path.strip('/').replace('/','-') or 'home')+'.html')).write_text(html)
 except Exception as e:row['error']=str(e)
 return row
jobs=[(a,p) for a in ['browser','ChatGPT-User'] for p in routes]+[('browser','/robots.txt'),('browser','/sitemap.xml'),('ChatGPT-User-literal','/'),('Python-default','/')]
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:rows=list(pool.map(fetch,jobs))
report={'measuredAt':datetime.now(timezone(timedelta(hours=9))).isoformat(),'baseline':'docs/search-after.json (2026-10-14 11:26 JST)','requests':rows,'cloudflareCredentialAvailability':{k:bool(os.environ.get(k)) for k in ['CLOUDFLARE_API_TOKEN','CLOUDFLARE_ACCOUNT_ID','CF_API_TOKEN','CF_ACCOUNT_ID']}}
(saved/'responses.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
for r in rows:print(r['agent'],r['url'][len(origin):],r.get('status',r.get('error')),'bytes',r.get('bytes'),'unchanged',r.get('sameHTMLAsPrevious'),'challenge',r.get('challengeSignals'),'redirect',r.get('redirects'))
print('Saved',saved/'responses.json')
