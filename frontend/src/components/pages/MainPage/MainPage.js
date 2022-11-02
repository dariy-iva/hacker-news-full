import React from "react";
import "./MainPage.css";
import NewsList from "../../NewsList/NewsList";
import RefreshButton from "../../Buttons/RefreshButton/RefreshButton";
import {connect} from "react-redux";
import {clearNews, getNewsList} from "../../../redux/slices/newsSlice";

function MainPage({news, clearNews, getNewsList}) {
  const [newsIsLoad, setNewsIsLoad] = React.useState(false)

  function refreshNewsList() {
    setNewsIsLoad(false);
    clearNews();
    getNewsList()
      .then(() => setNewsIsLoad(true));
  }

  React.useEffect(() => {
    getNewsList()
      .then(() => setNewsIsLoad(true));

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
      <NewsList news={news}/>
      <RefreshButton
        onClick={refreshNewsList}
        content="news"
        isLoad={newsIsLoad}/>
    </section>
  );
}

export default connect(
  (state) => ({
    news: state.news.news,
  }),
  {getNewsList, clearNews}
)(MainPage);
