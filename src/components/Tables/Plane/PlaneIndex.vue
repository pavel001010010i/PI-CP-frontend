<template>
  <div v-show="role!=='customer'">
    <h1 class=" text-left">Planes</h1>
    <InputFieldPlane :getPlane = "getPlane"
                    :isDisableEmailField="isDisableEmailField"
                 @add-plane="addPlane"
                 @saveUpdate-plane ="saveUpdatePlane"
                 :isVisible="isVisible"/>
    <PlaneList :planes ="planes"
                  v-on:delete-plane ="deletePlane"
                  v-on:edit-plane="editPlaneBut" />
    <p class="text-info text-success" v-show="isSucceful">{{message}}</p>
    <p class="text-info text-danger" v-show="!isSucceful">{{ message }}</p>
  </div>
</template>

<script>
const url = "https://localhost:44332/api/Planes/";
const config = {
  headers: { Authorization: 'Bearer '+ localStorage.getItem('user_token'),
    Accept: "application/json"}
};

import InputFieldPlane from "@/components/Tables/Plane/InputFieldPlane";
import PlaneList from "@/components/Tables/Plane/PlaneList";
export default {
name: "CustomerIndex",
  data() {
    return {
      getPlane: {},
      isDisableEmailField:false,
      planes: [],
      isVisible: false,
      token:'',
      role:'',
      isSucceful:false,
      message:''
    }
  },
  components:{
    PlaneList,
    InputFieldPlane
  },
  mounted() {
    this.getPlanes();
    this.token = localStorage.getItem('user_token');
    this.role = localStorage.getItem('user_role')

  },

  methods:{
    saveUpdatePlane: function(val){
      axios.put(url + val.id, val,config)
          .then(response => {
            this.isSucceful = response.data.succes;
            this.message = response.data.message
            this.getPlanes();
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      this.getPlanes();

    },
    addPlane:  function (val) {
      axios.post(url, val,config)
          .then(response => {
            this.isSucceful = response.data.succes;
            this.message = response.data.message;
            this.getPlanes();})
          .catch((error) => {
            console.log(error);
          });
    },

    deletePlane:function (val){
      axios.delete(url + val.id,config).
      then(response=>{
        this.isSucceful = response.data.succes;
        this.message = response.data.message;
        this.getPlanes();
      });
    },
    editPlaneBut: function (val) {
      axios.get(url + val.id,config).
      then(response=>{
        this.isSucceful = response.data.succes;
        this.message = response.data.message;
        this.getPlane = response.data;
        this.isDisableEmailField = val.isDisableEmailField
      });

    },
    getPlanes: function () {
      axios.get(url,config)
          .then(response => (this.planes = response.data));
    }
  }

}
</script>

<style scoped>

</style>