<template>
  <div class="bg-white border-b">
    <div class="p-4" :class="{ 'border-l-4 border-green-500': !estMasque }">
      <Title class="cursor-pointer" @click.native="toggle">
        {{ nom }}
      </Title>
      <ul class="py-2" :class="{ hidden: estMasque }">
        <li
          v-for="participant in participants"
          :key="participant.telephone"
          class="flex justify-start p-1 text-gray-700"
        >
          <span class="bg-gray-400 h-2 w-2 m-2 rounded-full" />
          <span class="flex-grow px-2">{{ participant.prenom }}</span>
          <span class="text-gray-300 px-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </span>
          <span class="text-gray-400 font-extralight text-sm">
            {{ participant.telephone }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Title from '~/components/Atoms/Title.vue'

export default Vue.extend({
  name: 'FamilyCard',
  components: {
    Title
  },
  props: {
    nom: {
      type: String,
      required: true
    },
    participants: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      estMasque: true
    }
  },
  methods: {
    toggle () {
      this.estMasque = !this.estMasque
    }
  }
})
</script>
