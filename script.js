import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


const scene = new THREE.Scene();


const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath('/textures/cubeMap/');


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


const backgroundCubemap = cubeTextureLoader.load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']);
backgroundCubemap.colorSpace = THREE.SRGBColorSpace;
scene.background = backgroundCubemap;


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

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const ringGeometry = new THREE.RingGeometry(3, 5, 64);


const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
sun.scale.setScalar(5);
scene.add(sun);


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


const saturnMesh = new THREE.Mesh(sphereGeometry, saturnMaterial);
saturnMesh.scale.setScalar(2.2);
saturnMesh.position.x = 50;
scene.add(saturnMesh);

const rings = new THREE.Mesh(ringGeometry, ringMaterial);
rings.rotation.x = Math.PI / 2;
rings.position.x = 50;
scene.add(rings);


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


const planetMeshes = planets.map((planet) => {
    const planetMesh = createPlanet(planet);
    scene.add(planetMesh);
    planet.moons.forEach((moon) => {
        const moonMesh = createMoon(moon);
        planetMesh.add(moonMesh);
    });
    return planetMesh;
});


scene.add(new THREE.AmbientLight(0xffffff, 0.3));
scene.add(new THREE.PointLight(0xffffff, 1000));


const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 400);
camera.position.set(0, 5, 150);


const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.rotateSpeed = 0.3; // slower rotation
controls.zoomSpeed = 0.5;   // slower zoom
controls.maxDistance = 200;
controls.minDistance = 5;


window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});



let followTarget = null;

const defaultFollowOffset = new THREE.Vector3(0, 3, 10);
let followOffset = defaultFollowOffset.clone();


let isTransitioning = false;
let transitionTarget = new THREE.Vector3();


let isUserInteracting = false;


const TRANSITION_LERP = 0.06; 
const FOLLOW_LERP = 0.03;     
const TARGET_LERP = 0.12;     


controls.addEventListener('start', () => {
    isUserInteracting = true;
});
controls.addEventListener('end', () => {
    isUserInteracting = false;
   
    if (followTarget) {
        const wp = new THREE.Vector3();
        followTarget.getWorldPosition(wp);
        followOffset.copy(camera.position).sub(wp);
    }
});


canvas.addEventListener('pointerdown', () => { isUserInteracting = true; });
window.addEventListener('pointerup', () => {
    
    setTimeout(() => {
        isUserInteracting = false;
        if (followTarget) {
            const wp = new THREE.Vector3();
            followTarget.getWorldPosition(wp);
            followOffset.copy(camera.position).sub(wp);
        }
    }, 0);
});

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

document.getElementById("planetSelect").addEventListener("change", (e) => {
    const value = e.target.value;
    const infoBox = document.getElementById("planetInfo");

    if (value === "solar") {
        
        followTarget = null;
        isTransitioning = false;
        transitionTarget.set(0, 5, 150);
        camera.position.lerp(transitionTarget, 0.2); 
        controls.target.set(0, 0, 0);
        infoBox.style.display = "none";
    } else {
        
        followTarget = planetMap[value];

      
        const worldPos = new THREE.Vector3();
        followTarget.getWorldPosition(worldPos);

        
        followOffset.copy(defaultFollowOffset);

        
        transitionTarget.copy(worldPos).add(followOffset);

        
        isTransitioning = true;

      
        infoBox.style.display = "block";
        infoBox.innerText = planetData[value] || "No data available.";
    }
});


const renderloop = () => {
   
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

   
    saturnMesh.rotation.y += 0.0015;
    rings.rotation.y += 0.0015;
    saturnMesh.position.x = Math.sin(saturnMesh.rotation.y) * 50;
    saturnMesh.position.z = Math.cos(saturnMesh.rotation.y) * 50;
    rings.position.x = saturnMesh.position.x;
    rings.position.z = saturnMesh.position.z;

   
    if (followTarget) {
        const worldPos = new THREE.Vector3();
        followTarget.getWorldPosition(worldPos);

        
        controls.target.lerp(worldPos, TARGET_LERP);

        if (isTransitioning) {
            
            camera.position.lerp(transitionTarget, TRANSITION_LERP);

            
            if (camera.position.distanceTo(transitionTarget) < 0.25) {
                isTransitioning = false;

             
                const arrivedWorld = new THREE.Vector3();
                followTarget.getWorldPosition(arrivedWorld);
                followOffset.copy(camera.position).sub(arrivedWorld);
                
                if (followOffset.length() < 0.5) followOffset.copy(defaultFollowOffset);
            }
        } else {
            

            if (isUserInteracting) {
                const wp = new THREE.Vector3();
                followTarget.getWorldPosition(wp);
                followOffset.copy(camera.position).sub(wp);
            } else {
               
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
