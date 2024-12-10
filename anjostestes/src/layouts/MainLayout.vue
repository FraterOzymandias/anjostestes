<template>
  <q-layout view="lHh Lpr lff">
    <!-- Cabeçalho -->
    <q-header elevated class="bg-cyan-8">
      <q-toolbar>
        <q-toolbar-title>Astro App</q-toolbar-title>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
      </q-toolbar>
    </q-header>

    <!-- Menu lateral -->
    <q-drawer v-model="drawer" show-if-above :width="300">
      <q-list>
        <q-item clickable v-ripple to="/inserir-dados">
          <q-item-section avatar>
            <q-icon name="add" />
          </q-item-section>
          <q-item-section>
            Inserir Dados
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/configuracoes">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
            Configurações
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Conteúdo da página -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      drawer: ref(false)
    }
  }
}
</script>
