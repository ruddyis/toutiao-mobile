// 只有非Vant版本
<template>
  <div class="me-top">
    <div class="top-avatar">
      <div class="left">
        <div class="avatar">
          <img class="avatar-img" :src="currentUser.photo" alt="" />
        </div>
        <div class="name-box">
          <p class="name">{{currentUser.name}}</p>
          <p class="tip" @click="edit">编辑资料</p>
        </div>
      </div>
      <div class="right">
        <i class="book iconfont icon-yuedu"></i>
        <div class="book-tip">
          <i>今日阅读</i>
          <i>5分钟</i>
        </div>
      </div>
    </div>
    <ul class="top-list">
      <li class="list-item">
        <span class="item-num">{{currentUser.art_count}}</span>
        <span class="item-name">头条</span>
      </li>
      <li class="list-item">
        <span class="item-num">{{currentUser.follow_count}}</span>
        <span class="item-name">关注</span>
      </li>
      <li class="list-item">
        <span class="item-num">{{currentUser.fans_count}}</span>
        <span class="item-name">粉丝</span>
      </li>
      <li class="list-item">
        <span class="item-num">{{currentUser.like_count}}</span>
        <span class="item-name">获赞</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MeTop',
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    edit () {
      this.$router.push('/UserProfile')
    }
  }
}
</script>

<style lang="less" scoped>
.me-top {
  width: 100%;
  height: 200px;
  background: url('../../assets/images/banner.png') no-repeat;
  background-size: cover;
  .top-avatar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 50px 0 0 20px;
    box-sizing: border-box;
    .left {
      width: 60%;
      //   background: black;
      display: flex;
      align-items: center;
      .avatar {
        width: 60px;
        height: 60px;
        border: 3px solid white;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 20px;
        .avatar-img {
          width: 60px;
          height: 60px;
        }
      }
      .name-box {
        .name {
          color: white;
          font-size: 15px;
        }
        .tip {
          height: 20px;
          font-size: 10px;
          line-height: 20px;
          background: white;
          border-radius: 10px;
          color: #1989fa;
          padding-left: 5px;
          padding-right: 5px;
          text-align: center;
        }
      }
    }
    .right {
      display: flex;
      justify-content: space-between;
      .book {
        width: 40px;
        height: 40px;
        font-size: 20px;
        color: rgba(255, 255, 255, 0.8);
        line-height: 40px;
        text-align: center;
        background: rgba(255, 255, 255, 0.3);
        border-top-left-radius: 50%;
        border-bottom-left-radius: 50%;
        box-sizing: border-box;
      }
      .book-tip {
        display: flex;
        flex-direction: column;
        height: 40px;
        background: rgba(255, 255, 255, 0.3);
        box-sizing: border-box;
        i {
          color: rgba(255, 255, 255, 0.8);
          font-style: normal;
          &:first-of-type {
            margin-top: 3px;
          }
        }
      }
    }
  }
  .top-list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    .list-item {
      width: 25%;
      text-align: center;
      display: flex;
      flex-direction: column;
      .item-num {
        font-size: 15px;
        color: white;
      }
      .item-name {
        font-size: 15px;
        color: white;
      }
    }
  }
}
</style>
