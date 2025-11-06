// === 기본 세팅 ===
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 50, 80);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// === 조명 ===
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(50, 100, 50);
scene.add(light);
scene.add(new THREE.AmbientLight(0xaaaaaa));

// === 컨트롤러 ===
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// === 바닥 (학교 평면도 텍스처로 표시) ===
const textureLoader = new THREE.TextureLoader();
textureLoader.load('floor.png', (texture) => {
  const floorGeometry = new THREE.PlaneGeometry(100, 50);
  const floorMaterial = new THREE.MeshBasicMaterial({ map: texture });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);
});

// === 벽 예시 (교실 경계 등 나중에 추가 가능) ===
const wallMaterial = new THREE.MeshLambertMaterial({ color: 0xd0d0d0 });
const wallGeometry = new THREE.BoxGeometry(10, 5, 0.2);
const wall = new THREE.Mesh(wallGeometry, wallMaterial);
wall.position.set(0, 2.5, -20);
scene.add(wall);

// === 렌더링 루프 ===
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// === 창 크기 조정 대응 ===
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
