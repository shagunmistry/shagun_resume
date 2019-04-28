import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseApp from '../Firebase';

require('firebase/firestore');

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
                window.location.replace('/');
            }
        });
    }

    addInfoToDb = () => {
        // Get all the fields
        const linksField = document.getElementById('linkField').value;
        const monthEnded = document.getElementById('monthEndedField').value;
        const monthStarted = document.getElementById('monthStartedField').value;
        const resp = document.getElementById('respField').value;
        const showcaseCheckBox = document.getElementById('showcaseCheckBox').checked;
        const subtitle = document.getElementById('companyNameField').value;
        const title = document.getElementById('jobTitleField').value;
        const yearEnded = document.getElementById('yearEndedField').value;
        const yearStarted = document.getElementById('yearStartedField').value;
        if (this.state.signedIn) {
            // If the yearEnd and MonthEnd field are emtpy, it is their current position
            let typeDecider = showcaseCheckBox ? 'Showcase' : 'Experience';
            db.collection(typeDecider).doc(subtitle).set({
                logoLinks: linksField,
                monthEnded: monthEnded,
                monthStarted: monthStarted, 
                responsibilities: resp, 
                subtitle: subtitle, 
                title: title,
                yearEnded: yearEnded,
                yearStarted: yearStarted, 
            }).then(() => {
                console.log('Successfully added data');
            })
            .catch((err) => {
                window.alert(err);
            });
        }
    }

    render() {
        return (
            <div className="container">
                <form className="card" style={{ marginTop: '50px' }} >
                    <div className="form-group" >
                        <input type="text" className="form-control" id="jobTitleField" placeholder="Title" required />
                    </div>
                    <div className="form-group" >
                        <input type="text" className="form-control" id="companyNameField" placeholder="Subtitle (Company)" required />
                    </div>
                    <div className="form-group" >
                        <input type="text" className="form-control" id="respField" placeholder="Responsibilities/Work" required />
                    </div>
                    <div className="form-group" >
                        <input type="text" className="form-control" id="linkField" placeholder="Logo Links" required />
                    </div>
                    <div className="input-group" >
                        <input type="text" className="form-control" id="monthStartedField" placeholder="Month Started" required />
                        <input type="number" className="form-control" id="yearStartedField" placeholder="Year Started" required />
                    </div>
                    <br />
                    <div className="input-group" >
                        <input type="text" className="form-control" id="monthEndedField" placeholder="Month Ended" />
                        <input type="number" className="form-control" id="yearEndedField" placeholder="Year Ended" />
                    </div>
                    <br />
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="showcaseCheckBox" />
                        <label className="form-check-label" >Showcase</label>
                    </div>
                    <br />
                    <button type="button" className="btn btn-primary" onClick={() => this.addInfoToDb()}>
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default GeneralEditCard;