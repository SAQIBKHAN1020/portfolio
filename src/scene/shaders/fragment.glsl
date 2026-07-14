uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform float uScroll;
uniform float uOpacity;

varying vec3 vNormal;
varying vec3 vPosition;
varying float vDisplace;

void main() {
  // Base gradient driven by displacement + position
  float mixA = smoothstep(-0.4, 0.4, vDisplace + sin(uTime * 0.3) * 0.15);
  vec3 grad = mix(uColorA, uColorB, mixA);

  // Third color woven in by vertical position for depth
  float mixB = smoothstep(-1.0, 1.0, vPosition.y);
  grad = mix(grad, uColorC, mixB * 0.6);

  // Fresnel rim — tinted gold, NOT white, so the surface never blows out
  vec3 viewDir = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - max(dot(viewDir, normalize(vNormal)), 0.0), 3.0);

  vec3 color = grad + fresnel * 0.3 * uColorB;

  // Keep it in the soft range — the bloom pass adds the remaining glow
  color *= 0.8;

  gl_FragColor = vec4(color, uOpacity);
}
