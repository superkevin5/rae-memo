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
        showUpdateEvent: false,
        calendarMinDate: new Date(2020, 0, 1).getTime(),
        calendarMaxDate: new Date(2025, 0, 1).getTime(),
        timeBlocks: util.getPageTimeBlocks(),

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
        let res2 = {'data': []}
        if(res.data.length === 20) {
            res2 = await db.collection('memodb').where({
                _openid: openId,
                localStringDay: localDateArray[ 2 ] + '-' + localDateArray[ 1 ] + '-' + localDateArray[ 0 ]
            }).skip(20).get()
        }

        const data = res.data
        const data2 = res2.data
        const newTimeBlocks = util.formatTimeBlocktResponse([...data,...data2], timeBlocks)
        console.log('newTimeBlocks', newTimeBlocks)
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
    onCloseUpdateEvent() {
        this.setData({
            showUpdateEvent: false
        })
    },
    longPressEvent(e) {
        if (e && e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.eventId) {
            this.setData({
                showUpdateEvent: true,
                eventIdInUpdating: e.currentTarget.dataset.eventId
            })
        }
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
