<template>
  <q-page padding>
    <div class="text-center q-mb-md">
      <h1 class="text-h3">Cadastro de Contratos</h1>
    </div>
    <div class="row items-center q-gutter-md">
      <q-btn @click="openDialog" label="Adicionar Contrato" color="primary" />
      <q-input v-model="search" placeholder="Buscar Contrato" clearable @input="filterContratos" />
    </div>
    <q-table
      :rows="filteredContratos"
      :columns="columns"
      row-key="id"
      flat
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn @click="editContrato(props.row)" flat icon="edit" color="primary" />
          <q-btn @click="deleteContrato(props.row.id)" flat icon="delete" color="negative" />
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="dialog" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ isEdit ? 'Editar Contrato' : 'Adicionar Contrato' }}</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="contrato.nome" label="Nome" />
          <q-input v-model="contrato.processo" label="Processo" />
          <q-input v-model="contrato.valorCausa" label="Valor da Causa" type="number" />
          <q-input v-model="contrato.honorarios" label="Honorários" type="number" />
          <q-input v-model="contrato.advogado" label="Advogado Responsável" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Salvar" @click="saveContrato" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      isEdit: false,
      search: '',
      contrato: {
        id: null,
        nome: '',
        processo: '',
        valorCausa: '',
        honorarios: '',
        advogado: '',
      },
      contratos: [
        {
          id: 1, nome: 'CORRIERI ALIMENTOS LTDA.', processo: '5002267-75.2019.4.04.7102', valorCausa: '200.000,00', honorarios: '40.000,00', advogado: 'Icaro Silva Pedroso',
        },
        {
          id: 2, nome: 'MOINHOS POPULAR S/A', processo: '5012357-85.2018.4.04.7100', valorCausa: '250.000,00', honorarios: '50.000,00', advogado: 'Joao Andre Bitencourt',
        },
        {
          id: 3, nome: 'CARBONÍFERA CATARINENSE LTDA.', processo: '5002213-31.2018.4.04.7204', valorCausa: '150.000,00', honorarios: '30.000,00', advogado: 'Pedro Schumacher',
        },
      ],
      filteredContratos: [],
      columns: [
        {
          name: 'nome', label: 'Nome', field: 'nome', align: 'left',
        },
        {
          name: 'processo', label: 'Processo', field: 'processo', align: 'left',
        },
        {
          name: 'valorCausa', label: 'Valor da Causa', field: 'valorCausa', align: 'left',
        },
        {
          name: 'honorarios', label: 'Honorários', field: 'honorarios', align: 'left',
        },
        {
          name: 'advogado', label: 'Advogado Responsável', field: 'advogado', align: 'left',
        },
        { name: 'actions', label: 'Ações', align: 'right' },
      ],
    };
  },
  mounted() {
    this.filteredContratos = this.contratos;
  },
  watch: {
    search() {
      this.filterContratos();
    },
  },
  methods: {
    openDialog() {
      this.isEdit = false;
      this.contrato = {
        id: null, nome: '', processo: '', valorCausa: '', honorarios: '', advogado: '',
      };
      this.dialog = true;
    },
    editContrato(contrato) {
      this.isEdit = true;
      this.contrato = { ...contrato };
      this.dialog = true;
    },
    saveContrato() {
      if (this.isEdit) {
        const index = this.contratos.findIndex((c) => c.id === this.contrato.id);
        if (index !== -1) {
          this.contratos.splice(index, 1, this.contrato);
        }
      } else {
        this.contrato.id = this.contratos.length + 1;
        this.contratos.push(this.contrato);
      }
      this.dialog = false;
      this.filterContratos();
    },
    deleteContrato(id) {
      this.contratos = this.contratos.filter((c) => c.id !== id);
      this.filterContratos();
    },
    filterContratos() {
      const searchLower = this.search.toLowerCase();
      this.filteredContratos = this.contratos.filter((contrato) => (
        contrato.nome.toLowerCase().includes(searchLower)
          || contrato.processo.toLowerCase().includes(searchLower)
          || contrato.valorCausa.includes(searchLower)
          || contrato.honorarios.includes(searchLower)
          || contrato.advogado.toLowerCase().includes(searchLower)
      ));
    },
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
.text-h3 {
  font-size: 2.25rem;
  font-weight: bold;
}
.q-mb-md {
  margin-bottom: 1rem;
}
</style>
