import React from "react";
import {Switch, Route} from "react-router-dom";
import './App.css';
import Header from "../Header/Header";
import MainPage from "../pages/MainPage/MainPage";
import ArticlePage from "../pages/ArticlePage/ArticlePage";
import {pathConfig} from "../../utils/pathConfig";

export default function App() {

  return (
    <>
      <Header/>
      <Switch>
        <Route exact path={pathConfig.main}>
          <MainPage/>
        </Route>
        <Route path={pathConfig.article}>
          <ArticlePage/>
        </Route>
      </Switch>
    </>
  );
}
