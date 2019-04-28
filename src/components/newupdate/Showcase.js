import React, { Component } from 'react';
import firebaseApp from '../../Firebase';
import EachShowcaseCard from './EachShowcaseCard';

require('firebase/firestore');

const db = firebaseApp.firestore();

var urls = require('../../config/downloadUrls');
class Showcase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showcaseArray: [],
        };
    }


    componentWillMount() {
        let referThis = this;
        let showcaseArr = [];
        db.collection('Showcase').get().then((doc) => {
            doc.forEach((eachDoc) => {
                if (eachDoc && eachDoc.exists) {
                    showcaseArr.push(eachDoc.data());
                }
            });
        }).then(() => {
            referThis.setState({
                showcaseArray: showcaseArr,
            });
        });
    }
    render() {
        return (
            <div>
                <section id="showcaseSection" >
                    <h3 className="text-center">Projects</h3>
                    {
                        this.state.showcaseArray.map((x, i) =>
                            <EachShowcaseCard key={++i} {...x} />)
                    }
                </section>
            </div >
        );
    }
}

export default Showcase;
