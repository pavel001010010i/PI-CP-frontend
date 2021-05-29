import { createStore } from 'vuex'
import axios from "axios";
import Constants from "@/Services/Constants"

export default createStore({
    state() {
        return {
            isVisible: localStorage.getItem('user_token')?false:true,
            token:localStorage.getItem('user_token'),
            isAdmin:localStorage.getItem('user_role').indexOf('Admin')>-1?true:false,
            isUser:localStorage.getItem('user_role').indexOf('User')>-1?true:false,
            email: localStorage.getItem('user_email'),
            Cargoes:[],
            Transports:[],
            RouteMap: {},
            TypeCargo:[],
            TypePayments:[],
            TypeCurrencies:[],
            TransportLoadCapacities:[],
            TypeTransports:[],
            SearchTransports:[],
            SearchCargoes:[],
            Users:[],
            isVisibleFilterCargo:true,
            isVisibleFilterTrans:true,
            RequestProvider:[],
            RequestCustomer:[],
            OrderProvider:[],
            OrderCustomer:[],
            IsSuccesAdd:false
        }
    },
    actions: {
        GetEmail({commit},value) {
            commit('GetEmail',value)
        },
        GetSuccesAdd({commit},value) {
            commit('GetSuccesAdd',value)
        },
        GetOProvider({commit}) {
            commit('GetOProvider')
        },
        GetOCustomer({commit}) {
            commit('GetOCustomer')
        },
        GetRProvider({commit}) {
            commit('GetRProvider')
        },
        GetRCustomer({commit}) {
            commit('GetRCustomer')
        },
        SetToken({commit},value) {
            commit('SetToken',value)
        },
        RemoveToken({commit}) {
            commit('RemoveToken')
        },
        GetToken({commit}){
            commit('GetToken')
        },
        IsAdmin({commit}){
            commit('IsAdmin')
        },
        IsUser({commit}){
            commit('IsUser')
        },
        GetCargoes({commit}){
            commit('GetCargoes')
        },
        GetTransports({commit}){
            commit('GetTransports')
        },
        GetRouteMap({commit},value){
            commit('GetRouteMap',value)
        },
        GetTypePayments({commit}){
            commit('GetTypePayments')
        },
        GetTypeCurrencies({commit}){
            commit('GetTypeCurrencies')
        },
        GetTransportLoadCapacities({commit}){
            commit('GetTransportLoadCapacities')
        },
        GetTypeTransports({commit}){
            commit('GetTypeTransports')
        },
        GetSearchTransports({commit},value){
            commit('GetSearchTransports',value)
        },
        GetSearchCargoes({commit},value){
            commit('GetSearchCargoes',value)
        },
        GetUsers({commit}){
            commit('GetUsers')
        },
        SetVisibleCargoFilter({commit},value){
            commit('SetVisibleCargoFilter',value)
        },
        SetVisibleTransFilter({commit},value){
            commit('SetVisibleTransFilter',value)
        },
        GetTypeCargoAll({commit}){
            commit('GetTypeCargoAll')
        },
        GetTypeTransportsAll({commit}){
            commit('GetTypeTransportsAll')
        },
        GetTypeCurrenciesAll({commit}){
            commit('GetTypeCurrenciesAll')
        },
        GetTypePaymentsAll({commit}){
            commit('GetTypePaymentsAll')
        }

    },
    mutations: {
        GetEmail(state,value) {
            state.email = value;
        },
        GetSuccesAdd(state,value) {
            state.IsSuccesAdd = value;
        },
        GetOProvider(state) {
            axios.get(Constants.data().url+"api/RequestOrder/get-orders-providers",Constants.data().configBearHeader).then(response => {
                state.OrderProvider = response.data;
                console.log(response.data)

            }).catch((error) => {
                console.log(error);
            });
        },
        GetOCustomer(state) {
            axios.get(Constants.data().url+"api/RequestOrder/get-orders-customers",Constants.data().configBearHeader).then(response => {
                state.OrderCustomer = response.data;
                console.log(response.data)
            }).catch((error) => {
                console.log(error);
            });
        },
        GetRProvider(state) {
            axios.get(Constants.data().url+"api/RequestOrder/get-requests-providers",Constants.data().configBearHeader).then(response => {
                state.RequestProvider = response.data;
                console.log(response.data)

            }).catch((error) => {
                console.log(error);
            });
        },
        GetRCustomer(state) {
            axios.get(Constants.data().url+"api/RequestOrder/get-requests-customers",Constants.data().configBearHeader).then(response => {
                state.RequestCustomer = response.data;
                console.log(response.data)
            }).catch((error) => {
                console.log(error);
            });
        },
        GetTypeCargoAll(state){
            axios.get(Constants.data().url+"api/TypeCargo/get-type-cargo",Constants.data().contTypeHeader).then(response => {
                state.TypeCargo = response.data;
            }).catch((error) => {
                console.log(error);
            });
        },
        SetToken(state,value) {
            localStorage.setItem('user_token',value)
            state.isVisible=false
        },
        RemoveToken(state) {
            localStorage.setItem('user_token','')
            localStorage.setItem('user_role','')
            state.isVisible=true;
            state.isAdmin = false;
            state.isUser = false;
        },
        GetToken(state){
            state.token = localStorage.getItem('user_token')
        },
        IsAdmin(state){
            state.isAdmin = localStorage.getItem('user_role').indexOf('Admin')>-1?true:false
        },
        IsUser(state){
            state.isUser = localStorage.getItem('user_role').indexOf('User')>-1?true:false
        },
        GetCargoes(state){
            axios.get(Constants.data().url+"api/cargo/get-cargoes",Constants.data().configBearHeader).then(response => {
                state.Cargoes = response.data;
            }).catch((error) => {
                console.log(error);
            });
        },
        GetTransports(state){
            axios.get(Constants.data().url+"api/transport/get-transports",Constants.data().configBearHeader).then(response => {
                state.Transports = response.data;
            }).catch((error) => {
                console.log(error);
            });
        },
        GetRouteMap(state,value){
            axios.get(Constants.data().url+`api/routemap/get-route/${value}`,Constants.data().contTypeHeader)
                .then(res=>{
                    state.RouteMap = res.data;
                }).catch((error)=>{console.log(error);})
        },
        GetTypePayments(state){
            axios.get(Constants.data().url+"api/typepayment/get",Constants.data().contTypeHeader).then(response => {
                state.TypePayments = response.data;
            }).catch((error) => {
                console.log(error);
            });
        },
        GetTypeCurrencies(state){
            axios.get(Constants.data().url+"api/typecurrency/get",Constants.data().contTypeHeader).then(response => {
                state.TypeCurrencies = response.data;
            }).catch((error) => {
                console.log(error);
            });

        },
        GetTransportLoadCapacities(state){
            axios.get(Constants.data().url+"api/transportloadcapacity/get",Constants.data().contTypeHeader).then(response => {
                state.TransportLoadCapacities = response.data;
            }).catch((error) => {
                console.log(error);
            });
        },
        GetTypeTransports(state){
            axios.get(Constants.data().url+"api/typetransport/get",Constants.data().contTypeHeader).then(response => {
                state.TypeTransports = response.data;
            }).catch((error) => {
                console.log(error);
            });
        },
        GetSearchTransports(state,data){
            axios.post(Constants.data().url+"api/transport/search-transport",data,Constants.data().contTypeHeader).then(response => {
                state.SearchTransports = response.data;
            }).catch((error) => {
                console.log(error);
            });
        },
        GetSearchCargoes(state,data){
            axios.post(Constants.data().url+"api/cargo/search-cargo",data,Constants.data().contTypeHeader).then(response => {
                state.SearchCargoes = response.data;
            }).catch((error) => {
                console.log(error);
            });
        },
        GetUsers(state){
            axios.get(Constants.data().url+"api/user/get-users",Constants.data().configBearHeader).then(response => {
                state.Users = response.data;
            }).catch((error) => {
                console.log(error);
            });
        },
        SetVisibleCargoFilter(state,data){
            state.isVisibleFilterCargo =data;
        },
        SetVisibleTransFilter(state,data){
            state.isVisibleFilterTrans = data;
        },
        GetTypeTransportsAll(state){
            axios.get(Constants.data().url+"api/typetransport/get-type-transport",Constants.data().contTypeHeader).then(response => {
                state.TypeTransports = response.data;
            }).catch((error) => {
                console.log(error);
            });
        },
        GetTypeCurrenciesAll(state){
            axios.get(Constants.data().url+"api/typecurrency/get-type-currency",Constants.data().contTypeHeader).then(response => {
                state.TypeCurrencies = response.data;
            }).catch((error) => {
                console.log(error);
            });
        },
        GetTypePaymentsAll(state){
            axios.get(Constants.data().url+"api/typepayment/get-type-payment",Constants.data().contTypeHeader).then(response => {
                state.TypePayments = response.data;
            }).catch((error) => {
                console.log(error);
            });
        },

    },
    getters: {
        GetEmail: state=>{
            return state.email;
        },
        GetSuccesAdd: state=>{
            return state.IsSuccesAdd;
        },
        GetOProvider: state=>{
            return state.OrderProvider;
        } ,
        GetOCustomer: state =>  {
            return state.OrderCustomer
        },
        GetRProvider: state=>{
            return state.RequestProvider;
        } ,
        GetRCustomer: state =>  {
            return state.RequestCustomer
        },
        GetTypePaymentsAdmin: state=>
        {
            return state.TypePayments;
        },
        GetTypeTransportsAdmin: state=>
        {
            return state.TypeTransports;
        },
        GetTypeCurrencyAdmin: state =>{
            return state.TypeCurrencies;
        },
        GetTypeCargo: state=>{
          return state.TypeCargo;
        },
        isVisible: state => {
            return state.isVisible
        },
        data: state => {
            return state.data
        },
        getToken: state => {
            return state.token
        },
        getIsAdmin: state=>{
            return state.isAdmin
        },
        getIsUser: state=>{
            return state.isUser
        },
        GetCargoes:state=>{
            return state.Cargoes;
        },
        GetTransports:state=>{
            return state.Transports;
        },
        GetRouteMap:state=>{
            return state.RouteMap
        },
        GetTypePayments:state=>{
            var ob =[]
            state.TypePayments.forEach(item=>{
                ob.push(
                    {
                        value:item.id,
                        name:item.name
                    });
            })
            return ob;
        },
        GetTypeCurrencies:state=>{
            var ob =[]
            state.TypeCurrencies.forEach(item=>{
                ob.push(
                    {
                        value:item.id,
                        name:item.name
                    });
            })
            return ob;
        },
        GetTransportLoadCapacities:state=>{
            var ob =[]
            state.TransportLoadCapacities.forEach(item=>{
                ob.push(
                    {
                        value:item.id,
                        name:`${item.name} (${item.minValue}-${item.maxValue}) кг`
                    });
            })
            return ob;
        },
        GetTypeTransports:state=>{
            var ob =[]
            state.TypeTransports.forEach(item=>{
                ob.push(
                    {
                        value:item.id,
                        name:item.name
                    });
            })
            return ob;
        },
        GetSearchTransports:state=>{
            return state.SearchTransports;
        },
        GetSearchCargoes:state=>{
            return state.SearchCargoes;
        },
        GetUsers:state=>{
            return state.Users;
        },
        GetVisibleFilterCargo:state=>{
            return state.isVisibleFilterCargo
        },
        GetVisibleFilterTrans:state=>{
            return state.isVisibleFilterTrans
        }
    }
})


