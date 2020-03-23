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
                                                            <select id="mySelect2" class="col-md-12"></select>
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
                                                            <select class="custom-select form-control" required v-model="selectedSaleType">
                                                                <option v-for="(a,index) in saleTypeList" :key="index" :value="a.saleTypeId">{{a.saleType}}</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label> Branch*</label>
                                                            <select class="custom-select form-control" required v-model="selectedBranch">
                                                                <option  v-for="(a,index) in branchList" :key="index" :value="a.branchId">{{a.branchName}}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div v-for="item in totalItems" :key="item-1" class="row">
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label>Item*</label>
                                                            <select class="custom-select form-control" required v-model="insertItemObjects[item-1].fkItemId">
                                                                <option  v-for="(a,index) in itemList" :key="index" :value="a.itemId">{{a.name}}</option>
                                                            </select>
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

export default {
    head(){
        return {
            script: [
                { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' },
                { src: 'https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/js/select2.min.js'}
            ],
            link:[
                { href: "https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/css/select2.min.css" }
            ]
        }
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
            branchList:[],
            saleTypeList:[],
            itemList:[],
            customerOrSupplierList:[],

            totalItems:1,

            selectedBranch:[],
            selectedDate: new Date(),
            selectedSaleType:[],
            
            insertItemObjects:[{
                fkItemId:"",
                saleQuantity:0
            }]
        }
    },
    mounted(){
        if(this.$props.mode=='purchase')
        {
            axios.get('http://localhost:4000/supplier').then(response=>{
                const options=[];
                for(let index in response.data){
                    options.push({
                        "id": response.data[index].supplierEmailId,
                        "text": response.data[index].supplierName
                    });
                }
                this.customerOrSupplierList = options;
                console.log(this.customerOrSupplierList);
                $("#mySelect2").select2({
                    data: this.customerOrSupplierList
                });
            });
        }
        else
        {
            axios.get('http://localhost:4000/customer').then(response=>{
                const options=[];
                for(let index in response.data){
                    options.push({
                        "id": response.data[index].customerEmailId,
                        "text": response.data[index].customerName
                    });
                }
                this.customerOrSupplierList = options;
                console.log(this.customerOrSupplierList);
                $("#mySelect2").select2({
                    data: this.customerOrSupplierList
                });
            });
            axios.get('http://localhost:4000/saleType').then(response=>{
                this.saleTypeList = response.data;
            });
        }

        axios.get('http://localhost:4000/branch').then(response=>{
            this.branchList = response.data;
        });
        
        axios.get('http://localhost:4000/item').then(response=>{
            this.itemList = response.data;
        });

        
    },
    computed:{
        selectedCustomerOrSupplier:function(){
            return $('#mySelect2').select2('data')[0].id
        }
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
        update: function(){
            
        },
        addItem:function(){
            this.totalItems++; 
            this.insertItemObjects.push({
                fkItemId:"",
                saleQuantity:0
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
