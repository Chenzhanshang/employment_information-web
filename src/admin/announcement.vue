<template>

    <el-collapse>
        <div v-for="announcement in announcementList" :key="announcement.announcementId">
            <el-collapse-item :title="announcement.announcementTitle" :name="announcement.announcementId" 
            style="padding:0px 0px 30px 0px;float:left;width:90%" >
            <div>{{announcement.announcementContent}}</div>
            </el-collapse-item>
            <div style="float:left;width:10%;text-align:center;padding-top:10px">
              <el-button type="success" size="mini" @click="updataForm(announcement)">修改</el-button>
              <el-button type="warning" size="mini" @click="deleteAnnouncement(announcement.announcementId)">删除</el-button>
            </div>
        </div>
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
                    <div style="padding-left:160px"><el-button type="primary" @click="updateAnnouncement">修改</el-button></div>
                </el-form-item>
            </el-form>
        </el-dialog>
    </el-collapse>
    
    
</template>
<script>
  export default {
    data() {
      return {
        announcementDialogVisible:false,
        announcementForm:{
          title:'',
          content:''
        },
        //临时存放id
        announcementId:'',
        announcementList:[],
        activeNames: []
      };
    },
    methods: {
      //修改表单控制
      updataForm(announcement){
        this.announcementDialogVisible = true
        this.announcementForm.content = announcement.announcementContent
        this.announcementForm.title = announcement.announcementTitle
        this.announcementId = announcement.announcementId
      },
      //修改
      updateAnnouncement(announcementId){
        this.axios.post('/announcement/updateAnnouncement',
                  {
                  announcementId:this.announcementId,
                  announcementTitle:this.announcementForm.title,
                  announcementContent:this.announcementForm.content,
                  user:{userId:JSON.parse(localStorage.data).userId}})
        .then((res)=>{
          if(res.data.status == 1){
            this.$message({
              type:"success",
              message:res.data.msg
            })
            this.getData()
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
      //删除
      deleteAnnouncement(announcementId){
        this.axios.get('/announcement/deleteAnnouncement',{params:{announcementId:announcementId}})
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
        this.axios.get('/announcement/getAllAnnouncement')
        .then((res)=>{
            console.log(res)
            this.announcementList = res.data.data.announcementList
        })
        .catch()
      }
    },
    created(){
        this.getData()
    }
  }
</script>