import React from "react";
import parse from "html-react-parser";
import "./Comment.css";
import {convertDate} from "../../utils/convertDate";
import CommentsList from "../CommentsList/CommentsList";
import {connect} from "react-redux";
import {getCommentsList} from "../../redux/slices/commentsSlice";

function Comment({comment, getCommentsList}) {
  const {by, time, kids, text, id} = comment;
  const [childCommentsIsOpen, setChildCommentsIsOpen] = React.useState(false);
  const [loadCommentIsPending, setLoadCommentIsPending] = React.useState(false);

  const commentsButtonClass = `comment__caption comment__caption_content_comments comment__button link-hover 
  ${childCommentsIsOpen
    ? "comment__button_active"
    : ""}`;

  const commentText = text ? parse(text) : "";

  function handleButtonCommentsClick() {
    if (!childCommentsIsOpen) {
      setLoadCommentIsPending(true);
      getCommentsList(id)
        .then(() => {
          setChildCommentsIsOpen(true);
          setLoadCommentIsPending(false);
        });
    } else {
      setChildCommentsIsOpen(false);
    }
  }

  return (
    <>
      <div className="comment__info">
        <span className="comment__caption">
          {`${by || ""} ${convertDate(time) || ""}`}
        </span>
        {kids ? (
          <button
            type="button"
            disabled={loadCommentIsPending}
            className={commentsButtonClass}
            onClick={handleButtonCommentsClick}
          >
            {`${kids.length} ${kids.length > 1 ? "comments" : "comment"}`}
            {loadCommentIsPending &&
              <span className="comment__preloader">...</span>
            }
          </button>
        ) : (
          <span className="comment__caption comment__caption_content_comments">
            no comments
          </span>
        )}
      </div>
      <p className="comment__text">
        {commentText}
      </p>
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