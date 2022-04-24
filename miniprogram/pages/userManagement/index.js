import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";

const util = require('../../util/util.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        openId: '',
        myTeams: '',
        hasTeam: false,
        addingTeam: false,
        myTeamId: '',
        newMemberId: '',
        myTeamLeader: ''
    },

    async onLoad( options ) {
        let openId = await util.getOpenId()
        await this.loadTeam()
        this.setData({
            openId: openId
        })
    },
    async loadTeam() {

        wx.showLoading({
            title: 'loading',
        });
        let openId = await util.getOpenId()
        const db = wx.cloud.database()
        const myTeamsRes = await db.collection('team').where({
            leader: openId,
        }).get()

        if (!myTeamsRes || !myTeamsRes.data || myTeamsRes.data.length === 0) {
            const myTeamLeader = await util.getMyLeader(openId)
            this.setData({
                myTeams: '',
                hasTeam: false,
                myTeamLeader: myTeamLeader
            })

        } else {
            this.setData({
                myTeams: myTeamsRes.data[ 0 ].members,
                hasTeam: true,
                myTeamId: myTeamsRes.data[ 0 ]._id,
            })
        }


        wx.hideLoading()

    },
    async createTeam() {
        let openId = await util.getOpenId()
        const myLeaderOpenId = ( await util.getMyLeader(openId) )


        if (myLeaderOpenId && myLeaderOpenId !== openId) {
            Toast({
                type: 'success',
                message: '你已经被加入其它小组， 不能创建小组',
                onClose: () => {
                    this.loadTeam()
                },
            });
            return
        }

        const db = wx.cloud.database()
        const myTeamsRes = await db.collection('team').where({
            leader: openId,
        }).get()
        if (!myTeamsRes || !myTeamsRes.data || myTeamsRes.data.length === 0) {
            await db.collection('team').add({
                data: {
                    leader: openId,
                    members: []
                }

            })
        }

        Toast({
            type: 'success',
            message: '创建成功',
            onClose: () => {
                this.loadTeam()
            },
        });

    },
    copyText: function () {
        let that = this
        wx.setClipboardData({
            data: that.data.openId,
            success( res ) {
                console.log(res)
            }
        })
    },
    addTeam: function () {
        this.setData({
            addingTeam: true
        })
    },
    onCreateNewMember: function ( e ) {
        this.setData({
            newMemberId: e.detail
        });
    },
    removeMember: async function ( e ) {
        const member = e.currentTarget.dataset.name.trim()

        const db = wx.cloud.database()

        const myTeamsRes = await db.collection('team').where({
            _id: this.data.myTeamId,
        }).limit(1).get()
        const myCurrentTeams = myTeamsRes.data[ 0 ].members
        myCurrentTeams.splice(myCurrentTeams.indexOf(member), 1)
        const t = this
        wx.showModal({
            title: '',
            content: '确认删除？',
            async success( res ) {
                if (res.confirm) {
                    await db.collection('team').where({
                        _id: t.data.myTeamId
                    })
                        .update({
                            data: {
                                members: myCurrentTeams
                            },
                        }).catch(err => {
                            Toast({
                                type: 'fail',
                                message: '删除失败',
                                onClose: () => {
                                    this.loadTeam()
                                },
                            });
                            return
                        })

                    t.setData({
                        addingTeam: false,
                        newMemberId: '',
                        myTeams: myCurrentTeams
                    }, () => {
                        Toast({
                            type: 'success',
                            message: '删除成功',
                            onClose: () => {
                                t.loadTeam()
                            },
                        });
                    })

                } else if (res.cancel) {

                    console.log('用户点击取消')
                }
            }
        })


    },

    deleteMyTeam: async function () {
        const t = this
        this.setData({
                addingTeam: false,
                newMemberId: ''
            }, () => {
                wx.showModal({
                    title: '',
                    content: '确认删除？',
                    async success( res ) {
                        if (res.confirm) {
                            const db = wx.cloud.database()
                            await db.collection('team').where({
                                _id: t.data.myTeamId,
                            }).remove();
                            Toast({
                                type: 'success',
                                message: '删除成功',
                                onClose: () => {
                                    t.loadTeam()
                                },
                            });
                        }
                    }
                })

            }
        )

    },


    saveNewTeamMember: async function () {
        const db = wx.cloud.database()

        const myTeamsRes = await db.collection('team').where({
            _id: this.data.myTeamId,
        }).limit(1).get()
        const myCurrentTeams = myTeamsRes.data[ 0 ].members

        if (myCurrentTeams.includes(this.data.newMemberId)) {
            this.setData({
                    addingTeam: false,
                    newMemberId: ''
                },

                () => {
                    Toast({
                        type: 'fail',
                        message: '组员已存在',
                        onClose: () => {
                            this.loadTeam()
                        },
                    });
                }
            )
            return
        }

        const HisLeaderOpenId = ( await util.getMyLeader(this.data.newMemberId) )
        console.log('HisLeaderOpenId', HisLeaderOpenId)
        if (HisLeaderOpenId && HisLeaderOpenId !== await util.getOpenId()) {
            Toast({
                type: 'fail',
                message: '该成员已经加入另外小组， 请删除后再添加， 每个组员只能加入一个小组',
                onClose: () => {
                    this.loadTeam()
                },
            });
            return
        }

        myCurrentTeams.push(this.data.newMemberId)

        await db.collection('team').where({
            _id: this.data.myTeamId
        })
            .update({
                data: {
                    members: myCurrentTeams
                },
            }).catch(err => {
                Toast({
                    type: 'fail',
                    message: '新成员添加失败',
                    onClose: () => {
                        this.loadTeam()
                    },
                });
                return
            })


        this.setData({
            addingTeam: false,
            newMemberId: ''
        }, () => {
            Toast({
                type: 'success',
                message: '新成员加入成功',
                onClose: () => {
                    this.loadTeam()
                },
            });
        })
    }
});
