<template>
    <div>
        <div>username: {{ username }}</div>
        <input v-model="name" />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { AppModule } from "@store/modules/app";

@Component({
    name: "Mine",
})
export default class extends Vue {
    private name: string = AppModule.username;

    get username(): string {
        return AppModule.username;
    }

    @Watch('name', { immediate: true })
    public onNameChange() {
      AppModule.updateUser(this.name);
    }
}
</script>
