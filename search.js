$(main);

function hideAll() {
  $("tbody>tr").hide();
}

function showAll() {
  $("tbody>tr").show();
}

function getChosung(str) {
  const cho = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];
  let result = "";
  for (i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i) - 44032;
    if (code > -1 && code < 11172) result += cho[Math.floor(code / 588)];
  }
  return result;
}
const removeSpace = (str) => str.split(" ").join("");
const flatString = (str) => removeSpace(str.toUpperCase());

function main() {
  const cardNames = $("body > table > tbody > tr > td:nth-child(1)").map(
    (i, td) => td.innerText
  );
  const cardChosungs = {};
  cardNames.map(
    (i, cardName) => (cardChosungs[flatString(cardName)] = getChosung(cardName))
  );
  const delay = (() => {
    let timer;
    return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();
  $("#search").keyup((e) => {
    const query = flatString($("#search").val());
    delay(() => {
      if (query.length < 1) {
        showAll();
        return;
      }
      hideAll();

      $("tr > td:nth-child(1)").each((i, td) => {
        const text = flatString(td.innerText);
        if (text.includes(query)) $(td).parent().show();
        if (cardChosungs[text].includes(query)) $(td).parent().show();
      });
    }, 0.2 * 1000);
  });
}
