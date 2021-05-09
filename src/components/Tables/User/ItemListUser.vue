<template>
  <tr  :class="{isActive: item.isLockdown, isNotActive: !item.isLockdown }" >
    <td>{{item.userName}}</td>
    <td>{{item.name}}</td>
    <td>{{item.email}}</td>
    <td>{{item.isLockdown === false?"Активен":"Заблокирован"}}</td>
    <td><button class="btn btn-outline-info" @click="$emit('show-info',item)">Доп. информация</button></td>
    <td><button class="btn btn-outline-primary" @click="edit_lockout">{{item.isLockdown === false?"Заблокировать":"Разблокировать"}}</button></td>
  </tr>
</template>

<script>
import AccService from "@/Services/AccountServices/AccountService"
import store from "@/store.index"
export default {
  name: "ItemListUser",
  store:store,
  components:{
    AccService
  },
  props:['item'],
  data(){
    return{
     message:''
    }
  },
  methods:{
    edit_lockout(){
      AccService.methods.UpdateUserLockout(this.item.id);
    }
  }
}
</script>

<style scoped>
.isActive{
  background: rgba(205, 0, 0, 0.3);
}
.isNotActive{
  background: rgba(0, 90, 200, 0.3);
}
</style>