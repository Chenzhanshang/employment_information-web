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
            <el-table-column
                    prop="jobSum"
                    label="最多参加人数"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="nowSum"
                    label="已申请参加人数"
                    align="center">
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="small"
                        type="primary"
                        plain
                        @click="update(scope.row)"
                        >修改</el-button> 
                        <el-button
                        size="small"
                        type="warning"
                        plain
                        @click="deleteJob(scope.row)"
                        >删除</el-button> 
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog
            title="请填写招聘会信息"
            :visible.sync="jobDialogVisible"
            width="50%">
            <el-form :model="jobForm" label-width="18%">
                    <el-form-item label="招聘会名称">
                        <el-input v-model="jobForm.name" placeholder="请输入招聘会名称"></el-input>
                    </el-form-item>
                    <el-form-item label="招聘会时间：">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd" v-model="jobForm.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-time-picker placeholder="选择时间" format="HH 时 mm 分 ss 秒"
                        value-format="HH-mm-ss" v-model="jobForm.date2" style="width: 100%;"></el-time-picker>
                    </el-col>
                    </el-form-item>
                    <el-form-item label="招聘会地点：">
                        <el-input v-model="jobForm.site" placeholder="请输入招聘会地点"></el-input>
                    </el-form-item>
                    <el-form-item label="招聘会人数：">
                        <el-input v-model="jobForm.sum" placeholder="请输入招聘会限制人数"></el-input>
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
          jobDialogVisible:false,
          jobId:'',
          jobForm:{
          name:'',
          site:'',
          date1:'',
          date2:'',
          sum:'',
        }
        }
    },
    methods:{
        update(data){
            this.jobDialogVisible = true
            this.jobForm.name = data.jobName
            this.jobForm.site = data.jobSite
            this.jobForm.sum = data.jobSum
            this.jobForm.date1 = data.jobTime.substr(0,9)
            this.jobForm.date2 = data.jobTime.substr(12,19)
            this.jobId = data.jobId
        },
        //修改
        submitUpdate(){
            this.axios.post('/job/updateJob',
                  {jobId:this.jobId,
                  jobName:this.jobForm.name,
                  jobTime:this.jobForm.date1 + '  ' +  this.jobForm.date2,
                  jobSite:this.jobForm.site,
                  jobSum:this.jobForm.sum})
                  .then((res)=>{
                    if(res.data.status == 1){
                      this.$message({
                        type:"success",
                        message:res.data.msg
                      })
                      this.jobDialogVisible = false
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
        //删除
        deleteJob(data){
            this.axios.get('/job/deleteJob',{params:{jobId:data.jobId}})
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
        //获取数据
        getData(){
            this.axios.get('/job/getAllJob')
            .then((res)=>{
                this.tableData = res.data.data.jobList
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