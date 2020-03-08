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
                prop="chairName"
                label="讲座名称"
                align="center">
            </el-table-column>
            <el-table-column
                prop="chairTime"
                label="讲座时间"
                align="center">
            </el-table-column>
            <el-table-column
                prop="chairSite"
                label="讲座地点"
                align="center">
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="small"
                    type="primary"
                    plain
                    @click="apply(scope.row)"
                    >申请参加</el-button> 
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
            if(data.chairSum <= data.nowSum){
                this.$message({
                type:'success',
                message:'已达人数上限'
            })
            }
            else{
                this.axios.get('/chair/apply',{params:{chairId:data.chairId,userId:JSON.parse(localStorage.data).userId}})
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
      this.axios.get('/chair/getAllChair')
      .then((res)=>{
        this.tableData = res.data.data.chairList
        console.log(res)
      })
      .catch()
    }

}
</script>