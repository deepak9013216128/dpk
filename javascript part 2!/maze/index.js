const {
    Engine,
    Render,
    Runner,
    World,
    Bodies,
    Body,
    Events
    } = Matter;
//Engine -> note the transation from one state to another state
//World ->  object and method for describe the world
//Runner -> update and cordinate between Engine and World
//Render -> display all stuff on the screen
//Bodies -> shape like circle,ractange,tigangle,polygen

//---- create a new engine
const engine = Engine.create();
//---- world is snapshot of a engine
const {world} = engine;
engine.world.gravity.y = 0;

const cellsHorizontal = 6;
const cellsVetrical = 4;
const width = window.innerWidth;
const height = window.innerHeight;
const unitLengthX = width/cellsHorizontal;
const unitLengthY = height/cellsVetrical;

//---- render tell that where we representation of everything in html document
const render = Render.create({
    element:document.body, // represent all the thing in html body
    engine:engine,         // what engine to use
    options:{
        wireframes:false,   // make all shape to solid and choose random color
        width,
        height
    }
});
//---- tell the render to run and draw all update on screen
Render.run(render);

//---- Runner cordinate engine from one state to another state
Runner.run(Runner.create(),engine);
/*
//----                         (x, y) ,(width,height) 
//----                          |  |     |      |
const shape = Bodies.rectangle(200,200,  50,   50,{
    //isStatic:true
})
World.add(world,shape);
*/
// WALLS
const walls = [
    Bodies.rectangle(width/2, 0, width, 2, {isStatic:true}),
    Bodies.rectangle(width/2, height, width, 2,{isStatic:true}),
    Bodies.rectangle(0, height/2, 2, height,{isStatic:true}),
    Bodies.rectangle(width, height/2, 2, height,{isStatic:true})
]
World.add(world,walls)


// MAZE GENERATIONS       
const suffle = (arr)=>{
    let counter = arr.length;
    while(counter){
        const index = Math.floor(Math.random() * counter);
        counter--;
        const temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    }
    return arr;
}

                                            //   __ __ __
let grid = Array(cellsVetrical )                     //  |__|__|__|
    .fill(null)                             //  |__|__|__|
    .map(()=>Array(cellsHorizontal).fill(false))      //  |__|__|__|

let verticals = Array(cellsVetrical)                //     |  |
    .fill(null)                             //     |  |
    .map(()=>Array(cellsHorizontal-1).fill(false))    //     |  |
    
let horizontals = Array(cellsVetrical-1)            //   __ __ __
    .fill(null)                             //   __ __ __
    .map(()=>Array(cellsHorizontal).fill(false))      //   

const startRow = Math.floor(Math.random() * cellsVetrical);
const startColumn = Math.floor(Math.random() * cellsHorizontal);

const setpThroughCell = (row, column)=>{
    // If i visited the cell [row,column] ,then return it
    if(grid[row][column]===true){
        return;
    }
    // Mark this cell is visited
    grid[row][column] = true;

    // Assemble random list of neighbors
    const neighbors = suffle([
        [row-1,column, 'up'],
        [row+1,column, 'down'],
        [row,column-1, 'left'],
        [row,column+1, 'right']
    ]);
    // For each neighbor
    for(let neighbor of neighbors){
        const [nextRow,nextColumn,direction] = neighbor;
        //See if neighbor is out of bonds
        if(nextRow < 0 || nextRow >= cellsVetrical || nextColumn < 0 || nextColumn >=cellsHorizontal){
            continue;
        }
        // If we visited that neighbor, continue to nextn neighbor
        if(grid[nextRow][nextColumn]===true){
            continue;
        }
        // Remove a wall form either horizontals or verticals
        if(direction === 'left'){
            verticals[row][column-1] = true;
        } else if(direction === 'right'){
            verticals[row][column] = true;
        } else if(direction === 'up'){
            horizontals[row-1][column] = true;
        }else{
            horizontals[row][column] = true;
        }
        // Visit the next cell
        setpThroughCell(nextRow,nextColumn);
    }
}

setpThroughCell(startRow,startColumn);

horizontals.forEach((row,rowIndex)=>{
    row.forEach((open,columnIndex)=>{
        if(open){
            return
        }
        const wall = Bodies.rectangle(
            unitLengthX*columnIndex + unitLengthX/2,
            unitLengthY*rowIndex + unitLengthY,
            unitLengthX,
            5,
            {
                label:'wall',
                isStatic:true,
                render:{
                    fillStyle:'red'
                }
            }
        );
        World.add(world,wall);
    })
});
verticals.forEach((row,rowIndex)=>{
    row.forEach((open,columnIndex)=>{
        if(open){
            return
        }
        const wall = Bodies.rectangle(
            unitLengthX*columnIndex + unitLengthX,
            unitLengthY*rowIndex + unitLengthY/2,
            5,
            unitLengthY,
            {
                label:'wall',
                isStatic:true,
                render:{
                    fillStyle:'red'
                }
            }
        );
        World.add(world,wall);
    })
})

// GOAL
const goal = Bodies.rectangle(
    width-unitLengthX/2,
    height-unitLengthY/2,
    unitLengthX * 0.7,
    unitLengthY * 0.7,
    {
        label: 'goal',
        isStatic:true,
        render:{
            fillStyle:'green'
        }
    }
);
World.add(world,goal);

// BALL
const ballRadius = Math.min(unitLengthX,unitLengthY)/4;
const ball = Bodies.circle(
    unitLengthX/2,
    unitLengthY/2,
    ballRadius,
    {
        label: 'ball',
        render:{
            fillStyle:'blue'
        }
    }
);
World.add(world,ball);

//---- control the ball
document.body.addEventListener('keydown',event =>{
    const {x,y} = ball.velocity;
    if(event.key === 'w'){
        //console.log(' Move Up')
        Body.setVelocity(ball,{x, y:y-3});
    }
    if(event.key === 's'){
        // console.log(' Move Down')
        Body.setVelocity(ball,{x, y:y+3});
    }
    if(event.key === 'a'){
        // console.log(' Move Left')
       Body.setVelocity(ball,{x:x-3, y});
    }
    if(event.key === 'd'){
        // console.log(' Move Right')
        Body.setVelocity(ball,{x:x+3, y});
    }
})

// WIN CONDITION
Events.on(engine,'collisionStart', event=>{
    event.pairs.forEach( collision =>{
        const label = ['goal','ball']
        if(
            label.includes(collision.bodyA.label) &&
            label.includes(collision.bodyB.label)
        ){
            document.querySelector('.winner').classList.remove('hidden');
            engine.world.gravity.y = 1;
            world.bodies.forEach( body =>{
                if(body.label === 'wall'){
                   Body.setStatic(body,false);
                }
            });
        }
    });
});
