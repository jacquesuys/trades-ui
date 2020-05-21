<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.smAndDown"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <router-link to="/">
        <div class="logoType">Hartree<sup>&#174;</sup></div>
        <div class="appName">Trades App</div>
      </router-link>
      <nav v-if="$vuetify.breakpoint.mdAndUp">
        <v-btn text color="white" @click="navigateTo('/')">
          Dashboard
        </v-btn>
        <v-btn text color="white" @click="navigateTo('/form')">
          Form
        </v-btn>
        <v-btn text color="white" @click="navigateTo('/trades')">
          Trades
        </v-btn>
      </nav>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="text--accent-4">
          <v-list-item>
            <v-list-item-title @click="navigateTo('/')">
              Dashboard
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title @click="navigateTo('/form')">
              Form
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title @click="navigateTo('/trades')">
              Trades
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    drawer: false,
    group: null
  }),

  watch: {
    group() {
      this.drawer = false;
    }
  },
  methods: {
    navigateTo(path) {
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
}

aside a {
  text-decoration: none;
}

nav {
  flex: 1 1 auto !important;
  align-items: center;
  display: flex;
  justify-content: flex-end !important;
}

nav button {
  text-decoration: none;
  color: white;
}
</style>
