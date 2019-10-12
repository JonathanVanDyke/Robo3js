function Environment() {

  // 07c
  // ELEMENT ONE (**LOOK UP MATERIAL OPTIONS**)
  for (let i = 0; i < 100; i++) {
    let env2BlockGeometry = new THREE.BoxGeometry(1, 1, 1); //PRIMITIVE SHAPE AND SIZE
    let env2BlockMaterial = new THREE.MeshLambertMaterial({ color: 0x22CAC2 }); //COLOR OF MESH
    let env2Block = new THREE.Mesh(env2BlockGeometry, env2BlockMaterial); //MESH POINTS MAT TO GEOMETRY
    env2Block.position.x = (Math.random() - 0.5) * 100;
    env2Block.position.y = (Math.random() - 0.5) * 100;
    env2Block.position.z = (Math.random() - 0.5) * 100;
    scene.add(env2Block); //DROP ELEMENT INTO VIRTUAL ENVIRONMENT
  }

  let _vector = new THREE.Vector3(0, 0, 0)
  for (let i = 0; i < 10; i++) {
    let env3BlockGeometry = new THREE.CubeGeometry(1, 1, 1); //PRIMITIVE SHAPE AND SIZE
    let env3BlockMaterial = new THREE.MeshLambertMaterial({ color: 0xff00C2 }); //COLOR OF MESH
    let env3Block = new Physijs.BoxMesh(env3BlockGeometry, env3BlockMaterial); //MESH POINTS MAT TO GEOMETRY
    env3Block.position.x = (Math.random() - 0.5) * 100;
    env3Block.position.y = 5
    env3Block.position.z = (Math.random() - 0.5) * 100;
    scene.add(env3Block); //DROP ELEMENT INTO VIRTUAL ENVIRONMENT

    // _vector.set(0, 0, 0);
    env3Block.setAngularFactor(_vector);
    env3Block.setAngularVelocity(_vector);
    // env3Block.setLinearFactor(_vector);
    // env3Block.setLinearVelocity(_vector);



    env3Block.addEventListener('collision', function (other_object, linear_velocity, angular_velocity) {
      console.log(other_object)
      // console.log(linear_velocity)
      // console.log(angular_velocity)
      env3Block.material.wireframe = true
      // env3Block.visible = false; // make any mesh disappear on collision...
    });

  }


  

}
