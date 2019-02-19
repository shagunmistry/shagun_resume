import React, { Component } from 'react';
import Experience from './newupdate/Experience';
import Education from './newupdate/Education';
import Showcase from './newupdate/Showcase';

class Alldetails extends Component {
    render() {
        return (
            <div>
                <Experience {...this.props} />
                <br />
                <Education {...this.props} />
                <br />
                <Showcase  {...this.props} />
            </div>
        );
    }
}

export default Alldetails;
