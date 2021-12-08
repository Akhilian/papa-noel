<template>
  <Card>
    <Title>{{ nom }}</Title>
    <slot />
  </Card>
</template>

<script lang="ts">
import Vue from 'vue'
import Card from '~/components/Molecules/Card.vue'
import Title from '~/components/Atoms/Title.vue'

export default Vue.extend({
  name: 'FamilyCard',
  components: { Title, Card },
  props: {
    nom: {
      type: String,
      required: true
    }
  }
})
</script>
