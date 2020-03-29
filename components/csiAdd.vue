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
                                        <form class="steps-validation wizard-circle" @submit.prevent="details()">
                                            <fieldset>
                                                <div class="row form-group">
                                                    <div v-if="mode!='item'" class="col-md-6">
                                                        <div class="form-group">
                                                            <label v-if="mode=='customer'" for="firstName3">Customer Name*</label>
                                                            <label v-else-if="mode=='user'" for="firstName3">User Name*</label>
                                                            <label v-else-if="mode=='supplier'" for="firstName3">Supplier Name*</label>
                                                            
                                                            <label v-else for="firstName3">Branch Name*</label>                                                            
                                                            <input type="text" required class="form-control " v-model="name">
                                                        </div>
                                                    </div>
                                                    <div v-else class="col-md-4">
                                                        <label for="firstName3">Item Name*</label>
                                                        <input type="text" required class="form-control " v-model="name">
                                                    </div>

                                                    <div v-if="mode!='item'"  class="col-md-6">
                                                        <div class="form-group">
                                                            <label for="lastName3">
                                                                Mobile Number*
                                                            </label>
                                                            <input type="text" required class="form-control " v-model="mobNo" >
                                                        </div>
                                                    </div>
                                                    <div v-else class="row col-md-8">
                                                        <div class="col-md-4">
                                                            <label>
                                                                Price*
                                                            </label>
                                                            <input type="number" required class="form-control " v-model="price">
                                                        </div>
                                                        <div class="col-md-8">
                                                            <label>Default Supplier*</label>
                                                            <select2 
                                                                :options="supplierList"
                                                                v-model="selectedDefaultSupplier"
                                                                classes="form-control col-md-12"
                                                            ></select2>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row" v-if="mode!='item' && mode!='branch'">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label for="">
                                                                Email*
                                                            </label>
                                                            <input type="email" required class="form-control " :disabled="id!=null" v-model="email" >
                                                        </div>
                                                    </div>
                                                    <div v-if="mode=='user'" class="col-md-6">
                                                        <div class="form-group">
                                                            <label >Password</label>
                                                            <input type="text" required class="form-control " v-model="password" >
                                                        </div>
                                                     </div>
                                                    <div v-else class="col-md-6">
                                                        <div class="form-group">
                                                            <label >GSTIN</label>
                                                            <input type="text" class="form-control " v-model="gst" >                                                            
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row" v-if="mode=='item'">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label >
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
                                                <div class="row" v-if="mode=='user'">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label >Address</label>
                                                            <textarea name="shortDescription" required v-model="address" rows="4" class="form-control"></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label >Branch*</label>
                                                            <select class="custom-select form-control" required v-model="branch">
                                                                <option  v-for="(a,index) in allBranch" :key="index" :value="a.branchId">{{a.branchName}}</option>
                                                            </select>
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
                                                            <button style="float:right;" class="btn btn-primary" type="submit" v-if="id==null">Submit</button>
                                                            <button style="float:right;" class="btn btn-primary" type="submit" v-else>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
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
import select2 from '../components/select2Component'

export default {
    components:{
        select2
    },
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
            supplierList:[],
            selectedDefaultSupplier:"",

            name:"",
            mobNo:"",
            email:"",
            city:"",
            gst:"",
            address:"",
            price:"",
            gsm:0,
            size:"",
            reorder:0,
            branch:"",
            password:"",
            allBranch:[],
            role:"",
            allRole:[]
        }
    },
    mounted(){
        if(this.mode=='item')
        {
            const vueInstance = this;
            axios.get("http://localhost:4000/supplier")
            .then(function(response){
                const options=[{'id':0, 'text':'Select Default Supplier'}];
                for(let index in response.data){
                    options.push({
                        'id': response.data[index].supplierEmailId,
                        'text': response.data[index].supplierName
                    });
                }
                vueInstance.supplierList = options;
            });
        }
    },
    created(){
        
        if(this.mode=='user'){
            this.getUserDtl();
        }
        if(this.id!=null){
            this.getDetails()
        }
    },
    methods:{
        getUserDtl(){
            axios.get('http://localhost:4000/branch/')
            .then(res=>{
                axios.get('http://localhost:4000/role/')
                .then(res1=>{
                this.allBranch=res.data
                this.allRole=res1.data;
                });
            });
        },
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
                            window.location="/customer";
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
                            window.location="/supplier";
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
                            // console.log(response.data);
                            axios.get('http://localhost:4000/item')
                                .then(res=>{
                                    let all=res.data;
                                    return all;
                                })
                                .then(res2=>{
                                    for(let i=0;i<res2.length;i++){
                                        axios.post('http://localhost:4000/stock',{
                                            fkItemId:res2[i].itemId,
                                            fkBranchId:response.data,
                                            stockQuantity:0
                                        })
                                        .then(res3=>{
                                            console.log("Done");
                                        });
                                    }
                                })
                                .then(res3=>{
                                    alert("Branch Succesfully Added");
                                    window.location="/branch";
                                });

                        }
                    });
                }
                else if(this.mode=='user'){
                    axios.post('http://localhost:4000/'+this.mode+"/",{
                        userEmailId:this.email,
                        userName:this.name,
                        userPassword:this.password,
                        userAddress:this.address,
                        userPhoneNo:this.mobNo,
                        fkRoleId:"6edd2ae4-6c35-11ea-92f1-ace2d35545ec",
                        fkBranchId:this.branch
                    }).then(response=>{
                        if(response){
                            alert("User Succesfully Added");
                            window.location="/user";
                        }
                    });
                }
                else{
                    axios.post('http://localhost:4000/'+this.mode+"/",{
                        name:this.name,
                        gsm:this.gsm,
                        size:this.size,
                        minimumRate:this.price,
                        reorderLevel:this.reorder,
                        fkSupplierEmailId: this.selectedDefaultSupplier
                    }).then(response=>{
                        if(response){
                            // console.log(response.data);
                            axios.get('http://localhost:4000/branch')
                                .then(res=>{
                                    let all=res.data;
                                    return all;
                                })
                                .then(res2=>{
                                    for(let i=0;i<res2.length;i++){
                                        axios.post('http://localhost:4000/stock',{
                                            fkItemId:response.data,
                                            fkBranchId:res2[i].branchId,
                                            stockQuantity:0
                                        })
                                        .then(res3=>{
                                            // console.log("Done");
                                        });
                                    }
                                })
                                .then(res3=>{
                                    alert("Item Succesfully Added");
                            window.location="/item";
                                });
                            
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
                else if(this.mode=='user'){
                    axios.put('http://localhost:4000/'+this.mode+"/"+this.id,{
                        userEmailId:this.email,
                        userName:this.name,
                        userPassword:this.password,
                        userAddress:this.address,
                        userPhoneNo:this.mobNo,
                        fkRoleId:this.role,
                        fkBranchId:this.branch,
                    }).then(response=>{
                        if(response){
                            alert("User Succesfully Updated");
                            this.$router.push("/user");
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
                        reorderLevel:this.reorder,
                        fkSupplierEmailId: this.selectedDefaultSupplier
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
            console.log(this.mode);
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
            else if(this.mode=="branch"){
                axios.get('http://localhost:4000/'+this.mode+"/"+this.id)
                .then(res=>{
                    let mydata=res.data[0];
                    this.name=mydata.branchName;
                    this.address=mydata.branchAddress;
                    this.mobNo=mydata.branchPhoneNo;
                });   
            }
            else if(this.mode=="user"){
                axios.get('http://localhost:4000/'+this.mode+"/"+this.id)
                .then(res=>{
                    let mydata=res.data[0];
                    this.email = mydata.userEmailId;
                    this.name=mydata.userName;
                    this.address=mydata.userAddress;
                    this.mobNo=mydata.userPhoneNo;
                    this.branch=mydata.fkBranchId;
                    this.role=mydata.fkRoleId;
                    this.password=mydata.userPassword;
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
