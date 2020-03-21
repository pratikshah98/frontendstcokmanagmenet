<template>
    <div class="content-wrapper">
            <div class="content-header row">
                <div class="content-header-left col-md-9 col-12 mb-2">
                    <div class="row breadcrumbs-top">
                        <div class="col-12">
                            <h2 v-if="mode=='customer'" class="content-header-title float-left mb-0">Customer Add</h2>
                            <h2 v-if="mode=='user'" class="content-header-title float-left mb-0">User Add</h2>
                            <h2 v-else-if="mode=='supplier'" class="content-header-title float-left mb-0">Supplier Add</h2>
                            <h2 v-else class="content-header-title float-left mb-0">Item Add</h2>
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
                                                            <label v-else for="firstName3">Item Name*</label>
                                                            <input type="text" required class="form-control required" id="firstName3" name="firstName">
                                                        </div>
                                                    </div>
                                                    <div v-if="mode!='item'"  class="col-md-6">
                                                        <div class="form-group">
                                                            <label for="lastName3">
                                                                Mobile Number*
                                                            </label>
                                                            <input type="text" required class="form-control required" id="lastName3" name="lastName">
                                                        </div>
                                                    </div>
                                                    <div v-else  class="col-md-6">
                                                        <div class="form-group">
                                                            <label for="lastName3">
                                                                price*
                                                            </label>
                                                            <input type="number" required class="form-control required" id="lastName3" name="lastName">
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div v-if="mode!='item'" class="col-md-6">
                                                        <div class="form-group">
                                                            <label for="emailAddress5">
                                                                Email*
                                                            </label>
                                                            <input type="email" class="form-control required" id="emailAddress5" name="emailAddress">
                                                        </div>
                                                    </div>
                                                    <div v-if="mode!='item'" class="col-md-6">
                                                        <div class="form-group">
                                                            <label >Address</label>
                                                            <textarea name="shortDescription" id="shortDescription3" rows="4" class="form-control"></textarea>
                                                        </div>
                                                    </div>
                                                    <div v-if="mode=='item'" class="col-md-6">
                                                        <div class="form-group">
                                                            <label >Description</label>
                                                            <textarea name="shortDescription" id="shortDescription3" rows="4" class="form-control"></textarea>
                                                        </div>
                                                    </div>
                                                    <div v-if="mode=='item'" class="col-md-6"></div>
                                                </div>
                                            </fieldset>
                                            <fieldset>
                                                <div  class="row">
                                                    <div class="col-md-10 col-4"></div>
                                                    <div class="col-md-2 col-8" >
                                                        <div class="form-group">
                                                            <button style="float:right;" class="btn btn-primary" type="submit" @click="getDetails()">Submit</button>
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
export default {
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
            address:"",
            price:"",
            description:""
        }
    },
    methods:{
        getDetails(){
            if(this.mode=='customer'){
                    console.log("All Customers Details:- "+this.name+" "+this.mobNo+" "+this.email+" "+this.city+" "+this.address);
            }
            else if(this.mode=='user'){
                    console.log("All user Details:- "+this.name+" "+this.mobNo+" "+this.email+" "+this.city+" "+this.address);
            }
            else if(this.mode=='supplier'){
                    console.log("All Suppliers Details:- "+this.name+" "+this.mobNo+" "+this.email+" "+this.city+" "+this.address);
            }
            else{
                    console.log("All Item Details:- "+this.name+" "+this.price+" "+this.description);
            }
        }
    }
}
</script>
