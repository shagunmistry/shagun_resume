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
                <div className="card-block" style={{ marginRight: 'auto', marginLeft: 'auto' }}>
                    <div className="row" style={{ fontSize: '24px' }}>
                        <div className="col-sm-2 eachRow" style={{width: '50%'}}>
                            <a href="https://www.github.com/shagunmistry/"><i className="fab fa-github-alt"></i></a>
                        </div>
                        <div className="col-sm-2 eachRow" style={{width: '50%'}}>
                            <a href="https://www.linkedin.com/in/shagun-mistry-5903a483/"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <div className="col-sm-2 eachRow" style={{width: '50%'}}>
                            <a href="https://www.instagram.com/shagun_mistry/"><i className="fab fa-instagram"></i> </a>
                        </div>
                        <div className="col-sm-2 eachRow" style={{width: '50%'}}>
                            <a href="mailto:shagun.mistry@hotmail.com"><i className="fas fa-envelope"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contactsection;