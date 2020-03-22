<template>
    <div class="content-wrapper">
        <div class="content-header row">
            <div class="content-header-left col-md-9 col-12 mb-2">
                <div class="row breadcrumbs-top">
                    <div class="col-12">
                        <h2 class="content-header-title float-left mb-0">View {{mode|capitalize}}</h2>
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
                                    <fieldset>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label v-if="mode=='customer'">Customer Name : {{ name }}</label>
                                                <label v-else-if="mode=='user'" >User Name : {{ name }}</label>
                                                <label v-else-if="mode=='supplier'" >Supplier Name : {{ name }}</label>
                                                <label v-else-if="mode=='branch'" >Branch Name : {{ name }}</label>
                                                <label v-else>Item Name : {{ name }}</label>

                                                <div v-if="mode!='item'"  class="col-md-4">
                                                    <label> Phone Number : {{ phoneNo }}</label>
                                                </div>
                                                <div v-if="mode=='customer' || mode=='supplier'"  class="col-md-4">
                                                    <label> GSTIN :  {{ gstNo }}</label>
                                                </div>
                                                <div v-else-if="mode=='item'"  class="col-md-6">
                                                    <label> Price : {{ price }} </label>
                                                </div>
                                                <div v-else class="col-md-6">
                                                    <!-- <label>  </label> -->
                                                </div>
                                            </div>
                                        </div>

                                    <div class="row">
                                        <div v-if="mode!='item' && mode!='branch'" class="col-md-6">
                                            <label >Email : {{ email }}</label>
                                        </div>
                                        <div v-if="mode!='item'" class="col-md-6">
                                            <label >Address : {{ address }}</label>
                                        </div>

                                        <div v-if="mode=='item'" class="col-md-3">
                                            <label > GSM : {{ gsm }}</label>
                                        </div>
                                        <div v-if="mode=='item'" class="col-md-3">
                                            <label > Size : {{ size }}</label>
                                        </div>
                                        <div v-if="mode=='item'" class="col-md-6">
                                            <label > Reorder-Level : {{ reorderLevel }}</label>
                                        </div>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <div  class="row">
                                        <div class="col-md-9 col-4"></div>
                                        <div class="col-md-3 col-8" >
                                            <button @click="gotoEdit()" style="float:right;" class="btn btn-primary">
                                                <i class="feather icon-edit-2"></i> Edit {{ mode | capitalize }}
                                            </button>
                                        </div>
                                    </div>
                                    </fieldset>
                                        <!-- Step 3 -->
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
    props: {
        id: {
            type: String,
            required: true
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
            name:"",
            email:"",
            address:"",
            phoneNo:"",
            gstNo:"",
            price:"",
            reorderLevel:""
        }
    },
    methods:{
        gotoEdit:function(){
            this.$router.push( '/' + this.mode + '/edit/' + this.id );
        }
    },
    mounted(){
        axios.get('http://localhost:4000/' + this.$props.mode + '/' + this.$props.id).then(Response=>{  
            if(this.$props.mode=='customer'){
                this.name = Response.data[0].customerName;
                this.email = Response.data[0].customerEmailId;
                this.address = Response.data[0].customerAddress;
                this.phoneNo = Response.data[0].customerPhoneNo;
                this.gstNo = Response.data[0].customerGstNo;
            }
            else if(this.mode=='supplier'){
                this.name = Response.data[0].supplierName;
                this.email = Response.data[0].supplierEmailId;
                this.address = Response.data[0].supplierAddress;
                this.phoneNo = Response.data[0].supplierPhoneNo;
                this.gstNo = Response.data[0].supplierGstNo;
            }
            else if(this.$props.mode=='branch'){
                this.name = Response.data[0].branchName;
                this.address = Response.data[0].branchAddress;
                this.phoneNo = Response.data[0].branchPhoneNo;
            }
            else if(this.mode=='item'){
                this.name = Response.data[0].name;
                this.price =  Response.data[0].minimumRate;
                this.reorderLevel = Response.data[0].reorderLevel;
                this.gsm = Response.data[0].gsm;
                this.size = Response.data[0].size;
            }
            else if(this.$props.mode=='user'){
                this.name = Response.data[0].userName;
                this.email = Response.data[0].userEmailId;
                this.address = Response.data[0].userAddress;
                this.phoneNo = Response.data[0].userPhoneNo;
            }
            else if(this.$props.mode=='supplier'){
                    console.log("All Suppliers Details:- "+this.name+" "+this.mobNo+" "+this.email+" "+this.city+" "+this.address);
            }
            else{
               
            }
        });
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
