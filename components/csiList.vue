<template>
    <span >
            <button v-if="selectedItems.length > 0" class="btn btn-danger"><i class="feather icon-trash-2"></i> Delete </button>

        <div class="table-responsive">

            <table class="table table-striped dataex-html5-selectors dataTable">    
                <thead>
                    <tr v-if="mode=='customer' || mode=='supplier'" >
                        <th></th>
                        <th>Sr.No</th>
                        <th>Name</th>
                        <th>Mobile No.</th>
                        <th>Email</th>
                        <th>GSTIN</th>
                        <th>Actions</th>
                    </tr>
                    <tr v-else-if="mode=='branch'">
                        <th></th>
                        <th>Sr.No</th>
                        <th>Name</th>
                        <th>Mobile No.</th>
                        <th>Actions</th>
                    </tr>            
                    <tr v-else>
                        <th></th>
                        <th>Sr.No</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description(GSM - Size)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody v-if="mode=='customer'" > 
                    <tr v-for="(object,index) in fetchedObjects" :key="index">
                        <td><input type="checkbox" v-model="selectedItems" :value="object.customer_emailId"></td>
                        <td>  {{ index + 1 }}</td>
                        <td> {{ object.customer_name }} </td>
                        <td> {{ object.customer_phoneNo }}</td>
                        <td> {{ object.customer_emailId }}</td>
                        <td> {{ object.customer_gstno }} </td>                                                     
                        <td>
                            <!-- view button -->
                            <button @click="viewCustomer(object.customer_emailId)"  class="btn btn-primary">
                                <i class="feather icon-list"></i>
                            </button>
                            <!-- edit button - yellow color -->
                            <button class="btn btn-warning" @click="update(object.customer_emailId)"><i class="feather icon-edit"></i></button>
                            <!-- delete button - red color -->
                            <button class="btn btn-danger"><i class="feather icon-trash-2"></i></button>
                        </td>
                    </tr>
                </tbody>

                <tbody v-else-if="mode=='supplier'" > 
                    <tr v-for="(object,index) in fetchedObjects" :key="index">
                        <td><input type="checkbox" v-model="selectedItems" :value="object.supplier_emailId"></td>
                        <td>{{ index + 1 }}</td>
                        <td> {{ object.supplier_name }} </td>
                        <td> {{ object.supplier_phoneNo }}</td>
                        <td> {{ object.supplier_emailId }}</td>
                        <td> {{ object.supplier_gstno }} </td>                                                     
                        <td>
                            <!-- view button -->
                            <button @click="viewSupplier( object.supplier_emailId )"  class="btn btn-primary">
                                <i class="feather icon-list"></i>
                            </button>
                            <!-- edit button - yellow color -->
                            <button class="btn btn-warning" @click="update(object.supplier_emailId)"><i class="feather icon-edit"></i></button>
                            <!-- delete button - red color -->
                            <button class="btn btn-danger" @click="update(object.supplier_emailId)"><i class="feather icon-trash-2"></i></button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else-if="mode=='branch'" > 
                    <tr v-for="(object,index) in fetchedObjects" :key="index">
                        <td><input type="checkbox" v-model="selectedItems" :value="object.branchId"></td>
                        <td>{{ index + 1 }}</td>
                        <td> {{ object.branchName }} </td>
                        <td> {{ object.branchPhoneNo }}</td>                                             
                        <td>
                            <!-- view button -->
                            <button @click="viewSupplier( object.branchId )"  class="btn btn-primary">
                                <i class="feather icon-list"></i>
                            </button>
                            <!-- edit button - yellow color -->
                            <button class="btn btn-warning" @click="update(object.branchId)"><i class="feather icon-edit"></i></button>
                            <!-- delete button - red color -->
                            <button class="btn btn-danger"><i class="feather icon-trash-2"></i></button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else> 
                    <tr v-for="(object,index) in fetchedObjects" :key="index">
                        <td><input type="checkbox" v-model="selectedItems" :value="object.itemId"></td>
                        <td>  {{ index + 1 }}</td>
                        <td> {{ object.name }} </td>
                        <td> {{ object.minimumRate }}</td>
                        <td> {{ object.GSM }} - {{object.size}}</td>                                                    
                        <td>
                            <!-- view button -->
                            <button @click="viewItem(object.item_Id)"  class="btn btn-primary">
                                <i class="feather icon-list"></i>
                            </button>
                            <!-- edit button - yellow color -->
                            <button class="btn btn-warning" @click="update(object.item_Id)">
                                <i class="feather icon-edit"></i></button>
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
        viewCustomer: function(email){
            this.$router.push('/customers/'+email);
        },
        viewSupplier: function(email){
            this.$router.push('/suppliers/'+email);
        },
        viewItem: function(itemId){
            this.$router.push('/items/'+itemId);
        }, 
        update(id){
            this.$router.push('/'+this.mode+"/edit/"+id);   
        }

    },
    data(){
        return{
            selectedItems:[],
            fetchedObjects: null,
            id:""
        }
    },  
    mounted(){
        axios.get('http://localhost:4000/'+this.mode).
        then(response => (this.fetchedObjects = response.data));
    },
}
</script>
<style scoped>
    button{
        margin-bottom:10px;
    }
</style>