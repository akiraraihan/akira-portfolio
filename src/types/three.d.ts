declare module 'three' {
  export interface IUniform<T = any> {
    value: T;
  }
  
  export class Material {
    uniforms?: Record<string, IUniform>;
    vertexShader?: string;
    fragmentShader?: string;
    defines?: Record<string, any>;
  }
  
  export class ShaderMaterial extends Material {
    constructor(parameters?: any);
    uniforms: Record<string, IUniform>;
    vertexShader: string;
    fragmentShader: string;
    defines: Record<string, any>;
  }
  
  export class BufferGeometry {
    constructor();
  }
  
  export class Mesh<TGeometry = BufferGeometry, TMaterial = Material> {
    constructor(geometry?: TGeometry, material?: TMaterial);
    material: TMaterial;
  }
  
  export class DirectionalLight {
    shadow: any;
  }
  
  export class Camera {
    far: number;
    left: number;
    right: number;
    top: number;
    bottom: number;
  }
  
  export class Color {
    constructor(color?: string | number);
  }
  
  export class Texture {}
  
  export interface MaterialParameters {}
  export interface MeshPhysicalMaterialParameters {}
  export interface ShaderLibShader {
    uniforms: Record<string, IUniform>;
    vertexShader: string;
    fragmentShader: string;
  }
}

declare module 'three/src/math/MathUtils.js' {
  export function degToRad(degrees: number): number;
}
