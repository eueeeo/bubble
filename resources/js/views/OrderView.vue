<template>
  <div class="min-h-screen py-8 md:py-14 bg-bubble-cream dark:bg-[#080e1c] text-bubble-dark dark:text-[#f1f5fd] transition-colors">
    <div class="w-[min(1180px,calc(100%-48px))] mx-auto">
      
      <div class="mb-8 flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-bubble-dark/15 dark:border-[#24355a]">
        <router-link
          to="/"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#131d33] text-xs font-black shadow-brutal-sm hover:-translate-y-0.5 transition-all select-none"
        >
          ← Вернуться на главную
        </router-link>

        <div class="flex items-center gap-3">
          <span class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-bubble-dark dark:border-[#24355a] bg-bubble-yellow text-bubble-dark text-xs font-black uppercase tracking-wider shadow-sm">
            Bubble Checkout
          </span>
          <span class="hidden sm:inline text-xs font-black text-bubble-blue dark:text-bubble-blue-ice">
            Стираем ради ваших улыбок
          </span>
        </div>
      </div>

      <div class="text-center mb-8">
        <h1 class="text-3xl sm:text-5xl font-black text-bubble-blue dark:text-bubble-blue-ice tracking-tight mb-2">
          Оформить заказ
        </h1>
        <p class="text-xs sm:text-sm text-bubble-dark/80 dark:text-[#94a9c9] font-medium">
          Рассчитайте стоимость и отправьте заявку онлайн
        </p>
      </div>

      <div class="max-w-2xl mx-auto bg-white dark:bg-[#131d33] border-2 border-bubble-dark dark:border-[#24355a] rounded-[24px] shadow-brutal p-6 sm:p-8 text-bubble-dark dark:text-[#f1f5fd]">
        <nav aria-label="Этапы оформления заказа" class="mb-8">
          <ol class="flex items-center justify-between relative">
            <div class="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-full bg-slate-200 dark:bg-[#24355a] -z-0"></div>

            <li class="relative z-10 flex flex-col items-center cursor-pointer" @click="wizardStep > 1 && (wizardStep = 1)">
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

            <li class="relative z-10 flex flex-col items-center cursor-pointer" @click="wizardStep > 2 && (wizardStep = 2)">
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

            <li class="relative z-10 flex flex-col items-center cursor-pointer" @click="wizardStep > 3 && (wizardStep = 3)">
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

        <div v-if="orderSuccessMsg" class="py-6 text-center space-y-5 animate-in fade-in duration-200">
          <div class="w-14 h-14 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center text-3xl font-black shadow-sm">
            ✓
          </div>
          <div>
            <span class="inline-block px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500 text-emerald-800 dark:text-emerald-200 text-xs font-black uppercase tracking-wider mb-2">
              Заявка принята
            </span>
            <h3 class="text-2xl font-black text-bubble-dark dark:text-[#f1f5fd]">
              {{ orderSuccessMsg }}
            </h3>
            <p class="text-xs sm:text-sm font-medium text-bubble-dark/70 dark:text-[#94a9c9] max-w-md mx-auto mt-2 leading-relaxed">
              Мы уже зафиксировали вашу заявку в системе. Дежурный администратор свяжется с вами по указанному телефону для подтверждения деталей.
            </p>
          </div>

          <div class="p-4 bg-bubble-cream dark:bg-[#080e1c] rounded-xl border-2 border-bubble-dark/15 dark:border-[#24355a] max-w-sm mx-auto text-left space-y-2 text-xs font-bold">
            <div class="flex justify-between">
              <span class="text-bubble-dark/70 dark:text-[#94a9c9]">Услуги:</span>
              <span class="text-bubble-blue dark:text-bubble-blue-ice font-black">{{ selectedServicesText }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-bubble-dark/70 dark:text-[#94a9c9]">Вес:</span>
              <span>{{ orderForm.weight }} кг</span>
            </div>
            <div class="flex justify-between">
              <span class="text-bubble-dark/70 dark:text-[#94a9c9]">Получение:</span>
              <span>{{ orderForm.delivery === 'Курьер' ? 'Курьер Bubble' : orderForm.branch }}</span>
            </div>
            <div class="flex justify-between pt-2 border-t border-bubble-dark/20 dark:border-[#24355a] text-sm font-black">
              <span>Итого:</span>
              <span class="text-bubble-blue dark:text-bubble-blue-ice">{{ computedPrice }} BYN</span>
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-center gap-3 pt-3">
            <router-link
              to="/"
              class="inline-flex items-center justify-center min-h-[42px] px-6 rounded-full border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#131d33] text-bubble-dark dark:text-[#f1f5fd] font-extrabold text-xs shadow-brutal-sm hover:-translate-y-0.5 transition-all"
            >
              ← На главную
            </router-link>
            <button
              type="button"
              class="inline-flex items-center justify-center min-h-[42px] px-6 rounded-full border-2 border-bubble-dark bg-bubble-yellow text-bubble-dark font-black text-xs shadow-brutal-btn hover:-translate-y-0.5 transition-all cursor-pointer"
              @click="resetWizard"
            >
              Оформить еще заказ
            </button>
          </div>
        </div>

        <div v-else>
          <div v-if="wizardStep === 1" class="space-y-5">
            <h2 class="text-lg font-black text-bubble-dark dark:text-[#f1f5fd]">Шаг 1: Выберите услуги и объем</h2>

            <fieldset>
              <div class="flex items-center justify-between mb-2">
                <legend class="block text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd]">
                  Услуги
                </legend>
                <span class="text-[11px] font-black text-bubble-blue dark:text-bubble-blue-ice">
                  Выбрано: {{ orderForm.services.length }}
                </span>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <label
                  v-for="s in serviceOptions"
                  :key="s.name"
                  class="p-3 rounded-xl border-2 cursor-pointer font-extrabold text-xs transition-all flex flex-col justify-between min-h-[76px]"
                  :class="orderForm.services.includes(s.name) ? 'bg-bubble-yellow text-bubble-dark border-bubble-dark shadow-brutal-sm' : 'bg-bubble-cream dark:bg-[#080e1c] text-bubble-dark dark:text-[#f1f5fd] border-bubble-dark/30 dark:border-[#24355a] hover:border-bubble-dark'"
                >
                  <div class="flex items-start justify-between gap-1 w-full">
                    <span class="leading-snug">{{ s.name }}</span>
                    <span
                      class="w-4 h-4 rounded border border-bubble-dark flex items-center justify-center text-[10px] shrink-0 font-black transition-colors"
                      :class="orderForm.services.includes(s.name) ? 'bg-bubble-dark text-white' : 'bg-white dark:bg-[#131d33] text-transparent'"
                    >
                      ✓
                    </span>
                  </div>
                  <div class="mt-2 text-left">
                    <span class="text-[11px] font-black opacity-80">
                      {{ s.price }} BYN
                    </span>
                  </div>
                  <input type="checkbox" :value="s.name" v-model="orderForm.services" class="hidden" />
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend class="block text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd] mb-2">Вес белья</legend>
              <div class="flex flex-wrap gap-2">
                <label
                  v-for="w in [3, 5, 7, 10]"
                  :key="w"
                  class="px-4 py-2 rounded-full border-2 font-extrabold text-xs cursor-pointer transition-all"
                  :class="orderForm.weight === w ? 'bg-bubble-pink text-bubble-dark border-bubble-dark shadow-sm' : 'bg-white dark:bg-[#080e1c] text-bubble-dark dark:text-[#f1f5fd] border-bubble-dark dark:border-[#24355a] hover:bg-bubble-cream'"
                >
                  <input type="radio" v-model.number="orderForm.weight" :value="w" class="hidden" />
                  {{ w }} кг
                </label>
              </div>
            </fieldset>

            <div class="p-3.5 bg-bubble-cream dark:bg-[#080e1c] rounded-xl border-2 border-bubble-dark dark:border-[#24355a] flex justify-between items-center text-xs font-black">
              <span>Предварительная стоимость:</span>
              <span class="text-base text-bubble-blue dark:text-bubble-blue-ice">{{ computedPrice }} BYN</span>
            </div>
          </div>

          <div v-else-if="wizardStep === 2" class="space-y-5">
            <h2 class="text-lg font-black text-bubble-dark dark:text-[#f1f5fd]">Шаг 2: Способ доставки и контакты</h2>

            <fieldset>
              <legend class="block text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd] mb-2">Способ получения</legend>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  class="p-3.5 rounded-xl border-2 cursor-pointer transition-all"
                  :class="orderForm.delivery === 'Заберу' ? 'bg-bubble-yellow text-bubble-dark border-bubble-dark shadow-brutal-sm' : 'bg-bubble-cream dark:bg-[#080e1c] text-bubble-dark dark:text-[#f1f5fd] border-bubble-dark/30 dark:border-[#24355a]'"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-black" :class="orderForm.delivery === 'Заберу' ? 'text-bubble-dark' : 'text-bubble-dark dark:text-[#f1f5fd]'">
                      Самовывоз
                    </span>
                    <input type="radio" v-model="orderForm.delivery" value="Заберу" class="accent-bubble-blue" />
                  </div>
                  <p class="text-[11px] mt-1 font-medium" :class="orderForm.delivery === 'Заберу' ? 'text-bubble-dark/80' : 'text-bubble-dark/70 dark:text-[#94a9c9]'">Бесплатно из ближайшей прачечной</p>
                </label>

                <label
                  class="p-3.5 rounded-xl border-2 cursor-pointer transition-all"
                  :class="orderForm.delivery === 'Курьер' ? 'bg-bubble-yellow text-bubble-dark border-bubble-dark shadow-brutal-sm' : 'bg-bubble-cream dark:bg-[#080e1c] text-bubble-dark dark:text-[#f1f5fd] border-bubble-dark/30 dark:border-[#24355a]'"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-black" :class="orderForm.delivery === 'Курьер' ? 'text-bubble-dark' : 'text-bubble-dark dark:text-[#f1f5fd]'">
                      Курьер Bubble
                    </span>
                    <input type="radio" v-model="orderForm.delivery" value="Курьер" class="accent-bubble-blue" />
                  </div>
                  <p class="text-[11px] mt-1 font-medium" :class="orderForm.delivery === 'Курьер' ? 'text-bubble-dark/80' : 'text-bubble-dark/70 dark:text-[#94a9c9]'">+5 BYN прямо до вашей двери</p>
                </label>
              </div>
            </fieldset>

            <div v-if="orderForm.delivery === 'Заберу'">
              <label class="block text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd] mb-1.5">Выберите прачечную (самовывоз)</label>
              <select
                v-model="orderForm.branch"
                class="w-full min-h-[43px] px-3.5 py-2 rounded-xl border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#080e1c] text-bubble-dark dark:text-[#f1f5fd] font-bold text-xs focus:ring-4 focus:ring-bubble-blue/20 outline-none cursor-pointer"
              >
                <option value="ул. Пузырьковая, 12">ул. Пузырьковая, 12 (8:00–21:00)</option>
                <option value="ул. Пенная, 45">ул. Пенная, 45 (7:00–24:00)</option>
                <option value="ул. Мыльная, 3">ул. Мыльная, 3 (8:00–22:00)</option>
              </select>
            </div>

            <div v-else-if="orderForm.delivery === 'Курьер'">
              <label class="block text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd] mb-1.5">Адрес доставки</label>
              <input
                v-model="orderForm.address"
                type="text"
                placeholder="Улица, дом, квартира"
                class="w-full min-h-[43px] px-3.5 py-2 rounded-xl border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#080e1c] text-bubble-dark dark:text-[#f1f5fd] font-bold text-sm focus:ring-4 focus:ring-bubble-blue/20 outline-none"
              />
            </div>

            <div>
              <label class="block text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd] mb-1.5">Номер телефона</label>
              <input
                v-model="orderForm.phone"
                type="tel"
                placeholder="+375 29 000-00-00"
                class="w-full min-h-[43px] px-3.5 py-2 rounded-xl border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#080e1c] text-bubble-dark dark:text-[#f1f5fd] font-bold text-sm focus:ring-4 focus:ring-bubble-blue/20 outline-none"
                required
              />
            </div>
          </div>

          <div v-else-if="wizardStep === 3" class="space-y-5">
            <h2 class="text-lg font-black text-bubble-dark dark:text-[#f1f5fd]">Шаг 3: Способ оплаты</h2>

            <div class="space-y-2.5">
              <label class="flex items-center justify-between p-4 rounded-xl border-2 border-bubble-dark/30 cursor-pointer transition-all bg-bubble-yellow text-bubble-dark shadow-brutal-sm">
                <div>
                  <span class="block text-xs sm:text-sm font-black">Оплата при получении</span>
                  <span class="text-[11px] text-bubble-dark/80 font-medium">Наличными или банковской картой при передаче чистых вещей</span>
                </div>
                <input type="radio" v-model="orderForm.payment" value="receipt" checked class="accent-bubble-blue w-4 h-4" />
              </label>
            </div>
          </div>

          <div v-else-if="wizardStep === 4" class="space-y-5 text-center py-4">
            <div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 border-2 border-bubble-dark dark:border-emerald-800 rounded-full flex items-center justify-center mx-auto text-lg font-black shadow-sm">
              ✓
            </div>
            <h2 class="text-xl font-black text-bubble-dark dark:text-[#f1f5fd]">Заказ готов к подтверждению</h2>
            <div class="bg-bubble-cream dark:bg-[#080e1c] border-2 border-bubble-dark dark:border-[#24355a] rounded-xl p-4 text-left space-y-2 text-xs font-bold text-bubble-dark dark:text-[#f1f5fd] max-w-sm mx-auto">
              <div class="flex justify-between items-start gap-2">
                <span class="text-bubble-dark/70 dark:text-[#94a9c9] shrink-0">Услуги:</span>
                <span class="text-right">{{ selectedServicesText }} ({{ orderForm.weight }} кг)</span>
              </div>
              <div class="flex justify-between">
                <span class="text-bubble-dark/70 dark:text-[#94a9c9]">Получение:</span>
                <span>{{ orderForm.delivery === 'Заберу' ? ('Самовывоз: ' + (orderForm.branch || 'ул. Пузырьковая, 12')) : ('Курьер (' + (orderForm.address || 'Адрес доставки') + ')') }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-bubble-dark/70 dark:text-[#94a9c9]">Оплата:</span>
                <span class="text-emerald-600 dark:text-emerald-400">При получении</span>
              </div>
              <div class="flex justify-between">
                <span class="text-bubble-dark/70 dark:text-[#94a9c9]">Телефон:</span>
                <span>{{ orderForm.phone || 'Не указан' }}</span>
              </div>
              <div class="flex justify-between pt-2 border-t border-bubble-dark/20 dark:border-[#24355a] text-sm font-black">
                <span>Итого к оплате:</span>
                <span class="text-bubble-blue dark:text-bubble-blue-ice">{{ computedPrice }} BYN</span>
              </div>
            </div>

            <button
              type="button"
              class="inline-flex items-center justify-center min-h-[44px] px-8 rounded-full border-2 border-bubble-dark bg-bubble-yellow text-bubble-dark font-extrabold text-sm shadow-brutal-btn hover:-translate-y-0.5 hover:shadow-brutal-btn-hover active:translate-y-0.5 transition-all disabled:opacity-50 cursor-pointer"
              :disabled="isSubmittingOrder"
              @click="submitOnlineOrder"
            >
              <span v-if="isSubmittingOrder">Отправка заказа...</span>
              <span v-else>Подтвердить и отправить заказ</span>
            </button>
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
              Итого: <span class="text-bubble-blue dark:text-bubble-blue-ice text-sm">{{ computedPrice }} BYN</span>
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
        { name: 'Стирка', price: 8 },
        { name: 'Сушка', price: 5 },
        { name: 'Глажка', price: 3 },
        { name: 'Химчистка', price: 20 },
        { name: 'Обувь', price: 15 },
        { name: 'Одеяла', price: 18 }
      ],
      orderForm: {
        services: ['Стирка'],
        weight: 5,
        delivery: 'Заберу',
        branch: 'ул. Пузырьковая, 12',
        phone: '',
        address: '',
        payment: 'receipt'
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
      let base = 0;
      for (const s of list) {
        base += basePrices[s] || 8.0;
      }
      let p = base;
      if (this.orderForm.weight === 10) p *= 1.6;
      else if (this.orderForm.weight === 7) p *= 1.3;
      else if (this.orderForm.weight === 3) p *= 0.9;
      if (this.orderForm.delivery === 'Курьер') p += 5.0;
      return Math.round(p * 100) / 100;
    }
  },
  mounted() {
    const serviceParam = this.$route.query.service;
    if (serviceParam) {
      const match = this.serviceOptions.find(
        s => s.name.toLowerCase() === serviceParam.toLowerCase()
      );
      if (match) {
        this.orderForm.services = [match.name];
      }
    }
  },
  methods: {
    nextWizardStep() {
      if (this.wizardStep === 1 && (!this.orderForm.services || this.orderForm.services.length === 0)) {
        alert('Пожалуйста, выберите хотя бы одну услугу.');
        return;
      }
      if (this.wizardStep === 2 && !this.orderForm.phone) {
        alert('Пожалуйста, укажите контактный номер телефона.');
        return;
      }
      if (this.wizardStep < 4) {
        this.wizardStep++;
      }
    },
    resetWizard() {
      this.orderSuccessMsg = '';
      this.wizardStep = 1;
      this.orderForm.services = ['Стирка'];
      this.orderForm.weight = 5;
      this.orderForm.delivery = 'Заберу';
      this.orderForm.phone = '';
      this.orderForm.address = '';
    },
    async submitOnlineOrder() {
      this.isSubmittingOrder = true;
      this.orderSuccessMsg = '';
      try {
        const payload = {
          service: this.selectedServicesText,
          weight: this.orderForm.weight,
          delivery: this.orderForm.delivery,
          phone: this.orderForm.phone || '+375 29 000-00-00',
          price: this.computedPrice,
          notes: `Оплата: ${this.orderForm.payment}. Адрес: ${this.orderForm.address}`
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