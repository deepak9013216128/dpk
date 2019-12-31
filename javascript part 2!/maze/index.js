const {Engine,Render,Runner,World,Bodies,MouseConstraint,Mouse} = Matter;
//Engine -> note the transation from one state to another state
//World ->  object and method for describe the world
//Runner -> update and cordinate between Engine and World
//Render -> display all stuff on the screen
//Bodies -> shape like circle,ractange,tigangle,polygen

//---- create a new engine
const engine = Engine.create();
//---- world is snapshot of a engine
const {world} = engine;
//---- render tell that where we representation of everything in html document

let width = 800;
let height = 600;
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

//---- click and drag on screen
World.add(world,
    MouseConstraint.create(engine,{
        mouse: Mouse.create(render.canvas)
    })
);

//----                         (x, y) ,(width,height) 
//----                          |  |     |      |
const shape = Bodies.rectangle(200,200,  50,   50,{
    //isStatic:true
})
World.add(world,shape);

//---- generate  Random shape
for(let i=0;i<50;i++){
    if(Math.random() > 0.5){
        World.add(world,Bodies.rectangle(Math.random ()* width, Math.random() * height,50,50))
    }else{
        World.add(world,Bodies.circle(Math.random ()* width, Math.random() * height,35,{
            render:{
                fillStyle: 'green'
            }
        }))
    }
}

// WALLS
const walls = [
    Bodies.rectangle(400,0,800,40,{isStatic:true}),
    Bodies.rectangle(400,600,800,40,{isStatic:true}),
    Bodies.rectangle(0,300,40,600,{isStatic:true}),
    Bodies.rectangle(800,300,40,600,{isStatic:true})
]
World.add(world,walls)








