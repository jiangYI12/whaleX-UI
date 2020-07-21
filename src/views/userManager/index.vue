<template>
  <div class="app-container">
    <div style="padding: 5px">
      <el-button type="primary" @click="addCustomerDialogVisible=true">添加新用户</el-button>
    </div>
    <div>
      <el-table
        :data="customers"
        border
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="account"
          label="账户"
          width="200"
        />
        <el-table-column
          prop="avatar"
          label="头像"
          width="80"
        >
          <template slot-scope="scope">
            <div>
              <el-image
                :src="scope.row.avatar"
                :preview-src-list="[scope.row.avatar]"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="200"
        />
        <el-table-column
          prop="phone"
          label="手机"
          width="200"
        />
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="200"
        />
        <el-table-column
          prop="role"
          label="角色"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">修改</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="text-align: center;padding:8px;">
        <el-pagination
          :current-page="page.pageNo"
          :page-sizes="[20, 40, 80, 100]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <el-dialog
      title="添加新用户"
      :visible.sync="addCustomerDialogVisible"
      width="30%"
      center
    >
      <el-form label-position="left" label-width="80px" :model="formLabelAlign">
        <el-form-item label="账户" required>
          <el-input v-model="customer.account" />
        </el-form-item>
        <el-form-item label="密码" required>
          <el-input v-model="customer.password" />
        </el-form-item>
        <el-form-item label="用户名" required>
          <el-input v-model="customer.username" />
        </el-form-item>
        <el-form-item label="手机号" required>
          <el-input v-model="customer.phone" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCustomerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCustomer">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserPage, addCustomer } from '@/api/user'
export default {
  name: 'UserManager',
  data() {
    return {
      addCustomerDialogVisible: false,
      page: {
        pageSize: 20,
        pageNo: 1,
        total: 0
      },
      customer: {
        account: '',
        username: '',
        password: '',
        phone: '',
        // 默认普通用户
        roles: [{ id: 2 }]
      },
      customers: []
    }
  },
  mounted() {
    this.getUserPage()
  },
  methods: {
    addCustomer() {
      addCustomer(this.customer).then(response => {

      })
    },
    getUserPage() {
      getUserPage(this.page).then(respone => {
        const data = respone.data
        const { total, size, current } = data
        this.page = { total: total, pageSize: size, pageNo: current }
        this.customers = data.records
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
