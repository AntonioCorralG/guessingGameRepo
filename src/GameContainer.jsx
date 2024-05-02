import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`;
const GameTitle = styled.h1`
  color: #007bff;
  margin-bottom: 4rem;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f7f7f7;
  padding: 20px;
  border-radius: 8px;
`;

const StyledInput = styled.input`
  margin: 1rem 0;
  padding: 0.5rem;
  width: 10rem;
  border: 0.25rem solid #ccc;
  border-radius: 0.25rem;
`;

const StyledButton = styled.button`
  padding: 1rem 2rem;
  background-color: #007bff;
  margin: 0.5rem;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const GameStatus = styled.h2`
  color: #d9534f;
  margin-top: 2rem;
`;

const StyledLink = styled(Link)`
  margin: 1rem;
  text-decoration: none;
  color: #007bff;
  &:hover {
    text-decoration: underline;
  }
  &:last-child {
    margin-right: 0;
  }
`;

const LinkContainer = styled.div`
  margin-top: 20px;
  margin: .5rem
  font-size: 16px;
`;

let randomNumberGenerator = (min = 1, max = 100) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const GuessGameContainer = ({
  numberOfGuessesAllowed = 5,
  numberRangeMin = 1,
  numberRangeMax = 100,
  updateGameStats,
  gameStats,
}) => {
  const [randomNumber, setRandomNumber] = useState(() =>
    randomNumberGenerator(numberRangeMin, numberRangeMax)
  );
  const [guessesLeft, setGuessesLeft] = useState(numberOfGuessesAllowed);
  const [userInput, setUserInput] = useState("");
  const [numberOfGamesPlayed, setNumberOfGamesPlayed] = useState(0);
  const [gameStatus, setGameStatus] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const userNumber = parseInt(userInput);
    if (randomNumber === userNumber) {
      resetGame();
      setGameStatus(`Congrats you won! The random number was ${randomNumber}`);
      updateGameStats({
        gamesWon: gameStats.gamesWon + 1,
        sumOfGuesses:
          gameStats.sumOfGuesses + (numberOfGuessesAllowed - guessesLeft + 1),
        numberOfGamesPlayed: gameStats.numberOfGamesPlayed + 1,
      });
    } else {
      setGuessFeedback(userNumber);
      allowedGuessesCheck(randomNumber);
    }
  }

  function resetGame() {
    setGuessesLeft(numberOfGuessesAllowed);
    setRandomNumber(randomNumberGenerator(numberRangeMin, numberRangeMax));
    setUserInput("");
    setNumberOfGamesPlayed(numberOfGamesPlayed + 1);
  }

  function allowedGuessesCheck(guessesTaken) {
    if (guessesLeft - 1 <= 0) {
      updateGameStats({
        gamesLost: gameStats.gamesLost + 1,
        sumOfGuesses:
          gameStats.sumOfGuesses + (numberOfGuessesAllowed - guessesLeft + 1),
        numberOfGamesPlayed: gameStats.numberOfGamesPlayed + 1,
      });

      setGameStatus(`You lost! The correct number was: ${randomNumber}`);

      resetGame();
    } else {
      setGuessesLeft(guessesLeft - 1);
    }
  }

  function setGuessFeedback(userNumber) {
    if (randomNumber < userNumber) {
      setGameStatus("Your guess is too high");
    } else {
      setGameStatus("Your guess is too low");
    }
  }

  return (
    <>
      <Container>
        <StyledForm onSubmit={handleSubmit}>
          <GameTitle>Guessing Game</GameTitle>
          <label>
            User Guess:
            <StyledInput
              type="number"
              name="userGuessInput"
              placeholder="Enter a number"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </label>
          <StyledButton type="submit">Enter Guess</StyledButton>
        </StyledForm>
        <GameStatus>{gameStatus}</GameStatus>
        <LinkContainer>
          <div>
            <StyledLink to="/settings">Settings</StyledLink>
          </div>
          <div>
            <StyledLink to="/stats">Stats</StyledLink>
          </div>
        </LinkContainer>
      </Container>
    </>
  );
};
