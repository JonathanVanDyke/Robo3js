let camera, sceneHUD, cameraHUD, rotateAngle, renderer, scene, player, bullets, bulletsBlock, input, environment, _vector, clock, lastTimeStamp;
// const HUD = require('./hud')


function init() {


  // 201 
  Physijs.scripts.worker = './lib/physijs_worker.js';
  Physijs.scripts.ammo = './lib/ammo.js';

  // 02
  //RENDERER INPUT, SCENE (virtual environment)/CAMERA 
  // let scene = new THREE.Scene();
  scene = new Physijs.Scene;

  // let scene = new Physijs.Scene({ reportsize: 50, fixedTimeStep: 1 / 20 }); //Slow down scene to fix rotation bug
  scene.setGravity(new THREE.Vector3(0, -20, 0));
  {
    const color = 'grey';  // white
    const near = 90;
    const far = 150;
    // scene.fog = new THREE.Fog(color, near, far);
  }
  scene.background = new THREE.Color('skyblue');

  createCamera();
  createLights();
  createMeshes();
  createRenderer();


  //202
  //Bullets
  bullets = new Bullets();
  // let bulletsBlockGeometry = new THREE.SphereGeometry(1, 1, 1); //PRIMITIVE SHAPE AND SIZE
  // let bulletsBlockMaterial = new THREE.MeshLambertMaterial({ color: 0xff00C2 }); //COLOR OF MESH
  // bulletsBlock = new Physijs.BoxMesh(bulletsBlockGeometry, bulletsBlockMaterial); //MESH POINTS MAT TO GEOMETRY

  // 101
  //INPUT OBJECT
  input = new Input();

  // 001
  // Environment
  environment = new Environment();



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





  // 09
  //RENDER LOOP
  // 102
  //Normalize animation loop
  lastTimeStamp = 0;

  clock = new THREE.Clock();
  _vector = new THREE.Vector3(0, 0, 0)

}

function createCamera() {
  camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
  );
  // debugger

  camera.position.set(0, 6, 10);
  camera.rotation.x = -.2
}

function createLights() {
  // 08
  //LIGHT ONE
  let light1 = new THREE.DirectionalLight(0xFFFFFF, 2);
  light1.position.set(0, 20, 25)
  scene.add(light1)

  //LIGHT TWO
  let light2 = new THREE.AmbientLight(0xaaaaaa, 1);
  light2.position.set(0, 0, 25)
  scene.add(light2)
  // const ambientLight = new THREE.HemisphereLight(
  //   0xddeeff,
  //   0x202020,
  //   .5,
  // );
  // scene.add(ambientLight)

}

function createMeshes() {
  // 07
  //ELEMENT ONE (**LOOK UP MATERIAL OPTIONS**)
  let playerGeometry = new THREE.CubeGeometry(5, 8, 5, 0); //PRIMITIVE SHAPE AND SIZE (set 3rd val to 111 for cat paw)
  let playerMaterial = new THREE.MeshLambertMaterial({
    color: 0x22CAC2,
    transparent: true,
    opacity: 0.0,
  }); //COLOR OF MESH
  //ELEMENT ONE (**LOOK UP MATERIAL OPTIONS**)

  // //Cat mode
  // let playerGeometry = new THREE.CubeGeometry(1, 2, 111, 100); //PRIMITIVE SHAPE AND SIZE (set 3rd val to 111 for cat paw)
  // let playerMaterial = new THREE.MeshLambertMaterial({ color: 0x22CAC2, transparent: true, opacity: 1.0 }); //COLOR OF MESH
  // //Cat mode

  // let player = new THREE.Mesh(playerGeometry, playerMaterial); //MESH POINTS MAT TO GEOMETRY
  player = new Physijs.BoxMesh(playerGeometry, playerMaterial); //MESH POINTS MAT TO GEOMETRY
  player.position.set(0, 1, 0);
  player.name = 'player';
  player.add(camera)
}

function createRenderer() {
  // 03
  //INSTANCE OF RENDERER
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // renderer.gammaFactorw

  renderer.physicallyCorrectLights = true;
  // renderer.setClearColor("#e5e5e5"); //BACKGROUND COLOR
  
  // 04
  //ADD CANVAS ELEMENT TO DOM
  pointTally = document.createElement('h1');
  pointTally.id = 'points'
  pointTally.style.position = 'absolute';
  document.body.appendChild(pointTally);
  pointTally.innerHTML = 'Score: 0'

  document.body.appendChild(renderer.domElement);
}




let animate = function (timeStamp) {
  // player.__dirtyPosition = true;
  // player.__dirtyRotation = true;
  
  player.setAngularFactor(_vector);
  player.setAngularVelocity(_vector);
  // player.setLinearVelocity(new THREE.Vector3(0, 0, 0));

  let delta = clock.getDelta(); // seconds
  // console.log(clock.getElapsedTime())
  let moveDistance = 200 * delta; // 200 pixels per second
  rotateAngle = Math.PI / 2 * delta; // pi/2 radians (90 deg) per sec


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
    player.setAngularFactor(_vector);
    player.setAngularVelocity(_vector);
    // player.position.y += playerSpeed*2;
  }
  //FWD 


  if (input.isFwdPressed) {
    player.__dirtyPosition = true;
    player.__dirtyRotation = true;

    player.translateOnAxis(new THREE.Vector3(0, 0, playerSpeed*100), -rotateAngle)

    delete3DOBJ('bullet');
    
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

  //bullets?
  if (input.isFirePressed) {
    bullets.fire()
    // bulletsRBlock.setLinearVelocity(new THREE.Vector3((player.rotation.y / Math.PI) * 2), 0, 0)
    // bulletsRBlock.setLinearVelocity(new THREE.Vector3(0, 0, -100))
    let xCompensator = ((player.rotation.y / Math.PI) * -2) * 100
    let zCompensator = 100 / (xCompensator + 1)
    // bulletsLBlock.setLinearVelocity(new THREE.Vector3(xCompensator, 0, zCompensator))

    let wpVector2 = new THREE.Vector3();
    bulletsLBlock.setLinearVelocity(new THREE.Vector3(-player.getWorldDirection(wpVector2).x * 100, 0, player.getWorldDirection(wpVector2).z * -100))
    // bulletsLBlock.setLinearVelocity(new THREE.Vector3(0, 0, -100))
    // console.log(clock.getElapsedTime() - bulletsBlock.createdAt)
    
    // if ((clock.getElapsedTime() - bulletsBlock.createdAt) >= 5) {
    //   debugger
    //   delete3DOBJ('bullet')
    // }
  }
  


  // //GRAVITY...fix this please
  // if (player.position.y <= 1) {
  //   player.translateOnAxis(new THREE.Vector3(0, 0, 0), -rotateAngle)
  // } else {
  //   player.translateOnAxis(new THREE.Vector3(0, playerSpeed * 50, 0), -rotateAngle)
  // }
  // camera.lookAt(player.position)


  function delete3DOBJ(objName) {
    let selectedObject = scene.getObjectByName(objName);
    if (selectedObject) {
      scene.remove(selectedObject);
    }
    
    // animate();
  }

  scene.simulate();
  // renderer.render(sceneHUD, cameraHUD)
  renderer.render(scene, camera);


};

init();

// 11 
//...10 is mouse event listener, 12 is adding listener to window)...
// CALL RENDER LOOP
animate();