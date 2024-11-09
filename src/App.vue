<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Map Test Case</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Меню для навигации -->
      <v-btn text to="/about">About</v-btn>
      <v-btn text to="/map">Map</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
  //
</script>
