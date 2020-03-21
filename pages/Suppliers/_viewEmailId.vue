<template>
    <viewSupplier mode="supplier"></viewSupplier>
</template>

<script>
import viewSupplier from '@/components/csiView';

export default {
    layout:'dashboard',
    components:{
        viewSupplier
    },
    data(){
        return{
            SupplierEmailId: this.$route.params.viewEmailId
        }
    }    
}
</script>
