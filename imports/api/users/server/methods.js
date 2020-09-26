import { Meteor } from 'meteor/meteor';

import Users from '../both/class.js';

if (Meteor.isServer) {
    Meteor.methods({
        'users.getUserByEmail'(email) {
            return Meteor.users.findOne(
                {
                    'emails.address': email
                }
            );
        },

        'users.getUserById'(id) {
            return Meteor.users.findOne(id);
        },

        'users.sendVerificationEmail'() {
            if (this.userId && Meteor.isServer)
                Accounts.sendVerificationEmail(this.userId);
        },

        'users.create'(options, callback) {
            const userId = Accounts.createUser(options, callback);

            if (userId)
                Accounts.sendVerificationEmail(userId);
        },

        'users.invite'(email) {
            if (!this.userId)
                throw new Meteor.Error('401', "Unauthorized", "User not logged in.");

            const options = {
                email: email
            };

            const userFound = Meteor.call('users.getUserByEmail', email);

            if (userFound)
                throw new Meteor.Error('403', "There is already an user registered with this e-mail address.");

            let userId = null;

            if (userFound)
                userId = userFound._id;

            else
                userId = Accounts.createUser(options);

            if (userId)
                Accounts.sendEnrollmentEmail(userId);

            else
                throw new Meteor.Error('500', "Error creating user.");

            return true;
        },

        'users.resendInvitation'(userId) {
            if (!this.userId)
                throw new Meteor.Error('401', "Unauthorized", "User not logged in.");

            const userFound = Meteor.users.findOne(userId);

            if (!userFound)
                throw new Meteor.Error('403', "Forbidden", "User not found.");

            if (Users.isVerified(userFound))
                throw new Meteor.Error('500', "Cannot resend invitation to an already verified user.");

            Accounts.sendEnrollmentEmail(userId);
        },
    });
}
