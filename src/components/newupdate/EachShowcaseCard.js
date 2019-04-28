import React, { Component } from 'react';

class EachShowcaseCard extends Component {
    render() {
        const {
            logoLinks,
            monthEnded,
            monthStarted,
            responsibilities,
            subtitle,
            title,
            yearEnded,
            yearStarted,
        } = this.props;
        const collapseId = `${subtitle.replace(/ /g, '')}`;
        return (
            <div className='card showcaseCard'>
                <div className="card-block">
                    
                    {/* <img src={urls.challenge_me_url} alt="Challenge Me- A social media website Logo"
                        id='web_logo' /> */}
                    <span className="badge badge-primary">Work In Progress</span>
                    <h4 role='button'
                        data-toggle='collapse' href={'#' + collapseId}>
                        <a href={logoLinks}>{title}</a> <i className="fas fa-angle-down"></i>
                    </h4>
                    <div className='collapse' id={collapseId}>
                        <p>Details:</p>
                        <ul>
                            {
                                responsibilities.split('•').map((x, i) =>
                                    x !== "" ? <li key={i}>{x}</li>
                                        : null
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default EachShowcaseCard;