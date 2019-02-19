/**
 * Homepage
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Alldetails from './Alldetails';
import firebase from 'firebase';

const firebaseApp = require('../Firebase');

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
            }else{
                thisState.setState({
                    signedIn: false,
                });
            }
        });
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
                                        Shagun Mistry</Link>
                                </h3>
                            </div>
                        </div>
                        <hr />
                    </div>
                </div>
                <Alldetails signedIn={this.state.signedIn} firebaseApp={firebaseApp} firebaseImport={firebase} />
            </div>
        );
    }
}

export default Homepage;