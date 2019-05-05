<template>
  <div>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="Date" prop="date"></el-table-column>
      <el-table-column label="Name" prop="name"></el-table-column>
      <el-table-column label="Name" prop="address"></el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="text" @click="dialogVisible = true">添加</el-button>
    <el-dialog title="增加一个数据" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div>
        <el-input placeholder="请输入内容" v-model="date">
          <template slot="prepend">date</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="name">
          <template slot="prepend">name</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="address">
          <template slot="prepend">address</template>
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addList()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改一行数据"
      :visible.sync="changedialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div>
        <el-input placeholder="请输入内容" v-model="nList.date">
          <template slot="prepend">date</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="nList.name">
          <template slot="prepend">name</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="nList.address">
          <template slot="prepend">address</template>
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changedialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editList()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from "../config/api";
export default {
  name: "Test1",
  data() {
    return {
      dialogVisible: false,
      changedialogVisible: false,
      tableData: [],
      oList: {},
      nList: {},
      date: "",
      name: "",
      address: "",
      search: ""
    };
  },
  mounted() {
    this.axios
      .get(
        `${api}/getlist`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.token
          }
        }
      )
      .then(response => {
        console.log(response.data);
        if (response.data.code == 0) {
          // console.log()
          this.tableData = response.data.data;
        } else {
          this.$message.error(response.data.msg);
        }
      });
  },
  methods: {
    handleEdit(index, row) {
      console.log(row)
      this.oList = row;
      this.nList = row;
      this.changedialogVisible = true;
    },
    handleDelete(index, row) {
      this.axios
        .delete(`${api}/deleteList`, {
          data: { id: row.id },
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.token
          }
        })
        .then(response => {
          console.log(response.data);
          if (response.data.code == 0) {
            this.$message({
              message: response.data.msg,
              type: "success"
            });
          } else {
            this.$message.error(response.data.msg);
          }
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    addList() {
      this.axios
        .post(
          `${api}/addList`,
          { name: this.name, date: this.date, address: this.address },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.token
            }
          }
        )
        .then(response => {
          console.log(response.data);
          if (response.data.code == 0) {
            this.$message({
              message: response.data.msg,
              type: "success"
            });
          } else {
            this.$message.error(response.data.msg);
          }
        });
    },
    editList() {
      this.axios
        .put(
          `${api}/updateList`,
          {
            oList: { id: this.oList.id },
            nList: this.nList,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.token
            }
          }
        )
        .then(response => {
          console.log(response.data);
          if (response.data.code == 0) {
            this.$message({
              message: response.data.msg,
              type: "success"
            });
          } else {
            this.$message.error(response.data.msg);
          }
        });
    }
  }
};
</script>