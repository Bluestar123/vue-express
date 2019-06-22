<template>
    <div>
        <h1>{{id ? '编辑':"新建"}}文章</h1>

        <el-form label-width='120px' @submit.native.prevent="save">
            <el-form-item label='所属分类'>
                <el-select v-model='model.categories' multiple>
                    <el-option v-for='(item,index) in categories' :key='index'
                        :label='item.name' :value='item._id'
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label='标题'>
                <el-input v-model='model.title'></el-input>
            </el-form-item>
            <el-form-item label='详情'>
                <vue-editor v-model='model.body'
                    useCustomImageHandler
                    @imageAdded='handleImageAdded'
                ></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button :loading='addloading' type='primary' native-type='submit'>提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {VueEditor } from 'vue2-editor';
export default {
    props:[
        'id'
    ],
    components:{VueEditor},
    data(){
        return {
            addloading:false,
            model:{
                
            },
            categories:[]
        }
    },
    created(){
        this.id && this.fetch()

        this.fetchCategories()
    },
    methods:{
        async handleImageAdded(file,Editor,cursorLocation,resetUploader){
            var formData = new FormData()
            formData.append('file',file)

            const res = await this.$http.post('/upload',formData)

            Editor.insertEmbed(cursorLocation,'image',res.data.url)

            resetUploader()
        },
        async save(){

            if(!this.model.title){
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
                res = await this.$http.put(`/rest/articles/${this.id}`,this.model)
            }else{
                //创建
                res = await this.$http.post('/rest/articles',this.model)
            }
            
            this.addloading=false
            this.$message.success('保存成功')
            this.$router.push('/articles/list')
        },
        async fetch(){
            const res = await this.$http.get(`/rest/articles/${this.id}`)

            this.model = res.data
        },
        async fetchCategories(){
            const res = await this.$http.get('/rest/categories')
            this.categories=[]
            for(let i of res.data){
                if(i.parent && i.parent.name=='新闻资讯'){
                    this.categories.push(i)
                }
            }
        }
    }
}
</script>

