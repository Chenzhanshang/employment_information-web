<template>
    <el-form  ref="form" :model="form" label-width="15%">
                    <el-form-item label="用户名：" prop="userName">
                        <el-input v-model="form.userName" placeholder="请输入用户名" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="姓名：" prop="name">
                        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="性别：">
                        <el-radio-group v-model="form.sex">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="身份证号：">
                        <el-input v-model="form.idCard" placeholder="请输入你身份证号"></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码：">
                        <el-input v-model="form.phone" placeholder="请输入你电话号码"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱：">
                        <el-input v-model="form.email" placeholder="请输入你的邮箱地址"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div style="text-align:center"><el-button type="primary" @click="update">立即修改</el-button></div>
                    </el-form-item>
                </el-form>
</template>
<script>
export default {
    data(){
        return{
            form: {
                name:'',
                userName:'',
                idCard:'',
                phone: '',
                email: '',
                sex:''
            },
            user:''
        }
    },
    methods:{
        //修改
        update(){
            this.axios.post('/user/update',{
                userName:this.form.userName,
                name:this.form.name,
                idCard:this.form.idCard,
                phone: this.form.phone,
                email:this.form.email,
                sex:this.form.sex
            })
            .then((res=>{
                if(res.data.status == 1){
                    this.$message({
                        type:"success",
                        message:res.data.msg
                    });
                    //更新本地缓存信息
                    this.user.name=this.form.name,
                    this.user.idCard=this.form.idCard,
                    this.user.phone= this.form.phone,
                    this.user.email=this.form.email,
                    this.user.sex=this.form.sex
                    localStorage.data = JSON.stringify(this.user)
                }
                else{
                    this.$message({
                        type:"warning",
                        message:res.data.msg
                    });
                }
            }))
            .catch()
        }
    },
    created(){
        //加载页面数据回显
        this.user = JSON.parse(localStorage.data)
        this.form.userName = this.user.userName
        this.form.name = this.user.name
        this.form.idCard = this.user.idCard
        this.form.phone = this.user.phone
        this.form.email = this.user.email
        this.form.sex = this.user.sex
    }

}
</script>