<template>
  <div class="app-container">
    <div style="padding: 5px">
      <el-button type="primary" @click="addRoleDialogVisible=true">添加角色</el-button>
    </div>
    <div>
      <el-table
        :data="roles"
        border
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="roleName"
          label="角色名"
        />
        <el-table-column
          prop="roleCode"
          label="角色码"
        />
        <el-table-column
          prop="roleDesc"
          label="角色描述"
        />
        <el-table-column
          prop="createTime"
          label="创建时间"
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
      :visible.sync="addRoleDialogVisible"
      width="30%"
      center
    >
      <el-form label-position="left" label-width="80px">
        <el-form-item label="角色名" required>
          <el-input v-model="role.roleName" />
        </el-form-item>
        <el-form-item label="角色码" required>
          <el-input v-model="role.roleCode" />
        </el-form-item>
        <el-form-item label="角色描述" required>
          <el-input v-model="role.roleDesc" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as roleApi from '@/api/role'
export default {
  name: 'Role',
  data() {
    return {
      addRoleDialogVisible: false,
      roles: [],
      page: {
        pageSize: 20,
        pageNo: 1,
        total: 0
      },
      role: {
        id: '',
        roleName: '',
        roleCode: '',
        roleDesc: ''
      }
    }
  },
  mounted() {
    this.getRoles()
  },
  methods: {
    saveOrUpdate() {
      roleApi.saveOrUpdate(this.role).then(response => {
        console.log(response)
      })
    },
    deleteRole() {
      roleApi.deleteById(this.role.id).then(response => {

      })
    },
    getRoles() {
      roleApi.getRoutesPage(this.page).then(response => {
        const { total, size, current, records } = response.data
        this.page = {
          pageSize: size,
          pageNo: current,
          total: total
        }
        this.roles = records
      })
    },
    handleSizeChange() {
      roleApi.getRoutesPage(this.page).then(response => {
        console.log(response)
      })
    },
    handleCurrentChange() {
      roleApi.getRoutesPage(this.page).then(response => {
        console.log(response)
      })
    }
  }
}
</script>

<style scoped>

</style>
