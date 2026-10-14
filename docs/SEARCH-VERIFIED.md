# 公開後の検索設定：実測検証結果

検証日時：2026-10-14 11:26（日本時間）
公開URL： https://efactory-english-site.pages.dev/

ユーザーのCloudflareアップロード完了連絡後、公開サイトへHTTPSリクエストを実行し、修正版が反映されたことを確認。TLS検証有効。

## 全7ページの実測

| ページ | HTTP | meta robots | X-Robots-Tag | canonical | HTML本文 |
| --- | --- | --- | --- | --- | --- |
| `/` | 200 | index, follow | なし | 正式URL一致 | 取得成功 |
| `/services/` | 200 | index, follow | なし | 正式URL一致 | 取得成功 |
| `/pricing/` | 200 | index, follow | なし | 正式URL一致 | 取得成功 |
| `/about/` | 200 | index, follow | なし | 正式URL一致 | 取得成功 |
| `/ecu-tuning/` | 200 | index, follow | なし | 正式URL一致 | 取得成功 |
| `/faq/` | 200 | index, follow | なし | 正式URL一致 | 取得成功 |
| `/contact/` | 200 | index, follow | なし | 正式URL一致 | 取得成功 |

各canonicalは `https://efactory-english-site.pages.dev` + 表のパス。7HTMLは修正後の公開用ビルドとSHA-256で完全一致。全7ページの本文も取得でき、クライアントJavaScriptの実行なしでサービス等の文章を読める。

## robots.txtとサイトマップ

- `/robots.txt`：HTTP 200、Content-Type `text/plain; charset=utf-8`。
- Googlebot、Bingbot、OAI-SearchBot、その他のUser-Agentを `Allow: /`。全体の `Disallow: /` は解除済み。
- robotsルールをパーサーで評価し、3Botが全7ページを取得できる許可になっていることを確認。
- Sitemap指定： https://efactory-english-site.pages.dev/sitemap.xml
- `/sitemap.xml`：HTTP 200、Content-TypeはXML。XMLの名前空間を検証し、全7URLの重複なし・過不足なしを確認。
- 以前の「sitemap.xmlがHOMEのHTMLを返す」状態は解消済み。

## 検索Bot向けHTTP応答

通常ブラウザ、Googlebot、Bingbot、OAI-SearchBotの4種類のUser-Agentで、それぞれ7HTML・robots.txt・sitemap.xmlへアクセス。**36リクエストすべてHTTP 200**。各Botの応答にも検索禁止meta・X-Robots-Tagなし、正しいcanonicalとサイトマップを確認。

これはUser-Agentを指定した実測であり、実クローラーの送信元IPからの訪問や検索結果への登録・採用を確認したものではない。Search Console/Bing Webmasterへの送信は今回行っていない。

## 変更していない部分

先のビルド検証で、全7ページのbodyと配信用画像・CSS等52ファイルが旧公開ZIPと完全一致。今回、公開側7HTMLもその修正版ビルドと完全一致した。デザイン、写真、料金、サービス説明、予約関連の表示・リンクは変更していない。

## プレビューの状態

プレビュー用ビルドのnoindex/nofollow、robots Disallow、_headersを検証済み。公開版ZIPには、Cloudflareデプロイ・ブランチ別のプレビューサブドメインだけにX-Robots-Tag noindex/nofollowを返す_headersを含む。

**今回の新しいデプロイ専用URLはまだ提供されておらず、Cloudflare上でのプレビューヘッダー実適用の検証は未了。** 旧デプロイURLの禁止設定を、今回の新しいデプロイの検証として扱わない。

## 保存した測定データ

- `search-after.json`：全36リクエストのHTTP、Content-Type、meta、canonical、ヘッダー、HTMLハッシュ、robots/XML本文。
- `search-after-summary.json`：各User-Agentの検証判定と測定時刻。
- `search-before.json`：更新前の測定結果。
- `search-build-check.json`、`search-local-http.json`：公開・プレビュービルドとローカルHTTP検証。
- `SEARCH-PUBLICATION.md`：実装変更と更新前からの経過。
