<script setup>
import { ref } from 'vue';
import { useAPIStore } from "@/stores/API.js";
import { useMessage, NForm, NFormItem, NInput, NButton, NDataTable } from 'naive-ui';
const { postUser, getUser, editUser, deleteUser } = useAPIStore()
const idTmp = ref(-10)
const enterString = ref('Create')
// const isEdit = ref(false)
const formRef = ref(null);
const message = useMessage();
const formValue = ref({
  user: {
    name: '',
    age: ''
  },
  phone: ''
});
const rules = {
  user: {
    name: {
      required: true,
      message: 'Please input your name',
      trigger: 'blur'
    },
    age: {
      required: true,
      message: 'Please input your age',
      trigger: ['input', 'blur']
    }
  },
  phone: {
    required: true,
    message: 'Please input your number',
    trigger: ['input', 'blur']
  }
};
const ClearAll = () => {
  formValue.value.user.name = null
  formValue.value.user.age = null
  formValue.value.phone = null
}
const GetData = async () => {
  const responseData = await getUser();
  if (responseData.status == '200') {
    Object.assign(data, responseData.value);
  } else {
    message.error('Get user error!')
  }
}
const PostData = async (sendData) => {
  console.log(sendData)
  const res = await postUser(sendData)
  if (res.statue == '200') {
    GetData();
    ClearAll();
  } else {
    message.error('Post user error!')
  }
}

const EditData = async (id, sendDate) => {
  const res = await editUser(id, sendData)
  if (res.statue == '200') {
    GetData();
    ClearAll();
    enterString.value = 'Create'
    idTmp.value = -10
  } else {
    message.error('Edit user error!')
  }
}
const DeleteData = async (id) => {
  const res = await deleteUser(id)
  if (res.statue == '200') {
    GetData();
    ClearAll();
  } else {
    message.error('Delete user error!')
  }
}
const handleValidateClick = (e) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.success('Valid');
      const sendData = {
        name: formValue.value.user.name,
        age: formValue.value.user.age,
        phone: formValue.value.phone
      };
      if (idTmp.value != '-10') {
        EditData(idTmp.value, sendData)
      } else {
        PostData(sendData)
      }

    } else {
      console.log(errors);
      message.error('Invalid');
    }
  });
};




const data = reactive([]);

const Edit = (row) => {
  // isEdit.value = true
  formValue.value.user.name = row.name
  formValue.value.user.age = row.age
  formValue.value.phone = row.phone
  idTmp.value = row.Id
  enterString.value = 'Okay'
  // message.info(`Edit ${row.Name}`);
};

const Delete = (row) => {
  message.info(`Delete ${row.Name}`);
  DeleteData(row.Id)
};

const columns = [
  {
    title: "Id",
    key: "id"
  },
  {
    title: "Name",
    key: "name"
  },
  {
    title: "Age",
    key: "age"
  },
  {
    title: "Phone",
    key: "phone"
  },
  {
    title: "Edit",
    key: "Edit",
    render(row) {
      return h(
        NButton,
        {
          strong: true,
          type: "warning",
          size: "small",
          onClick: () => Edit(row)
        },
        { default: () => "Edit" }
      );
    }
  },
  {
    title: "Delete",
    key: "Delete",
    render(row) {
      return h(
        NButton,
        {
          strong: true,
          type: "error",
          size: "small",
          onClick: () => Delete(row)
        },
        { default: () => "Delete" }
      );
    }
  }
];

const pagination = false;
onMounted(() => {
  GetData();
})
</script>

<template>


  <div class="form-container">
    <div style="margin: 0 auto;">
      <n-form
        ref="formRef"
        inline
        :label-width="80"
        :model="formValue"
        :rules="rules"
        size="medium"
      >
        <n-form-item
          label="Name"
          path="user.name"
        >
          <n-input
            v-model:value="formValue.user.name"
            placeholder="Input Name"
          />
        </n-form-item>
        <n-form-item
          label="Age"
          path="user.age"
        >
          <n-input
            v-model:value="formValue.user.age"
            placeholder="Input Age"
          />
        </n-form-item>
        <n-form-item
          label="Phone"
          path="phone"
        >
          <n-input
            v-model:value="formValue.phone"
            placeholder="Phone Number"
          />
        </n-form-item>
        <n-form-item>
          <n-button
            @click="handleValidateClick"
            type="success"
          >
            {{ enterString }}
          </n-button>
        </n-form-item>
        <n-form-item>
          <n-button
            @click="ClearAll"
            strong
            secondary
            type="error"
          >
            Clear
          </n-button>
        </n-form-item>
      </n-form>

    </div>
    <n-data-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :bordered="false"
      :max-height="250"
    />
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  /* 確保內容垂直排列 */
  justify-content: center;
  /* 垂直置中 */
  align-items: center;
  /* 水平置中 */
  height: 100vh;
  /* 占滿視窗高度 */
  width: 100%;
  /* 確保容器寬度占滿整個視窗 */
  padding: 20px;
  box-sizing: border-box;
  /* 確保內邊距計算正確 */
}

n-form {
  width: 100%;
  max-width: 400px;
  /* 調整表單最大寬度 */
}
</style>
