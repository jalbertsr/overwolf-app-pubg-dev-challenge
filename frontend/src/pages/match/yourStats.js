import React from 'react';

import './styles.css';

export default function YourStats({
  inGameData: {
    myRank,
    totalTeams,
    totalDamageDealt = 0,
    kills = 0,
    headshots = 0,
    maxKillDistance = 'no kills :(',
    matchEnd,
    matchStart,
    locationHistory,
  },
}) {
  const totalDistance = locations => {
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
  const timeSurvived = (
    (Number(matchEnd) - Number(matchStart)) /
    (1000 * 60)
  ).toFixed(2);
  return (
    <React.Fragment>
      <h2>Your recent game stats</h2>
      <ul>
        <li>{`Rank: ${myRank} out of ${totalTeams}`}</li>
        <li>{`Total damage: ${totalDamageDealt}`}</li>
        <li>{`Kills: ${kills}`}</li>
        <li>{`Headshots: ${headshots}`}</li>
        <li>
          {`Max kill distance: ${Number(maxKillDistance / 100).toFixed(
            2,
          )} meters`}
        </li>
        <li>{`Time survived: ${timeSurvived} minutes`}</li>
        <li>
          {`Total distance travelled: ${totalDistance(locationHistory)} meters`}
        </li>
      </ul>
    </React.Fragment>
  );
}
