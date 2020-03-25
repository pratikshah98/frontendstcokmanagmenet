<template>
    <span >
            <button v-if="selectedItems.length > 0" class="btn btn-danger"><i class="feather icon-trash-2"></i> Delete </button>

        <div class="table-responsive" v-if="showTable==true" id="mytable">
            <div id="DataTables_Table_4_wrapper" class="dataTables_wrapper dt-bootstrap4">
            <div class="dt-buttons btn-group">      
                <button class="btn btn-secondary buttons-copy buttons-html5" ><span>Copy</span></button> 
                <button class="btn btn-secondary buttons-pdf buttons-html5" ><span>PDF</span></button>
                <button class="btn btn-secondary" ><span>JSON</span></button> 
                <button class="btn btn-secondary buttons-print" >    <span>Print</span></button>
             </div>
             <div id="DataTables_Table_4_filter" class="dataTables_filter">
                <label>Search:<input type="search" class="form-control form-control-sm" placeholder="" aria-controls="DataTables_Table_4">
                </label>
             </div>
            <table class="table table-striped dataex-html5-selectors dataTable" id="DataTables_Table_4" role="grid" aria-describedby="DataTables_Table_4_info">     
                <thead>
                    <tr v-if="mode=='user'" >
                        <th>Sr.No</th>
                        <th>Name</th>
                        <th>Phone No.</th>
                        <th>Email</th>
                        <th>Branch</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                    <tr v-else-if="mode=='customer' || mode=='supplier'" >
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
                        <td> {{ object.branchName }}</td>                                                  
                        <td> {{ object.roleName }}</td>                                                  
                        <td>
                            <!-- view button -->
                            <button @click="viewUser(object.userEmailId)"  class="btn btn-primary">
                                <i class="feather icon-list"></i>
                            </button>
                            <!-- edit button - yellow color -->
                            <button class="btn btn-warning"  @click="update(object.userEmailId)"><i class="feather icon-edit"></i></button>
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
                            <button class="btn btn-danger" ><i class="feather icon-trash-2"></i></button>
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
            id:"",
            showTable:false
        }
    },  
    created(){
        this.getDetails();
    },
    mounted(){
        

    },
    methods:{
        async getDetails(){
            let name=this.mode;
        // if(this.mode=="user"){
        //     name+="branchrole"
        // }
        console.log("called 1");
        await axios.get('http://localhost:4000/'+name)
        .then(response => {
            this.fetchedObjects = response.data;
        console.log("called 2");
        })
        .then(res1=>{
        console.log("called 3");

            this.showTable=true;
        })
        .then(res2=>{
        console.log("called 4");

            let d=document.getElementById("mytable");
            // let d1=document.createElement("DIV");
            // d1.classList.add("dataTables_wrapper");
            // d1.classList.add("dt-bootstrap4");
            // d1.setAttribute("id","DataTables_Table_4_wrapper");
            // // let d2=document.createElement("DIV");
            // // d2.classList.add()
            // let t=document.getElementsByTagName("table");
            // t.setAttribute("aria-describedby","DataTables_Table_4_info");
            // t.setAttribute("id","DataTables_Table_4");
            // d1.appendChild(t); 
            d.classList.add("table-responsive");
            // d.appendChild(d1);
        });
        console.log("Called 5");
        }
    }
}
</script>
<style scoped>
    button{
        margin-bottom:10px;
    }
</style>