attribute float vertexType;

uniform float counter;

const float counterEnd = 65536.0;

const float posBegin = 0.0;
const float posEnd = 16.0;

void main() {
  vec3 newPosition = position;

  // Y-Wrap
  float counterBegin = (position.y - posBegin) / posEnd * counterEnd;
  float counterValue = counterBegin + counter;

  if (counterValue > counterEnd) {
    counterValue -= counterEnd;
  }

  newPosition.y = 4.0 + -counterValue / counterEnd * posEnd + posBegin;

  // Drop length
  if (vertexType == 0.0) {
    newPosition.y += 0.15;
  }

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
