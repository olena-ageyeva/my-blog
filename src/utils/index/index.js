import * as THREE from "three"
import "./styles.css"

export const onPageRender = () => {
  var wireframe = false
  var sphere = false
  var shape = "cube"

  setTimeout(function() {
    document.querySelector("#wireframe").addEventListener("click", function() {
      wireframe = !wireframe
      objMaterial.wireframe = wireframe
      scene.remove(obj)
      scene.add(obj)
    })
    document.querySelector("#shape").addEventListener("click", function() {
      scene.remove(obj)
      sphere = !sphere
      if (shape === "ico") {
        shape = "sphere"
        objGeometry = new THREE.SphereGeometry(50, 32, 32)
      } else {
        if (shape === "sphere") {
          shape = "cube"
          objGeometry = new THREE.CubeGeometry(100, 100, 100)
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
    var width = window.innerWidth / 3
    var height = window.innerHeight / 3

    var renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    document.getElementById("app").appendChild(renderer.domElement)

    var scene = new THREE.Scene()

    //CUBE
    //   if (obj) scene.remove(obj);
    var objGeometry = new THREE.CubeGeometry(100, 100, 100)
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
