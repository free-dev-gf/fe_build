<template>
  <hello msg="world" @add="onAdd" />
</template>

<script lang="ts">
import Hello from '@comp/hello.vue';
import { Component, Vue } from "vue-property-decorator";

@Component({
    name: "Home",
    components: {
      Hello
    }
})
export default class extends Vue {
  public onAdd(count: number) {
    console.log('on add', count)
  }
}
</script>