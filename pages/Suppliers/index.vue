<template>
    <div class="content-wrapper">
            <div class="content-header row">
                <div class="content-header-left col-md-9 col-12 mb-2">
                    <div class="row breadcrumbs-top">
                        <div class="col-12">
                            <h2 class="content-header-title float-left mb-0">Supplier Listing</h2>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="content-body">
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-content">
                                    <div class="card-body">
                                        <div class="row">
                                                    <div class="col-md-9"></div>
                                                    <div class="col-md-3 col-10" >
                                                        <div class="form-group">
<<<<<<< HEAD
                                                            <button style="float:right;" class="btn btn-primary" @click="add()" type="submit">Add Supplier</button>
=======
                                                            <button style="float:right;" class="btn btn-primary" @click="add()" type="submit">
                                                                <i class="feather icon-user-plus"></i>
                                                                Add New Supplier
                                                            </button>
>>>>>>> 434bed46e44675e406fc00b4f7c2628dd999ae90
                                                        </div>
                                                    </div>
                                        </div> 
                                        <div class="row">
                                            <div class="col-md-12 col-12" >
                                                <sView mode="supplier" />
                                            </div>
                                        </div>           
                                    </div>    
                                </div>
                            </div>
                        </div>
                    </div>                
            </div>
        </div>
</template>
<script>
import sView from "@/components/csiList";
export default {

    layout:"dashboard",
    components:{
        sView
    },

    methods:{
        add(){
            this.$router.push("/Suppliers/Add");
        }
    }
}
</script>
<style scoped>
    button{
        margin-bottom:10px;
    }
</style>