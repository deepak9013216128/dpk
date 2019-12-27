class Timer{
    constructor(durationsInput,startButton,pausebutton,callback){
        this.durationsInput = durationsInput;
        this.startButton = startButton;
        this.pausebutton = pausebutton;
        if(callback){
            this.onStart = callback.onStart;
            this.onTick = callback.onTick;
            this.onComplete = callback.onComplete;
        }
        this.startButton.addEventListener('click',this.start);
        this.pausebutton.addEventListener('click',this.pause);
    }
    //-----------------------------------------------------------
    // use only arrow fuction
    //-----------------------------------------------------------
    start = ()=>{
        if(this.onStart){
            this.onStart(this.timeRamaining);
        }
        this.tick();
        this.interval = setInterval(this.tick,10);
    }
    pause = ()=>{
        clearInterval(this.interval);
    }
    tick = ()=>{
        if(this.timeRamaining <=0){
            this.pause();
            if(this.onComplete){
                this.onComplete();
            }
        }else{
            //--------------------------------------------
            // call setter        call getter      function
            //   ||                 ||
            //--------------------------------------------
            this.timeRamaining = this.timeRamaining - 0.01;
            if(this.onTick){
                this.onTick(this.timeRamaining);
            }
        }
    }

    //-----------------------------------------------------------
    // get and set keyword in class
    //-----------------------------------------------------------
    get timeRamaining(){
        return parseFloat(this.durationsInput.value);
    }
    set timeRamaining(time){
        this.durationsInput.value = time.toFixed(2);
    }
}