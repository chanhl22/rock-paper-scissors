new Vue({
    el: '#app',
    data: {
        myChoice: null,
        comChoice: null,
        count: 3
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
            }
        }
    },
    methods: {
        startGame: function () {
            if (this.choice === null) {
                alert('가위, 바위, 보 중 하나를 선택해주세요');
            } else {
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