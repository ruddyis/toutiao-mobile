<template>
  <div id="wrapper" ref="wrapper">
    <div
      class="scroll-wrapper"
      ref="scrollWrapper"
      :class="{ transition: isTransition }"
    >
      <div class="pull-down-box" v-if="this.value && this.isPullDownShow">
        <div class="pull-down">
          <img v-lazy="isShrinked ? refreshImg : loadImg" alt="" />
        </div>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
      <div class="pull-up-box" v-if="this.value && this.isPullUpShow">
        <div class="pull-up">
          <img v-lazy="loadImg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IScroll from 'iscroll/build/iscroll-probe'
export default {
  name: 'ScrollView',
  props: {
    value: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  methods: {
    refresh () {
      setTimeout(() => {
        this.iscroll.refresh()
      }, 100)
    },
    scrolling (fn) {
      this.iscroll.on('scroll', function () {
        fn(this.y)
      })
    },
    scrollTo (x, y, time) {
      this.iscroll.scrollTo(x, y, time)
    }, // 最好不要刚给scrollTo传递时间，可能是因为scrollTo内部是setInternal？传递时间后重新滚动有bug
    scrollEnd (fn) {
      this.iscroll.on('scrollEnd', function () {
        fn()
      })
    }
  },
  data () {
    return {
      isPullDownShow: false,
      isPullUpShow: false,
      pageHeight: 0, // 可视高度
      contentHeight: 0, // 页面元素高度
      isShrinked: true, // 选择下移标识图片
      loadImg:
        'https://img.lanrentuku.com/img/allimg/1212/5-121204193R5-50.gif',
      refreshImg:
        'https://s.cn.bing.net/th?id=OIP.fDBrKAm7YOFweVMG2A0VqgAAAA&w=183&h=183&c=7&qlt=90&bgcl=ececec&o=6&pid=PersonalBing',
      isTransition: false,
      isPullDownData: false, // 下拉是否达到进行刷新数据的状态
      isPullUpData: false, // 上拉是否达到加载数据的状态
      isBackTop: true // 当上拉加载数据之后是否需要返回顶部
    }
  },
  mounted () {
    this.iscroll = new IScroll(this.$refs.wrapper, {
      onmousewheel: true,
      scrollbars: false,
      probeType: 3,
      scrollX: false,
      ScrollY: true,
      disablePointer: true,
      disableTouch: false,
      disableMouse: true,
      click: true
    })

    const scrollWrapper = document.querySelector('.scroll-wrapper')
    const contentWrapper = document.querySelector('.content')
    // 1.创建一个观察者对象
    const observer = new MutationObserver((mutationList, observer) => {
      this.iscroll.refresh()
      scrollWrapper.style.marginTop = '0px'

      // iscroll返回顶部
      if (this.isBackTop) {
        this.iscroll.scrollTo(0, 0)
        this.isBackTop = false
      }

      // console.log(
      //   'MutationObserver中',
      //   this.value,
      //   '父组件v-model给子组件的值为true，同时在异步方法和同步方法中设置v-model的数据的值为false，为何只在异步方法传递的值显示在MutationObserver中为false，同步方法设置的false在MutationObserver不表现？且无论是同步方法还是异步方法设置的false，而MutationObserver外都是最开始传递的v-model值true？异步和同步在MutationObserver中的区别？'
      // )

      // 获取实际高度（包括滚动距离）
      // 必须在此处获取：因为MutationObserver中时时监听节点变化，在MutationObserver外获取是固定值，则会无限执行下列if条件内的事件
      this.contentHeight = scrollWrapper.offsetHeight
      if (this.isPullUpShow) {
        if (this.contentHeight < this.pageHeight) {
          // if (scrollWrapper.offsetHeight < this.pageHeight) {
          // 页面元素不铺满一页
          this.$emit('load')
          // console.log(this.contentHeight, this.pageHeight)
        }
      }
      if (scrollWrapper.offsetHeight < 1) {
        console.log('页面无任何元素')
      }
    })
    // 2.告诉观察者对象我们需要观察什么内容
    const config = {
      childList: true,
      subtree: true,
      attributeFilter: ['height', 'offsetHeight']
    }
    // 3.告诉观察者对象，我们需要观察谁，观察什么对象
    observer.observe(this.$refs.wrapper, config)

    // console.log('MutationObserver外', this.value)
    // this.value为true表示是加载模式,即排除之前设置的三联选择器模式
    if (this.value) {
      // 获得页面的可视高度
      const pageDom = document.querySelector('#wrapper')
      this.pageHeight = Math.ceil(pageDom.getBoundingClientRect().height)

      const that = this
      this.iscroll.on('scroll', function () {
        // 下拉刷新和上拉加载操作
        if (this.y > 200) {
          // 关于下拉刷新
          if (that.isPullDownShow) {
            scrollWrapper.style.marginTop = this.y + 'px'
            that.isShrinked = false
            // 获取下拉更新数据
            that.isPullDownData = true
          }
        } else if (this.y < 0) {
          // 上拉加载模式
          if (that.isPullUpShow) {
            scrollWrapper.style.marginTop = 0 + 'px'
            that.isShrinked = true
            that.isTransition = true
            if (Math.abs(this.y) + that.pageHeight > that.contentHeight) {
              // 到达滚动条底部，获取上拉加载数据
              that.isPullUpData = true
              // console.log(that.isPullUpShow)
            }
          }
        }
      })
      this.iscroll.on('scrollEnd', function () {
        if (that.isPullDownData) {
          // console.log('scrollEnd下拉刷新', that.isPullDownData)
          // 执行下拉刷新操作
          that.$emit('refresh')
          // 执行完毕下拉刷新操作之后，恢复原先状态
          that.isPullDownData = false
        } else if (that.isPullUpData) {
          // console.log('scrollEnd上拉加载', that.isPullUpData)
          // 执行上拉加载操作
          that.$emit('load')

          // 加载完成之后附加的说明段落语句
          const contentOver = document.createElement('p')
          contentOver.innerHTML = '加载完成'
          contentOver.style.fontSize = 'larger'
          contentOver.style.textAlign = 'center'
          contentOver.style.color = 'black'

          contentWrapper.appendChild(contentOver)
          setTimeout(function () {
            contentWrapper.removeChild(contentOver)
          }, 1000)

          // 执行完毕上拉加载操作之后，恢复原先状态
          that.isPullUpData = false
        }
      })
    }
  },
  created () {
    if (this.$listeners.load) {
      this.isPullUpShow = true
      this.$emit('load')
    }
    if (this.$listeners.refresh) {
      this.isPullDownShow = true
    }
  }
}
</script>

<style lang="less" scoped>
#wrapper {
  width: 100%;
  height: 100%;
  .scroll-wrapper {
    width: 100%;
    position: relative;
    &.transition {
      transition: top 0.5s ease-in 0s;
    }
    .content {
      &::after {
        content: '-';
        display: inline-block;
        color: #fff;
        width: 100%;
        height: 30px;
      }
    }
    .pull-down,
    .pull-up {
      position: absolute;
      margin-left: 50%;
      transform: translateX(-50%);
      top: -35px;
      img {
        width: 20px;
        height: 20px;
      }
    }
    .pull-up {
      width: 100px;
      top: unset;
      bottom: 3px;
      text-align: center;
    }
    .textOver {
      background: red;
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }
}
</style>

//
要点一：使用该组件的下拉刷新上拉加载功能，必须传入一个model，即该组件会询问想要使用该功能的用户：是否是上拉加载下拉刷新模式，这时应该传入是的答案。
即在父组件中给子组件传入
v-model='参数',而参数在父组件中答案为“是”，子组件中的props用value接收 //
要点二：使用该组件的父组件必须给该组件传递上拉加载办法=> load
，以及下拉刷新方法=> refresh 。 //
未解决的问题，若前文this.iscroll.scrollTo(0，0)执行，当上拉数据加载之后iscroll会滚回顶部，而该功能不需要滚回顶部
