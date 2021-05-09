<template>
  <div>
    <table class="table table-hover table-bordered table-sm">
      <thead class="thead-light">
      <tr>
        <th>Тип</th>
        <th>Описание</th>
        <th>Статус</th>
      </tr>
      </thead>
      <tbody>
      <Item v-for="item in items"
                :item="item"
      />
      </tbody>
    </table>
  </div>
</template>

<script>
import Item from "@/Services/AppManageServices/Components/CurrencyType/Item"
export default {
name: "List",
  props:['items'],
  components:{
    Item
  }
}
</script>

<style scoped>

</style>