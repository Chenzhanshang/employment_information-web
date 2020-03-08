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
                prop="jobName"
                label="招聘会名称"
                align="center">
            </el-table-column>
            <el-table-column
                prop="jobTime"
                label="招聘会时间"
                align="center">
            </el-table-column>
            <el-table-column
                prop="jobSite"
                label="招聘会地点"
                align="center">
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="small"
                    type="primary"
                    plain
                    @click="apply(scope.row)"
                    >参加</el-button> 
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
        apply(data){
            if(data.jobSum <= data.nowSum){
                this.$message({
                type:'success',
                message:'已达人数上限'
            })
            }
            else{
                this.axios.get('/job/apply',{params:{jobId:data.jobId,userId:JSON.parse(localStorage.data).userId}})
                .then((res)=>{
                    if(res.data.status == 1){
                        this.$message({
                        type:'success',
                        message:res.data.msg
                    })
                    }
                    else{
                        this.$message({
                        type:'error',
                        message:res.data.msg
                        })
                    }
                })
                .catch()
            }
        }
    },
    created(){
      this.axios.get('/job/getAllJob')
      .then((res)=>{
        this.tableData = res.data.data.jobList
        console.log(res)
      })
      .catch()
    }

}
</script>