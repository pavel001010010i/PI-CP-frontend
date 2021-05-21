<template>
  <div class="pb-1 ">
    <div class="small border-bottom" >
      <div class="row text-left">
        <div class="ml-3 inProgress"></div>
        <div class="col-lg-3">
          <div class="row">
            <div class="col-lg-6">
              <p>Заявка</p>
            </div>
            <div class="col-lg-6">
              <p class="m-0 p-0">Транспорт</p>
            </div>
          </div>

        </div>
        <div class="col-lg-3 ">
          <p class="m-0 p-0">Маршрут</p>
        </div>
        <div class="col-lg-4 ">
          <div class="row">
            <div class="col-lg-5" >
              <p class="m-0 p-0">Товар</p></div>
            <div class="col-lg-7">
              <div class="row">
                <div class="col-lg-4">
                  <p class="m-0 p-0">Цена</p>
                </div>
                <div class="col-lg-3">
                  <p class="m-0 p-0">Валюта</p>
                </div>
                <div class="col-lg-3">
                  <p class="m-0 p-0">Оплата</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ItemList  v-for="item in items"
               :item="item"
               @delete-item = "DeleteItem"
               @accept-item = "AcceptItem"
          />
  </div>

</template>

<script>
import ItemList from "@/components/Tables/Request/IRData/ItemList";
export default {
name: "List",
  props:['items'],

  components:{
    ItemList,
  },
  methods:{
    DeleteItem(data){
      this.$emit('delete-item',data);
    },
    AcceptItem(data){
      this.$emit('accept-item',data);
    }
  }
}
</script>

<style scoped>

</style>