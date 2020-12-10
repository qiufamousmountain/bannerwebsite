/**
 * Created by zhangyuntao on 2018/10/9.
 */

const fs = require('fs');
const path = require('path');

const image = require("imageinfo")
const moment = require('moment-mini');

module.exports = {

    //下车
    getBanner_bac: async (req, res) => {
        let arr = [];
        // 判断是否文件夹

        let imageFolder = path.resolve(__dirname, '../public/images')
        // fs.statSync(imageFolder + '/' + moment(new Date().format('YYYY-MM-DD')))
        let files = fs.readdirSync(imageFolder) // 读取目录
        files.forEach((item, index) => { // item: 目录和文件名称
            console.log(item);
            let filesPath = path.resolve(imageFolder, item) // 绝对路径：e:\wirteImgSrc\image

            //是文件
            if (fs.statSync(filesPath)) {
                var ms = image(fs.readFileSync(filesPath));
                console.log(ms);
                ms.url = item
                ms.mimeType && (arr.push(ms))
            }




        })
        res.send({ code: 200, data: arr });
    },

    getBanner: async (req, res) => {
        let arr = [];
        // 判断是否文件夹

        let imageFolder = path.resolve(__dirname, '../public/images')
        // fs.statSync(imageFolder + '/' + moment(new Date().format('YYYY-MM-DD')))
        let files = fs.readdirSync(imageFolder) // 读取目录
        //获取最新目录
        let latestDir = []
        files.forEach((item, index) => { // item: 目录和文件名称
            let filesPath = path.resolve(imageFolder, item) // 绝对路径：e:\wirteImgSrc\image
            let filedetail = fs.statSync(filesPath);
            if (filedetail.isDirectory()) {
                latestDir.push(item)
            }
        })
        if (latestDir.length < 1) {
            res.send({ code: 200, data: [] });
            return
        }
        latestDir = latestDir.sort((a, b) => a - b)
       

        function mapdir(latestDir) {
            if (latestDir.length < 1) return
            let latest = latestDir.pop();
            console.log(latestDir, latest)

            let lpath = path.resolve(imageFolder, latest)
            let fileslatest = fs.readdirSync(lpath);
            if (!fileslatest.length) {
                mapdir(latestDir)
                return
            }

            fileslatest.forEach((item, index) => { // item: 目录和文件名称
                let filesPath = path.resolve(lpath, item) // 绝对路径：e:\wirteImgSrc\image
                // //是文件
                if (fs.statSync(filesPath)) {
                    var ms = image(fs.readFileSync(filesPath));
                    ms.url = latest + '/' + item
                    ms.mimeType && (arr.push(ms))
                }
            })

        }
        mapdir(latestDir)


        res.send({ code: 200, data: arr });
    },

};

