const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require('path');
const log4js = require('log4js')
const logger = log4js.getLogger()
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFileFuc = promisify(fs.readFile);
logger.level = 'debug';

// 筛除native-mobile-app里面已经不用的翻译的key，并重新生成一个新的翻译json文件
router.get('/', async function (req, res, next) {
  const usingKeys = new Set();
  const translationData = await JSON.parse(readFile('/Users/yuhanchen/repos/native-mobile-app/src/resources/translations/zh-cn.json'));
  const fullPaths = [];

  readDirRecur('/Users/yuhanchen/repos/native-mobile-app/src', (item, data, fullPath) => {
    fullPaths.push(fullPath);
  }).then(() => {
    logger.debug('done');
    Object.keys(translationData).forEach((translationKey) => {
      fullPaths.forEach((path) => {
        const pageData = readFile(path);
        if (pageData.search(translationKey.replace('.', ':')) !== -1) {
          usingKeys.add(translationKey);
        }
     
        const matchArray = pageData.match(/\.t\(`([a-zA-Z0-9_\.:]+)\.\$.*?`\)/g);
        if (matchArray) {
          const matchData = matchArray[0].match((/\.t\(`([a-zA-Z0-9_\.:]+)\.\$.*?`\)/));
          // logger.debug(translationKey, matchData[1].replace(':','.'));
          if (translationKey.search(matchData[1].replace(':','.')) !== -1) {
            logger.debug(translationKey);
            usingKeys.add(translationKey);
          }
        }
      });
      if (translationKey.search('srp:filters.room_type.') !== -1) {
        usingKeys.add(translationKey);
      }
    })

    const myData = {};
    usingKeys.forEach((usingkey) => {
      myData[usingkey] = translationData[usingkey];
    })
    wirteOutputFile(myData);
  }).catch((error) => {
    logger.debug(error);
  });
  res.render('index', { title: 'Build a program to find all useless localization key in App' });
});

function wirteOutputFile(myData) {
  const outputFilename = ('/Users/yuhanchen/repos/native-mobile-app/src/resources/translations/new-zh-cn.json');
  fs.writeFile(outputFilename, JSON.stringify(myData, null, 4), function (err) {
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
          if (item.search('zh-cn') !== -1) {
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


// function fileDisplayPath(filePath) {
//   fs.readdir(filePath, (err, files) => {
//     let endTag = 0;
//     if (err) {
//       logger.debug(err)
//     } else {
//       files.forEach((filename) => {
//         let filedir = path.join(filePath, filename)
//         fs.stat(filedir, (error, stats) => {
//           if (error) {
//             logger.debug(error)
//           } else {
//             let isFile = stats.isFile()
//             let isDir = stats.isDirectory()
//             if (isFile) {
//               allPaths.push(filedir);
//             }
//             if (isDir) {
//               // 递归
//               fileDisplayPath(filedir)
//             }
//             if (++endTag == files.length) {
//               return cb(ret);
//             }
//           }
//         })
//       })
//     }
//   })
//   return allPaths;
// }

function readFile(fileName) {
  if (fs.existsSync(fileName)) return fs.readFileSync(fileName, "utf-8");
}

function check(data, lookingForString) {
  if (data.search(lookingForString) !== -1) {
    return true;
  }
  return false;
}

module.exports = router;
