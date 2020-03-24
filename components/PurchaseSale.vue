<template>
    <div class="content-wrapper">
            <div class="content-header row">
                <div class="content-header-left col-md-9 col-12 mb-2">
                    <div class="row breadcrumbs-top">
                        <div class="col-12">
                            <h2 class="content-header-title float-left mb-0"> Add {{ mode | capitalize }}</h2>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="content-body">
                <!-- Form wizard with step validation section start -->
                <section id="validation">
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-content">
                                    <div class="card-body">
                                        <!-- <form action="#" class="steps-validation wizard-circle"> -->
                                            <fieldset>
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label v-if="mode=='purchase'"> Supplier*</label>                                                            
                                                            <label v-else> Customer*</label>
                                                            <select2 
                                                                :options="customerOrSupplierList" 
                                                                v-model="selectedCustomerOrSupplier"
                                                                classes="form-control col-md-12"
                                                            ></select2>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label v-if="mode=='purchase'"> Purchase Date*</label>
                                                            <label v-else> Sale Date*</label>
                                                            <client-only>
                                                                <date-picker
                                                                    
                                                                    input-class="form-control col-md-12"
                                                                    class="datepicker"
                                                                    placeholder="YYYY-MM-DD"
                                                                    format="yyyy-MM-d"
                                                                    v-model="selectedDate"
                                                                ></date-picker>
                                                            </client-only>
                                                        </div>
                                                    </div>

                                                    <div v-if="mode=='purchase'" class="col-md-2"></div>
                                                    <div v-else class="col-md-2">
                                                        <div class="form-group">
                                                            <label> Sale Type*</label>
                                                            <select2
                                                                :options="saleTypeList"
                                                                v-model="selectedSaleType"
                                                                classes="form-control col-md-12"
                                                            ></select2>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label> Branch*</label>
                                                            <select2
                                                                :options="branchList"
                                                                v-model="selectedBranch"
                                                                classes="form-control col-md-12"
                                                            ></select2>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div v-for="item in totalItems" :key="item-1" class="row">
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label>Item*</label>
                                                            <select2 
                                                                :options="itemList"
                                                                v-model="insertItemObjects[item-1].fkItemId"
                                                                classes="form-control col-md-12"
                                                            ></select2>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-1">
                                                        <div class="form-group">
                                                            <label>Quantity*</label>
                                                            <input type="number" min=1 class="form-control" v-model="insertItemObjects[item-1].saleQuantity">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label> </label>
                                                            <button v-if="totalItems!=1" style="float:right;" class="form-control btn btn-danger" type="button" @click="removeItem(item-1)">
                                                                <i class="feather icon-minus-square"></i>
                                                                Remove This Item
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4"></div>
                                                </div>
                                                
                                                <div class="row col-md-4">
                                                    <div class="form-group">
                                                        <button style="float:right;" class="form-control btn btn-primary" type="button" @click="addItem">
                                                            <i class="feather icon-plus-square"></i>
                                                            Add Another Item
                                                        </button>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <fieldset>
                                                <div  class="row">
                                                    <div class="col-md-10 col-4"></div>
                                                    <div class="col-md-2 col-8" >
                                                        <div class="form-group">
                                                            <button style="float:right;" class="btn btn-primary" type="button" v-if="id==null" @click="submitDetails">Submit</button>
                                                            <button style="float:right;" class="btn btn-primary" type="button" v-else @click="update()">Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        <!-- </form> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <!-- Form wizard with step validation section end -->

            </div>
        </div>
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
            itemList:[],
            branchList:[],
            customerOrSupplierList:[],
            saleTypeList:[],

            selectedCustomerOrSupplier:0,
            selectedBranch:0,
            selectedSaleType:0,

            totalItems:1,
            selectedDate: new Date(),
            
            insertItemObjects:[{
                fkItemId:[],
                saleQuantity:1
            }]
        }
    },
    beforeMount(){
        if(this.$props.mode=='purchase')
        {
            axios.get('http://localhost:4000/supplier').then(response=>{
                const options=[{'id':0 , 'text': 'Select Supplier'}];
                for(let index in response.data){
                    options.push({
                        "id": response.data[index].supplierEmailId,
                        "text": response.data[index].supplierName
                    });
                }
                this.customerOrSupplierList = options;
            });
        }
        else
        {
            axios.get('http://localhost:4000/customer').then(response=>{
                const options=[{'id':0 , 'text': 'Select Customer'}];                
                for(let index in response.data){
                    options.push({
                        "id": response.data[index].customerEmailId,
                        "text": response.data[index].customerName
                    });
                }
                this.customerOrSupplierList = options;
            });
            axios.get('http://localhost:4000/saleType').then(response=>{
                const options=[{'id':0 , 'text': 'Select Sale Type'}];
                for(let index in response.data){
                    options.push({
                        "id": response.data[index].saleTypeId,
                        "text": response.data[index].saleType
                    });
                }
                this.saleTypeList = options;
            });
        }

        axios.get('http://localhost:4000/branch').then(response=>{
            const options=[{'id':0 , 'text': 'Select Branch'}];
            for(let index in response.data){
                options.push({
                    "id": response.data[index].branchId,
                    "text": response.data[index].branchName
                });
            }
            this.branchList = options;
        });
        
        axios.get('http://localhost:4000/item').then(response=>{
            const options=[{'id':0 , 'text': 'Select Item'}];
            for(let index in response.data){
                const itemGSM = response.data[index].gsm;
                const itemSize = response.data[index].size;
                let itemName = response.data[index].name;
                if(itemGSM!=null){
                    itemName = itemName + '  (GSM-' + itemGSM + ')';
                }
                if(itemSize!=null){
                    itemName = itemName + '  (Size-' + itemSize + ')';
                }
                options.push({
                    "id": response.data[index].itemId,
                    "text": itemName
                });
            }
            this.itemList = options;
        });

        
    },
    methods:{
        submitDetails: function(){
            // axios.post('http://localhost:4000/Sale/',{
            //     salesDate: this.selectedDate,
            //     isInvoiceGenerated: 0,
            //     fkSaleTypeId: this.selectedSaleType,
            //     fkCustomerEmailId: this.selectedCustomerOrSupplier,
            //     fkBranchId: this.selectedBranch
            // }).then(response=>{
            //     if(response){
            //         console.log(response);
            //         // alert("Customer Succesfully Added");
            //         // this.$router.push("/customer");
            //     }
            // });
            alert("Customer: "+this.selectedCustomerOrSupplier +"\nSelected date : " + this.selectedDate + "\nSelected branch : " + this.selectedBranch + "\nSelected sale type : " + this.selectedSaleType);
        },
        addItem:function(){
            this.totalItems++; 
            this.insertItemObjects.push({   
                fkItemId:"",
                saleQuantity:1
            });
        },
        removeItem: function(itemIndex){
            this.totalItems--; 
            this.insertItemObjects.splice(itemIndex,1);
        }
    },
    filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    }
}
</script>

<style scoped>
.datepicker{
    /* position: fixed;
    z-index: 2; */
}
</style>
