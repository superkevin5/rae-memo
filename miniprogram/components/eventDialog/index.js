// miniprogram/components/cloudTipModal/index.js
const { isMac } = require('../../envList.js');
const util = require('../../util/util.js')

Component({
    attached: function () {
        // this.setData({
        //     showDialog: false,
        //     date: '',
        // })
    },

    /**
     * 页面的初始数据
     */
    data: {
        showDialog: false,
        date: '',
        eventDetail: '',
        eventEndTime: util.getCurrentHAndM(),
        eventStartTime: util.getCurrentHAndM()
    },
    properties: {
        showDialogProps: Boolean,
        dateProps: String,
        reloadProps: Object
    },
    observers: {
        dateProps: function ( dateProps ) {
            this.setData({
                date: dateProps
            });
        },

        showDialogProps: function ( showDialogProps = false ) {
            this.setData({
                showDialog: showDialogProps
            });
        }
    },
    methods: {
        onCreateEventStartTime( e ) {
            this.setData({
                eventStartTime: e.detail
            });
        },
        onCreateEventEndTime( e ) {
            this.setData({
                eventEndTime: e.detail
            });
        },
        onCreateEventDetail( e ) {
            this.setData({
                eventDetail: e.detail
            });
        },
        reloadPages: function () {
            this.triggerEvent("action")
        },
        async onSave( e ) {

            const end = this.data.eventEndTime.split(':')
            const start = this.data.eventStartTime.split(':')

            const startDateObj = new Date(util.formatCurrentDay(this.data.date))
            startDateObj.setHours(start[ 0 ])
            startDateObj.setMinutes(start[ 1 ])

            const endDateObj = new Date(util.formatCurrentDay(this.data.date))
            endDateObj.setHours(end[ 0 ])
            endDateObj.setMinutes(end[ 1 ])
            const localDateArray = this.data.date.split('/')
            const db = wx.cloud.database()
            await db.collection('memodb').add({

                data: {
                    startTime: startDateObj.toISOString(),
                    endTime: endDateObj.toISOString(),
                    description: this.data.eventDetail,
                    localStringDay: localDateArray[ 2 ] + '-' + localDateArray[ 1 ] + '-' + localDateArray[ 0 ]
                }

            })
            this.reloadPages()

        }
    }

});
