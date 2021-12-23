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
      <div class="w-full">
        <div class="shadow-lg rounded-md m-auto w-screen-md max-w-screen-md">
          <FamilyCard
            v-for="famille in familles"
            :key="famille.nom"
            :nom="famille.nom"
            :participants="famille.participants"
          >
            {{ famille }}
          </FamilyCard>
          <div class="m-auto w-screen-md max-w-screen-md bg-gray-50 text-sm text-right rounded-b-lg p-2">
            <button class="hover:text-gray-600 text-gray-500 font-bold py-2 px-4">
              Cancel
            </button>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
              Invite
            </button>
          </div>
        </div>
      </div>
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
  components: {
    FamilyCard,
    Card,
    Title
  },

  async asyncData ({
    $axios,
    $config,
    params
  }) {
    try {
      const resultat = await $axios.$get($config.API_URL + `/session/${params.id}`)

      return {
        nom: resultat.data.nom,
        familles: resultat.data.familles
      }
    } catch (error) {
      return {
        nom: 'Error',
        familles: []
      }
    }
  }
})
</script>
