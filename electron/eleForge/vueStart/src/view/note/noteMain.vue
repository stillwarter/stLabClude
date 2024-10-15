<script setup>
import { onMounted, ref } from "vue";
import mdEdit from "@/catboxComponent/mdEdit.vue";
import MdPreview from "@/catboxComponent/MdPreview.vue";
const treeData = ref([]);
const showTreeNode = ref(true);
const mdEditRef = ref(0);
electronAPI.getNoteTree().then((res) => {
  treeData.value = res;
});

const placement = ref("left");
const open = ref(false);
const showDrawer = () => {
  open.value = true;
};
const onClose = () => {
  open.value = false;
};

const closem = () => {
  const a = document.querySelector(".meun");
  a.style = "width:0";
  showTreeNode.value = false;
};

/* 文件夹操作 */
const curFileInfo = ref({ type: "directory" });
const newFilePath = ref(false);
const newFileCPath = ref(false);
const newFileMdPath = ref(false);
const delFilePath = ref(false);
const delMdFile = ref(false);
const inputPath = ref("");
const chosePath = ref("");
const curMdata = ref("空白md文件");
// 选择当前路径
const choseCurPath = async (name, type, path) => {
  curFileInfo.value = { name, type, path };
  if (type == "file") {
    const mdata = await electronAPI.getMdFile(path);
    curMdata.value = mdata;
  }
  if (editState.value == 2) {
    editState.value = 1;
  }
};
// 打开根文件夹新增弹框
const showNewFilePathModal = (pathname) => {
  newFilePath.value = true;
};
// 打开子文件夹新增弹框
const showNewCFilePathModal = (pathname) => {
  chosePath.value = pathname;
  newFileCPath.value = true;
};
// 打开md文件新增弹框
const showNewFileMdPathModal = (pathname) => {
  chosePath.value = pathname;
  newFileMdPath.value = true;
};
// 新增根文件夹 electronapi
const newFilePathRoot = () => {
  electronAPI.newFilePath(inputPath.value);
  newFilePath.value = false;
};
// 新增子文件夹 electronapi
const newFilePathChild = () => {
  electronAPI.newFilePath(chosePath.value + "/" + inputPath.value);
  newFileCPath.value = false;
};
// 删除文件夹弹框
const delFilePathModal = (pathname) => {
  chosePath.value = pathname;
  delFilePath.value = true;
};
// 确认删除文件夹
const sureDelPath = () => {
  electronAPI.delFilePath(chosePath.value + "/" + inputPath.value);
  delFilePath.value = false;
};
// 确认删除文件
// 新增md记录文件 electronapi
const newFileMd = (pathname) => {
  electronAPI.newMdFile(chosePath.value + "/" + inputPath.value + ".md");
  newFileMdPath.value = false;
};

/* end */
const onContextMenuClick = (treeKey, menuKey) => {
  console.log(`treeKey: ${treeKey}, menuKey: ${menuKey}`);
};

/* Md操作 */
const editState = ref(1); // 1是预览状态，2是编辑状态
const goToEdit = () => {
  if (curFileInfo.value.type == "file") {
    editState.value = 2;
  }
};
let saveMd = null;
onMounted(() => {
  saveMd = () => {
    electronAPI.saveMdFile(curFileInfo.value.path, mdEditRef.value.mdContent);
    console.log(mdEditRef.value.mdContent);
  };
});

/* end */
</script>

<template>
  <div class="noteEditbox">
    <div class="meun">
      <div class="treeHead">
        <p>笔记树</p>
        <div class="headicon">
          <p @click="showNewFilePathModal(null)">新建</p>
          <p @click="closem">关闭</p>
        </div>
      </div>
      <div v-show="showTreeNode">
        <a-tree class="treebox" :tree-data="treeData">
          <template #title="{ name, key, type, path }">
            <a-dropdown :trigger="['contextmenu']">
              <span @click="choseCurPath(name, type, path)">{{ name }}</span>
              <template #overlay>
                <a-menu
                  @click="
                    ({ key: menuKey }) => onContextMenuClick(treeKey, menuKey)
                  "
                  v-if="type == 'directory'"
                >
                  <a-menu-item key="1" @click="showNewCFilePathModal(path)"
                    >新建文件夹</a-menu-item
                  >
                  <a-menu-item key="2" @click="showNewFileMdPathModal(path)"
                    >新建md记录</a-menu-item
                  >
                  <a-menu-item key="3" @click="delFilePathModal(path)"
                    >删除</a-menu-item
                  >
                </a-menu>

                <a-menu
                  @click="
                    ({ key: menuKey }) => onContextMenuClick(treeKey, menuKey)
                  "
                  v-else
                >
                  <a-menu-item key="3" @click="delFilePathModal(path)"
                    >删除</a-menu-item
                  >
                </a-menu>
              </template>
            </a-dropdown>
          </template>
        </a-tree>
      </div>
    </div>

    <div class="edit">
      <div class="editTitle">
        {{ curFileInfo.name }}
      </div>
      <div class="editbox">
        <div class="editMeun">
          <p @click="goToEdit">编辑</p>
          <p @click="saveMd">保存</p>
        </div>
        <MdPreview v-if="editState == 1" :previewData="curMdata" />
        <mdEdit v-if="editState == 2" ref="mdEditRef" :mdData="curMdata" />
      </div>
    </div>
  </div>

  <!-- 新建根文件夹 -->
  <a-modal v-model:open="newFilePath" title="新建文件夹" @ok="newFilePathRoot">
    <p>输入文件夹名称</p>
    <input type="text" v-model="inputPath" />
  </a-modal>

  <!-- 新建子文件 -->
  <a-modal
    v-model:open="newFileCPath"
    title="新建子文件夹"
    @ok="newFilePathChild"
  >
    <p>输入子文件夹名称</p>
    <input type="text" v-model="inputPath" />
  </a-modal>

  <!-- 新建md文件 -->
  <a-modal v-model:open="newFileMdPath" title="新建md记录" @ok="newFileMd">
    <p>输入md文件名称</p>
    <input type="text" v-model="inputPath" />
  </a-modal>

  <!-- 删除文件夹 -->
  <a-modal v-model:open="delFilePath" title="删除文件夹" @ok="sureDelPath">
    <p>确认删除笔记文件夹？</p>
  </a-modal>

  <!-- 删除md文件 -->
  <a-modal v-model:open="delMdFile" title="删除md记录文件" @ok="sureDelPath">
    <p>确认删除md记录文件？</p>
  </a-modal>
</template>

<style lang="less" scoped>
.noteEditbox {
  display: flex;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  .meun {
    width: 30%;
    background: #ccc;
    transition: all ease-in-out 1s;
    white-space: nowrap;
    border-right: 1px solid #000;
    .treeHead {
      width: 100%;
      height: 40px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      border-bottom: 1px solid #000;
      .headicon {
        width: 40%;
        display: flex;
        box-sizing: border-box;
        justify-content: space-around;
        font-size: 12px;
        align-items: center;
        p {
          cursor: pointer;
        }
      }
    }
    // ::v-deep .treebox{
    //   display: none !important;
    // }
  }
  .edit {
    width: 100%;
    height: 100vh;
    background: #ccc;
    box-sizing: border-box;
    .editTitle {
      display: flex;
      box-sizing: border-box;
      align-items: center;
      justify-content: center;
      height: 40px;
    }
    .editbox {
      box-sizing: border-box;
      height: calc(100vh - 40px);
      .editMeun {
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        P {
          cursor: pointer;
          margin-left: 12px !important;
          font-size: 12px;
        }
      }
    }
  }
}

::v-deep .ant-tree-list-holder {
  background: #ccc;
}

.treebox {
}
</style>
