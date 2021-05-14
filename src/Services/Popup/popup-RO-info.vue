<template>
  <div class="popup_wrapper" ref="popup_wrapper" id="exampleModalScrollable" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
    <div class=" v-popup modal-dialog-scrollable" role="document">
      <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalScrollableTitle">{{nameTitle}}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" @click="ClosePopup">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline-danger" @click="ClosePopup">{{ leftBtnTitle }}</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
name: "modal-popup",
  props:{
    nameTitle:{
      type: String,
      default: 'Титл'
    },
    isState:{
      type: Boolean,
      default: true
    },
    leftBtnTitle:{
      type: String,
      default:"Close"
    }
  },
  methods:{
    ClosePopup(){
      this.$emit('ClosePopup')
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
  z-index: 9;
}
.v-popup{
  padding: 16px;
  position: fixed;
  border-radius: 10px;
  top:5%;
  max-width:90%;
  background: #ffffff;
  box-shadow: 0px 0px 15px 0 rgba(0, 0, 0, .4);
  z-index: 10;
}

.v-popup__header, .v-popup__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.v-popup__content{

}

</style>