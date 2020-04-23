const puppeteer = require('puppeteer')
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process')

const getPuth = function(dir) {
  return path.join(__dirname, dir);
}
// 存放 COCO 格式的样本数据
let cocoDataset = {};

const cocoDatasetFormat = {
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

let annotationId = 0;

let browser;
let page;

async function generateImage(imageId, type) {
  await page.goto('http://127.0.0.1:9000')

  const returnData = await page.evaluate((imageId, category, annotationId) => {
    const elements = document.querySelectorAll('.element-container');
    const appElement = document.querySelector('.App');
    const appTop = appElement.offsetTop;
    const appLeft = appElement.offsetLeft;
    const annotations = []
    const appHeight = appElement.offsetHeight;
    const appWidth = appElement.offsetWidth;

    elements.forEach((element) => {
      if (element.dataset.name) {
        const name = element.dataset.name;
        // const trueElement = element.firstChild;
        const trueElement = element;
        const height = trueElement.offsetHeight;
        const width = trueElement.offsetWidth;
        const x = trueElement.offsetLeft - appLeft;
        const y = trueElement.offsetTop - appTop;

        annotationId++;

        const annotation = {
          "id": annotationId,
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
      appWidth,
      annotationId
    };
  }, imageId, category, annotationId);

  const imageTime = new Date().toISOString();

  const image = {
    "file_name": `${imageId}.png`,
    "width": returnData.appWidth,
    "url": `pic/${type}/${imageId}.png`,
    "id": imageId,
    "height": returnData.appHeight
  };

  annotationId = returnData.annotationId;

  cocoDataset.images.push(image);
  cocoDataset.annotations = cocoDataset.annotations.concat(returnData.annotations);

  const app = await page.$('.App');
  await app.screenshot({ path: `./pic/${type}/${imageId}.png` });
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
  cocoDataset = JSON.parse(JSON.stringify(cocoDatasetFormat));
  const number = (type === 'train') ? 100 : 10;
  console.log(`generate ${type} datasets , number: ${number}`)
  for (let n = 0; n < number; n++) {
    await generateImage(n, type);
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
  await fs.writeFile(file, content, function(err) {
      if (err) {
          return console.log(err);
      }
      console.log(`${type} dataset 生成成功，地址：/pic/${type}.json`);
  });
}

async function generate() {
  const pathName = getPuth('../pic'); 

  await execShellCommand(`rm -rf ${pathName}`);
  await execShellCommand(`mkdir ${pathName}`);

  await execShellCommand(`mkdir ${pathName}/train`);
  await execShellCommand(`mkdir ${pathName}/test`);
  await execShellCommand(`mkdir ${pathName}/valid`);

  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.setViewport({
    width: 650,
    height: 800,
    deviceScaleFactor: 1,
  });

  await generateDatasets('train');
  await generateDatasets('valid');
  await generateDatasets('test');

  await browser.close();

  await execShellCommand(`cp -r ${getPuth('../test')} ${pathName}/crm`);
  await execShellCommand(`rm pic.zip`);
  await execShellCommand(`zip -r -q pic.zip pic`);
  console.log(`生成压缩包 pic.zip`);
}

generate();