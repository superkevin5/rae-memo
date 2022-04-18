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
        dateProps: String
    },
    observers: {
        dateProps: function ( dateProps ) {
            this.setData({
                date: dateProps
            });
        },

        showDialogProps: function ( showDialogProps=false ) {
            this.setData({
                showDialog: showDialogProps
            });
        }
    },
    methods: {
        onCreateEventStartTime(e) {
            this.setData({
                eventStartTime: e.detail
            });
        },
        onCreateEventEndTime(e) {
            this.setData({
                eventEndTime: e.detail
            });
        },
        onCreateEventDetail(e){
            this.setData({
                eventDetail: e.detail
            });
        },
    }

});
