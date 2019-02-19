import React, { Component } from 'react';

var urls = require('../../config/downloadUrls');
class Showcase extends Component {
    render() {
        return (
            <div>
                <section id="showcaseSection" >
                    <h3 className="text-center">Projects</h3>
                    <div className='card showcaseCard'>
                        <div className="card-block">
                            <a href="https://hidden-river-87985.herokuapp.com/"><img src={urls.challenge_me_url} alt="Challenge Me- A social media website Logo"
                                id='web_logo' /> </a>
                            <span className="badge badge-primary">Work In Progress</span>
                            <h4>ChallengeMe - A Social Media Website</h4>

                            <p>
                                Overall Description:
                                <br />
                                This website allows users to upload videos, set up profiles, and like/dislike/challenge other users.
                                The main feature of the website is that it allows users to challenge others and engage in a competition-like environment where other users can rate whoever's performance/video was better.
                                Main Features:
                                </p>
                            <ul>
                                <li>Upload Videos with Title and Description</li>
                                <li>Like or Dislike uploaded videos of others</li>
                                <li>Rate users in a competition</li>
                                <li>Challenge others to see whose video is better</li>
                            </ul>
                            Technologies Used:
                                <ul>
                                <li>ReactJS and NodeJS</li>
                                <li>Heroku for hosting</li>
                                <li>Firebase Database and Authentication</li>
                                <li>Several other libraries available for smaller functions (eg. Video Upload)</li>
                            </ul>
                        </div>
                    </div>
                    <br />
                    <div className='card showcaseCard'>
                        <div className="card-block">
                            <a href="https://modernnotepad.herokuapp.com/"><img
                                src='https://us.123rf.com/450wm/victor85/victor851711/victor85171100106/90359900-notepad-circle-icon-with-long-shadow-flat-design-style-notepad-simple-silhouette-modern-minimalist-r.jpg?ver=6'
                                alt="Modern Notepad - Free Full-featured online Notepad for you."
                                id='web_logo' /> </a>
                            <span className="badge badge-primary">Work In Progress</span>
                            <h4>Notepad1+ - A Free Full-featured online Notepad for you.</h4>
                            <p>Overall Description:</p>
                            <br />
                            This is a free full-featured online notepad that allows you to save your notes and share them with others.
                            Technologies Used:
                                <ul>
                                <li>Will be added later...</li>
                            </ul>
                        </div>
                    </div>
                    <br />
                    <div className='card showcaseCard'>
                        <div className="card-block">
                            <a href="https://www.tinqer.io"><img src={urls.tinqer_image} alt="Tinqer - AI-Based solutions for your business"
                                id='web_logo' /> </a>
                            <span className="badge badge-primary">Work In Progress</span>
                            <h4>Tinqer.io - Offer AI-Based solutions to small businesses</h4>
                            <p>Overall Description:</p>
                            <br />
                            This business's plan is to offer AI-Based solutions such as Chatbots and automation solutions to small businesses to help with increasing their revenue and customer satisfaction.
                            Technologies Used:
                                <ul>
                                <li>ReactJS and NodeJS</li>
                                <li>Heroku for hosting</li>
                                <li>Microsoft Azure - For Chatbots (C#) and AI Model Training</li>
                                <li>Google DialogFlow - For Chatbots (NodeJS, Python, and Java) </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div >
        );
    }
}

export default Showcase;
