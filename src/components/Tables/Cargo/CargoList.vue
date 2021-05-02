<template>
  <ItemListCargo v-for="cargo in cargoes"
                 :cargo="cargo"
                 @edit-cargo="EditCargo"/>
</template>

<script>
import ItemListCargo from "@/components/Tables/Cargo/ItemListCargo";
import TypeService from "@/Services/TypeServices/TypeService"
const url = "https://localhost:44332/api/Cargoes/";
export default {
name: "CargoList",
  props:['cargoes'],
  data(){
    return {
      TypeCurrencyOptions:[],
      TypePaymentOptions:[]
    }
  },
  components:{
    ItemListCargo,
    TypeService
  },

  methods:{

    EditCargo(data){
      this.$emit('edit-cargo',data);
    }
  }
}
</script>

<style scoped>

</style>