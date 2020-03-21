<template>
    <div class="content-wrapper">
            <div class="content-header row">
                <div class="content-header-left col-md-9 col-12 mb-2">
                    <div class="row breadcrumbs-top">
                        <div class="col-12">
                            <h2 v-if="mode=='customer'" class="content-header-title float-left mb-0">View Customer</h2>
                            <h2 v-else-if="mode=='user'" class="content-header-title float-left mb-0">View user</h2>
                            <h2 v-else-if="mode=='supplier'" class="content-header-title float-left mb-0">View Supplier</h2>
                            <h2 v-else class="content-header-title float-left mb-0">View Item</h2>
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
                                        <form action="#" class="steps-validation wizard-circle">
                                            <fieldset>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <label v-if="mode=='customer'">Customer Name : {{ name }}</label>
                                                         <label v-else-if="mode=='user'" >User Name : {{ name }}</label>
                                                        <label v-else-if="mode=='supplier'" >Supplier Name : {{ name }}</label>
                                                        <label v-else>Item Name : {{ name }}</label>

                                                        <div v-if="mode!='item'"  class="col-md-4">
                                                           <label> Phone Number : {{ phoneNo }}</label>
                                                        </div>
                                                    <div v-if="mode!='item'"  class="col-md-4">
                                                    <label> GSTIN :  {{ gstNo }}</label>
                                                    </div>
                                                        <div v-else  class="col-md-6">
                                                            <label> Price : {{ price }} </label>
                                                        </div>
                                                    </div>
                                                </div>

                                            <div class="row">
                                                <div v-if="mode!='item'" class="col-md-6">
                                                    <label >Email : {{ email }}</label>
                                                </div>
                                                <div v-if="mode!='item'" class="col-md-6">
                                                    <label >Address : {{ address }}</label>
                                                </div>

                                                <div v-if="mode=='item'" class="col-md-6">
                                                    <label >Description : {{ description }}</label>
                                                </div>
                                                <div v-if="mode=='item'" class="col-md-6"></div>
                                            </div>
                                        </fieldset>
                                        <fieldset>
                                            <div  class="row">
                                                <div class="col-md-9 col-4"></div>
                                                <div class="col-md-3 col-8" >
                                                    <button @click="gotoEdit" style="float:right;" class="btn btn-primary">
                                                        <i class="feather icon-edit-2"></i> Edit {{ mode | capitalize }}
                                                    </button>
                                                </div>
                                            </div>
                                            </fieldset>

                                           <!-- Step 3 -->
                                        </form>
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
            description:""
        }
    },
    methods:{
        gotoEdit:function(){
            this.$router.push('/' + this.$props.mode + '/edit/' +this.$props.id);
        }
    },
    mounted(){
        axios.get('http://localhost:4000/' + this.$props.mode + '/' + this.$props.id).then(Response=>{  
            if(this.$props.mode=='customer'){
                this.name = Response.data[0].customer_name;
                this.email = Response.data[0].customer_emailId;
                this.address = Response.data[0].customer_address;
                this.phoneNo = Response.data[0].customer_phoneNo;
                this.gstNo = Response.data[0].customer_gstno;
            }
           else if(this.$props.mode=='user'){
                    console.log("All Users Details:- "+this.name+" "+this.mobNo+" "+this.email+" "+this.city+" "+this.address);
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
