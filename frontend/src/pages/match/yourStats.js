import React from 'react';

import './styles.css';

export default function YourStats({
  inGameData: {
    myRank,
    totalTeams,
    totalDamage,
    kills,
    headshots,
    maxKillDistance,
  },
}) {
  return (
    <React.Fragment>
      <h2>Your last game stats</h2>
      <ul>
        <li>{`Rank: ${myRank} out of ${totalTeams}`}</li>
        <li>{`Total damage: ${totalDamage}`}</li>
        <li>{`Kills: ${kills}`}</li>
        <li>{`Headshots: ${headshots}`}</li>
        <li>{`Max kill distance: ${maxKillDistance}`}</li>
        <li>Total distance travelled: </li>
      </ul>
    </React.Fragment>
  );
}
