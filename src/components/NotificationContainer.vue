<template>
  <div class="notification-container">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import NotificationBar from "@/components/NotificationBar.vue";
import { mapState } from "vuex";

export default {
  name: "NotificationContainer",
  computed: mapState("notification", ["notifications"]),
  components: {
    NotificationBar
  }
};
</script>

<style scoped>
.notification-container {
  position: fixed;
  width: 100%;
  z-index: 10000;
  bottom: 0;
  right: 0;
  padding-right: 40px;
}
</style>
