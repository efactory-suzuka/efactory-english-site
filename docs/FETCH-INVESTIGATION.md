# ChatGPTのCache miss：取得エラー切り分け報告

測定日時：2026-10-14 12:00〜12:01（日本時間）
対象：https://efactory-english-site.pages.dev/
比較対象：2026-10-14 11:26の `SEARCH-VERIFIED.md` と `search-after.json`。

今回は読取り調査のみ。再ビルド・再デプロイ、robots/sitemap修正、Cloudflare設定変更、サイトの表示・写真・料金・本文・予約関連・他プロジェクトの変更は行っていない。以前の検索公開設定作業を再実施していない。

## 1. 前回の検証から変化した点

ブラウザ相当とChatGPT-UserのUser-Agentで現在の7ページを取得し、前回の保存済みSHA-256と比較した。

| ページ | HTTP（両User-Agent） | Content-Type | HTMLサイズ | リダイレクト | 前回本文との比較 |
| --- | --- | --- | --- | --- | --- |
| HOME `/` | 200 | text/html; charset=utf-8 | 20,766 bytes | なし | 完全一致 |
| Services `/services/` | 200 | 同上 | 13,824 bytes | なし | 完全一致 |
| Pricing `/pricing/` | 200 | 同上 | 12,800 bytes | なし | 完全一致 |
| About `/about/` | 200 | 同上 | 8,294 bytes | なし | 完全一致 |
| ECU Flashing `/ecu-tuning/` | 200 | 同上 | 14,936 bytes | なし | 完全一致 |
| FAQ `/faq/` | 200 | 同上 | 10,086 bytes | なし | 完全一致 |
| Contact `/contact/` | 200 | 同上 | 10,530 bytes | なし | 完全一致 |

robots.txtとsitemap.xmlも各1回取得して前回ハッシュと比較し、HTTP 200・Content-Type・本文が一致。meta robotsはindex/follow、canonicalは正常、X-Robots-Tagの検索禁止指定なし。検索設定を再構築する必要を示す変化はない。

現在の全レスポンスヘッダーは `fetch-investigation/responses.json` に保存。成功応答にはCache-Control `public, max-age=0, must-revalidate`、Content-Type、CF-Ray等がある。前回データは全ヘッダーを保存していないため、全ヘッダーの「前回と完全一致」は判定できない。Date・CF-Ray等はリクエストごとに変わる。

新しく発見したのは、Python系User-Agentで403・error code: 1010になる条件。以前の4種類のBot試験にPython標準User-Agentは含まれておらず、新たな劣化と断定できない。

## 2. ChatGPT-UserによるHTTP取得結果

使用したUser-Agent：

`Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ChatGPT-User/1.0; +https://openai.com/bot)`

全7ページHTTP 200、本文のSHA-256が前回と一致。main内の英文も取得。`cf-mitigated: challenge`、チャレンジ用URLやスクリプト、Cloudflareのブロックページ文言は検出されていない。正常なビルドHTMLと完全一致するため、「200で別のエラーページが返る」状態ではない。

CodexのHTTPクライアントから取得したHOME英文の例：

> Your Bike. Your Project. We're Here to Help.
> Motorcycle maintenance, customization and technical support in Suzuka, Japan—for riders from across Japan.

文字列を単に `ChatGPT-User` とした追加のHOME試験も200で同じHTML。

**これはUser-Agentを模倣した試験。OpenAIの実送信元IPからアクセスできる証明ではなく、ChatGPTのWeb取得機能が成功した証明でもない。** 今回のCodexにはそのWeb取得機能を実行するツールがなく、最終成功判定は未完了。

## 3. Cloudflare側のブロック・チャレンジの有無

7ページのブラウザ・ChatGPT-User試験でブロック・チャレンジを観測せず。

一方、HOMEに対する以下の比較では拒否応答を観測：

| 試験 | 結果 | 内容 |
| --- | --- | --- |
| Python-urllib/3.11を明示 | HTTP 403 | text/plain、17 bytes、`error code: 1010` |
| Python 3.12.14の標準urllib User-Agent | HTTP 403 | 同じ17 bytesの1010本文 |
| 同じHTTPクライアントでブラウザUser-Agent | HTTP 200 | 正常な20,766 bytesのHOME HTML |

403の応答にCF-RayとCloudflareのNEL情報があり、チャレンジHTMLではなく明示的な拒否。リクエストはこの環境のプロキシ経由で、Serverヘッダーはenvoy。CF-Ray例：

- Python-urllib/3.11：`a4a35502b918dadc-ORD`
- Python 3.12.14の標準：`a4a356c84ed4d2ec-ORD`
- ブラウザ対照：`a4a356c8da3e34d9-ORD`

User-Agentなどブラウザ識別条件が結果に影響する可能性を示す材料。ただし設定やイベントを読めていないため、Browser Integrity Check、特定WAFルール、共有エッジの制限などのどれかを特定していない。**1010の観測をChatGPT Cache missの原因と同一視しない。**

Cloudflareの管理画面アクセス・API認証・管理コネクターはこの環境にない。そのため以下はすべて未確認：

- WAFルールと該当ルールID
- Bot Fight Mode等の設定・対象
- AI Crawl Control、AI関連Bot制限
- Browser Integrity Check
- Cloudflare Access設定・ログ
- セキュリティイベントとChatGPT失敗との照合
- 国・IP・ASN単位のブロック／チャレンジ

この経路でAccessへのリダイレクトがないことは確認できたが、特定送信元に対するAccessやその他の制限の不存在を証明しない。Cloudflare設定は変更していない。

## 4. 現時点で原因として特定できたこと

確定事項：

- 検査経路では静的サイトのHTML、検索公開設定、正規URL、XMLは正常で前回と同じ。
- ChatGPT-UserというUser-Agentだけを理由に一律に遮断される状態は、今回の試験では再現しない。
- 別のUser-Agent条件では403/1010が再現する。あらゆる取得クライアントに無条件で応答するとは言えない。
- ChatGPTの実際のWeb取得はここでは再現できていない。

**Cache missの原因は未特定。サイト側の特定送信元制限と、ChatGPT側の取得処理の両方が残る。ChatGPT側起因と断定するだけの証拠はない。**

| 候補 | 現在の根拠 | 判断に必要な証拠 |
| --- | --- | --- |
| Cloudflareの送信元IP・ASN・国・Bot識別による拒否 | Python条件で403/1010、ChatGPT-User模擬は200 | ChatGPT実リクエストの時刻・送信元・CF-Rayと、対応するCloudflareイベント |
| ChatGPT取得側のキャッシュ・URL処理の問題 | 一般HTTPで本文が取得できる一方、ユーザー報告はCache miss | ChatGPTのエラー全文・リクエスト識別子・再試行結果・上流HTTP応答 |
| 新規公開URLの発見・登録状況 | 新しいサイトであるが、今回検索登録状況は不明 | 検索管理ツールの登録／巡回情報。個別URL取得への影響を示す追加証拠 |
| ChatGPTのWeb取得機能固有の問題 | 実Web取得だけが失敗すると報告されている | 同じURL・時刻での実取得ログ、別会話・別セッションでの結果 |

Cache missという表示だけでは、サイトが返したHTTPエラーなのか、取得基盤が返したエラーなのか、上流拒否の変換表示なのか区別できない。検索エンジンへの登録と、明示したURLの取得成功は別問題。検索登録だけでこのエラーが直るとは判断しない。

## 5. 原因未特定で不足している証拠

1. ChatGPTで失敗した正確な日本時間、対象URL、エラー全文、取得ツールのrequest/reference ID。
2. 実取得に使われたUser-Agent、送信元IP／ASN、上流ステータス・CF-Ray。Codexの模擬試験からこれらを推測しない。
3. 該当時間帯のCloudflareセキュリティイベント・Accessログと、拒否した機能／ルールID。ログがなくても、ログ対象・保存範囲を確認せず「リクエストが来ていない」と断定しない。
4. 現在の新デプロイ専用URL。今回は未提供で、Cloudflareのデプロイ一覧を取得する権限もなく、プレビューのX-Robots-Tag実測は引き続き未了。古いデプロイURLを新しい版の証拠にしない。

Google Search ConsoleとBing Webmasterへの登録・送信は、**この制作・調査では未実施**。利用者が別途実施済みかは管理権限がなく未確認。

## 6. サイト側で修正が必要か

HTML、robots、サイトマップ、canonical、デザイン・本文を直す必要を示す証拠はない。現在の正常な設定を維持する。

Cloudflareによる条件付き拒否は観測されたが、それがChatGPT実取得を妨げているか未確認。そのためセキュリティ設定変更を必要と判断する段階ではない。再デプロイも不要。

## 7. 必要な場合だけの最小限の対策案

まずCloudflare管理者が読取りで、上記CF-RayとChatGPT失敗時刻を照合する。1010がどの設定から発生したか、実OpenAIリクエストも同じ理由で拒否されたか確認する。

- 実OpenAIリクエストに対する特定ルールの誤検知が確認できた場合のみ、本サイトの対象ホスト・パスと検証済みBot識別に範囲を絞る例外を検討する。変更内容をユーザーへ事前報告し、認可後に実施。User-Agent文字列だけを根拠に無条件許可しない。
- ChatGPT取得側のエラーと確認できた場合、サイト変更はせず、失敗時刻・URL・エラー全文を添えて取得基盤側で再試行／問い合わせする。
- 原因未特定の現時点では、WAF/Bot対策/BIC/AI制御の一律無効化、再デプロイ、robots/sitemapの書換えは行わない。

## 8. ChatGPT側で改めて検証すべきURL

新しい会話で、まずHOMEをURL指定し、実際に取得した英文を引用できるか試す。次に子ページを試す。検索結果のスニペットやこの報告書からの引用を、公開URLから取得した本文として扱わない。

- https://efactory-english-site.pages.dev/
- https://efactory-english-site.pages.dev/services/
- https://efactory-english-site.pages.dev/pricing/
- https://efactory-english-site.pages.dev/about/
- https://efactory-english-site.pages.dev/ecu-tuning/
- https://efactory-english-site.pages.dev/faq/
- https://efactory-english-site.pages.dev/contact/

取得失敗が続く場合の比較用：

- https://efactory-english-site.pages.dev/robots.txt
- https://efactory-english-site.pages.dev/sitemap.xml

**最終成功判定：ChatGPTの実Web取得で公開URLの英文本文が読めること。今回のCodex調査だけでは達成済みと扱わない。**

## 測定資料

`fetch-investigation/responses.json`（18試験の全ヘッダー、HTMLハッシュ、リダイレクト、本文抜粋）、`ua-control.json`（追加対照2試験）、各HTML原文、`probe.py`。保存先はローカル資料で、公開サイトのファイルには追加していない。
