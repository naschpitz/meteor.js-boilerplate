Accounts.emailTemplates.siteName = "Boilerplate.com";
Accounts.emailTemplates.from = "Boilerplate.com <contact@boilerplate.com>";

Accounts.emailTemplates.verifyEmail.subject = function () {
    return "Account Verification";
};

Accounts.emailTemplates.verifyEmail.text = function (user, url) {
    let text = "Hello there!";
    text += "\r\n\r\n";
    text += "Click the link bellow to verify your e-mail account.";
    text += "\r\n\r\n";
    text += url;
    text += "\r\n\r\n";
    text += "Thanks!";

    return text;
};

Accounts.emailTemplates.resetPassword.subject = function () {
    return "Password Recovery";
};

Accounts.emailTemplates.resetPassword.text = function (user, url) {
    let text = "Hello!";
    text += "\r\n\r\n";
    text += "To confirm you wish to reset your password click the link bellow.";
    text += "\r\n\r\n";
    text += url;
    text += "\r\n\r\n";
    text += "Thanks!";

    return text;
};

Accounts.emailTemplates.enrollAccount.subject = function () {
    return "Boilerplate.com Join Invitation"
};

Accounts.emailTemplates.enrollAccount.text = function (user, url) {
    let text = "Hello!";
    text += "\r\n\r\n";
    text += "To confirm you wish to join Boilerplate.com please click the link bellow.";
    text += "\r\n\r\n";
    text += url;
    text += "\r\n\r\n";
    text += "Thanks!";

    return text;
};
