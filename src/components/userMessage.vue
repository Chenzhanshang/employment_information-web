<template>
    <div style="text-align:center">
        <p>用户名：{{user.userName}}</p>
        <p>姓名：{{user.name}}</p>
        <p>电话：{{user.phone}}</p>
        <p>邮箱：{{user.email}}</p>
        <p>性别：{{user.sex}}</p>
        <p>身份证号：{{user.idCard}}</p>
    </div>
</template>
<script>
export default {
    data(){
        return{
            user:''
        }
    },
    created(){
        this.user = JSON.parse(localStorage.data)
        console.log("this.user")
    }
}
</script>