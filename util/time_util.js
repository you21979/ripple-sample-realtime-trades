"use strict";
var moment = require('moment');
var rippleTimeToMoment = exports.rippleTimeToMoment = function(epoch){
    var BASE_TIME = 946684800;
    return moment.unix(BASE_TIME).add(epoch, 'seconds')
}

