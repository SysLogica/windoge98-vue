<script setup lang="ts">
const emit = defineEmits(["onClose", "onMaximise", "onMinimise"]);
const props = defineProps(["title", "icon"]);
</script>

<template>
  <div class="window">
    <div class="title-bar" @dblclick="emit('onMaximise')">
      <div class="title-bar-text" style="display: flex; align-items: center">
        <img
          :src="props.icon"
          style="width: 16px; height: 16px; margin-right: 4px"
          v-if="props.icon"
        />
        {{ props.title }}
      </div>
      <div class="title-bar-controls">
        <button aria-label="Minimize" @click="emit('onMinimise')" />
        <button aria-label="Maximize" @click="emit('onMaximise')" />
        <button aria-label="Close" @click="emit('onClose')" />
      </div>
    </div>

    <div class="window-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.window {
  overflow: auto;
  min-width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.window-body {
  flex: auto;
  display: flex;
  flex-direction: column;
}
</style>
