// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;

// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');

// 複数のテキストを格納する配列
const textLists = [
  '仕事は人生の大部分を占める。','稼ぐために学んではいけない。学ぶために学べ。',
  '今日学ぶことが、明日のあなたになる。','いつも、期待されている以上の結果を出せ。',
  '地球は青かった','急がずに、だが休まずに。','必死で働き、楽しみ、歴史を創れ。',
  '完璧を目指すな。','今日死ぬつもりで生きろ。',
  '僕が後悔するであろう唯一のことは、挑戦をやめることである。','苦しまずに学ぶことはできない。',
  '賢く、献身的な人たちに囲まれていなさい。','人事を尽くして天命を待つ',
  '生き残った種というのは、最も強かった訳ではない。','また、最も賢かった訳でもない。',
  '変化に対する適応能力が高かったのである。','困難の中に、機会がある。','React Vue Angular',
  '幸せかどうかは、自分次第である。','ペンは剣よりも強し',
  '行動は言葉よりも強力である','やらないことを決めろ',
  '失敗にこそ価値がある','過去にこだわる者は未来を失う',
  '夢見る事ができればそれは実現できる','今日できることを明日に伸ばすな。',
  'ハングリーであれ。愚かであれ。'
];

// ランダムなテキストを表示
const createText = () => {

  // 正タイプした文字列をクリア
  typed = '';
  typedfield.textContent = typed;

  // 配列のインデックス数からランダムな数値を生成する
  let random= Math.floor(Math.random() * textLists.length);

  // 配列からランダムにテキストを取得し画面に表示する
  untyped = textLists[random];
  untypedfield.textContent = untyped;
};

// キー入力の判定
const keyPress = e => {

  // 誤タイプの場合
  if(e.key !== untyped.substring(0, 1)) {
    wrap.classList.add('mistyped');
    // 100ms後に背景色を元に戻す
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100);
    return;
  }

  // 正タイプの場合
  // スコアのインクリメント
  score++;
  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;

  // テキストがなくなったら新しいテキストを表示
  if(untyped === '') {
    createText();
  }
};

// タイピングスキルのランクを判定
const rankCheck = score => {

  // テキストを格納する変数を作る
  let text = '';
 
  // スコアに応じて異なるメッセージを変数textに格納する
  if(score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if(score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
  } else if(score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
  } else if(score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます!`;    
  }
 
  // 生成したメッセージと一緒に文字列を返す
  return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver = id => {
  clearInterval(id);

  const result = confirm(rankCheck(score));

  // OKボタンをクリックされたらリロードする
  if(result == true) {window.location.reload()}
};

// カウントダウンタイマー
const timer = () => {

  // タイマー部分のHTML要素（p要素）を取得する
  let time = count.textContent;

  const id = setInterval(() => {

    // カウントダウンする
    time--;
    count.textContent = time;

    // カウントが0になったらタイマーを停止する
    if(time <= 0) {
      gameOver(id);
    }
  }, 1000);
};

// ゲームスタート時の処理
start.addEventListener('click', () => {

  // カウントダウンタイマーを開始する
  timer();

  // ランダムなテキストを表示する
  createText();

  // 「スタート」ボタンを非表示にする
  start.style.display = 'none';

  // キーボードのイベント処理
  document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';
