<template>
  <div
    class="flex flex-col items-center justify-center text-center border-2 border-dashed border-bubble-dark/30 dark:border-[#24355a] bg-bubble-cream/70 dark:bg-[#131d33]/60 rounded-xl transition-all"
    :class="slotClasses"
    :style="customStyle"
  >
    <span class="text-xs font-bold text-bubble-dark/60 dark:text-[#94a9c9]">
      {{ label }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'AdSlot',
  props: {
    type: {
      type: String,
      default: 'banner',
      validator: (val) => ['banner', 'sidebar', 'custom'].includes(val)
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'Ваша реклама'
    }
  },
  computed: {
    slotClasses() {
      if (this.type === 'sidebar') {
        return 'w-full min-h-[220px] p-4';
      }
      if (this.type === 'banner') {
        return 'w-full min-h-[90px] p-4 my-6';
      }
      return 'p-4';
    },
    customStyle() {
      const style = {};
      if (this.width) style.width = this.width;
      if (this.height) style.height = this.height;
      return style;
    }
  }
};
</script>
