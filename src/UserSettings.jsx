import React, { useState } from "react";
import styled from "styled-components";

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5rem;
  background: #f7f7f7;
`;

const SettingsTitle = styled.h2`
  color: #007bff;
  margin-bottom: 0.5rem;
`;

const StyledLabel = styled.label`
  margin-bottom: 0.5rem;
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  width: 10rem;
  border: 0.2rem solid #ccc;
  border-radius: 4px;
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

export const UserSettings = ({ updateSettings }) => {
  const [numberOfGuesses, setNumberOfGuesses] = useState(5);
  const [numberRangeMin, setNumberRangeMin] = useState(1);
  const [numberRangeMax, setNumberRangeMax] = useState(100);

  const handleGuessChange = (event) => {
    setNumberOfGuesses(parseInt(event.target.value));
  };

  const handleRangeMinChange = (event) => {
    setNumberRangeMin(parseInt(event.target.value));
  };

  const handleRangeMaxChange = (event) => {
    setNumberRangeMax(parseInt(event.target.value));
  };

  const saveSettings = () => {
    updateSettings({
      numberOfGuesses,
      numberRangeMin,
      numberRangeMax,
    });
  };

  return (
    <>
      <SettingsContainer>
        <SettingsTitle>Settings</SettingsTitle>
        <StyledLabel htmlFor="guesses">
          Change the Number of Guesses Allowed:
        </StyledLabel>
        <StyledInput
          type="number"
          id="guesses"
          value={numberOfGuesses}
          onChange={handleGuessChange}
        />
        <StyledLabel htmlFor="rangeMin">
          Adjust the Number Range (Min):
        </StyledLabel>
        <StyledInput
          type="number"
          id="rangeMin"
          value={numberRangeMin}
          onChange={handleRangeMinChange}
        />
        <StyledLabel htmlFor="rangeMax">
          Adjust the Number Range (Max):
        </StyledLabel>
        <StyledInput
          type="number"
          id="rangeMax"
          value={numberRangeMax}
          onChange={handleRangeMaxChange}
        />
        <StyledButton onClick={saveSettings}>Save Settings</StyledButton>
      </SettingsContainer>
    </>
  );
};
