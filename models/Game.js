/**
 * Created by Павел on 04-Dec-16.
 */
//imports
const Player = require('../models/Player');
const Timer = require('timrjs');
var Question=require('../models/Question');

let Game = class Game {
    constructor(questions) {
        //fields
        this.currentQuestion = null;
        this.currentQuestionNumber = 0;
        this.players = [];
        this.questions = questions;
        this.usersAnswers = [];
        //private
        this._state = false;
        this.timer = new Timer('00:00');
        this._currentQuestionIterator = (function makeIterator(array) {
            var nextIndex = 0;
            return {
                next: function () {
                    return nextIndex < array.length ?
                    {value: array[nextIndex++], done: false,index:nextIndex++} :
                    {done: true};
                }
            }
        })(questions);

        //Костыль
        questions.push(new Question('Questions is ended','','13:37'))
    }

    //getters and setters
    get isStarted() {
        return this._state;
    }

    get timerTime() {
        return this.timer.getCurrentTime();
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
                question_number:this.currentQuestionNumber,
                answer: answer,//user answer number 2
                right: false//TODO сравнить с правильным
            };
            if (true) {
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
        this.currentQuestionNumber++;
        this.timer.setStartTime(question.time);
        var self = this.timer;
        //Функция по окончанию таймера
        this.timer.finish((self) => {
            question = this._currentQuestionIterator.next();
            if (question.done != true) {
                this.timer = new Timer("00:00");
                question = question.value;
                if (question) {
                    this._procceedQuestion(question);
                } else {
                    console.log("game ended");

                }
            } else {
                console.log("game ended");

            }
            //TODO Добавить функционал если человек ничего не ответил
        });
        this.timer.start();
    }
}
module.exports = Game;