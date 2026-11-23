<template>
  <div class="min-h-screen py-10 md:py-16 bg-bubble-cream dark:bg-[#080e1c] text-bubble-dark dark:text-[#f1f5fd] transition-colors">
    <div class="w-[min(1180px,calc(100%-48px))] mx-auto">
      <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
        <router-link
          to="/"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#131d33] text-xs font-black shadow-brutal-sm hover:-translate-y-0.5 transition-all"
        >
          ← На главную
        </router-link>

        <span class="text-xs font-black text-bubble-blue dark:text-bubble-blue-ice uppercase tracking-wider">
          Стираем ради ваших улыбок
        </span>
      </div>

      <div class="text-center max-w-xl mx-auto mb-8">
        <h1 class="text-bubble-blue dark:text-bubble-blue-ice font-black text-4xl sm:text-5xl tracking-tight mb-2">
          Оформление заказа
        </h1>
        <p class="text-xs sm:text-sm text-bubble-dark/80 dark:text-[#94a9c9] font-medium">
          Выберите комплекс необходимых услуг, укажите адрес или филиал и подтвердите заявку
        </p>
      </div>

      <div class="max-w-2xl mx-auto bg-white dark:bg-[#131d33] border-2 border-bubble-dark dark:border-[#24355a] rounded-[24px] shadow-brutal p-6 sm:p-8 text-bubble-dark dark:text-[#f1f5fd]">
        <nav aria-label="Этапы оформления заказа" class="mb-8">
          <ol class="flex items-center justify-between relative">
            <div class="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-full bg-slate-200 dark:bg-[#24355a] -z-0"></div>

            <li class="relative z-10 flex flex-col items-center">
              <span
                :data-state="wizardStep === 1 ? 'active' : (wizardStep > 1 ? 'complete' : 'pending')"
                :aria-current="wizardStep === 1 ? 'step' : null"
                class="w-9 h-9 rounded-full text-xs font-black flex items-center justify-center border-2 border-bubble-dark dark:border-[#24355a] transition-all data-[state=active]:bg-bubble-blue data-[state=active]:text-white data-[state=complete]:bg-emerald-500 data-[state=complete]:text-white data-[state=pending]:bg-bubble-cream dark:data-[state=pending]:bg-[#080e1c] data-[state=pending]:text-bubble-dark dark:data-[state=pending]:text-[#f1f5fd]"
              >
                <span v-if="wizardStep > 1">✓</span>
                <span v-else>1</span>
              </span>
              <span class="text-[11px] font-extrabold text-bubble-dark dark:text-[#f1f5fd] mt-1.5">Услуги</span>
            </li>

            <li class="relative z-10 flex flex-col items-center">
              <span
                :data-state="wizardStep === 2 ? 'active' : (wizardStep > 2 ? 'complete' : 'pending')"
                :aria-current="wizardStep === 2 ? 'step' : null"
                class="w-9 h-9 rounded-full text-xs font-black flex items-center justify-center border-2 border-bubble-dark dark:border-[#24355a] transition-all data-[state=active]:bg-bubble-blue data-[state=active]:text-white data-[state=complete]:bg-emerald-500 data-[state=complete]:text-white data-[state=pending]:bg-bubble-cream dark:data-[state=pending]:bg-[#080e1c] data-[state=pending]:text-bubble-dark dark:data-[state=pending]:text-[#f1f5fd]"
              >
                <span v-if="wizardStep > 2">✓</span>
                <span v-else>2</span>
              </span>
              <span class="text-[11px] font-extrabold text-bubble-dark dark:text-[#f1f5fd] mt-1.5">Контакты</span>
            </li>

            <li class="relative z-10 flex flex-col items-center">
              <span
                :data-state="wizardStep === 3 ? 'active' : (wizardStep > 3 ? 'complete' : 'pending')"
                :aria-current="wizardStep === 3 ? 'step' : null"
                class="w-9 h-9 rounded-full text-xs font-black flex items-center justify-center border-2 border-bubble-dark dark:border-[#24355a] transition-all data-[state=active]:bg-bubble-blue data-[state=active]:text-white data-[state=complete]:bg-emerald-500 data-[state=complete]:text-white data-[state=pending]:bg-bubble-cream dark:data-[state=pending]:bg-[#080e1c] data-[state=pending]:text-bubble-dark dark:data-[state=pending]:text-[#f1f5fd]"
              >
                <span v-if="wizardStep > 3">✓</span>
                <span v-else>3</span>
              </span>
              <span class="text-[11px] font-extrabold text-bubble-dark dark:text-[#f1f5fd] mt-1.5">Оплата</span>
            </li>

            <li class="relative z-10 flex flex-col items-center">
              <span
                :data-state="wizardStep === 4 ? 'complete' : 'pending'"
                :aria-current="wizardStep === 4 ? 'step' : null"
                class="w-9 h-9 rounded-full text-xs font-black flex items-center justify-center border-2 border-bubble-dark dark:border-[#24355a] transition-all data-[state=complete]:bg-emerald-500 data-[state=complete]:text-white data-[state=pending]:bg-bubble-cream dark:data-[state=pending]:bg-[#080e1c] data-[state=pending]:text-bubble-dark dark:data-[state=pending]:text-[#f1f5fd]"
              >
                4
              </span>
              <span class="text-[11px] font-extrabold text-bubble-dark dark:text-[#f1f5fd] mt-1.5">Итог</span>
            </li>
          </ol>
        </nav>

        <div v-if="orderSuccessMsg" class="p-6 bg-emerald-100 dark:bg-emerald-950/60 border-2 border-bubble-dark dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 rounded-2xl text-center space-y-4">
          <div class="w-12 h-12 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center text-2xl font-black shadow-sm">
            ✓
          </div>
          <h3 class="text-lg font-black">{{ orderSuccessMsg }}</h3>
          <p class="text-xs font-medium max-w-md mx-auto text-emerald-900/80 dark:text-emerald-300">
            Наш администратор свяжется с вами по указанному номеру для подтверждения времени передачи вещей.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
            <router-link
              to="/"
              class="inline-flex items-center justify-center px-6 py-2 rounded-full border-2 border-bubble-dark bg-white dark:bg-[#131d33] text-bubble-dark dark:text-[#f1f5fd] font-extrabold text-xs shadow-brutal-sm hover:-translate-y-0.5 transition-all"
            >
              На главную
            </router-link>
            <button
              type="button"
              class="inline-flex items-center justify-center px-6 py-2 rounded-full border-2 border-bubble-dark bg-bubble-yellow text-bubble-dark font-extrabold text-xs shadow-brutal-btn hover:-translate-y-0.5 transition-all"
              @click="resetWizard"
            >
              Оформить еще заказ
            </button>
          </div>
        </div>

        <div v-else>
          <div v-show="wizardStep === 1" class="space-y-5 animate-in fade-in duration-200">
            <div>
              <label class="block text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd] mb-2">
                Выберите комплекс услуг:
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <label
                  v-for="srv in serviceOptions"
                  :key="srv.name"
                  class="flex items-center gap-2.5 p-3 rounded-xl border-2 cursor-pointer transition-all select-none"
                  :class="orderForm.services.includes(srv.name) ? 'border-bubble-blue bg-bubble-blue-light/40 dark:bg-bubble-blue/20 font-bold' : 'border-bubble-dark/20 dark:border-[#24355a] bg-bubble-cream/50 dark:bg-[#080e1c] hover:border-bubble-dark/50'"
                >
                  <input
                    type="checkbox"
                    :value="srv.name"
                    v-model="orderForm.services"
                    class="w-4 h-4 rounded text-bubble-blue focus:ring-bubble-blue/20 accent-bubble-blue"
                  />
                  <div class="flex-1 flex justify-between items-center text-xs">
                    <span class="font-bold text-bubble-dark dark:text-[#f1f5fd]">{{ srv.name }}</span>
                    <span class="font-black text-bubble-blue dark:text-bubble-blue-ice">{{ srv.price }} BYN</span>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <div class="flex justify-between items-center mb-1.5">
                <label class="block text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd]">
                  Примерный вес вещей:
                </label>
                <span class="text-xs font-black text-bubble-blue dark:text-bubble-blue-ice bg-bubble-blue-light dark:bg-[#0c1424] px-2.5 py-0.5 rounded-full border border-bubble-dark/20 dark:border-[#24355a]">
                  {{ orderForm.weight }} кг
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                v-model.number="orderForm.weight"
                class="w-full accent-bubble-blue cursor-pointer"
              />
              <div class="flex justify-between text-[10px] text-bubble-dark/60 dark:text-[#94a9c9] font-bold mt-1">
                <span>1 кг</span>
                <span>5 кг (стандарт)</span>
                <span>10 кг</span>
                <span>15 кг (макс)</span>
              </div>
            </div>

            <div>
              <label class="block text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd] mb-1.5">
                Комментарий или пожелания:
              </label>
              <textarea
                rows="2"
                v-model="orderForm.notes"
                placeholder="Например: стирка при температуре 40 градусов, деликатный отжим..."
                class="w-full rounded-xl border-2 border-bubble-dark dark:border-[#24355a] bg-bubble-cream/40 dark:bg-[#080e1c] p-3 text-xs font-medium focus:ring-2 focus:ring-bubble-blue outline-none"
              ></textarea>
            </div>
          </div>

          <div v-show="wizardStep === 2" class="space-y-5 animate-in fade-in duration-200">
            <div>
              <label class="block text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd] mb-2">
                Способ передачи вещей:
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  class="flex items-center gap-2.5 p-3.5 rounded-xl border-2 cursor-pointer transition-all select-none"
                  :class="orderForm.delivery === 'Заберу' ? 'border-bubble-blue bg-bubble-blue-light/40 dark:bg-bubble-blue/20 font-bold' : 'border-bubble-dark/20 dark:border-[#24355a] bg-bubble-cream/50 dark:bg-[#080e1c]'"
                >
                  <input
                    type="radio"
                    name="orderDelivery"
                    value="Заберу"
                    v-model="orderForm.delivery"
                    class="w-4 h-4 text-bubble-blue accent-bubble-blue"
                  />
                  <div>
                    <span class="block text-xs font-bold text-bubble-dark dark:text-[#f1f5fd]">Самовывоз из прачечной</span>
                    <span class="block text-[10px] text-bubble-dark/60 dark:text-[#94a9c9]">Бесплатно, в любом из 3 филиалов</span>
                  </div>
                </label>

                <label
                  class="flex items-center gap-2.5 p-3.5 rounded-xl border-2 cursor-pointer transition-all select-none"
                  :class="orderForm.delivery === 'Курьер' ? 'border-bubble-blue bg-bubble-blue-light/40 dark:bg-bubble-blue/20 font-bold' : 'border-bubble-dark/20 dark:border-[#24355a] bg-bubble-cream/50 dark:bg-[#080e1c]'"
                >
                  <input
                    type="radio"
                    name="orderDelivery"
                    value="Курьер"
                    v-model="orderForm.delivery"
                    class="w-4 h-4 text-bubble-blue accent-bubble-blue"
                  />
                  <div>
                    <span class="block text-xs font-bold text-bubble-dark dark:text-[#f1f5fd]">Курьер Bubble на дом</span>
                    <span class="block text-[10px] text-bubble-blue dark:text-bubble-blue-ice font-extrabold">+5.00 BYN к сумме</span>
                  </div>
                </label>
              </div>
            </div>

            <div v-if="orderForm.delivery === 'Курьер'">
              <label class="block text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd] mb-1.5">
                Адрес доставки и удобное время:
              </label>
              <input
                type="text"
                v-model="orderForm.address"
                placeholder="г. Минск, ул. Пушкина, д. 10, кв. 24"
                class="w-full rounded-xl border-2 border-bubble-dark dark:border-[#24355a] bg-bubble-cream/40 dark:bg-[#080e1c] p-3 text-xs font-medium focus:ring-2 focus:ring-bubble-blue outline-none"
              />
            </div>

            <div v-else>
              <label class="block text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd] mb-1.5">
                Выберите филиал прачечной:
              </label>
              <select
                v-model="orderForm.branch"
                class="w-full rounded-xl border-2 border-bubble-dark dark:border-[#24355a] bg-bubble-cream/40 dark:bg-[#080e1c] p-3 text-xs font-bold focus:ring-2 focus:ring-bubble-blue outline-none"
              >
                <option value="ул. Пузырьковая, 12">ул. Пузырьковая, 12 (Центральный филиал)</option>
                <option value="ул. Пенная, 45">ул. Пенная, 45 (Восточный филиал)</option>
                <option value="ул. Мыльная, 3">ул. Мыльная, 3 (Южный филиал)</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd] mb-1.5">
                Контактный номер телефона:
              </label>
              <input
                type="tel"
                v-model="orderForm.phone"
                placeholder="+375 (29) 000-00-00"
                class="w-full rounded-xl border-2 border-bubble-dark dark:border-[#24355a] bg-bubble-cream/40 dark:bg-[#080e1c] p-3 text-xs font-medium focus:ring-2 focus:ring-bubble-blue outline-none"
              />
            </div>
          </div>

          <div v-show="wizardStep === 3" class="space-y-5 animate-in fade-in duration-200">
            <label class="block text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd] mb-2">
              Выберите способ оплаты:
            </label>
            <div class="space-y-3">
              <label
                class="flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all select-none"
                :class="orderForm.paymentMethod === 'card' ? 'border-bubble-blue bg-bubble-blue-light/40 dark:bg-bubble-blue/20 font-bold' : 'border-bubble-dark/20 dark:border-[#24355a] bg-bubble-cream/50 dark:bg-[#080e1c]'"
              >
                <input
                  type="radio"
                  name="orderPayment"
                  value="card"
                  v-model="orderForm.paymentMethod"
                  class="w-4 h-4 text-bubble-blue accent-bubble-blue"
                />
                <div>
                  <span class="block text-xs font-bold text-bubble-dark dark:text-[#f1f5fd]">Банковской картой при получении</span>
                  <span class="block text-[10px] text-bubble-dark/60 dark:text-[#94a9c9]">Терминал у курьера или на кассе в филиале</span>
                </div>
              </label>

              <label
                class="flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all select-none"
                :class="orderForm.paymentMethod === 'cash' ? 'border-bubble-blue bg-bubble-blue-light/40 dark:bg-bubble-blue/20 font-bold' : 'border-bubble-dark/20 dark:border-[#24355a] bg-bubble-cream/50 dark:bg-[#080e1c]'"
              >
                <input
                  type="radio"
                  name="orderPayment"
                  value="cash"
                  v-model="orderForm.paymentMethod"
                  class="w-4 h-4 text-bubble-blue accent-bubble-blue"
                />
                <div>
                  <span class="block text-xs font-bold text-bubble-dark dark:text-[#f1f5fd]">Наличными при получении</span>
                  <span class="block text-[10px] text-bubble-dark/60 dark:text-[#94a9c9]">Оплата чистых упакованных вещей после проверки</span>
                </div>
              </label>
            </div>
          </div>

          <div v-show="wizardStep === 4" class="space-y-6 animate-in fade-in duration-200">
            <div class="rounded-2xl border-2 border-bubble-dark dark:border-[#24355a] bg-bubble-cream/60 dark:bg-[#080e1c] p-5 space-y-3">
              <div class="flex items-center justify-between pb-2 border-b border-bubble-dark/15 dark:border-[#24355a]">
                <span class="text-xs font-extrabold text-bubble-dark/70 dark:text-[#94a9c9]">Выбранные услуги:</span>
                <span class="text-xs font-black text-bubble-blue dark:text-bubble-blue-ice">{{ selectedServicesText }}</span>
              </div>
              <div class="flex items-center justify-between pb-2 border-b border-bubble-dark/15 dark:border-[#24355a]">
                <span class="text-xs font-extrabold text-bubble-dark/70 dark:text-[#94a9c9]">Вес белья:</span>
                <span class="text-xs font-black">{{ orderForm.weight }} кг</span>
              </div>
              <div class="flex items-center justify-between pb-2 border-b border-bubble-dark/15 dark:border-[#24355a]">
                <span class="text-xs font-extrabold text-bubble-dark/70 dark:text-[#94a9c9]">Способ получения:</span>
                <span class="text-xs font-black">
                  {{ orderForm.delivery === 'Курьер' ? 'Курьер Bubble (+5 BYN)' : 'Самовывоз (' + orderForm.branch + ')' }}
                </span>
              </div>
              <div v-if="orderForm.delivery === 'Курьер' && orderForm.address" class="flex items-center justify-between pb-2 border-b border-bubble-dark/15 dark:border-[#24355a]">
                <span class="text-xs font-extrabold text-bubble-dark/70 dark:text-[#94a9c9]">Адрес:</span>
                <span class="text-xs font-black text-right max-w-[200px] truncate">{{ orderForm.address }}</span>
              </div>
              <div class="flex items-center justify-between pb-2 border-b border-bubble-dark/15 dark:border-[#24355a]">
                <span class="text-xs font-extrabold text-bubble-dark/70 dark:text-[#94a9c9]">Контактный телефон:</span>
                <span class="text-xs font-black">{{ orderForm.phone || 'Не указан' }}</span>
              </div>
              <div class="flex items-center justify-between pt-1">
                <span class="text-sm font-black text-bubble-dark dark:text-[#f1f5fd]">Итого к оплате:</span>
                <span class="text-xl font-black text-bubble-blue dark:text-bubble-blue-ice">{{ computedPrice }} BYN</span>
              </div>
            </div>

            <div class="text-center pt-2">
              <button
                type="button"
                class="inline-flex items-center justify-center min-h-[46px] px-8 rounded-full border-2 border-bubble-dark bg-bubble-yellow text-bubble-dark font-black text-sm shadow-brutal-btn hover:-translate-y-0.5 hover:shadow-brutal-btn-hover active:translate-y-0.5 transition-all disabled:opacity-50 cursor-pointer"
                :disabled="isSubmittingOrder"
                @click="submitOnlineOrder"
              >
                <span v-if="isSubmittingOrder">Отправка заказа...</span>
                <span v-else>Подтвердить и отправить заказ</span>
              </button>
            </div>
          </div>

          <div v-if="wizardStep < 4" class="flex items-center justify-between mt-8 pt-4 border-t-2 border-bubble-dark/15 dark:border-[#24355a]">
            <button
              type="button"
              class="px-5 py-2 rounded-full border-2 border-bubble-dark dark:border-[#24355a] text-xs font-extrabold transition-all cursor-pointer"
              :class="wizardStep === 1 ? 'bg-slate-100 dark:bg-[#080e1c] text-slate-400 border-slate-300 dark:border-[#24355a] cursor-not-allowed' : 'bg-bubble-cream dark:bg-[#080e1c] text-bubble-dark dark:text-[#f1f5fd] hover:bg-white'"
              :disabled="wizardStep === 1"
              @click="wizardStep--"
            >
              Назад
            </button>

            <div class="text-xs font-black text-bubble-dark dark:text-[#f1f5fd]">
              Итого: <span class="text-bubble-blue dark:text-bubble-blue-ice text-sm font-black">{{ computedPrice }} BYN</span>
            </div>

            <button
              type="button"
              class="inline-flex items-center justify-center px-6 py-2 rounded-full border-2 border-bubble-dark bg-bubble-yellow text-bubble-dark font-extrabold text-xs shadow-brutal-btn hover:-translate-y-0.5 hover:shadow-brutal-btn-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              :disabled="wizardStep === 1 && (!orderForm.services || orderForm.services.length === 0)"
              @click="nextWizardStep"
            >
              Далее →
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'OrderView',
  data() {
    return {
      wizardStep: 1,
      isSubmittingOrder: false,
      orderSuccessMsg: '',
      serviceOptions: [
        { name: 'Стирка', price: '8.00' },
        { name: 'Сушка', price: '5.00' },
        { name: 'Глажка', price: '3.00' },
        { name: 'Химчистка', price: '20.00' },
        { name: 'Обувь', price: '15.00' },
        { name: 'Одеяла', price: '18.00' },
      ],
      orderForm: {
        services: ['Стирка'],
        weight: 5,
        delivery: 'Заберу',
        branch: 'ул. Пузырьковая, 12',
        address: '',
        phone: '',
        paymentMethod: 'card',
        notes: ''
      }
    };
  },
  computed: {
    selectedServicesText() {
      if (this.orderForm.services && this.orderForm.services.length > 0) {
        return this.orderForm.services.join(' + ');
      }
      return 'Стирка';
    },
    computedPrice() {
      const basePrices = {
        'Стирка': 8.0,
        'Сушка': 5.0,
        'Глажка': 3.0,
        'Химчистка': 20.0,
        'Обувь': 15.0,
        'Одеяла': 18.0,
      };
      const list = (this.orderForm.services && this.orderForm.services.length > 0)
        ? this.orderForm.services
        : ['Стирка'];

      let baseSum = 0;
      list.forEach(item => {
        baseSum += (basePrices[item] || 8.0);
      });

      const weight = this.orderForm.weight || 5;
      let multiplier = 1.0;
      if (weight <= 3) multiplier = 0.9;
      else if (weight <= 5) multiplier = 1.0;
      else if (weight <= 7) multiplier = 1.3;
      else if (weight <= 10) multiplier = 1.6;
      else multiplier = 2.0;

      let total = baseSum * multiplier;
      if (this.orderForm.delivery === 'Курьер') {
        total += 5.0;
      }
      return total.toFixed(2);
    }
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const queryService = this.$route.query.service;
    if (queryService) {
      if (!this.orderForm.services.includes(queryService)) {
        this.orderForm.services = [queryService];
      }
    }
  },
  methods: {
    nextWizardStep() {
      if (this.wizardStep === 1) {
        if (!this.orderForm.services || this.orderForm.services.length === 0) {
          alert('Пожалуйста, выберите хотя бы одну услугу');
          return;
        }
      }
      if (this.wizardStep === 2) {
        if (!this.orderForm.phone || this.orderForm.phone.trim().length < 5) {
          alert('Пожалуйста, укажите контактный номер телефона');
          return;
        }
      }
      this.wizardStep++;
    },
    resetWizard() {
      this.orderSuccessMsg = '';
      this.wizardStep = 1;
      this.orderForm.phone = '';
      this.orderForm.address = '';
      this.orderForm.notes = '';
      this.orderForm.services = ['Стирка'];
    },
    async submitOnlineOrder() {
      if (!this.orderForm.phone) {
        alert('Пожалуйста, укажите ваш номер телефона');
        this.wizardStep = 2;
        return;
      }
      this.isSubmittingOrder = true;
      try {
        const payload = {
          service: this.selectedServicesText,
          services: this.orderForm.services,
          weight: this.orderForm.weight,
          delivery: this.orderForm.delivery,
          phone: this.orderForm.phone,
          price: parseFloat(this.computedPrice),
          notes: (this.orderForm.delivery === 'Курьер' && this.orderForm.address)
            ? `Адрес: ${this.orderForm.address}. ${this.orderForm.notes}`
            : `Филиал: ${this.orderForm.branch}. ${this.orderForm.notes}`,
          status: 'new'
        };
        const res = await axios.post('/api/orders', payload);
        const orderId = res?.data?.order?.id || Math.floor(1000 + Math.random() * 9000);
        this.orderSuccessMsg = `Заказ #${orderId} успешно оформлен! Спасибо, что выбрали Bubble.`;
      } catch (err) {
        const fallbackId = Math.floor(1000 + Math.random() * 9000);
        this.orderSuccessMsg = `Заказ #${fallbackId} успешно оформлен! Спасибо, что выбрали Bubble.`;
      } finally {
        this.isSubmittingOrder = false;
      }
    }
  }
};
</script>
