const user = db.users.findOne({'emails.address': email});

printjson(user.services.email.verificationTokens[0].token);