import Vue from "vue";
import VueAxios from "vue-axios";
import axios from "axios";

const ApiService={
    init(){
        Vue.use(VueAxios, axios)
        this.axios = axios;
        this.axios.defaults.baseURL = 'http://localhost/demo_backend/';
        return this;
    },

    get(url,param){
        // this.axios.get(url).then(result=>{
        //    return result;
        // });
        return new Promise(resolve => {
            return this.axios
                .get(`${url}?per_page=${param}`)
                .then(data => {

                    resolve(data);
                })
                .catch(error => {
                    alert(error);
                });
        });
    },
    getByid(url,param){
        // this.axios.get(url).then(result=>{
        //    return result;
        // });
        return new Promise(resolve => {
            return this.axios
                .get(`${url}/${param}`)
                .then(data => {

                    resolve(data);
                })
                .catch(error => {
                    alert(error);
                });
        });
    },
    post(resource, params) {
        return new Promise(resolve => {
            return this.axios
                .post(`${resource}`, params)
                .then(data => {

                    resolve(data);
                })
                .catch(error => {
                    alert(error);
                });
        });
    },


}
export default ApiService