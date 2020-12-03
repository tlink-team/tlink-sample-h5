<style lang="less" scoped>
    @import "../../assets/less/variables.less";
    .page {
        width: 100%;
        min-height: 100%;
        background: linear-gradient(
            180deg,
            @primaryColor 0%,
            @primaryDarkColor 100%
        );
        position: relative;
        .logo {
            width: 40%;
            max-width: 240px;
            height: auto;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            z-index: 5;
        }
        .top {
            width: 100%;
            height: 3.77rem;
            position: absolute;
            right: 0;
            top: 0;
            z-index: 1;
        }
        .bottom {
            width: 100%;
            height: 2.33rem;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            z-index: 1;
        }
    }
</style>

<template>
    <div class="page">
        <img
            src="../../assets/images/sample/01@2x.png"
            alt="logo"
            class="logo"
            @click="jump"
        />
        <img
            src="../../assets/images/sample/02@2x.png"
            alt="logo"
            class="top"
        />
        <img
            src="../../assets/images/sample/03@2x.png"
            alt="logo"
            class="bottom"
        />
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        created() {
            console.log(
                "sample-01:",
                this.$t("common.tip1"),
                this.$store.state.common.locale
            );
        },
        mounted() {},
        methods: {
            jump() {
                this.$router.push({ name: "sample" });
            },
            getSample() {
                this.api
                    .sample({
                        query: {
                            param1: 1,
                            param2: 2,
                        },
                    })
                    .then((res) => {
                        if (res && res.code == "0") {
                            console.log("请求成功");
                        }
                    })
                    .catch((err) => {
                        console.log("请求异常");
                    });
            },
        },
    };
</script>
