// index.js
// const app = getApp()
const { envList } = require('../../envList.js');
const util = require('../../util/util.js')


Page({
    data: {
        date: new Date().toLocaleDateString('en-GB'),
        currentDay: util.getCurrentDay(new Date().toLocaleDateString('en-GB')),
        showCalendar: false,
        showDialog: false,
        calendarMinDate: new Date(2020, 0, 1).getTime(),
        calendarMaxDate: new Date(2025, 0, 1).getTime(),
        timeBlocks: util.getPageTimeBlocks(),
        // timeBlocks:[
        //     {
        //         id:1,
        //         time: '01:00',
        //         events: [
        //             {
        //                 id: 111,
        //                 timeStart: '2022-04-10T14:21:48Z',
        //                 timeEnd: '2022-04-10T14:21:48Z',
        //                 description: 'look after mao mao1111 '
        //             },
        //             {
        //                 id: 222,
        //                 timeStart: '2022-04-10T14:21:48Z',
        //                 timeEnd: '2022-04-10T14:21:48Z',
        //                 description: 'look after mao mao1111 '
        //             },
        //             {
        //                 id: 333,
        //                 timeStart: '2022-04-10T14:21:48Z',
        //                 timeEnd: '2022-04-10T14:21:48Z',
        //                 description: 'look after mao mao11112 '
        //             },
        //             {
        //                 id: 444,
        //                 timeStart: '2022-04-10T14:21:48Z',
        //                 timeEnd: '2022-04-10T14:21:48Z',
        //                 description: 'look after mao mao1111 '
        //             },
        //             {
        //                 id:5555,
        //                 timeStart: '2022-04-10T14:21:48Z',
        //                 timeEnd: '2022-04-10T14:21:48Z',
        //                 description: 'look after mao mao1111123123 '
        //             },
        //             {
        //                 id: 6666,
        //                 timeStart: '2022-04-10T14:21:48Z',
        //                 timeEnd: '2022-04-10T14:21:48Z',
        //                 description: 'look after mao mao11112123123 '
        //             },
        //             {
        //                 id: 7777,
        //                 timeStart: '2022-04-10T14:21:48Z',
        //                 timeEnd: '2022-04-10T14:21:48Z',
        //                 description: 'look after mao mao1111123 '
        //             },
        //             {
        //                 id:8888,
        //                 timeStart: '2022-04-10T14:21:48Z',
        //                 timeEnd: '2022-04-10T14:21:48Z',
        //                 description: 'look after mao mao1111123 '
        //             },
        //             {
        //                 id: 888887,
        //                 timeStart: '2022-04-10T14:21:48Z',
        //                 timeEnd: '2022-04-10T14:21:48Z',
        //                 description: 'look after mao mao11112123 '
        //             }
        //
        //         ]
        //     },
        //     {
        //         id:2,
        //         time: '02:00'
        //     },
        //     {
        //         id:3,
        //         time: '03:00'
        //     },
        //     {
        //         id:4,
        //         time: '04:00'
        //     },
        //     {
        //         id:5,
        //         time: '05:00'
        //     },
        //     {
        //         id:6,
        //         time: '06:00'
        //     },
        //     {
        //         id:7,
        //         time: '07:00'
        //     },
        //     {
        //         id:8,
        //         time: '08:00',
        //         events: [
        //             {
        //               id: 1,
        //               timeStart: '',
        //               timeEnd: '',
        //               description: 'look after mao mao '
        //             },
        //             {
        //                 id: 2,
        //                 timeStart: '',
        //                 timeEnd: '',
        //                 description: 'look after mao mao2 '
        //             },
        //             {
        //                 id: 3,
        //                 timeStart: '',
        //                 timeEnd: '',
        //                 description: 'look after mao mao3 '
        //             },
        //
        //
        //         ]
        //     },
        //     {
        //         id:9,
        //         time: '09:00'
        //     },
        //     {
        //         id:10,
        //         time: '10:00'
        //     },
        //     {
        //         id:11,
        //         time: '11:00'
        //     },
        //     {
        //         id:12,
        //         time: '12:00'
        //     },
        //     {
        //         id:13,
        //         time: '13:00'
        //     },
        //     {
        //         id:14,
        //         time: '14:00'
        //     },
        //     {
        //         id:15,
        //         time: '15:00'
        //     },
        //     {
        //         id:16,
        //         time: '16:00'
        //     },
        //     {
        //         id:17,
        //         time: '17:00'
        //     },
        //     {
        //         id:18,
        //         time: '18:00'
        //     },
        //     {
        //         id:19,
        //         time: '19:00'
        //     },
        //     {
        //         id:20,
        //         time: '20:00'
        //     },
        //     {
        //         id:21,
        //         time: '21:00'
        //     },
        //     {
        //         id:22,
        //         time: '22:00'
        //     },
        //     {
        //         id:23,
        //         time: '23:00'
        //     },
        //     {
        //         id:24,
        //         time: '00:00'
        //     }
        //
        //
        //
        //
        //
        // ],
        showUploadTip: false,
        powerList: [ {
            title: 'calendar',
            tip: 'calendar',
            showItem: false,
            item: [ {
                title: '获取OpenId',
                page: 'getOpenId'
            },
                //  {
                //   title: '微信支付'
                // },
                {
                    title: '生成小程序码',
                    page: 'getMiniProgramCode'
                },
                // {
                //   title: '发送订阅消息',
                // }
            ]
        }, {
            title: '云函',
            tip: '安全、免鉴权运行业务代码',
            showItem: false,
            item: [ {
                title: '获取OpenId',
                page: 'getOpenId'
            },
                //  {
                //   title: '微信支付'
                // },
                {
                    title: '生成小程序码',
                    page: 'getMiniProgramCode'
                },
                // {
                //   title: '发送订阅消息',
                // }
            ]
        }, {
            title: '数据库',
            tip: '安全稳定的文档型数据库',
            showItem: false,
            item: [ {
                title: '创建集合',
                page: 'createCollection'
            }, {
                title: '更新记录',
                page: 'updateRecord'
            }, {
                title: '查询记录',
                page: 'selectRecord'
            }, {
                title: '聚合操作',
                page: 'sumRecord'
            } ]
        }, {
            title: '云存储',
            tip: '自带CDN加速文件存储',
            showItem: false,
            item: [ {
                title: '上传文件',
                page: 'uploadFile'
            } ]
        }, {
            title: '云托管',
            tip: '不限语言的全托管容器服务',
            showItem: false,
            item: [ {
                title: '部署服务',
                page: 'deployService'
            } ]
        } ],
        envList,
        selectedEnv: envList[ 0 ],
        haveCreateCollection: false
    },
    onLoad( options ) {
        this.loadPages(util.getPageTimeBlocks())
    },
    reloadPages() {
        this.loadPages(util.getPageTimeBlocks())
    },
    async loadPages( timeBlocks ) {
        wx.showLoading({
            title: 'loading',
        });
        const openId = wx.getStorageSync('openId')
        const d = await wx.cloud.callFunction({
            name: 'quickstartFunctions',
            config: {
                env: 'cloud1-4ggrpycl7d92f793'
            },
            data: {
                type: 'getOpenId'
            }
        })

        try {
            wx.setStorageSync('openId', d.result.openid)
        } catch (e) {
        }


        const currentLocalDate = this.data.date
        const localDateArray = currentLocalDate.split('/')
        const db = wx.cloud.database()
        const res = await db.collection('memodb').where({
            _openid: openId,
            localStringDay: localDateArray[ 2 ] + '-' + localDateArray[ 1 ] + '-' + localDateArray[ 0 ]
        }).get()
        const data = res.data
        const newTimeBlocks = util.formatTimeBlocktResponse(data, timeBlocks)
        this.setData({ timeBlocks: newTimeBlocks });
        wx.hideLoading();

    },

    onDisplay() {
        this.setData({ showCalendar: true });
    },
    onClose() {
        this.setData({ showCalendar: false });
    },
    onCloseDialog() {
        this.setData({ showDialog: false });
    },
    formatDate( date ) {
        date = new Date(date);
        return date.toISOString()
    },
    onConfirm( event ) {
        this.setData({
            showCalendar: false,
            date: event.detail.toLocaleDateString('en-GB'),
        }, () => {
            this.loadPages(util.getPageTimeBlocks())
        });
    },
    preDay() {

        const currentDate = this.data.date
        const d = currentDate.split('/')
        const day = new Date()
        day.setFullYear(d[2])
        day.setMonth(d[1]-1)
        day.setDate(d[0])
        const preDay = day
        preDay.setDate(preDay.getDate() - 1);
        this.setData({
            date: preDay.toLocaleDateString('en-GB'),
            currentDay: util.getCurrentDay(preDay.toLocaleDateString('en-GB')),
            timeBlocks: util.getPageTimeBlocks()
        }, () => {
            this.loadPages(util.getPageTimeBlocks())
        });

    },
    nextDay() {
        const currentDate = this.data.date
        const d = currentDate.split('/')
        const day = new Date()
        day.setFullYear(d[2])
        day.setMonth(d[1]-1)
        day.setDate(d[0])
        const nextDay = day
        nextDay.setDate(nextDay.getDate() + 1);
        this.setData({
            date: nextDay.toLocaleDateString('en-GB'),
            currentDay: util.getCurrentDay(nextDay.toLocaleDateString('en-GB')),
            timeBlocks: util.getPageTimeBlocks()
        }, () => {
            this.loadPages(util.getPageTimeBlocks())
        });

    },
    createEvent( date ) {
        this.setData({
            showDialog: true
        })

    },
    onClickPowerInfo( e ) {
        const index = e.currentTarget.dataset.index;
        const powerList = this.data.powerList;
        powerList[ index ].showItem = !powerList[ index ].showItem;
        if (powerList[ index ].title === '数据库' && !this.data.haveCreateCollection) {
            this.onClickDatabase(powerList);
        } else {
            this.setData({
                powerList
            });
        }
    },

    onChangeShowEnvChoose() {
        wx.showActionSheet({
            itemList: this.data.envList.map(i => i.alias),
            success: ( res ) => {
                this.onChangeSelectedEnv(res.tapIndex);
            },
            fail( res ) {
                console.log(res.errMsg);
            }
        });
    },

    onChangeSelectedEnv( index ) {
        if (this.data.selectedEnv.envId === this.data.envList[ index ].envId) {
            return;
        }
        const powerList = this.data.powerList;
        powerList.forEach(i => {
            i.showItem = false;
        });
        this.setData({
            selectedEnv: this.data.envList[ index ],
            powerList,
            haveCreateCollection: false
        });
    },

    jumpPage( e ) {
        wx.navigateTo({
            url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
        });
    },

    onClickDatabase( powerList ) {
        wx.showLoading({
            title: '',
        });
        wx.cloud.callFunction({
            time: 'quickstartFunctions',
            config: {
                env: this.data.selectedEnv.envId
            },
            data: {
                type: 'createCollection'
            }
        }).then(( resp ) => {
            if (resp.result.success) {
                this.setData({
                    haveCreateCollection: true
                });
            }
            this.setData({
                powerList
            });
            wx.hideLoading();
        }).catch(( e ) => {
            console.log(e);
            this.setData({
                showUploadTip: true
            });
            wx.hideLoading();
        });
    }
});
