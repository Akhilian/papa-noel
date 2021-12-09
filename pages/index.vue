<template>
  <div>
    <div
      class="
        relative
        flex
        flex-col
        justify-center
        min-h-screen
        items-center
        bg-christmas bg-cover bg-center
        text-gray-600
        space-y-5
      "
    >
      <Card>
        <Title>{{ nom }}</Title>
      </Card>
      <FamilyCard v-for="famille in familles" :key="famille.nom" :nom="famille.nom">
        {{ famille }}
      </FamilyCard>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Title from '~/components/Atoms/Title.vue'
import Card from '~/components/Molecules/Card.vue'
import FamilyCard from '~/components/Organisms/FamilyCard.vue'

export default Vue.extend({
  name: 'PageAccueil',
  components: { FamilyCard, Card, Title },

  asyncData () {
    return {
      nom: '',
      familles: []
    }
  }
})
</script>
