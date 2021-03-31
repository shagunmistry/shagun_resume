/**
 * Homepage
 */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Alldetails from "./Alldetails";
import firebase from "firebase";
import firebaseApp from "../Firebase";
import Contactsection from "./Contactsection";
import { SendEmail } from "./Main.actions";

require("firebase/firestore");
const db = firebaseApp.firestore();

const urls = require("../config/downloadUrls");

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
    };
  }

  componentWillMount() {
    let thisState = this;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        thisState.setState({
          signedIn: true,
        });
      } else {
        thisState.setState({
          signedIn: false,
        });
      }
    });
  }

  logOut = () => {
    firebase.auth().signOut();
  };

  render() {
    return (
      <div className="container">
        <a href="/login" style={{ float: "right" }}>
          login
        </a>
        <div id="header">
          <p>Shagun Mistry</p>
          <h4>A Developer with a passion to create and improve!</h4>
        </div>
        <div className="card linkedInCard">
          <img
            className="card-img-top"
            src={urls.background_pic_url}
            id="backProfilePic"
            alt="Background"
          />
          <div className="card-body">
            <div className="row">
              <div className="col-md-3" style={{ width: "auto" }}>
                <img
                  src={urls.profile_card_url}
                  id="profile_pic"
                  className="text-center"
                  alt="Shagun Mistry"
                />
              </div>
              <div className="col-md-6" style={{ width: "auto" }}>
                <h3 id="user_name">Shagun Mistry</h3>
                <h4>
                  <a href="/blogs">Blogs</a>
                </h4>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: "transparent" }}>
            <Contactsection />
          </div>
        </div>
        {this.state.signedIn ? (
          <div>
            <button className="btn btn-sm" onClick={() => this.logOut()}>
              Log out
            </button>
            <br />
            <Link className="btn btn-outline-dark" id="addButton" to="/Add">
              <i className="fas fa-plus"></i>
            </Link>
          </div>
        ) : null}
        <hr />
        <div className="card techUsedCard">
          <h5 className="text-center">What I've used before</h5>
          <div
            className="row"
            style={{
              maxWidth: "400px",
              marginRight: "auto",
              marginLeft: "auto",
              fontSize: "3rem",
              textAlign: "center",
            }}
          >
            <div className="col">
              <i className="fab fa-angular" color="#B52E31"></i>
            </div>
            <div className="col">
              <i className="fab fa-react" color="#00d8ff"></i>
            </div>
            <div className="col">
              <i className="fab fa-docker" color="#0db7ed"></i>
            </div>
            <div className="col">
              <i className="fab fa-html5" color="#e34f26"></i>
            </div>
            <div className="col">
              <i className="fab fa-sass" color="#FFC0CB"></i>
            </div>
            <div className="col">
              <i className="fab fa-node" color="#6cc24a"></i>
            </div>
            <div className="col">
              <i className="fab fa-aws" color="#ff9900"></i>
            </div>
            <div className="col">
              <i className="fab fa-python" color="#4584b6"></i>
            </div>
          </div>
        </div>
        <hr />
        <div className="card linkedInCard">
          <p style={{ marginRight: "auto", marginLeft: "auto" }}>Contact Me!</p>
          <input
            className="form-control"
            type="text"
            placeholder="Name"
            id="nameField"
          />
          <br />
          <input
            className="form-control"
            type="text"
            placeholder="Reason For Contact"
            id="reasonField"
          />
          <br />
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            id="emailField"
          />
          <br />
          <button
            type="button"
            className="btn btn-lg btn-outline-dark"
            id="emailSubmitButton"
            onClick={() => SendEmail(db, document)}
          >
            Send Email!
          </button>
          <small id="messagePlaceholder"></small>
        </div>
        <hr />

        <Alldetails signedIn={this.state.signedIn} database={db} />
        <hr />
      </div>
    );
  }
}

export default Homepage;
