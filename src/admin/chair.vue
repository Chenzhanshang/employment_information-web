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
                <el-table-column
                    prop="chairSum"
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
                        @click="deleteChair(scope.row)"
                        >删除</el-button> 
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog
            title="请填写讲座信息"
            :visible.sync="chairDialogVisible"
            width="50%">
            <el-form :model="chairForm" label-width="15%">
                    <el-form-item label="讲座名称">
                        <el-input v-model="chairForm.name" placeholder="请输入讲座名称"></el-input>
                    </el-form-item>
                    <el-form-item label="讲座时间：">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd" v-model="chairForm.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-time-picker placeholder="选择时间" format="HH 时 mm 分 ss 秒"
                        value-format="HH-mm-ss" v-model="chairForm.date2" style="width: 100%;"></el-time-picker>
                    </el-col>
                    </el-form-item>
                    <el-form-item label="讲座地点">
                        <el-input v-model="chairForm.site" placeholder="请输入讲座地点"></el-input>
                    </el-form-item>
                    <el-form-item label="讲座人数">
                        <el-input v-model="chairForm.sum" placeholder="请输入讲座限制人数"></el-input>
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
          chairDialogVisible:false,
          chairId:'',
          chairForm:{
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
            this.chairDialogVisible = true
            this.chairForm.name = data.chairName
            this.chairForm.site = data.chairSite
            this.chairForm.sum = data.chairSum
            this.chairForm.date1 = data.chairTime.substr(0,9)
            this.chairForm.date2 = data.chairTime.substr(12,19)
            this.chairId = data.chairId
        },
        //修改
        submitUpdate(){
            this.axios.post('/chair/updateChair',
                  {chairId:this.chairId,
                  chairName:this.chairForm.name,
                  chairTime:this.chairForm.date1 + '  ' +  this.chairForm.date2,
                  chairSite:this.chairForm.site,
                  chairSum:this.chairForm.sum})
                  .then((res)=>{
                    if(res.data.status == 1){
                      this.$message({
                        type:"success",
                        message:res.data.msg
                      })
                      this.chairDialogVisible = false
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
        deleteChair(data){
            this.axios.get('/chair/deleteChair',{params:{chairId:data.chairId}})
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
            this.axios.get('/chair/getAllChair')
            .then((res)=>{
                this.tableData = res.data.data.chairList
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