let MechLoader = new THREE.OBJLoader();
MechLoader.load(
  'assets/mech.obj',
  function (object) {
    mechMesh = object.children[0]
    mechMesh.position.set(0, -4, 0);
    mechMesh.rotation.y = Math.PI;
    player.position.set(0, 10, 0);
    player.material.wireframe = true;
    let group = new THREE.Group();
    player.add(mechMesh)
    scene.add(player)
}
);