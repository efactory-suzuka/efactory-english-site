# eFactory English website

日本在住・日本全国の外国人ライダー向けの独立したAstro静的サイトです。全7ページ、原画像、税込料金、英語原稿を維持してGitHub Pagesへ移行する構成です。

公開予定URL： **https://efactory-suzuka.github.io/efactory-english-site/**
GitHub： https://github.com/efactory-suzuka/efactory-english-site
現在の移行状況は [GITHUB-PAGES.md](docs/GITHUB-PAGES.md) を参照してください。

## ローカル開発

Node.js 22.12以上（検証：24.19.0）。

```sh
npm ci
npm run dev
```

手元のブラウザで http://localhost:4321 を開きます。クラウド内のlocalhostは端末から直接見える公開URLではありません。

## ビルドと公開

- `npm run build` / `npm run build:preview`：検索禁止のプレビュー版を `dist/` に生成。
- `npm run build:production`：GitHub Pages用の正式版を `dist-production/` に生成。
- `bash scripts/publish-github-pages.sh`：ビルドし、この専用リポジトリの `gh-pages` ブランチへ公開ファイルをpush。

GitHubの **Settings → Pages → Deploy from a branch → gh-pages → /(root)** を初回に設定します。
以後、公開用ブランチへのpushでGitHub側の公開処理が始まります。mainはソース管理用、gh-pagesは配信用です。
スクリプトはGitの認証を利用します。APIトークンをソースやチャットに書かないでください。
Cloudflare、日本語Wix、予約システム、既存Workers/D1、DNSは変更しません。

プロジェクトの `/efactory-english-site/` をAstroのbaseに設定し、画像・全内部リンクをこの配下へ配置します。
canonicalとサイトマップは上記公開予定URLを使用。`.nojekyll` により `_astro` の配信を有効にします。
GitHub PagesはCloudflareの `_headers` を適用しません。プレビューはnoindex/nofollowのビルドで扱い、公開専用ブランチへは正式ビルドだけを配置します。

GitHubのプロジェクトサイトはホスト直下のrobots.txtを管理できません。`/efactory-english-site/robots.txt` は生成しますが、検索Botは通常 `https://efactory-suzuka.github.io/robots.txt` を参照します。他リポジトリで管理される可能性があるホスト直下の設定は変更せず、公開後に読取り確認します。

## 検証

```sh
npm test
npm run build:production
EFACTORY_PUBLICATION=production npm run preview -- --port 4324 --ignore-lock
```

別の端末から：

```sh
GITHUB_PAGES_TEST_URL=http://127.0.0.1:4324 node scripts/check-github-pages.mjs
```

既存20テストに加え、GitHub Pagesのサブディレクトリで全7ページの画像・内部リンク・canonical・PC/モバイルを検証します。
公開後のHTTP検証： `python3 scripts/check-public-search.py --label github-live`。

## コンテンツと出典

料金・問い合わせ情報は `src/data/site.ts`、サービスプランは `src/data/services.ts`。
画像出典は `docs/IMAGE-SOURCES.json`。日本語HOME13点、About本人写真1点、最新日本語ECU5点の原ファイルを保持。
代表者名はEtsugo Yanagida、ECUの表示名はECU Flashingです。
Google正本は認証エラーで読めず、ユーザー指示に従って公開日本語サイトを参照しています。未確認の運用条件や英語対応を保証しません。

Cloudflare時点の試験公開・検索設定・ChatGPT取得調査は `docs/SEARCH-VERIFIED.md`、`docs/FETCH-INVESTIGATION.md` の履歴です。GitHub Pagesへの移行でChatGPTの実取得が成功するかは、公開後に別途確認します。
