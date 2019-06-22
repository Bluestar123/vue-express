<template>
    <div>
        <h1>{{id ? '编辑':"新建"}}管理员</h1>

        <el-form label-width='120px' @submit.native.prevent="save">
            
            <el-form-item label='姓名'>
                <el-input v-model='model.username'></el-input>
            </el-form-item>
            <el-form-item label='密码'>
                <el-input type='password' v-model='model.password'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :loading='addloading' type='primary' native-type='submit'>提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    props:[
        'id'
    ],
    data(){
        return {
            addloading:false,
            model:{
                
            }
        }
    },
    created(){
        this.id && this.fetch()

    },
    methods:{
        async save(){

            if(!this.model.username || !this.model.password){
                this.$message.error('请填写正确信息')
                return
            }
            this.addloading=true
            // if(this.model.parent===''){
            //     delete this.model.parent
            // }
            var res;
            if(this.id){
                //修改
                res = await this.$http.put(`/rest/admin_users/${this.id}`,this.model)
            }else{
                //创建
                res = await this.$http.post('/rest/admin_users',this.model)
            }
            
            this.addloading=false
            this.$message.success('保存成功')
            this.$router.push('/admin_users/list')
        },
        async fetch(){
            const res = await this.$http.get(`/rest/admin_users/${this.id}`)

            this.model = res.data
        }
    }
}
</script>

