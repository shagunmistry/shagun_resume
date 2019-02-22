/**
 * Homepage
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Alldetails from './Alldetails';
import firebase from 'firebase';
import firebaseApp from '../Firebase';

require('firebase/firestore');
const db = firebaseApp.firestore();

const urls = require('../config/downloadUrls');

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

    sendEmail = () => {
        const emailField = document.getElementById('emailField').value;
        const reasonField = document.getElementById('reasonField').value;
        const nameField = document.getElementById('nameField').value;

        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        if (emailField !== "") {
            db.collection('emails').doc(text).set({
                email: emailField,
                name: nameField,
                reason: reasonField,
            }).then(() => {
                document.getElementById('emailSubmitButton').style.color = 'green';
                document.getElementById('emailField').innerText = "";
                document.getElementById('reasonField').innerText = "";
                document.getElementById('nameField').innerText = "";
            }).catch((err) => {
                window.alert(err.message);
            });
        }
    }

    render() {
        return (
            <div className='container'>
                <div id="header">
                    <p>Shagun Mistry</p>
                    <h4>A Developer with a passion to create and improve!</h4>
                </div>
                <div className="card linkedInCard">
                    <img className="card-img-top" src={urls.background_pic_url} id="backProfilePic" alt="Background" />
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-3" style={{ width: 'auto' }}>
                                <img src={urls.profile_card_url} id="profile_pic" className="text-center" alt="Shagun Mistry" />
                            </div>
                            <div className="col-md-6" style={{ width: 'auto' }}>
                                <h3 id="user_name">
                                    <Link to='/login'>
                                        Shagun Mistry
                                    </Link>
                                </h3>
                            </div>
                        </div>
                        <hr />
                    </div>
                </div>
                <br />
                {
                    this.state.signedIn ?
                        <Link className="btn btn-outline-dark" id="addButton" to="/Add">
                            <i className='fas fa-plus'></i>
                        </Link>
                        : null
                }
                <hr />
                <div className="card linkedInCard">
                    <p style={{ marginRight: 'auto', marginLeft: 'auto' }}>Contact Me!</p>
                    <input className="form-control" type="text" placeholder="Name" id="nameField" />
                    <br />
                    <input className="form-control" type="text" placeholder="Reason For Contact" id="reasonField" />
                    <br /><input className="form-control" type="email" placeholder="Email" id="emailField" />
                    <br /><button type="button" className="btn btn-lg btn-outline-dark" id="emailSubmitButton"
                        onClick={() => this.sendEmail()}
                    >Send Email Info</button>
                </div>
                <hr />
                <Alldetails signedIn={this.state.signedIn} />
            </div>
        );
    }
}

export default Homepage;