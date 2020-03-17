<template >
    <el-container>
    <div class="background">
        <img :src="imgSrc" width="100%" height="100%" />
    </div>
        <el-header>
 
        </el-header>
        <el-main class="main" >
            
            <el-dialog
            title="请填写注册信息"
            :visible.sync="dialogVisible"
            width="50%">
            <el-form  ref="form" :model="form" label-width="15%">
                    <el-form-item label="用户名：" prop="userName">
                        <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="密码：" prop="pass">
                        <el-input type="password" v-model="form.pass" autocomplete="off" placeholder="请输入你的密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码：" prop="checkPass">
                        <el-input type="password" v-model="form.checkPass" autocomplete="off" placeholder="请再次输入你的密码"></el-input>
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
                        <div style="padding-left:160px"><el-button type="primary" @click="register">立即注册</el-button></div>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <el-dialog
            title="请填写信息"
            :visible.sync="findDialogVisible"
            width="50%">
            <el-form :model="findForm" label-width="15%">
                    <el-form-item label="姓名：" prop="name">
                        <el-input v-model="findForm.name" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号：">
                        <el-input v-model="findForm.idCard" placeholder="请输入你身份证号"></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码：">
                        <el-input v-model="findForm.phone" placeholder="请输入你电话号码"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱：">
                        <el-input v-model="findForm.email" placeholder="请输入你的邮箱地址"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div style="padding-left:160px"><el-button type="primary" @click="find">立即找回</el-button></div>
                    </el-form-item>
                    <div style="text-align:center" v-if="findFlag">
                        <p>以下是你的用户名密码，请牢记</p>
                        <p>用户名：{{this.userName}}</p>
                        <p>密码：{{this.password}}</p>
                    </div>
                </el-form>
            </el-dialog>
            <el-row type="flex" align="middle" justify="end">

                <el-col :xs="18" :sm="14" :md="10" :lg="8" :xl="8" >
                    <el-form ref="loginForm" label-position="left" :model="loginForm" :rules="rules" label-width="80px" class="login-box">
                    <h3 class="login-title">欢迎登录</h3>
                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="loginForm.userName" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item >
                        <el-button type="primary" :loading="loading" @click="login('loginForm')">{{loading==false?'登录':'登录中'}}</el-button>
                        <el-button type="warning"  @click="dialogVisible = true">注册</el-button>
                    </el-form-item>
                    <div style="text-align:center"><p style="color:#007ACC" @click="findDialogVisible = true">找回账号</p></div>
                </el-form>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible:false,
            findDialogVisible:false,
            //背景图
            imgSrc:require('./login.png'),
            //是否找到账号
            findFlag:false,
            form: {
                pass: '',
                checkPass: '',
                name:'',
                userName:'',
                idCard:'',
                phone: '',
                email: '',
                sex:''
            },
            findForm: {
                name:'',
                idCard:'',
                phone: '',
                email: '',
            },
            loading:false,
            //存放找到的用户名密码
            userName:'',
            password:'',
            loginForm:{
                userName:'',password:''
            },
             rules: {
                userName: [
                    {required: true, message: '账号不可为空', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '密码不可为空', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        login(formName){
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    this.loading = true
                    this.axios.post('/user/login',this.loginForm)
                    .then((res)=>{
                        if(res.data.status==1){
                            //弹出提示
                            this.$message({
                                type:"success",
                                message:res.data.msg
                            });
                            if(res.data.data.user.role == 0){
                                this.$router.push({
                                    path: '/home',
                                    query: {
                                    user: res.data.data.user
                                    }
                                })
                            }
                            else{
                                this.$router.push({
                                    path: '/adminHome',
                                    query: {
                                    user: res.data.data.user
                                    }
                                })
                            }
                            
                        }
                        else{
                            //弹出提示
                            this.$message({
                                type:"warning",
                                message:res.data.msg
                            });
                        }
                        this.loading = false
                        
                    })
                    .catch((err)=>{
                        console.log(err);
                        this.loading = false
                    });
                }
                else{
                    //校验未通过,不提交表单
                    return false
                }
            })
        },
        //注册
        register(){
            this.axios.post('/user/register',{
                password: this.form.pass,
                name:this.form.name,
                userName:this.form.userName,
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
                    this.dialogVisible = false
                }
                else{
                    this.$message({
                        type:"warning",
                        message:res.data.msg
                    });
                }
            }))
            .catch()
        },
        //找回账号
        find(){
            this.axios.post('/user/find',{
                name:this.findForm.name,
                idCard:this.findForm.idCard,
                phone: this.findForm.phone,
                email:this.findForm.email,
            })
            .then((res=>{
                if(res.data.status == 1){
                    this.$message({
                        type:"success",
                        message:res.data.msg
                    });
                    this.userName = res.data.data.user.userName
                    this.password = res.data.data.user.password
                    this.findFlag = true
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
    }
    
}
</script>

<style scoped>
    .login-box {
    border: 1px solid #DCDFE6;
    width: 70%;
    margin:  auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
    background-color: #fff;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 15px auto;
    color: #303133;
  }
  .main{
      margin-top: calc(15vh)
  }

  .background{
    width:100%;  
    height:100%;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
    position: absolute;
    }


</style>