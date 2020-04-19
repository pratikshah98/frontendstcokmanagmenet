<template>
    <span>
        <div class="row">
            <div class="col-md-4">
                    <div class="form-group">
                     <label >Item Name*</label>
                      <select class="custom-select form-control" v-model="itemBind" @change="getDetails">
                      <option  v-for="(a,index) in allItems" :key="index" v-bind:value="a.itemId">{{a.name}}</option>
                     </select>
            </div>
         </div>
            <div class="col-md-4">
                <div class="form-group">
                        <label> Start Date*</label>
                           <client-only>
                                <date-picker
                                    input-class="form-control col-md-12"
                                    class="datepicker"
                                    format="d-MM-yyyy"
                                    v-model="startDate"
                                ></date-picker>
                            </client-only>
                </div>
            </div>                                                                                                
            <div class="col-md-4">
                <div class="form-group">
                    <label> End Date*</label>
                        <client-only>
                        <date-picker
                            input-class="form-control col-md-12"
                            class="datepicker"
                            format="d-MM-yyyy"
                            v-model="selectedDate"
                        ></date-picker>
                        </client-only>
                </div>
            </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-12" >
                    <div class="table-responsive">
                    <table class="table table-striped dataex-html5-selectors dataTable">    
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th v-if="mode=='sale'">Sales Quantity</th>
                        <th v-else>Purchase Quantity</th>
                        <th v-if="$store.state.selectedBranchId==100">Branch</th>
                    </tr>
                     </thead>
                    <tbody> 
                    <tr v-for="(object,index) in fetchedObjects" :key="index">
                        
                        <td >{{ object.name }}</td>
                        <td >{{ object.Quantity }}</td>
                        <td v-if="$store.state.selectedBranchId==100"> {{ object.branchName }} </td>
                    </tr>
                    </tbody>           
             </table>
            </div>                 
                </div>
         </div>
        
    </span>
</template>
<script>
import axios from 'axios' 
import select2 from '../components/select2Component'
export default {
     components:{
        select2
    },
      props: {
        id: {
            type: String,
            required: false
        },
        mode:{
            type: String,
            required: true
        },
        value: {
            type: Number,
            required: false
        }
    },
     data(){
        return{
            selectedItems:[],
            fetchedObjects: null,
            // id:"",
            myBranch:"",
            itemBind:"",
            // startDate: new Date(),
            selectedDate: new Date(),
             allItems:[]
        }
    },  
     computed:{
        getBranch(){
            return this.$store.state.selectedBranchId;
        },
        startDate(){
            let dt = new Date();
            dt.setMonth(dt.getMonth()-1);
            return dt;
        }
     },
    watch:{
        getBranch:function(val){
            this.myBranch=val;
            // console.log("csiList= "+this.myBranch); 
            this.getDetails();
        }
     }, 
     created(){
            this.getDetails();        
    },
    filters:{
        filterDateFormat(val){
            let date = new Date(val);
            date.setHours(date.getHours()+6);
            return date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear() ;
        }
    },
    methods:{
        changeDateFormat(dt){
            return dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate();
        },
        getDetails(){
            axios.get('http://localhost:4000/item/')
                .then(res=>{
                this.allItems=res.data;
                });

            if(this.mode=="sale")
            {   
                if(this.$store.state.selectedBranchId==100){
                    if(this.itemBind==""){
                    axios.get('http://localhost:4000/report/'+this.changeDateFormat(this.startDate)+'/'+this.changeDateFormat(this.selectedDate))
                    .then(response => {
                        this.fetchedObjects = response.data;
                        // console.log(this.fetchedObjects);
                    });
                    }
                    else{
                    axios.get('http://localhost:4000/salereportitemdate/'+this.itemBind+'/'+this.changeDateFormat(this.startDate)+'/'+this.changeDateFormat(this.selectedDate))
                    .then(response => {
                        this.fetchedObjects = response.data;
                        // console.log(this.fetchedObjects);
                    });    
                    }
                }
                else{
                    if(this.$store.state.selectedBranchId==""){
                        if(this.itemBind==""){
                        axios.get("http://localhost:4000/user/"+this.$store.state.user)
                        .then(res=>{
                                    axios.get('http://localhost:4000/report/'+this.changeDateFormat(this.startDate)+'/'+this.changeDateFormat(this.selectedDate)+'/'+res.data[0].fkBranchId)
                                    .then(response => {
                                        this.fetchedObjects = response.data;
                                        // console.log(this.fetchedObjects);

                                    });
                        })
                        }else{
                            axios.get("http://localhost:4000/user/"+this.$store.state.user)
                        .then(res=>{
                                    axios.get('http://localhost:4000/salereportitemdate/'+this.itemBind+'/'+this.changeDateFormat(this.startDate)+'/'+this.changeDateFormat(this.selectedDate)+'/'+res.data[0].fkBranchId)
                                    .then(response => {
                                        this.fetchedObjects = response.data;
                                        // console.log(this.fetchedObjects);

                                    });
                        })
                        }
                    }
                    else{
                        if(this.itemBind==""){
                        axios.get('http://localhost:4000/report/'+this.changeDateFormat(this.startDate)+'/'+this.changeDateFormat(this.selectedDate)+'/'+this.$store.state.selectedBranchId)
                        .then(response => {
                            this.fetchedObjects = response.data;
                            // console.log(this.fetchedObjects);

                        });
                        }else{
                        axios.get('http://localhost:4000/salereportitemdate/'+this.itemBind+'/'+this.changeDateFormat(this.startDate)+'/'+this.changeDateFormat(this.selectedDate)+'/'+this.$store.state.selectedBranchId)
                        .then(response => {
                            this.fetchedObjects = response.data;
                            // console.log(this.fetchedObjects);

                        });
                        }
                    }
                }
            }
            else
            {
                if(this.$store.state.selectedBranchId==100){
                     if(this.itemBind==""){
                    axios.get('http://localhost:4000/purchasereport/'+this.changeDateFormat(this.startDate)+'/'+this.changeDateFormat(this.selectedDate))
                    .then(response => {
                        this.fetchedObjects = response.data;
                    });
                     }else{
                          axios.get('http://localhost:4000/purchasereportdateitem/'+this.itemBind+'/'+this.changeDateFormat(this.startDate)+'/'+this.changeDateFormat(this.selectedDate))
                    .then(response => {
                        this.fetchedObjects = response.data;
                    });
                     }
                }
                else{
                    if(this.$store.state.selectedBranchId==""){
                        if(this.itemBind==""){
                        axios.get("http://localhost:4000/user/"+this.$store.state.user)
                        .then(res=>{
                                    axios.get('http://localhost:4000/purchasereport/'+this.changeDateFormat(this.startDate)+'/'+this.changeDateFormat(this.selectedDate)+'/'+res.data[0].fkBranchId)
                                    .then(response => {
                                        this.fetchedObjects = response.data;
                                        // console.log(this.fetchedObjects);

                                    });
                        })
                        }else{
                           axios.get("http://localhost:4000/user/"+this.$store.state.user)
                        .then(res=>{
                                    axios.get('http://localhost:4000/purchasereportdateitem/'+this.itemBind+'/'+this.changeDateFormat(this.startDate)+'/'+this.changeDateFormat(this.selectedDate)+'/'+res.data[0].fkBranchId)
                                    .then(response => {
                                        this.fetchedObjects = response.data;
                                        // console.log(this.fetchedObjects);

                                    });
                        }) 
                        }
                    }
                    else{
                        if(this.itemBind==""){
                        axios.get('http://localhost:4000/purchasereport/'+this.changeDateFormat(this.startDate)+'/'+this.changeDateFormat(this.selectedDate)+'/'+this.$store.state.selectedBranchId)
                        .then(response => {
                            this.fetchedObjects = response.data;
                            // console.log(this.fetchedObjects);

                        });
                        }else{
                            axios.get('http://localhost:4000/purchasereportdateitem/'+this.itemBind+'/'+this.changeDateFormat(this.startDate)+'/'+this.changeDateFormat(this.selectedDate)+'/'+this.$store.state.selectedBranchId)
                        .then(response => {
                            this.fetchedObjects = response.data;
                            // console.log(this.fetchedObjects);

                        });
                        }
                    }
                }
                
            }
        }
    }
 }
</script>