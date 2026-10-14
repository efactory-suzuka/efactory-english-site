# 日本語サイト管理者向け：Englishボタン設定手順

英語版には全ページ上部・フッターに日本語ボタンを設置済み。日本語ページを別タブで開くので、英語タブに戻れます。
日本語Wix・日本語ECUサイトは今回変更していません。

## 正式公開URL確定後

1. デザイン承認と英語サイトの公開承認を受け、英語の正式URLを確定する。
2. Wix Harmonyの共通ヘッダー・フッターに「English」ボタンを管理者が追加する。
3. 日本語HOMEは英語 `/`、日本語About `/us` は英語 `/about/`、料金 `/page` は英語 `/pricing/` にリンクする。
4. 日本語ECUサイトの管理者が同じ「English」ボタンを追加し、英語 `/ecu-tuning/` にリンクする。
5. PC・モバイルで両方向の移動とリンク先を確認する。

ECUサイトにコードでボタンを追加する場合の雛形（未実行）：

```html
<a href="ENGLISH_SITE_PUBLIC_URL/ecu-tuning/" lang="en">English</a>
```

`ENGLISH_SITE_PUBLIC_URL` は実際の公開URLへ置換する。雛形のまま公開しない。localhostやクラウド内部URLをリンク先にしない。

現行英語版の対応リンクは `src/data/site.ts` の `japanesePages` に一元化。日本語版に専用Services/FAQ/Contactページがないため、これらは日本語HOMEを開く。日本語版のURL変更時はここを更新する。
