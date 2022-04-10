const moment = require('moment.min.js')

function msToHMS( ms ) {
    return moment(ms).format("hh:mm:ss a")
}

module.exports.msToHMS = msToHMS



