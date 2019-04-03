
require('./bootstrap');

window.Vue = require('vue');
import Vue from 'vue'
//imported for scroll
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)
//imported for notification
import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'
Vue.use(Toaster, {timeout:5000})

Vue.component('message', require('./components/Message.vue').default);



const app = new Vue({
        el: '#app',
        data:{
            message:'',
            chat:{
                message:[],
                user:[],
                color:[],
                time:[]
            },
            typing:'',
            numberOfuser:0
        },
        watch:{
            message(){
                Echo.private('chat')
                .whisper('typing', {
                name: this.message
                });
            }
        },
        methods:{
            send(){
                if(this.message.length !=0){
                this.chat.message.push(this.message);
                this.chat.color.push('success');
                this.chat.user.push('You');
                this.chat.time.push(this.getTime());
                axios.post('/send', {
                    message:this.message,
                    chat:this.chat
                })
                .then(response=> {
                    console.log(response);
                    this.message=''
                })
                .catch(error=>{
                    console.log(error);
                });
                }
            },

            
            getTime(){
                let time = new Date();
                return time.getDay()+':'+time.getHours()+':'+time.getMinutes();
                 }   
            },
            mounted(){

                Echo.private('chat')
                    .listen('ChatEvent', (e) => {
                    this.chat.message.push(e.message);
                    this.chat.user.push(e.user);
                    this.chat.color.push('info');
                    this.chat.time.push(this.getTime());
                    //  console.log(e);
                })             
                     .listenForWhisper('typing', (e) => {
                    if(e.name!=''){
                       this.typing='Typing.....';
                    }else{
                        this.typing='';
                    }  
               
                }),
                Echo.join(`chat`)
                    .here((users) => {
                    this.numberOfuser=users.length;
                    })
                    .joining((user) => {
                        this.numberOfuser+=1;
                        this.$toaster.success(user.name +' just joined this room');
                    })
                    .leaving((user) => {
                        this.numberOfuser-=1;
                        this.$toaster.danger(user.name +' just left this room');
                    });
        }
});
