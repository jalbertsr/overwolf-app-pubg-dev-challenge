import React from 'react';

import './styles.css';

export default function YourStats({
  inGameData: {
    myRank,
    totalTeams,
    totalDamageDealt = 0,
    kills = 0,
    headshots = 0,
    maxKillDistance = 0,
    matchEnd,
    matchStart,
  },
}) {
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
        <li>Total distance travelled: TODO meters</li>
      </ul>
    </React.Fragment>
  );
}
