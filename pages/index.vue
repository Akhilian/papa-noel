<template>
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
        flex flex-col
        space-x-4
        md:flex-row
        bg-gray-50
        p-4
        rounded-md
        shadow-lg
        max-w-screen-md
      "
    >
      <div class="flex justify-center">
        <nuxt-img src="/img/santa-claus.svg" class="w-16" alt="" />
      </div>
      <div class="flex-1 space-y-2">
        <h1 class="text-2xl font-medium">
          Oh oh oh !
        </h1>
        <p>
          Mes petits lutins ont tellement travaillé cette année que j'aurais
          bien besoin de ton aide pour distribuer des cadeaux à tous les enfants
          qui ont été sage.
        </p>
        <p>
          Cette année, tu seras la joyeux Papa Noël de
          <strong>Catherine</strong>.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
