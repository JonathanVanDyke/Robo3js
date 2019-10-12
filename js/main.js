// 02
//RENDERER INPUT, SCENE (virtual environment)/CAMERA 
let scene = new THREE.Scene();
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

// 07
//ELEMENT ONE (**LOOK UP MATERIAL OPTIONS**)
let playerGeometry = new THREE.BoxGeometry(1, 1, 1); //PRIMITIVE SHAPE AND SIZE
let playerMaterial = new THREE.MeshLambertMaterial({ color: 0x22CAC2 }); //COLOR OF MESH
let player = new THREE.Mesh(playerGeometry, playerMaterial); //MESH POINTS MAT TO GEOMETRY
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
let animate = function (timeStamp) {
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
    player.position.x -= Math.sin(player.rotation.y + Math.PI / 2) * playerSpeed;
    player.position.z -= Math.cos(player.rotation.y + Math.PI / 2) * playerSpeed;
  }
  //RIGHT
  if (input.isRightPressed) {
    player.position.x += Math.sin(player.rotation.y + Math.PI / 2) * playerSpeed;
    player.position.z += Math.cos(player.rotation.y + Math.PI / 2) * playerSpeed;
  }
  //JUMP  
  if (input.isSpacePressed) {
    player.position.y += playerSpeed*2;
  }
  //FWD 
  if (input.isFwdPressed) {
    player.position.x -= Math.sin(player.rotation.y) * playerSpeed;
    player.position.z -= Math.cos(player.rotation.y) * playerSpeed;
  }
  //BACK 
  if (input.isBwdPressed) {
    player.position.x += Math.sin(player.rotation.y) * playerSpeed;
    player.position.z += Math.cos(player.rotation.y) * playerSpeed;
  }
  //RotLeft
  if (input.isRLPressed) {
    player.rotation.y += playerSpeed/4;
  }
  //RotRight
  if (input.isRRPressed) {
    player.rotation.y -= playerSpeed/4;
  }

  //GRAVITY...fix this please
  if (player.position.y >= 0) {
    player.position.y -= 0.2 * boost;
  }
  // camera.lookAt(player.position)
  renderer.render(scene, camera);
};

// 11 
//...10 is mouse event listener, 12 is adding listener to window)...
// CALL RENDER LOOP
animate();