# Google Mapsアクセス案内

> 最新の6ページ制作・19件の検証・Google Mapsの状況は [全ページ制作報告](ALL-PAGES.md) を参照してください。以下は各追加作業時点の記録です。

HOMEとContact & Accessに共通のAccessMapを追加しました。

- 公開日本語サイトの住所：〒510-0264 三重県鈴鹿市徳居町1135。
- 住所を使ったGoogle Mapsの埋め込み。
- Get directions：Google Mapsで目的地を指定した経路検索。
- Open Google Maps：地図を直接開く代替リンク。
- 完全予約制、来店前の予約・到着方法確認を明示。
- PCは地図と案内を横並び、モバイルは270pxの地図と案内を順に表示。
- 地図は遅延読み込み。APIキー、課金設定、予約・DB開発は追加していません。

Wixの事業設定には市単位の位置情報もありましたが、番地の正確な座標であると確認できないため使用していません。
地図は掲載住所による検索です。店舗の正確なピン・入口・到着経路は実際の地図と事業側の案内で確認する必要があります。

## 検証

7ページのビルドと18件のテストが成功。
375・390・430・1280pxのレイアウト、住所を指定した埋め込み・検索・経路URL、内部導線、iframeのタイトル・サイズを確認しました。

**Google Maps自体の読み込みは、この環境のHTTPSプロキシから403で制限されています。**
地図内の描画、ピンの位置、実際の経路は未検証です。画面記録は配置確認用で、地図部分には読み込みエラーが写っています。
地図を読み込めたとするテストや、代替の架空地図は作っていません。

- [PCの配置](screenshots/contact-access-1280.png)
- [モバイルの配置](screenshots/contact-access-375.png)

環境設定下書きには既存の許可を保ち、www.google.com、maps.gstatic.com、maps.googleapis.com、fonts.gstatic.comを追加しました。
保存は成功しましたが、現環境への反映・Google Mapsの描画成功を示すものではありません。
環境設定を確認・保存して開発環境を公開後、Google Mapsへの接続と実地図を再確認してください。
開発環境の公開とWebサイトの本番公開は別です。Webサイトは本番公開していません。

## 実装

- `src/components/AccessMap.astro`：共通地図・アクセス案内。
- `src/data/site.ts`：住所、埋め込み・検索・経路URLを一元管理。
- `src/pages/index.astro`：HOME末尾からアクセスを案内。
- `src/pages/contact.astro`：`#access` に詳しい案内・駐車情報。
