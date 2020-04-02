import React, { Component } from 'react';

class EachShowcaseCard extends Component {
    render() {
        const {
            logoLinks,
            responsibilities,
            subtitle,
            title,
        } = this.props;

        // collapse ID is the subtitle string without any spaces in it.
        const collapseId = `${subtitle.replace(/ /g, '')}`;

        return (
            <div className='card showcaseCard'>
                <div className="card-block">
                    <span className="badge badge-primary">WIP</span>
                    <h4 role='button'
                        data-toggle='collapse' href={'#' + collapseId}>
                        <a href={logoLinks}>{title}</a> <i className="fas fa-angle-down"></i>
                    </h4>
                    <div className='collapse' id={collapseId}>
                        <p>Details:</p>
                        <ul>
                            {
                                // Split it based on any character you placed in the description part. 
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