import React, { Component } from 'react';
import firebaseApp from '../../Firebase';
import firebase from 'firebase';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            signedIn: false,
        };
    }

    componentDidMount() {
        let thisState = this;
        // This logic could be definitely improved.
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                document.getElementById('loginButton').innerText = 'Logout';
                document.getElementById('emailInput').style.display = 'none';
                document.getElementById('passwordInput').style.display = 'none';

                thisState.setState({
                    signedIn: true
                });

            } else {
                document.getElementById('loginButton').innerText = 'Login';
                document.getElementById('emailInput').style.display = 'block';
                document.getElementById('passwordInput').style.display = 'block';
                thisState.setState({
                    signedIn: false
                });
            }
        });
    }

    loginWithEmail = () => {
        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value;
        
        // we have to do this reassign because 'this' can't be used under Firebase scope. 
        let thisState = this;
        if (this.state.signedIn) {
            firebaseApp.auth().signOut();
            thisState.setState({
                signedIn: false
            });
        }
        if (email === "" || password === "") {
            // show the error message
            document.getElementById('message').innerText = 'Please enter the required information!';
        } else {
            firebaseApp.auth().signInWithEmailAndPassword(email, password)
                .then(() => {
                    thisState.setState({
                        signedIn: true
                    });
                })
                .catch((err) => {
                    console.warn('Err: ', err);
                    document.getElementById('message').innerText = err.message;
                });
        }
    }

    render() {
        return (
            <div className='card loginCard' style={{ maxWidth: '500px', padding: '15px' }}>
                <h4 className="card-header" >Login</h4>
                <hr />
                <input type="email" className="form-control" id="emailInput" placeholder="Email" />
                <br />
                <input type="password" className="form-control" id="passwordInput" placeholder="Password" />
                <br />
                <button type='button' className='btn btn-lg btn-outline-light' id='loginButton'
                    onClick={() => this.loginWithEmail()}
                >Login</button>
                <br />
                <small id="message"></small>
            </div >
        );
    }
}

export default Login;