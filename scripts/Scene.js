// @ts-nocheck
class Scene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        document.querySelector('#canvas').append(this.renderer.domElement);

        this.camera.position.set(100, 100, 100)
        this.camera.lookAt(this.scene.position)

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.minDistance = 60

        this.axes = new THREE.AxesHelper(100)
        this.scene.add(this.axes)

        this.earth, this.clouds

        // this.loader = new THREE.TextureLoader();
        // this.loader.load('https://images.pexels.com/photos/1257860/pexels-photo-1257860.jpeg', (texture) => {
        //     this.scene.background = texture
        // });

        this.materials = {
            earth: new THREE.MeshPhongMaterial({ color: 0xf2f2f2, side: THREE.DoubleSide, map: new THREE.TextureLoader().load("assets/gfx/textures/earth.jpg") }),
            clouds: new THREE.MeshPhongMaterial({ color: 0xf2f2f2, transparent: true, opacity: 1, side: THREE.DoubleSide, map: new THREE.TextureLoader().load("assets/gfx/textures/clouds.png") }),
        }

        this.light = new THREE.PointLight(0xffffff, 3, 750);
        this.light.position.set(255, 255, 255)
        this.scene.add(this.light)

        this.render();
        this.renderSceneObjects();
        window.addEventListener('resize', this.resize);

    }

    render = () => {
        this.controls.update();
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);

        if (this.earth) this.earth.rotation.y += 0.0001;
        if (this.clouds) this.clouds.rotation.y -= 0.0001;

        // console.log("render going")
    }

    resize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    renderSceneObjects() {

        this.earth = new Sphere(48.5, 48.5, 48.5, this.materials.earth)
        this.clouds = new Sphere(50, 50, 50, this.materials.clouds)

        this.earth.position.set(0, 0, 0)
        this.clouds.position.set(0, 0, 0)

        this.scene.add(this.earth, this.clouds)

    }
}