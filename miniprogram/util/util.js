const moment = require('moment.min.js')


const initTimeBlocks = [
    {
        id: 1,
        time: '01:00',
        events: [],
        isShow: false,
    },
    {
        id: 2,
        time: '02:00',
        events: [],
        isShow: false,
    },
    {
        id: 3,
        time: '03:00',
        events: [],
        isShow: false,
    },
    {
        id: 4,
        time: '04:00',
        events: [],
        isShow: false,
    },
    {
        id: 5,
        time: '05:00',
        events: [],
        isShow: false,
    },
    {
        id: 6,
        time: '06:00',
        events: [],
        isShow: false,
    },
    {
        id: 7,
        time: '07:00',
        events: [],
        isShow: false,
    },
    {
        id: 8,
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
        // ],
        events: [],
        isShow: true
    },
    {
        id: 9,
        time: '09:00',
        events: [],
        isShow: true
    },
    {
        id: 10,
        time: '10:00',
        events: [],
        isShow: true
    },
    {
        id: 11,
        time: '11:00',
        events: [],
        isShow: true
    },
    {
        id: 12,
        time: '12:00',
        events: [],
        isShow: true
    },
    {
        id: 13,
        time: '13:00',
        events: [],
        isShow: true
    },
    {
        id: 14,
        time: '14:00',
        events: [],
        isShow: true
    },
    {
        id: 15,
        time: '15:00',
        events: [],
        isShow: true
    },
    {
        id: 16,
        time: '16:00',
        events: [],
        isShow: true
    },
    {
        id: 17,
        time: '17:00',
        events: [],
        isShow: true
    },
    {
        id: 18,
        time: '18:00',
        events: [],
        isShow: false
    },
    {
        id: 19,
        time: '19:00',
        events: [],
        isShow: false
    },
    {
        id: 20,
        time: '20:00',
        events: [],
        isShow: false
    },
    {
        id: 21,
        time: '21:00',
        events: [],
        isShow: false
    },
    {
        id: 22,
        time: '22:00',
        events: [],
        isShow: false
    },
    {
        id: 23,
        time: '23:00',
        events: [],
        isShow: false
    },
    {
        id: 24,
        time: '00:00',
        events: [],
        isShow: false
    }

]


function getPageTimeBlocks(  ) {
    initTimeBlocks.forEach(( d ) => {
        d.events = []
    })
    return initTimeBlocks
}


function getCurrentHAndM() {
    const currentDate = new Date()
    const h = currentDate.getHours()
    const m = currentDate.getMinutes()
    return String(h) + ':' + String(m)
}

function msToHMS( ISOTimeString ) {

    var newDate = new Date(ISOTimeString);
    var Y = newDate.getFullYear() + '-';
    var M = ( newDate.getMonth() + 1 < 10 ? '0' + ( newDate.getMonth() + 1 ) : newDate.getMonth() + 1 ) + '-';
    var D = newDate.getDate() + ' ';
    var h = newDate.getHours() + ':';
    var m = newDate.getMinutes() + ' - ';
    var s = newDate.getSeconds();
    return h + m
}

function formatTimeBlocktResponse( data = [], timeBlocks ) {
    data.forEach(( d ) => {
        const startTime = d.startTime
        if (!startTime) return
        const startHour = msToHMS(d.startTime).split(':')[ 0 ]
        switch (startHour) {
            case '01':
                timeBlocks[ 0 ].events.push(d);
                break;
            case '02':
                timeBlocks[ 1 ].events.push(d);
                break;
            case '03':
                timeBlocks[ 2 ].events.push(d);
                break;
            case '04':
                timeBlocks[ 3 ].events.push(d);
                break;
            case '05':
                timeBlocks[ 4 ].events.push(d);
                break;
            case '06':
                timeBlocks[ 5 ].events.push(d);
                break;
            case '07':
                timeBlocks[ 6 ].events.push(d);
                break;
            case '08':
                timeBlocks[ 7 ].events.push(d);
                break;
            case '09':
                timeBlocks[ 8 ].events.push(d);
                break;
            case '10':
                timeBlocks[ 9 ].events.push(d);
                break;
            case '11':
                timeBlocks[ 10 ].events.push(d);
                break;
            case '12':
                timeBlocks[ 11 ].events.push(d);
                break;
            case '13':
                timeBlocks[ 12 ].events.push(d);
                break;
            case '14':
                timeBlocks[ 13 ].events.push(d);
                break;
            case '15':
                timeBlocks[ 14 ].events.push(d);
                break;
            case '16':
                timeBlocks[ 15 ].events.push(d);
                break;
            case '17':
                timeBlocks[ 16 ].events.push(d);
                break;
            case '18':
                timeBlocks[ 17 ].events.push(d);
                break;
            case '19':
                timeBlocks[ 18 ].events.push(d);
                break;
            case '20':
                timeBlocks[ 19 ].events.push(d);
                break;
            case '21':
                timeBlocks[ 20 ].events.push(d);
                break;
            case '22':
                timeBlocks[ 21 ].events.push(d);
                break;
            case '23':
                timeBlocks[ 22 ].events.push(d);
                break;
            case '00':
                timeBlocks[ 23 ].events.push(d);
                break;
        }
    })

    return timeBlocks
}

function formatCurrentDay(localDateString) {
    var d = localDateString.split('/')
    return d[2] + '-' + d[1] + '-' + d[0];
}

function getCurrentDay(localDateString) {
    var d = localDateString.split('/')
    var year = d[2]
    var month = d[1]
    var day = d[0]

    const dayT = new Date()
    dayT.setFullYear(year)
    dayT.setMonth(parseInt(month)-1)
    dayT.setDate(day)
    day = dayT.getDay();
    switch(day){
        case 0: return '周日';
        case 1: return '周一';
        case 2: return '周二';
        case 3: return '周三';
        case 4: return '周四';
        case 5: return '周五';
        case 6: return '周六';
    }
}



module.exports = {
    msToHMS: msToHMS,
    getPageTimeBlocks: getPageTimeBlocks,
    getCurrentHAndM: getCurrentHAndM,
    formatTimeBlocktResponse: formatTimeBlocktResponse,
    formatCurrentDay: formatCurrentDay,
    getCurrentDay: getCurrentDay
}







