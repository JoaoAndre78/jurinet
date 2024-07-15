<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <router-link to="/" class="q-btn q-btn-item non-selectable no-outline">
            Home
          </router-link>
          <router-link to="/processos" class="q-btn q-btn-item non-selectable no-outline">
            PROCESSOS
          </router-link>
          <router-link to="/clientes" class="q-btn q-btn-item non-selectable no-outline">
            CLIENTES
          </router-link>
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
};
</script>
