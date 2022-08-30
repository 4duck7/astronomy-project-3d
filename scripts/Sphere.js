class Sphere extends THREE.Mesh {
    constructor(x, y, z, material) {
        super()
        this.geometry = new THREE.SphereGeometry(x, y, z);
        this.material = material;
    }
}