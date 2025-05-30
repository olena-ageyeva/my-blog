import * as THREE from "three"
import "./styles.css"

export const onPageRender = () => {
  var wireframe = false
  var sphere = false
  var shape = "cube"

  setTimeout(function () {
    // Check if required elements exist before adding event listeners
    const wireframeElement = document.querySelector("#wireframe");
    const shapeElement = document.querySelector("#shape");
    const appElement = document.getElementById("app");

    if (!wireframeElement || !shapeElement || !appElement) {
      console.log('Three.js elements not found, skipping initialization');
      return;
    }

    wireframeElement.addEventListener("click", function () {
      wireframe = !wireframe
      objMaterial.wireframe = wireframe
      scene.remove(obj)
      scene.add(obj)
    })
    shapeElement.addEventListener("click", function () {
      scene.remove(obj)
      sphere = !sphere
      if (shape === "ico") {
        shape = "sphere"
        objGeometry = new THREE.SphereGeometry(100, 32, 32)
      } else {
        if (shape === "sphere") {
          shape = "cube"
          objGeometry = new THREE.CubeGeometry(150, 150, 150)
        } else {
          shape = "ico"
          objGeometry = new THREE.IcosahedronGeometry(100, 0)
        }
      }
      objMaterial = new THREE.MeshLambertMaterial({
        color: 0xccff,
        wireframe: wireframe,
      })
      obj = new THREE.Mesh(objGeometry, objMaterial)
      obj.castShadow = true
      obj.receiveShadow = false
      obj.rotation.y = (Math.PI * 45) / 180
      scene.add(obj)
    })
    //SCENE
    var width = appElement.offsetWidth
    var height = appElement.offsetHeight

    var renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    appElement.appendChild(renderer.domElement)

    var scene = new THREE.Scene()

    //CUBE
    //   if (obj) scene.remove(obj);
    var objGeometry = new THREE.CubeGeometry(150, 150, 150)
    var objMaterial = new THREE.MeshLambertMaterial({
      color: 0xccff,
      wireframe: wireframe,
    })
    var obj = new THREE.Mesh(objGeometry, objMaterial)
    obj.castShadow = true
    obj.receiveShadow = false
    obj.rotation.y = (Math.PI * 45) / 180

    scene.add(obj)

    //CAMERA
    var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000)
    camera.position.y = 160
    camera.position.z = 500

    scene.add(camera)
    camera.lookAt(obj.position)

    //SKYBOX
    var skyboxGeometry = new THREE.CubeGeometry(800, 1000, 1000)
    var skyboxMaterial = new THREE.MeshPhongMaterial({
      color: 0xefefef,
      side: THREE.BackSide,
    })
    var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial)
    skybox.material.side = THREE.DoubleSide
    skybox.position.y = 200
    skybox.position.z = 0
    skybox.rotation.y = 0
    skybox.rotation.z = 0
    skybox.doubleSided = true
    skybox.receiveShadow = true
    scene.add(skybox)

    // //LIGHTING
    var spotLight = new THREE.SpotLight(0xffffff, 0.5)
    spotLight.position.set(200, 400, 300)

    spotLight.castShadow = true

    spotLight.shadow.mapSize.width = 1024
    spotLight.shadow.mapSize.height = 1024

    spotLight.shadow.camera.near = 400
    spotLight.shadow.camera.far = 5000
    spotLight.shadow.camera.fov = 30

    var pointLight = new THREE.PointLight(0xffffff, 0.7)
    pointLight.position.set(100, 300, 200)

    scene.add(spotLight)
    scene.add(pointLight)

    function render() {
      requestAnimationFrame(render)
      renderer.render(scene, camera)
      obj.rotation.y += 0.01
    }

    render()
  }, 100)
}
