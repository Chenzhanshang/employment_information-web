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
          prop="userName"
          label="用户名"
          align="center">
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名"
          align="center">
      </el-table-column>
      <el-table-column
          prop="sex"
          label="性别"
          align="center">
      </el-table-column>
      <el-table-column
          prop="idCard"
          label="身份证号"
          align="center">
      </el-table-column>
      <el-table-column
          prop="phone"
          label="电话"
          align="center">
      </el-table-column>
      <el-table-column
          prop="role"
          label="角色"
          align="center">
      </el-table-column>
      <el-table-column
          prop="email"
          label="邮箱地址"
          align="center">
      </el-table-column>
      <el-table-column
      label="操作"
      align="center">
        <template slot-scope="scope" >
          <el-button
            size="mini"
            type="danger"
            plain
            @click="openDelete(scope.row)"
          >删除</el-button>    
        </template>
      </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>
<script>
export default {
    //计算函数，处理数据
    computed:{
      tableData:function(){
        return this.userList.filter((item)=>{
          item.role == 0 ? item.role = '学生' : item.role = '管理员'
          return item;
        })
      }
    },
    data(){
        return {
          userList: []
        }
    },
    methods:{
      //删除对话框
      openDelete(data) {
        console.log(data)
        this.$confirm('此操作将永久删除该用户及该用户所有数据，且不可逆, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.get("/user/deleteUser", {params:{userId: data.userId}})
          .then((res)=>{
            if(res.data.status == 1){
              this.$message({
                type: 'success',
                message:res.data.msg 
              });
              this.getData()
            }
            else{
              this.$message({
                type: 'error',
                message:res.data.msg 
              });
            }
          })
          .catch()
        }).catch(() => {  
        });
      },
      //获取数据
      getData(){
        this.axios.get('/user/getAllUser')
        .then((res)=>{
          this.userList = res.data.data.userList
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