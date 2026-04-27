import fs from 'fs';
let content = fs.readFileSync('src/components/3d/HeroScene.tsx', 'utf-8');


content = content.replace(
  /new THREE\.Vector3\(0\.85, 2\.05, 7\.8\),/,
  'new THREE.Vector3(0.85, 0.45, 7.8),'
).replace(
  /new THREE\.Vector3\(4\.15, 2\.18, 5\.8\),/,
  'new THREE.Vector3(4.15, 0.45, 5.8),'
).replace(
  /new THREE\.Vector3\(1\.85, 3\.05, -2\.9\),/,
  'new THREE.Vector3(1.85, 0.45, -2.9),'
).replace(
  /new THREE\.Vector3\(3\.95, 2\.42, -8\.9\)/,
  'new THREE.Vector3(3.95, 0.45, -8.9)'
);


content = content.replace(
  /new THREE\.Vector3\(2\.35, 0\.55, 0\.9\),/,
  'new THREE.Vector3(2.35, 1.25, 0.9),'
).replace(
  /new THREE\.Vector3\(4\.75, 0\.85, 0\.75\),/,
  'new THREE.Vector3(4.75, 1.45, 0.75),'
).replace(
  /new THREE\.Vector3\(0\.55, 0\.3, -9\.1\),/,
  'new THREE.Vector3(0.55, 1.25, -9.1),'
).replace(
  /new THREE\.Vector3\(5\.15, 1, -15\.1\)/,
  'new THREE.Vector3(5.15, 1.25, -15.1)'
);

fs.writeFileSync('src/components/3d/HeroScene.tsx', content);
