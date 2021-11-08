<template>
  <div class="collect">
    <!-- <div class="no-item" v-if="isNoItem"><span>没有更多了</span></div> -->
    <!-- <ul class="items" v-else> -->
    <ul class="items">
      <li class="item" v-for="(value, index) in detailData" :key="index">
        <div class="item-top">
          <div class="avatar">
            <img src="../../../assets/images/avatar.jpg" alt="" />
          </div>
          <div class="avatar-tip">
            <span class="tip-name">{{ value.aut_name }}</span>
            <span class="tip-time">{{ value.pubdate }}</span>
          </div>
        </div>
        <div class="item-middle" v-if="value.cover.images[0]">
          <div class="middle-left">
            {{ value.title }}
          </div>
          <img class="middle-right" v-lazy="value.cover.images[0]" />
        </div>
        <div class="item-middle" v-else>
          <div class="middle-left">
            {{ value.title }}
          </div>
        </div>
        <ul class="item-bottom">
          <li class="bottom-item">
            <i class="iconfont icon-pinglun"></i>
            <span>{{ value.comm_count }}</span>
          </li>
          <li class="bottom-item">
            <i class="iconfont icon-dianzan"></i>
            <span>{{ value.like_count }}</span>
          </li>
          <li class="bottom-item">
            <i class="iconfont icon-shoucang"></i>
            <span>{{ value.collect_count }}</span>
          </li>
        </ul>
      </li>
      <!-- <li class="no-item" v-if="isFinallNoItem">
        <span>没有更多了</span>
      </li> -->
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CollectOrHistory',
  computed: {
    ...mapGetters(['collectOrHistory', 'collectData', 'historyData']),
    // isNoItem () {
    //   if (this.detailData.length <= 0) {
    //     return true
    //   } else {
    //     return false
    //   }
    // },
    // isFinallNoItem () {
    //   return false
    // },
    detailData () {
      let detailData = []
      if (this.collectOrHistory === 0) {
        detailData = this.collectData
      } else if (this.collectOrHistory === 1) {
        detailData = this.historyData
      }
      return detailData
    }
  }
}
</script>

<style lang="less" scoped>
.collect {
  // width: 100%;
  // overflow: hidden;
  .no-item {
    // width: 100%;
    text-align: center;
    margin-top: 10px;
    box-sizing: border-box;
    span {
      font-size: 13px;
    }
  }
  .items {
    width: 100%;
    .item {
      width: 100%;
      background: white;
      // background: red;
      margin-bottom: 5px;
      box-sizing: border-box;
      .item-top {
        width: 100%;
        height: 50px;
        display: flex;
        padding: 5px;
        box-sizing: border-box;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          border: 1px solid white;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 10px;
          img {
            width: 40px;
            height: 40px;
          }
        }
        .avatar-tip {
          display: flex;
          flex-direction: column;
          .tip-name {
            font-size: 15px;
            margin-bottom: 3px;
          }
          .tip-time {
            font-size: 13px;
          }
        }
      }
      .item-middle {
        display: flex;
        justify-content: space-between;
        padding: 5px 20px 5px 10px;
        .middle-left {
          font-size: 15px;
          margin-right: 10px;
          box-sizing: border-box;
        }
        .middle-right {
          height: 80px;
          width: auto;
          max-width: 40%;
          border: 1px solid white;
        }
      }
      .item-bottom {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 30px;
        .bottom-item {
          width: 33%;
          text-align: center;
          line-height: 30px;
          i {
            font-size: 15px;
            margin-right: 5px;
            box-sizing: border-box;
          }
          &:nth-child(2) {
            i {
              font-size: 18px;
            }
          }
          &:nth-child(3) {
            i {
              font-size: 20px;
            }
          }
        }
      }
    }
    // &::after {
    //   content: 'none';
    //   width: 100%;
    //   height: 90px;
    //   background: red;
    // }
    // .no-item {
    //   width: 100%;
    //   text-align: center;
    //   margin-top: 10px;
    //   span {
    //     font-size: 13px;
    //   }
    // }
  }
}
</style>
