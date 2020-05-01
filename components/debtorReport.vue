<template>
    <span>
        <div class="row">
            <div class="col-md-3">
                <div class="form-group">
                    <label >Customer Name*</label>
                    <select2 class="custom-select form-control"  :options="getData" v-model="selectedCustomer" />
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <button class="btn btn-primary mycss" @click="search()">
                         <i class="fa fa-search"></i>
                          Search By Debtor
                    </button>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <button class="btn btn-primary mycss" @click="searchbydate()" >
                         <i class="fa fa-search"></i>
                          Search By Date
                    </button>
                </div>
            </div>  
           <div class="col-md-3">
                <div class="form-group">
                    <button class="btn btn-primary mycss" @click="getDetails()">
                         <i class="fa fa-repeat"></i>
                          Reset
                    </button>
                </div>
            </div> 
        </div>
            <div class="row">
                <div class="col-md-12 col-12" >
                    <div class="table-responsive">
                    <table class="table table-striped dataex-html5-selectors dataTable">    
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th >Customer EmailID</th>
                        <th >Customer PhoneNo</th>
                        <th>Amount Due</th>
                       <th v-if="val!=null">Transaction Date</th>
                    </tr>
                     </thead>
                    <tbody> 
                    <tr v-for="(object,index) in fetchedObjects" :key="index">
                        <td >{{ object.customerName }}</td>
                        <td >{{ object.customerEmailId }}</td>
                        <td >{{ object.customerPhoneNo }}</td>
                        <td v-if="val==null">{{ object.TotalPendingAmount}}</td>
                        <td v-if="val!=null">{{ object.amountDue}}</td>
                        <td v-if="val!=null">{{ object.transactionDate }}</td>
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
            getData: [],
            fetchedObjects: null,
            selectedCustomer:null,
            selectedDate: "",
             allCustomers:[],
             val:null
        }
    },  
     created(){
            this.getDetails();        
    },
    filters:{

    },
    methods:{
        getDetails(){
            axios.get('http://localhost:4000/customer/').then(res=>{
                const options=[{'id':0 , 'text': 'Select Customer'}]; 
                this.allCustomers=res.data;
                for(let index in this.allCustomers){
                    options.push({
                        "id": this.allCustomers[index].customerName,
                        "text": this.allCustomers[index].customerName
                    });
                    //options.push(this.allItems[index].itemId)
                }
                this.getData= options;
            });
            if(this.val!=null)
            {
                this.val=null
            }
            if(this.selectedCustomer!=null){
                this.selectedCustomer=null
            }
             
                axios.get('http://localhost:4000/creditortotalpendingamount/')
                .then(response => {
                    this.fetchedObjects = response.data;
                    // console.log(this.fetchedObjects);
                });
        },
        searchbydate(){
            
             this.val=true;
                axios.get('http://localhost:4000/creditorwithlastpaydate/')
                    .then(response => {
                        this.fetchedObjects = response.data;
                        // console.log(this.fetchedObjects);
                    });
        },
        search(){
            if(this.selectedCustomer!=null){
                 this.val=true;
                 axios.get('http://localhost:4000/creditorwithlastpaydate/'+this.selectedCustomer)
                    .then(response => {
                        this.fetchedObjects = response.data;
                        // console.log(this.fetchedObjects);
                    });
            } 
        }
    }
 }
</script>
