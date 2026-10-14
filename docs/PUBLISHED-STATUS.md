# 試験公開結果

2026-10-14（日本時間）。ユーザーがCloudflare Pages管理画面で直接アップロードを実施。提供された画面で、Pagesプロジェクトefactory-english-site、Production、緑チェックのデプロイ成功を確認。Git connectionはなし。

公開URL： https://efactory-english-site.pages.dev/

画面上の個別デプロイURL： https://f6856c92.efactory-english-site.pages.dev/
通常の案内・共有には上の公開URLを使う。個別デプロイURLはその版を示すもので、通常の共有URLに不要。

こちらから公開URLの取得を試したが、環境のネットワークプロキシがTunnel connection failed: 403 Forbiddenを返した。Cloudflareサイト自体が403とは確認できていない。環境の許可ドメイン下書きにefactory-english-site.pages.devを追加して保存したが、保存だけでは環境反映・公開にならず、同じ403が残った。公開後の7ページ・画像・リンク・実地図の外部検証は未了。ローカル最終検証は20件通過。

試験公開版はnoindex・robots制限を維持。日本語側のEnglishボタンにはこの公開URLを使えるが、日本語サイトは未編集。
