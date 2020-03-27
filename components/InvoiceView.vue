<template>
   <div class="content-body">
        <!-- invoice functionality start -->
        <section class="invoice-print mb-1">
            <div class="row">

                <fieldset class="col-12 col-md-5 mb-1 mb-md-0">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Email" aria-describedby="button-addon2">
                        <div class="input-group-append" id="button-addon2">
                            <button class="btn btn-outline-primary" type="button">Send Invoice</button>
                        </div>
                    </div>
                </fieldset>
                <div class="col-12 col-md-7 d-flex flex-column flex-md-row justify-content-end">
                    <button style="float:right;" class="btn btn-outline-primary" @click="gotoCustomer"><i class="feather icon-x"></i> Cancel</button>
                    <button class="btn btn-primary ml-md-1" @click="submitDetails()"> <i class="feather icon-check"></i> Issue Invoice </button>
                    <button class="btn btn-primary btn-print mb-1 mb-md-0 ml-md-1"> <i class="feather icon-file-text"></i> Print</button>
                    <button class="btn btn-outline-primary  ml-0 ml-md-1"> <i class="feather icon-download"></i> Download</button>
                </div>
            </div>
        </section>
        <!-- invoice functionality end -->
        <!-- invoice page -->
        <section class="card invoice-page">
            <div id="invoice-template" class="card-body">
                <!-- Invoice Company Details -->
                <div id="invoice-company-details" class="row">
                    <div class="col-sm-6 col-12 text-left pt-1">
                        <div class="media pt-1">
                            <img src="../static/vardhman-logo.jpg" width="100%" alt="company logo" />
                        </div>
                    </div>
                    <div class="col-sm-6 col-12 text-right">
                        <h1>Invoice</h1>
                        <div class="invoice-details mt-2">
                            <h6>INVOICE NO.</h6>
                            <p>001/2019</p>
                            <h6 class="mt-2">INVOICE DATE</h6>
                            <p>{{ invoiceDate | filterDateFormat }}</p>
                        </div>
                    </div>
                </div>
                <!--/ Invoice Company Details -->

                <!-- Invoice Recipient Details -->
                <div id="invoice-customer-details" class="row pt-2">
                    <div class="col-sm-6 col-12 text-left">
                        <h5>Recipient</h5>
                        <div class="recipient-info my-2">
                            <p>{{ customer.customerName }}</p>
                            <p>{{ customer.customerAddress }}</p>
                        </div>
                        <div class="recipient-contact pb-2">
                            <p>
                                <i class="feather icon-mail"></i>
                                {{ customer.customerEmailId }}
                            </p>
                            <p>
                                <i class="feather icon-phone"></i>
                                {{ customer.customerPhoneNo }}
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-6 col-12 text-right">
                        <h5>Vardhmaan Xerox</h5>
                        <div class="company-info my-2">
                            <p>9 N. Sherwood Court</p>
                            <p>Elyria, OH</p>
                            <p>94203</p>
                        </div>
                        <div class="company-contact">
                            <p>
                                <i class="feather icon-phone"></i>
                                +91 999 999 9999
                            </p>
                        </div>
                    </div>
                </div>
                <!--/ Invoice Recipient Details -->

                <!-- Invoice Items Details -->
                <div id="invoice-items-details" class="pt-1 invoice-items-table">
                    <div class="row">
                        <div class="table-responsive col-12">
                            <table class="table table-borderless">
                                <thead>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Product Name</th>
                                        <th>GSM</th>
                                        <th>Size</th>
                                        <th>Quantity</th>
                                        <th>Rate</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                     <tr v-for="(item,index) in items" :key="index+1">
                                        <td> {{index+1}} </td>
                                        <td> {{ item.name }} </td>
                                        <td v-if="item.gsm==null"> - </td>
                                        <td v-else> {{ item.gsm }} </td>
                                        <td v-if="item.size==null"> - </td>
                                        <td v-else> {{ item.size }} </td>
                                        <td>{{ item.totalquantity }} </td>
                                        <td>{{ rate[index]}}</td>
                                        <td> <span style="float:right;"> {{ item.totalquantity * rate[index] | round }} </span> </td>
                                    </tr>

                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td class="font-weight-bold"><span style="float:right;">Grand Total : </span></td>
                                        <td class="font-weight-bold"><span style="float:right;">{{ grandTotal | round}}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- <div id="invoice-total-details" class="invoice-total-table">
                    <div class="row">
                        <div class="col-7 offset-5">
                            <div class="table-responsive">
                                <table class="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <th>SUBTOTAL</th>
                                            <td>114000 USD</td>
                                        </tr>
                                        <tr>
                                            <th>DISCOUNT (5%)</th>
                                            <td>5700 USD</td>
                                        </tr>
                                        <tr>
                                            <th>TOTAL</th>
                                            <td>108300 USD</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div> -->

                <!-- Invoice Footer -->
                <!-- <div id="invoice-footer" class="text-right pt-3">
                    <p>Transfer the amounts to the business amount below. Please include invoice number on your check.
                        <p class="bank-details mb-0">
                            <span class="mr-4">BANK: <strong>FTSBUS33</strong></span>
                            <span>IBAN: <strong>G882-1111-2222-3333</strong></span>
                        </p>
                </div> -->
                <!--/ Invoice Footer -->

            </div>
        </section>
        <!-- invoice page end -->

    </div>
</template>
<script>
import axios from 'axios'

export default {
    props: {
            id: {
                type: String,
                required: false
            },
            customer:{
                type:Object,
                required:true
            },
            items:{
                type:Array,
                required:true,
            },
            rate:{
                type:Array,
                required:true
            },
            invoiceDate:{
                type: Date,
                required: true
            },
            grandTotal:{
                type:Number,
                required:true
            },
            
        },
    data(){
        return{
           
        }
    },
    methods:{
        submitDetails(){
            const r = confirm("Issuing invoice is irreversible !\nAre you sure you want to continue ?");
            if (r == true) {    // if confirmed
                let lastTranstion;
                axios.get('http://localhost:4000/toprecordbycustomerid/'+this.id)
                .then(response=>{
                    if(response.data.length!=0)
                        lastTranstion = response.data[0];

                    let calculatedDue = this.grandTotal;
                    if(lastTranstion!=undefined && lastTranstion!=null){
                        calculatedDue += lastTranstion.amountDue;
                    }
                    axios.post('http://localhost:4000/amountdue/',{
                        fkCustomerEmailId: this.customer.customerEmailId,
                        transactionDate: this.invoiceDate,
                        amountDue: calculatedDue,
                        amountPaid: 0,
                        description: "Invoice issued on Date "+this.invoiceDate
                    }).then(response=>{
                        if(response.status==200){
                            alert("Amount due added ! "+response.data.sqlMessage);
                            this.$router.push('/customer/'+this.customer.customerEmailId);
                        }
                    });
                });
                
            } 
            else {
                alert("Issueing of invoice canceled");
            }
        },
        gotoCustomer(){
            this.$router.back();
        }
    },
    filters: {
        filterDateFormat(val){
            let date = new Date(val);
            date.setHours(date.getHours()+6);
            return date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear() ;
        },
        round:function(value){
            return value.toFixed(2);
        }
    }
}
</script>
