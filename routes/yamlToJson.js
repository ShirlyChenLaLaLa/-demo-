var express = require('express');
var router = express.Router();
var YAML = require('yamljs');
var fs = require("fs");
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

// file为文件所在路径
/* 将yaml文件转成json */
router.get('/', function (req, res, next) {
  var data = YAML.parse(fs.readFileSync('/Users/shirlychen/practice/nodeProject/node-/data/imgSize.yaml').toString());
  var imgSizes = {};
  Object.keys(data.parameters).forEach((key, index) => {
    if (key.indexOf('image_sizes') !== -1) {
      let keyArray = key.split('.');
      keyArray = keyArray.filter((item)=>{
        return item !== 'imagine_filter' && item !=='image_sizes'
      })
      // console.log(keyArray)
      keyArray.pop();
      const newKey = keyArray.join('.');
      if(key.indexOf('width')!== -1) {
        imgSizes[newKey] = data.parameters[key] + 'x' + data.parameters[key.replace('width','height')] 
      }
    }
  })
  console.log(imgSizes);
  // console.log(imgSizes)
  res.render('index', { title: 'my home' });
});

module.exports = router;
