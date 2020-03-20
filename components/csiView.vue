<template>
    <span >
                                        
                                        <div class="table-responsive">
                                            <table class="table table-striped dataex-html5-selectors">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th v-if="mode=='customer'">Customer Name</th>
                                                        <th v-if="mode=='supplier'">Supplier Name</th>
                                                        <th v-if="mode=='item'">Item Name</th>
                                                        <th v-if="mode!='item'">Mobile</th>
                                                        <th v-if="mode!='item'">Email</th>
                                                        <th v-if="mode!='item'">Address</th>
                                                        <th v-if="mode=='item'">price</th>
                                                        <th v-if="mode=='item'">Description</th>
                                                        <th>Detelte</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(d,index) in data" :key="index">
                                                        <td> {{ index + 1 }} </td>
                                                        <td style="text-decoration:underline;"> {{ d.name }} </td>
                                                        <td v-if="mode!='item'">{{d.mobile}}</td>
                                                        <td v-if="mode!='item'">{{d.email}}</td>
                                                        <td v-if="mode!='item'">{{d.address}}</td>
                                                        <td v-if="mode=='item'">{{d.price}}</td>
                                                        <td v-if="mode=='item'">{{d.description}}</td>                                                        
                                                        <td>del</td>
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
    data(){
        return{
            data:[
                { name:"Sunil",mobile:"dd",email:"ff",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"ff",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"ff",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"ff",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"ff",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"ff",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"ff",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"ff",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"ff",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"ff",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"ff",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"ff",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"ff",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"ff",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"ff",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"ff",address:"ff",description:"ff",price:"gdhs"},
                { name:"Sunil",mobile:"dd",email:"ff",address:"ff",description:"ff",price:"gdhs"},

            ]
        }
    }
}
</script>
