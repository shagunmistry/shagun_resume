/**
 * Homepage
 */
import React, { Component } from 'react';
var pics = require('../config/downloadUrls');

class Showcase extends Component {


    render() {
        var styles = {
            projectsHeader: {
                borderBottom: "1px solid black"
            },
            projectsCard: {
                padding: '10px',
                border: 'none',
                borderTop: '1px solid blue',
                boxShadow: '0 14px 28px rgba(34, 15, 204, 0.25), 0 10px 10px rgba(34, 15, 204, 0.25)',
                borderRadius: '0px'
            },
            indicatorButtons: {
                backgroundColor: 'red',
                boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
                height: '50px',
                width: '30px',
                borderRadius: '10px'
            },
        };
        return (
            <div className="card" style={styles.projectsCard}>
                <h3 className="card-title" styles={styles.projectsHeader}>Projects</h3>
                <div className="card-block">
                    <div id="carIndicators" className="carousel slide" data-ride="carousel">
                        {/* <ol className="carousel-indicators">
                            <li data-target="#carIndicators" data-slide-to="0" className="active" ></li>
                            <li data-target="#carIndicators" data-slide-to="1"></li>
                            <li data-target="#carIndicators" data-slide-to="2"></li>
        </ol> */}
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <a href="https://hidden-river-87985.herokuapp.com/">
                                    <img id='showcaseSlides' className="d-block w-100" alt="Challenger"
                                        src={pics.challenge_me_url}
                                    /></a>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Challenger Project</h5>
                                    <p>
                                        A Web App where people can post videos of their skills and get challenged by others.
                                    **Still under production**
                                </p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <a href="https://tinqer.io/">
                                    <img id='showcaseSlides' className="d-block w-100" alt="Tinqer"
                                        src={pics.tinqer_image}
                                    /></a>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Tinqer</h5>
                                    <p>
                                       Provide AI-based solutions to small businesses and allow developers to sell their solutions as well.      
                                </p>
                                </div>
                            </div>
                        </div>
                        <a className="carousel-control-prev"
                            href="#carIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true" style={styles.indicatorButtons}></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next"
                            href="#carIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true" style={styles.indicatorButtons}></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Showcase;