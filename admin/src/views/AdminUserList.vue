<template>
  <div class="about">
    <h1>管理员列表</h1>
    <el-table :data="tableData" v-loading='loading'>
            <el-table-column prop="_id" label="ID">
            </el-table-column>
            <el-table-column prop="username" label="管理员姓名">
            </el-table-column>
            <el-table-column label='操作'>
               <template slot-scope="scope">
                   <el-button @click='edit(scope.row)' size='small' type='text'>编辑</el-button>
                   <el-button @click='del(scope.row)' size='small' type='text'>删除</el-button>
               </template>
            </el-table-column>
        </el-table>
  </div>
</template>

<script>
export default{
    data(){
        return {
            loading:false,
            tableData:[]
        }
    },
    created(){
        this.fetch()
    },
    methods:{
        async fetch(){
            this.loading=true
            const res = await this.$http.get('/rest/admin_users')
            this.loading=false
            this.tableData = res.data
        },
        del(row){
            this.$alert('确认删除该分类？','警告',{
                confirmButtonText:'确定',
                type:'warning',
                callback:async action=>{
                    if(action=='confirm'){
                        await this.$http.delete(`/rest/admin_users/${row._id}`)
                        this.$message.success('删除成功')
                        this.fetch()
                    }
                }
            })
        },
        edit(row){
            this.$router.push(`/admin_users/edit/${row._id}`)
        }
    }   
}
</script>

