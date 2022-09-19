'use strict';
//結果格納場所
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

//診断結果テンプレート
const answers = [
  '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
  '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
  '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
  '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
  '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
  '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
  '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
  '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
  '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
  '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
  '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
  '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
  '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
  '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
  '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
  '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

/**
 * 文字列から診断結果を返す
 * @param {string} userName ユーザ名
 * @return {string} 診断結果
 */
function assessment(userName){
  //全文字コードの番号を取得、総和を出す
  let sumOfCharCode = 0;
  for(let i=0; i< userName.length;i++){
    sumOfCharCode += userName.charCodeAt(i); //文字コードを数値化して足す
  }
  //文字コード番号の合計 / 回答数で割って添え字を出す
  const index = sumOfCharCode % answers.length;
  let result = answers[index];
  result = result.replaceAll('{userName}',userName)
  return result;
}
// ボタンが押された場合の処理
assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length == 0) return;
  console.log('ボタンが押された')
  // result-areaを一度消去
  resultDivided.innerText = ''
  // tweet-area領域に診断結果表示エリア作成
  const header = document.createElement('h3');
  header.innerText = '診断結果'
  resultDivided.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph)

  //ツイートエリア作成
  tweetDivided.innerText = '';
  const anchor = document.createElement('a');
  const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='+ encodeURIComponent('あなたのいいところ')+'&ref_src=twsrc%5Etfw'

  anchor.setAttribute('href',hrefValue);
  anchor.setAttribute('class','twitter-hashtag-button');
  anchor.setAttribute('data-text',result);
  anchor.innerText = 'Tweet #あなたのいいところ';
  tweetDivided.appendChild(anchor);

  //Twitter widgetsの実行
  const script = document.createElement('script');
  script.setAttribute('src','https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
}

//テキストボックス上でEnter押された場合の処理
userNameInput.onkeydown = event => {
  if (event.key === 'Enter') {
    assessmentButton.onclick();
  }
};

//テスト
console.assert(assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
'診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。');
console.assert(assessment('次郎') !== '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
'診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。');
console.assert(assessment('太郎') === assessment('太郎'),
'入力結果が同じ場合、同じ診断結果を出力する処理が正しくありません。');