<template>
  <div class="q-pa-md" style="max-width: 800px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <!-- Informações Pessoais -->
      <q-input
        filled
        v-model="name"
        label="Nome Completo *"
        hint="Nome e sobrenome"
        lazy-rules
        :rules="[val => val && val.length > 0 || 'Por favor, digite seu nome']"
      />

      <q-input
        filled
        v-model="birthDate"
        label="Data de Nascimento *"
        type="date"
        lazy-rules
        :rules="[val => val && val.length > 0 || 'Por favor, digite sua data de nascimento']"
      />

      <q-input
        filled
        v-model="birthLocation"
        label="Local de Nascimento *"
        hint="Cidade e Estado"
        lazy-rules
        :rules="[val => val && val.length > 0 || 'Por favor, digite seu local de nascimento']"
      />

      <!-- Tabela de Planetas -->
      <q-table
        :rows="planetas"
        :columns="planetaColumns"
        :rows-per-page-options="[10, 25, 50]"
        row-key="nome"
        class="q-mb-md"
      >
        <template v-slot:body-cell-signo="props">
          <q-td :props="props">
            <q-select
              v-model="props.row.signo"
              :options="signos"
              label="Signo"
              dense
              emit-value
              map-options
              color="primary"
              hide-dropdown-icon
              class="full-width"
            />
          </q-td>
        </template>

        <template v-slot:body-cell-grau="props">
          <q-td :props="props">
            <q-input
              v-model="props.row.grau"
              type="number"
              label="Grau"
              dense
              color="secondary"
              class="full-width"
              :min="1"
              :max="30"
            />
          </q-td>
        </template>
      </q-table>

      <!-- Tabela de Sephirot com Resultados de Anjos e Demônios -->
      <q-table
        :rows="resultados"
        :columns="colunas"
        :rows-per-page-options="[10, 25, 50]"
        row-key="sephirot"
        class="q-mb-md"
      >
        <template v-slot:body-cell-vida="props">
          <q-td :props="props">
            <q-chip
              v-if="props.row.vida"
              label="Anjo: {{ props.row.vida }}"
              color="green"
              text-color="white"
              dense
              class="full-width"
            />
          </q-td>
        </template>
        <template v-slot:body-cell-morte="props">
          <q-td :props="props">
            <q-chip
              v-if="props.row.morte"
              label="Daemon: {{ props.row.morte }}"
              color="red"
              text-color="white"
              dense
              class="full-width"
            />
          </q-td>
        </template>
      </q-table>

      <!-- Botão para Submeter o Formulário -->
      <div class="q-mt-md text-center">
        <q-btn label="Calcular" color="primary" type="submit" size="lg" class="q-pa-md" />
        <q-btn label="Resetar" type="reset" color="secondary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // Dados Pessoais
      name: '',
      birthDate: '',
      birthLocation: '',

      // Tabelas de Planetas
      planetas: [
        { nome: 'Sol', signo: '', grau: null },
        { nome: 'Lua', signo: '', grau: null },
        { nome: 'Mercúrio', signo: '', grau: null },
        { nome: 'Vênus', signo: '', grau: null },
        { nome: 'Marte', signo: '', grau: null },
        { nome: 'Júpiter', signo: '', grau: null },
        { nome: 'Saturno', signo: '', grau: null },
        { nome: 'Urano', signo: '', grau: null },
        { nome: 'Netuno', signo: '', grau: null },
        { nome: 'Plutão', signo: '', grau: null },
        { nome: 'Ascendente', signo: '', grau: null }
      ],
      planetaColumns: [
        { name: 'nome', label: 'Planeta', align: 'left', field: 'nome' },
        { name: 'signo', label: 'Signo', align: 'center', field: 'signo' },
        { name: 'grau', label: 'Grau', align: 'center', field: 'grau' }
      ],

      // Resultados
      resultados: [],
      colunas: [
        { name: 'sephirot', label: 'Sephirot', align: 'left', field: 'sephirot' },
        { name: 'vida', label: 'Vida (Anjos)', align: 'center', field: 'vida' },
        { name: 'morte', label: 'Morte (Daemônios)', align: 'center', field: 'morte' }
      ],

      // Signos do Zodíaco
      signos: [
        { label: 'Áries', value: 'Áries' },
        { label: 'Touro', value: 'Touro' },
        { label: 'Gêmeos', value: 'Gêmeos' },
        { label: 'Câncer', value: 'Câncer' },
        { label: 'Leão', value: 'Leão' },
        { label: 'Virgem', value: 'Virgem' },
        { label: 'Libra', value: 'Libra' },
        { label: 'Escorpião', value: 'Escorpião' },
        { label: 'Sagitário', value: 'Sagitário' },
        { label: 'Capricórnio', value: 'Capricórnio' },
        { label: 'Aquário', value: 'Aquário' },
        { label: 'Peixes', value: 'Peixes' }
      ]
    }
  },
  methods: {
    onSubmit () {
      this.resultados = this.calcularResultados()
    },

    onReset () {
      this.resultados = []
      this.planetas.forEach(planet => {
        planet.signo = ''
        planet.grau = null
      })
    },

    calcularResultados () {
      const resultados = []
      const sephirots = [
        'Kether', 'Chockmah', 'Binah', 'Daath', 'Chesed', 'Geburah', 'Tiphereth', 'Netzach', 'Hod', 'Yesod', 'Malkuth'
      ]

      this.planetas.forEach((planet, index) => {
        if (planet.signo && planet.grau) {
          // Calcular o anjo e o daemon para o signo e grau
          const vida = this.obterAnjo(planet.signo, planet.grau)
          const morte = this.obterDaemon(planet.signo, planet.grau)
          resultados.push({
            sephirot: sephirots[index],
            vida,
            morte
          })
        }
      })
      return resultados
    },

    obterAnjo (signo, grau) {
      // Lógica para determinar o anjo com base no signo e grau
      const anjos = {
        Áries: ['Vehuiah', 'Jeliel', 'Sitael', 'Elemiah', 'Mahasiah'],
        Touro: ['Lelahel', 'Achaiah', 'Cahetel', 'Haziel', 'Aladiah'],
        Gêmeos: ['Lauvuel', 'Hahaiah', 'Ieazel', 'Mebahel', 'Hariel'],
        Câncer: ['Hakamiah', 'Lauviah', 'Caliel', 'Leuviah', 'Pahaliah'],
        Leão: ['Nelchael', 'Ieiael', 'Melahel', 'Hahuiah', 'Nith-Haiah'],
        Virgem: ['Haaiah', 'Ierathel', 'Seheiah', 'Reiyel', 'Omael'],
        Libra: ['Lecabel', 'Vasariah', 'Yehuiah', 'Lehahiah', 'Chavakiah'],
        Escorpião: ['Menadel', 'Aniel', 'Haamiah', 'Rehael', 'Ieiazel'],
        Sagitário: ['Hahahel', 'Mikael', 'Veuliah', 'Yelahiah', 'Sealiah'],
        Capricórnio: ['Ariel', 'Asaliah', 'Mihael', 'Vehuel', 'Daniel'],
        Aquário: ['Hahasiah', 'Imamiah', 'Nanael', 'Nithael', 'Mebaiah'],
        Peixes: ['Poiel', 'Nemamiah', 'Ieialel', 'Harahel', 'Mitzrael']
        // Adicione os outros signos com os respectivos anjos
      }
      return anjos[signo] ? anjos[signo][(grau - 1) % 3] : 'Anjo Desconhecido'
    },

    obterDaemon (signo, grau) {
      // Lógica para determinar o daemon com base no signo e grau
      const daemons = {
        Áries: ['Bael', 'Agares', 'Paimon', 'Marbas', 'Valefor'],
        Touro: ['Amon', 'Barbatos', 'Buer', 'Astaroth', 'Bifrons'],
        Gêmeos: ['Gusion', 'Sitri', 'Beleth', 'Leraje', 'Eligos'],
        Câncer: ['Zepar', 'Botis', 'Bathin', 'Sallos', 'Purson'],
        Leão: ['Marax', 'Ipos', 'Aim', 'Naberius', 'Glasya-Labolas'],
        Virgem: ['Bune', 'Ronove', 'Berith', 'Astaroth', 'Forneus'],
        Libra: ['Foras', 'Asmoday', 'Gaap', 'Furfur', 'Marchosias'],
        Escorpião: ['Stolas', 'Phenex', 'Halphas', 'Malphas', 'Raum'],
        Sagitário: ['Focalor', 'Vepar', 'Sabnock', 'Shax', 'Vine'],
        Capricórnio: ['Bifrons', 'Vual', 'Haagenti', 'Crocell', 'Furcas'],
        Aquário: ['Balam', 'Alloces', 'Caim', 'Murmur', 'Orobas'],
        Peixes: ['Gremory', 'Ose', 'Amy', 'Oriax', 'Andras']
        // Adicione os outros signos com os respectivos demônios
      }
      return daemons[signo] ? daemons[signo][(grau - 1) % 3] : 'Daemon Desconhecido'
    }
  }
}
</script>

<style scoped>
.q-table {
  margin-top: 20px;
}
</style>
