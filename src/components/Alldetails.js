import React, { Component } from "react";
import Education from "./newupdate/Education";
import Experience from "./newupdate/Experience";
import Showcase from "./newupdate/Showcase";

class Alldetails extends Component {
  render() {
    return (
      <div id="detailsSection">
        <Experience {...this.props} />
        <br />
        <Education {...this.props} />
        <br />
        <Showcase {...this.props} />
      </div>
    );
  }
}

export default Alldetails;
