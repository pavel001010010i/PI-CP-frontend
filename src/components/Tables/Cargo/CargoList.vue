<template>
  <div class="pb-1">
    <Item v-for="cargo in cargoes"
          :cargo="cargo"
          @edit-cargo="EditCargo"/>
  </div>

</template>

<script>
import Item from "@/components/Tables/Cargo/ItemListCargo";

export default {
name: "CargoList",
  props:['cargoes'],
  components:{
    Item,
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