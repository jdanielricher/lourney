import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
  constructor(props) {
    super();
  }
  render() {
    const { getNextPage, getPrevPage, getDisable } = this.props;
    console.log(this.props);
    return (
      <footer className="footer">
        <div className="container" />
        <div className="footerBtnContainer">
          <button className="Btn" disabled={getDisable} onClick={getPrevPage}>
            Prev
          </button>
        </div>
        <div className="footerBtnContainer">
          <button className="Btn" onClick={getNextPage}>
            Next
          </button>
        </div>
      </footer>
    );
  }
}

export default Footer;
