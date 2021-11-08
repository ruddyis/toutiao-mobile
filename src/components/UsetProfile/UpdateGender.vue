// Vant版本
<template>
  <div class="update-gender">
    <van-picker
      show-toolbar
      item-height="100px"
      :default-index="defaultIndex"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onGenderChange"
    ></van-picker>
  </div>
</template>

<script>
import { updateUserProfile } from '../../api/user'
export default {
  name: 'UpdateGender',
  data () {
    return {
      columns: ['男', '女'],
      defaultIndex: this.value
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  methods: {
    onGenderChange (picker, value, index) {
      this.defaultIndex = index
    },
    async onConfirm () {
      this.$toast('保存中...')
      // 1.请求提交更新用户性别
      await updateUserProfile({
        gender: this.defaultIndex
      })
      this.$toast('保存成功')
      // 发布input事件，更新父组件v-model绑定的数据
      this.$emit('input', this.defaultIndex)
      this.$emit('close')
    }
  }
}
</script>

<style></style>
