<style lang="less" scoped>
    .page {
        width: 100%;
        min-height: 100%;
        position: relative;
        .work {
            width: 100%;
            max-width: 750px;
            height: auto;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
        }
    }
</style>

<template>
    <div class="page">
        <img
            src="../../assets/images/sample/04@2x.jpg"
            alt="work"
            class="work"
        />
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        created() {
            console.log("sample-02:", this.$t("common.tip2"));
        },
        mounted() {},
        methods: {},
    };
</script>
