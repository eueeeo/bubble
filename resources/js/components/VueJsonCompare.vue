<template>
  <div class="overflow-x-auto rounded-xl border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#131d33] p-4 font-mono text-xs md:text-sm transition-colors">
    <div class="grid grid-cols-12 border-b-2 border-bubble-dark dark:border-[#24355a] pb-2 font-bold text-gray-500 dark:text-[#94a9c9]">
      <div class="col-span-4">Поле объекта</div>
      <div class="col-span-4 text-red-600 dark:text-rose-400">До изменения (было)</div>
      <div class="col-span-4 text-green-600 dark:text-emerald-400">После изменения (стало)</div>
    </div>

    <div v-if="allKeys.length === 0" class="py-4 text-center text-gray-400 dark:text-[#94a9c9]">
      Нет данных для сравнения
    </div>

    <div
      v-for="key in allKeys"
      :key="key"
      class="grid grid-cols-12 items-center border-b border-gray-200 dark:border-[#24355a] py-2"
      :class="{
        'bg-yellow-50 dark:bg-yellow-950/30': isModified(key),
        'bg-green-50 dark:bg-emerald-950/30': isAdded(key),
        'bg-red-50 dark:bg-rose-950/30': isRemoved(key)
      }"
    >
      <div class="col-span-4 flex items-center gap-2 font-bold text-bubble-dark dark:text-[#f1f5fd]">
        <span>{{ key }}</span>
        <span v-if="isModified(key)" class="rounded bg-yellow-200 dark:bg-yellow-900 px-1 text-[10px] text-yellow-900 dark:text-yellow-200">изм</span>
        <span v-else-if="isAdded(key)" class="rounded bg-green-200 dark:bg-emerald-900 px-1 text-[10px] text-green-900 dark:text-emerald-200">нов</span>
        <span v-else-if="isRemoved(key)" class="rounded bg-red-200 dark:bg-rose-900 px-1 text-[10px] text-red-900 dark:text-rose-200">удл</span>
      </div>
      <div class="col-span-4 break-words text-red-700 dark:text-rose-400">
        {{ (before && before[key] !== undefined) ? formatValue(before[key]) : '—' }}
      </div>
      <div class="col-span-4 break-words text-green-700 dark:text-emerald-400">
        {{ (after && after[key] !== undefined) ? formatValue(after[key]) : '—' }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueJsonCompare',
  props: {
    before: { type: Object, default: () => null },
    after: { type: Object, default: () => null },
  },
  computed: {
    allKeys() {
      const keys = new Set();
      if (this.before && typeof this.before === 'object') Object.keys(this.before).forEach(k => keys.add(k));
      if (this.after && typeof this.after === 'object') Object.keys(this.after).forEach(k => keys.add(k));
      return Array.from(keys);
    }
  },
  methods: {
    formatValue(val) {
      if (val === null) return 'null';
      if (val === undefined) return 'undefined';
      if (typeof val === 'object') return JSON.stringify(val);
      return String(val);
    },
    isModified(key) {
      if (!this.before || !this.after) return false;
      return this.before[key] !== undefined && this.after[key] !== undefined && JSON.stringify(this.before[key]) !== JSON.stringify(this.after[key]);
    },
    isAdded(key) {
      return (!this.before || this.before[key] === undefined) && (this.after && this.after[key] !== undefined);
    },
    isRemoved(key) {
      return (this.before && this.before[key] !== undefined) && (!this.after || this.after[key] === undefined);
    }
  }
};
</script>
