import React, { Component } from 'react';

class EachExperienceCard extends Component {

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

        // title-subtitle without any subtitles.
        const collapseId = `${title.replace(/ /g, '')}-${subtitle.replace(/ /g, '')}`;

        return (
            <div className='card experienceCard'>
                <div className="card-block">
                    <img src={logoLinks} id='work_logo' alt="Company Experience Logo" />
                    <span className="badge badge-primary">{monthStarted} {yearStarted} - {monthEnded} {yearEnded}</span>
                    <h4 role='button'
                        data-toggle='collapse'
                        href={'#' + collapseId}>
                        {title}
                        <i className="fas fa-angle-down"></i>
                    </h4>
                    <div className='collapse' id={collapseId}>
                        <p>Responsibilities:</p>
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

export default EachExperienceCard;