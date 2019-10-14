// 201 
Physijs.scripts.worker = './lib/physijs_worker.js';
Physijs.scripts.ammo = './lib/ammo.js';


// 02
//RENDERER INPUT, SCENE (virtual environment)/CAMERA 
// let scene = new THREE.Scene();
let scene = new Physijs.Scene;


// let scene = new Physijs.Scene({ reportsize: 50, fixedTimeStep: 1 / 20 }); //Slow down scene to fix rotation bug
scene.setGravity(new THREE.Vector3( 0, -9.8, 0));
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//MECH


// 101
//INPUT OBJECT
let input = new Input();

// 001
// Environment
let environment = new Environment();

// 03
//INSTANCE OF RENDERER
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("#e5e5e5"); //BACKGROUND COLOR

// 04
//ADD CANVAS ELEMENT TO DOM
document.body.appendChild(renderer.domElement);

// 05
//MAKE WINDOW RESPONSIVE ON RESIZE
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
})

// 06
//RAYCASTER => VECTOR 'RAY'... RAY === Array? (like vector array?)
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();



// 07
//ELEMENT ONE (**LOOK UP MATERIAL OPTIONS**)
let playerGeometry = new THREE.CubeGeometry(5, 5, 5, 100); //PRIMITIVE SHAPE AND SIZE (set 3rd val to 111 for cat paw)
let playerMaterial = new THREE.MeshLambertMaterial({ color: 0x22CAC2, transparent: true, opacity: 0.0 }); //COLOR OF MESH
//ELEMENT ONE (**LOOK UP MATERIAL OPTIONS**)

// //Cat mode
// let playerGeometry = new THREE.CubeGeometry(1, 2, 111, 100); //PRIMITIVE SHAPE AND SIZE (set 3rd val to 111 for cat paw)
// let playerMaterial = new THREE.MeshLambertMaterial({ color: 0x22CAC2, transparent: true, opacity: 1.0 }); //COLOR OF MESH
// //Cat mode

// let player = new THREE.Mesh(playerGeometry, playerMaterial); //MESH POINTS MAT TO GEOMETRY
let player = new Physijs.BoxMesh(playerGeometry, playerMaterial); //MESH POINTS MAT TO GEOMETRY
player.position.set(0, 1, 0);
player.name = 'player';
// debugger
scene.add(player); //DROP ELEMENT INTO VIRTUAL ENVIRONMENT
camera.position.set(0, 8, 10);
camera.rotation.x = -.2
player.add(camera)



// 08
//LIGHT ONE
let light1 = new THREE.PointLight(0xFFFFFF, 2, 100);
light1.position.set(0, 0, 25)
scene.add(light1)

//LIGHT TWO
let light2 = new THREE.AmbientLight(0xFFFFFF, .25, 2);
light2.position.set(0, 0, 25)
scene.add(light2)

//LIGHT PLAYER
let light3 = new THREE.PointLight(0xFFFFFF, 2, 2);
light3.position.set(0, 0, 25)
player.add(light3)

// 09
//RENDER LOOP
// 102
//Normalize animation loop
let lastTimeStamp = 0;
// player.__dirtyPosition = true;
// player.__dirtyRotation = true;


//file is uploaded async...
// let children = Object.values(scene.children)
// debugger
// let mech;
// for (let i = 0; i < children.length; i ++) {
//   // debugger
//   if (children[i].name === 'mech') {
//     debugger
//     mech = children[i]
//   }
// }

// debugger


let clock = new THREE.Clock();
let _vector = new THREE.Vector3(0, 0, 0)
let animate = function (timeStamp) {
  // player.__dirtyPosition = true;
  // player.__dirtyRotation = true;
  
  player.setAngularFactor(_vector);
  player.setAngularVelocity(_vector);
  // player.setLinearVelocity(new THREE.Vector3(0, 0, 0));

  let delta = clock.getDelta(); // seconds
  let moveDistance = 200 * delta; // 200 pixels per second
  let rotateAngle = Math.PI / 2 * delta; // pi/2 radians (90 deg) per sec


  requestAnimationFrame(animate);

  let timeDelta = (timeStamp - lastTimeStamp)/1000;
  lastTimeStamp = timeStamp;

  let movementSpeed = 12 * timeDelta;


  //BOOST
  let boost = 1;
  if (input.isShiftPressed) {
    boost = 15 * movementSpeed;
  }

  let playerSpeed = movementSpeed * boost * 2;
  
  //LEFT
  if (input.isLeftPressed) {
    player.__dirtyPosition = true;
    player.__dirtyRotation = true;

    player.translateOnAxis(new THREE.Vector3(playerSpeed * 100, 0, 0), -rotateAngle)

    // player.position.x -= Math.sin(player.rotation.y + Math.PI / 2) * playerSpeed;
    // player.position.z -= Math.cos(player.rotation.y + Math.PI / 2) * playerSpeed;
  }
  //RIGHT
  if (input.isRightPressed) {
    player.__dirtyPosition = true;
    player.__dirtyRotation = true;

    player.translateOnAxis(new THREE.Vector3(-playerSpeed * 100, 0, 0), -rotateAngle)

    // player.position.x += Math.sin(player.rotation.y + Math.PI / 2) * playerSpeed;
    // player.position.z += Math.cos(player.rotation.y + Math.PI / 2) * playerSpeed;
  }
  //JUMP  
  if (input.isSpacePressed) {
    player.__dirtyPosition = true;
    player.__dirtyRotation = true;
    player.translateOnAxis(new THREE.Vector3(0, -playerSpeed * 100, 0), -rotateAngle)

    // player.position.y += playerSpeed*2;
  }
  //FWD 


  if (input.isFwdPressed) {
    player.__dirtyPosition = true;
    player.__dirtyRotation = true;

    player.translateOnAxis(new THREE.Vector3(0, 0, playerSpeed*100), -rotateAngle)

    // player.position.x -= Math.sin(player.rotation.y) * playerSpeed;
    // player.position.z -= Math.cos(player.rotation.y) * playerSpeed;
  }
  //BACK 
  if (input.isBwdPressed) {
    player.__dirtyPosition = true;
    player.__dirtyRotation = true;

    player.translateOnAxis(new THREE.Vector3(0, 0, -playerSpeed * 100), -rotateAngle)

    // player.position.x += Math.sin(player.rotation.y) * playerSpeed;
    // player.position.z += Math.cos(player.rotation.y) * playerSpeed;
  }
  //RotLeft
  if (input.isRLPressed) {
    // player.rotation.y += playerSpeed/4;
    player.rotateOnAxis(new THREE.Vector3(0, 1, 0), +0.05); 
    // console.log(player.rotateOnAxis)
    player.__dirtyPosition = true;
    player.__dirtyRotation = true;
  }
  //RotRight
  if (input.isRRPressed) {

    player.rotateOnAxis(new THREE.Vector3(0, 1, 0), -0.05); 
    player.__dirtyPosition = true;
    player.__dirtyRotation = true;
  }

  


  // //GRAVITY...fix this please
  // if (player.position.y <= 1) {
  //   player.translateOnAxis(new THREE.Vector3(0, 0, 0), -rotateAngle)
  // } else {
  //   player.translateOnAxis(new THREE.Vector3(0, playerSpeed * 50, 0), -rotateAngle)
  // }
  // camera.lookAt(player.position)
  scene.simulate();
  renderer.render(scene, camera);
};

// 11 
//...10 is mouse event listener, 12 is adding listener to window)...
// CALL RENDER LOOP
animate();