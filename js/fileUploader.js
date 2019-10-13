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

// //CLEANED UP CODE
// var loader = new THREE.OBJLoader();
// // load a resource
// // let mech;

// handleResourceLoaded = (object) => { 
//   object.name = 'mech'
//   // debugger
//   scene.add(object)
//   console.log(object)
// }

// const loadInProgressNotice = (xhr) => { console.log((xhr.loaded / xhr.total * 100) + '% loaded') }

// const loadErrors = (error) => { console.log('An error happened') }

// loader.load('assets/mech.obj', handleResourceLoaded, loadInProgressNotice, loadErrors);


let loader2 = new THREE.OBJLoader();
loader2.load(
  'assets/mech.obj',
  function (object) {
    let material = new THREE.MeshLambertMaterial({ color: 0x22CAC2 }); //COLOR OF MESH
    object.name = 'uploadObject'
    emptyBox = object.children[1];
    mechMesh = object.children[0]
    player.add(mechMesh);
    console.log(object.children[1])
    // var mesh = new Physijs.ConcaveMesh(object, material);
    scene.add(object.children[0]);
}
);