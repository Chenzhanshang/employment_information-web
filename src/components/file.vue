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
                    type="primary"
                    plain
                    @click="downloadFile(scope.row)"
                    >下载</el-button> 
                </template>
            </el-table-column>
            </el-table>
        </el-main>
  </el-container>
</template>
<script>
export default {
    data(){
        return {
          tableData: []
        }
    },
    methods:{
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
    },
    created(){
      this.axios.get('/file/getAllFile')
      .then((res)=>{
        this.tableData = res.data.data.fileList
        console.log(res)
      })
      .catch()
    }

}
</script>