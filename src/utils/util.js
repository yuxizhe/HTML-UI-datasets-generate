
function randomValue({ type, list, max, min }) {
  if(type === 'string') {
    return randomChiString(max);
  }
  if(type === 'color') {
    return randomColor();
  }
  if (list) {
    const index = Math.floor(Math.random() * (list.length));
    return list[index];
  }
  if (max) {
    const mindata = min || 0
    return Math.random() * (max - mindata) + mindata
  }
};

// 随机生成汉字
function randomChi() {
  return String.fromCodePoint(Math.round(Math.random() * 20901) + 19968);
}
// 随机汉字串
function randomChiString(length) {
  const strLength = length || Math.round(Math.random() * 8);
  let chiString = '';
  for(let i=0; i<strLength; i++){
    chiString += randomChi();
  }
  return chiString;
}

// 随机生成颜色
function randomColor() {
  const r = Math.floor(Math.random()*255);
  const g = Math.floor(Math.random()*255);
  const b = Math.floor(Math.random()*255);
  return 'rgba('+ r +','+ g +','+ b +',1)';
}

export { randomValue }