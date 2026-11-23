<template>
  <base-modal
    :show="show"
    :title="isEditMode ? `Редактирование заказа #${form.id}` : 'Новый заказ прачечной'"
    size="lg"
    @close="$emit('close')"
  >
    <template #body>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label class="mb-1.5 block text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd]">Услуга</label>
            <input
              v-model="form.service"
              type="text"
              list="service-options-list"
              class="w-full min-h-[42px] rounded-[9px] border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#0e182a] px-3.5 py-2 text-sm font-bold text-bubble-dark dark:text-[#f1f5fd] focus:ring-4 focus:ring-bubble-blue/20 outline-none"
              required
              @input="recalculatePrice"
            />
            <datalist id="service-options-list">
              <option value="Стирка" />
              <option value="Сушка" />
              <option value="Глажка" />
              <option value="Стирка + Сушка" />
              <option value="Стирка + Сушка + Глажка" />
              <option value="Химчистка" />
              <option value="Стирка обуви" />
              <option value="Одеяла и пледы" />
              <option value="Деликатная стирка" />
            </datalist>
          </div>

          <div>
            <label class="mb-1.5 block text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd]">Вес (кг)</label>
            <select
              v-model.number="form.weight"
              class="w-full min-h-[42px] rounded-[9px] border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#0e182a] px-3.5 py-2 text-sm font-bold text-bubble-dark dark:text-[#f1f5fd] focus:ring-4 focus:ring-bubble-blue/20 outline-none cursor-pointer"
              required
              @change="recalculatePrice"
            >
              <option :value="3">3 кг</option>
              <option :value="5">5 кг</option>
              <option :value="7">7 кг</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label class="mb-1.5 block text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd]">Способ получения</label>
            <select
              v-model="form.delivery"
              class="w-full min-h-[42px] rounded-[9px] border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#0e182a] px-3.5 py-2 text-sm font-bold text-bubble-dark dark:text-[#f1f5fd] focus:ring-4 focus:ring-bubble-blue/20 outline-none cursor-pointer"
              required
              @change="recalculatePrice"
            >
              <option value="Заберу">Заберу (самовывоз)</option>
              <option value="Курьер">Курьер (+5 BYN)</option>
            </select>
          </div>

          <div>
            <label class="mb-1.5 block text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd]">Телефон</label>
            <input
              v-model="form.phone"
              type="text"
              class="w-full min-h-[42px] rounded-[9px] border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#0e182a] px-3.5 py-2 text-sm font-bold text-bubble-dark dark:text-[#f1f5fd] focus:ring-4 focus:ring-bubble-blue/20 outline-none"
              placeholder="+375 29 000-00-00"
              required
            />
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label class="mb-1.5 block text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd]">Статус заказа</label>
            <select
              v-model="form.status"
              class="w-full min-h-[42px] rounded-[9px] border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#0e182a] px-3.5 py-2 text-sm font-bold text-bubble-dark dark:text-[#f1f5fd] focus:ring-4 focus:ring-bubble-blue/20 outline-none cursor-pointer"
            >
              <option value="new">Новый</option>
              <option value="processing">В работе</option>
              <option value="done">Готов</option>
              <option value="cancelled">Отменен</option>
            </select>
          </div>

          <div>
            <label class="mb-1.5 block text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd]">Цена (BYN)</label>
            <input
              v-model.number="form.price"
              type="number"
              step="0.01"
              class="w-full min-h-[42px] rounded-[9px] border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#0e182a] px-3.5 py-2 text-sm font-bold text-bubble-dark dark:text-[#f1f5fd] focus:ring-4 focus:ring-bubble-blue/20 outline-none"
            />
          </div>
        </div>

        <div>
          <label class="mb-1.5 block text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd]">Примечания</label>
          <textarea
            v-model="form.notes"
            rows="2"
            class="w-full rounded-[9px] border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#0e182a] px-3.5 py-2 text-sm font-bold text-bubble-dark dark:text-[#f1f5fd] focus:ring-4 focus:ring-bubble-blue/20 outline-none resize-y"
            placeholder="Особые пожелания к стирке..."
          ></textarea>
        </div>
      </form>
    </template>

    <template #footer>
      <button
        type="button"
        class="inline-flex items-center justify-center px-5 py-2 rounded-full border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#131d33] text-bubble-dark dark:text-[#f1f5fd] font-extrabold text-xs shadow-brutal-btn hover:-translate-y-0.5 hover:shadow-brutal-btn-hover active:translate-y-0.5 transition-all cursor-pointer"
        @click="$emit('close')"
      >
        Отмена
      </button>
      <button
        type="button"
        class="inline-flex items-center justify-center px-6 py-2 rounded-full border-2 border-bubble-dark bg-bubble-yellow text-bubble-dark font-extrabold text-xs shadow-brutal-btn hover:-translate-y-0.5 hover:shadow-brutal-btn-hover active:translate-y-0.5 disabled:opacity-50 transition-all cursor-pointer"
        :disabled="isSubmitting"
        @click="submitForm"
      >
        <span v-if="isSubmitting">Сохранение...</span>
        <span v-else>{{ isEditMode ? 'Сохранить изменения' : 'Создать заказ' }}</span>
      </button>
    </template>
  </base-modal>
</template>

<script>
import BaseModal from './BaseModal.vue';

export default {
  name: 'OrderModal',
  components: { BaseModal },
  props: {
    show: { type: Boolean, default: false },
    orderData: { type: Object, default: () => null },
  },
  emits: ['close', 'save'],
  data() {
    return {
      isSubmitting: false,
      form: {
        id: null,
        service: 'Стирка',
        weight: 5,
        delivery: 'Заберу',
        phone: '',
        status: 'new',
        price: 8.0,
        notes: '',
      },
    };
  },
  computed: {
    isEditMode() {
      return !!(this.orderData && this.orderData.id);
    },
  },
  watch: {
    orderData: {
      immediate: true,
      handler(val) {
        if (val && val.id) {
          this.form = {
            id: val.id,
            service: val.service || 'Стирка',
            weight: Number(val.weight) || 5,
            delivery: val.delivery || 'Заберу',
            phone: val.phone || '',
            status: this.normalizeModalStatus(val.status),
            price: Number(val.price) || 8.0,
            notes: val.notes || '',
          };
        } else {
          this.form = {
            id: null,
            service: 'Стирка',
            weight: 5,
            delivery: 'Заберу',
            phone: '',
            status: 'new',
            price: 8.0,
            notes: '',
          };
        }
      },
    },
  },
  methods: {
    recalculatePrice() {
      const basePrices = {
        'Стирка': 8.0,
        'Сушка': 5.0,
        'Глажка': 3.0,
        'Химчистка': 20.0,
        'Обувь': 15.0,
        'Стирка обуви': 15.0,
        'Одеяла': 18.0,
        'Одеяла и пледы': 18.0,
        'Деликатная стирка': 10.0,
      };
      const parts = (this.form.service || '').split(/[\+,]/);
      let base = 0;
      for (const part of parts) {
        const trimmed = part.trim();
        if (basePrices[trimmed]) {
          base += basePrices[trimmed];
        }
      }
      if (base === 0) {
        base = basePrices[this.form.service] || 8.0;
      }
      let p = base;
      if (this.form.weight === 7) p *= 1.3;
      if (this.form.weight === 3) p *= 0.9;
      if (this.form.delivery === 'Курьер') p += 5.0;
      this.form.price = Math.round(p * 100) / 100;
    },
    normalizeModalStatus(status) {
      const s = String(status || '').trim().toLowerCase();
      if (s === 'processing' || s === 'in_progress' || s === 'в работе') return 'processing';
      if (s === 'done' || s === 'completed' || s === 'готов' || s === 'завершен') return 'done';
      if (s === 'cancelled' || s === 'отменен') return 'cancelled';
      return 'new';
    },
    submitForm() {
      if (!this.form.phone) {
        alert('Укажите контактный телефон.');
        return;
      }
      this.$emit('save', { ...this.form });
    },
  },
};
</script>
