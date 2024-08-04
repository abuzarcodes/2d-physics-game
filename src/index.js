var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Composite = Matter.Composite;

var engine = Engine.create();
var container = document.getElementById("container");
// engine.enableSleeping = true;

// random color generator function
function hexCodeGen() {
  var characters = "0123456789ABCDEF";
  var randomColor = "#";

  for (var i = 0; i < 6; i++) {
    randomColor += characters[Math.floor(Math.random() * characters.length)];
  }

  return randomColor;
}

// add shape function
function addShapeToRender(shape) {
  Composite.add(engine.world, [...shape]);
}

// shapes function
function addBox(x, y, w, h, obj) {
  let box = Bodies.rectangle(x, y, w, h, { ...obj });
  return box;
}
function addTrap(x, y, w, h, slope, obj) {
  let box = Bodies.trapezoid(x, y, w, h, slope, { ...obj });
  return box;
}
function addPoly(x, y, sides, r, obj) {
  let box = Bodies.polygon(x, y, sides, r, { ...obj });
  return box;
}
function addCircle(x, y, r, obj) {
  let box = Bodies.circle(x, y, r, { ...obj });
  return box;
}
// create a renderer
var render = Render.create({
  element: container,
  engine: engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
    showVelocity: false,
    wireframes: false,
    background: "#000",
  },
});
render.canvas.width = window.innerWidth;
render.canvas.height = window.innerHeight;

const xValue = () => {
  return Math.floor(Math.random() * window.innerWidth + 1);
};
console.log(xValue());

const circleBtn = document.getElementById("circle");
const boxBtn = document.getElementById("box");
const trapBtn = document.getElementById("trap");
const polyBtn = document.getElementById("polygon");

let shapeSize = 100;
circleBtn.addEventListener("click", () => {
  let circle = addCircle(xValue(), 100, shapeSize, {
    friction: 1,
    restitution: 0,
    render: {
      fillStyle: hexCodeGen(),
      lineWidth: 0,
    },
  });
  addShapeToRender([circle]);
});
boxBtn.addEventListener("click", () => {
  let box = addBox(xValue(), 100, shapeSize, shapeSize/2, {
    friction: 1,
    restitution: 0,
    render: {
      fillStyle: hexCodeGen(),
      lineWidth: 0,
    },
  });
  addShapeToRender([box]);
});
trapBtn.addEventListener("click", () => {
  let trap = addTrap(xValue(), 100, shapeSize, shapeSize/2, 0.6, {
    friction: 1,
    restitution: 0,
    render: {
      fillStyle: hexCodeGen(),
      lineWidth: 0,
    },
  });
  addShapeToRender([trap]);
});
polyBtn.addEventListener("click", () => {
  let poly = addPoly(xValue(), 100, 6, shapeSize, {
    friction: 1,
    restitution: 0,
    render: {
      fillStyle: hexCodeGen(),
      lineWidth: 0,
    },
  });
  addShapeToRender([poly]);
});

const sizeSetter = document.getElementById("size");

sizeSetter.addEventListener("input", (e) => {
  shapeSize = e.target.valueAsNumber;
});

// ground
let ground = Bodies.rectangle(
  render.canvas.width / 2,
  render.canvas.height,
  2000,
  10,
  { isStatic: true, restitution: 1, render: { fillStyle: "black" } }
);
let wall = Bodies.rectangle(
  render.canvas.width,
  render.canvas.height / 2,
  1,
  2000,
  { isStatic: true, render: { fillStyle: "black" } }
);
let wall2 = Bodies.rectangle(0, render.canvas.height / 2, 1, 2000, {
  isStatic: true,
  render: { fillStyle: "black" },
});

// mouse controls
var mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });
Composite.add(engine.world, mouseConstraint);
Composite.add(engine.world, [ground, wall, wall2]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);
