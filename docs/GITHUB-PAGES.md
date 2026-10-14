# GitHub Pagesへの移行

2026-10-14（日本時間）。ユーザーからGitHub Pagesへの変更を指示されたため、この独立リポジトリだけを移行対象にする。

公開予定URL： https://efactory-suzuka.github.io/efactory-english-site/

## 実装

- Astro siteをGitHubのホストへ変更。正式ビルドのbaseは `/efactory-english-site/`。
- 内部リンクと画像をプロジェクトの配下へ配置。ナビの現在地、日本語へのページ別リンクも維持。
- canonicalと7URLのサイトマップを新URLへ変更。
- `.nojekyll` を生成し、GitHub Pagesで `_astro` の画像・CSSを配信可能にする。
- 正式版はindex/follow。既定・プレビュービルドはnoindex/nofollowを維持。
- GitHub Pagesで適用されないCloudflare固有の_headersは移行用公開ファイルに含めない。
- mainはソース、gh-pagesはビルドした静的ファイルだけ。GitHub設定でgh-pagesを選ぶと、以後そのブランチへのpushで公開処理が実行される。
- Cloudflare、日本語サイト、他リポジトリ、DNS、Workers/D1、予約システムは変更しない。

## 品質確認

- 既存20件のブラウザテスト通過。
- GitHub Pages用の正式ビルドで全7ページを375pxと1280pxでレンダリング。HTTP 200、全画像読込、全内部リンク、横スクロールなし、canonical、日本語ボタンを確認。
- robotsと7URLのXMLサイトマップを確認。
- 全7ページの表示本文はURLのbaseと画像URLの生成名以外が旧公開版と一致。
- 配信用画像・CSS等52ファイルは内容のSHA-256で旧公開版と一致。元画像19点も維持。
- 結果： `github-pages-check.json`、`github-pages-content-check.json`。

## 初回のGitHub設定

この環境のGitHub管理APIはForbiddenで、Pages設定の読取り・変更は実行できない。Git接続は利用可能。ソースと公開用ブランチをpushした後、ユーザーが以下を設定する。

1. https://github.com/efactory-suzuka/efactory-english-site/settings/pages を開く。
2. Build and deployment → Source を **Deploy from a branch** にする。
3. Branchを **gh-pages**、フォルダを **/(root)** にしてSave。
4. GitHubの公開処理の完了を待つ。設定画面の公開URLを確認する。

設定前の予定URLを、公開成功済みURLとして報告しない。この環境から公開ホストへのリクエストは現時点でプロキシ403となり、外部実測も未了。

## robotsの設置場所

プロジェクト配下のrobots.txtは生成するが、検索Botが参照するのは通常ホスト直下の `/robots.txt`。この専用リポジトリからホスト直下は管理できない。他の既存リポジトリを変更せず、公開後にホスト直下のrobots応答を確認する。canonical・XMLサイトマップ・metaによる検索公開設定は実装済み。

## Cloudflareからの切替

GitHubでの公開確認後に、案内リンク・日本語サイトのEnglishリンクを新URLに変更する。Cloudflareサイトの削除やリダイレクト設定は今回は行わない。移行完了後の重複公開の扱いは、ユーザーへ具体案を提示して決める。

ChatGPTのCache missがGitHub移行で解消するかは未確認。CodexのHTTP成功を実ChatGPTの取得成功として扱わない。

## GitHubへの保存結果

ソースのmainへのpush成功（初回ソースコミット `feaddb315227980b28cb7cd00849582907b3a479`）。
公開ファイルのgh-pagesへのpush成功（`a587d3ed3fdd0b194d716cffed637cdd819d0bca`）。
Gitリモート参照の読み取りで両ブランチの保存を確認した。Pages設定の有効化と公開URLの外部確認は未了。

開発環境の通信許可下書きには `api.github.com` と `efactory-suzuka.github.io` を追加保存した。
下書きの保存だけでは反映されない。反映する場合は環境設定で確認・保存後、開発環境を公開する。Webサイトの公開設定とは別。
