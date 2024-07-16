<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <transition name="router-link-fade">
            <q-btn
              flat
              label="Home"
              class="q-btn-item non-selectable no-outline"
              @click="navigateTo('/')"
              :class="{'animated-click': clickedHome}"
            />
          </transition>
          <q-btn
            flat
            label="PROCESSOS"
            class="q-btn-item non-selectable no-outline"
            @click="navigateTo('/processos')"
            :class="{'animated-click': clickedProcessos}"
          />
          <q-btn
            flat
            label="CLIENTES"
            class="q-btn-item non-selectable no-outline"
            @click="navigateTo('/clientes')"
            :class="{'animated-click': clickedClientes}"
          />
          <q-btn
            flat
            label="CONTRATOS"
            class="q-btn-item non-selectable no-outline"
            @click="navigateTo('/contratos')"
            :class="{'animated-click': clickedContratos}"
          />
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
  data() {
    return {
      clickedHome: false,
      clickedProcessos: false,
      clickedClientes: false,
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
      this.applyAnimation(route);
    },
    applyAnimation(route) {
      if (route === '/' && !this.clickedHome) {
        this.clickedHome = true;
        setTimeout(() => {
          this.clickedHome = false;
        }, 500); // Ajuste o tempo conforme necessário
      } else if (route === '/processos' && !this.clickedProcessos) {
        this.clickedProcessos = true;
        setTimeout(() => {
          this.clickedProcessos = false;
        }, 500); // Ajuste o tempo conforme necessário
      } else if (route === '/clientes' && !this.clickedClientes) {
        this.clickedClientes = true;
        setTimeout(() => {
          this.clickedClientes = false;
        }, 500); // Ajuste o tempo conforme necessário
      }
    },
  },
};
</script>

<style scoped>
.q-btn-item {
  border: 1px solid rgba(0, 0, 0, 0.1); /* Leve borda */
}
.animated-click {
  transition: background-color 0.2s, border-color 0.2s;
  background-color: rgba(255, 255, 255, 0.5);
  border-color: rgba(0, 0, 0, 0.3); /* Leve borda mais destacada */
}
</style>
