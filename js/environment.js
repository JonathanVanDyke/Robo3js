function Environment() {

  // 07c
  //ELEMENT ONE (**LOOK UP MATERIAL OPTIONS**)
  for (let i = 0; i < 100; i++) {
    let env2BlockGeometry = new THREE.BoxGeometry(1, 1, 1); //PRIMITIVE SHAPE AND SIZE
    let env2BlockMaterial = new THREE.MeshLambertMaterial({ color: 0x22CAC2 }); //COLOR OF MESH
    let env2Block = new THREE.Mesh(env2BlockGeometry, env2BlockMaterial); //MESH POINTS MAT TO GEOMETRY
    env2Block.position.x = (Math.random() - 0.5) * 100;
    env2Block.position.y = (Math.random() - 0.5) * 100;
    env2Block.position.z = (Math.random() - 0.5) * 100;
    scene.add(env2Block); //DROP ELEMENT INTO VIRTUAL ENVIRONMENT
  }
}
