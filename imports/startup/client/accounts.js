import { Meteor } from 'meteor/meteor';

import Alert from 'react-s-alert';

Accounts.onEmailVerificationLink(function (token) {
    Accounts.verifyEmail(token, verifyCallback);

    function verifyCallback(error) {
        if (error)
            Alert.error("Error in e-mail account verification: " + getErrorMessage(error));

        else
            Alert.success("E-mail account successfully verified.");
    }
});

Accounts.onResetPasswordLink(function (token) {
    Session.set('passwordResetToken', token);
});

Accounts.onEnrollmentLink(function (token) {
    Session.set('passwordResetToken', token);
});

Accounts.onLogin(function () {
    const options = {
        timeout: 'none',
    };

    if (Meteor.user().emails && !Meteor.user().emails[0].verified)
        Alert.warning("E-mail account unconfirmed. Click on 'Resend Confirmation' in the upper bar in order to re-send the confirmation e-mail.", options);

    Alert.success("You're logged in.");
});

Accounts.onLogout(function () {
    Alert.closeAll();
    Alert.success("You logged out.");
});