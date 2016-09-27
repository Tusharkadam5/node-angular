'use strict';

// We can include a single file for all schema
 module.exports = function(app, mongoose) {

    require('../model/schema/users');
    require('../model/schema/usertasks');

};