import { Meteor } from 'meteor/meteor';

export default class Users {
    static isVerified(user) {
        if (!user)
            return false;

        return user.emails[0].verified;
    }

    static forceLogout(userId) {
        Meteor.users.update(
            userId,
            {
                $set: {
                    "services.resume.loginTokens": []
                }
            }
        );
    }
}