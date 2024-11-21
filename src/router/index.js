import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";

const routes = setupLayouts(generatedRoutes);
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
// 全局前置守衛
router.beforeEach((to, from, next) => {
  // 滾動到頁面頂部
  window.scrollTo(0, 0);
  next();
});

export default router
