import { Injectable } from '@angular/core';
import TWEEN from '@tweenjs/tween.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DirectionEnum, SCENES } from '../helpers/constants';

@Injectable({
  providedIn: 'root',
})
export class ViewService {
  public index: number = 0;
  private controls!: OrbitControls;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private sphere!: THREE.Mesh;
  private scene!: THREE.Scene;
  constructor() {}

  /**
   * Create scene
   *
   * @returns
   */
  public createScene(): void {
    this.scene = new THREE.Scene();
    const loadingManager = new THREE.LoadingManager();

    // load texture
    loadingManager.onLoad = () => {};
    const textureLoader = new THREE.TextureLoader(loadingManager);

    // load default image
    let texture = textureLoader.load(
      `../../assets/bell-mountain/${SCENES[this.index].background_url}.jpg`
    );

    // create a new Three.js renderer
    this.renderer = new THREE.WebGLRenderer();

    // set the renderer size to the window dimensions
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // get the container element for the background
    const backgroundContainer = document.querySelector('.sphere');

    if (backgroundContainer == null) {
      return;
    }

    backgroundContainer.appendChild(this.renderer.domElement);

    // configure the sphere
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    // invert the geometry to render it inside out
    geometry.scale(-1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
    });
    this.sphere = new THREE.Mesh(geometry, material);
    this.scene.add(this.sphere);

    // create a new Three.js perspective camera
    this.camera = new THREE.PerspectiveCamera(
      75, // field of view
      window.innerWidth / window.innerHeight, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    // set the camera's position in the scene
    this.camera.position.set(0, 0, 0);
    // create a new OrbitControls
    const createControls = () => {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.target.set(-0.5, 0, -0.5);
      this.controls.update();
      this.controls.enablePan = false;
      this.controls.enableDamping = true;
      // invert the orbit controls direction
      this.controls.rotateSpeed = -0.25;
    };
    createControls();

    const animate = () => {
      // request the next frame of the animation
      requestAnimationFrame(animate);
      TWEEN.update();
      this.renderer.render(this.scene, this.camera);
    };

    animate();

    // update renderer and camera dimensions on window resize
    window.addEventListener('resize', () => {
      const { innerWidth, innerHeight } = window;
      this.renderer.setSize(innerWidth, innerHeight);
      this.camera.aspect = innerWidth / innerHeight;
      this.camera.updateProjectionMatrix();
    });
  }

  /**
   * Rotate Y
   *
   * @param deg
   */
  public rotateY(deg: number): void {
    new TWEEN.Tween(this.scene.rotation)
      .to(
        {
          y: this.scene.rotation.y + deg,
        },
        400
      )
      .easing(TWEEN.Easing.Cubic.InOut)
      .start();
  }

  /**
   * Go
   *
   * @param direction
   * @returns
   */
  public go(direction: DirectionEnum): void {
    const newIndex = this.getIndexByDirectionAndIndex(direction, this.index);
    if (newIndex === undefined || newIndex === this.index) {
      return;
    }
    this.index = newIndex;
    this.scene.remove(this.sphere);
    const loadingManager = new THREE.LoadingManager();

    // load texture
    loadingManager.onLoad = () => {};
    const textureLoader = new THREE.TextureLoader(loadingManager);

    // load default image
    let texture = textureLoader.load(
      `../../assets/bell-mountain/${SCENES[this.index].background_url}.jpg`
    );
    // configure the sphere
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    // invert the geometry to render it inside out
    geometry.scale(-1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
    });
    this.sphere = new THREE.Mesh(geometry, material);
    this.scene.add(this.sphere);
    this.camera.rotation.set(0, 0, 0);
    this.camera.position.set(0, 0, 0);
    this.controls.target.set(-0.5, 0, -0.5);
    this.controls.update();
  }

  /**
   * Get iindex by direction and index
   * 
   * @param direction 
   * @param index 
   * @returns 
   */
  private getIndexByDirectionAndIndex(
    direction: DirectionEnum,
    index: number
  ): number | undefined {
    return SCENES.find((item) => item.id === index)?.hitzones.find(
      (hitzone) => hitzone.direction === direction
    )?.goto;
  }
}
