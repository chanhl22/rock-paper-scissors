new Vue({
    el: '#app',
    data: {
        myChoice: null,
        comChoice: null,
        count: 3,
        myLife: 3,
        comLife: 3,
        isClick: true,
        winner: null,
        logList: [],
        selects: [
            { name: '가위', value: 'scissor' },
            { name: '바위', value: 'rock' },
            { name: '보', value: 'paper' },
        ],
    },
    computed: {
        myChoiceImage: function () {
            return this.myChoice !== null ? `images/${this.myChoice}.jpg` : `images/question.jpg`
        },
        comChoiceImage: function () {
            return this.comChoice !== null ? `images/${this.comChoice}.jpg` : `images/question.jpg`
        },
        remainMyLife: function () {
            return 3 - this.myLife;
        },
        remainComLife: function () {
            return 3 - this.comLife;
        },
    },
    watch: {
        count: function (newVal) {
            if (newVal === 0) {
                this.comPick();
                this.checkWinner();
                this.resetGame();
                this.updateLog();
            }
        },
        myLife: function (newVal) {
            this.endGame('패배', newVal);
        },
        comLife: function (newVal) {
            this.endGame('승리', newVal);
        }
    },
    methods: {
        startGame: function () {
            if (this.myChoice === null) {
                alert('가위, 바위, 보 중 하나를 선택해주세요');
            } else {
                this.isClick = false;
                this.comChoice = null;
                let stop = setInterval(function () {
                    this.count--;
                    if (this.count === 0) {
                        clearInterval(stop);
                    }
                }.bind(this), 1000);
            }
        },
        comPick: function () {
            let randomNum = Math.random();
            if (randomNum < 0.33) {
                this.comChoice = 'rock';
            } else if (randomNum < 0.66) {
                this.comChoice = 'paper';
            } else {
                this.comChoice = 'scissor';
            }
        },
        checkWinner: function () {
            if ((this.myChoice === 'rock' && this.comChoice === 'scissor')
                || (this.myChoice === 'scissor' && this.comChoice === 'paper')
                || (this.myChoice === 'paper' && this.comChoice === 'rock')) {
                this.comLife--;
                this.winner = 'YOU';
            } else if ((this.comChoice === 'rock' && this.myChoice === 'scissor')
                || (this.comChoice === 'scissor' && this.myChoice === 'paper')
                || (this.comChoice === 'paper' && this.myChoice === 'rock')) {
                this.myLife--;
                this.winner = 'COMPUTER';
            } else {
                this.winner = 'NO';
            }
        },
        resetGame: function () {
            this.count = 3;
            this.isClick = true;
        },
        updateLog: function () {
            let log = {
                message: `YOU : ${this.myChoice}, COMPUTER : ${this.comChoice}`,
                winner: this.winner
            }
            this.logList.unshift(log);
        },
        endGame: function (endMassage, newVal) {
            if (newVal == 0) {
                setTimeout(() => {
                    confirm(endMassage);
                    this.myChoice = null;
                    this.comChoice = null;
                    this.count = 3;
                    this.myLife = 3;
                    this.comLife = 3;
                    this.isClick = true;
                    this.winner = null;
                    this.logList = [];
                }, 500)
            }
        }
    }
})