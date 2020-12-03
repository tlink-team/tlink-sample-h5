<style lang="less" scoped>
@import "../../../assets/less/variables.less";

.main-wrap {
    /* 禁止选中文本 */
    -webkit-user-select: text;
    user-select: text;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    //overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    &.is-iphonex{
        bottom: 34px;
    }
    .main-content{
        height: 100%;
    }
}
</style>
<template>
<div class="main-wrap" :class="{'is-iphonex':util.isIphoneX()}" :style="{'top':util.isShowNav()?'44px':0}">
    <!-- 下拉刷新 -->
    <pull-refresh :next="refresh">
        <div slot="list" class="main-content" ref="mainContent">
            <router-view></router-view>
        </div>
    </pull-refresh>
</div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    computed: {
        locale() {
            return this.$store.state.common.locale;
        },
    },
    created() {
       
    },
    mounted() {},
    methods: {
        refresh() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.event.eventpullRefreshInfo.emit(this.event.EVENT_TYPE.PULL_REFRESH);
                    resolve();
                    console.log("refresh");
                }, 1500)
            });
        },
    },
}
</script>
