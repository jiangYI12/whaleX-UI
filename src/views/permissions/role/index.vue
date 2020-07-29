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
          width="150"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="showAddRoleMenuVisible(scope.row.id)">添加路由</el-button>
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
      :visible.sync="addRoleMenuVisible"
      width="30%"
      center
    >
      <el-form label-position="right" label-width="100px">
        <el-form-item>
          <el-tree
            :data="menus"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            @check="checkMenu"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoleMenuVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoleMenu">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="角色添加路由"
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
import * as permissionApi from '@/api/permission'
export default {
  name: 'Role',
  data() {
    return {
      addRoleDialogVisible: false,
      addRoleMenuVisible: false,
      roles: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      page: {
        pageSize: 20,
        pageNo: 1,
        total: 0
      },
      roleMenu: {
        roleId: '',
        menuIds: []
      },
      menus: [],
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
    this.getMenus()
  },
  methods: {
    checkMenu(checkedNodes, checkedJson) {
      this.roleMenu.menuIds = checkedJson.checkedKeys
    },
    getMenus() {
      permissionApi.getSysMenusList().then(response => {
        this.menus = response.data
        console.log(this.menus)
      })
    },
    saveOrUpdate() {
      roleApi.saveOrUpdate(this.role).then(response => {
        console.log(response)
      })
    },
    addRoleMenuVisible() {
      roleApi.deleteById(this.role.id).then(response => {

      })
    },
    showAddRoleMenuVisible(roleId) {
      this.addRoleMenuVisible = true
      this.roleMenu.roleId = roleId
    },
    addRoleMenu() {
      roleApi.addRoleMenu(this.roleMenu).then(response => {

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
