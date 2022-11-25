export const createScene = (engine, canvas) => {
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

  const faceUV = [];
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

  const house = BABYLON.Mesh.MergeMeshes(
    [box, roof],
    true,
    false,
    null,
    false,
    true
  );

  const houses = [];
  const places = [
    [0, 5, 0],
    [0, 0, 5],
  ];

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

  const carfaceUV = new Array(3);
  const wheelUV = new Array(3);

  carfaceUV[0] = new BABYLON.Vector4(0, 0.5, 0.38, 1);
  carfaceUV[2] = new BABYLON.Vector4(0.38, 1, 0, 0.5);
  carfaceUV[1] = new BABYLON.Vector4(0, 0, 1, 0.5);

  wheelUV[0] = new BABYLON.Vector4(0, 0, 1, 1);
wheelUV[1] = new BABYLON.Vector4(0, 0.5, 0, 0.5);
wheelUV[2] = new BABYLON.Vector4(0, 0, 1, 1);

  //base
  const outline = [
    new BABYLON.Vector3(-0.3, 0, -0.1),
    new BABYLON.Vector3(0.2, 0, -0.1),
  ];

  //curved front
  for (let i = 0; i < 20; i++) {
    outline.push(
      new BABYLON.Vector3(
        0.2 * Math.cos((i * Math.PI) / 40),
        0,
        0.2 * Math.sin((i * Math.PI) / 40) - 0.1
      )
    );
  }

  //top
  outline.push(new BABYLON.Vector3(0, 0, 0.1));
  outline.push(new BABYLON.Vector3(-0.3, 0, 0.1));

  const car = BABYLON.MeshBuilder.ExtrudePolygon("car", {
    shape: outline,
    depth: 0.2,
    faceUV: carfaceUV
  });
  car.position = new BABYLON.Vector3(2, 0, 2);

  


  const wheelRB = BABYLON.MeshBuilder.CreateCylinder("wheelRB", {
    diameter: 0.125,
    height: 0.05,
    faceUV: wheelUV
  });
  const wheelMat = new BABYLON.StandardMaterial("wheelMat");
  wheelMat.diffuseTexture = new BABYLON.Texture(
    "https://doc.babylonjs.com/img/getstarted/wheel.png"
  );
  wheelRB.material = wheelMat
  wheelRB.parent = car;

  wheelRB.position.z = -0.1;
  wheelRB.position.x = -0.2;
  wheelRB.position.y = 0.035;

  const wheelRF = wheelRB.clone("wheelRF");
  wheelRF.position.x = 0.1;

  const wheelLB = wheelRB.clone("wheelLB");
  wheelLB.position.y = -0.2 - 0.035;

  const wheelLF = wheelRF.clone("wheelLF");
  wheelLF.position.y = -0.2 - 0.035;

  const carMat = new BABYLON.StandardMaterial("carMat");
  carMat.diffuseTexture = new BABYLON.Texture(
    "https://doc.babylonjs.com/img/getstarted/car.png"
  );


  car.material = carMat;




  const animWheel = new BABYLON.Animation("wheelAnimation", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

  const wheelKeys = []; 

//At the animation key 0, the value of rotation.y is 0
wheelKeys.push({
    frame: 0,
    value: 0
});

//At the animation key 30, (after 1 sec since animation fps = 30) the value of rotation.y is 2PI for a complete rotation
wheelKeys.push({
    frame: 30,
    value: 2 * Math.PI
});

//set the keys
animWheel.setKeys(wheelKeys);

//Link this animation to the right back wheel
wheelRB.animations = [];
wheelRB.animations.push(animWheel);
wheelRF.animations = [];
wheelRF.animations.push(animWheel);
wheelLB.animations = [];
wheelLB.animations.push(animWheel);
wheelLF.animations = [];
wheelLF.animations.push(animWheel);

//Begin animation - object to animate, first frame, last frame and loop if true
scene.beginAnimation(wheelRB, 0, 30, true);
scene.beginAnimation(wheelRF, 0, 30, true);
scene.beginAnimation(wheelLB, 0, 30, true);
scene.beginAnimation(wheelLF, 0, 30, true);

car.rotation.x = 3*Math.PI/2
car.position.y =0.2 
const animCar = new BABYLON.Animation("carAnimation", "position.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

const carKeys = []; 

carKeys.push({
    frame: 0,
    value: -4
});

carKeys.push({
    frame: 150,
    value: 4
});

carKeys.push({
    frame: 210,
    value: 4
});

animCar.setKeys(carKeys);

car.animations = [];
car.animations.push(animCar);

scene.beginAnimation(car, 0, 210, true);

  return scene;
};