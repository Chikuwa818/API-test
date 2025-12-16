# ①課題名
API

## ②課題内容（どんな作品か）
- 著者"福本伸行"の作品が出てきます

## ③アプリのデプロイURL

## ④アプリのログイン用IDまたはPassword（ある場合）
- なし
## ⑤工夫した点・こだわった点
- 2つのAPIを参照先としている点
　①https://ndlsearch.ndl.go.jp/api/opensearch：書籍データの参照用
　②https://ndlsearch.ndl.go.jp/thumbnail/[isbn又はJP-eコード].jpg：書影データを引っ張ってくる用
　書影APIにけっこう登録されていないタイトルが多くて残念
- API仕様をかなり読み込んだ　https://ndlsearch.ndl.go.jp/file/help/api/specifications/ndlsearch_api_20250326.pdf

## ⑥難しかった点・次回トライしたいこと（又は機能）
- 渡される形式がXMLだったので、jQueryで扱うための方法を調べたりちゃっぴー相談で時間がかかった
- 出てきた本を選択してfirebase登録して、読みたい本リスト的なものが作れそう