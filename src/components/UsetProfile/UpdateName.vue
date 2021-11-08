// Vant版本
<template>
  <div class="update-name">
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    ></van-nav-bar>
    <div class="name-field-wrap">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '../../api/user'
export default {
  name: 'UpdateName',
  data () {
    return {
      localName: this.value
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    async onConfirm () {
      this.$toast('保存中...')
      // 1.请求提交更新用户昵称
      try {
        await updateUserProfile({
          name: this.localName
        })
        // 更新成功 -> 修改父组件的name -> 关闭弹出层
        this.$toast('保存成功')
        // 发布input事件，更新父组件v-model绑定的数据
        this.$emit('input', this.localName)
        this.$emit('close')
      } catch (err) {
        if (err && err.response && err.response.status === 409) {
          this.$toast('昵称已存在')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.update-name {
  .name-field-wrap {
    padding: 10px;
  }
}
</style>
