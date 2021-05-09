<template>
  <table class="table ">
    <thead class="thead-light">
    <tr>
      <th scope="col">Логин</th>
      <th scope="col">Имя</th>
      <th scope="col">Емейл</th>
      <th scope="col">Статус блокировки</th>
      <th scope="col">Доп. Информация</th>
      <th scope="col">Блокировка</th>
    </tr>
    </thead>
    <tbody>
    <ItemList v-for="item in users"
              :item="item"
              @show-info="$emit('show-info',item)"
              @update_users ="$emit('update_users')"
    />
    </tbody>
  </table>
</template>

<script>
import ItemList from "@/components/Tables/User/ItemListUser";

export default {
  name: "UserList",
  props:['users'],
  components:{
    ItemList
  },
  methods:{
    editUserBut: function (val){
      this.$emit('edit-user',val)
    },
    deleteUser: function (val){
      this.$emit('delete-user',val)
    },
    lockUser: function (val){
      this.$emit('lock-user',val)
    }
  }
}
</script>

<style scoped>

</style>