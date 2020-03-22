<template>
    <span >
            <button v-if="selectedItems.length > 0" class="btn btn-danger"><i class="feather icon-trash-2"></i> Delete </button>

        <div class="table-responsive">

            <table class="table table-striped dataex-html5-selectors dataTable">    
                <thead>
                    <tr v-if="mode=='user'" >
                        <th>Sr.No</th>
                        <th>Name</th>
                        <th>Phone No.</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                    <tr v-else-if="mode!='item' && mode!='user' && mode!='branch'" >
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
                        <td><input type="checkbox" v-model="selectedItems" :value="object.customerEmailId"></td>
                        <td>  {{ index + 1 }}</td>
                        <td> {{ object.customerName }} </td>
                        <td> {{ object.customerPhoneNo }}</td>
                        <td> {{ object.customerEmailId }}</td>
                        <td> {{ object.customerGstNo }} </td>                                                     
                        <td>
                            <!-- view button -->
                            <button @click="viewCustomer(object.customerEmailId)"  class="btn btn-primary">
                                <i class="feather icon-list"></i>
                            </button>
                            <!-- edit button - yellow color -->
                            <button class="btn btn-warning" @click="update(object.customerEmailId)"><i class="feather icon-edit"></i></button>
                            <!-- delete button - red color -->
                            <button class="btn btn-danger"><i class="feather icon-trash-2"></i></button>
                        </td>
                    </tr>
                </tbody>
                 <tbody v-else-if="mode=='user'" > 
                    <tr v-for="(object,index) in fetchedObjects" :key="index">
                        <td> <input type="checkbox" v-model="selectedItems" :value="object.userEmailId">  {{ index + 1 }}</td>
                        <td> {{ object.userName }} </td>
                        <td> {{ object.userPhoneNo }}</td>
                        <td> {{ object.userEmailId }}</td>                                                  
                        <td>
                            <!-- view button -->
                            <button @click="viewUser(object.userEmailId)"  class="btn btn-primary">
                                <i class="feather icon-list"></i>
                            </button>
                            <!-- edit button - yellow color -->
                            <button class="btn btn-warning"><i class="feather icon-edit"></i></button>
                            <!-- delete button - red color -->
                            <button class="btn btn-danger"><i class="feather icon-trash-2"></i></button>
                        </td>
                    </tr>
                </tbody>

                <tbody v-else-if="mode=='supplier'" > 
                    <tr v-for="(object,index) in fetchedObjects" :key="index">
                        <td><input type="checkbox" v-model="selectedItems" :value="object.supplierEmailId"></td>
                        <td>{{ index + 1 }}</td>
                        <td> {{ object.supplierName }} </td>
                        <td> {{ object.supplierPhoneNo }}</td>
                        <td> {{ object.supplierEmailId }}</td>
                        <td> {{ object.supplierGstNo }} </td>                                                     
                        <td>
                            <!-- view button -->
                            <button @click="viewSupplier( object.supplierEmailId )"  class="btn btn-primary">
                                <i class="feather icon-list"></i>
                            </button>
                            <!-- edit button - yellow color -->
                            <button class="btn btn-warning" @click="update(object.supplierEmailId)"><i class="feather icon-edit"></i></button>
                            <!-- delete button - red color -->
                            <button class="btn btn-danger" @click="update(object.supplierEmailId)"><i class="feather icon-trash-2"></i></button>
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
                            <button @click="viewBranch( object.branchId )"  class="btn btn-primary">
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
                        <td> {{ object.gsm }} - {{object.size}}</td>                                                    
                        <td>
                            <!-- view button -->
                            <button @click="viewItem(object.itemId)"  class="btn btn-primary">
                                <i class="feather icon-list"></i>
                            </button>
                            <!-- edit button - yellow color -->
                            <button class="btn btn-warning" @click="update(object.itemId)">
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
            this.$router.push('/customer/'+email);
        },
        viewUser: function(email){
            this.$router.push('/user/'+email);
        },
        viewSupplier: function(email){
            this.$router.push('/supplier/'+email);
        },
        viewItem: function(itemId){
            this.$router.push('/item/'+itemId);
        }, 
        viewBranch: function(branchId){
            this.$router.push('/branch/'+branchId);
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