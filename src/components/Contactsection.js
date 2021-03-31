/**
 * Contact Section
 */
import React, { Component } from "react";

class Contactsection extends Component {
  render() {
    let styles = {
      contactHeader: {
        borderBottom: "1px solid black",
      },
      contactCard: {
        padding: "10px",
        border: "none",
        borderRadius: "10px",
      },
      github: {
        color: "#4078c0",
      },
      linkedin: {
        color: "#00a0dc",
      },
      ig: {
        color: "#405de6",
      },
    };
    return (
      <div className="card" style={styles.contactCard}>
        <div
          className="card-block"
          style={{ marginRight: "auto", marginLeft: "auto" }}
        >
          <div className="row" style={{ fontSize: "24px" }}>
            <div className="col">
              <a
                href="https://www.github.com/shagunmistry/"
                style={styles.github}
              >
                <i className="fab fa-github-alt"></i>
              </a>
            </div>
            <div className="col">
              <a
                href="https://www.linkedin.com/in/shagun-mistry-5903a483/"
                style={styles.linkedin}
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <div className="col">
              <a
                href="https://www.instagram.com/shagun_mistry/"
                style={styles.ig}
              >
                <i className="fab fa-instagram"></i>{" "}
              </a>
            </div>
            <div className="col">
              <a href="mailto:shagun.mistry@hotmail.com">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contactsection;
