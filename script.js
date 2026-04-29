// ===== SCENE SETUP =====
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

camera.position.setZ(40);

// ===== SPHERE (GLOBE) =====
const geometry = new THREE.SphereGeometry(10, 64, 64);
const material = new THREE.MeshStandardMaterial({
    color: 0x00ffff,
    wireframe: true
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// ===== LIGHTS =====
const light1 = new THREE.PointLight(0x00ffff, 1.5);
light1.position.set(20, 20, 20);

const light2 = new THREE.PointLight(0xff00ff, 1.5);
light2.position.set(-20, -20, 20);

scene.add(light1, light2);

// ===== PARTICLES =====
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 4000;

const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 600;
}

particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3)
);

const particlesMaterial = new THREE.PointsMaterial({
    size: 1,
    color: 0x00ffff
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// ===== ANIMATION =====
function animate() {
    requestAnimationFrame(animate);

    sphere.rotation.x += 0.002;
    sphere.rotation.y += 0.003;

    particles.rotation.y += 0.0008;
    particles.rotation.x += 0.0004;

    renderer.render(scene, camera);
}
animate();

// ===== MOUSE INTERACTION =====
document.addEventListener("mousemove", (e) => {
    let x = (e.clientX / window.innerWidth - 0.5) * 10;
    let y = (e.clientY / window.innerHeight - 0.5) * 10;

    camera.position.x = x;
    camera.position.y = -y;
});

// ===== RESPONSIVE =====
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ===== TYPING EFFECT =====
const text = "I build intelligent applications and scalable solutions.";
let i = 0;

function typing() {
    if (i < text.length) {
        document.querySelector(".hero-desc").innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, 40);
    }
}
typing();

// ===== NAVIGATION FIX =====
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');

        // only prevent default for internal links
        if (targetId.startsWith("#")) {
            e.preventDefault();

            const target = document.querySelector(targetId);

            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: "smooth"
            });
        }
    });
});