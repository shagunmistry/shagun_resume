import React, { Component } from 'react';
import firebase from 'firebase';

require('firebase/firestore');

var db = firebase.firestore();

class GeneralInfoCard extends Component {
    render() {
        return (
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
        );
    }
}

export default GeneralInfoCard;