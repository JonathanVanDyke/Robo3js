// var loader = new THREE.OBJLoader();
// // load a resource
// let mech;
// loader.load(
//   // resource URL
//   'assets/mech.obj',
//   // called when resource is loaded
//   mech = function (object) {

//     // scene.add(object);
//     console.log('in fileUploader.js...')

//     console.log(object)
//     return object;
//   },
//   // called when loading is in progresses
//   function (xhr) {

//     console.log((xhr.loaded / xhr.total * 100) + '% loaded');

//   },
//   // called when loading has errors
//   function (error) {

//     console.log('An error happened');

//   }
// );


console.log('outside')
// console.log(mech)

//CLEANED UP CODE
var loader = new THREE.OBJLoader();
// load a resource
// let mech;

handleResourceLoaded = (object) => { 

  // let loadedPlayerGeometry = new THREE.CubeGeometry(1, 1, 1, 100); //PRIMITIVE SHAPE AND SIZE (set 3rd val to 111 for cat paw)
  // let loadedPlayerMaterial = new THREE.MeshLambertMaterial({ color: 0x22CAC2 }); //COLOR OF MESH
  // // let loadedPlayer = new THREE.Mesh(loadedPlayerGeometry, loadedPlayerMaterial); //MESH POINTS MAT TO GEOMETRY
  // let loadedPlayer = new Physijs.BoxMesh(loadedPlayerGeometry, loadedPlayerMaterial); //MESH POINTS MAT TO GEOMETRY
  // loadedPlayer.position.set(0, 1, 0);
  // loadedPlayer.name = 'loadedPlayer';
  // scene.add(loadedPlayer); //DROP ELEMENT INTO VIRTUAL ENVIRONMENT
  // camera.position.set(0, 2, 5);
  // loadedPlayer.add(camera)



  object.name = 'mech'
  // debugger
  scene.add(object)
  console.log(object)
}

const loadInProgressNotice = (xhr) => { console.log((xhr.loaded / xhr.total * 100) + '% loaded') }

const loadErrors = (error) => { console.log('An error happened') }

loader.load('assets/mech.obj', handleResourceLoaded, loadInProgressNotice, loadErrors);

