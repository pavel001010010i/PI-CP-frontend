
<script>
export default {
  name: "Constants",
  data(){
    return{
      url: 'http://localhost:5000/',
      contTypeHeader:{
        'Content-Type': 'application/json',
      },
      configBearHeader:{
        headers: {
          Authorization: 'Bearer '+ localStorage.getItem('user_token'),
          Accept: "application/json"}
      },
      HereApiKey: 'o7Tl02_PXi3g7pUODLjFAoY15tXNJePXq60La-9LK2o',

    }
  },
  methods:{
    GetNotification(message,type){
      return { //position="top-left|top-right|bottom-left|bottom-right"
        "message": message,
        "type": type, //"info"|"warning"|"alert"|"success"
        "showIcon": true,
        "dismiss": {
          "manually": true,
          "automatically": true
        },
        "duration": 10000,
        "showDurationProgress": true,
        "appearance": "light" //"light"|"dark"|"glass"
      }

    }
  },
  updated() {



  }

}
</script>