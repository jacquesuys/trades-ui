<template>
  <div>
    <v-snackbar v-if="snackbarType" v-model="snackbar">
      Testing
      <v-btn color="pink" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "Snackbar",
  props: {
    snackbarType: String
  },
  data: () => ({
    snackbar: true
  }),
  mounted() {
    console.log(this.snackbarType);
    setTimeout(() => (this.snackbar = false), 5000);
  }
};
</script>

<style lang="scss" scoped></style>
