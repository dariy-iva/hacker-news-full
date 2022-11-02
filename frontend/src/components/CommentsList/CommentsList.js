import React from "react";
import "./CommentsList.css";
import Comment from "../Comment/Comment";
import {connect} from "react-redux";
import {clearCommentById} from "../../redux/slices/commentsSlice";


function CommentsList({parent, comments, clearCommentById}) {
  const [commentsList, setCommentsList] = React.useState([]);

  React.useEffect(() => {
    const newCommentsList = [];

    comments.forEach(comment => {
      if (parent.kids.includes(comment.id)) {
        newCommentsList.push(comment);
      }
    });

    setCommentsList(newCommentsList);

  }, [comments]);

  React.useEffect(() => {
    return () => {
      if (parent.kids) {
        parent.kids.forEach(comment => {
          clearCommentById(comment);
        })
      }
    }
  }, []);

  return (
    <ul className="comments">
      {commentsList.map((item) => {
        return (
          <li key={item.id}>
            <Comment comment={item}/>
          </li>
        );
      })}
    </ul>
  );
}

export default connect(
  (state) => ({
    comments: state.comments.comments
  }),
  {clearCommentById}
)(CommentsList);