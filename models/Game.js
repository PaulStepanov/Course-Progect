/**
 * Created by Павел on 04-Dec-16.
 */
//imports
const Player = require('../models/Player');
const Timer = require('timrjs');


let Game = class Game {
    constructor(questions) {
        //fields
        this.currentQuestion = null;
        this.players = [];
        this.questions = questions;
        this.usersAnswers = [];
        //private
        this._state = false;
        this._timer = new Timer('00:00');
        this._currentQuestionIterator = (function makeIterator(array) {
            var nextIndex = 0;
            return {
                next: function () {
                    return nextIndex < array.length ?
                    {value: array[nextIndex++], done: false} :
                    {done: true};
                }
            }
        })(questions);
    }

    //getters and setters
    get isStarted() {
        return this._state;
    }

    get timerTime() {
        return this._timer.getCurrentTime();
    }

    //methods
    addPlayer(player) {
        this.players.push(player)
    }

    start() {
        this._state = true;
        this._procceedQuestion(this._currentQuestionIterator.next().value);
    }

    //TODO не работает сравнение json-обьектов,реализовать самому компаратор тип
    answer(player, answer) {
        if (this.players.includes(player)) {
            var answ = {
                team: player,
                answer: answer,//user answer number 2
                right: false//TODO сравнить с правильным
            };
            if (!this.usersAnswers.includes(answ)) {
                this.usersAnswers.push(answ)
            } else {
                console.log('there were such answer');
            }
        } else {
            console.log('no such player');
        }
    }

    /*Активирует вопрос,выставляя таймер,выставлять текущий вопрос*/
    _procceedQuestion(question) {
        this.currentQuestion = question;
        this._timer.setStartTime(question.time);
        var self = this._timer;
        //Функция по окончанию таймера
        this._timer.finish(self=> {
            question = this._currentQuestionIterator.next();
            if (question.done != true) {
                this._timer = new Timer("00:00");
                question = question.value;
                this._procceedQuestion(question);
            } else {
                console.log("game ended");
            }
            //TODO Добавить функционал если человек ничего не ответил
        });
        this._timer.start();
    }
};
module.exports = Game;