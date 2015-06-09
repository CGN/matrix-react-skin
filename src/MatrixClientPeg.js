// A thing that holds your Matrix Client
var Matrix = require("matrix-js-sdk");

var matrixClient = null;

module.exports = {
    get: function() {
        return matrixClient;
    },

    replaceUsingUrl: function(hs_url) {
        matrixClient = Matrix.createClient(hs_url);
    }
};
