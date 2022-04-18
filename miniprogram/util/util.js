const moment = require('moment.min.js')


const initTimeBlocks = [
        {
            id:1,
            time: '01:00',
            events: [
            ]
        },
        {
            id:2,
            time: '02:00'
        },
        {
            id:3,
            time: '03:00'
        },
        {
            id:4,
            time: '04:00'
        },
        {
            id:5,
            time: '05:00'
        },
        {
            id:6,
            time: '06:00'
        },
        {
            id:7,
            time: '07:00'
        },
        {
            id:8,
            time: '08:00',
            // events: [
            //     {
            //       id: 1,
            //       timeStart: '',
            //       timeEnd: '',
            //       description: 'look after mao mao '
            //     },
            //     {
            //         id: 2,
            //         timeStart: '',
            //         timeEnd: '',
            //         description: 'look after mao mao2 '
            //     },
            //     {
            //         id: 3,
            //         timeStart: '',
            //         timeEnd: '',
            //         description: 'look after mao mao3 '
            //     },
            //
            // ]
        },
        {
            id:9,
            time: '09:00'
        },
        {
            id:10,
            time: '10:00'
        },
        {
            id:11,
            time: '11:00'
        },
        {
            id:12,
            time: '12:00'
        },
        {
            id:13,
            time: '13:00'
        },
        {
            id:14,
            time: '14:00'
        },
        {
            id:15,
            time: '15:00'
        },
        {
            id:16,
            time: '16:00'
        },
        {
            id:17,
            time: '17:00'
        },
        {
            id:18,
            time: '18:00'
        },
        {
            id:19,
            time: '19:00'
        },
        {
            id:20,
            time: '20:00'
        },
        {
            id:21,
            time: '21:00'
        },
        {
            id:22,
            time: '22:00'
        },
        {
            id:23,
            time: '23:00'
        },
        {
            id:24,
            time: '00:00'
        }

    ]

function msToHMS( ms ) {
    return moment(ms).format("hh:mm:ss a")
}

function getPageTimeBlocks(currentISOString) {
    try {
        const res = wx.getStorageInfoSync()
        console.log(res.keys)
        console.log(res.currentSize)
        console.log(res.limitSize)
    } catch (e) {
        // Do something when catch error
    }
    return initTimeBlocks
}

function setimeBlocks(currentISOString) {
    try {
        wx.setStorageSync('key', 'value')
    } catch (e) { }
}

function getCurrentHAndM() {
    const currentDate = new Date()
    const h = currentDate.getHours()
    const m = currentDate.getMinutes()
    return String(h) + ':'  + String(m)
}

module.exports = {
    msToHMS: msToHMS,
    getPageTimeBlocks:getPageTimeBlocks,
    getCurrentHAndM: getCurrentHAndM
}







