import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import ShareButtons from '../shareButtons/shareButtons.jsx';

import './home.css';

export default Home = () => {
    const currentUser = useTracker(() => Meteor.user(), []);

    return (
        <div id="home">
            {currentUser ? "Home - user loggedin" : "Home - no user"}
            <ShareButtons/>
        </div>
    );
}