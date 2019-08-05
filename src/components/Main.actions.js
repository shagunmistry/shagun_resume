
/**
 * Add the email to the DB under 'emails' collection until we have Twilio or SendGrid setup.
 */
export const SendEmail = (db, bDocument) => {
    const emailField = bDocument.getElementById('emailField').value;
    const reasonField = bDocument.getElementById('reasonField').value;
    const nameField = bDocument.getElementById('nameField').value;

    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    if (emailField !== "") {
        db.collection('emails').doc(text).set({
            email: emailField,
            name: nameField,
            reason: reasonField,
        }).then(() => {
            bDocument.getElementById('emailSubmitButton').style.color = 'green';
            bDocument.getElementById('emailField').innerText = "";
            bDocument.getElementById('reasonField').innerText = "";
            bDocument.getElementById('nameField').innerText = "";
        }).catch((err) => {
            window.alert(err.message);
        });
    }
};

/**
 * Edit this info as needed, based on the DB values you want. 
 *
 */
export const AddInfoToDb = (db, bDocument) => {
    // Get all the fields
    const linksField = bDocument.getElementById('linkField').value,
        monthEnded = bDocument.getElementById('monthEndedField').value,
        monthStarted = bDocument.getElementById('monthStartedField').value,
        resp = bDocument.getElementById('respField').value,
        showcaseCheckBox = bDocument.getElementById('showcaseCheckBox').checked,
        subtitle = bDocument.getElementById('companyNameField').value,
        title = bDocument.getElementById('jobTitleField').value,
        yearEnded = bDocument.getElementById('yearEndedField').value,
        yearStarted = bDocument.getElementById('yearStartedField').value;

    if (this.state.signedIn) {
        // If the yearEnd and MonthEnd field are emtpy, it is their current position
        let typeDecider = showcaseCheckBox ? 'Showcase' : 'Experience';
        db.collection(typeDecider).doc(subtitle).set({
            logoLinks: linksField,
            monthEnded: monthEnded,
            monthStarted: monthStarted,
            responsibilities: resp,
            subtitle: subtitle,
            title: title,
            yearEnded: yearEnded,
            yearStarted: yearStarted,
        }).then(() => {
            console.log('Successfully added data');
        })
            .catch((err) => {
                window.alert(err);
            });
    }
}