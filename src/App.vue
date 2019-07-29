<template>
  <v-app>
    <v-toolbar dark color="primary" app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">V-Uploads</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat href="https://github.com/sopherapps/v-upload" target="_blank">
        <span class="mr-2">Github</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <Home />
    </v-content>
  </v-app>
</template>

<script>
import Home from "./views/Home";

export default {
  name: "App",
  components: {
    Home
  }
};
</script>
