<template>
  <el-container>
    <el-header>
      <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      :router=true
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">账号管理</template>
        <el-menu-item @click="updatePassword">修改密码</el-menu-item>
        <el-menu-item index="/home/userMessage">个人信息</el-menu-item>
        <el-menu-item index="/home/updateMessage">修改信息</el-menu-item>
        <el-menu-item @click="submitFeedback">反馈信息提交</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">就业指导</template>
        <el-menu-item index="/home/job">招聘会申请</el-menu-item>
        <el-menu-item index="/home/chair">指导讲座申请</el-menu-item>
        <el-menu-item index="/home/file">就业指导资料下载</el-menu-item>
      </el-submenu>
        <el-menu-item index="/home/announcement" >公告</el-menu-item>
        <p style="position:absolute;right:60px;color:#FFFFFF"> 欢迎用户：{{user.userName}}</p>
        <p style="position:absolute;right:10px;color:#E5551F" @click="logout"> 退出</p>
      </el-menu>
    </el-header>
    <el-main>
      <router-view>
      </router-view>
     
    </el-main>

  </el-container>
    


</template>


<script>
  export default {
    data() {
      return {

        feedback:false,
        activeIndex: '1',
        user:'',
      };
    },
    methods: {
      //提交反馈
      submitFeedback(){
        this.$prompt('请填写反馈内容', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal:false,
        inputPlaceholder:'反馈内容'
        }).then(({ value }) => {
          this.axios.post("/feedback/submitFeedback",{user:{userId:this.user.userId},feedbackContent: value})
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
      })
      .catch(() => {
        });
      },
      //修改密码
      updatePassword(){
      this.$prompt('请输入你的新密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal:false,
        inputPlaceholder:'密码'
        }).then(({ value }) => {
          this.axios.post("/user/updatePassword",{userName:this.user.userName,password: value})
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
              message:"修改密码失败"
            })
          }
          
        })
        .catch()
      })
      .catch(() => {
        });
      },
      //退出
      logout(){
        localStorage.clear()
        this.$router.push('/login')
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
    },
    created(){
      if(localStorage.getItem("data") != null){
        //取出缓存
        this.user = JSON.parse(localStorage.data)
      }
      else{
        this.user = this.$route.query.user
          //将用户信息放入缓存
          localStorage.data = JSON.stringify(this.user)
      }
        
    }
  }
</script>
