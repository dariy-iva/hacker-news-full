import React from "react";
import parse from "html-react-parser";
import {Link} from "react-router-dom";
import "./Article.css";
import {convertDate} from "../../utils/convertDate";
import {pathConfig} from "../../utils/pathConfig";
import {connect} from "react-redux";
import {setCurrentNew} from "../../redux/slices/newsSlice";

function Article({article, isMainPage, setCurrentNew}) {
  const {id, title, text, url, score, by, time, kids} = article;

  const articleText = text
    ? parse(text)
    : "Follow the link in the title to read the full text";

  const commentsNum = kids ? kids.length : 0;
  const commentsText = commentsNum === 1 ? "comment" : "comments";
  const commentsElementText = (commentsNum || "no") + " " + commentsText;

  function handleArticleClick() {
    setCurrentNew(article);
  }

  return (
    <article className="article">
      {isMainPage ? (
        <Link
          className="article__link link-hover"
          to={`${pathConfig.article}/${id}`}
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
          <span className="article__caption">
            {`${score || 0} point${score > 1 ? "s" : ""}`}
          </span>
        )}
        <span className="article__caption">
          {`by ${by || ""} ${convertDate(time) || ""}`}
        </span>
        <span className="article__caption article__caption_content_comments">
          {commentsElementText}
        </span>
      </p>
    </article>
  );
}

export default connect(
  (state) => ({
    currentNew: state.news.currentNew
  }),
  {setCurrentNew}
)(Article);