<script setup>
import { storeToRefs } from "pinia";
import { useAPIStore } from "@/stores/API.js";
import { useMessage, NForm, NFormItem, NInput, NButton, NDataTable, NRow, NCol } from 'naive-ui';


const APIStore = useAPIStore();

const { msg } = storeToRefs(APIStore);
const { postLogin } = useAPIStore()
// 定義表單引用
const formRef = ref(null);
const rPasswordFormItemRef = ref(null);
const message = useMessage();

// 表單模型
const model = ref({
  email: null,
  password: null,
});

// 驗證函數
const validatePasswordStartWith = (rule, value) => {
  return (
    !!model.value.password &&
    model.value.password.startsWith(value) &&
    model.value.password.length >= value.length
  );
}

const validatePasswordSame = (rule, value) => {
  return value === model.value.password;
}

const validateEmail = (rule, value) => {
  // 定義正則表達式，用來檢查有效的 Email 格式
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // 使用正則表達式測試 email 是否符合格式
  if (regex.test(value)) {
    return true;  // 格式正確
  } else {
    return false; // 格式錯誤
  }
}
// 驗證規則
const rules = {
  email: [
    {
      required: true,
      message: "Email is required",
      trigger: ["input", "blur"]
    },
    {
      validator: validateEmail,
      message: "Invalid email format.",
      trigger: "input"
    },
  ],
  password: [
    {
      required: true,
      message: "Password is required",
      trigger: ["input", "blur"]
    }
  ],

};

// 處理密碼輸入事件
function handlePasswordInput() {
  if (model.value.reenteredPassword) {
    rPasswordFormItemRef.value?.validate({ trigger: "password-input" });
  }
}

const postData = async (sendData) => {
  const res = await postLogin(sendData)
  if (res.status == '200') {
    message.success(`${msg.value}`);
    clearAll();
  } else {
    message.error(`${msg.value}`);
  }

}
const clearAll = () => {
  model.value.email = null
  model.value.password = null
}
// 驗證按鈕點擊事件
const handleValidateButtonClick = (e) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      const sendData = {
        email: model.value.email,
        password: model.value.password,
      };
      postData(sendData)

    } else {
      console.log(errors);
      message.error("fail");
    }
  });
}
</script>

<template>


  <div class="form-container">
    <h1 style="margin-bottom: 20px;">Login</h1>
    <n-form
      style="width: 70%;"
      ref="formRef"
      :model="model"
      :rules="rules"
    >
      <n-form-item
        path="email"
        label="Email"
      >
        <n-input
          v-model:value="model.email"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item
        path="password"
        label="password"
      >
        <n-input
          v-model:value="model.password"
          type="password"
          @input="handlePasswordInput"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <div style="display: flex; justify-content: flex-end">
            <n-button
              type="primary"
              @click="handleValidateButtonClick"
            >
              login
            </n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>


  </div>
</template>

<style scoped>
.form-container {
  flex-direction: column;

  display: flex;
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  height: 100vh;
  /* 設置高度為 100vh，確保能填滿螢幕 */
}
</style>
