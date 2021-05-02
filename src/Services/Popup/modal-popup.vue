<template>
  <div class="popup_wrapper" ref="popup_wrapper">
    <div class="v-popup">
      <div class="v-popup__header">
      <span>
        <i class="material-icons" @click="ClosePopup">close</i>
      </span>
      </div>
      <div class="v-popup__content">
        <slot></slot>
      </div>
      <div class="v-popup__footer">
        <button class="btn btn-outline-danger" @click="ClosePopup">{{ leftBtnTitle }}</button>
        <button v-show="isState" class="btn btn-outline-primary" @click="AddPopup">{{ rightBtnTitleAdd }}</button>
        <button v-show="!isState" class="btn btn-outline-primary" @click="UpdatePopup">{{ rightBtnTitleUpdate }}</button>
      </div>
    </div>
  </div>

</template>

<script>
export default {
name: "modal-popup",
  props:{
    isState:{
      type: Boolean,
      default: true
    },
  rightBtnTitleAdd:{
    type: String,
    default:"OK"
  },
    rightBtnTitleUpdate:{
      type: String,
      default:"Update"
    },
    leftBtnTitle:{
      type: String,
      default:"Close"
    }
  },
  methods:{
    ClosePopup(){
      this.$emit('ClosePopup')
    },
    AddPopup(){
      this.$emit('AddPopup')
    },
    UpdatePopup(){
      this.$emit('UpdatePopup')
    }
  },
  mounted() {
  let vm = this;
  document.addEventListener('click',function (item) {
    if(item.target=== vm.$refs['popup_wrapper']){
      vm.ClosePopup();
    }
  })
  }
}
</script>

<style scoped>
.popup_wrapper{
  background: rgba(64,64,64,.4);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  left: 0;
  top:0;
  bottom: -100%;
  z-index: 9;
}
.v-popup{
  padding: 16px;
  position: fixed;
  border-radius: 10px;
  top:5%;
  width:90%;
  background: #ffffff;
  box-shadow: 0 0 10px 0 #e7e7e7;
  z-index: 10;
}

.v-popup__header, .v-popup__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.v-popup__content{
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>