import React from "react";
import parse from "html-react-parser";
import "./Comment.css";
import { convertDate } from "../../utils/convertDate";
import CommentsList from "../CommentsList/CommentsList";
import {connect} from "react-redux";
import {getCommentsList} from "../../redux/slices/commentsSlice";

function Comment({ comment, getCommentsList }) {
  const { by, time, kids, text, id } = comment;
  const [childCommentsIsOpen, setChildCommentsIsOpen] = React.useState(false);

  const commentsButtonClass = `comment__caption comment__caption_content_comments comment__button link-hover ${
    childCommentsIsOpen
      ? "comment__button_state-comment_open"
      : "comment__button_state-comment_close"
  }`;

  const commentText = text ? parse(text) : "";

  function handleButtonCommentsClick() {
    if (!childCommentsIsOpen) {
      getCommentsList(id);
    }

    setChildCommentsIsOpen(!childCommentsIsOpen);
  }

  return (
    <>
      <p className="comment__info">
        <span className="comment__caption">{`${by || ""} ${
          convertDate(time) || ""
        }`}</span>
        {kids ? (
          <button
            type="button"
            className={commentsButtonClass}
            onClick={handleButtonCommentsClick}
          >
            {`${kids.length} ${kids.length > 1 ? "comments" : "comment"}`}
          </button>
        ) : (
          <span className="comment__caption comment__caption_content_comments">
            no comments
          </span>
        )}
      </p>
      <div className="comment__text">{commentText}</div>
      {childCommentsIsOpen && (
        <CommentsList
          parent={comment}
        />
      )}
    </>
  );
}

export default connect(
  (state) => ({
    comments: state.comments.comments
  }),
  {getCommentsList}
)(Comment);