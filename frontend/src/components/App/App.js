import React from "react";
import {connect} from "react-redux";
import {getNewsList, clearNews} from "../../redux/slices/newsSlice";

import './App.css';
import Header from "../Header/Header";
import MainPage from "../pages/MainPage/MainPage";

function App() {


  return (
    <>
      <Header/>
      <MainPage/>
    </>
  );
}

export default connect(
  (state) => ({
    news: state.news.news,
  }),
  {getNewsList, clearNews}
)(App);
