import React from "react";
import parse from "html-react-parser";
import {Link} from "react-router-dom";
import "./Article.css";
import {convertDate} from "../../utils/convertDate";

function Article({article, isMainPage}) {
  const {id, title, text, url, score, by, time, kids} = article;

  const articleText = text
    ? parse(text)
    : "Follow the link in the title to read the full text";

  const commentsNum = kids ? kids.length : 0;
  const commentsText = commentsNum === 1 ? "comment" : "comments";
  const commentsElementText = (commentsNum || "no") + " " + commentsText;
  // const commentsButtonClass = `article__caption article__caption_content_comments article__button link-hover ${
  //   commentsIsOpen
  //     ? "article__button_status-comment_open"
  //     : "article__button_status-comment_close"
  // }`;

  function handleArticleClick() {

  }

  return (
    <article className="article">
      {isMainPage ? (
        <Link
          className="article__link link-hover"
          to={`/new/${id}`}
          onClick={handleArticleClick}
        >
          {title || ""}
        </Link>
      ) : (
        <a className="article__link link-hover" href={url} target="blank">
          {title || ""}
        </a>
      )}

      {!isMainPage && <div className="article__text">{articleText}</div>}
      <p className="article__info">
        {isMainPage && (
          <span className="article__caption">{`${score || 0} point${
            score > 1 ? "s" : ""
          }`}</span>
        )}
        <span className="article__caption">{`by ${by || ""} ${
          convertDate(time) || ""
        }`}</span>
        {isMainPage || commentsNum === 0 ? (
          <span className="article__caption article__caption_content_comments">
            {commentsElementText}
          </span>
        ) : (
          <button
            type="button"
            // className={commentsButtonClass}
            // onClick={onCommentsButtonClick}
          >
            {/*{commentsElementText}*/}
          </button>
        )}
      </p>
    </article>
  );
}

export default Article;