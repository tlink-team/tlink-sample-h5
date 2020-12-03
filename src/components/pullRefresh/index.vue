<style lang="less" scoped>
.vue-pull-refresh {
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
    overflow-y: scroll;
    transition: transform 0.3s ease-in-out;
    -webkit-overflow-scrolling: touch;
    .loading {
        width: 46px;
        height: 46px;
        display: block;
        margin: 0 auto;
        opacity: 0;
    }
    .pull-wrap{
        height: 100%;
    }
}
</style>

<template>
<div class="scroll vue-pull-refresh" ref="container">
    <div class="pull-wrap">
        <!-- <img src="@/assets/images/loading.gif" alt="star" class="loading"> -->
        <slot name="list"></slot>
    </div>
</div>
</template>

<script>
export default {
    props: {
        next: { // 刷新函数
            type: Function,
            required: true
        },
    },
    data() {
        return {
            flag: 0, // 表示是否达到刷新条件
            loading: 0, // 表示是否正在刷新中
            touchStart: 0, // 手指触摸屏幕的起点
            distance: 0 // 手指滑动的距离
        }
    },
    mounted() {
        // 执行下拉刷新
        if (this.$route.meta.enablePullDownRefresh) {
            this.startPullRefresh();
        }
    },
    methods: {
        startPullRefresh() {
            const container = this.$refs.container
            container.addEventListener('touchstart', (e) => {
                // 如果loading为true就代表刷新函数正在进行，此时阻止下拉操作，返回
                if (this.loading) {
                    e.preventDefault()
                    return
                }
                // 取第一个手指的触摸点作为起始点
                this.touchStart = e.targetTouches[0].clientY
            })
            container.addEventListener('touchmove', (e) => {
                // 如果没有触摸起始点，返回
                if (!this.touchStart) {
                    return
                }
                if (this.loading) {
                    e.preventDefault()
                    return
                }
                const touch = e.targetTouches[0]
                const scrollTop = container.scrollTop;
                if (scrollTop < 10) {
                    this.distance = touch.clientY - this.touchStart
                    if (this.distance > 0) {
                        e.preventDefault()
                        if (this.distance < 80) {
                            container.style.overflow = 'inherit'
                            container.style.transform = 'translate3D(0px, ' + this.distance + 'px, 0px)'
                            if (this.distance > 55) {
                                this.flag = 1
                            }
                        }
                    }
                }
            })
            container.addEventListener('touchend', (e) => {
                if (this.distance === 0) {
                    return
                }
                if (this.loading) {
                    e.preventDefault()
                    return
                }

                if (this.flag && this.distance > 0) {
                    container.style.transform = 'translate3D(0px, 50px, 0px)'
                    this.loading = 1
                    this.next().then(() => {
                        console.log('next')
                        this.flag = 0
                        this.loading = 0
                        container.scrollTop = 0
                        container.style.overflow = 'auto'
                        container.style.transform = 'translate3D(0px, 0px, 0px)'
                    })
                    return
                }
                // 重置变量
                this.flag = 0
                container.style.overflow = 'auto'
                container.style.transform = 'translate3D(0px, 0px, 0px)'
            })
        },
    },
}
</script>
