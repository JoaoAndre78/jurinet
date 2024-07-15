<template>
  <q-page padding>
    <div class="text-center q-mb-md">
      <h1 class="text-h3">Cadastro de Clientes</h1>
    </div>
    <div class="row items-center q-gutter-md">
      <q-btn @click="openDialog" label="Adicionar Cliente" color="primary" />
      <q-input v-model="search" placeholder="Buscar Cliente..." clearable @input="filterClientes" />
    </div>
    <q-table
      :rows="filteredClientes"
      :columns="columns"
      row-key="id"
      flat
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn @click="editCliente(props.row)" flat icon="edit" color="primary" />
          <q-btn @click="deleteCliente(props.row.id)" flat icon="delete" color="negative" />
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="dialog" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ isEdit ? 'Editar Cliente' : 'Adicionar Cliente' }}</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="cliente.nome" label="Nome" />
          <q-input v-model="cliente.email" label="Email" />
          <q-input v-model="cliente.telefone" label="Telefone" mask="(##)#####-####"/>
          <q-input v-model="cliente.endereco" label="Endereço" />
          <q-input v-model="cliente.cep" label="CEP" mask="#####-###" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Salvar" @click="saveCliente" />
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
      cliente: {
        id: null,
        nome: '',
        email: '',
        telefone: '',
        endereco: '',
        cep: '',
      },
      clientes: [
        {
          id: 1, nome: 'CORRIERI ALIMENTOS LTDA.', email: 'joao.silva@corrieri.com.br', telefone: '(51)98131-4583', endereco: 'Rua A, 123', cep: '90440-003',
        },
        {
          id: 2, nome: 'MOINHOS POPULAR S/A', email: 'maria.oliveira@mpopular.com.br', telefone: '(51)33378-6200', endereco: 'Avenida B, 456', cep: '90445-001',
        },
        {
          id: 2, nome: 'CARBONÍFERA CATARINENSE LTDA.', email: 'andre@cccl.com.br', telefone: '(51)33399-6577', endereco: 'Avenida C, 9956', cep: '91489-002',
        },
      ],
      filteredClientes: [],
      columns: [
        {
          name: 'nome', label: 'Nome', field: 'nome', align: 'left',
        },
        {
          name: 'email', label: 'Email', field: 'email', align: 'left',
        },
        {
          name: 'telefone', label: 'Telefone', field: 'telefone', align: 'left',
        },
        {
          name: 'endereco', label: 'Endereço', field: 'endereco', align: 'left',
        },
        {
          name: 'cep', label: 'CEP', field: 'cep', align: 'left',
        },
        { name: 'actions', label: 'Ações', align: 'right' },
      ],
    };
  },
  mounted() {
    this.filteredClientes = this.clientes;
  },
  watch: {
    search() {
      this.filterClientes();
    },
  },
  methods: {
    openDialog() {
      this.isEdit = false;
      this.cliente = {
        id: null, nome: '', email: '', telefone: '', endereco: '', cep: '',
      };
      this.dialog = true;
    },
    editCliente(cliente) {
      this.isEdit = true;
      this.cliente = { ...cliente };
      this.dialog = true;
    },
    saveCliente() {
      if (this.isEdit) {
        const index = this.clientes.findIndex((c) => c.id === this.cliente.id);
        if (index !== -1) {
          this.clientes.splice(index, 1, this.cliente);
        }
      } else {
        this.cliente.id = this.clientes.length + 1;
        this.clientes.push(this.cliente);
      }
      this.dialog = false;
      this.filterClientes();
    },
    deleteCliente(id) {
      this.clientes = this.clientes.filter((c) => c.id !== id);
      this.filterClientes();
    },
    filterClientes() {
      const searchLower = this.search.toLowerCase();
      this.filteredClientes = this.clientes.filter((cliente) => (
        cliente.nome.toLowerCase().includes(searchLower)
          || cliente.email.toLowerCase().includes(searchLower)
          || cliente.telefone.includes(searchLower)
          || cliente.endereco.toLowerCase().includes(searchLower)
          || cliente.cep.includes(searchLower)
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
