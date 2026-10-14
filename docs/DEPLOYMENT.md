# 現在の検索公開ビルド

2026-10-14：正式Pages URLは https://efactory-english-site.pages.dev/ 。検索設定の修正と現在の更新手順は [SEARCH-PUBLICATION.md](SEARCH-PUBLICATION.md)。公開ビルドは `npm run build:production`、出力 `dist-production`。既定のbuildはプレビュー用で検索禁止。以下は初期段階の手順履歴。

# GitHub・Cloudflare Pagesの次の手順（未実行）

## GitHub

現在のチェックアウトは指定された独立リポジトリ `efactory-suzuka/efactory-english-site` です。
別の既存プロジェクトは使用しません。この段階ではコミット・push・PR作成を行っていません。
レビュー後、このリポジトリで変更をコミットし、専用ブランチへpushしてPRを作成します。
`node_modules/`, `dist/`, テスト出力、秘密情報はコミットしません。
必要に応じて画面確認用の `docs/screenshots/` は含められます。

## 公開前の条件

1. HOMEデザインの承認。
2. 正本と日本語サイトの照合、全ページ制作、公式画像・連絡先・地図の確認。
3. 公開ドメインを確定し、Astro設定の `site`、canonical、sitemap、OGを設定。
4. 試作品向けのrobots制限と共通レイアウトのnoindexを正式公開時に解除。
5. 全ページのビルド、ブラウザ・外部リンク確認と別途公開承認。

## Cloudflare Pages（静的・新規プロジェクト）

公開承認後、Cloudflare Pagesでこの独立GitHubリポジトリに接続した
新しいプロジェクトを作成します。既存Workers・D1は変更・接続・流用しません。

- Framework preset: Astro
- Build command: `npm ci && npm run build`
- Output directory: `dist`
- Node: リポジトリ要件に合うバージョン。今回検証済みの24.19.0を推奨。
- Functions、Workers bindings、D1 bindings、秘密情報、サーバー用adapterは不要。
- サイト用の独自ドメイン購入・有料契約は行わず、必要なら無料のpages.devを候補にする。

Cloudflareのアカウント・実際のプラン上限・Pages接続手順はこの段階では未検証です。
無料枠の現行条件は実際の公開時に確認します。
GitHub接続をすると自動公開が始まる可能性があるため、公開承認前に接続しません。
クラウド開発環境の設定を保存・公開する操作と、英語Webサイトの本番公開は別です。
