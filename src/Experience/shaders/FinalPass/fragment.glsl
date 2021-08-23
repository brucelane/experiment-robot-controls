#define M_PI 3.1415926535897932384626433832795
#define M_TAU 6.283185307179586

uniform sampler2D tDiffuse;
uniform float uNoiseMultiplier;
uniform float uNoiseOffset;
uniform float uRGBShiftMultiplier;
uniform float uRGBShiftOffset;
uniform float uTime;

varying vec2 vUv;

float random2d(vec2 co)
{
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}
vec3 smoke(vec2 pos) {
    vec2 p = 0.50*pos;
    
    float w = sin(uTime * 0.001+6.5*sqrt(dot(p,p))*cos(p.x));
    float x = cos(atan(p.y,p.x) + 1.8*w);
    return vec3(x,x,x);
}
vec3 fernat( vec2 pos) {

    float t = sin(uTime * 0.00001)+1.0 * 12.0,
          l = length(pos+sin(uTime*0.0002)),
          r = l * exp2( t * .1),
          f = sin(r * r) * sin(t),
          g = pos.x / l;

    return vec3( .1 / abs(f - g) );
}
void main()
{
    float distanceToCenter = length(vUv - 0.5);

    // Noise
    vec2 uv = vUv;
    float noiseDistance = max(0.0, distanceToCenter + uNoiseOffset);
    uv.x += (random2d(vUv) - 0.5) * noiseDistance * uNoiseMultiplier;
    uv.y += (random2d(vUv + 0.5) - 0.5) * noiseDistance * uNoiseMultiplier;

    // RGB shift
    float rgbShiftDistance = max(0.0, distanceToCenter + uRGBShiftOffset);

    float redAngle = 0.0;
    vec2 uvRed = uv + vec2(cos(redAngle), sin(redAngle)) * rgbShiftDistance * uRGBShiftMultiplier;
    float red = texture2D(tDiffuse, uvRed).r;

    float greenAngle = M_TAU / 3.0;
    vec2 uvGreen = uv + vec2(cos(greenAngle), sin(greenAngle)) * rgbShiftDistance * uRGBShiftMultiplier;
    float green = texture2D(tDiffuse, uvGreen).g;

    float blueAngle = M_TAU / 3.0 * 2.0;
    vec2 uvBlue = uv + vec2(cos(blueAngle), sin(blueAngle)) * rgbShiftDistance * uRGBShiftMultiplier;
    float blue = texture2D(tDiffuse, uvBlue).b;
    
    vec3 color = vec3(red, green, blue);
    if (sin(uTime)>0.995) color += fernat(uv)*0.01 - smoke(uv)*0.1;
    gl_FragColor = vec4(color, 1.0);
}