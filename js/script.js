$("#serch-button").on("click", function () {
  const url =
    "https://ndlsearch.ndl.go.jp/api/opensearch?creator=福本伸行&cnt=500&idx=1";

  //.ajax = 非同期通信の技術
  //対象のURLに、GETメソッドで、データタイプxmlを取りにいって、通信が成功したらfunctionの中を実行する
  $.ajax({
    url: url,
    method: "GET",
    dataType: "xml",
    success: function (xml) {
      const items = [];

      //.findでxmlの中のitem要素を全て抽出し、.eachで１件ずつ処理を行う

      $(xml).find("item").each(function () {
        const title = $(this).find("dc\\:title").first().text();
        const volume = $(this).find("dcndl\\:volume").first().text();
        const publisher = $(this).find("dc\\:publisher").first().text();
        const price = $(this).find("dcndl\\:price").first().text();
        // 取り出したitem1件の中の要素を検索し、要素の中の最初のテキストを抽出

        // dc\\:title [ \\ ]このバックスラッシュが世界一ややこしい。
        // jQuery(javascript)の解釈だとdc\:titleになって、CSSセレクタの解釈だとdc:titleになる

        const isbnRaw = $(this).find("dc\\:identifier").filter(function () {
          return $(this).attr("xsi:type") === "dcndl:ISBN";
        })
          .first().text();

        let isbnDigits = (isbnRaw || "").replace(/\D/g, "");
        // [/　/]で囲んで正規表現　\D(数字じゃないもの)の/g(/global=全て)を指定,""にする（-を消す）
        if (isbnDigits && !isbnDigits.startsWith("978")) {
          isbnDigits = "978" + isbnDigits;
        }

        const coverUrl = isbnDigits
          ? `https://ndlsearch.ndl.go.jp/thumbnail/${isbnDigits}.jpg`
          : "";
        //書影APIの参照先

        const link = $(this).find("link").first().text();

        //itemsのindexにぶち込む
        items.push({
          title,
          volume,
          publisher,
          price,
          isbnDigits,
          coverUrl,
          link
        });
      });

      // ランダム化　.sortが配列の中身を入れ替える関数
      items.sort(function () {
        return Math.random() - 0.5;
      });
      // -0.5の理由　https://qiita.com/alpaca-honke/items/4a3e044911cd42b99924

      //今出てる結果をリセット
      $("#results").empty();

      //.sliceでitemsの頭から20件をとってきて、forEach(x)で繰り返し処理
      items.slice(0, 20).forEach(function (x) {
        const img = x.coverUrl
          ? `<img src="${x.coverUrl}" alt="書影">`
          : "";

        $("#results").append(`
          <tr>
            <td>${img}</td>
            <td>${x.title}</td>
            <td>${x.volume}</td>
            <td>${x.publisher}</td>
            <td>${x.price}</td>
            <td>${x.isbnDigits}</td>
            <td><a href="${x.link}" target="_blank" rel="">開く</a></td>
          </tr>
        `);
      });
    }
  });
});