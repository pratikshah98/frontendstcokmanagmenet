<template>
    <div class="content-wrapper">
            <div class="content-header row">
                <div class="content-header-left col-md-9 col-12 mb-2">
                    <div class="row breadcrumbs-top">
                        <div class="col-12">
                            <h2 class="content-header-title float-left mb-0">Add Stock</h2>
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
                                                    <div class="col-md-5" >
                                                        <button class="btn btn-primary" type="button" @click="addMan=true,addRep=false"><i class="feather icon-plus"></i> Add Usage</button>
                                                        <button class="btn btn-primary" type="button" @click="addMan=false,addRep=true " data-toggle="modal" data-target="#addReportModal"><i class="feather icon-plus"></i> Generate</button>
                                                    </div>
                                                    <div class="col-md-7"></div>

                                        </div>
                                        <form class="steps-validation wizard-circle" @submit.prevent="addUsage()" v-if="addMan==true && addRep==false"> 
                                        <div class="row form-group" style="margin-top:10px;" >
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label> Branch*</label>
                                                            <select2
                                                                :options="branchList"
                                                                v-model="selectedBranch"
                                                                classes="form-control col-md-12"
                                                            ></select2>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label> Item*</label>
                                                            <select2
                                                                :options="itemList"
                                                                v-model="selectedItem"
                                                                classes="form-control col-md-12"    
                                                            ></select2>
                                                        </div>    
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label>
                                                                Stock*
                                                            </label>
                                                            <input type="number" min=0 required class="form-control " v-model="stock">
                                                        </div>
                                                    </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-9"></div>
                                            <div class="col-md-3">
                                                        <button style="float:right;" class="btn btn-primary"  type="submit"><i class="feather icon-plus"></i> Add</button>
                                            </div>
                                        </div>
                                    </form>        
                                    <div class="row form-group" style="margin-top:10px;" v-if="addMan==false && addRep==true">
                                                        <div class="col-md-4">
                                                            <div class="form-group">
                                                                <label> Branch*</label>
                                                                <select2
                                                                    :options="branchList"
                                                                    v-model="selectedBranch"
                                                                    classes="form-control col-md-12"
                                                                ></select2>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-8"></div>
                                        </div>
                                                <div v-if="selectedBranch!='' && selectedBranch!=0 && addMan==false" class="row">
                                                    <div class="col-md-12" @drop="_drop" @dragenter="_suppress" @dragover="_suppress" data-sortable-id="form-dropzone-1" style="cursor:pointer" @click="$refs.fileInput.click()">
                                            
                                                                <div class="panel-body text-inverse" >
                                                                    
                                                                    <div>
                                                                        <form>
                                                                            <div class="row">
                                                                                <div class="col-12">
                                                                                    
                                                                                    <h4 class="dropzone-bulk">Drop Your Files <b>Here</b> or <b>Click</b> to Upload</h4>
                                                                                    
                                                                                    <input type="file" ref="fileInput" class="form-control" id="file" style="display:none" :accept="SheetJSFT" @change="_change" />
                                                                                <!--<img src="/img/dropzoneImg.png"/>-->
                                                                                </div>
                                                                                
                                                                                
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
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
import axios from 'axios';
import select2 from '@/components/select2Component';
var XLSX = require('xlsx')
const _SheetJSFT = [
	"xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(function(x) { return "." + x; }).join(",");

export default{
layout:"dashboard",
created(){
    
},
components:{
    select2
},
data(){
    return{
        SheetJSFT: _SheetJSFT,
        addMan:false,
        addRep:false,
        branchList:[],
        itemList:[],
        selectedBranch:"",
        selectedItem:"",
        stock:0
    }
},
watch: {
    addMan: function (val) {
      if(this.addMan==true){
            this.getDetails();
    }
    },
    addRep: function (val) {
      if(this.addRep==true){
            this.getDetails2();
        }
    }
},
    methods:{
    getDetails(){
        axios.get('http://localhost:4000/branch').then(res=>{
                const options=[{'id':0 , 'text': 'Select Branch'}];
                for(let index in res.data){
                    options.push({
                        "id": res.data[index].branchId,
                        "text": res.data[index].branchName
                    });
                }
                return options;
            })
            .then(res2=>{
                this.branchList=res2;
                // cosnole.log("AA")
                // console.log(res2);
            })
            .then(res3=>{
                axios.get('http://localhost:4000/item').then(res=>{
                    const options=[{'id':0 , 'text': 'Select Item'}];
                    for(let index in res.data){
                        options.push({
                            "id": res.data[index].itemId,
                            "text": res.data[index].name
                        });
                    }
                    return options;
                })
                .then(res4=>{
                this.itemList=res4;
                    // console.log(this.itemList);
            })
            });
    },
    getDetails2(){
        axios.get('http://localhost:4000/branch').then(res=>{
                const options=[{'id':0 , 'text': 'Select Branch'}];
                for(let index in res.data){
                    options.push({
                        "id": res.data[index].branchId,
                        "text": res.data[index].branchName
                    });
                }
                return options;
            })
            .then(res2=>{
                this.branchList=res2;
                // cosnole.log("AA")
                // console.log(res2);
            });
    },
    addUsage(){
        if(this.selectedBranch==0 || this.selectedItem==0){
            alert("Please select Valid Branch and/or Item");
        }
        else{
            axios.post('http://localhost:4000/stock/managestock/'+this.selectedItem+"/"+this.selectedBranch,{
                        stockQuantity:this.stock
            })
            .then(res1=>{
                alert("Usage Recorded");
                this.selectedBranch="";
                this.selectedItem="";
                this.stock=0;
                // window.location.reload();
            });  
        }                        
    },
        _suppress(evt) { evt.stopPropagation(); evt.preventDefault(); },
		_drop(evt) {
			evt.stopPropagation(); evt.preventDefault();
			const files = evt.dataTransfer.files;
			if(files && files[0]) this._file(files[0]);
		},
		_change(evt) {
			const files = evt.target.files;
			if(files && files[0]) this._file(files[0]);
		},
		async _file(file) {
			/* Boilerplate to set up FileReader */
			const reader = new FileReader();
			reader.onload = (e) => {
				/* Parse data */
				const bstr = e.target.result;
				const wb = XLSX.read(bstr, {type:'binary'});
				/* Get first worksheet */
				const wsname = wb.SheetNames[0];
				const ws = wb.Sheets[wsname];
				/* Convert array of arrays */
				const data = XLSX.utils.sheet_to_json(ws, {header:1});
                //console.log(JSON.stringify(data))
                //var a=[]
                //var j=0;
                let promise = new Promise((resolve,reject)=>{                        
                        //for storing item table's itemId and size
                        let itemId=[];
                        let itemSize=[];
                        //for storing LastUpdateddate of stock table 
                        let lastDate=[];

                        axios.get('http://localhost:4000/item/')
                        .then(response=>{
                            // console.log(response);
                            for(let i=0;i<response.data.length;i++){
                                itemId.push(response.data[i].itemId);
                                itemSize.push(response.data[i].size);
                            }
                            console.log("Item id "+itemId);
                            console.log("Item size"+itemSize);
                        })
                        .then(response1=>{
                        let promise2 = new Promise((resolve2,reject3)=>{
                            let i,ii=0;
                            // console.log("Called");
                            let mypromise=[];
                            for(i=0;i<itemId.length;i++){
                            // console.log("Called 1");
                                mypromise.push(axios.get('http://localhost:4000/stock/'+itemId[i]+"/"+this.selectedBranch))
                                    // .then(response2=>{
                                    //     console.log("Called 2");
                                    //     lastDate.push(response2.data[0].lastUpdatedDate);
                                    //     console.log("Called 3");
                                    //     ii++;
                                    // });
                            }
                            // console.log(ii+" "+itemId.length);
                            // console.log("Last Update Date= "+lastDate);
                            // if(ii==itemId.length) {
                                // let result=await Promise.all(mypromise);

                                Promise.all(mypromise).then(r=>{
                            // console.log("Last Update Date= "+lastDate);
                                    for(i=0;i<itemId.length;i++){
                                        // console.log(r[i]);
                                        lastDate.push(r[i].data[0].lastUpdatedDate);
                                    }
                                    // console.log("Last Update Date= "+lastDate);
                                    resolve2("1");

                                });
                            
                        });

                            
                           promise2.then((resolve2)=>{
                               if(resolve2=='1'){
                                    let promise3 = new Promise((resolve3,reject3)=>{
                                    //for storing csv entries:-
                                        let itemSizeName=[];
                                        let itemRecords=[];
                                        
                                        for(let i=1;i<data.length;i++)
                                            {   
                                                // console.log(data[i][4]);
                                                if(data[i][9]!=undefined){
                                                    let utc1=new Date((data[1][10] - (25567 + 2))*86400*1000);
                                                            utc1.setHours(utc1.getHours()- 5);
                                                            utc1.setMinutes(utc1.getMinutes() - 30);
                                                            utc1.setSeconds(utc1.getSeconds() + 33);
                                                            console.log("Date= "+new Date(lastDate[itemSize.indexOf(data[i][15])]));
                                                            console.log("Date= "+utc1);
                                                            
                                                    if(lastDate[itemSize.indexOf(data[i][15])]==null || new Date(lastDate[itemSize.indexOf(data[i][15])]) < utc1){
                                                        if(itemSizeName.indexOf(data[i][15])==-1){      //to check if item size is not already present in itemSizeName
                                                            itemSizeName.push(data[i][15]);
                                                            itemRecords.push({
                                                                size:data[i][15],
                                                                stock:data[i][9],
                                                                maxDate:utc1
                                                            });
                                                        }   
                                                        else{
                                                            itemRecords[itemSizeName.indexOf(data[i][15])].stock+=data[i][9];
                                                        }
                                                    }
                                                }
                                            }
                                            console.log(itemSizeName);
                                            console.log(itemRecords);
                                            // console.log("max Date= "+new Date(data[1][10]));
                                            // let utc=new Date((data[1][10] - (25567 + 2))*86400*1000)
                                            // utc.setHours(utc.getHours()- 5);
                                            // utc.setMinutes(utc.getMinutes() - 30);
                                            // utc.setSeconds(0);
                                            // console.log(utc)
                                            // let utc1=new Date((data[2][10] - (25567 + 2))*86400*1000)
                                            // utc1.setHours(utc1.getHours()- 5);
                                            // utc1.setMinutes(utc1.getMinutes() - 30);
                                            // utc1.setSeconds(utc1.getSeconds() + 33);
                                            // console.log(utc1)
                                            // console.log(new Date(undefined));
                                            // console.log("max Date= "+data[1][13]);
                                            // console.log("max Date= "+data[1][14]);

                                            // console.log
                                        
                                        // return itemRecords;
                                    
                                            let stockUsage=[];
                                            let j;
                                        for(j=0;j<itemRecords.length;j++){
                                                stockUsage.push({
                                                    fkItemId:itemId[itemSize.indexOf(itemRecords[j].size)],
                                                    fkBranchId:this.selectedBranch,
                                                    stockQuantity:itemRecords[j].stock,
                                                    status:0,
                                                    maxDate:itemRecords[j].maxDate
                                                });
                                        }
                                        console.log(stockUsage);
                                        if(j==itemRecords.length){
                                            resolve3(stockUsage);
                                        }
                                        // return stockUsage;
                                        });
                                        promise3.then((resolve3)=>{
                                            if(resolve3!=null){ 
                                                    let stockUsage2=resolve3;
                                                    let k,kk=0;
                                                    for(k=0;k<stockUsage2.length;k++){
                                                        console.log("Called");
                                                        axios.post('http://localhost:4000/stock/managestock/'+stockUsage2[k].fkItemId+"/"+stockUsage2[k].fkBranchId,{
                                                            stockQuantity:stockUsage2[k].stockQuantity,
                                                            lastUpdatedDate:stockUsage2[k].maxDate
                                                        })
                                                        .then(res5=>{
                                                            if(res5){
                                                                // console.log("Called");
                                                                stockUsage2[kk].status=1;
                                                                kk++;
                                                            }
                                                        });
                                                    }
                                                    if(kk==stockUsage2.length){

                                                    }
                                           }                                                    
                                        });
                               }    
                           });
                        });    
                    // .then(stockUsage=>{
                    //     let t=1;
                    //     for(let i=0;i>stockUsage.length;i++){
                    //         axios.post('http://localhost:4000/stock/managestock/'+stockUsage[i].fkItemId+"/"+stockUsage[i].fkBranchId,{
                    //             stockQuantity:stockUsage[i].stockQuantity
                    //         })
                    //         .then(res5=>{
                    //             if(!res5){
                    //                 t=1;
                    //             }
                    //         });

                    //     }
                    // })
                    
                    // for(let i=1;i<data.length;i++)
                    // {   
                    //     let d=new Date();
                    //     let d1=new Date(data[i][10]);
                    //     if(data[i][4]!='Canceled'){
                    //         console.log(data[i][3]);
                    //     }
                    //     else{
                    //         // console.log(data[i][3]+"   --");

                    //     }
                    // }    
                    //     // console.log(JSON.stringify(data[i][j]));
                    //     // a[j].name = data[i][0];
                    //     // a[j].mobile=data[i][1];
                    //     // a[j].email=data[i][2];
                    //     // a[j].street=data[i][3];
                    //     // a[j].area=data[i][4];
                    //     // a[j].pincode=data[i][5];
                    //     // a[j].city=data[i][6];
                    //     // a[j].state=data[i][7];
                    //     // a[j].gstin=data[i][8];
                    //     // a[j].statecode=data[i][9];
                    //     // a[j].isenabled=1;
                    //     // a[j].createdon=new Date();
                    //     // a[j].modifiedon=new Date();
                    //     // a[j].createdById=1;
                    //     // a[j].modifiedById=1;
                    //     // a[j].customerTypeId="0131ef88-91a1-4b63-9a5a-d5a36cd0252";
                    //     // j++;
                    //     this.$axios.post("/"+this.$route.params.username+"/api/Customers?access_token="+this.$store.state.token,{
                    //         name:data[i][0],
                    //         mobile:data[i][1],
                    //         email:data[i][2],
                    //         street:data[i][3],
                    //         area:data[i][4],
                    //         pincode:data[i][5],
                    //         city:data[i][6],
                    //         state:data[i][7],
                    //         gstin:data[i][8],
                    //         statecode:data[i][9],
                    //         isenabled:1,
                    //         createdon:new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString(),
                    //         modifiedon:new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString(),
                    //         createdById:1,
                    //         modifiedById:1,
                    //         customerTypeId:'0131ef88-91a1-4b63-9a5a-d5a36cd0252'
                    //     })
                    //         .then(res => {
                    //             resolve("1");
                    //         },
                    //          (error) => { reject(i-1)});
                    // }
                });
                promise.then((resolve)=>{
                    if(resolve=="1"){
                            //alert("All Clients Successfully Added")
                        //window.location="";
                        // this.showBulk = false
                        // this.generate()
                    }
                });
                promise.catch((rej)=>{
                    alert("Your Row number"+rej+" is not valid")
                    //window.location="";
                    this.showBulk = false
                    this.generate()
                });
                
                //console.log(b);
                
                
				/* Update state */
			};
			reader.readAsBinaryString(file);
		}

}
}
</script>