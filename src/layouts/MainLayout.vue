<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-light-green-8">
      <q-toolbar>

        <q-toolbar-title>
          Minhas reservas
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  components: {
  },
  data() {
    return {
    };
  },
};
</script>
