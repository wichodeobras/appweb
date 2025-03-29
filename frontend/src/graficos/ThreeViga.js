// ThreeViga.js
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ThreeViga = ({ lb, h, bf, tf, tw }) => {
  // Usa un ref para el contenedor de la escena
  const mountRef = useRef(null);

  useEffect(() => {
    // Limpia el contenedor para evitar que se acumulen varios canvas
    if (mountRef.current) {
      mountRef.current.innerHTML = "";
    }
  
    // Parámetros de la viga
    const L = lb || 300; // Longitud de la viga
    const H = h || 150;   // Altura total de la viga
    const W = bf || 100;  // Ancho de los patines
    const t = tf || 7; // Espesor de los patines
    const w = tw || 7; // Espesor del alma
  
    // Escena
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
  
    // Cámara
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      5,
      10000
    );
    camera.position.set(-300, 0, 500);
    camera.lookAt(0, 0, 0);
  
    // Renderizador
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);
  
    // Controles de órbita
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();
  
    // Luces
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
  
    // Material para la viga
    const material = new THREE.MeshStandardMaterial({
      color: 0x5B9BD5,
      metalness: 0.4,
      roughness: 0.4,
    });
  
    // Ala superior (flange superior)
    const topFlangeGeometry = new THREE.BoxGeometry(W, t, L);
    const topFlange = new THREE.Mesh(topFlangeGeometry, material);
    topFlange.position.y = (H / 2) - (t / 2);
    scene.add(topFlange);
  
    // Ala inferior (flange inferior)
    const bottomFlangeGeometry = new THREE.BoxGeometry(W, t, L);
    const bottomFlange = new THREE.Mesh(bottomFlangeGeometry, material);
    bottomFlange.position.y = -((H / 2) - (t / 2));
    scene.add(bottomFlange);
  
    // Alma central (web)
    const webGeometry = new THREE.BoxGeometry(w, H - 2 * t, L);
    const web = new THREE.Mesh(webGeometry, material);
    web.position.y = 0;
    scene.add(web);
  
    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  
    // Manejo de redimensionamiento
    const handleResize = () => {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);
  
    // Limpieza al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [lb, h, bf, tf, tw]);
  
  return <div style={{ width: "100%", height: "400px" }} ref={mountRef} />;
};

export default ThreeViga;
