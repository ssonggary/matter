//윈도우(브라우저)의 크기를 변수에 담는다.
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
const container = document.getElementById("areaToRender");
const THICCNESS = 60;

const SVG_SELECTOR = "#svg";
const SVG_WIDTH_IN_PX = 100;
const SVG_WIDTH_AS_PERCENT_OF_CONTAINER_WIDTH = 0.3;

// const div = document.getElementById('areaToRender');

// module aliases
let Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Common = Matter.Commen,
  Composite = Matter.Composite,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint,
  Vectices = Matter.Vertices,
  Vector = Matter.Vector,
  Svg = Matter.Svg;

//provide concave decomposition support library
// Common.setDecomp(require("poly-decomp"));

// create an engine
let engine = Engine.create(),
  world = engine.world;

// create a renderer
let render = Render.create({
  element: container,
  engine: engine,
  options: {
    width: container.clientWidth,
    height: container.clientHeight,
    background: "#fafafa",
    wireframes: false,
    showAngleIndicator: false,
  },
});

// run the renderer
Render.run(render);

// create runner
let runner = Runner.create();
Runner.run(runner, engine);

function handleResize(container) {
  //set cavas size to new values
  render.canvas.width = container.clientWidth;
  render.canvas.height = container.clientHeight;

  //responsition ground
  Matter.Body.setPosition(ground, Matter.Vector.create(container.clientWidth / 2, container.clientHeight + THICCNESS / 2));

  //responsition right wall
  Matter.Body.setPosition(rightWall, Matter.Vector.create(container.clientWidth + THICCNESS / 2, container.clientHeight / 2));
}

window.addEventListener("resize", () => handleResize(container));

// create two boxes and a ground
let boxA = Bodies.rectangle(400, -200, 80, 80);
let circleA = Bodies.circle(500, -500, 75, {
  restitution: 0.5,
  render: {
    sprite: {
      texture: "./svg/icon_1.svg",
      xScale: 0.3,
      yScale: 0.3,
    },
  },
});
createCircle();
// createSvgBodies();

let boxB = Bodies.rectangle(450, -400, 80, 80);
let ground = Bodies.rectangle(container.clientWidth / 2, container.clientHeight + THICCNESS / 2, 27184, THICCNESS, { isStatic: true });
let leftWall = Bodies.rectangle(0 - THICCNESS / 2, container.clientHeight / 2, THICCNESS, container.clientHeight * 5, { isStatic: true });
let rightWall = Bodies.rectangle(container.clientWidth + THICCNESS / 2, container.clientHeight / 2, THICCNESS, container.clientHeight * 5, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, circleA, ground, leftWall, rightWall]);

function createCircle() {
  let circleDiameter = container.clientWidth * SVG_WIDTH_AS_PERCENT_OF_CONTAINER_WIDTH;
  let circle = Bodies.circle(container.clientWidth / 2, -600, circleDiameter / 2, {
    friction: 0.3,
    frictionAir: 0.00001,
    restitution: 0.8,
    render: {
      fillStyle: "#ECA869",
      strokeStyle: "#ECA869",
    },
  });
  Composite.add(engine.world, circle);
}

for (let i = 0; i < 40; i++) {
  let circle = Bodies.circle(i, -500, 70, {
    friction: 0.3,
    frictionAir: 0.00001,
    restitution: 0.8,
  });

  Composite.add(engine.world, circle);
}

let mouse = Mouse.create(render.canvas);
let mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: {
      visible: false,
    },
  },
});

Composite.add(engine.world, mouseConstraint);

//allow scroll through the canvas
mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

// function createSvgBodies() {
//   const paths = document.querySelectorAll(SVG_SELECTOR);
//   paths.forEach((path, index) => {
//     let vertices = Svg.pathToVertices(path);
//     let scaleFactor = (container.clientWidth * SVG_WIDTH_AS_PERCENT_OF_CONTAINER_WIDTH) / SVG_WIDTH_IN_PX;
//     vertices = Vectices.scale(vertices, scaleFactor, scaleFactor);
//     let svgBody = Bodies.fromVertices(index * SVG_WIDTH_IN_PX + 200, 0, [vertices]);
//   });
//   Composite.add(engine.world, svgBody);
// }
