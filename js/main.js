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

// camera.position.z = 5;
// camera.position.set(0, 2, 5);


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


//GROUND
let groundGeometry = new THREE.PlaneGeometry(7000, 3000, 0); //PRIMITIVE SHAPE AND SIZE
let groundMaterial = new THREE.MeshBasicMaterial({ color: 0x22CAC2 }); //COLOR OF MESH
// let ground = new THREE.Mesh(groundGeometry, groundMaterial); //MESH POINTS MAT TO GEOMETRY
let ground = new Physijs.PlaneMesh(groundGeometry, groundMaterial); //MESH POINTS MAT TO GEOMETRY
ground.rotation.x = -0.5 * Math.PI;
ground.name = 'ground'
scene.add(ground); //DROP ELEMENT INTO VIRTUAL ENVIRONMENT





// 07
//ELEMENT ONE (**LOOK UP MATERIAL OPTIONS**)
let playerGeometry = new THREE.CubeGeometry(1, 1, 1, 0); //PRIMITIVE SHAPE AND SIZE
let playerMaterial = new THREE.MeshLambertMaterial({ color: 0x22CAC2 }); //COLOR OF MESH
// let player = new THREE.Mesh(playerGeometry, playerMaterial); //MESH POINTS MAT TO GEOMETRY
let player = new Physijs.BoxMesh(playerGeometry, playerMaterial); //MESH POINTS MAT TO GEOMETRY
player.position.set(0, 1, 0);
player.name = 'player';
scene.add(player); //DROP ELEMENT INTO VIRTUAL ENVIRONMENT
camera.position.set(0, 2, 5);
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

let _vector = new THREE.Vector3(0, 0, 0)
let animate = function (timeStamp) {
  // player.__dirtyPosition = true;
  // player.__dirtyRotation = true;
  
  player.setAngularFactor(_vector);
  player.setAngularVelocity(_vector);
  player.setLinearVelocity(new THREE.Vector3(0, 0, 0));


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
    player.position.x -= Math.sin(player.rotation.y + Math.PI / 2) * playerSpeed;
    player.position.z -= Math.cos(player.rotation.y + Math.PI / 2) * playerSpeed;
  }
  //RIGHT
  if (input.isRightPressed) {
    player.__dirtyPosition = true;
    player.__dirtyRotation = true;
    player.position.x += Math.sin(player.rotation.y + Math.PI / 2) * playerSpeed;
    player.position.z += Math.cos(player.rotation.y + Math.PI / 2) * playerSpeed;
  }
  //JUMP  
  if (input.isSpacePressed) {
    player.__dirtyPosition = true;
    player.__dirtyRotation = true;
    player.position.y += playerSpeed*2;
  }
  //FWD 
  if (input.isFwdPressed) {
    player.__dirtyPosition = true;
    player.__dirtyRotation = true;
    player.position.x -= Math.sin(player.rotation.y) * playerSpeed;
    player.position.z -= Math.cos(player.rotation.y) * playerSpeed;
  }
  //BACK 
  if (input.isBwdPressed) {
    player.__dirtyPosition = true;
    player.__dirtyRotation = true;
    player.position.x += Math.sin(player.rotation.y) * playerSpeed;
    player.position.z += Math.cos(player.rotation.y) * playerSpeed;
  }
  //RotLeft
  if (input.isRLPressed) {
    // player.rotation.y += playerSpeed/4;
    player.rotation.y += .1;
    player.__dirtyPosition = true;
    player.__dirtyRotation = true;
  }
  //RotRight
  if (input.isRRPressed) {

    player.rotation.y -= playerSpeed/4;
    player.__dirtyPosition = true;
    player.__dirtyRotation = true;
  }

  //GRAVITY...fix this please
  if (player.position.y >= 1) {
    player.position.y -= 0.2 * boost;
  }
  // camera.lookAt(player.position)
  scene.simulate();
  renderer.render(scene, camera);
};

// 11 
//...10 is mouse event listener, 12 is adding listener to window)...
// CALL RENDER LOOP
animate();