function Environment() {
  //Texture loader

  const textureLoader = new THREE.TextureLoader();

  const texture = textureLoader.load( 'textures/tron1.jpg' );

  texture.encoding = THREE.sRGBEncoding;

  texture.anisotropy = 16;

  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.offset.set(0, 0);
  texture.repeat.set(200, 200);

  // debugger
  const materialMap = new THREE.MeshStandardMaterial( {
    map: texture, 
  });

  //GROUND
  let groundGeometry = new THREE.PlaneGeometry(1000, 1000, 0); //PRIMITIVE SHAPE AND SIZE
  let groundMaterial = new THREE.MeshBasicMaterial({ color: 'black' }); //COLOR OF MESH
  // let ground = new THREE.Mesh(groundGeometry, groundMaterial); //MESH POINTS MAT TO GEOMETRY


  var friction = 0.8; // high friction
  var restitution = 0.3; // low restitution

  var material = Physijs.createMaterial(
    new THREE.MeshBasicMaterial({ color: 0x888888 }),
    friction,
    restitution
  );

  let ground = new Physijs.PlaneMesh(groundGeometry, materialMap); //MESH POINTS MAT TO GEOMETRY
  ground.rotation.x = -0.5 * Math.PI;
  ground.name = 'ground'
  ground.receiveShadow = true;
  scene.add(ground); //DROP ELEMENT INTO VIRTUAL ENVIRONMENT

  // 07c
  // ELEMENT ONE (**LOOK UP MATERIAL OPTIONS**)
  for (let i = 0; i < 100; i++) {
    let env2BlockGeometry = new THREE.BoxBufferGeometry(1, 1, 1); //PRIMITIVE SHAPE AND SIZE
    let env2BlockMaterial = new THREE.MeshLambertMaterial({ color: 0x22CAC2 }); //COLOR OF MESH
    let env2Block = new THREE.Mesh(env2BlockGeometry, env2BlockMaterial); //MESH POINTS MAT TO GEOMETRY
    env2Block.position.x = (Math.random() - 0.5) * 400;
    env2Block.position.y = (Math.random() - 0.5) * 400;
    env2Block.position.z = (Math.random() - 0.5) * 300;
    scene.add(env2Block); //DROP ELEMENT INTO VIRTUAL ENVIRONMENT
  }

  let _vector = new THREE.Vector3(0, 0, 0)
  for (let i = 0; i < 200; i++) {
    let env3BlockGeometry = new THREE.BoxBufferGeometry(1, 1, 1); //PRIMITIVE SHAPE AND SIZE
    let env3BlockMaterial = new THREE.MeshLambertMaterial({ color: 0xff00C2 }); //COLOR OF MESH
    let env3Block = new Physijs.BoxMesh(env3BlockGeometry, env3BlockMaterial); //MESH POINTS MAT TO GEOMETRY
    env3Block.position.x = (Math.random() - 0.5) * 300;
    env3Block.position.y = 5
    env3Block.position.z = (Math.random() - 0.5) * 300;
    // debugger
    env3Block.scale.set(2, 2, 2)
    env3Block.name = 'floorBlock'
    scene.add(env3Block); //DROP ELEMENT INTO VIRTUAL ENVIRONMENT

    // _vector.set(0, 0, 0);
    env3Block.setAngularFactor(_vector);
    env3Block.setAngularVelocity(_vector);
    // env3Block.setLinearFactor(_vector);
    // env3Block.setLinearVelocity(_vector);



    env3Block.addEventListener('collision', function (other_object, linear_velocity, angular_velocity) {
      // console.log(other_object)
      // console.log(linear_velocity)
      // console.log(angular_velocity)
      // env3Block.material.wireframe = true
      if (other_object.name === 'bullet') {
        player.points += 1;
        let pointEle = document.getElementById('points')
        pointEle.innerHTML = `Score: ${player.points}`
        // console.log(player.points)
        // scene.remove(this);
        env3Block.visible = false;
      }
      // env3Block.visible = false; // make any mesh disappear on collision...
    });

  }

}
