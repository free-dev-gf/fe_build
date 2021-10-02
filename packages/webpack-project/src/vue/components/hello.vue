<template>
    <div>
        <div class="c-hello">hello {{ msg }}</div>
        <div>count: {{ count }}</div>
        <div>doubleCount: {{ doubleCount }}</div>
        <button @click="addCount">add</button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";

@Component({
    name: "Hello",
})
export default class Hello extends Vue {
    @Prop({ default: false }) private msg!: boolean;

    private count: number = 0;

    public addCount(): void {
        this.count++;
    }

    public created(): void {
        console.log("created");
    }

    public get doubleCount(): number {
        return this.count * 2;
    }

    @Watch("count", { immediate: true })
    public onCountChange(): void {
        console.log("count changed");
        this.onAdd();
    }

    @Emit("add")
    onAdd() {
        return this.count;
    }
}
</script>

<style lang="less" scoped>
.c-hello {
    color: red;
}
</style>
