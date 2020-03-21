<template>
    <span >
                                        
        <div class="table-responsive">

            <button v-if="selectedItems.length > 0" class="btn btn-danger"><i class="feather icon-trash-2"></i> Delete </button>
            <table class="table table-striped dataex-html5-selectors dataTable">    
                <thead>
                    <tr role="row"> 
                        <th ></th>
                        <th style="cursor:pointer;">Sr.No</th>
                        <th style="cursor:pointer;" v-if="mode=='customer'">Customer Name</th>
                        <th style="cursor:pointer;" v-if="mode=='supplier'">Supplier Name</th>
                        <th style="cursor:pointer;" v-if="mode=='item'">Item Name</th>
                        <th style="cursor:pointer;" v-if="mode!='item'">Mobile</th>
                        <th style="cursor:pointer;" v-if="mode!='item'">Email</th>
                        <th style="cursor:pointer;" v-if="mode=='item'">Price</th>
                        <th style="cursor:pointer;" v-if="mode=='item'">Description</th>
                        <th >Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(d,index) in objects" :key="index">
                        <td v-if="mode=='item'"> <input type="checkbox" v-model="selectedItems" :value="d.itemId"> </td>
                        <td v-else> <input type="checkbox" v-model="selectedItems" :value="d.email"> </td>
                        <td> {{ index + 1 }} </td>
                        <td> {{ d.name }} </td>
                        <td v-if="mode!='item'">{{d.mobile}}</td>
                        <td v-if="mode!='item'">{{d.email}}</td>
                        <td v-if="mode=='item'">{{d.price}}</td>
                        <td v-if="mode=='item'">{{d.description}}</td>                                                        
                        <td>
                            <!-- view button -->
                            <button v-if="mode=='customer'" @click="viewCustomer(d.email)"  class="btn btn-primary">
                                <i class="feather icon-list"></i>
                            </button>
                            <button v-if="mode=='supplier'" @click="viewSupplier(d.email)"  class="btn btn-primary">
                                <i class="feather icon-list"></i>
                            </button>
                            <button v-if="mode=='item'" @click="viewItem(d.itemId)"  class="btn btn-primary">
                                <i class="feather icon-list"></i>
                            </button>

                            <!-- edit button - yellow color -->
                            <button class="btn btn-warning"><i class="feather icon-edit"></i></button>

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
        }
    },
    data(){
        return{
            selectedItems:[],
            objects:[
                { name:"Sunil",mobile:"dd",email:"1f",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"2f",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"3f",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"4f",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"5f",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"6f",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"7f",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"8f",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"9f",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"0f",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"faf",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"fbf",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"fcf",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"fff",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"fgf",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"fhf",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"ffj",address:"ff",description:"ff",price:"gdhs"},

            ]
        }
    }
}
</script>
<style scoped>
    button{
        margin-bottom:10px;
    }
</style>