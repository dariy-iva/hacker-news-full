import React from "react";
import {useHistory} from "react-router-dom";
import './BackButton.css';

export default function BackButton() {
  const history = useHistory();

  function handleBackButtonClick() {
    history.goBack();
  }

  return (
    <button
      type="button"
      className="back-button"
      onClick={handleBackButtonClick}
      aria-label="Back button"
      title="Go back"
    />
  );
}