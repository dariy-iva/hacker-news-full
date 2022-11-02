import React from "react";
import "./NewsList.css";
import Article from "../Article/Article";

export default function NewsList({news}) {
  return (
    <ol className="news__list">
      {news.map((item) => {
        return (
          <li
            key={item.id || ""}
            className="news__item">
            <Article
              article={item}
              isMainPage={true}
            />
          </li>
        );
      })}
    </ol>
  );
}
