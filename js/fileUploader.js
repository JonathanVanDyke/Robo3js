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
    // debugger



    let materials = mechMesh.material
    for (let i = 0; i < materials.length; i++) {
      if (i % 2 === 0) {
        mechMesh.material[i].color.set(0x2f523e);
      } else {
        mechMesh.material[i].color.set(0xf5d742);
      }
    }
    player.points = 0;
    player.position.set(0, 10, 0);
    player.material.wireframe = true;

    player.add(mechMesh)
    player.position.set(0, 4, 0)
    scene.add(player)
}
);

// //A huge city w/o colliders or physics 
// let cityLoader = new THREE.OBJLoader();
// cityLoader.load(
//   'assets/City.obj',
//   function (object) {

//     for (let i = 0; i < object.children.length; i++) {
//       cityMesh = object.children[i]
//       if (i % 2 === 0) {
//         debugger
//         cityMesh.material.color.set(0xa39f98);
//       } else {
//         cityMesh.material.color.set(0xc4b9a7);
//       }


//       cityMesh.position.set(0, 0, 400);
//       scene.add(cityMesh)
//     }
// }
// );