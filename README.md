# meteor.js-boilerplate
A simple Meteor.JS boilerplate that uses React.JS, Bootstrap 4, MUP (easy deployment) and Cypress (end-to-end testing). It has JetBrains' WebStorm run configurations to make it run in no time.

The following instructions will consider that you already have both Meteor.JS (https://www.meteor.com/install) and WebStorm installed in your system.

1) Clone this repo.
2) Open the project with WebStorm.
3) Into the terminal tab, type "meteor npm install" to retrieve and install npm dependencies.
4) If the 'Run' configuration is already selected (top right corner, otherwise select it), just click the 'play' button.
5) The boilerplate should be up and running in a few seconds.


Further steps:

6) In Webstorm's run configurations, mind the MAIL_URL variable: replace it according to your application's e-mail account and server address. 
7) You have to properlly setup private/mup/[development || production || test]/mup.js to be able to deploy this code to your server. Refer to http://meteor-up.com/docs.html for more informations about this file.
