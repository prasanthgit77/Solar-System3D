import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// initialize the scene
const scene = new THREE.Scene();

// add textureLoader
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath('/textures/cubeMap/');

// loading textures
const sunTexture = textureLoader.load("/textures/2k_sun.jpg");
sunTexture.colorSpace = THREE.SRGBColorSpace;
const mercuryTexture = textureLoader.load("/textures/2k_mercury.jpg");
mercuryTexture.colorSpace = THREE.SRGBColorSpace;
const venusTexture = textureLoader.load("/textures/2k_venus_surface.jpg");
venusTexture.colorSpace = THREE.SRGBColorSpace;
const earthTexture = textureLoader.load("/textures/2k_earth_daymap.jpg");
earthTexture.colorSpace = THREE.SRGBColorSpace;
const marsTexture = textureLoader.load("/textures/2k_mars.jpg");
marsTexture.colorSpace = THREE.SRGBColorSpace;
const moonTexture = textureLoader.load("/textures/2k_moon.jpg");
moonTexture.colorSpace = THREE.SRGBColorSpace;
const jupiterTexture = textureLoader.load('/textures/jupiter.png');
jupiterTexture.colorSpace = THREE.SRGBColorSpace;
const saturnTexture = textureLoader.load('/textures/saturn.png');
saturnTexture.colorSpace = THREE.SRGBColorSpace;
const uranusTexture = textureLoader.load('/textures/Uranus.png');
uranusTexture.colorSpace = THREE.SRGBColorSpace;
const neptuneTexture = textureLoader.load('/textures/neptune.png');
neptuneTexture.colorSpace = THREE.SRGBColorSpace;
const saturnRingsTexture = textureLoader.load("/textures/saturnrings.png");
saturnRingsTexture.colorSpace = THREE.SRGBColorSpace;

// background
const backgroundCubemap = cubeTextureLoader.load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']);
backgroundCubemap.colorSpace = THREE.SRGBColorSpace;
scene.background = backgroundCubemap;

// materials
const mercuryMaterial = new THREE.MeshStandardMaterial({ map: mercuryTexture });
const venusMaterial = new THREE.MeshStandardMaterial({ map: venusTexture });
const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
const marsMaterial = new THREE.MeshStandardMaterial({ map: marsTexture });
const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });
const jupiterMaterial = new THREE.MeshStandardMaterial({ map: jupiterTexture });
const saturnMaterial = new THREE.MeshStandardMaterial({ map: saturnTexture });
const uranusMaterial = new THREE.MeshStandardMaterial({ map: uranusTexture });
const neptuneMaterial = new THREE.MeshStandardMaterial({ map: neptuneTexture });
const ringMaterial = new THREE.MeshBasicMaterial({ map: saturnRingsTexture, side: THREE.DoubleSide });

// geometries
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const ringGeometry = new THREE.RingGeometry(3, 5, 64);

// Sun
const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
sun.scale.setScalar(5);
scene.add(sun);

// planets data
const planets = [
    { name: "Mercury", radius: 0.5, distance: 10, speed: 0.01, material: mercuryMaterial, moons: [] },
    { name: "Venus", radius: 0.8, distance: 15, speed: 0.007, material: venusMaterial, moons: [] },
    { name: "Earth", radius: 1, distance: 20, speed: 0.005, material: earthMaterial,
      moons: [{ name: "Moon", radius: 0.3, distance: 3, speed: 0.015 }] },
    { name: "Mars", radius: 0.7, distance: 25, speed: 0.003, material: marsMaterial,
      moons: [
          { name: "Phobos", radius: 0.1, distance: 2, speed: 0.02 },
          { name: "Deimos", radius: 0.2, distance: 3, speed: 0.015 }
      ] },
    { name: "Jupiter", radius: 2.5, distance: 35, speed: 0.002, material: jupiterMaterial,
      moons: [
          { name: "Io", radius: 0.2, distance: 3, speed: 0.017 },
          { name: "Europa", radius: 0.15, distance: 4, speed: 0.013 },
          { name: "Ganymede", radius: 0.25, distance: 5, speed: 0.01 },
          { name: "Callisto", radius: 0.23, distance: 7, speed: 0.007 }
      ] },
    { name: "Uranus", radius: 1.8, distance: 65, speed: 0.001, material: uranusMaterial,
      moons: [
          { name: "Miranda", radius: 0.05, distance: 2, speed: 0.025 },
          { name: "Ariel", radius: 0.06, distance: 3, speed: 0.02 },
          { name: "Umbriel", radius: 0.06, distance: 4, speed: 0.017 },
          { name: "Titania", radius: 0.08, distance: 6, speed: 0.012 },
          { name: "Oberon", radius: 0.08, distance: 7, speed: 0.01 }
      ] },
    { name: "Neptune", radius: 1.7, distance: 80, speed: 0.0008, material: neptuneMaterial,
      moons: [{ name: "Triton", radius: 0.12, distance: 4, speed: -0.015 }] }
];

// Saturn
const saturnMesh = new THREE.Mesh(sphereGeometry, saturnMaterial);
saturnMesh.scale.setScalar(2.2);
saturnMesh.position.x = 50;
scene.add(saturnMesh);

const rings = new THREE.Mesh(ringGeometry, ringMaterial);
rings.rotation.x = Math.PI / 2;
rings.position.x = 50;
scene.add(rings);

// functions
const createPlanet = (planet) => {
    const planetMesh = new THREE.Mesh(sphereGeometry, planet.material);
    planetMesh.scale.setScalar(planet.radius);
    planetMesh.position.x = planet.distance;
    return planetMesh;
};

const createMoon = (moon) => {
    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    moonMesh.scale.setScalar(moon.radius);
    moonMesh.position.x = moon.distance;
    return moonMesh;
};

// planet meshes
const planetMeshes = planets.map((planet) => {
    const planetMesh = createPlanet(planet);
    scene.add(planetMesh);
    planet.moons.forEach((moon) => {
        const moonMesh = createMoon(moon);
        planetMesh.add(moonMesh);
    });
    return planetMesh;
});

// lights
scene.add(new THREE.AmbientLight(0xffffff, 0.3));
scene.add(new THREE.PointLight(0xffffff, 1000));

// camera
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 400);
camera.position.set(0, 5, 150);

// renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.rotateSpeed = 0.3; // slower rotation
controls.zoomSpeed = 0.5;   // slower zoom
controls.maxDistance = 200;
controls.minDistance = 5;

// resize listener
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ------------------------------------------------------------------
// CAMERA FOLLOW SYSTEM (enhanced)
// - Smooth transition to planet on selection
// - Then lock/follow the planet while maintaining ability to use OrbitControls
// - User interactions update the follow offset so the camera continues to follow user's viewpoint
// ------------------------------------------------------------------

let followTarget = null;

// default follow offset used for transition and base follow (can be updated by user interactions)
const defaultFollowOffset = new THREE.Vector3(0, 3, 10);
let followOffset = defaultFollowOffset.clone();

// transition state
let isTransitioning = false;
let transitionTarget = new THREE.Vector3();

// interaction flag - set while the user is interacting with the controls
let isUserInteracting = false;

// lerp / speed tuning (lower values -> slower/smoother)
const TRANSITION_LERP = 0.06; // speed for initial move-to-planet
const FOLLOW_LERP = 0.03;     // speed camera uses while following (slower for smoother)
const TARGET_LERP = 0.12;     // speed to move controls.target to planet

// Setup control event listeners to know when the user is interacting
controls.addEventListener('start', () => {
    isUserInteracting = true;
});
controls.addEventListener('end', () => {
    isUserInteracting = false;
    // When user finishes interaction, if we're following a planet we update the followOffset
    if (followTarget) {
        const wp = new THREE.Vector3();
        followTarget.getWorldPosition(wp);
        followOffset.copy(camera.position).sub(wp);
    }
});

// Also track mouse/touch down/up on canvas as a fallback
canvas.addEventListener('pointerdown', () => { isUserInteracting = true; });
window.addEventListener('pointerup', () => {
    // tiny timeout to ensure OrbitControls 'end' runs first in some browsers
    setTimeout(() => {
        isUserInteracting = false;
        if (followTarget) {
            const wp = new THREE.Vector3();
            followTarget.getWorldPosition(wp);
            followOffset.copy(camera.position).sub(wp);
        }
    }, 0);
});

// planet map for dropdown lookup
const planetMap = {
    Sun: sun,
    Mercury: planetMeshes[0],
    Venus: planetMeshes[1],
    Earth: planetMeshes[2],
    Mars: planetMeshes[3],
    Jupiter: planetMeshes[4],
    Saturn: saturnMesh,
    Uranus: planetMeshes[5],
    Neptune: planetMeshes[6]
};

// planet info text
const planetData = {
  Sun: `The Sun is the star at the center of the Solar System.

It contains more than 99% of the total mass of the Solar System.

The Sun's energy is produced by nuclear fusion in its core.

Its surface temperature is about 5,500 degrees Celsius.

The Sun's gravity holds the planets in their orbits.`,
  
  Mercury: `Mercury is the smallest planet in the Solar System.

It is the closest planet to the Sun.

Mercury has a very thin atmosphere and experiences extreme temperature variations.

Its surface is heavily cratered, resembling the Moon.

A day on Mercury lasts 59 Earth days.`,

  Venus: `Venus is the second planet from the Sun.

It has a thick, toxic atmosphere rich in carbon dioxide.

Venus experiences a runaway greenhouse effect, making it the hottest planet.

Its surface pressure is about 92 times that of Earth.

Venus rotates in the opposite direction to most planets.`,

  Earth: `Earth is the third planet from the Sun and the only known planet to support life.

About 71% of Earth's surface is covered by water.

Earth's atmosphere protects life by blocking harmful solar radiation.

It has one natural satellite, the Moon, which influences tides.

Earth’s magnetic field shields the planet from solar wind.`,

  Mars: `Mars is known as the Red Planet due to iron oxide on its surface.

It has the largest volcano and canyon in the Solar System.

Mars has two small moons: Phobos and Deimos.

The atmosphere is thin, mostly carbon dioxide.

Scientists are investigating Mars for signs of past life.`,

  Jupiter: `Jupiter is the largest planet in the Solar System.

It is a gas giant mostly composed of hydrogen and helium.

Jupiter has a strong magnetic field and dozens of moons.

The Great Red Spot is a giant storm on Jupiter's surface.

It has faint rings around it, unlike Saturn's prominent rings.`,

  Saturn: `Saturn is famous for its beautiful and extensive ring system.

It is the second largest planet and a gas giant.

Saturn is mostly made of hydrogen and helium.

It has more than 80 moons, including Titan, the second largest moon in the Solar System.

Saturn's rings are made mostly of ice particles.`,

  Uranus: `Uranus rotates on its side, unlike most planets.

It is an ice giant composed mainly of water, methane, and ammonia ices.

Its atmosphere gives it a blue-green color.

Uranus has 27 known moons and faint rings.

It takes 84 Earth years to orbit the Sun.`,

  Neptune: `Neptune is the farthest known planet from the Sun.

It is an ice giant similar to Uranus in composition.

Neptune has the strongest winds in the Solar System.

It has 14 known moons, with Triton being the largest.

Neptune appears a deep blue color due to methane in its atmosphere.`
};

// dropdown event - smooth transition then follow
document.getElementById("planetSelect").addEventListener("change", (e) => {
    const value = e.target.value;
    const infoBox = document.getElementById("planetInfo");

    if (value === "solar") {
        // go back to solar view
        followTarget = null;
        isTransitioning = false;
        transitionTarget.set(0, 5, 150);
        camera.position.lerp(transitionTarget, 0.2); // quick reposition (user still can control)
        controls.target.set(0, 0, 0);
        infoBox.style.display = "none";
    } else {
        // start following the selected planet
        followTarget = planetMap[value];

        // compute world position of planet now
        const worldPos = new THREE.Vector3();
        followTarget.getWorldPosition(worldPos);

        // pick an initial offset for the transition — we use default so camera moves to a consistent location near planet
        followOffset.copy(defaultFollowOffset);

        // transition target is planet position + offset
        transitionTarget.copy(worldPos).add(followOffset);

        // set transitioning flag so render loop will move camera there smoothly
        isTransitioning = true;

        // show info
        infoBox.style.display = "block";
        infoBox.innerText = planetData[value] || "No data available.";
    }
});

// animation loop
const renderloop = () => {
    // update planet positions
    planetMeshes.forEach((planet, planetIndex) => {
        planet.rotation.y += planets[planetIndex].speed;
        planet.position.x = Math.sin(planet.rotation.y) * planets[planetIndex].distance;
        planet.position.z = Math.cos(planet.rotation.y) * planets[planetIndex].distance;

        planet.children.forEach((child, childIndex) => {
            if (childIndex < planets[planetIndex].moons.length) {
                child.rotation.y += planets[planetIndex].moons[childIndex].speed;
                child.position.x = Math.sin(child.rotation.y) * planets[planetIndex].moons[childIndex].distance;
                child.position.z = Math.cos(child.rotation.y) * planets[planetIndex].moons[childIndex].distance;
            }
        });
    });

    // Saturn position
    saturnMesh.rotation.y += 0.0015;
    rings.rotation.y += 0.0015;
    saturnMesh.position.x = Math.sin(saturnMesh.rotation.y) * 50;
    saturnMesh.position.z = Math.cos(saturnMesh.rotation.y) * 50;
    rings.position.x = saturnMesh.position.x;
    rings.position.z = saturnMesh.position.z;

    // camera follows planet but still allows OrbitControls
    if (followTarget) {
        const worldPos = new THREE.Vector3();
        followTarget.getWorldPosition(worldPos);

        // Smoothly move controls.target to the planet (so orbit/panning remains centered on the planet)
        controls.target.lerp(worldPos, TARGET_LERP);

        if (isTransitioning) {
            // During initial transition, lerp camera to the transitionTarget
            camera.position.lerp(transitionTarget, TRANSITION_LERP);

            // If close enough, consider transition finished and switch to follow mode
            if (camera.position.distanceTo(transitionTarget) < 0.25) {
                isTransitioning = false;

                // After arriving, recalc followOffset (camera - planet) so follow continues from current view
                const arrivedWorld = new THREE.Vector3();
                followTarget.getWorldPosition(arrivedWorld);
                followOffset.copy(camera.position).sub(arrivedWorld);
                // small safeguard: if followOffset is tiny, set to default
                if (followOffset.length() < 0.5) followOffset.copy(defaultFollowOffset);
            }
        } else {
            // Normal follow mode:
            // If the user is interacting, update followOffset so camera preserves user's viewpoint while following
            if (isUserInteracting) {
                const wp = new THREE.Vector3();
                followTarget.getWorldPosition(wp);
                followOffset.copy(camera.position).sub(wp);
            } else {
                // not interacting: move camera smoothly so it keeps the same offset relative to the planet
                const desiredPos = worldPos.clone().add(followOffset);
                camera.position.lerp(desiredPos, FOLLOW_LERP);
            }
        }
    }

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(renderloop);
};

renderloop();
