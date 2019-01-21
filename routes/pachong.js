import cheerio from 'cheerio'
import rp from 'request-promise'
import R from 'ramda'
import _ from 'lodash'
import { writeFileSync } from 'fs'
import { resolve } from 'path';

const sleep = time => new Promise(resolve => setTimeout(resolve,time)) //发动一次休息

let _house = [];
let _area = ''
let _areaDetail= [];
export const gethouse = async ( page = 1,area = '') =>{
    const options={
        uri:`https://hz.fang.anjuke.com/loupan/${area}/p${page}/`,
        transform: body => cheerio.load(body),
    }
    console.log("我正在爬"+options.uri);
    const $ = await rp(options)
    let house = [];
    
    $(".key-list .item-mod").each(function(){ //这里不能用箭头函数，会拿不到this
        const name = $(this).find(".infos .lp-name .items-name").text();
        const adress =  $(this).find(".address .list-map").text();
        const huxing = $(this).find(".huxing").text();
        const favorPos = $(this).find(".favor-pos .price-txt").text();
        const aroundPrice = $(this).find(".favor-pos .around-price").text();
        house.push({
            name,
            huxing,
            favorPos,
            aroundPrice,
            adress
        })
    })

    //细化处理
    const fn = R.compose(
        R.map((house) =>{
            const r1 = house.huxing.replace(/\s+/g,""); //去掉空格
            const r2 = house.aroundPrice.replace(/\s+/g,"");
            const index1 = r2.indexOf("价");
            const index2 = r2.lastIndexOf("/");
            const price = r2.slice(index1+1,index2-1)
            const reg = /[^\[]*\[(.*)\][^\]]*/;
            const r3 = house.adress.match(reg);
            const i = house.adress.lastIndexOf("]")+1;
            house.adress = house.adress.slice(i).replace(/\s+/g,"");
            house.huxing = r1;
            house.aroundPrice = price;
            house.area = r3[1]

            return house
        }),
        R.filter(house => house.name && house.adress && house.huxing && house.favorPos && house.aroundPrice) //判断数据是否齐全，字段不全则省去
    )

        house = fn(house);
        _house = _.union(_house,house)
        
    
    if($('.next-page').attr('href')){
        //writeFileSync("./static/House.json",JSON.stringify(_house,null,2),'utf-8')
        console.log(`${area}共有${_house.length}条数据`)
        await sleep(1000);  
        page++;
        await gethouse(page,_area)
    }else{
        console.log("爬完了！"+_house.length)

        return _house
    }

}

//拿到了地区的分区，现在去检索每个分区下的房价
export const getAreaDetail = async () =>{
    const area = require(resolve(__dirname,'../database/json/AreaDetail.json'))
    for(let i = 0; i<area.length; i++){
        let areaDetail = area[i]['areaDetail'];
        _areaDetail = _.union(_areaDetail,areaDetail)
        for(let j = 0; j< areaDetail.length; j++){
            _house=[]
            console.log(`正在爬取${areaDetail[j].text}`)
            _area = areaDetail[j]._id
            console.log(_area)
            await gethouse(1,_area)
            if(_house.length >0){
                areaDetail[j]['house'] = _house
            }
        }
    }
    writeFileSync("./server/database/json/detailHouse.json",JSON.stringify(area,null,2),'utf-8')  
}
