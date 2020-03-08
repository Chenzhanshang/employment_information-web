<template>

    <el-collapse>
        <div v-for="announcement in announcementList" :key="announcement.announcementId">
            <el-collapse-item :title="announcement.announcementTitle" :name="announcement.announcementId" style="padding:0px 0px 30px 0px" >
            <div>{{announcement.announcementContent}}</div>
            </el-collapse-item>
        </div>
    
    </el-collapse>
    
</template>
<script>
  export default {
    data() {
      return {
        announcementList:[],
        activeNames: []
      };
    },
    methods: {
    },
    created(){
        this.axios.get('/announcement/getAllAnnouncement')
        .then((res)=>{
            console.log(res)
            this.announcementList = res.data.data.announcementList
        })
        .catch()
    }
  }
</script>