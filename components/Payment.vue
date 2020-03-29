<template>
    <div class="content-wrapper">
            <div class="content-header row">
                <div class="content-header-left col-md-12 col-12 mb-2">
                    <div class="row breadcrumbs-top">
                        <div class="col-md-12">
                            <h2 class="content-header-title float-left mb-0"> Payment Settlement</h2>
                            <button style="float:right;" class="btn btn-primary" @click="gotoCustomer">
                                <i class="feather icon-list"></i> Back To Customer View
                            </button>
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
                                                <div class="col-md-12 col-12">
                                                    <div class="card">
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-md-3">
                                                                    <div class="form-group">
                                                                        <label> Date*</label>
                                                                        <client-only>
                                                                            <date-picker
                                                                                :use-utc=true
                                                                                input-class="form-control col-md-12"
                                                                                class="datepicker"
                                                                                format="d-MM-yyyy"
                                                                                v-model="selectedDate"
                                                                            ></date-picker>
                                                                        </client-only>
                                                                    </div>
                                                                </div>

                                                                <div class="col-md-2">
                                                                    <div class="form-group">
                                                                        <label>Amount Paid*</label>
                                                                        <input class="form-control" type="number" v-model="amountPaid">
                                                                    </div>
                                                                </div>

                                                                <div class="col-md-4">
                                                                    <div class="form-group">
                                                                        <label>Description</label>
                                                                        <textarea class="form-control" v-model="description" placeholder="For ex. Cheque No. 456123"></textarea>
                                                                    </div>
                                                                </div>

                                                                <div class="col-md-3">
                                                                    <div class="form-group">
                                                                        <label> </label>
                                                                        <button class="form-control btn btn-primary" type="button" @click="submitDetails">
                                                                            <i class="feather icon-plus"></i>
                                                                            Add Payment
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>

                                            <fieldset v-if="lastTransaction!==undefined">
                                                <div class="col-md-12 col-12">
                                                    <div class="card">
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <h4>
                                                                        &#x20B9;  Outstanding Amount on Date : &#x20B9; {{ lastTransaction.amountDue | round }} 
                                                                    </h4>
                                                                    <h4>
                                                                        <i class="feather icon-calendar"></i>  Last Payment Date :  {{ lastTransaction.transactionDate | filterDateFormat }}
                                                                    </h4>
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>

                                            <fieldset>
                                                <div class="col-md-12 col-12">
                                                    <div class="card">
                                                        <div class="card-header">
                                                            <div class="card-title mb-2">Payment History</div>
                                                        </div>
                                                        <div class="card-body">
                                                            <table v-if="transactions.length!=0" class="table-secondary" cellspacing="10" cellpadding="10">
                                                                <tr>
                                                                    <td class="font-weight-bold">Sr.No</td>
                                                                    <td class="font-weight-bold">Transaction Date</td>
                                                                    <td class="font-weight-bold">Amount Paid<br>(On Transaction Date)</td>
                                                                    <td class="font-weight-bold">Amount Due<br>(On Transaction Date)</td>
                                                                    <td class="font-weight-bold">Description</td>
                                                                </tr>
                                                                <tr v-for="(item,index) in transactions" :key="index+1">
                                                                    <td> {{index+1}} </td>
                                                                    <td> {{ item.transactionDate | filterDateFormat }} </td>
                                                                    <td> {{ item.amountPaid | round }} </td>
                                                                    <td> {{ item.amountDue | round }} </td>
                                                                    <td> {{ item.description }} </td>
                                                                </tr>
                                                            </table>
                                                            <div v-else>No Records Found !!!</div>
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
    props: {
        id: {
            type: String,
            required: false
        }
    },
    data(){
        return{
            selectedDate: new Date(),
            amountPaid:0,
            description:"",
            transactions:[],
            lastTransaction:[]
        }
    },
    created(){
        this.fetchDetails();
    },
    methods:{
        fetchDetails(){
            axios.get('http://localhost:4000/toprecordbycustomerid/'+this.id)
            .then(response=>{
                this.lastTransaction = response.data[0];
            });
            axios.get('http://localhost:4000/amountdue/'+this.id)
            .then(response=>{
                this.transactions = response.data;
            });
        },
        submitDetails(){
            let calculatedDue = 0;
            if(this.lastTransaction!=undefined)
            {
                calculatedDue = this.lastTransaction.amountDue - this.amountPaid;
            }
            axios.post('http://localhost:4000/amountdue/',{
                fkCustomerEmailId: this.id,
                transactionDate: this.selectedDate,
                amountDue: calculatedDue,
                amountPaid: this.amountPaid,
                description: this.description
            }).then(response=>{
                if(response.status==200){
                    Swal.fire({
                        type: 'success',
                        title: 'Success!',
                        text: 'Payment recorded Successfully.',
                        confirmButtonColor:'#4839eb',
                        confirmButtonText: 'Ok'  
                    })
                    this.fetchDetails();
                }
            });
        },
        gotoCustomer(){
            this.$router.push('/customer/'+this.id);
        }
    },
    filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        },
        filterDateFormat(val){
            let date = new Date(val);
            date.setHours(date.getHours()+6);
            return date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear() ;
        },
        round:function(value){
            let num = new Number(value);
            return num.toFixed(2);
        }
    }
}
</script>

<style scoped>
/* .datepicker{
    position: fixed;
    z-index: 2;
} */
</style>

