<template>
    <div class="content-wrapper">
            <div class="content-header row">
                <div class="content-header-left col-md-9 col-12 mb-2">
                    <div class="row breadcrumbs-top">
                        <div class="col-12">
                            <h2 v-if="id==null" class="content-header-title float-left mb-0"> Add {{ mode | capitalize }}</h2>
                            <h2 v-else class="content-header-title float-left mb-0"> Edit {{ mode | capitalize }}</h2>
                            <!-- <h2 v-if="mode=='customer'" class="content-header-title float-left mb-0">Customer Add</h2>
                            <h2 v-else-if="mode=='user'" class="content-header-title float-left mb-0">User Add</h2>
                            <h2 v-else-if="mode=='supplier'" class="content-header-title float-left mb-0">Supplier Add</h2>
                            <h2 v-else-if="mode=='item'" class="content-header-title float-left mb-0">Item Add</h2>
                            <h2 v-else class="content-header-title float-left mb-0">Branch Add</h2> -->
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
                                                        <div class="form-group">
                                                            <label v-if="mode=='customer'" for="firstName3">Customer Name*</label>
                                                            <label v-else-if="mode=='user'" for="firstName3">Name*</label>
                                                            <label v-else-if="mode=='supplier'" for="firstName3">Supplier Name*</label>
                                                            <label v-else-if="mode=='item'" for="firstName3">Item Name*</label>
                                                            <label v-else for="firstName3">Branch Name*</label>                                                            
                                                            <input type="text" required class="form-control " v-model="name">
                                                        </div>
                                                    </div>
                                                    <div v-if="mode!='item'"  class="col-md-6">
                                                        <div class="form-group">
                                                            <label for="lastName3">
                                                                Mobile Number*
                                                            </label>
                                                            <input type="text" required class="form-control " v-model="mobNo" >
                                                        </div>
                                                    </div>
                                                    <div v-else  class="col-md-6">
                                                        <div class="form-group">
                                                            <label for="lastName3">
                                                                Price*
                                                            </label>
                                                            <input type="number" required class="form-control " v-model="price">
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row" v-if="mode!='item' && mode!='branch'">
                                                    <div v-if="mode!='item' && mode!='branch'" class="col-md-6">
                                                        <div class="form-group">
                                                            <label for="">
                                                                Email*
                                                            </label>
                                                            <input type="email" required class="form-control " :disabled="id!=null" v-model="email" >
                                                        </div>
                                                    </div>
                                                    <div v-if="mode=='user'" class="col-md-6">
                                                        <div class="form-group">
                                                            <label >Address</label>
                                                            <textarea name="shortDescription" required v-model="address" rows="4" class="form-control"></textarea>
                                                        </div>
                                                     </div>
                                                    <div v-if="mode!='item' && mode!='user'" class="col-md-6">
                                                        <div class="form-group">
                                                            <label >GSTIN</label>
                                                            <input type="text" class="form-control " v-model="gst" >                                                            
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row" v-if="mode=='item'">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label for="">
                                                                GSM
                                                            </label>
                                                            <input type="number"  class="form-control " v-model="gsm" >
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label >Size</label>
                                                            <input type="text"  class="form-control " v-model="size" >                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div v-if="mode!='item' && mode!='user'" class="col-md-6">
                                                        <div class="form-group">
                                                            <label >Address</label>
                                                            <textarea name="shortDescription" required v-model="address" rows="4" class="form-control"></textarea>
                                                        </div>
                                                    </div>
                                                    <div v-if="mode=='item'" class="col-md-6">
                                                        <div class="form-group">
                                                            <label >Reorder Level*</label>
                                                            <input type="number" required class="form-control " v-model="reorder" >                                                            
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6"></div>
                                                </div>
                                            </fieldset>
                                            <fieldset>
                                                <div  class="row">
                                                    <div class="col-md-10 col-4"></div>
                                                    <div class="col-md-2 col-8" >
                                                        <div class="form-group">
                                                            <button style="float:right;" class="btn btn-primary" type="button" v-if="id==null" @click="details()">Submit</button>
                                                            <button style="float:right;" class="btn btn-primary" type="button" v-else @click="details()">Update</button>
                                                        </div>
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
    filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
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
            name:"",
            mobNo:"",
            email:"",
            city:"",
            gst:"",
            address:"",
            price:"",
            gsm:0,
            size:"",
            reorder:0
        }
    },
    created(){
        if(this.id!=null){
            this.getDetails()
        }
    },
    methods:{
        details(){
            if(this.id==null){
                if(this.mode=='customer'){
                    axios.post('http://localhost:4000/'+this.mode+"/",{
                        customerEmailId:this.email,
                        customerName:this.name,
                        customerAddress:this.address,
                        customerPhoneNo:this.mobNo,
                        customerGstNo:this.gst
                    }).then(response=>{
                        if(response){
                            alert("Customer Succesfully Added");
                            this.$router.push("/customer");
                        }
                    });
                    
                }
                else if(this.mode=='supplier'){
                        
                        axios.post('http://localhost:4000/'+this.mode+"/",{
                        supplierEmailId:this.email,
                        supplierName:this.name,
                        supplierAddress:this.address,
                        supplierPhoneNo:this.mobNo,
                        supplierGstNo:this.gst
                    }).then(response=>{
                        if(response){
                            alert("Supplier Succesfully Added");
                            this.$router.push("/supplier");
                        }
                    });
                }
                else if(this.mode=='branch'){
                    axios.post('http://localhost:4000/'+this.mode+"/",{
                        branchName:this.name,
                        branchAddress:this.address,
                        branchPhoneNo:this.mobNo
                    }).then(response=>{
                        if(response){
                            alert("Branch Succesfully Added");
                            this.$router.push("/branch");
                        }
                    });
                }
                else{
                    axios.post('http://localhost:4000/'+this.mode+"/",{
                        name:this.name,
                        gsm:this.gsm,
                        size:this.size,
                        minimumRate:this.price,
                        reorderLevel:this.reorder
                    }).then(response=>{
                        if(response){
                            alert("Item Succesfully Added");
                            this.$router.push("/item");
                        }
                    });
                }
            }
            else{
                if(this.mode=='customer'){
                    axios.put('http://localhost:4000/'+this.mode+"/"+this.id,{
                        customerEmailId:this.id,
                        customerName:this.name,
                        customerAddress:this.address,
                        customerPhoneNo:this.mobNo,
                        customerGstNo:this.gst
                    }).then(response=>{
                        if(response){
                            alert("Customer Succesfully Updated");
                            this.$router.push("/customer/"+this.id);
                        }
                    });
                    
                }
                else if(this.mode=='supplier'){
                        axios.put('http://localhost:4000/'+this.mode+"/"+this.id,{
                        supplierId:this.id,
                        supplierName:this.name,
                        supplierAddress:this.address,
                        supplierPhoneNo:this.mobNo,
                        supplierGstNo:this.gst
                    }).then(response=>{
                        if(response){
                            alert("Supplier Succesfully Updated");
                            this.$router.push("/supplier/"+this.id);
                        }
                    });
                }
                else if(this.mode=='branch'){
                    
                    axios.put('http://localhost:4000/'+this.mode+"/"+this.id,{
                        branchId:this.id,
                        branchName:this.name,
                        branchAddress:this.address,
                        branchPhoneNo:this.mobNo
                    }).then(response=>{
                        if(response){
                            alert("Branch Succesfully Updated");
                            console.log(response);
                            this.$router.push("/branch/"+this.id);
                        }
                    });
                }
                else{
                    axios.put('http://localhost:4000/'+this.mode+"/"+this.id,{
                        itemId:this.id,
                        name:this.name,
                        gsm:this.gsm,
                        size:this.size,
                        minimumRate:this.price,
                        reorderLevel:this.reorder
                    }).then(response=>{
                        if(response){
                            alert("Item Succesfully Updated");
                            this.$router.push("/item/"+this.id);
                        }
                    });
                }
            }
        },
        getDetails(){
            if(this.mode=='customer'){
                axios.get('http://localhost:4000/'+this.mode+"/"+this.id)
                .then(res=>{
                    let mydata=res.data[0];
                    this.email=mydata.customerEmailId;
                    this.name=mydata.customerName;
                    this.address=mydata.customerAddress;
                    this.mobNo=mydata.customerPhoneNo;
                    this.gst=mydata.customerGstNo;
                });
            }
            else if(this.mode=="supplier"){
                axios.get('http://localhost:4000/'+this.mode+"/"+this.id)
                .then(res=>{
                    let mydata=res.data[0];
                    this.email=mydata.supplierEmailId;
                    this.name=mydata.supplierName;
                    this.address=mydata.supplierAddress;
                    this.mobNo=mydata.supplierPhoneNo;
                    this.gst=mydata.supplierGstNo;
                });
            }
            else if(this.mode="branch"){
                axios.get('http://localhost:4000/'+this.mode+"/"+this.id)
                .then(res=>{
                    let mydata=res.data[0];
                    this.name=mydata.branchName;
                    this.address=mydata.branchAddress;
                    this.mobNo=mydata.branchPhoneNo;
                });   
            }
            else if(this.mode="user"){
                axios.get('http://localhost:4000/'+this.mode+"/"+this.id)
                .then(res=>{
                    let mydata=res.data[0];
                    this.email = userEmailId;
                    this.name=mydata.userName;
                    this.address=mydata.userAddress;
                    this.mobNo=mydata.userPhoneNo;
                });   
            }
            else{
                axios.get('http://localhost:4000/'+this.mode+"/"+this.id)
                .then(res=>{
                    let mydata=res.data[0];                    
                    this.name=mydata.name;
                    this.gsm=mydata.gsm;
                    this.size=mydata.size;
                    this.price=mydata.minimumRate;
                    this.reorder=mydata.reorderLevel;
                });
            }
        }
    }
}
</script>
