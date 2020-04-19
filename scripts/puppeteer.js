const puppeteer = require('puppeteer')
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process')

// 存放 COCO 格式的样本数据
const cocoDataset = {
  info: {
    "year": 2020,
    "version": 1,
    "description": 'html generate datasets',
    "contributor": 'Yu Xizhe',
    "url": '',
    "date_created": new Date().toISOString(),
  },
  images: [],
  annotations: [],
  categories: [],
};
const category = ['button', 'select', 'input', 'checkbox'];

async function generateImage(imageId) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();


  await page.goto('http://127.0.0.1:7878')

  const returnData = await page.evaluate((imageId, category) => {
    const elements = document.querySelectorAll('.element-container');
    const appElement = document.querySelector('.App');
    const appTop = appElement.offsetTop;
    const appLeft = appElement.offsetLeft;
    const annotations = []
    let annotationIndex = 0;
    const appHeight = appElement.offsetHeight;
    const appWidth = appElement.offsetWidth;

    elements.forEach((element) => {
      if (element.dataset.name) {
        const name = element.dataset.name;
        const trueElement = element.firstChild;
        const height = trueElement.offsetHeight;
        const width = trueElement.offsetWidth;
        const x = trueElement.offsetLeft - appLeft;
        const y = trueElement.offsetTop - appTop;
        annotationIndex++;

        const annotation = {
          "id": imageId * 100 + annotationIndex,
          "image_id": imageId,
          "category_id": category.indexOf(name),
          "category_name": name,
          "bbox": [x, y, width, height],
          "area": width * height,
          "iscrowd": 0
        }
        annotations.push(annotation)
      }
    });
    return {
      annotations,
      appHeight,
      appWidth
    };
  }, imageId, category);

  const imageTime = new Date().toISOString();

  const image = {
    "file_name": `${imageTime}.png`,
    "width": returnData.appWidth,
    "url": `pic/${imageTime}.png`,
    "id": imageId,
    "height": returnData.appHeight
  };

  cocoDataset.images.push(image);
  cocoDataset.annotations = cocoDataset.annotations.concat(returnData.annotations);

  const app = await page.$('.App');
  await app.screenshot({ path: `./pic/${imageTime}.png` });
  await browser.close();
}

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
function execShellCommand(cmd) {
  return new Promise((resolve, reject) => {
   exec(cmd, (error, stdout, stderr) => {
    if (error) {
     console.warn(error);
    }
    resolve(stdout? stdout : stderr);
   });
  });
 }

async function generateDatasets(type) {
  const number = type === 'train' ? 100 : 10;
  for (let n = 0; n < number; n++) {
    await generateImage(n);
  }
  cocoDataset.categories = category.map((item,index) => {
    return {
      "supercategory": "html",
      "id": index,
      "name": item
    }
  })

  // 写入文件

  const content = JSON.stringify(cocoDataset); 
  const file = path.join(__dirname, `../pic/${type}.json`); 
  fs.writeFile(file, content, function(err) {
      if (err) {
          return console.log(err);
      }
      console.log(`${type} dataset 生成成功，地址：/pic/${type}.json`);
  });

}

async function generate() {
  const pathName = path.join(__dirname, `../pic`); 

  await execShellCommand(`rm -rf ${pathName}`);
  await execShellCommand(`mkdir ${pathName}`);

  await generateDatasets('train');
  await generateDatasets('test');
}

generate();