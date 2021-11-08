// Vant版本
<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      item-height="100px"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '../../api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      currentDate: new Date(this.value),
      minDate: new Date(1970, 0, 1),
      maxDate: new Date()
    }
  },
  methods: {
    async onConfirm (date) {
      console.log(date)
      this.$toast('保存中...')
      // 将 Sat Jan 27 2018 00:00:00 GMT+0800 (中国标准时间) 转化为 ‘2018-01-27’
      // 方法一
      //   const nowDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      // 方法二
      const nowDate = dayjs(date).format('YYYY-MM-DD')
      // 1.请求提交更新用户性别
      await updateUserProfile({
        birthday: nowDate
      })
      this.$toast('保存成功')
      // 发布input事件，更新父组件v-model绑定的数据
      this.$emit('input', nowDate)
      this.$emit('close')
    }
  }
}
</script>

<style></style>
