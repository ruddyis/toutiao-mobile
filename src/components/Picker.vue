
<template>
  <div class="choose">
    <div class="choose-list">
      <Header class="header">
        <div slot="left" class="left" @click.stop="closeChooseList">取消</div>
        <div slot="center" class="center">
          {{ toFatherData }}
        </div>
        <div slot="right" class="header-right" @click.stop="backEdit">确定</div>
      </Header>
      <div class="list-wrapper">
        <ScrollView class="scroll-view" ref="ScrollViewOne">
          <ul class="list-items" slot="content">
            <li
              class="item"
              v-for="(value, index) in this.childData[0]"
              :key="index"
              :data-index="index"
              :class="{ 'active-one': currentLeftIndex === index }"
              :ref="`left${index}`"
            >
              {{ value }}
            </li>
          </ul>
        </ScrollView>
        <ScrollView class="scroll-view" ref="ScrollViewTwo">
          <ul class="list-items" slot="content">
            <li
              class="item"
              v-for="(value, index) in this.childData[1]"
              :key="index"
              :class="{ 'active-two': currentCenterIndex === index }"
              :ref="`center${index}`"
            >
              {{ value }}
            </li>
          </ul>
        </ScrollView>
        <ScrollView class="scroll-view" ref="ScrollViewThree">
          <ul class="list-items" slot="content">
            <li
              class="item"
              v-for="(value, index) in birthdayDay"
              :key="index"
              :class="{ 'active-three': currentRightIndex === index }"
              :ref="`right${index}`"
            >
              {{ value }}
            </li>
          </ul>
        </ScrollView>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header'
import ScrollView from './ScrollView'
import { mapActions } from 'vuex'
export default {
  name: 'Picker',
  components: {
    Header,
    ScrollView
  },
  methods: {
    ...mapActions(['setChooseList', 'setBirthday']),
    _hideChooseList () {
      this.setChooseList(false)
      // console.log(this.childData)
    },
    closeChooseList () {
      this._hideChooseList()
    },
    backEdit () {
      this._hideChooseList()
      this.setBirthday(this.toFatherData)
    }
  },
  data () {
    return {
      currentLeftIndex: 0,
      scrollLeftY: 0,
      factLeftOffsetY: 0,
      leftLoneTop: 0,

      currentCenterIndex: 0,
      scrollCenterY: 0,
      factCenterOffsetY: 0,
      centerLoneTop: 0,

      currentRightIndex: 0,
      scrollRightY: 0,
      factRightOffsetY: 0,
      rightLoneTop: 0
    }
  },
  props: {
    childData: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  computed: {
    birthdayDay () {
      var birthdayDay = []
      var days = new Date(this.switchLeft, this.switchCenter, 0).getDate()
      var day
      for (let i = 1; i < days; i++) {
        if (i < 11) {
          day = Math.round('0' + i)
        } else {
          day = i
        }
        birthdayDay.push(day)
      }
      return birthdayDay
    },
    leftNum () {
      const leftNum = this.childData[0].length
      // console.log(leftNum)
      return leftNum
    },
    centerNum () {
      const centerNum = this.childData[1].length
      return centerNum
    },
    rightNum () {
      const rightNum = this.birthdayDay.length
      return rightNum
    },
    switchLeft () {
      const leftText = this.childData[0][this.currentLeftIndex]
      return leftText
    },
    switchCenter () {
      const centerText = this.childData[1][this.currentCenterIndex]
      return centerText
    },
    switchRight () {
      const rightText = this.birthdayDay[this.currentRightIndex]
      return rightText
    },
    toFatherData () {
      const data = [this.switchLeft, this.switchCenter, this.switchRight]
      return data.join('-')
    }
  },
  mounted () {
    this.$refs.ScrollViewOne.scrolling(y => {
      this.scrollLeftY = y
      // console.log(this.scrollY)
      const leftFirstItemTop = this.$refs.left0[0].offsetTop // 第一个元素距离父元素顶部的高度
      const leftLastItemTop = this.$refs[`left${this.leftNum - 1}`][0].offsetTop // 最后一个元素距离父元素顶部的高度
      const leftAllBetweenTop = leftLastItemTop - leftFirstItemTop // 最后一个元素距离第一个元素的高度差
      this.leftLoneTop = leftAllBetweenTop / (this.leftNum - 1) // 单独移动至上一个元素位置的高度(-1是因为第一个元素距离父元素为0)
      this.currentLeftIndex = Math.round(
        Math.abs(this.scrollLeftY) / this.leftLoneTop
      )
    })
    this.$refs.ScrollViewOne.scrollEnd(() => {
      this.$refs.ScrollViewOne.scrollTo(
        0,
        -(this.currentLeftIndex * this.leftLoneTop)
      )
    })
    this.$refs.ScrollViewTwo.scrolling(y => {
      this.scrollCenterY = y
      const centerFirstItemTop = this.$refs.center0[0].offsetTop
      const centerLastItemTop = this.$refs[`center${this.centerNum - 1}`][0]
        .offsetTop
      const centerAllBetweenTop = centerLastItemTop - centerFirstItemTop
      this.centerLoneTop = centerAllBetweenTop / (this.centerNum - 1)
      this.currentCenterIndex = Math.round(
        Math.abs(this.scrollCenterY) / this.centerLoneTop
      )
    })
    this.$refs.ScrollViewTwo.scrollEnd(() => {
      this.$refs.ScrollViewTwo.scrollTo(
        0,
        -(this.currentCenterIndex * this.centerLoneTop)
      )
    })
    this.$refs.ScrollViewThree.scrolling(y => {
      this.scrollRightY = y
      const rightFirstItemTop = this.$refs.right0[0].offsetTop
      const rightLastItemTop = this.$refs[`right${this.rightNum - 1}`][0]
        .offsetTop
      const rightAllBetweenTop = rightLastItemTop - rightFirstItemTop
      this.rightLoneTop = rightAllBetweenTop / (this.rightNum - 1)
      this.currentRightIndex = Math.round(
        Math.abs(this.scrollRightY) / this.rightLoneTop
      )
    })
    this.$refs.ScrollViewThree.scrollEnd(() => {
      this.$refs.ScrollViewThree.scrollTo(
        0,
        -(this.currentRightIndex * this.rightLoneTop)
      )
    })
  }
}
</script>

<style lang="less" scoped>
.choose {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  .choose-list {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    background: white;
    .header {
      background: white;
      margin-bottom: 15px;
      box-sizing: border-box;
      .center {
        font-size: 15px;
      }
      .left,
      .header-right {
        font-size: 13px;
        color: #1989fa;
      }
    }
    .list-wrapper {
      height: 200px;
      display: flex;
      justify-content: space-between;
      top: 65px;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: hidden;
      .scroll-view {
        width: 33%;
        height: 100%;
        text-align: center;
        .list-items {
          width: 100%;
          padding: 70px 0;
          box-sizing: border-box;
          .item {
            height: 45px;
            width: 100%;
            line-height: 45px;
            margin-bottom: 15px;
            box-sizing: border-box;
            font-size: 20px;
            color: rgba(0, 0, 0, 0.3);
            &.active-one,
            &.active-two,
            &.active-three {
              color: rgba(0, 0, 0, 1);
            }
          }
        }
      }
    }
  }
}
</style>