import {connect} from "react-redux";

import './App.css';
import Header from "../Header/Header";

function App() {
  return (
    <>
      <Header/>
    </>
  );
}

export default connect(
  (state) => ({}),
  {}
)(App);
