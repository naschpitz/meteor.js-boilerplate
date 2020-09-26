const user = db.users.findOne({'emails.address': email});

printjson(user.services.password.reset.token);
