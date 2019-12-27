
const durationsInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pausebutton = document.querySelector('#pause');

const circle = document.querySelector('circle')
console.log(circle);
const parameter = circle.getAttribute('r')* Math.PI *2;
circle.setAttribute('stroke-dasharray',parameter);

let duration ;
const timer = new Timer(durationsInput,startButton,pausebutton,{
    onStart(totalDuration){
        console.log('Timer Started!!!');
        duration = totalDuration;
    },
    onTick(timeRamaining){
        circle.setAttribute('stroke-dashoffset',parameter*timeRamaining/duration-parameter);
        console.log('Timer Is Tick Down');
    },
    onComplete(){
        console.log('Timer Completed!!!')
    }
});




