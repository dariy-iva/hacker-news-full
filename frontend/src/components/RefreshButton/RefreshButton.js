import React from "react";
import "./RefreshButton.css";

export default function RefreshButton({content, onClick, isLoad}) {
  const buttonClass = `refresh-button link-hover ${!isLoad ? "refresh-button_loading" : ""}`
  return (
    <button
      type="button"
      className={buttonClass}
      onClick={onClick}
      title={`Refresh ${content}`}
    />
  );
}