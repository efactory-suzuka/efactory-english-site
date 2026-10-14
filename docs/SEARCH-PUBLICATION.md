# 検索エンジン・AI検索向け公開設定の修正

**追記：公開更新後の全7ページ・robots・サイトマップ実測は成功。[SEARCH-VERIFIED.md](SEARCH-VERIFIED.md)を参照。以下の公開未反映・未検証記述は修正ZIP作成時点の記録。プレビューの新デプロイURL検証のみ未了。**

2026-10-14（日本時間）。対象： https://efactory-english-site.pages.dev/

## 修正した設定

- 公開版の全7ページのmeta robotsを `index, follow` に変更。
- 公開版robots.txtの `Disallow: /` を解除。Googlebot、Bingbot、OAI-SearchBotとその他のクローラーを `Allow: /` で案内し、Sitemap URLを追加。
- 全7ページに正式公開URLのcanonicalを1件ずつ追加。末尾スラッシュを統一。
- 実際のXML形式の `/sitemap.xml` を追加。全7URLをナビ情報から生成するため、別途URLリストを維持しない。
- 既定の `npm run build` と `npm run build:preview` は検索禁止を維持。metaはnoindex/nofollow、robotsはDisallow、配信用_headersもX-Robots-Tag noindex/nofollow。
- `npm run build:production` のみ検索公開用。出力は `dist-production`。プレビュー用 `dist` と分離し、ZIPを取り違えない構造。
- 公開版の_headersは `https://:preview.efactory-english-site.pages.dev/*` にのみ `X-Robots-Tag: noindex, nofollow` を指定。Cloudflareのハッシュ付き・ブランチ別プレビューURLを対象とし、正式公開ホストは対象外。公開用ビルドがプレビューURLで配られても、レスポンスヘッダーで検索禁止とする。
- robots.txtとsitemap.xmlはAstro静的エンドポイント。外部サービス・予約システム・DB・画像・本文を変更しない。

プレビュー用ビルドはrobots自体も禁止。公開用ビルドをCloudflareのプレビューホストで見る場合、静的robotsは公開版と共通だが、X-Robots-Tagによりインデックスを禁止する。ホスト別ヘッダーの実適用はCloudflareで更新後に検証する。

## 公開サイトの更新前実測

Googlebot・Bingbot・OAI-SearchBot・通常ブラウザのUser-Agentをそれぞれ指定し、7HTML・robots.txt・sitemap.xmlへ計36件のHTTPSリクエストを実施。TLS検証有効。結果は `search-before.json`。

| 公開ページ | HTTP（全4 User-Agent） | meta robots | X-Robots-Tag | canonical | HTML本文 |
| --- | --- | --- | --- | --- | --- |
| HOME `/` | 200 | noindex, nofollow | なし | なし | 取得済み |
| Services `/services/` | 200 | noindex, nofollow | なし | なし | 取得済み |
| Pricing `/pricing/` | 200 | noindex, nofollow | なし | なし | 取得済み |
| About `/about/` | 200 | noindex, nofollow | なし | なし | 取得済み |
| ECU Flashing `/ecu-tuning/` | 200 | noindex, nofollow | なし | なし | 取得済み |
| FAQ `/faq/` | 200 | noindex, nofollow | なし | なし | 取得済み |
| Contact `/contact/` | 200 | noindex, nofollow | なし | なし | 取得済み |

robots.txtはHTTP 200で `User-agent: * / Disallow: /`。
sitemap.xmlもHTTP 200だがContent-Typeがtext/htmlでHOME本文が返る。サイトマップファイルが存在せず、Cloudflareのフォールバック応答になっている。200だけをもってサイトマップ成功と判断していない。

この検証はUser-Agentを指定したHTTPアクセス。実際のGoogle/Bing/OpenAIのクローラー送信元IPからのアクセス、CloudflareのBot/WAF設定、検索への登録・採用は確認していない。

## 修正版のビルド・ローカルHTTP検証

公開・プレビュー両ビルド成功。全7ページのmetaとcanonical、XMLの名前空間と7URL、robots、_headersの条件を検証済み。結果は `search-build-check.json`。

**全7ページのbodyが旧公開ZIPと完全一致、画像・CSSなど52個の配信用ファイルもSHA-256で完全一致。** デザイン、写真、料金、サービス説明、問い合わせ・予約関連の表示・リンクは変更していない。

公開用ビルドをローカルHTTPで配信し、全7HTML、robots.txt、sitemap.xmlでHTTP 200を実測。HTMLのmetaはindex/follow、canonicalは各正式公開URL。robotsはtext/plainで許可、sitemapはXML Content-TypeとXML本文で7件。結果は `search-local-http.json`。

ローカルAstroサーバーはCloudflare固有の_headersを適用しないため、CloudflareプレビューホストのX-Robots-Tag適用はローカル検証済みとは扱わない。

## 公開反映の状況と次の操作

修正版ZIP： `/workspace/efactory-pages-search-ready.zip`。
ZIP直下にindex.html、各ページ、robots.txt、sitemap.xml、_headers、配信用画像・CSSを含む。破損チェック済み。

現在のCloudflareプロジェクトは直接アップロード方式。この環境にはCloudflareの書き込み認証・操作ツールがないため、**修正版の公開反映はまだ実施していない**。ユーザーが同じ **efactory-english-site Pagesプロジェクト → Create deployment → Production** へこのZIPをアップロードする。新規プロジェクト、既存Workers/D1、日本語サイト、DNSの変更は不要。

更新完了後、以下を実施する：

1. `python3 scripts/check-public-search.py --label after` で公開サイト全7ページ・robots・sitemapを4 User-Agentで再取得。
2. 全ページのHTTP 200、HTML本文、index/follow、正式canonical、X-Robots-Tagにnoindex/nofollowがないことを確認。
3. robots.txtの許可、Sitemap記載、sitemap.xmlのXML本文と7URLを確認。
4. 新しいデプロイ専用URLでも7ページを取得し、X-Robots-Tag noindex/nofollowを確認する。デプロイ専用URLは管理画面から取得する。
5. Cloudflare側で追加の検索・AI Botブロックがある場合は結果を報告する。未確認の設定を勝手に変更しない。

公開サイト更新後の実測はまだ未了。ローカル成功を公開反映済みと報告しない。Search ConsoleやBing Webmasterへの送信は今回未実施。
