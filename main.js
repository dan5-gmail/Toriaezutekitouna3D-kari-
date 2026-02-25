import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
 
// ===== シーン =====
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);
 
// ===== カメラ =====
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
 
// ===== レンダラー =====
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
 
// ===== 光 =====
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(20, 30, 10);
scene.add(light);
 
// ===== 地面 100×100 =====
const worldSize = 100;
 
for (let x = 0; x < worldSize; x++) {
  for (let z = 0; z < worldSize; z++) {
 
    const tileGeo = new THREE.BoxGeometry(1, 0.1, 1);
    const tileMat = new THREE.MeshLambertMaterial({ color: 0x228B22 });
    const tile = new THREE.Mesh(tileGeo, tileMat);
    tile.position.set(x, 0, z);
    scene.add(tile);
 
    // 草
    if (Math.random() < 0.25) {
      const grassGeo = new THREE.BoxGeometry(0.1, 0.6, 0.1);
      const grassMat = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
      const grass = new THREE.Mesh(grassGeo, grassMat);
      grass.position.set(x, 0.35, z);
      scene.add(grass);
    }
  }
}
 
// ===== プレイヤー =====
const playerGeo = new THREE.BoxGeometry(0.8, 2, 0.8);
const playerMat = new THREE.MeshLambertMaterial({ color: 0xff0000 });
const player = new THREE.Mesh(playerGeo, playerMat);
player.position.set(5, 1, 5);
scene.add(player);
 
// ===== カメラ位置 =====
camera.position.set(5, 6, 12);
camera.lookAt(player.position);
 
// ===== 入力 =====
const keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);
 
// ===== 更新 =====
function updatePlayer() {
  const speed = 0.15;
 
  if (keys["w"]) player.position.z -= speed;
  if (keys["s"]) player.position.z += speed;
  if (keys["a"]) player.position.x -= speed;
  if (keys["d"]) player.position.x += speed;
 
  camera.position.x = player.position.x;
  camera.position.z = player.position.z + 10;
  camera.lookAt(player.position);
}
 
// ===== ループ =====
function animate() {
  requestAnimationFrame(animate);
  updatePlayer();
  renderer.render(scene, camera);
}
 
animate();
 
// ===== リサイズ対応 =====
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});