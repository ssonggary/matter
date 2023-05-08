//윈도우(브라우저)의 크기를 변수에 담는다.
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

// module aliases
const Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Events = Matter.Events;
//consol.log(matter);를 찍어보면 다양한 기능들이 있디.

// create an engine
//엔진 생성
const engine = Engine.create();
const world = engine.world;
engine.world.gravity.y = 1;
//engine.world.gravity.y y축으로 떨어지는 속도를 정한다.(중력)
//0보다 작은 경우 오브제들이 위로 올라간다.
//engine.world.gravity.x 속성은 오른쪽에서 왼쪽으로 가도록 한다.

//Bodies에서 오브제를 만든다.
// 이름대로 circle은 원, reactagle은 사각형을 만든다.
//Bodies.circle은(x축 위치값, y축 위치값, 너비값, 높이값, 옵션)
//Bodies.rectangle(x축 위치값, y축 위치값, 너비값, 높이값, 옵션);

const circle = Bodies.circle(windowWidth / 2, 50, 10, {
  friction: 0.5,
  //마찰력 값 (0 ~ 1)
  restitution: 0.9,
  //복원력 값 (0 ~ 1)
  render: {
    fillStyle: "#000",
    strokeStyle: "#000",
    lineWidth: 1,
  },
});

const ground = Bodies.rectangle(windowWidth / 2, windowHeight - 50, windowWidth / 3, 10, {
  isStatic: true,
  //고정된 위치의 오브제
});

//world에 위 오브제들을 추가하기
World.add(engine.world, [circle, ground]);

// create a renderer
//렌더 생성
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: windowWidth,
    height: windowHeight,
    //기본값은 wireFrames 값이 true이고 false를 주지 않으면 위에 작성한 Bodies.circle의 render 옵션이 적용되지 않는다.
    Wireframes: false,
    background: "#fff",
  },
});

// run the renderer
//엔진 실행
Engine.run(engine);
//랜더 실행
Render.run(render);

//render 객체의 canvas는 DOM body에 추가 될 canvas 엘리먼트를 가르킨다.
render.canvas.addEventListener(
  "click",
  (e) => {
    //캔버스를 마우스로 클릭하면 현재 마우스 위치에서 반지름이 10인 원 만들기
    const box = Bodies.circle(e.offsetX, e.offsetY, 10, {
      friction: 0.2,
      restitution: 0.8,
    });
    //공간에 추가
    World.add(engine.world, box);
  },
  false
);

//1초 간격으로
setInterval(() => {
  //가로 중앙, 상단에서 50px 떨어진 곳에 반지름이 10인 원을 만들기
  const box = Bodies.circle(windowWidth / 2, 50, 10, {
    friction: 0.2,
    restitution: 0.8,
  });
  //공간에 추가
  World.add(engine.world, box);
}, 1000);

//collisionStart는 오브제 간의 충돌의 시작한 시점의 이벤트
Events.on(engine, "collisionStart", (event) => {
  //오브제들이 충동하면 console.log를 출력
  // console.log('collisionStart');
});
