<template>
  <div>
    <div
      class="
        relative
        flex
        items-top
        justify-center
        min-h-screen
        items-center
        bg-christmas bg-cover bg-center
        text-gray-600
      "
    >
      <div
        class="
          flex-1
          bg-gray-50
          p-4
          rounded-md
          shadow-lg
          max-w-screen-md
          space-y-4
        "
      >
        <Title> Administration </Title>
        <div>
          <p><strong>Nombre d'inscrits :</strong> 8</p>
          <p><strong>Statut du tirage au sort :</strong> En attente</p>
        </div>
        <div class="text-right">
          <Bouton>Lancer le tirage au sort</Bouton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PageAccueil'
})
</script>
