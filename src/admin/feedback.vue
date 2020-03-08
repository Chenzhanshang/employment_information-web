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
                prop="user.userName"
                label="反馈人用户名"
                align="center">
            </el-table-column>
            <el-table-column
                prop="user.name"
                label="反馈人姓名"
                align="center">
            </el-table-column>
            <el-table-column
                prop="feedbackContent"
                label="反馈内容"
                align="center">
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
        
    },
    created(){
      this.axios.get('/feedback/getAllFeedback')
      .then((res)=>{
        this.tableData = res.data.data.feedbackList
        console.log(res)
      })
      .catch()
    }

}
</script>