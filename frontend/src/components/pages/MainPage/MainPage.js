import React from "react";
import "./MainPage.css";
import NewsList from "../../NewsList/NewsList";
import {connect} from "react-redux";
import {clearNews, getNewsList} from "../../../redux/slices/newsSlice";

function MainPage({ news, clearNews, getNewsList }) {

  function refreshNews() {
    clearNews();
    getNewsList();
  }

  React.useEffect(() => {
    getNewsList();

    const refreshInterval = setInterval(() => {
      refreshNews();
    }, 60000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);


  return (
    <section className="news">
      <NewsList news={news} />
    </section>
  );
}

export default connect(
  (state) => ({
    news: state.news.news,
  }),
  {getNewsList, clearNews}
)(MainPage);
