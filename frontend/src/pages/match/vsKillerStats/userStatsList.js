import React from 'react';

import './styles.css';

export default function UserStatsList({
  data: {
    wins,
    roundsPlayed,
    top10s,
    kills,
    losses,
    roundMostKills,
    headshotKills,
    damageDealt,
    heals,
    longestTimeSurvived,
  },
}) {
  return (
    <div style={{ display: 'inline-block' }}>
      <ul>
        <li>{`Wins: ${wins}`}</li>
        <li>{`Ratio wins/game: ${(wins / roundsPlayed).toFixed(2) || 0}`}</li>
        <li>{`Top 10s: ${top10s}`}</li>
        <li>{`Kills: ${kills}`}</li>
        <li>{`Ratio kills/death: ${(kills / losses).toFixed(2) || 0}`}</li>
        <li>{`Most kills in a single match: ${roundMostKills}`}</li>
        <li>{`Headshots: ${headshotKills}`}</li>
        <li>{`Damage dealt: ${damageDealt}`}</li>
        <li>{`Heals: ${heals}`}</li>
        <li>
          {`Longest time survived: ${(longestTimeSurvived / 60).toFixed(
            2,
          )} minutes`}
        </li>
      </ul>
    </div>
  );
}
