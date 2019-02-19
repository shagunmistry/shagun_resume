/**
 * Contact Section
 */
import React, { Component } from 'react';

class Contactsection extends Component {


    render() {

        var styles = {
            contactHeader: {
                borderBottom: "1px solid black"
            },
            contactCard: {
                padding: '10px',
                border: 'none',
                borderTop: '1px solid blue',
                boxShadow: '0 14px 28px rgba(34, 15, 204, 0.25), 0 10px 10px rgba(34, 15, 204, 0.25)',
                borderRadius: '0px'
            },
        };
        return (
            <div className="card" style={styles.contactCard}>
                <h3 className="card-title" style={styles.contactHeader}>Contact Me: </h3>
                <div className="card-block">
                    <ul>
                        <li id="githubList"><p>
                            <i className="fab fa-github-alt"></i><a href="https://www.github.com/shagunmistry/"> Github</a>
                        </p></li>
                        <li id="linkedinList"><p>
                            <i className="fab fa-linkedin-in"></i><a href="https://www.linkedin.com/in/shagun-mistry-5903a483/"> LinkedIn</a>
                        </p></li>
                        <li id="instaList"><p>
                            <i className="fab fa-instagram"></i><a href="https://www.instagram.com/shagun_mistry/"> Instagram</a>
                        </p></li>
                        <li id="emailList"><p>
                            <i className="fas fa-envelope"></i><a href="mailto:shagun.mistry@hotmail.com"> Email Me!</a>
                        </p></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Contactsection;