import React, { Component } from 'react';
import firebaseApp from '../../Firebase';

require('firebase/firestore');

const db = firebaseApp.firestore();

class Experience extends Component {
    
    componentWillMount() {
        // let referThis = this;
        // db.collection('Experience').onSnapshot((doc) => {
        //     doc.forEach((eachDoc) => {
        //         if(eachDoc && eachDoc.exists){
        //             console.log('Each Doc: ', eachDoc.data());
        //         }
        //     })
        // });
    }
    render() {
        return (
            <section id="experience">
                <h3 className="text-center">Experience</h3>
                <div className='card experienceCard'>
                    <div className="card-block">
                        <div className="row">
                            <div className='col-md-6 col-sm-6'>
                                <img src='https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/Wipro_Logo_1.png?alt=media&token=1b02e062-beca-47f6-a167-946df9491c6d' id='work_logo'
                                    alt="Company Experience Logo" />
                            </div>
                            <div className='col-md-6 col-sm-6'>
                                <img src='https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/1200px-Ahold_Delhaize_logo.svg.png?alt=media&token=df4affb2-ed7f-4961-b7b8-68c9eb8326e5' id='work_logo'
                                    alt="Company Experience Logo" />
                            </div>
                        </div>
                        <span className="badge badge-primary">March 2018 - October 2018</span>
                        <h4 role='button'
                            data-toggle='collapse' href='#experienceOneDetailsCollapse'>
                            Software Engineer <i className="fas fa-angle-down"></i>
                        </h4>
                        <div className='collapse' id='experienceOneDetailsCollapse'>
                            <p>Responsibilities:</p>
                            <ul>
                                <li className='list-item'>Met important deadlines by monitoring project’s progress and coordinating with other teams. </li>
                                <li className='list-item'>Successfully managed all stores’ queries and processes for my team’s applications. </li>
                                <li className='list-item'>Developed documentation, layouts, and flowcharts to identify requirements and expected solutions. </li>
                                <li className='list-item'>Troubleshoot and debug existing applications. </li>
                                <li className='list-item'>Manage applications that are using Linux, Unix, and JBOSS. </li>
                                <li className='list-item'>Run tests and integrate software components into a fully functional software system. </li>
                                <li className='list-item'>Created a python based bot that accepts remedy ticket for all teams in time. </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <br />
                <div className='card experienceCard'>
                    <div className="card-block">
                        <img src='https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/sourcelink_logo_tag_bg.png?alt=media&token=b712143f-5f5d-4122-8c17-ed37e6066af9' id='work_logo'
                            alt="Company Experience Logo" />
                        <span className="badge badge-primary">April 2017 - March 2018</span>
                        <h4>Enterprise Software Developer</h4>
                        <p>Responsibilities:</p>
                        <ul>
                            <li className='list-item'>Responsible for the development of applications by utilizing C#</li>
                            <li className='list-item'>Developed C# software to automate daily Jobs using Visual Studio.</li>
                            <li className='list-item'>Managed Mail Processing from different Clients  </li>
                            <li className='list-item'>Used FoxPro to perform Data Processing and Data Management and manipulation.</li>
                            <li className='list-item'>Designing of multi-layer forms using designs and layouts in VB</li>
                            <li className='list-item'>Led the development of a full automation program for a top client. </li>
                        </ul>

                    </div>
                </div>

            </section>
        );
    }
}

export default Experience;
