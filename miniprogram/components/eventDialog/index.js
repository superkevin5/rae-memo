// miniprogram/components/cloudTipModal/index.js
const { isMac } = require('../../envList.js');
const util = require('../../util/util.js')

import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

Component({
    attached: function () {
        this.setData({
            message: '',
        })
    },
    ready: function () {
        this.setData({
            message: '',
        })

    },
    detached: function () {
        this.setData({
            message: '',
        })
    },

    lifetimes: {
        // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
        attached: function () {
        },
        moved: function () {
        },
        detached: function () {
        },
    },


    /**
     * 页面的初始数据
     */
    data: {
        showDialog: false,
        message: '',
        date: '',
        eventIdInUpdatingProps: '',
        currentDayProps: '',
        eventDetail: '',
        eventEndTime: util.getCurrentHAndM(),
        eventStartTime: util.getCurrentHAndM()
    },

    properties: {
        showDialogProps: Boolean,
        dateProps: String,
        reloadProps: Object,
        currentDayProps: String,
        eventIdInUpdatingProps: String
    },

    observers: {
        eventIdInUpdatingProps: async function ( eventIdInUpdatingProps ) {
            if (eventIdInUpdatingProps) {
                const db = wx.cloud.database()
                const res = await db.collection('memodb').where({
                    _id: eventIdInUpdatingProps,
                }).get()

                const data = res.data[ 0 ]
                const startTimeDate = new Date(data.startTime)
                this.setData({
                    message: data.description,
                    eventStartTime: startTimeDate.getHours() + ':' + startTimeDate.getMinutes()
                })
            }

        },
        dateProps: function ( dateProps ) {
            this.setData({
                date: dateProps
            });
        },
        currentDayProps: function ( currentDayProps ) {
            this.setData({
                currentDay: currentDayProps
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
        onCloseDialog() {


        },
        async onSave( e ) {

            const end = this.data.eventEndTime.split(':')
            const start = this.data.eventStartTime.split(':')

            const currentDate = this.data.date
            const d = currentDate.split('/')
            var day = new Date()
            day.setFullYear(d[ 2 ])
            day.setMonth(d[ 1 ] - 1)
            day.setDate(d[ 0 ])
            const startDateObj = day

            startDateObj.setHours(parseInt(start[ 0 ], 10))
            startDateObj.setMinutes(parseInt(start[ 1 ], 10))

            var day = new Date()
            day.setFullYear(d[ 2 ])
            day.setMonth(d[ 1 ] - 1)
            day.setDate(d[ 0 ])

            const endDateObj = day
            endDateObj.setHours(parseInt(end[ 0 ], 10))
            endDateObj.setMinutes(parseInt(end[ 1 ], 10))
            const localDateArray = this.data.date.split('/')
            const db = wx.cloud.database()

            let openId = await util.getOpenId()
            const myLeaderOpenId = ( await util.getMyLeader(openId) ) || openId

            if(this.properties.eventIdInUpdatingProps){
                await db.collection('memodb').where({
                    _id: this.properties.eventIdInUpdatingProps
                })
                    .update({
                        data: {
                            openId: myLeaderOpenId,
                            startTime: startDateObj.toISOString(),
                            endTime: endDateObj.toISOString(),
                            description: this.data.eventDetail,
                            localStringDay: localDateArray[ 2 ] + '-' + localDateArray[ 1 ] + '-' + localDateArray[ 0 ]
                        },
                    });
            } else {
                await db.collection('memodb').add({

                    data: {
                        openId: myLeaderOpenId,
                        startTime: startDateObj.toISOString(),
                        endTime: endDateObj.toISOString(),
                        description: this.data.eventDetail,
                        localStringDay: localDateArray[ 2 ] + '-' + localDateArray[ 1 ] + '-' + localDateArray[ 0 ]
                    }

                })
            }

            Toast({
                type: 'success',
                message: '保存成功',
                onClose: () => {
                    this.setData({
                        message: '',
                        eventIdInUpdatingProps: ''
                    })
                    this.reloadPages()
                },
            });

        }
    }

});
