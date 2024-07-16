<template>
  <q-page class="q-pa-md">
    <!-- Logo e Título -->
    <div class="flex flex-center q-mb-md">
      <img
        alt="Jurinet Logo"
        src="https://cursosbyte.com.br/wp-content/webp-express/webp-images/uploads/2022/01/juridico.jpg.webp"
        style="width: 200px; height: 200px; border-radius: 50%;"
      >
      <div class="text-left q-ml-md">
        <h1 class="text-h3">JURINET</h1>
        <p class="text-subtitle">Sistema de Gestão Jurídica</p>
      </div>
    </div>

    <!-- Informações e Recursos -->
    <div class="q-gutter-md">

      <!-- Cards de Destaque -->
             <div class="row items-stretch justify-center q-mb-md">
        <q-card class="q-pa-md" style="max-width: 300px;">
          <q-card-section>
            <div class="text-h6 text-center">Clientes</div>
          </q-card-section>
          <q-card-section>
            <div class="text-center">
              <q-icon name="people" size="50px" color="primary" />
            </div>
            <div class="text-center q-mt-md">
              <h2 class="text-h5">{{ clientes.length }}</h2>
              <p class="text-caption">Clientes Cadastrados</p>
            </div>
          </q-card-section>
        </q-card>

        <q-card class="q-pa-md" style="max-width: 300px;">
          <q-card-section>
            <div class="text-h6 text-center">Processos</div>
          </q-card-section>
          <q-card-section>
            <div class="text-center">
              <q-icon name="assignment" size="50px" color="primary" />
            </div>
            <div class="text-center q-mt-md">
              <h2 class="text-h5">{{ processos.length }}</h2>
              <p class="text-caption">Processos Registrados</p>
            </div>
          </q-card-section>
        </q-card>
        <q-card class="q-pa-md" style="max-width: 300px;">
          <q-card-section>
            <div class="text-h6 text-center">Contratos</div>
          </q-card-section>
          <q-card-section>
            <div class="text-center">
              <q-icon name="folder" size="50px" color="primary" />
            </div>
            <div class="text-center q-mt-md">
              <h2 class="text-h5">{{ processos.length }}</h2>
              <p class="text-caption">Contratos Registrados</p>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Atalhos e Ações Rápidas -->
      <div class="row justify-center">
        <q-btn class="q-mr-md" @click="navigateTo('/clientes')"
        label="Ver Clientes" color="primary" />
        <q-btn class="q-mr-md" @click="navigateTo('/processos')"
         label="Ver Processos" color="primary" />
        <q-btn class="q-mr-md" @click="navigateTo('/contratos')"
         label="Ver Contratos" color="primary" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router';

defineProps({
  clientes: {
    type: Number,
    default: 0,
  },
  processos: {
    type: Number,
    default: 0,
  },
  contratos: {
    type: Number,
    default: 0,
  },
});

const router = useRouter();

function navigateTo(route) {
  router.push(route);
}
</script>

<style scoped>
.text-center {
  text-align: center;
}
.text-h3 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.text-subtitle {
  font-size: 1.25rem;
  color: #777;
  margin-top: 0;
  margin-bottom: 1.5rem;
}
.q-mb-md {
  margin-bottom: 1.5rem;
}
.q-ml-md {
  margin-left: 1.5rem;
}
.row {
  display: flex;
  flex-wrap: wrap;
}
.items-stretch {
  align-items: stretch;
}
.justify-center {
  justify-content: center;
}
.q-pa-md {
  padding: 1.5rem;
}
</style>
