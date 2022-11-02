import React from "react";
import "./ArticlePage.css";
import Article from "../../Article/Article";
import CommentsList from "../../CommentsList/CommentsList";
import BackButton from "../../Buttons/BackButton/BackButton";
import RefreshButton from "../../Buttons/RefreshButton/RefreshButton";
import {connect} from "react-redux";
import {clearCurrentNew} from "../../../redux/slices/newsSlice";
import {getCommentsList, clearComments} from "../../../redux/slices/commentsSlice";

function ArticlePage({currentNew, getCommentsList, clearComments, clearCurrentNew}) {
  const [commentsIsLoad, setCommentsIsLoad] = React.useState(false);

  function refreshCommentsList() {
    setCommentsIsLoad(false);
    clearComments();
    getCommentsList(currentNew.id)
      .then(() => setCommentsIsLoad(true));
  }

  React.useEffect(() => {
    getCommentsList(currentNew.id)
      .then(() => setCommentsIsLoad(true));

    const refreshInterval = setInterval(() => {
      refreshCommentsList();
    }, 60000);
    return () => {
      clearInterval(refreshInterval);
      clearComments();
      clearCurrentNew();
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
      <BackButton/>
      <RefreshButton
        onClick={refreshCommentsList}
        content="comments"
        isLoad={commentsIsLoad}
      />
    </section>
  );
}

export default connect(
  (state) => ({
    currentNew: state.news.currentNew,
  }),
  {getCommentsList, clearComments, clearCurrentNew}
)(ArticlePage);
