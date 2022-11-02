import React from "react";
import "./RefreshButton.css";

export default function RefreshButton({content, onClick, isLoad}) {
  const buttonClass = `refresh-button ${!isLoad ? "refresh-button_loading" : ""}`
  return (
    <button
      type="button"
      disabled={!isLoad}
      className={buttonClass}
      onClick={onClick}
      title={`Refresh ${content}`}
      aria-label="Refresh button"
    />
  );
}