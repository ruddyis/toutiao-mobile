//非vant
<!--
<template>
  <div class="channel-item">
    <div class="item">
      <div
        class="item-title"
        v-if="article.cover.type === 0 || article.cover.type === 3"
      >
        {{ article.title }}
      </div>
      <div class="one-img" v-if="article.cover.type === 1">
        <div class="item-title">{{ article.title }}</div>
        <img :src="article.cover.images[0]" alt="" />
      </div>
      <div class="three-img" v-if="article.cover.type === 3">
        <div
          class="three-img-src"
          v-for="(img, imgIndex) in article.cover.images"
          :key="imgIndex"
        >
          <img :src="img" alt="" />
        </div>
      </div>
      <div class="label">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChannelItem',
  props: {
    article: {
      type: Object,
      default: () => {},
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.channel-item {
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  .item {
    margin: 10px 15px 10px 15px;
    .item-title {
      font-size: 15px;
      margin-bottom: 5px;
    }
    .one-img {
      display: flex;
      justify-content: space-between;
      img {
        // width: 116px;
        height: 73px;
      }
    }
    .three-img {
      display: flex;
      justify-content: space-around;
      .three-img-src {
        img {
          // width: 116px;
          height: 73px;
        }
      }
    }
    .label {
      span {
        margin-right: 20px;
        color: rgb(161, 157, 157);
      }
    }
  }
}
</style>
-->
//Vant

<template>
  <van-cell
    class="article-item"
    :to="{
      name: 'Article',
      params: {
        articleId: article.art_id
      }
    }"
  >
    <div slot="title" class="title van-multi-ellipsis--l3">
      {{ article.title }}
    </div>
    <div slot="label">
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
          class="cover-wrap-item"
          v-for="(img, imgIndex) in article.cover.images"
          :key="imgIndex"
        >
          <van-image class="cover-item" fit="cover" :src="img" />
        </div>
      </div>
      <div class="label-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <van-image
      slot="value"
      v-if="article.cover.type === 1"
      width="116"
      height="73"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>
<script>
export default {
  name: 'ChannelItem',
  props: {
    article: {
      type: Object,
      default: () => {},
      required: true
    }
  }
}
</script>
<style lang="less" scoped>
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  /deep/.van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 12px;
  }
  .cover-wrap {
    padding: 15px 0;
    display: flex;
    .cover-wrap-item {
      flex: 1;
      height: 73px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item {
        width: 100%;
        height: 73px;
      }
    }
  }
  .label-wrap {
    font-size: 11px;
    color: #b4b4b4;
    span {
      margin-right: 12px;
    }
  }
}
</style>
