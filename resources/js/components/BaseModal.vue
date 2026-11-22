<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-bubble-dark/60 dark:bg-black/70 backdrop-blur-[2px] p-4">
    <div
      class="w-full max-w-lg rounded-[22px] border-2 border-bubble-dark dark:border-[#24355a] bg-bubble-cream dark:bg-[#131d33] text-bubble-dark dark:text-[#f1f5fd] shadow-brutal-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150 transition-colors"
      :class="{ 'max-w-2xl': size === 'lg' }"
    >
      <div
        class="flex items-center justify-between border-b-2 border-bubble-dark dark:border-[#24355a] px-6 py-4"
        :class="headerClass"
      >
        <h3 class="text-lg font-black tracking-tight">
          <slot name="title">{{ title }}</slot>
        </h3>
        <button
          type="button"
          aria-label="Закрыть"
          class="w-8 h-8 rounded-full border-2 border-bubble-dark bg-white text-bubble-dark flex items-center justify-center font-black text-lg leading-none shadow-brutal-sm hover:bg-bubble-pink hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          @click="$emit('close')"
        >
          &times;
        </button>
      </div>

      <div class="p-6 text-sm">
        <slot name="body"></slot>
      </div>

      <div class="flex items-center justify-end gap-3 border-t-2 border-bubble-dark/15 dark:border-[#24355a] bg-bubble-cream/70 dark:bg-[#0c1424] px-6 py-4">
        <slot name="footer">
          <button
            type="button"
            class="inline-flex items-center justify-center px-5 py-2 rounded-full border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#131d33] text-bubble-dark dark:text-[#f1f5fd] font-extrabold text-xs shadow-brutal-btn hover:-translate-y-0.5 hover:shadow-brutal-btn-hover active:translate-y-0.5 transition-all cursor-pointer"
            @click="$emit('close')"
          >
            Закрыть
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    show: { type: Boolean, default: false },
    title: { type: String, default: '' },
    size: { type: String, default: 'md' },
    variant: { type: String, default: 'primary' },
  },
  computed: {
    headerClass() {
      switch (this.variant) {
        case 'danger':
          return 'bg-bubble-pink text-bubble-dark';
        case 'warning':
          return 'bg-bubble-yellow text-bubble-dark';
        default:
          return 'bg-bubble-blue-light text-bubble-dark';
      }
    }
  }
};
</script>
