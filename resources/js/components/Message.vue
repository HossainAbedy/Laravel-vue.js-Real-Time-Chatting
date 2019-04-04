<template>
    <div class="container">
             <li class="list-group-item " :class="className"><slot></slot><span class="float-right" id='time'><br>{{time}}</span></li>
             <small class="badge float-right" :class="badgeclass">{{user}}</small>
    </div>
</template>

<script>
    export default {
        props:[
            'color',
            'user',
            'time'
        ],
        computed:{
            className(){
                return 'list-group-item-'+this.color;
            },
             badgeclass(){
                return 'badge-'+this.color;
            }  
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
<style scoped>
#time{
    font-size: 10px;
    margin-top: 10px;
    color:black;
}
</style>
