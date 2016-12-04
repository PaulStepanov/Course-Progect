/**
 * Created by Павел on 30-Nov-16.
 */
var express = require('express');
var router = express.Router();

//Передается массив ссылок которые надо игорить
function initTokenCheck(array) {
    router.all('*', function (req, resp, next) {
        //Добавляем игнор путей
        var ignore;//boolean
        if (array) {
            array.forEach(function (elem) {
                var regexp = new RegExp(`${elem}.*`);
                if (regexp.test(req.originalUrl)) {
                    next();
                    ignore=true;
                }
            });
        }
        next();
        // if (!ignore) {
        //     //Получаем из заголовка токен
        //     req.get("token");
        //     resp.send('r');
        // }
    });
    return router;
}

module.exports = initTokenCheck;
