/**
 * Whatever detail you put into the detail section, make sure it's all separated by a character that you'll split
 * in each component, dynamically.
 */
import React, { Component } from "react";
import firebase from "firebase";
import firebaseApp from "../Firebase";
import { AddInfoToDb } from "./Main.actions";

require("firebase/firestore");

const db = firebaseApp.firestore();

class GeneralEditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
    };
  }

  componentWillMount() {
    let referThis = this;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        referThis.setState({
          signedIn: true,
        });
      } else {
        window.location.replace("/");
      }
    });
  }

  render() {
    return (
      <div className="container">
        <form className="card" style={{ marginTop: "50px" }}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="jobTitleField"
              placeholder="Title"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="companyNameField"
              placeholder="Subtitle (Company)"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="respField"
              placeholder="Responsibilities/Work"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="linkField"
              placeholder="Logo Links"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="monthStartedField"
              placeholder="Month Started"
              required
            />
            <input
              type="number"
              className="form-control"
              id="yearStartedField"
              placeholder="Year Started"
              required
            />
          </div>
          <br />
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="monthEndedField"
              placeholder="Month Ended"
            />
            <input
              type="number"
              className="form-control"
              id="yearEndedField"
              placeholder="Year Ended"
            />
          </div>
          <br />
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="showcaseCheckBox"
            />
            <label className="form-check-label">Showcase</label>
          </div>
          <br />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => AddInfoToDb(db, this.state.signedIn, document)}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default GeneralEditCard;
