<template>
    <div>
        <h1>{{id ? '编辑':"新建"}}分类</h1>

        <el-form label-width='120px' @submit.native.prevent="save">
            <el-form-item label='上级分类'>
                <el-select v-model='model.parent' clearable>
                    <el-option v-for='(item,index) in parents' :key='index'
                        :label='item.name' :value='item._id'
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label='名称'>
                <el-input v-model='model.name'></el-input>
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
                
            },
            parents:[]
        }
    },
    created(){
        this.id && this.fetch()

        this.fetchParents()
    },
    methods:{
        async save(){

            if(!this.model.name){
                this.$message.error('请填写正确信息')
                return
            }
            this.addloading=true
            if(this.model.parent===''){
                delete this.model.parent
            }
            let res
            if(this.id){
                //修改
                res = await this.$http.put(`/categories/${this.id}`,this.model)
            }else{
                //创建
                res = await this.$http.post('/categories',this.model)
            }
            
            this.addloading=false
            this.$message.success('保存成功')
            this.$router.push('/categories/list')
        },
        async fetch(){
            const res = await this.$http.get(`/categories/${this.id}`)

            this.model = res.data
        },
        async fetchParents(){
            const res = await this.$http.get('/categories')
            this.parents = res.data
        }
    }
}
</script>

