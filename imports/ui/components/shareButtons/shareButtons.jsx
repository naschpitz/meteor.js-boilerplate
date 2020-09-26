import React from 'react';
import { Meteor } from 'meteor/meteor';

import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { FacebookIcon, LinkedinIcon, TwitterIcon, WhatsappIcon } from 'react-share';

import './shareButtons.css';

export default ShareButtons = () => {
    return (
        <div id="shareButtons"  className="text-center">
            <FacebookShareButton url={Meteor.absoluteUrl()}
                                 quote="Simple way to share this"
                                 hashtag="Boilerplate.com"
            >

                <FacebookIcon size={32} round={true}/>
            </FacebookShareButton>

            <LinkedinShareButton url={Meteor.absoluteUrl()}
                                 title="Boilerplate.com - Share this"
                                 summary="Simple way to share this"
                                 source="Boilerplate.com"
            >

                <LinkedinIcon size={32} round={true}/>
            </LinkedinShareButton>

            <TwitterShareButton url={Meteor.absoluteUrl()}
                                title="Boilerplate.com - Share this"
                                via="Simple way to share this"
                                hashtags={["Boilerplate.com", "Share", "Free", "Stuff"]}
            >

                <TwitterIcon size={32} round={true}/>
            </TwitterShareButton>

            <WhatsappShareButton url={Meteor.absoluteUrl()}
                                 title="Boilerplate.com - Share this"
            >

                <WhatsappIcon size={32} round={true}/>
            </WhatsappShareButton>
        </div>
    )
}