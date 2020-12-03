<style lang="less" scoped>
.page-wrap{
    height:100%;
    width:100%;
    margin:0 auto;
    position: relative;
}
</style>
<template>
    <div class="page-wrap" id="page-wrap">
        <layoutHeader></layoutHeader>
        <layoutMain></layoutMain>
    </div>
</template>
<script>
import layoutHeader from './item/layoutHeader'
import layoutMain from './item/layoutMain'
export default {
    components: {
        layoutHeader,
        layoutMain,
    },
    data() {
        return {

        }
    },
    mounted() {},
}
</script>

