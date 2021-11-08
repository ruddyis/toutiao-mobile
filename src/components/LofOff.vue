<template>
  <div class="lof-off">
    <div class="off-box">
      <slot name="off-title" tag="p" class="off-title"></slot>
      <slot name="off-tip" tag="p" class="off-tip"></slot>
      <ul class="off-button">
        <li class="button-left" @click="cancel">取消</li>
        <li class="button-right" @click="reTrue">确认</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LofOff',
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    reTrue () {
      this.$emit('reTrue')
    }
  }
}
</script>

<style lang="less" scoped>
.lof-off {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  .off-box {
    width: 90%;
    // height: 150px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    // border: 1px solid #000;
    border-radius: 30px;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
    .off-title {
      font-size: 20px;
    }
    .off-tip {
      font-size: 15px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    }
    .off-button {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .button-left {
        width: 50%;
      }
      .button-right {
        width: 50%;
        color: #1989fa;
      }
    }
  }
}
</style>
