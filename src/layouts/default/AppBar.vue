<template>
  <v-app-bar
    density="compact"
    rounded="lg"
    border
    color="transparent"
    height="79"
  >
    <v-app-bar-title
      style="font-size: 1.6rem; padding: 1rem; width: auto;"
    >
      <h4>{{ title }}</h4>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script setup>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";

const router = useRouter()
const title = ref('')
onMounted(() => {
   title.value = router.currentRoute.value.meta.title
})

</script>
