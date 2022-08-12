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
    },
    watch: {
        count: function (newVal) {
            if (newVal === 0) {
                let randomNum = Math.random();
                if (randomNum < 0.33) {
                    this.comChoice = 'rock';
                } else if (randomNum < 0.66) {
                    this.comChoice = 'paper';
                } else {
                    this.comChoice = 'scissor';
                }
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
                }
                this.count = 3;
                this.isClick = true;
                let log = {
                    message: `YOU : ${this.myChoice}, COMPUTER : ${this.comChoice}`,
                    winner: this.winner
                }
                this.logList.unshift(log);
            }
        }
    },
    methods: {
        startGame: function () {
            if (this.myChoice === null) {
                alert('가위, 바위, 보 중 하나를 선택해주세요');
            } else {
                this.isClick = false;
                let stop = setInterval(function () {
                    this.count--;
                    if (this.count === 0) {
                        clearInterval(stop);
                    }
                }.bind(this), 1000);
            }
        }
    }
})