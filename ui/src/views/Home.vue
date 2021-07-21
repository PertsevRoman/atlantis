<template>
  <div class="home">
    <h1>Atlantis logo</h1>
    <h1>MRs list</h1>
    <h1>Projects/workspaces/locks list</h1>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Options({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>
