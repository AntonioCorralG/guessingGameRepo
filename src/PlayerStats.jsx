import React from "react";
import styled from "styled-components";

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10rem;
  background: #f7f7f7;
`;

const StatsTitle = styled.h1`
  color: #007bff;
  margin-bottom: 2rem;
`;

const StatsInfo = styled.p`
  font-size: 1.5rem
  color: #666;
`;

export const PlayerStats = ({ gameStats }) => {
  const { gamesWon, sumOfGuesses, numberOfGamesPlayed } = gameStats;
  const averageGuesses =
    numberOfGamesPlayed > 0
      ? (sumOfGuesses / numberOfGamesPlayed).toFixed(2)
      : 0;

  return (
    <StatsContainer>
      <StatsTitle>Player Statistics</StatsTitle>
      <StatsInfo>Games Won: {gamesWon}</StatsInfo>
      <StatsInfo>Total Games Played: {numberOfGamesPlayed}</StatsInfo>
      <StatsInfo>Average Number of Guesses: {averageGuesses}</StatsInfo>
    </StatsContainer>
  );
};
