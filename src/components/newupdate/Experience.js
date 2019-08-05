import React, { Component } from 'react';
import EachExperienceCard from './EachExperienceCard';

class Experience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobArray: [],
        };
    }


    componentWillMount() {
        let referThis = this;
        let jobArr = [];
        this.props.database.collection('Experience').get().then((doc) => {
            doc.forEach((eachDoc) => {
                if (eachDoc && eachDoc.exists) {
                    jobArr.push(eachDoc.data());
                }
            });
        }).then(() => {
            referThis.setState({
                jobArray: jobArr,
            });
        });
    }
    render() {
        return (
            <section id="experience">
                <h3 className="text-center">Experience</h3>
                {
                    this.state.jobArray.map((x, index) =>
                        <EachExperienceCard key={index} {...x} />)
                }
                <br />
            </section>
        );
    }
}

export default Experience;
