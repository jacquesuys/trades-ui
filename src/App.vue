<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <router-link to="/">
        <div class="logoType">Hartree<sup>&#174;</sup></div>
        <div class="appName">Letter of Credit Tracker</div>
      </router-link>
    </v-app-bar>

    <v-content>
      <v-container>
        <ul>
          <li><router-link to="/">Form</router-link></li>
          <li><router-link to="/drafts">Drafts</router-link></li>
        </ul>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  methods: {
    toggleTab(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style scoped>
.appName {
  font-family: "Times New Roman", Georgia, serif;
  color: #fff;
  font-size: 75%;
}

.logoType {
  font-size: 2.5em;
  line-height: 2rem;
  font-family: "Times New Roman", Georgia, serif;
  color: #fff;
}

.logoType sup {
  font-size: 35%;
}

ul {
  display: flex;
  list-style-type: none;
}

ul li a {
  text-decoration: none;
  height: 3rem;
  align-items: center;
  display: flex;
  flex: 0 1 auto;
  font-size: 0.875rem;
  font-weight: 500;
  justify-content: center;
  letter-spacing: 0.0892857143em;
  line-height: normal;
  min-width: 90px;
  max-width: 360px;
  outline: none;
  padding: 0 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: none;
  user-select: none;
  border-bottom: solid 2px transparent;
}
ul li a.router-link-exact-active {
  border-bottom: solid 2px #1867c0 !important;
}
</style>
