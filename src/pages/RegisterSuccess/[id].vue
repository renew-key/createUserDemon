<script setup>
import { useMessage, NForm, NFormItem, NInput, NButton, NDataTable, NRow, NCol, NResult } from 'naive-ui';
import { useAPIStore } from "@/stores/API.js";
import { useRouter } from 'vue-router';
const { PostVailadeAccount } = useAPIStore()
const message = useMessage();
const route = useRoute();
const router = useRouter();
const login = () => {
  router.push('/login');
}
const postData = async () => {
  const res = await PostVailadeAccount(route.params.id)
}
onMounted(() => {
  console.log(route.params.id)
  if (route.params.id) {
    postData()
  }
})
</script>
<template>
  <div class="form-container">
    <n-result
      status="success"
      title="Register Success"
    >
      <template #footer>
        <n-button @click="login()">Go to Login</n-button>
      </template>
    </n-result>
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