<template>
  <el-container>
    <el-main>
        <el-table
        :data="tableData"
        style="width: 100%">
            <el-table-column
            label="序号"
            type="index"
            align="center">
            </el-table-column>
            <el-table-column
                prop="fileDescribe"
                label="指导资料描述"
                align="center">
            </el-table-column>
            <el-table-column
                prop="fileName"
                label="文件名"
                align="center">
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="small"
                    type="warning"
                    plain
                    @click="update(scope.row)"
                    >修改</el-button> 
                    <el-button
                    size="small"
                    type="primary"
                    plain
                    @click="downloadFile(scope.row)"
                    >下载</el-button> 
                    <el-button
                    size="small"
                    type="danger"
                    plain
                    @click="deleteFile(scope.row)"
                    >删除</el-button> 
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
        title="请填写描述(目前只支持修改描述)"
        :visible.sync="fileDialogVisible"
        width="50%">
        <el-form :model="fileForm" label-width="15%">
                <el-form-item label="文件描述：">
                    <el-input v-model="fileForm.describe" placeholder="请输入文件描述"></el-input>
                </el-form-item>
                <el-form-item>
                    <div style="padding-left:160px"><el-button type="primary" @click="submitUpdate">修改</el-button></div>
                </el-form-item>
            </el-form>
        </el-dialog>
        </el-main>
  </el-container>
</template>
<script>
export default {
    data(){
        return {
          tableData: [],
          fileDialogVisible : false,
          fileId:'',
          fileForm:{
              describe:''
          }
        }
    },
    methods:{
        update(file){
            console.log(file)
            this.fileDialogVisible = true
            this.fileForm.describe = file.fileDescribe
            this.fileId = file.fileId
        },
        //下载文件
        downloadFile(file){
            this.axios.post('/file/downloadFile/',{filePath:file.filePath},{
                responseType: 'blob'
            })
            .then((res)=>{
                console.log(res)
                 if (window.navigator.msSaveBlob) {
                    try {
                    const blobObject = new Blob([res.data]);
                    window.navigator.msSaveBlob(blobObject, file.fileName);
                    } catch (e) {
                    console.log(e);
                    }
                } else {
                    const blob = res.data;
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onload = (e) => {
                    const a = document.createElement('a');
                    a.download = file.fileName;
                    a.href = e.target.result;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    }
                }

            })
            .catch()

        },
        deleteFile(file){
            this.axios.get('/file/deleteFile',{params:{fileId:file.fileId}})
            .then((res)=>{
                if(res.data.status == 1){
                    this.$message({
                    type:"success",
                    message:res.data.msg
                    })
                    this.getData()
                }
                else{
                    this.$message({
                    type:"error",
                    message:res.data.msg
                    })
                }
            })
            .catch()
        },
        submitUpdate(){
            this.axios.post('/file/updateFile',{fileId:this.fileId,fileDescribe:this.fileForm.describe})
            .then((res)=>{
                if(res.data.status == 1){
                    this.$message({
                    type:"success",
                    message:res.data.msg
                    })
                    this.getData()
                    this.fileDialogVisible = false
                }
                else{
                    this.$message({
                    type:"error",
                    message:res.data.msg
                    })
                }
            })
            .catch()
        },
        //获取数据
        getData(){
            this.axios.get('/file/getAllFile')
            .then((res)=>{
                this.tableData = res.data.data.fileList
                console.log(res)
            })
            .catch()
        }
    },
    created(){
      this.getData()
    }

}
</script>