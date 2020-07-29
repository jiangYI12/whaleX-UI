<template>
  <div class="app-container">
    <div style="padding: 5px">
      <el-button type="primary" @click="addPermissionDialogVisible=true">添加菜单</el-button>
    </div>
    <div>
      <el-table
        :data="permissions"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        lazy
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column
          prop="name"
          label="菜单名"
        />
        <el-table-column
          prop="icon"
          label="标志"
        />
        <el-table-column
          prop="permission"
          label="权限编号"
          sortable
          width="180"
        />
        <el-table-column
          prop="path"
          label="路径"
        />
        <el-table-column
          prop="createTime"
          label="创建时间"
        />
        <el-table-column
          prop="sort"
          label="排序"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click.native.prevent="deleteRow(scope.$index, tableData)"
            >
              移除
            </el-button>
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
      title="添加新菜单"
      :visible.sync="addPermissionDialogVisible"
      width="30%"
      center
    >
      <el-form label-position="left" label-width="100px">
        <el-form-item label="菜单名" required>
          <el-input v-model="permission.name" />
        </el-form-item>
        <el-form-item label="菜单编号" required>
          <el-input v-model="permission.permissionName" />
        </el-form-item>
        <el-form-item label="菜单路径" required>
          <el-input v-model="permission.path" />
        </el-form-item>
        <el-form-item label="菜单排序" required>
          <el-input v-model="permission.sort" />
        </el-form-item>
        <el-form-item label="请选择父类" required>
          <el-select v-model="permission.parentId" placeholder="请选择">
            <el-option
              v-for="item in permissionList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPermissionDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as permissionApi from '@/api/permission'
export default {
  name: 'Permission',
  data() {
    return {
      page: {
        pageSize: 20,
        pageNo: 1,
        total: 0
      },
      permissionList: [],
      addPermissionDialogVisible: false,
      permissions: [],
      permission: {
        id: '',
        sort: '',
        permissionName: '',
        path: '',
        parentId: '',
        icon: ''
      }
    }
  },
  mounted() {
    this.getPermissions()
    this.getPermissionsList()
  },
  methods: {
    saveOrUpdate() {
      this.permission.id = this.permission.id + ''
      permissionApi.saveOrUpdate(this.permission).then(response => {

      })
    },
    getPermissions() {
      permissionApi.getSysMenusPage(this.page).then(response => {
        const { total, size, current, records } = response.data
        this.page = {
          pageSize: size,
          pageNo: current,
          total: total
        }
        this.permissions = records
      })
    },
    changePermission(value) {
      console.log(value)
    },
    getPermissionsList() {
      permissionApi.getSysMenusList().then(response => {
        // this.permissionList = response.data
        this.permissionList = this.permissionList.concat([{
          'id': -1,
          'name': '顶级菜单'
        }], response.data)
      })
    }
  }
}
</script>
