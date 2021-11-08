<template>
  <div class="update-photo">
    <img class="image" :src="image" ref="image" />
    <van-nav-bar
      class="toolbar"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onComfirm()"
    />
  </div>
</template>

<script>
import { updateUserPhoto } from '../../api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'UpdatePhoto',
  props: {
    file: {
      //   type: Object,
      required: true
    }
  },
  data () {
    return {
      image: window.URL.createObjectURL(this.file),
      cropper: null
    }
  },
  mounted () {
    // 获取需要裁剪的图片 DOM
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  methods: {
    getCroppedCanvas () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob(blob => {
          resolve(blob)
        })
      })
    },
    async onComfirm () {
      this.$toast('保存中...')
      // 如果要求 Content-Type 是 multipart/form-data，则一定要提交 formData数据对象，不能提交{}
      // const fd = new FormData()
      // fd.append('photo', this.file)

      const file = await this.getCroppedCanvas()
      const fd = new FormData()
      fd.append('photo', file)

      await updateUserPhoto(fd)
      this.$toast('保存成功')
      // 更新父组件中的用户头像
      this.$emit('update-photo', window.URL.createObjectURL(file))
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="less">
.update-photo {
  width: 100%;
  height: 100%;
  background: black;
  position: relative;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .image {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    // cropperjs 的css设置
    display: block;
    max-width: 100%;
  }
}
</style>
