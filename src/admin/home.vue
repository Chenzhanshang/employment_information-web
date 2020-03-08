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
          <template slot="title">新增信息</template>
              <el-menu-item @click="announcementDialogVisible = true">发布公告</el-menu-item>
          <el-menu-item @click="chairDialogVisible = true">发布讲座信息</el-menu-item>
          <el-menu-item @click="jobDialogVisible = true">发布招聘会信息</el-menu-item>
          <el-menu-item @click="fileDialogVisible = true">就业指导资料上传</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">管理</template>
          <el-menu-item index="/adminHome/userManage">用户管理</el-menu-item>
          <el-menu-item index="/adminHome/adminAnnouncement">公告管理</el-menu-item>
          <el-menu-item index="/adminHome/adminJob">招聘会管理</el-menu-item>
          <el-menu-item index="/adminHome/feedback">反馈信息查看</el-menu-item>
          <el-menu-item index="/adminHome/adminChair">指导讲座管理</el-menu-item>
          <el-menu-item index="/adminHome/adminFile">就业指导资料管理</el-menu-item>
        </el-submenu>
          <p style="position:absolute;right:60px;color:#FFFFFF"> 欢迎管理员：{{user.userName}}</p>
          <p style="position:absolute;right:10px;color:#E5551F" @click="logout"> 退出</p>
      </el-menu>
    </el-header>
    <el-dialog
    title="请填写公告信息"
    :visible.sync="announcementDialogVisible"
    width="50%">
    <el-form :model="announcementForm" label-width="15%">
            <el-form-item label="公告标题" prop="title">
                <el-input v-model="announcementForm.title" placeholder="请输入公告标题"></el-input>
            </el-form-item>
            <el-form-item label="公告内容：">
                <el-input v-model="announcementForm.content" placeholder="请输入公告内容"></el-input>
            </el-form-item>
            <el-form-item>
                <div style="padding-left:160px"><el-button type="primary" @click="issueAnnouncement">发布公告</el-button></div>
            </el-form-item>
        </el-form>
    </el-dialog>
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
                <div style="padding-left:160px"><el-button type="primary" @click="issueChair">发布讲座</el-button></div>
            </el-form-item>
        </el-form>
    </el-dialog>

    <el-dialog
    title="请填写描述并上传文件"
    :visible.sync="fileDialogVisible"
    width="50%">
    <el-form :model="fileForm" label-width="15%">
            <el-form-item label="文件描述：">
                <el-input v-model="fileForm.describe" placeholder="请输入文件描述"></el-input>
            </el-form-item>
            <el-upload
            :action="'http://localhost:8888/employment/file/uploadFile/'"
            name="multipartFile" 
            :auto-upload=false
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="uploadOnSuccess"
            :limit="1"
            :data="{fileDescribe:fileForm.describe}"
            ref="upload"
            :on-exceed="handleExceed"
            :file-list="fileList">
              选择文件：<el-button size="small" type="primary">选择文件</el-button>
            </el-upload>   
            <el-form-item>
                <div style="padding-left:160px"><el-button type="primary" @click="submitFile">上传提交</el-button></div>
            </el-form-item>
        </el-form>
    </el-dialog>

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
                <div style="padding-left:160px"><el-button type="primary" @click="issueJob">发布招聘会</el-button></div>
            </el-form-item>
        </el-form>
    </el-dialog>

    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>


<script>
  export default {
    data() {
      return {
        announcementDialogVisible:false,
        chairDialogVisible:false,
        jobDialogVisible:false,
        fileDialogVisible:false,
        activeIndex: '1',
        user:'',
        announcementForm:{
          title:'',
          content:''
        },
        chairForm:{
          name:'',
          site:'',
          date1:'',
          date2:'',
          sum:'',
        },
        jobForm:{
          name:'',
          site:'',
          date1:'',
          date2:'',
          sum:'',
        },
        fileList: [],
        fileForm:{
          describe:'',
        },
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      //退出
      logout(){
        localStorage.clear()
        this.$router.push('/login')
      },

      //保存文件
      submitFile(){
        this.$refs.upload.submit();
      },
      //发布讲座
      issueChair(){
        console.log(this.chairForm)
        this.axios.post('/chair/issueChair',
                  {chairName:this.chairForm.name,
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
      //发布招聘会
      issueJob(){
        this.axios.post('/job/issueJob',
                  {jobName:this.jobForm.name,
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
      //发布公告
      issueAnnouncement(){
        this.axios.post('/announcement/issueAnnouncement',
                  {announcementTitle:this.announcementForm.title,
                  announcementContent:this.announcementForm.content,
                  user:{userId:this.user.userId}})
                  .then((res)=>{
                    if(res.data.status == 1){
                      this.$message({
                        type:"success",
                        message:res.data.msg
                      })
                      this.announcementDialogVisible = false
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

      //以下是文件上传控制方法
      handleRemove(file, fileList) {},
      handlePreview(file) {
        console.log(file);
      },

      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件`);
      },
      uploadOnSuccess(){
        this.fileDialogVisible = false
        this.$message({
          type:"success",
          message:'上传成功'
        })
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？不可逆操作`);
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
        
    },
    
  }
</script>