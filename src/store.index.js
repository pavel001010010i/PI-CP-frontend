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
            Cargoes:[],
            Transports:[],
            RouteMap: {},
            TypePayments:[],
            TypeCurrencies:[],
            TransportLoadCapacities:[],
            TypeTransports:[],


        }
    },
    actions: {
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

    },

    mutations: {
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
            axios.get(Constants.data().url+"api/typepayment/get",Constants.data().configBearHeader).then(response => {
                state.TypePayments = response.data;
            }).catch((error) => {
                console.log(error);
            });
        },
        GetTypeCurrencies(state){
            axios.get(Constants.data().url+"api/typecurrency/get",Constants.data().configBearHeader).then(response => {
                state.TypeCurrencies = response.data;
            }).catch((error) => {
                console.log(error);
            });
        },
        GetTransportLoadCapacities(state){
            axios.get(Constants.data().url+"api/transportloadcapacity/get",Constants.data().configBearHeader).then(response => {
                state.TransportLoadCapacities = response.data;
            }).catch((error) => {
                console.log(error);
            });
        },
        GetTypeTransports(state){
            axios.get(Constants.data().url+"api/typetransport/get",Constants.data().configBearHeader).then(response => {
                state.TypeTransports = response.data;
            }).catch((error) => {
                console.log(error);
            });
        },

    },
    getters: {
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
    }
})


