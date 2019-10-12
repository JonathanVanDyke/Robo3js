// 02
//RENDERER INPUT, SCENE (virtual environment)/CAMERA 
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// camera.position.z = 5;
camera.position.set(0, 2, 5);

// 101
//INPUT OBJECT
let input = new Input();

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
let geometry = new THREE.BoxGeometry(1, 1, 1); //PRIMITIVE SHAPE AND SIZE
let material = new THREE.MeshLambertMaterial({ color: 0x22CAC2 }); //COLOR OF MESH
let cube = new THREE.Mesh(geometry, material); //MESH POINTS MAT TO GEOMETRY
scene.add(cube); //DROP ELEMENT INTO VIRTUAL ENVIRONMENT

// 08
//LIGHT ONE
let light1 = new THREE.PointLight(0xFFFFFF, 1, 1000);
light1.position.set(0, 0, 0)
scene.add(light1)

//LIGHT TWO
let light2 = new THREE.PointLight(0xFFFFFF, 2, 1000);
light2.position.set(0, 0, 25)
scene.add(light2)


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
  //LEFT
  if (input.isLeftPressed) {
    cube.position.x += -movementSpeed * boost;
  }
  //RIGHT
  if (input.isRightPressed) {
    cube.position.x += movementSpeed * boost;
  }
  //JUMP  
  if (input.isSpacePressed) {
    cube.position.y += movementSpeed * boost;
  }
  //FWD 
  if (input.isFwdPressed) {
    cube.position.z -= movementSpeed * boost;
  }
  //BACK 
  if (input.isBwdPressed) {
    cube.position.z += movementSpeed * boost;
  }


  //GRAVITY...fix this please
  if (cube.position.y >= 0) {
    cube.position.y -= 0.1 * boost;
  }

  renderer.render(scene, camera);
};

// 11 
//...10 is mouse event listener, 12 is adding listener to window)...
// CALL RENDER LOOP
animate();