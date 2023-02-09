import { tween, TWEEN } from 'three/examples/jsm/libs/tween.module.min';
import * as THREE from 'three'
import { BackSide, CubeTextureLoader , IcosahedronGeometry, Loader, Mesh, MeshBasicMaterial, Object3D, ObjectLoader, PlaneGeometry, PMREMGenerator, PointLight, SpotLight, TextureFilter, TextureLoader } from 'three'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { Tween } from '@tweenjs/tween.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
const scene = new THREE.Scene()


const camera = new THREE.PerspectiveCamera(
    78,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.set(45,2,2)
camera.rotateY(Math.PI /2)

const material2 = new MeshBasicMaterial()

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const pmremGenerator = new THREE.PMREMGenerator(renderer)
const backgroundImage = new TextureLoader().load('background/sky.jpg')
scene.background = backgroundImage


const menuPanel = document.getElementById('menuPanel') as HTMLDivElement
const startButton = document.getElementById('startButton') as HTMLInputElement
startButton.addEventListener(
    'click',
    function () {
        controls.lock()
    },
    false
)

const controls = new PointerLockControls(camera, renderer.domElement)
const transformControls = new TransformControls(camera, renderer.domElement)
controls.addEventListener('lock', () => (menuPanel.style.display = 'none'))
controls.addEventListener('unlock', () => (menuPanel.style.display = 'block'))



//----------------------------------------------------------------
const planeGeometry = new THREE.PlaneGeometry(100, 100, 50, 50)
const material = new THREE.MeshBasicMaterial({
     visible:false,
})

const plane = new THREE.Mesh(planeGeometry, material)
plane.rotateX(-Math.PI / 2)
scene.add(plane)

//----------------------------------------------------------------
const lightMuseum = new PointLight(0xffffff,1)
const lightMuseum1 = new PointLight(0xffffff,1)
const lightMuseum2 = new PointLight(0xffffff,1)
lightMuseum.position.set(1,1,1)
lightMuseum1.position.set(15,8,4)
lightMuseum2.position.set(15,8,4)
const roomMuseum = new GLTFLoader().load('object/room/scene.gltf', function(glb){
   const root = glb.scene;
   root.add(lightMuseum1)
   root.position.set(0,0,15)
   scene.add(root)
})

const roomMuseum2 = new GLTFLoader().load('object/room/scene.gltf', function(glb){
   const root = glb.scene;
    root.position.set(15,0,15)
    root.add(lightMuseum2)
   scene.add(root)
})

const side = { backside : BackSide}

const roomMuseum3 = new GLTFLoader().load('object/room/scene.gltf', function(glb){
   const root = glb.scene;
   root.add(lightMuseum1)
   root.position.set(1,0,-10)
   root.rotation.set(0,15.7,0)
   scene.add(root)
})

const roomMuseum4 = new GLTFLoader().load('object/room/scene.gltf', function(glb){
   const root = glb.scene;
    root.position.set(16,0,-9.9)
       root.rotation.set(0,15.7,0)
    root.add(lightMuseum2)
   scene.add(root)
})

//----------------------------------------------------------------

//----------------------------------------------------------------
//Floors

// const texture = new TextureLoader().load('object/floor/Textures/Material _25_Base_Color.png');

const floorMuseum = new FBXLoader().load('object/floor/Floor.FBX', function  (sceneObj) {
    sceneObj.position.set(1.9,0,2)
    sceneObj.scale.setScalar(1/13)
    sceneObj.scale.x = 0.327
    sceneObj.add(lightMuseum)
    sceneObj.traverse(function (child) {
            if ((child as THREE.Mesh).isMesh) {
                if ((child as THREE.Mesh).material) {
                    ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).color = new THREE.Color('rgb(162, 44, 31)');
                }
            }
        })
    scene.add(sceneObj)
})


const floorMuseum2 = new FBXLoader().load('object/floor/Floor.FBX', function  (sceneObj) {
    sceneObj.position.set(28,0,2)
    sceneObj.scale.setScalar(1/8)
    sceneObj.scale.x = 0.4
    sceneObj.add(lightMuseum)
    sceneObj.traverse(function (child) {
            if ((child as THREE.Mesh).isMesh) {
                if ((child as THREE.Mesh).material) {
                    ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).color = new THREE.Color('rgb(162, 44, 31)');
                }
            }
        })
    scene.add(sceneObj)
})


//----------------------------------------------------------------
// Ceiling 
const ceilingMuseum = new FBXLoader().load('object/floor/Floor.FBX', function (sceneObj) {
     sceneObj.scale.setScalar(1/13)
    sceneObj.scale.x = 0.33
    sceneObj.position.set(2.1,5.4,2)
    sceneObj.traverse(function (child) {
            if ((child as THREE.Mesh).isMesh) {
                if ((child as THREE.Mesh).material) {
                    ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).color = new THREE.Color('rgb(0, 0, 0)');
                    ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).side = BackSide
                    
                }
            }
        })
    scene.add(sceneObj)
})

const ceilingMuseum2 = new FBXLoader().load('object/floor/Floor.FBX', function  (sceneObj) {
    sceneObj.position.set(28,5.5,2)
    sceneObj.scale.setScalar(1/8)
    sceneObj.scale.x = 0.4
    sceneObj.add(lightMuseum)
    sceneObj.traverse(function (child) {
        const backside = BackSide
            if ((child as THREE.Mesh).isMesh) {
                if ((child as THREE.Mesh).material) {
                    ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).color = new THREE.Color('rgb(0,0,0)');
                    ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).side = backside
                }
            }
        })
    scene.add(sceneObj)
})


///----------------------------------------------------------------
//Wall
const backside = BackSide
const materialWall = new THREE.MeshBasicMaterial()
const materialWallBack = new THREE.MeshBasicMaterial()
materialWall.color = new THREE.Color('rgb(0,0,0)')
materialWallBack.color = new THREE.Color('rgb(0,0,0)')
materialWallBack.side = backside
const wall = new Mesh(new PlaneGeometry(10,10,50,50) , materialWall)
wall.position.x = -7.2
wall.position.y = 4
wall.rotation.y = Math.PI /2
wall.scale.x = 3
scene.add(wall)

const wallBack = new Mesh(new PlaneGeometry(10,10,50,50) , materialWallBack)
wallBack.position.x = -7.2
wallBack.position.y = 4
wallBack.rotation.y = Math.PI / 2
wallBack.scale.x = 3
scene.add(wallBack)

const wallLobby1 = new Mesh(new PlaneGeometry(10,10,50,50) , materialWall)
wallLobby1.position.x = 53
wallLobby1.position.y = 2.5
wallLobby1.position.z = 2.55
wallLobby1.rotation.y = 11
wallLobby1.scale.x = 2.1
wallLobby1.scale.y = 0.6
scene.add(wallLobby1)

const wallLobby1b = new Mesh(new PlaneGeometry(10,10,50,50) , materialWallBack)
wallLobby1b.position.x = 53
wallLobby1b.position.y = 2.5
wallLobby1b.position.z = 2.55
wallLobby1b.rotation.y = 11
wallLobby1b.scale.x = 2.1
wallLobby1b.scale.y = 0.6
scene.add(wallLobby1b)

//-----------------------------
const wallLobby2 = new Mesh(new PlaneGeometry(10,10,50,50) , materialWall)
wallLobby2.position.x = 38.1
wallLobby2.position.y = 2.5
wallLobby2.position.z = 13
wallLobby2.rotation.y = 3.14
wallLobby2.scale.x = 3
wallLobby2.scale.y = 0.6
scene.add(wallLobby2)

const wallLobby2b = new Mesh(new PlaneGeometry(10,10,50,50) , materialWallBack)
wallLobby2b.position.x = 38.1
wallLobby2b.position.y = 2.5
wallLobby2b.position.z = 13
wallLobby2b.rotation.y = 3.14
wallLobby2b.scale.x = 3
wallLobby2b.scale.y = 0.6
scene.add(wallLobby2b)
//-------------------------------------
const wallLobby3 = new Mesh(new PlaneGeometry(10,10,50,50) , materialWall)
wallLobby3.position.x = 38.1
wallLobby3.position.y = 2.5
wallLobby3.position.z = -8
wallLobby3.rotation.y = 3.14
wallLobby3.scale.x = 3
wallLobby3.scale.y = 0.6
scene.add(wallLobby3)

const wallLobby3b = new Mesh(new PlaneGeometry(10,10,50,50) , materialWallBack)
wallLobby3b.position.x = 38.1
wallLobby3b.position.y = 2.5
wallLobby3b.position.z = -8
wallLobby3b.rotation.y = 3.14
wallLobby3b.scale.x = 3
wallLobby3b.scale.y = 0.6
scene.add(wallLobby3b)
//----------------------------------------------------------------

//----------------------------------------------------------------OBJECT----------------------------------------------------------------
//-------------------------component----------------------------------------------------------------
const sceneMeshes: THREE.Object3D[] = []
let objectFan : THREE.Object3D = new THREE.Object3D;
function FanRotate () {
   const rotateY = new TWEEN.Tween(objectFan.rotation).to(
        { y: 18000000 } , 9000000000
    )
   rotateY.start()
}




//-------------------------Lamp------------------------------------------------
//Lobby object
//room 1
const ceillamp1 = new GLTFLoader().load('object/ceillamp/lightFan/scene.gltf' , function (obj) {
    const root = obj.scene
    root.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
         const m = child as THREE.Mesh
                if (m.name === 'Suzanne') {
                    m.castShadow = true
                    objectFan == m
                } else {
                    m.receiveShadow == true
                }
                 sceneMeshes.push(m)
    }})
    root.position.set(16,4,12.5)
    scene.add(root)
    FanRotate()
})
//room 2
const ceillamp2= new GLTFLoader().load('object/ceillamp/lightFan/scene.gltf' , function (obj) {
    const root = obj.scene
    root.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
         const m = child as THREE.Mesh
                if (m.name === 'Suzanne') {
                    m.castShadow = true
                    objectFan == m
                } else {
                    m.receiveShadow == true
                }
                 sceneMeshes.push(m)
    }})
    root.position.set(16,4,-8.5)
    scene.add(root)
    FanRotate()
})
//room 3
const ceillamp3 = new GLTFLoader().load('object/ceillamp/lightFan/scene.gltf' , function (obj) {
    const root = obj.scene
    root.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
         const m = child as THREE.Mesh
                if (m.name === 'Suzanne') {
                    m.castShadow = true
                    objectFan == m
                } else {
                    m.receiveShadow == true
                }
                 sceneMeshes.push(m)
    }})
    root.position.set(0,4,12.5)
    scene.add(root)
    FanRotate()
})
//room 4
const ceillamp4 = new GLTFLoader().load('object/ceillamp/lightFan/scene.gltf' , function (obj) {
    const root = obj.scene
    root.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
         const m = child as THREE.Mesh
                if (m.name === 'Suzanne') {
                    m.castShadow = true
                    objectFan == m
                } else {
                    m.receiveShadow == true
                }
                 sceneMeshes.push(m)
    }})
    root.position.set(1,4,-10.5)
    scene.add(root)
    FanRotate()
})
//------------------Lamps-------------------------------------------

//Lamp_celings
var lamp_ceiling1 = new OBJLoader()
const lamp_ceiling2 = new OBJLoader()
const lamp_ceiling3 = new OBJLoader()



lamp_ceiling1.load('object/lamp/lamp_ceiling/AM152_048_Coma D.obj', (obj) =>  {
     obj.scale.setScalar(0.007)
     obj.position.set(51.5,5.5,2)
     obj.add(lightMuseum)
     scene.add(obj)
})

lamp_ceiling2.load('object/lamp/lamp_ceiling/AM152_048_Coma D.obj', (obj) =>  {
     obj.scale.setScalar(0.007)
     obj.position.set(51.5,5.5,-2)
      obj.add(lightMuseum)
     scene.add(obj)
})

lamp_ceiling3.load('object/lamp/lamp_ceiling/AM152_048_Coma D.obj', (obj) =>  {
     obj.scale.setScalar(0.007)
     obj.position.set(51.5,5.5,6)
      obj.add(lightMuseum)
     scene.add(obj)
})
//Lamp's Frame
const lamp_frame_pathMLT : string = 'object/lamp/lamp_for_pic/lamps.mlt';

// Lamp's Pedestal
//rơw 1
const LampPedestalPath : string = 'object/lamp/lamp_round/AM152_002_Tlon 440 Ceiling.obj';
var tempPositionX : number = 31
const LampPedestalLoader1 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 6,5 , -5)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});

const LampPedestalLoader2 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 6,5,0)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});

const LampPedestalLoader3 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 6,5,6)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});

const LampPedestalLoader4 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 6,5,10)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});
//row2
const LampPedestalLoader5 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 3,5 , -5)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});

const LampPedestalLoader6 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 3,5,0)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});

const LampPedestalLoader7 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 3,5,6)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});

const LampPedestalLoader8 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 3,5,10)
         obj.scale.setScalar(0.01)

    scene.add(obj)
})
//row3
const LampPedestalLoader9 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX,5 , -5)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});

const LampPedestalLoader10 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX,5,0)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});

const LampPedestalLoader11 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX,5,6)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});

const LampPedestalLoader12 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX,5,10)
         obj.scale.setScalar(0.01)

    scene.add(obj)
})
//row4 
const LampPedestalLoader13 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 9,5 , -5)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});

const LampPedestalLoader14 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 9,5,0)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});

const LampPedestalLoader15 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 9,5,6)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});

const LampPedestalLoader16 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 9,5,10)
         obj.scale.setScalar(0.01)

    scene.add(obj)
})
//row5
const LampPedestalLoader17 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 13,5 , -5)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});

const LampPedestalLoader18 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 13,5,0)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});

const LampPedestalLoader19 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 13,5,6)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});

const LampPedestalLoader20 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 13,5,10)
         obj.scale.setScalar(0.01)

           scene.add(obj)
})
//===============================================Lamp's Lobby2============================================
var lampPosition : number = -5
const LampPedestalLoader21 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set( lampPosition,5.3,2.4)
         obj.scale.setScalar(0.05)

    scene.add(obj)
});

const LampPedestalLoader22 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set( lampPosition + 7 ,5.3,2.4)
         obj.scale.setScalar(0.05)

    scene.add(obj)
});



const LampPedestalLoader23 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set( lampPosition + 14 ,5.3,2.4)
         obj.scale.setScalar(0.05)

    scene.add(obj)
});

const LampPedestalLoader24 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set( lampPosition + 21,5.3,2.4)
         obj.scale.setScalar(0.05)

    scene.add(obj)
});

const LampPedestalLoader25 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set( lampPosition + 28 ,5.3,2.4)
         obj.scale.setScalar(0.05)

    scene.add(obj)
});


//----------------------------------------------------------------
//Frame
const frameNormalPath : string ='object/frame/frame.obj';
const blackFramePath : string ='object/frame/frame3.obj';
const frameNormalLoader = new OBJLoader();
const blackFrameLoader = new OBJLoader();

//================================================================

//===============================================Lobby============================================
blackFrameLoader.load(blackFramePath,(obj) => {
    obj.scale.setScalar(0.2)
    obj.position.set(52,3,-3)
    obj.rotateY(Math.PI / 2)
     obj.rotateZ(Math.PI / 2)
    scene.add(obj)
})
//===============================================Lobby2============================================
//===============================================Room1============================================
const nameFrameLoaderRoom1 = new OBJLoader().load(frameNormalPath,(obj) => {
    obj.scale.setScalar(0.001)
    obj.position.set(20,1.8,8.3)
    obj.rotateY(Math.PI)
    scene.add(obj)
}); 

const image1Room1 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room1/1.Bản đồ_sông Euphrates & sông Tigris.jpg'),
    side :  backside
}))
image1Room1.scale.set(1.6,1.6,50)
image1Room1.position.set(21.5,2.2,13)
scene.add(image1Room1)

const image2Room1 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room1/2.Sông Nin.jpg'),
    side :  backside
}))
image2Room1.scale.set(1.7,1.2,50)
image2Room1.rotateY(Math.PI / 2)
image2Room1.position.set(20.15,2.2,14.6)
scene.add(image2Room1)

const image3Room1 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room1/3.Sông Euphrates ở gần Ar Raqqah, Syria.jpg'),
    side :  backside
}))
image3Room1.scale.set(1.9,1.2,50)
image3Room1.rotateY(Math.PI / 2)
image3Room1.position.set(20.15,2.2,17.6)
scene.add(image3Room1)

const image4Room1 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room1/4. Sông Tigris ở Mosul, Iraq.jpg'),
    side :  backside
}))
image4Room1.scale.set(1.9,1.2,50)
image4Room1.rotateY(Math.PI / 2)
image4Room1.position.set(20.15,2.2,20.6)
scene.add(image4Room1)


const image5Room1 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room1/5.Các vị thần Geb và Nut_Nut tượng trưng cho bầu trời với những vì sao bao bọc Trái Đất.jpg'),
    side :  backside
}))
image5Room1.scale.set(3.9,3.2,50)
image5Room1.position.set(17.3,2.6,21.8)
scene.add(image5Room1)

const image6Room1 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room1/6.Số học.jpg'),
}))
image6Room1.scale.set(3.9,3.2,50)
image4Room1.rotateY(Math.PI * 2)
image6Room1.position.set(17.3,2.6,15.8)
scene.add(image6Room1)

const image7Room1 = new OBJLoader().load(blackFramePath,(obj) => {})

const image8Room1 = new OBJLoader().load(blackFramePath,(obj) => {})

const image9Room1 = new OBJLoader().load(blackFramePath,(obj) => {})

const image10Room1 = new OBJLoader().load(blackFramePath,(obj) => {})

const image11Room1 = new OBJLoader().load(blackFramePath,(obj) => {})

const image12Room1 = new OBJLoader().load(blackFramePath,(obj) => {})


//===============================================Room2============================================
const nameFrameLoaderRoom2 = new OBJLoader().load(frameNormalPath,(obj) => {
    obj.scale.setScalar(0.001)
    obj.position.set(5,1.8,8.3)
    obj.rotateY(Math.PI)
    scene.add(obj)
}); 

const image1Room2 = new OBJLoader().load(blackFramePath,(obj) => {})

const image2Room2 = new OBJLoader().load(blackFramePath,(obj) => {})

const image3Room2 = new OBJLoader().load(blackFramePath,(obj) => {})

const image4Room2 = new OBJLoader().load(blackFramePath,(obj) => {})

const image5Room2 = new OBJLoader().load(blackFramePath,(obj) => {})

const image6Room2 = new OBJLoader().load(blackFramePath,(obj) => {})

const image7Room2 = new OBJLoader().load(blackFramePath,(obj) => {})

const image8Room2 = new OBJLoader().load(blackFramePath,(obj) => {})

const image9Room2 = new OBJLoader().load(blackFramePath,(obj) => {})

const image10Room2 = new OBJLoader().load(blackFramePath,(obj) => {})

const image11Room2 = new OBJLoader().load(blackFramePath,(obj) => {})

const image12Room2 = new OBJLoader().load(blackFramePath,(obj) => {})
//===============================================Room3============================================
const nameFrameLoaderRoom3 = new OBJLoader().load(frameNormalPath,(obj) => {
    obj.scale.setScalar(0.001)
    obj.position.set(-4,1.8,-3.1)

    scene.add(obj)
}); 

const image1Room4 = new OBJLoader().load(blackFramePath,(obj) => {})

const image2Room3 = new OBJLoader().load(blackFramePath,(obj) => {})

const image3Room3 = new OBJLoader().load(blackFramePath,(obj) => {})

const image4Room3 = new OBJLoader().load(blackFramePath,(obj) => {})

const image5Room3 = new OBJLoader().load(blackFramePath,(obj) => {})

const image6Room3 = new OBJLoader().load(blackFramePath,(obj) => {})

const image7Room3 = new OBJLoader().load(blackFramePath,(obj) => {})

const image8Room3 = new OBJLoader().load(blackFramePath,(obj) => {})

const image9Room3 = new OBJLoader().load(blackFramePath,(obj) => {})

const image10Room3 = new OBJLoader().load(blackFramePath,(obj) => {})

const image11Room3 = new OBJLoader().load(blackFramePath,(obj) => {})

const image12Room3 = new OBJLoader().load(blackFramePath,(obj) => {})


//===============================================Room4============================================
const nameFrameLoaderRoom4 = new OBJLoader().load(frameNormalPath,(obj) => {
    obj.scale.setScalar(0.001)
    obj.position.set(11,1.8,-3.1)
    scene.add(obj)
}); 


const image1Room3 = new OBJLoader().load(blackFramePath,(obj) => {})

const image2Room4 = new OBJLoader().load(blackFramePath,(obj) => {})

const image3Room4 = new OBJLoader().load(blackFramePath,(obj) => {})

const image4Room4 = new OBJLoader().load(blackFramePath,(obj) => {})

const image5Room4 = new OBJLoader().load(blackFramePath,(obj) => {})

const image6Room4 = new OBJLoader().load(blackFramePath,(obj) => {})

const image7Room4 = new OBJLoader().load(blackFramePath,(obj) => {})

const image8Room4 = new OBJLoader().load(blackFramePath,(obj) => {})

const image9Room4 = new OBJLoader().load(blackFramePath,(obj) => {})

const image10Room4 = new OBJLoader().load(blackFramePath,(obj) => {})

const image11Room4 = new OBJLoader().load(blackFramePath,(obj) => {})

const image12Room4 = new OBJLoader().load(blackFramePath,(obj) => {})

//-----------------------------------------------------------------
//Pedestal
//rơw 1
const PedestalPath : string = 'object/Pedestal/Pedestal.obj';
const PedestalLoader1 = new OBJLoader().load(PedestalPath, (obj) => {
        obj.position.set(tempPositionX + 6,1.3 , -5)
             obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
    scene.add(obj)
});

const PedestalLoader2 = new OBJLoader().load(PedestalPath, (obj) => {
        obj.position.set(tempPositionX + 6,1.3,0)
             obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
    scene.add(obj)
});

const PedestalLoader3 = new OBJLoader().load(PedestalPath, (obj) => {
        obj.position.set(tempPositionX + 6,1.3,6)
             obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
    scene.add(obj)
});

const PedestalLoader4 = new OBJLoader().load(PedestalPath, (obj) => {
        obj.position.set(tempPositionX + 6,1.3,10)
             obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
    scene.add(obj)
});
//row2
const PedestalLoader5 = new OBJLoader().load(PedestalPath, (obj) => {
        obj.position.set(tempPositionX + 3,1.3 , -5)
             obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
    scene.add(obj)
});

const PedestalLoader6 = new OBJLoader().load(PedestalPath, (obj) => {
        obj.position.set(tempPositionX + 3,1.3,0)
             obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
    scene.add(obj)
});

const PedestalLoader7 = new OBJLoader().load(PedestalPath, (obj) => {
        obj.position.set(tempPositionX + 3,1.3,6)
             obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
    scene.add(obj)
});

const PedestalLoader8 = new OBJLoader().load(PedestalPath, (obj) => {
        obj.position.set(tempPositionX + 3,1.3,10)
             obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
    scene.add(obj)
})
//row3
const PedestalLoader9 = new OBJLoader().load(PedestalPath, (obj) => {
        obj.position.set(tempPositionX,1.3 , -5)
             obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
    scene.add(obj)
});

const PedestalLoader10 = new OBJLoader().load(PedestalPath, (obj) => {
        obj.position.set(tempPositionX,1.3,0)
             obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
    scene.add(obj)
});

const PedestalLoader11 = new OBJLoader().load(PedestalPath, (obj) => {
        obj.position.set(tempPositionX,1.3,6)
             obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
    scene.add(obj)
});

const PedestalLoader12 = new OBJLoader().load(PedestalPath, (obj) => {
        obj.position.set(tempPositionX,1.3,10)
             obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
    scene.add(obj)
})
//row4 
const PedestalLoader13 = new OBJLoader().load(PedestalPath, (obj) => {
        obj.position.set(tempPositionX + 9,1.3 , -5)
             obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
    scene.add(obj)
});

const PedestalLoader14 = new OBJLoader().load(PedestalPath, (obj) => {
        obj.position.set(tempPositionX + 9,1.3,0)
             obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
    scene.add(obj)
});

const PedestalLoader15 = new OBJLoader().load(PedestalPath, (obj) => {
        obj.position.set(tempPositionX + 9,1.3,6)
             obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
    scene.add(obj)
});

const PedestalLoader16 = new OBJLoader().load(PedestalPath, (obj) => {
        obj.position.set(tempPositionX + 9,1.3,10)
             obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
    scene.add(obj)
})
//row5
const PedestalLoader17 = new OBJLoader().load(PedestalPath, (obj) => {
        obj.position.set(tempPositionX + 13,1.3 , -5)
             obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
    scene.add(obj)
});

const PedestalLoader18 = new OBJLoader().load(PedestalPath, (obj) => {
        obj.position.set(tempPositionX + 13,1.3,0)
             obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
    scene.add(obj)
});

const PedestalLoader19 = new OBJLoader().load(PedestalPath, (obj) => {
        obj.position.set(tempPositionX + 13,1.3,6)
             obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
    scene.add(obj)
});

const PedestalLoader20 = new OBJLoader().load(PedestalPath, (obj) => {
        obj.position.set(tempPositionX + 13,1.3,10)
             obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
           scene.add(obj)
})



//----------------------------------------------------------------
const onKeyDown = function (event: KeyboardEvent) {
    console.log(event.code)
    switch (event.code) {
        case 'KeyW':
            controls.moveForward(0.25)
            break
        case 'KeyA':
            controls.moveRight(-0.25)
            break
        case 'KeyS':
            controls.moveForward(-0.25)
            break
        case 'KeyD':
            controls.moveRight(0.25)
        case 'ArrowUp':
            controls.moveForward(0.25)
            break
        case 'ArrowLeft':
            controls.moveRight(-0.25)
            break
        case 'ArrowDown':
            controls.moveForward(-0.25)
            break
        case 'ArrowRight':
            controls.moveRight(0.25)
            break
        case 'Numpad8':
            controls.moveForward(0.25)
            break
        case 'Numpad4':
            controls.moveRight(-0.25)
            break
        case 'Numpad2':
            controls.moveForward(-0.25)
            break
        case 'Numpad6':
            controls.moveRight(0.25)
            break
        case 'Enter':
            menuPanel.style.display = 'none'
            controls.lock()
            break
    }
}
document.addEventListener('keydown', onKeyDown, false)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = Stats()
document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)

    TWEEN.update()
    render()

    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()
