// miniprogram/components/cloudTipModal/index.js
const { isMac } = require('../../envList.js');
const util = require('../../util/util.js')

import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

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
        currentDayProps: '',
        eventDetail: '',
        eventEndTime: util.getCurrentHAndM(),
        eventStartTime: util.getCurrentHAndM()
    },
    properties: {
        showDialogProps: Boolean,
        dateProps: String,
        reloadProps: Object,
        currentDayProps: String
    },
    observers: {
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
        async onSave( e ) {

            const end = this.data.eventEndTime.split(':')
            const start = this.data.eventStartTime.split(':')

            const currentDate = this.data.date
            const d = currentDate.split('/')
            var day = new Date()
            day.setFullYear(d[2])
            day.setMonth(d[1]-1)
            day.setDate(d[0])
            const startDateObj = day

            startDateObj.setHours(parseInt(start[ 0 ],10))
            startDateObj.setMinutes(parseInt(start[ 1 ],10))

            var day = new Date()
            day.setFullYear(d[2])
            day.setMonth(d[1]-1)
            day.setDate(d[0])

            const endDateObj = day
            endDateObj.setHours(parseInt(end[ 0 ],10))
            endDateObj.setMinutes(parseInt(end[ 1 ],10))
            const localDateArray = this.data.date.split('/')
            const db = wx.cloud.database()

            let openId = await util.getOpenId()
            const myLeaderOpenId = (await util.getMyLeader(openId)) || openId

            await db.collection('memodb').add({

                data: {
                    openId: myLeaderOpenId,
                    startTime: startDateObj.toISOString(),
                    endTime: endDateObj.toISOString(),
                    description: this.data.eventDetail,
                    localStringDay: localDateArray[ 2 ] + '-' + localDateArray[ 1 ] + '-' + localDateArray[ 0 ]
                }

            })
            Toast({
                type: 'success',
                message: '保存成功',
                onClose: () => {
                    this.reloadPages()
                },
            });

        }
    }

});
