import React from "react";
import "./MainPage.css";
import NewsList from "../../NewsList/NewsList";
import RefreshButton from "../../RefreshButton/RefreshButton";
import {connect} from "react-redux";
import {clearNews, getNewsList} from "../../../redux/slices/newsSlice";

function MainPage({ news, clearNews, getNewsList }) {

  function refreshNewsList() {
    clearNews();
    getNewsList();
  }

  React.useEffect(() => {
    getNewsList();

    const refreshInterval = setInterval(() => {
      refreshNewsList();
    }, 60000);

    return () => {
      clearInterval(refreshInterval);
      clearNews();
    };
  }, []);

  return (
    <section className="news">
      <NewsList news={news} />
      <RefreshButton onClick={refreshNewsList} content="news" isLoad={news.length}/>
    </section>
  );
}

export default connect(
  (state) => ({
    news: state.news.news,
  }),
  {getNewsList, clearNews}
)(MainPage);
