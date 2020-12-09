<template >
  <div v-if="token!=''">
    <router-link to="/users" class="btn btn-danger ml-1 mb-3">Back</router-link>
    <p class="text-info text-success" v-show="isSucceful">{{message}}</p>
    <p class="text-info text-danger" v-show="!isSucceful">{{ message }}</p>
    <div >
      <table class="table table-hover table-striped">
        <thead class="thead-dark">
        <tr>
          <th>Login</th>
          <th>Role</th>
          <th>Password</th>
          <th>========</th>
        </tr>
        </thead>
        <tbody>
        <ItemList v-for="item in items"
                  v-bind:item="item"
                  @accept-item="acceptItemBut"
                  @reject-item ="rejectItem"/>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
import ItemList from "@/components/Tables/User/ILRU";
const url = "https://localhost:44332/api/RequestUsers/";
const config = {
  headers: { Authorization: 'Bearer '+ localStorage.getItem('user_token'),
    Accept: "application/json"}
};
export default {
name: "List",
  data(){
  return{
    items:[],
    isSucceful:true,
    message:'',
    token:''
  }
  },
  components:{
    ItemList
  },
  mounted() {
  this.token = localStorage.getItem('user_token')
  this.getUsers();
  },
  methods:{
    getUsers: function (){
    axios.get(url,config)
        .then(response => (this.items = response.data));
    },
    acceptItemBut: function (val){
      axios.post(url, val,config)
          .then(response => {
            this.isSucceful = response.data.succes;
            this.message = response.data.message
            this.getUsers();})
          .catch((error) => {
            console.log(error);
          });
    },
    rejectItem: function (val){
      axios.delete(url + val.id,config).
      then(response=>{
        this.isSucceful = response.data.succes;
        this.message = response.data.message
        this.getUsers();
      });
    }
  }
}
</script>

<style scoped>

</style>