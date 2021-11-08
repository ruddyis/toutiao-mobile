<template>
  <div class="user-profile">
    <van-nav-bar
      class="user-profile-title"
      title="个人资料"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <input
      type="file"
      hidden
      accept="image/*"
      ref="file"
      @change="onFileChange"
    />
    <van-cell title="头像" is-link center @click="$refs.file.click()">
      <van-image width="100" height="100" round fit="cover" :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="user.name"
      @click="isEditNameShow = true"
    ></van-cell>
    <van-cell
      title="性别"
      is-link
      :value="user.gender === 0 ? '男' : '女'"
      @click="isEditGenderShow = true"
    />
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
      @click="isEditBirthdayShow = true"
    />
    <van-popup
      v-model="isEditNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <UpdateName
        v-if="isEditNameShow"
        @close="isEditNameShow = false"
        v-model="user.name"
      ></UpdateName>
    </van-popup>
    <van-popup v-model="isEditGenderShow" position="bottom">
      <UpdateGender
        @close="isEditGenderShow = false"
        v-model="user.gender"
      ></UpdateGender>
    </van-popup>
    <van-popup v-model="isEditBirthdayShow" position="bottom">
      <UpdateBirthday
        v-if="isEditBirthdayShow"
        @close="isEditBirthdayShow = false"
        v-model="user.birthday"
      ></UpdateBirthday>
    </van-popup>
    <van-popup v-model="isEditPhotoShow" position="bottom" style="height: 100%">
      <UpdatePhoto
      v-if="isEditPhotoShow"
        :file="previewImage"
        @close="isEditPhotoShow = false"
        @update-photo="user.photo = $event"
      ></UpdatePhoto>
    </van-popup>
  </div>
</template>

<script>
import UpdateName from '../../components/UsetProfile/UpdateName'
import UpdateGender from '../../components/UsetProfile/UpdateGender'
import UpdateBirthday from '../../components/UsetProfile/UpdateBirthday'
import UpdatePhoto from '../../components/UsetProfile/UpdatePhoto'
import { getUserProfile } from '../../api/user'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  data () {
    return {
      user: {}, // 用户数据
      isEditNameShow: false, // 编辑昵称的显示状态
      isEditGenderShow: false, // 编辑性别的显示状态
      isEditBirthdayShow: false, // 编辑生日的显示状态
      isEditPhotoShow: false, // 编辑头像的显示状态
      previewImage: null // 上传预览图片
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      const { data } = await getUserProfile()
      this.user = data.data
    },
    onFileChange () {
      // 展示弹出层
      this.isEditPhotoShow = true
      // 在弹出层里面预览图片
      const file = this.$refs.file.files[0]
      this.previewImage = file
      // 为了解决相同文件不触发 change事件，所以在手动清空 file 的value
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.user-profile {
  .user-profile-title {
    background: #3296fa;
    /deep/.van-nav-bar__title {
      color: white;
    }
  }
  /deep/.van-nav-bar .van-icon {
    color: white;
  }
  .van-popup {
    background: #f5f7f9;
  }
}
</style>
