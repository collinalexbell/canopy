/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/index.js":
/*!*****************************!*\
  !*** ./src/client/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scene */ \"./src/client/scene.js\");\n\nwindow.onload = () => {\n  console.log(\"init\");\n  const canvas = document.getElementById(\"renderCanvas\"); // Get the canvas element\n  const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine\n\n  // Add your code here matching the playground format\n\n  const scene = (0,_scene__WEBPACK_IMPORTED_MODULE_0__.createScene)(engine, canvas); //Call the createScene function\n\n  // Register a render loop to repeatedly render the scene\n  engine.runRenderLoop(function () {\n    scene.render();\n  });\n\n  // Watch for browser/canvas resize events\n  window.addEventListener(\"resize\", function () {\n    engine.resize();\n  });\n}\n\n\n//# sourceURL=webpack://canopy/./src/client/index.js?");

/***/ }),

/***/ "./src/client/scene.js":
/*!*****************************!*\
  !*** ./src/client/scene.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createScene\": () => (/* binding */ createScene)\n/* harmony export */ });\nconst createScene = (engine, canvas) => {\n  const scene = new BABYLON.Scene(engine);\n\n  const camera = new BABYLON.ArcRotateCamera(\n    \"camera\",\n    -Math.PI / 2,\n    Math.PI / 2.5,\n    3,\n    new BABYLON.Vector3(0, 0, 0)\n  );\n  camera.attachControl(canvas, true);\n\n  const light = new BABYLON.HemisphericLight(\n    \"light\",\n    new BABYLON.Vector3(0, 1, 0)\n  );\n\n  const faceUV = [];\n  faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face\n  faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face\n  faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side\n  faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side\n\n  const detailsMat = new BABYLON.StandardMaterial(\"detailsMat\");\n  detailsMat.diffuseTexture = new BABYLON.Texture(\n    \"https://doc.babylonjs.com/img/getstarted/cubehouse.png\"\n  );\n  const box = BABYLON.MeshBuilder.CreateBox(\"box\", {\n    faceUV: faceUV,\n    wrap: true,\n  });\n  box.position.y = 0.5;\n\n  const roof = BABYLON.MeshBuilder.CreateCylinder(\"roof\", {\n    diameter: 1.3,\n    height: 1.2,\n    tessellation: 3,\n  });\n  roof.scaling.x = 0.75;\n  roof.rotation.z = Math.PI / 2;\n  roof.position.y = 1.22;\n\n  const ground = BABYLON.MeshBuilder.CreateGround(\"ground\", {\n    width: 10,\n    height: 10,\n  });\n\n  const groundMat = new BABYLON.StandardMaterial(\"groundMat\");\n  groundMat.diffuseColor = new BABYLON.Color3(0.5, 0.9, 0.3);\n  ground.material = groundMat; //Place the material property of the ground\n\n  const roofMat = new BABYLON.StandardMaterial(\"roofMat\");\n  roofMat.diffuseTexture = new BABYLON.Texture(\n    \"https://assets.babylonjs.com/environments/roof.jpg\",\n    scene\n  );\n  const boxMat = new BABYLON.StandardMaterial(\"boxMat\");\n  boxMat.diffuseTexture = new BABYLON.Texture(\n    \"https://www.babylonjs-playground.com/textures/floor.png\"\n  );\n\n  roof.material = roofMat;\n  box.material = detailsMat;\n\n  const house = BABYLON.Mesh.MergeMeshes(\n    [box, roof],\n    true,\n    false,\n    null,\n    false,\n    true\n  );\n\n  const houses = [];\n  const places = [\n    [0, 5, 0],\n    [0, 0, 5],\n  ];\n\n  for (let i = 0; i < places.length; i++) {\n    houses.push(house.createInstance(\"house\" + i));\n\n    houses[i].rotation.y = places[i][0];\n    houses[i].position.x = places[i][1];\n    houses[i].position.z = places[i][2];\n  }\n\n  const sound = new BABYLON.Sound(\n    \"smooth jazz\",\n    \"sounds/StandardJazzBars.mp3\",\n    scene,\n    null,\n    { loop: true, autoplay: true }\n  );\n  sound.play();\n\n  const carfaceUV = new Array(3);\n  const wheelUV = new Array(3);\n\n  carfaceUV[0] = new BABYLON.Vector4(0, 0.5, 0.38, 1);\n  carfaceUV[2] = new BABYLON.Vector4(0.38, 1, 0, 0.5);\n  carfaceUV[1] = new BABYLON.Vector4(0, 0, 1, 0.5);\n\n  wheelUV[0] = new BABYLON.Vector4(0, 0, 1, 1);\nwheelUV[1] = new BABYLON.Vector4(0, 0.5, 0, 0.5);\nwheelUV[2] = new BABYLON.Vector4(0, 0, 1, 1);\n\n  //base\n  const outline = [\n    new BABYLON.Vector3(-0.3, 0, -0.1),\n    new BABYLON.Vector3(0.2, 0, -0.1),\n  ];\n\n  //curved front\n  for (let i = 0; i < 20; i++) {\n    outline.push(\n      new BABYLON.Vector3(\n        0.2 * Math.cos((i * Math.PI) / 40),\n        0,\n        0.2 * Math.sin((i * Math.PI) / 40) - 0.1\n      )\n    );\n  }\n\n  //top\n  outline.push(new BABYLON.Vector3(0, 0, 0.1));\n  outline.push(new BABYLON.Vector3(-0.3, 0, 0.1));\n\n  const car = BABYLON.MeshBuilder.ExtrudePolygon(\"car\", {\n    shape: outline,\n    depth: 0.2,\n    faceUV: carfaceUV\n  });\n  car.position = new BABYLON.Vector3(2, 0, 2);\n\n  \n\n\n  const wheelRB = BABYLON.MeshBuilder.CreateCylinder(\"wheelRB\", {\n    diameter: 0.125,\n    height: 0.05,\n    faceUV: wheelUV\n  });\n  const wheelMat = new BABYLON.StandardMaterial(\"wheelMat\");\n  wheelMat.diffuseTexture = new BABYLON.Texture(\n    \"https://doc.babylonjs.com/img/getstarted/wheel.png\"\n  );\n  wheelRB.material = wheelMat\n  wheelRB.parent = car;\n\n  wheelRB.position.z = -0.1;\n  wheelRB.position.x = -0.2;\n  wheelRB.position.y = 0.035;\n\n  const wheelRF = wheelRB.clone(\"wheelRF\");\n  wheelRF.position.x = 0.1;\n\n  const wheelLB = wheelRB.clone(\"wheelLB\");\n  wheelLB.position.y = -0.2 - 0.035;\n\n  const wheelLF = wheelRF.clone(\"wheelLF\");\n  wheelLF.position.y = -0.2 - 0.035;\n\n  const carMat = new BABYLON.StandardMaterial(\"carMat\");\n  carMat.diffuseTexture = new BABYLON.Texture(\n    \"https://doc.babylonjs.com/img/getstarted/car.png\"\n  );\n\n\n  car.material = carMat;\n\n\n\n\n  const animWheel = new BABYLON.Animation(\"wheelAnimation\", \"rotation.y\", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);\n\n  const wheelKeys = []; \n\n//At the animation key 0, the value of rotation.y is 0\nwheelKeys.push({\n    frame: 0,\n    value: 0\n});\n\n//At the animation key 30, (after 1 sec since animation fps = 30) the value of rotation.y is 2PI for a complete rotation\nwheelKeys.push({\n    frame: 30,\n    value: 2 * Math.PI\n});\n\n//set the keys\nanimWheel.setKeys(wheelKeys);\n\n//Link this animation to the right back wheel\nwheelRB.animations = [];\nwheelRB.animations.push(animWheel);\nwheelRF.animations = [];\nwheelRF.animations.push(animWheel);\nwheelLB.animations = [];\nwheelLB.animations.push(animWheel);\nwheelLF.animations = [];\nwheelLF.animations.push(animWheel);\n\n//Begin animation - object to animate, first frame, last frame and loop if true\nscene.beginAnimation(wheelRB, 0, 30, true);\nscene.beginAnimation(wheelRF, 0, 30, true);\nscene.beginAnimation(wheelLB, 0, 30, true);\nscene.beginAnimation(wheelLF, 0, 30, true);\n\ncar.rotation.x = 3*Math.PI/2\ncar.position.y =0.2 \nconst animCar = new BABYLON.Animation(\"carAnimation\", \"position.x\", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);\n\nconst carKeys = []; \n\ncarKeys.push({\n    frame: 0,\n    value: -4\n});\n\ncarKeys.push({\n    frame: 150,\n    value: 4\n});\n\ncarKeys.push({\n    frame: 210,\n    value: 4\n});\n\nanimCar.setKeys(carKeys);\n\ncar.animations = [];\ncar.animations.push(animCar);\n\nscene.beginAnimation(car, 0, 210, true);\n\n  return scene;\n};\n\n//# sourceURL=webpack://canopy/./src/client/scene.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/client/index.js");
/******/ 	
/******/ })()
;