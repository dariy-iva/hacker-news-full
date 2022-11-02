import React from "react";
import "./ArticlePage.css";
import Article from "../../Article/Article";
import CommentsList from "../../CommentsList/CommentsList";
import RefreshButton from "../../RefreshButton/RefreshButton";
import {connect} from "react-redux";
import {setCurrentNew} from "../../../redux/slices/newsSlice";
import {getCommentsList, clearComments} from "../../../redux/slices/commentsSlice";

function ArticlePage({currentNew, comments, getCommentsList, clearComments}) {

  function refreshCommentsList() {
    clearComments();
    getCommentsList(currentNew.id);
  }

  React.useEffect(() => {
    getCommentsList(currentNew.id);

    const refreshInterval = setInterval(() => {
      refreshCommentsList();
    }, 60000);
    return () => {
      clearInterval(refreshInterval);
      clearComments();
    };
  }, []);


  return (
    <section className="article-section">
      <Article
        article={currentNew}
        isMainPage={false}
      />
        <CommentsList
          parent={currentNew}
          onChildCommentsClick={''}
        />
      <RefreshButton
        onClick={refreshCommentsList}
        content="comments"
        isLoad={comments.length}
      />
    </section>
  );
}

export default connect(
  (state) => ({
    currentNew: state.news.currentNew,
    comments: state.comments.comments
  }),
  {setCurrentNew, getCommentsList, clearComments}
)(ArticlePage);