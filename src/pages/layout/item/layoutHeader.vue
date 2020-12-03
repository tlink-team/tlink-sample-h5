<style lang="less" scoped>
    .page-head {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        width: 100%;
        height: 44px;
        line-height: 30px;
        padding: 7px 3px;
        display: flex;
        overflow: hidden;
        -webkit-box-pack: justify;
        justify-content: space-between;
        box-sizing: border-box;
        z-index: 999;
        color: #000;
        background-color: #fff;
        transition-property: all;
        text-align: center;
        margin: auto;
        border-bottom: 1px solid #ededed;
        /* 禁止选中文本 */
        -webkit-user-select: none;
        user-select: none;
        .page-head-bd {
            position: absolute;
            left: 80px;
            right: 80px;
            user-select: none;
            min-width: 0;
            font-size: 18px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .page-head-hd {
            display: flex;
            align-items: center;
            font-size: 14px;
            .tui-page-head-btn {
                display: flex;
                align-items: center;
                .t-icon {
                    -webkit-text-stroke: 1.2px #fff;
                    font-size: 2.2em;
                }
            }
        }
        .page-head-custom {
            position: absolute;
            display: flex;
            align-items: center;
            right: 14px;
            top: 0;
            bottom: 0;
            z-index: 5;
            i {
                margin-left: 10px;
            }
            .t-icon-custom-refresh {
                font-size: 28px;
                cursor: pointer;
            }
        }
        .mr5 {
            margin-right: 5px;
        }
    }
</style>
<template>
    <div class="page-head" v-if="util.isShowNav()">
        <div class="page-head-hd cursor">
            <div class="tui-page-head-btn">
                <i
                    class="t-icon t-icon-arrowleft mr5"
                    id="back-to-prev"
                    @click.stop="backToPrev"
                ></i>
            </div>
        </div>
        <div class="page-head-bd">{{ title }}</div>
        <div class="page-head-custom">
            <i
                class="iconfont iconshuaxin t-icon-custom-refresh"
                @click.stop="refreshBtn"
                id="refresh-btn"
                v-if="enableShowRefreshBtn"
            ></i>
            <i
                class="t-icon t-icon-more-filled"
                @click.stop="tVeiwMore"
                id="t-view-more"
                v-if="moreNView"
            ></i>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                title: "",
                moreNView: this.$route.meta.moreNView,
                enableShowRefreshBtn: this.$route.meta.enableShowRefreshBtn,
            };
        },
        watch: {
            $route(to) {
                this.title = to.meta.title
                    ? this.$t(`common.${to.meta.title}`)
                    : "";
                document.title = this.title;
                this.moreNView = to.meta.moreNView;
                this.enableShowRefreshBtn = to.meta.enableShowRefreshBtn;
                try {
                    if (this.util.isTLinkPC()) {
                        setTimeout(() => {
                            callPc.callTlinkpc("changeDocTitle", this.title);
                        }, 100);
                    } else if (this.util.isTLinkMobile()) {
                        this.cordovaExec
                            .modifyNativeTitle([this.title])
                            .then(() => {
                                console.log("移动端修改标题成功");
                            })
                            .catch((err) => {
                                console.log("移动端修改标题失败err:", err);
                            });
                    }
                } catch (error) {
                    console.log("切换标题异常err:", err);
                }

                console.log("watch title:", this.title);
            },
        },
        mounted() {
            this.title = this.$route.meta.title
                ? this.$t(`common.${this.$route.meta.title}`)
                : "";
            document.title = this.title;
            try {
                if (this.util.isTLinkPC()) {
                    setTimeout(() => {
                        callPc.callTlinkpc("changeDocTitle", this.title);
                    }, 100);
                } else if (this.util.isTLinkMobile()) {
                    this.cordovaExec
                        .modifyNativeTitle([this.title])
                        .then(() => {
                            console.log("移动端修改标题成功");
                        })
                        .catch((err) => {
                            console.log("移动端修改标题失败err:", err);
                        });
                }
            } catch (error) {
                console.log("切换标题异常err:", err);
            }
            console.log("mounted title:", this.title);
        },
        computed: {
            locale() {
                return this.$store.state.common.locale;
            },
        },
        methods: {
            tVeiwMore() {
                console.log("tVeiwMore");
                this.$store.dispatch("setShowMore", true);
            },
            backToPrev() {
                if (this.$route.meta && this.$route.meta.isMode) {
                    this.$router.go(-1);
                } else {
                    this.cordovaExec
                        .goBack()
                        .then((res) => {
                            if (res.code == "1000") {
                                this.tip.toast({
                                    content: res.msg,
                                    type: "alert",
                                });
                                return;
                            }
                        })
                        .catch((err) => {
                            this.tip.alert({
                                content: `返回上一级失败`,
                            });
                            console.log("closeApp err:", err);
                        });
                }
                console.log("backToPrev:", this.$route);
            },
            refreshBtn() {
                this.event.eventpullRefreshInfo.emit(
                    this.event.EVENT_TYPE.PULL_REFRESH
                );
            },
        },
    };
</script>
