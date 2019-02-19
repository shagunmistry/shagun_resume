import React, { Component } from 'react';


class Education extends Component {
    render() {
        return (
            <div>
                <section id="educationSection" >
                    <h3 className="text-center">Education</h3>
                    <div className='card educationCard'>
                        <div className="card-block">
                            <img
                                src='https://imgix.bustle.com/rehost/2016/9/13/15ea24d7-a291-4844-9fd4-dd9b34becdec.jpg?w=970&h=582&fit=crop&crop=faces&auto=format&q=70'
                                id='work_logo'
                                alt='USC Upstate Logo' />
                            <span className="badge badge-primary">August 2016 - December 2016</span>
                            <h4>Bachelor of Science - Computer Science</h4>
                            <p>Topics Studied:</p>
                                <ul>
                                    <li className='list-item'>Object-Oriented Programming Concepts and Foundation</li>
                                    <li className='list-item'>Calculus, Disrete Mathematics, and Statistics</li>
                                    <li className='list-item'>Health Informatics</li>
                                    <li className='list-item'>Computer Networks, Software Architecture, Software Algorithms</li>
                                    <li className='list-item'>Android Development Basics and MATLAB</li>
                                </ul>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Education;
