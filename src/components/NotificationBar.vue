<template>
  <v-snackbar
    v-model="snackbar"
    :color="notification.type"
    bottom
    centered
    absolute 
  >
    {{ notification.message }}
    <template v-slot:action="{ attrs }">
      <v-btn
        color="white"
        text
        v-bind="attrs"
        @click="remove(notification)"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "NotificationBar",
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    timeout: null,
    snackbar: true,
  }),
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 5000);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  methods: mapActions("notification", ["remove"])
};
</script>