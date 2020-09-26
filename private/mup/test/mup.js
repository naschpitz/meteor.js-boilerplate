module.exports = {
  servers: {
    one: {
      host: "test.boilerplate.com",
      username: "root",
    }
  },

  proxy: {
    domains: 'test.boilerplate.com',
    clientUploadLimit: "100M",
    ssl: {
      // Enable let's encrypt to create free certificates.
      // The email is used by Let's Encrypt to notify you when the
      // certificates are close to expiring.
      letsEncryptEmail: 'contact@boilerplate.com'
    }
  },

  app: {
    name: 'Boilerplate',
    path: '../../../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'https://test.boilerplate.com',
      MONGO_URL: 'mongodb://username:passwrod@testdb.boilerplate.com/boilerPlate',
      MAIL_URL: 'smtps://contact%40boilerplate.com:password@yourMailServer.net:465',
      CLUSTER_WORKERS_COUNT: 'auto'
    },

    docker: {
      image: "abernix/meteord:node-12.16.1-base",
      buildInstructions: [],
      stopAppDuringPrepareBundle: false,
    },
   
    volumes: {
      "/s3-boilerplate": "/s3"
    },

    // This is the maximum time in seconds it will wait
    // for your app to start
    // Add 30 seconds if the server has 512mb of ram
    // And 30 more if you have binary npm dependencies.
    deployCheckWaitTime: 1200,

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  }
};
