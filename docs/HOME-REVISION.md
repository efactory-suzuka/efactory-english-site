# HOME改善報告・マーケ調査室への更新資料

> 最新の6ページ制作・19件の検証・Google Mapsの状況は [全ページ制作報告](ALL-PAGES.md) を参照してください。以下は各追加作業時点の記録です。

> 追加更新：HOMEとContactにGoogle Mapsを実装しました。[地図追加・接続制限の記録](MAP-ACCESS.md)を参照してください。地図配信は403のため実描画は未検証です。

更新日：2026-10-13。既存Astro・共通ナビ・料金データ・カード・配色を継続使用しました。
対象はHOMEの改善と、関連ページの最小限の表現整合です。
**GitHub push・Cloudflare Pages本番公開・DNS変更は行っていません。**

## 1. 修正後の画面

- [PC・1280px：全体](screenshots/home-revised-1280.png)
- [PC・1280px：ファーストビュー](screenshots/home-revised-1280-top.png)
- [モバイル・375px：全体](screenshots/home-revised-375.png)
- [モバイル・390px：全体](screenshots/home-revised-390.png)
- [モバイル・430px：全体](screenshots/home-revised-430.png)
- [モバイル・390px：ファーストビュー](screenshots/home-revised-390-top.png)

`home-revised-*` が今回の更新画面です。`home-*` は旧試作品の記録です。
手元で確認する場合はREADMEの手順で `npm ci` → `npm run dev` を実行してください。
ローカルサーバーは公開サイトではなく、この環境のURLを別端末から直接閲覧できるとは限りません。

## 2. 日本語HOMEと同じ画像の配置

日本語HOMEの公開HTMLから使用中の画像URIを特定し、配信元から元ファイルを取得しました。
13ファイルの取得に成功しています。AI画像の新規生成やストックフォトは使用していません。

| 日本語HOMEの素材 | 英語版の配置 | 保存ファイル |
| --- | --- | --- |
| ヘッダーの公式eFactoryロゴ | 全ページ共通ヘッダー | `src/assets/jp-home-00.png` |
| `IMG_9334_edited.png`：青いバイクと作業場 | HOMEファーストビュー | `src/assets/jp-home-01.png` |
| オイル交換のイラスト | Work on your own bike | `src/assets/jp-home-02.png` |
| カスタム・セッティングのイラスト | Tools & setup support | `src/assets/jp-home-04.png` |
| タイヤ交換のイラスト | Tyres & maintenance | `src/assets/jp-home-06.png` |
| ジムカーナ競技サポートのイラスト | Gymkhana & track goals | `src/assets/jp-home-09.png` |
| 部品製作のイラスト | Custom part design | `src/assets/jp-home-10.png` |
| ECU書き換えのイラスト | ECU rewriting & setup | `src/assets/jp-home-11.png` |
| CSTタイヤの商品画像 | CST tyres | `src/assets/jp-home-12.png` |
| CSTロゴ | CST tyres | `src/assets/jp-home-13.png` |
| SSBロゴ | SSB bumpers | `src/assets/jp-home-14.png` |
| `IMG_9291-1.jpg`：赤いバイクと工具 | HOME理念セクション、Aboutの旧写真枠 | `src/assets/jp-home-19.jpg` |
| フッターの公式eFactoryロゴ | 全ページ共通フッター | `src/assets/jp-home-20.png` |

元ファイルは取得したバイト列をそのまま保存し、SHA-256を記録しています。
[画像出典・原寸・ハッシュ・配置一覧](IMAGE-SOURCES.json)でURLと同一素材の対応を確認できます。

表示用には縦横比を維持したリサイズとPNGでの可逆圧縮を行っています。
写真は全面を表示し、切り抜き・フィルター・色変更・描き直し・物体の追加削除は行っていません。
元のJPEGも保存し、配信時のPNG変換は見た目の変更を目的としていません。
日本語HOMEのサービス画像には既存の生成イラストがありますが、今回は同一素材を再利用する指示に従っています。
それらを実際の作業写真・スタッフの写真として説明していません。

日本語HOMEの全画像を同じ順序で複製する構成にはしていません。
英語HOMEで紹介するサービスに対応した素材を選び、元の意味を保って配置しています。
未使用の保管・運搬などの画像を別サービスの代替として配置していません。

## 3. ターゲット変更と英語文章

主対象を「日本に住み、日本で自分のバイクを所有・利用する外国人ライダー」に定めました。
地域の制限を示す表現は入れていません。観光客向けレンタル・短期滞在サービスの訴求も入れていません。
ユーザーが提示したニーズは顧客の声や調査結果として扱っていません。

| 箇所 | 今回の英語 | 意図 |
| --- | --- | --- |
| キャッチコピー | Your Bike. Your Project. We're Here to Help. | 自分のバイクと目的を中心にする |
| サブコピー | Motorcycle maintenance, customization and technical support in Suzuka, Japan—for riders from across Japan. | 実店舗の場所と全国からの利用歓迎を両立 |
| ファーストビュー本文 | Make more of the bike you own and ride in Japan. Bring your project to a workshop with tools, equipment and practical know-how, and work through the next step with eFactory. | 日本で所有・利用するバイクの維持・改善を伝える |
| 写真キャプション | Based in Suzuka. Welcoming riders from across Japan. | 全国からの来店を歓迎 |
| 料金見出し | TOTAL PRICES. TAX INCLUDED. / Choose your next step. | 実際のプラン総額を先に表示 |
| 来店前の見出し | Plan the work before the journey. | 遠方では予約・準備確認を先にする |
| 来店前の本文 | Whether you live nearby or elsewhere in Japan, enquire before making travel plans. Confirm that your request fits the available services, what parts or preparation are needed, and the appointment. | 受付で確認すべきことを案内 |
| 作業主体の注記 | Who performs each task depends on the service: staff operate the tyre changer, while fabrication and ECU work have their own scope. | 全作業を利用者自身が行うという誤解を解消 |

「困った」「自分でやりたい」の2入口、白・グレー・黒・オレンジ、既存の料金カード構造は維持しました。

## 4. 税込料金・追加費用

料金正本とINDEXへの再アクセスはHTTP 401でした。利用可能な認証付きDriveの接続はありません。
その後、ユーザーから「料金はホームページを見て」と指示されたため、日本語HOMEを料金表示の基準にしました。
公開HOME・料金ページを再取得し、以下の金額が一致することを確認しています。
正本そのものの読了・照合を完了したとは扱っていません。

| プラン | HOMEの表示 | 補足 |
| --- | --- | --- |
| 初回体験 | Total price ¥4,400 / 90 min · incl. tax | 日本語HOMEの90分・会員登録不要を採用 |
| 単発 | Total price ¥5,500 / 90 min · incl. tax | 非会員利用。サービスはプラン・作業により制限 |
| 3回券 | Total price ¥14,850 · incl. tax | 1回¥4,950、単発3回との総額差¥1,650 |
| 5回券 | Total price ¥22,000 · incl. tax | 1回¥4,400、単発5回との総額差¥5,500 |
| Standard | ¥9,900 / month、Total membership price · incl. tax | 利用枠・適用条件は確認が必要 |
| Premium | ¥13,200 / month、Total membership price · incl. tax | 利用枠・適用条件は確認が必要 |

回数券の総額を主表示、1回単価を補足に変更しました。
単発との金額比較は税込価格の算術比較で、会員キャンペーンによる割引ではありません。
回数券の各90分・12か月有効は、以前のユーザー提供情報を維持しています。
公開サイトでは期限の起算日・譲渡・払い戻し等は確認できていません。

追加費用は次の文で説明しています。

> All listed session prices include tax. Parts, consumables, materials and separately quoted specialist work may cost extra. Confirm the full cost before booking.

月額欄にも、別料金の部品・専門作業は含まれないことを表示しています。
免税、Tax-free、外国人向け割引の表現はありません。
半額キャンペーンは期間・適用条件が未確認のため、割引訴求・通常価格の取り消し線・キャンペーン案内を英語HOMEに掲載していません。

初回について日本語料金ページは「1テーマ完了まで」とも記載しています。
今回はユーザーが指定したHOMEの90分を採用しましたが、時間を超える場合の扱いは事業側で確認してください。

## 5. 遠方利用者への訴求

全国からの来店歓迎と、来店前の準備・予約確認をHOMEと共通バーに明示しています。
鈴鹿の実店舗で利用する構成であり、出張、全国引取、配送、オンライン技術相談は約束していません。
遠方だから料金や予約順が優遇されるとも表現していません。

来店前の流れは、車種・作業・希望日を送る→範囲・準備・費用を確認→予約の合意を得る、です。
問い合わせの送信だけでは予約枠が確保されないと表示しています。
技術的な診断・助言、会員向け事前相談は、受付の問い合わせと区別しています。

## 6. 事業側の確認事項

- 英語の受付、対面説明、専門技術相談で実際に対応できる範囲と運用。
- 初回90分を超える場合の扱い、初回枠に含まれる作業・相談。
- 回数券期限の起算日、予約変更・失効・譲渡・払い戻し。
- 会員の利用枠、プラン別サービス範囲、月額の適用条件・入退会条件。
- 会員キャンペーンの対象・期間・通常価格。確認までは割引訴求しない。
- 部品・消耗品・材料・設備・専門作業の追加費用と見積もり方法。
- 予約が確定する正式な操作・通知、キャンセル・遅刻時の扱い。
- ジムカーナとサーキット用途で実施できる技術支援の具体的範囲。
- ECUの対応車種・年式・用途・価格。成果や性能の保証はしない。

英語対応については、次の注記を掲載しました。

> Ask about arrangements for English enquiries, in-person explanations and technical consultation before booking. The available language support needs to be confirmed.

Fluent English support / Full English technical service / Guaranteed English-speaking assistance は使用していません。

## 7. 他6ページとの整合・今後の展開

| ページ | 今回の最小限の対応 | 正式制作で必要なこと |
| --- | --- | --- |
| Services | DIYを対象とする説明へ修正、サービス別の作業主体を明示、riding-supportの導線追加 | 正本によるサービス・プラン対応表、タイヤ・製作・ECUの責任分担 |
| Pricing | 共通カードの総額優先表示、初回90分、月額税込総額の表現を揃えた | 利用・追加料金・キャンセル・会員適用条件の確定 |
| About | 全作業を利用者が行うという表現を修正、同じ公式写真へ差し替え | 代表の正式英語プロフィールと、全国の利用者向けの事業説明 |
| ECU Tuning | 既存の車種・用途・個別確認の表現を点検、保証なしを維持 | 実際の提供範囲・対応・費用・技術説明を整える |
| FAQ | 作業主体と英語対応の説明をHOMEに合わせた | 遠方からの準備・予約・部品手配・言語の正式回答 |
| Contact & Access | 全国からの来店歓迎、英語の対応範囲確認を追加 | 受付の正式手順、来店方法、予約確認、外部リンク検証 |

全ページの共通ヘッダー・フッターにも、日本語HOMEの公式ロゴを使用しています。
その他ページの正式原稿完成や本番公開まで進めたものではありません。
HOMEのSEOタイトル・descriptionを、日本でバイクを所有・利用する英語利用者向けに変更しました。
試作品のnoindexは維持しています。

## 8. ビルド・表示・リンク確認

最終コードで `npm test` を実行し、7ページの静的ビルド成功、17件通過・失敗0件を確認しました。

- 375／390／430／1280px：全7ページがHTTP 200、見出し表示、横スクロール・本文の横方向の切れなし。
- HOME画像：表示画像を読み込み後に実画面を保存。PC・モバイルを目視し、写真・文字の重なりなし。
- 13元画像：SHA-256一致。元ファイルの変更なし。
- 2実写真：表示の縦横比が元画像と一致、object-fitはcontain、フィルターなし。
- 全内部リンク・アンカー：到達先あり。新規riding-supportリンクも確認。
- モバイルナビ、FAQ：JavaScriptなしで操作可能。
- 料金：税込総額、回数券計算、初回90分を確認。
- 内容：全国からの来店、サービス別主体、予約合意、英語の事前確認を検証。
- 禁止表現：未確認の半額・キャンペーン宣伝、免税、英語対応保証がHOMEにないことを確認。
- アクセシビリティ：PC全7ページ、モバイルHOMEと開いたメニューのaxe/WCAG A・AA自動検出違反0件。
- `git diff --check`：問題なし。

今回のHTMLにはクライアントJavaScriptを追加していません。画像はレスポンシブサイズを生成し、
HOMEのメイン写真は優先読み込み、下部画像は遅延読み込みです。

Safari/Android実機、実予約、メール送受信、LINE実アプリ、Google正本は未検証です。
自動検査の通過は、未確認のサービス条件や運用の正式承認を意味しません。

再利用用の開発環境起動手順も現行画像・17件の検証に合わせて下書き保存しました。
開発環境設定の反映には環境設定で確認・保存後、開発環境の公開が必要です。
Webサイトの本番公開とは別の操作であり、サイト公開は実施していません。

## マーケ調査室への評価依頼

今回の更新画面と本文を確認し、次を評価してください。

- 日本在住のライダーに向けた価値と、全国から利用できる姿勢が伝わるか。
- 公式写真・画像と英語文章の意味が一致しているか。
- 伴走DIY・スタッフ操作・専門作業を区別できるか。
- 税込総額、回数券単価、追加費用を誤解しないか。
- 遠方の来店計画と、受付・有料技術相談の区別が明確か。
- モバイルの長さ・読みやすさ・サービス画像・問い合わせ導線が適切か。

修正案は「必須／推奨／後でよい」に分け、事実確認とデザイン判断を分けて返してください。
今回はHOMEのデザイン・文章・画像の評価段階であり、本番公開は依頼していません。
