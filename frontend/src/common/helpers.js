export const totalDistance = locations => {
  let x = 0,
    y = 0,
    z = 0;
  for (let i = 0; i < locations.length - 1; i++) {
    x += Math.abs(locations[i]['x'] - locations[i + 1]['x']);
    y += Math.abs(locations[i]['y'] - locations[i + 1]['y']);
    const tempZ = Math.abs(locations[i]['z'] - locations[i + 1]['z']);
    if (tempZ < 4000) z += tempZ;
  }
  return x + y + z;
};

export const calculateZSpeed = locations => {
  const speeds = [];
  for (let i = 0; i < locations.length - 1; i++) {
    const distance = Math.abs(locations[i]['y'] - locations[i + 1]['y']);
    const time = Math.abs(
      locations[i + 1]['timeStamp'] - locations[i]['timeStamp'],
    );
    speeds.push(distance / time);
  }
  return speeds.reduce((acc, speed) => (acc += speed), 0) / locations.length;
};

export const getCurrentTime = () => Math.round(new Date() / 1000);
