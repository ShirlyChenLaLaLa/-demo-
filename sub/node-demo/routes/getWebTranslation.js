const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require('path');
const log4js = require('log4js')
const logger = log4js.getLogger()
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFileFuc = promisify(fs.readFile);
const yaml = require('yamljs');
const nodeExcel = require('excel-export');
logger.level = 'debug';

// 将app端的翻译的key和web端的进行比对，筛选出已有的和没有的需要翻译的key
router.get('/', async function (req, res, next) {
  const appRelatedToWebObj = {};
  const translationData = await JSON.parse(readFile('/Users/yuhanchen/repos/native-mobile-app/src/resources/translations/zh-cn.json'));
  const zhCnPaths = [];

  readDirRecur('/Users/yuhanchen/repos/storm-l10n/zh-cn', (item, data, fullPath) => {
    zhCnPaths.push(item);
  }).then(() => {
    logger.debug('done');
    Object.keys(translationData).forEach((translationKey) => {
      const formAppKeyData = translationData[translationKey].replace(/\{\{([a-zA-Z0-9_%\.:]+)\}\}/s, '');
      appRelatedToWebObj[translationKey] = [];
      zhCnPaths.forEach((path) => {
        const pageData = yaml.load('/Users/yuhanchen/repos/storm-l10n/zh-cn/'+ path);
        const enPageData = yaml.load('/Users/yuhanchen/repos/storm-l10n/en-us/'+ path.replace('zh-cn','en-us'));
        Object.keys(pageData).forEach((key) => {
          const formWebKeyData = pageData[key].replace(/\%([a-zA-Z0-9_%\.:]+)\%/s, '');
          if (formAppKeyData === formWebKeyData) {
            appRelatedToWebObj[translationKey].push({
              key,
              value: enPageData[key],
            });
          }
        });
      });
    });
    logger.debug(appRelatedToWebObj['form.btn.code_sent']);
    const conf = {};
    conf.cols = [{
      caption:'App key',
      type:'string',
    },{
      caption:'App value',
      type:'string',
    },{
      caption: 'Web key1',
      type: 'string',
    },{
      caption: 'Web value1',
      type: 'string',
    },{
      caption: 'Web key2',
      type: 'string',
    },{
      caption: 'Web value2',
      type: 'string',
    },{
      caption: 'Web key3',
      type: 'string',
    },{
      caption: 'Web value3',
      type: 'string',
    },{
      caption: 'Web key4',
      type: 'string',
    },{
      caption: 'Web value4',
      type: 'string',
    },{
      caption: 'Web key5',
      type: 'string',
    },{
      caption: 'Web value5',
      type: 'string',
    },{
      caption: 'Web key6',
      type: 'string',
    },{
      caption: 'Web value6',
      type: 'string',
    },{
      caption: 'Web key7',
      type: 'string',
    },{
      caption: 'Web value7',
      type: 'string',
    },{
      caption: 'Web key8',
      type: 'string',
    },{
      caption: 'Web value8',
      type: 'string',
    },{
      caption: 'Web key9',
      type: 'string',
    },{
      caption: 'Web value9',
      type: 'string',
    },{
      caption: 'Web key10',
      type: 'string',
    },{
      caption: 'Web value10',
      type: 'string',
    },{
      caption: 'Web key11',
      type: 'string',
    },{
      caption: 'Web value11',
      type: 'string',
    },{
      caption: 'Web key12',
      type: 'string',
    },{
      caption: 'Web value12',
      type: 'string',
    }];
    conf.rows = [];
    let max = 0;
    Object.keys(appRelatedToWebObj).forEach((key)=>{
      let row = [key, translationData[key]];
      
      if(appRelatedToWebObj[key].length > 0) {
       
        for(let item of appRelatedToWebObj[key]) {
          row = [...row,item.key, item.value];
        }
        if(max < appRelatedToWebObj[key].length) {
          max = appRelatedToWebObj[key].length;
        }
        const need = 26- row.length;
        if(need > 0) {
          for(let i= 0; i < need; i++) {
            logger.debug(i);
            row.push('--');
          }
        }
        logger.debug('后'+ row.length);
        conf.rows.push(row);
      } else {
        if(row.length < 26) {
          for(let i= 0; i < 24; i++) {
            row.push('--');
          }
        }
        conf.rows.unshift(row);
      }
    });
    wirteOutputFile(conf);
  }).catch((error) => {
    logger.debug(error);
  });
  res.render('index', { title: 'Find the same translation keys from the web as the App' });
});

function wirteOutputFile(conf) {
  const outputFilename = ('/Users/yuhanchen/repos/translation.xlsx');
  var result = nodeExcel.execute(conf);
  fs.writeFile(outputFilename, result, 'binary', function (err) {
    if (err) {
      logger.debug(err)
    } else {
      logger.debug("JSON saved to " + outputFilename);
    }
  });
}

function promisify(fn) {
  return function () {
    const args = arguments;
    return new Promise(function (resolve, reject) {
      [].push.call(args, function (err, result) {
        if (err) {
          logger.debug(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
      fn.apply(null, args);
    });
  }
}

function readDirRecur(file, callback) {
  return readdir(file).then(function (files) {
    files = files.map(function (item) {
      let fullPath = path.join(file, item);
      return stat(fullPath).then(function (stats) {
        if (stats.isDirectory()) {
          return readDirRecur(fullPath, callback);
        } else {
          /*not use ignore files*/
          if (item[0]=== '.') {
            logger.debug(item + ' is zh-cn')
          } else {
            return readFileFuc(fullPath, 'utf8').then(function (data) {
              callback(item, data, fullPath);
            });
          }
        }
      })
    });
    return Promise.all(files);
  });
}

function readFile(fileName) {
  if (fs.existsSync(fileName)) return fs.readFileSync(fileName, "utf-8");
}

module.exports = router;
