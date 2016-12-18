/**
 * Created by Павел on 17-Dec-16.
 */

var express = require('express');
var router = express.Router();
var Player=require('../models/Player');
var Game= require('../models/Game');
var Question=require('../models/Question');
var player=new Player("Pasha");
/* GET home page. */
var game =new Game([new Question("testОхотник неожиданно столкнулся на пустыре" +
    "нос к носу с медведем." +
    "Оба испугались и побежали в разные стороны: охотник – на север," +
    "а медведь – на запад. Пробежав какое-то расстояние, охотник опомнился," +
    "направил ружьё точно на Юг, выстрелил и убил медведя." +
    "Какого цвета был медведь?","test","00:20"),
    new Question("test2","test2","00:15")]);
router.get('/', function(req, res, next) {

    game.addPlayer(player);
    if (!game.isStarted)
        game.start();
    console.log(game.currentQuestion);
    //login
    var username=undefined;
    if (req.session.user) {
        username=req.session.user.login;
    }
    res.render('game', { user:username});
});

router.get('/answer',function (req, res, next) {
    game.answer(player,req.param('answer'));
});

router.get('/getQuestion',function (req, res, next) {
    if (game.isStarted) {
        res.json({
            text: game.currentQuestion.text,
            time: game.timer.getCurrentTime()
        })
    } else {
        res.json({
            text:"Game is ended!",
            time:0
        })
    }
});

router.get('/stat', function(req, res, next) {
//uset
    var username=undefined;
    if (req.session.user) {
        username=req.session.user.login;
    }
    res.render('stat', { answers:game.usersAnswers ,user:username});
});
router.get('/questions', function(req, res, next) {


//uset
    var username=undefined;
    if (req.session.user) {
        username=req.session.user.login;
    }
    res.render('questions', { questions:game.questions ,user:username});
});
module.exports = router;