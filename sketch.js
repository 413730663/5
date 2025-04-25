let selectedOption = ''; // 儲存目前選擇的選項
let img; // 儲存圖片
let hearts = []; // 儲存愛心的陣列
let colors = ['#fbf8cc', '#fde4cf', '#ffcfd2', '#f1c0e8', '#cfbaf0', '#a3c4f3', '#90dbf4', '#8eecf5', '#98f5e1', '#b9fbc0'];

function preload() {
  img = loadImage('IMG_7738.png'); // 載入圖片
}

function setup() {
  createCanvas(windowWidth, windowHeight); // 設定畫布大小為視窗長寬

  // 初始化 50 顆愛心
  for (let i = 0; i < 50; i++) {
    hearts.push({
      x: random(width), // 隨機 x 座標
      y: random(height), // 隨機 y 座標
      size: random(20, 140), // 隨機大小
      color: random(colors), // 隨機顏色
      speedX: random(-2, 2), // 隨機水平速度
      speedY: random(-2, 2), // 隨機垂直速度
      angle: random(TWO_PI) // 隨機角度
    });
  }
}

function draw() {
  background('#ffe5ec'); // 設定背景顏色為 #ffe5ec

  // 繪製愛心
  for (let heart of hearts) {
    push();
    translate(heart.x, heart.y); // 移動到愛心的位置
    rotate(heart.angle); // 旋轉愛心
    fill(heart.color + '80'); // 設定愛心顏色，80 表示透明度
    noStroke();
    drawHeart(0, 0, heart.size); // 繪製愛心
    pop();

    // 更新愛心位置
    heart.x += heart.speedX;
    heart.y += heart.speedY;

    // 確保愛心在畫布內反彈
    if (heart.x < 0 || heart.x > width) heart.speedX *= -1;
    if (heart.y < 0 || heart.y > height) heart.speedY *= -1;
  }

  // 設定半透明顏色
  fill('#ccdbfd80'); // #e2eafc，80 表示透明度 (128/255)
  noStroke(); // 移除邊框

  // 計算方框大小與位置
  let rectWidth = windowWidth * 0.75;
  let rectHeight = windowHeight * 0.75;
  let rectX = (windowWidth - rectWidth) / 2;
  let rectY = (windowHeight - rectHeight) / 2;

  // 繪製方框
  rect(rectX, rectY, rectWidth, rectHeight);

  // 如果選擇了 "基本資料"，在方框內顯示文字
  if (selectedOption === '基本資料') {
    let textData = [
      '姓名:葉思妤',
      '性別:女',
      '生日:10/5',
      '星座:天秤座',
      '血型:O型',
      'MBTI:INTJ',
      '學歷與學校:就讀淡江大學教育科技系、畢業於華江高中',
      '喜歡的東西:喜歡巧克力，喜歡的動物是貓咪和狗狗'
    ];
    displayText(rectX + 20, rectY + 20, textData, 36); // 顯示基本資料文字，大小為 36
  }

  // 如果選擇了 "愛好專長"，在方框內顯示文字
  if (selectedOption === '愛好專長') {
    let textData = [
      '興趣:唱歌、看小說、畫畫',
      '專長:唱歌、畫畫',
      '另外我還有一些喜歡做的小事，但算不上興趣與專長',
      '我在空閒時間，不想碰3C電子產品時，我喜歡寫小說、玩桌遊、玩魔術方塊',
      '還有一件很特別的事是我喜歡洗碗，可能是因為把碗洗乾淨很療癒',
      '因為我很喜歡乾淨，可能我有一點潔癖'
    ];
    displayText(rectX + 20, rectY + 20, textData, 36); // 顯示愛好專長文字，大小為 36
  }

  // 如果選擇了 "其他"，在方框內顯示文字
  if (selectedOption === '其他') {
    let textData = [
      '這邊是一些我小小的生涯分享，高中時我加入了吉他社，',
      '高一度過了對現階段的我來說，是一段壓力很大但很有成長的時光。',
      '高一的吉他社，因為社團管理較嚴格，且高一的我們就有一場大型的表演，',
      '學長姊對我們的要求都很高、對我們也很兇，但讓我進步的速度很快，',
      '也因此讓我的扛壓能力提升了不少。不過因為高度練習、我的手握吉他又太小很吃力，',
      '手因此得了板機指，就沒有繼續彈吉他，反而是轉戰主唱這個位子，',
      '也因為同伴找我一起開的歌都是音域很高的，',
      '也因此讓我的歌唱提升到一個以前觸及不到的高度。',
      '後來升上高二接了活動這個幹部，學會很多關於規劃、活動策辦等等的事情。',
      '也完成了一場又一場在我人生中佔了很重要一部分的表演，',
      '在社團生活退休後，已經沒有舞台能讓我盡情地唱歌了，',
      '我很珍惜那段時光，也很謝謝當時的自己在高一有堅持下來，',
      '沒有退出社團，才留下了很多回憶，造就了現在的我。'
    ];
    displayText(rectX + 20, rectY + 20, textData, 20); // 顯示其他文字，大小為 24
  }

  // 顯示圖片
  if (selectedOption === '基本資料') {
    let imgMaxHeight = rectHeight - 40; // 方框高度減去上下各 20px
    let imgMaxWidth = rectWidth * 0.3; // 圖片寬度為方框寬度的 30%
    let imgHeight = imgMaxHeight; // 預設圖片高度為最大高度
    let imgWidth = img.width * (imgHeight / img.height); // 根據比例計算寬度

    // 如果圖片寬度超過最大寬度，則調整寬度並重新計算高度
    if (imgWidth > imgMaxWidth) {
      imgWidth = imgMaxWidth;
      imgHeight = img.height * (imgWidth / img.width);
    }

    // 計算圖片位置
    let imgX = rectX + rectWidth - imgWidth - 20; // 圖片距離方框右邊 20px
    let imgY = rectY + (rectHeight - imgHeight) / 2; // 圖片垂直置中
    image(img, imgX, imgY, imgWidth, imgHeight); // 繪製縮放後的圖片
  }

  // 繪製右上角選單
  drawMenu();
}

function displayText(startX, startY, textData, textSizeValue) {
  let textPadding = 10; // 文字框內的間距
  textSize(textSizeValue); // 根據參數設定文字大小
  textAlign(LEFT, CENTER);

  for (let i = 0; i < textData.length; i++) {
    let boxWidth = textWidth(textData[i]) + textPadding * 2; // 動態計算文字框寬度
    let boxHeight = textSizeValue + textPadding * 2; // 文字框高度根據文字大小調整

    // 設定文字框背景顏色
    fill('#8da9c480'); // 半透明框顏色
    rect(startX - textPadding, startY + i * (boxHeight + textPadding), boxWidth, boxHeight, 5); // 繪製文字框

    // 設定文字顏色
    fill('#013a63');
    text(textData[i], startX, startY + i * (boxHeight + textPadding) + boxHeight / 2); // 繪製文字
  }
}

function drawMenu() {
  // 設定選單背景顏色
  fill('#ff709680'); // #ff7096，80 表示透明度 (128/255)
  noStroke();

  // 設定選單大小與位置
  let menuWidth = 200;
  let menuHeight = 150;
  let menuX = windowWidth - menuWidth - 20; // 距離右邊 20px
  let menuY = 20; // 距離上方 20px

  // 繪製選單背景
  rect(menuX, menuY, menuWidth, menuHeight, 10); // 圓角矩形

  // 設定文字樣式
  fill('#013a63'); // 文字顏色
  textSize(16);
  textAlign(LEFT, CENTER);

  // 繪製選單文字
  let options = ['基本資料', '愛好專長', '其他'];
  let optionHeight = menuHeight / options.length;
  for (let i = 0; i < options.length; i++) {
    let textX = menuX + 20; // 文字距離左邊 20px
    let textY = menuY + optionHeight * i + optionHeight / 2;
    text(options[i], textX, textY);
  }
}

function mousePressed() {
  // 檢查滑鼠是否點擊在選單的某個選項上
  let menuWidth = 200;
  let menuHeight = 150;
  let menuX = windowWidth - menuWidth - 20; // 距離右邊 20px
  let menuY = 20; // 距離上方 20px
  let optionHeight = menuHeight / 3;

  if (
    mouseX > menuX &&
    mouseX < menuX + menuWidth &&
    mouseY > menuY &&
    mouseY < menuY + menuHeight
  ) {
    let clickedIndex = Math.floor((mouseY - menuY) / optionHeight);
    let options = ['基本資料', '愛好專長', '其他'];
    selectedOption = options[clickedIndex]; // 更新選擇的選項
  }
}

// 繪製愛心的函式
function drawHeart(x, y, size) {
  beginShape();
  let d = size / 2;
  vertex(x, y + d * 0.3);
  bezierVertex(x - d, y - d * 0.5, x - d * 0.5, y - d * 1.5, x, y - d * 0.7);
  bezierVertex(x + d * 0.5, y - d * 1.5, x + d, y - d * 0.5, x, y + d * 0.3);
  endShape(CLOSE);
}
