
<script>
import jwtDecode from "jwt-decode";
import MainVariables from "@/Services/MainVariables";
export default {
name: "JwtTokenModel",
  data(){
  return {
    state:{
      jwtToken: String,
      email: String,
      role: String
    },
  }
  },



  methods:{
    getUserEmailFromJwToken:function (data){
      MainVariables.data().email = jwtDecode(data)["email"];
      return jwtDecode(data)["email"];
    },
    getUserIdFromJwToken:function (data){
      MainVariables.data().userId = jwtDecode(data)["sub"];
      return jwtDecode(data)["sub"];
    },
    getUserRoleFromJwToken:function (data){
      MainVariables.data().role =jwtDecode(data)["roles"];
      return jwtDecode(data)["roles"];
    },
    getDecodeJwToken:function (data){
      MainVariables.data().jwToken =jwtDecode(data);
      return jwtDecode(data);
    }
  }
}
</script>

<style scoped>

</style>