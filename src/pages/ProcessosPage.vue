<template>
  <q-page padding>
    <!-- Menu superior com "Processos" -->
    <div class="text-center q-mb-md">
      <h1 class="text-h3">Processos</h1>
    </div>
    <!-- Seção de busca e botão -->
    <div class="row items-center q-gutter-md">
      <q-btn @click="openDialog" label="Adicionar Processo" color="primary" />
      <q-input v-model="search" placeholder="Buscar Proc..." clearable @input="filterProcessos" />
    </div>
    <!-- Tabela de processos -->
    <q-table
      :rows="filteredProcessos"
      :columns="columns"
      row-key="id"
      flat
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn @click="editProcesso(props.row)" flat icon="edit" color="primary" />
          <q-btn @click="deleteProcesso(props.row.id)" flat icon="delete" color="negative" />
        </q-td>
      </template>
    </q-table>
    <!-- Diálogo para adicionar ou editar processos -->
    <q-dialog v-model="dialog" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ isEdit ? 'Editar Processo' : 'Adicionar Processo' }}</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="processo.numero" label="Número do Processo" />
          <q-input v-model="processo.nome" label="Cliente" />
          <q-input v-model="processo.dataDistribuicao" label="Data de Distribuição" />
          <q-input v-model="processo.tipoAcao" label="Tipo de Ação" />
          <q-input v-model="processo.parteContraria" label="Parte Contrária" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Salvar" @click="saveProcesso" />
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
      processo: {
        id: null,
        numero: '',
        nome: '',
        dataDistribuicao: '',
        tipoAcao: '',
        parteContraria: '',
      },
      processos: [
        {
          id: 1,
          numero: '5002267-75.2019.4.04.7102',
          nome: 'CORRIERI ALIMENTOS LTDA.',
          dataDistribuicao: '01/07/2023',
          tipoAcao: 'Mandado de Segurança',
          parteContraria: 'Fazenda Nacional',
        },
        {
          id: 2,
          numero: '5012357-85.2018.4.04.7100',
          nome: 'MOINHOS POPULAR S/A',
          dataDistribuicao: '02/07/2000',
          tipoAcao: 'Execução de Sentença',
          parteContraria: 'Fazenda Nacional',
        },
        {
          id: 3,
          numero: '5002213-31.2018.4.04.7204',
          nome: 'CARBONÍFERA CATARINENSE LTDA.',
          dataDistribuicao: '05/11/2015',
          tipoAcao: 'Medida Cautelar Fiscal',
          parteContraria: 'Fazenda Nacional',
        },
      ],
      filteredProcessos: [],
      columns: [
        {
          name: 'numero', label: 'Processo', field: 'numero', align: 'left',
        },
        {
          name: 'nome', label: 'Cliente', field: 'nome', align: 'left',
        },
        {
          name: 'dataDistribuicao', label: 'Data de Distribuição', field: 'dataDistribuicao', align: 'left',
        },
        {
          name: 'tipoAcao', label: 'Tipo de Ação', field: 'tipoAcao', align: 'left',
        },
        {
          name: 'parteContraria', label: 'Parte Contrária', field: 'parteContraria', align: 'left',
        },
        { name: 'actions', label: 'Ações', align: 'right' },
      ],
    };
  },
  mounted() {
    this.filteredProcessos = this.processos.map((processo) => ({
      ...processo,
      dataDistribuicao: this.formatDateForDisplay(processo.dataDistribuicao),
    }));
  },
  watch: {
    search() {
      this.filterProcessos();
    },
  },
  methods: {
    openDialog() {
      this.isEdit = false;
      this.processo = {
        id: null, numero: '', nome: '', dataDistribuicao: '', tipoAcao: '', parteContraria: '',
      };
      this.dialog = true;
    },
    editProcesso(processo) {
      this.isEdit = true;
      this.processo = {
        ...processo,
        dataDistribuicao: this.formatDateForInput(processo.dataDistribuicao),
      };
      this.dialog = true;
    },
    saveProcesso() {
      // Verificar se a data está no formato correto antes de salvar
      if (this.processo.dataDistribuicao) {
        this.processo.dataDistribuicao = this.formatDateForSaving(this.processo.dataDistribuicao);
      }

      if (this.isEdit) {
        const index = this.processos.findIndex((p) => p.id === this.processo.id);
        if (index !== -1) {
          this.processos.splice(index, 1, {
            ...this.processo,
            dataDistribuicao: this.formatDateForDisplay(this.processo.dataDistribuicao),
          });
        }
      } else {
        this.processo.id = this.processos.length + 1;
        this.processos.push({
          ...this.processo,
          dataDistribuicao: this.formatDateForDisplay(this.processo.dataDistribuicao),
        });
      }
      this.dialog = false;
      this.filterProcessos();
    },
    deleteProcesso(id) {
      this.processos = this.processos.filter((p) => p.id !== id);
      this.filterProcessos();
    },
    filterProcessos() {
      const searchLower = this.search.toLowerCase();
      this.filteredProcessos = this.processos.filter((processo) => (
        processo.numero.toLowerCase().includes(searchLower)
          || processo.nome.toLowerCase().includes(searchLower)
          || processo.dataDistribuicao.includes(searchLower)
          || processo.tipoAcao.toLowerCase().includes(searchLower)
          || processo.parteContraria.toLowerCase().includes(searchLower)
      ));
    },
    formatDateForSaving(date) {
      // Converte dd/mm/yyyy para yyyy-mm-dd
      const [day, month, year] = date.split('/');
      return `${year}-${month}-${day}`;
    },
    formatDateForDisplay(date) {
      // Verifica se a data está no formato correto antes de formatar
      if (!date) return '';
      const [year, month, day] = date.split('-');
      if (year && month && day) {
        return `${day}/${month}/${year}`;
      }
      return date; // Retorna o valor original se a data não estiver no formato esperado
    },
    formatDateForInput(date) {
      // Verifica se a data está no formato correto antes de formatar
      if (!date) return '';
      const [year, month, day] = date.split('-');
      if (year && month && day) {
        return `${day}/${month}/${year}`;
      }
      return date; // Retorna o valor original se a data não estiver no formato esperado
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
