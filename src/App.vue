<style lang="less" scoped>
#app {
    position: relative;
    height: 100%;
    min-height: 100vh;
}
</style>

<template>
    <div id="app">
        <router-view v-if="isRouteAlive"></router-view>
    </div>
</template>

<script>
export default {
    provide() {
        return {
            reload: this.reload,
        }
    },
    data() {
        return {
            isRouteAlive: true,
        };
    },
    mounted() {
        // PC监听多语言切换
        if (this.util.isTLinkPC()) {
            callPc.on("changeLang", (lan) => {
                let language = lan.replace("_", "-");
                console.log("setting pc changeLang:", language);
                this.i18n.locale = language;
                let title = this.$t(`common.${this.$route.meta.title}`);
                document.title = title;
                callPc.callTlinkpc('changeDocTitle',title);
                this.util.setStorage("local", "locale", language);
                this.$store.dispatch("setLanguage", language);
                this.event.eventLanguageInfo.emit(
                    this.event.EVENT_TYPE.UPDATE_LANGUAGE_TIP,
                    language
                );
            });
        }
    },
    methods: {
        reload() {
            this.isRouteAlive = false;
            this.$nextTick(() => {
                this.isRouteAlive = true;
            })
        },
    },
    destroyed() {
        if (this.util.isTLinkPC()) {
            callPc.off("changeLang");
        }
    }
};
</script>
