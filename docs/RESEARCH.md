# 第1段階：情報調査・確認状況

> 第1段階の履歴です。今回のHOME修正・取得できた画像・現在の確認事項は [HOME改善報告](HOME-REVISION.md) を参照してください。

調査日：2026-10-13。対象は新規独立リポジトリ `efactory-suzuka/efactory-english-site` のみ。
日本語Wix、他のGitHubプロジェクト、Cloudflare Workers・D1には変更を加えていません。

## 参照先と取得結果

最初にINDEXを確認した後、3正本と日本語サイトを確認しました。
最初は全て環境のHTTPSプロキシから403が返りました。
ネットワーク許可の下書き保存後に再確認すると、WixはHTTP 200、Google資料はHTTP 401でした。
Google Driveの認証付きコネクタはこの環境では利用できません。
正本は取得できず、公開日本語サイトと依頼文を根拠に制作しています。

| 資料 | URL | 最終確認結果 |
| --- | --- | --- |
| 参照INDEX | https://docs.google.com/document/d/1lI2BQziI1baS4rin_pIv5BEG3K8GsXCAZ5kd7fDdgEg/edit | エクスポート401、内容未取得 |
| 経営方針 | https://docs.google.com/document/d/13tIC_zo9CTXu31o-E0g65mmTTqPryxSeDC5Wf1_wvsE/edit | エクスポート401、内容未取得 |
| サービス・料金 | https://docs.google.com/document/d/14D57OSzaCqtiSBOaduA3W_yXXnHrBq2y5636YnlBUNo/edit | エクスポート401、内容未取得 |
| 予約システム | https://docs.google.com/document/d/1nmKM10TQxVAkAA1kGgxU0Sy0wX9_3Ix4eZJaD8SMrPo/edit | エクスポート401、内容未取得 |

アクセス先 `docs.google.com`, `efactorysuzuka.wixsite.com`, `static.wixstatic.com`,
`lin.ee`, `line.me` を環境設定の下書きに保存しました。
保存だけで全ての許可が現環境に反映されたと判断はできません。
公式画像・LINEリンク先の接続チェックは最終時点でも403でした。
LINEリンクは取得できた公式ページのhrefをそのまま使用しています。

## 日本語サイトのページ・コンテンツ棚卸し

HTML内の公開本文・画像情報・リンクを取得して調査しました。
日本語サイトそのものの実画面レンダリング・全動画等の調査は行っていません。

| ページ | 公開URL | 主な内容 |
| --- | --- | --- |
| HOME | https://efactorysuzuka.wixsite.com/efactory | 伴走サポート、2入口、サービス、SSB/CST、料金、アクセス、利用の流れ、FAQ、LINE |
| About us | https://efactorysuzuka.wixsite.com/efactory/us | 起業理念、代表の経験、DENSOでの設計・開発、モトジムカーナ、プロフィール |
| 料金 | https://efactorysuzuka.wixsite.com/efactory/page | 初回・単発・回数券・会員、プラン別サービス範囲、Premiumの予約条件 |
| ECUセッティング | https://efactorysuzuka.wixsite.com/efactory/ecu-setting | 乗りやすさ重視、確認→書換え→走行フィードバック→再調整、適合確認、LINE |

### 公開サイトで確認したサービス

- 洗車、オイル・消耗品交換、チェーン清掃・調整、バッテリー、ブレーキ周り。
- パーツ取付、電装・配線、USB・ドラレコ・ETC、カスタム・セッティング。
- タイヤ交換：チェンジャー操作はスタッフが実施。
- SSB販売・取付・補修、CSTタイヤ販売・交換（12/17インチの取扱表記）。
- 部品設計・製作、溶接・機械加工。内容・難易度・材料によって別見積もり。
- 保管、保管車両の運搬（鈴鹿内）、モトジムカーナ支援。料金・詳細は追加確認が必要。
- ECU書換え・燃調、ログ取得等は車種・年式・ECU・目的・機材によって相談、一部別料金。
- 会員向け：事前の技術相談・テーマ整理、作業記録、継続相談、部品選び、乗車・車体設定等。
- Premiumは優先予約・専用相談枠・連続枠の相談。希望時間確保の保証はなし。

### 料金照合と相違点

依頼文の税込金額は公開サイトと一致しています。
3回券は1回4,950円、5回券は1回4,400円。単発との総額差は1,650円／5,500円。
回数券の各90分枠・12か月有効は依頼文を根拠にしており、正本確認は未了。

**初回の時間条件に相違があります。** HOMEは4,400円／90分、料金ページは
「初めての方だけ」「1テーマ完了まで一緒に進めます」と記載し、時間が明示されていません。
英語HOMEでは初回を90分と断定せず、事前確認を案内しています。

会員は9,900円／13,200円に加えて、19,800円／26,400円との半額キャンペーン表記があります。
キャンペーンの終了日・対象は未確認。英語HOMEは指定の月額と現在の条件確認を表示しています。

### 所在地・リンク

- 〒510-0264 三重県鈴鹿市徳居町1135。完全予約制。
- 車・バイクの無料駐車スペース。国道23号バイパス郡山IC経由の案内。
- 公式LINE： https://lin.ee/OYeQxOp
- HOME内に別表記： https://line.me/R/ti/p/@518iytun
- ECUページの専用リンク： https://lin.ee/PGKCTAO
- メール： efactory.suzuka@gmail.com
- SSB外部リンク： https://ssbfactory.ocnk.net/
- Facebook： https://www.facebook.com/eFactorySuzuka
- Instagram： https://www.instagram.com/efactorysuzuka/
- X： https://x.com/eFactorySuzuka

HOME・About・料金で共通のLINE短縮URLを一般問い合わせに採用しました。
短縮URLの遷移先は403で実アクセス未検証。メール送信は実施していません。
住所のローマ字表記は推測せず、日本語原文と英語の市・県案内を掲載。
地図は検証済み住所によるGoogle Maps検索リンクで案内し、埋め込みは行っていません。

### 代表者

日本語サイトの表記：柳田 悦豪（やなぎだ えつごう）。16歳からバイクに乗り、
DENSOの自動車部品開発・設計、設計室長としての品質を含む開発マネジメントを経験。
発明者として約200件の特許出願という記述あり。英語の仮ページでは誇張しやすい実績表現を省き、
代表の希望する英語氏名表記を確認事項にしています。
JAGE A級現役、地域大会主催、車両製作・部品加工は公開プロフィールに記載。

## 公式素材棚卸し

画像のURLは取得できましたが、`static.wixstatic.com` へのダウンロードは403のため未使用です。

| 素材 | URL | 取り扱い |
| --- | --- | --- |
| ヘッダーロゴ | https://static.wixstatic.com/media/3e6992_a89a1ad9d09d469d8f7f9bfed51899c1~mv2.png | ダウンロード未了。通常の文字表記を使用 |
| HOMEメイン画像（IMG_9334_edited.png） | https://static.wixstatic.com/media/3e6992_52f4f59279ef468098dfcc5c1e1f0d7c~mv2.png | ダウンロード・実画像確認未了。写真枠を使用 |
| その他写真（IMG_9291-1.jpg） | https://static.wixstatic.com/media/3e6992_72d51004044e4d94bb6a6a5f9407ef23~mv2.jpg | 未取得、被写体未確認 |
| サービスイラスト | 公開HTMLの画像メタデータにChatGPT Imageのファイル名あり | 実際の作業写真として転用しない |
| CST/SSB画像・ブランドロゴ | HOME内で存在確認 | 資格を示す画像・代理店表現としては使用しない |

取得後は実画像を目視確認し、公式ロゴ・実写真を使用します。
`src/assets/` とAstroの `Image` / `Picture` でサイズ、代替テキスト、WebP/AVIFを設定します。
現在は実画像がないため画像最適化処理自体は未検証です。
`src/components/MediaPlaceholder.astro` を差し替える構成です。
AIロゴ・架空の作業写真は生成していません。

## 未確認のため非掲載

リース、公開範囲を確認できないカスタム車両商品、対応車種の一覧、
ECU価格、対面英語の保証、公式代理店資格は掲載していません。
