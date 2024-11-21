<script setup>
import {
  NBackTop,
  NNotificationProvider,
  NLoadingBarProvider,
  NConfigProvider,
  NDialogProvider,
  NModalProvider,
  zhTW,
  dateZhTW,
  NMessageProvider,
} from 'naive-ui';
</script>

<template>
  <n-config-provider
    :locale="null"
    :date-locale="null"
  >
    <n-notification-provider>
      <n-message-provider>
        <n-dialog-provider>
          <n-modal-provider>
            <n-loading-bar-provider>
              <router-view />
              <n-back-top
                :right="20"
                :bottom="10"
                class="zIndex"
              />
            </n-loading-bar-provider>
          </n-modal-provider>
        </n-dialog-provider>
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<style scoped>
.n-back-top {
  z-index: 2000;
}
</style>
