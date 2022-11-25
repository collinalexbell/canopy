const createScene = (engine, canvas) => {
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    3,
    new BABYLON.Vector3(0, 0, 0)
  );
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0)
  );

  faceUV = [];
  faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face
  faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face
  faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
  faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side

  const detailsMat = new BABYLON.StandardMaterial("detailsMat");
  detailsMat.diffuseTexture = new BABYLON.Texture(
    "https://doc.babylonjs.com/img/getstarted/cubehouse.png"
  );
  const box = BABYLON.MeshBuilder.CreateBox("box", {
    faceUV: faceUV,
    wrap: true,
  });
  box.position.y = 0.5;

  const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {
    diameter: 1.3,
    height: 1.2,
    tessellation: 3,
  });
  roof.scaling.x = 0.75;
  roof.rotation.z = Math.PI / 2;
  roof.position.y = 1.22;

  const ground = BABYLON.MeshBuilder.CreateGround("ground", {
    width: 10,
    height: 10,
  });

  const groundMat = new BABYLON.StandardMaterial("groundMat");
  groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
  ground.material = groundMat; //Place the material property of the ground

  const roofMat = new BABYLON.StandardMaterial("roofMat");
  roofMat.diffuseTexture = new BABYLON.Texture(
    "https://assets.babylonjs.com/environments/roof.jpg",
    scene
  );
  const boxMat = new BABYLON.StandardMaterial("boxMat");
  boxMat.diffuseTexture = new BABYLON.Texture(
    "https://www.babylonjs-playground.com/textures/floor.png"
  );

  roof.material = roofMat;
  box.material = detailsMat;

  const house = BABYLON.Mesh.MergeMeshes([box, roof], true, false, null, false, true);

  const houses = [];
  const places = [[0,5,0], [0,0,5]]

  for (let i = 0; i < places.length; i++) {
    houses.push(house.createInstance("house" + i));
    
    houses[i].rotation.y = places[i][0];
    houses[i].position.x = places[i][1];
    houses[i].position.z = places[i][2];
}

  const sound = new BABYLON.Sound(
    "smooth jazz",
    "sounds/StandardJazzBars.mp3",
    scene,
    null,
    { loop: true, autoplay: true }
  );
  sound.play();



  return scene;
};