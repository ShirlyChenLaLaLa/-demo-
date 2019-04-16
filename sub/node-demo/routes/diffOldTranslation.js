const express = require('express');
const router = express.Router();
const fs = require("fs");
const log4js = require('log4js');
const logger = log4js.getLogger();
const yaml = require('yamljs');

logger.level = 'debug';

// 将app端的新的翻译和老的翻译进行比对，找出新添加的key
router.get('/', async() => {
  const newJson = await JSON.parse(readFile('/Users/yuhanchen/repos/native-mobile-app/src/resources/translations/zh-cn.json'));
  const oldJson = await yaml.parse(readFile('/Users/yuhanchen/repos/storm-l10n/zh-cn/app.zh-cn.yml'));
  // logger.debug(Object.keys(newJson));
  let diffJson = {};
  const diffKeys = Object.keys(newJson).filter((newJsonKey)=>{
    return !Object.keys(oldJson).includes(newJsonKey);
  });
  diffKeys.forEach((item,index)=>{
    diffJson[item] = newJson[item];
  })
  logger.debug(diffJson);
});

function readFile(fileName) {
  if (fs.existsSync(fileName)) return fs.readFileSync(fileName, "utf-8");
}

module.exports = router;
