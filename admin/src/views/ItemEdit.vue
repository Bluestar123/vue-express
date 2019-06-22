<template>
    <div>
        <h1>{{id ? '编辑':"新建"}}物品</h1>

        <el-form label-width='120px' @submit.native.prevent="save">
            <el-form-item label='名称'>
                <el-input v-model='model.name'></el-input>
            </el-form-item>

            <el-form-item label='图标'>
                <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :headers='getAuthHeaders()'
                    :show-file-list="false"
                    :on-success="afterUpload">
                    <img v-if="model.icon" :src="model.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>

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

            if(!this.model.name){
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
                res = await this.$http.put(`/rest/items/${this.id}`,this.model)
            }else{
                //创建
                res = await this.$http.post('/rest/items',this.model)
            }
            
            this.addloading=false
            this.$message.success('保存成功')
            this.$router.push('/items/list')
        },
        async fetch(){
            const res = await this.$http.get(`/rest/items/${this.id}`)

            this.model = res.data
        },
        afterUpload(res, file) {
            this.$set(this.model,'icon',res.url)
        }
    }
}
</script>

<style>

  .avatar-uploader-icon {
    width: 178px;
    height: 178px;
    line-height: 178px;
  }
  .avatar {
    width: 178px;
    height: 178px;
  }
</style>
