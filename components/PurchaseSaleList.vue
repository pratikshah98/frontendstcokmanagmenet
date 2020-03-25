<template>
    <span >
        <button v-if="selectedItems.length > 0" class="btn btn-danger"><i class="feather icon-trash-2"></i> Delete </button>

        <div class="table-responsive">

            <table class="table table-striped dataex-html5-selectors dataTable">    
                <thead>
                    <tr>
                        <th>Sr.No</th>
                        <th v-if="mode=='sale'">Customer Name</th>
                        <th v-else>Supplier Name</th>
                        <th>Phone No.</th>
                        <th>Email</th>
                        <th v-if="mode=='sale'">Sales Date</th>
                        <th v-else>Purchase Date</th>
                        <th>Branch</th>
                        <th>Actions</th>
                    </tr>           
                </thead>
                <tbody> 
                    <tr v-for="(object,index) in fetchedObjects" :key="index">
                        <td><input type="checkbox" v-model="selectedItems" :value="object.saleId"> {{ index + 1 }}</td>
                        

                        <td v-if="mode=='sale'">{{ object.customerName }}</td>
                        <td v-else> {{ object.supplierName }} </td>

                        <td v-if="mode=='sale'">{{ object.customerPhoneNo }}</td>
                        <td v-else> {{ object.supplierPhoneNo }} </td>

                        <td v-if="mode=='sale'">{{ object.customerEmailId }}</td>
                        <td v-else> {{ object.supplierEmailId }} </td>
                                                                    
                        <td v-if="mode=='sale'"> {{ object.salesDate | filterDateFormat }} </td>
                        <td v-else> {{ object.purchaseDate | filterDateFormat }} </td>

                        <td> {{ object.branchName }} </td>

                        <td v-if="mode=='sale'">
                            <!-- view button -->
                            <button @click="viewSale(object.saleId)"  class="btn btn-primary">
                                <i class="feather icon-list"></i>
                            </button>
                            <!-- edit button - yellow color -->
                            <button class="btn btn-warning" @click="updateSale(object.saleId)"><i class="feather icon-edit"></i></button>
                            <!-- delete button - red color -->
                            <button class="btn btn-danger"><i class="feather icon-trash-2"></i></button>
                        </td>
                        <td v-else>
                            <!-- view button -->
                            <button @click="viewPurchase(object.purchaseId)"  class="btn btn-primary">
                                <i class="feather icon-list"></i>
                            </button>
                            <!-- edit button - yellow color -->
                            <button class="btn btn-warning" @click="updatePurchase(object.purchaseId)"><i class="feather icon-edit"></i></button>
                            <!-- delete button - red color -->
                            <button class="btn btn-danger"><i class="feather icon-trash-2"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </span>            
</template>
<script>
import axios from 'axios'

export default {
    props:{
        mode:{
            type: String,
            required: true
        }
    },
    methods:{
        viewSale(id){
            this.$router.push('/sale/'+id);
        },
        viewPurchase(id){
            this.$router.push('/purchase/'+id);
        },
        updateSale(id){
            this.$router.push('/sale/edit/'+id);
        },
        updatePurchase(id){
            this.$router.push('/purchase/edit/'+id);
        },
    },
    data(){
        return{
            selectedItems:[],
            fetchedObjects: null,
            id:""
        }
    },  
    mounted(){
        if(this.mode=="sale")
        {
            axios.get('http://localhost:4000/saleBranchCustomer')
            .then(response => {
                this.fetchedObjects = response.data;
            });
        }
        else
        {
            axios.get('http://localhost:4000/purchaseBranchSupplier')
            .then(response => {
                this.fetchedObjects = response.data;
            });
        }
        
    },
    filters:{
        filterDateFormat(val){
            let date = new Date(val);
            date.setHours(date.getHours()+6);
            return date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear() ;
        }
    }
}
</script>
<style scoped>
    button{
        margin-bottom:10px;
    }
</style>