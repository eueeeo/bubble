<template>
  <div v-if="cartState.isOpen" class="fixed inset-0 z-50 overflow-hidden">
    <div
      class="fixed inset-0 bg-bubble-dark/60 dark:bg-black/75 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200"
      @click="closeCart"
    ></div>

    <div class="fixed inset-y-0 right-0 max-w-full flex pl-10">
      <aside
        class="w-screen max-w-lg bg-white dark:bg-[#101a33] border-l-2 border-bubble-dark dark:border-[#24355a] shadow-2xl flex flex-col text-bubble-dark dark:text-[#f1f5fd] animate-in slide-in-from-right duration-250 select-none"
      >
        <div class="p-5 border-b-2 border-bubble-dark dark:border-[#24355a] bg-bubble-blue dark:bg-[#0c1424] text-white flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <span class="text-xl">🧺</span>
            <div>
              <h2 class="font-black text-base leading-tight">Корзина заказа</h2>
              <p class="text-[11px] text-bubble-blue-ice/90 font-medium">Стираем ради ваших улыбок</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-[11px] font-black bg-bubble-yellow text-bubble-dark px-2.5 py-0.5 rounded-full border border-bubble-dark">
              Услуг: {{ cartState.services.length }}
            </span>
            <button
              type="button"
              class="w-8 h-8 rounded-full border-2 border-bubble-dark bg-bubble-cream text-bubble-dark flex items-center justify-center font-black text-sm shadow-brutal-sm hover:bg-bubble-pink hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              @click="closeCart"
              title="Закрыть корзину"
            >
              ✕
            </button>
          </div>
        </div>

        <div v-if="!cartState.orderSuccessMsg" class="px-5 py-3 border-b-2 border-bubble-dark/10 dark:border-[#24355a] bg-bubble-cream/40 dark:bg-[#080e1c]">
          <ol class="flex items-center justify-between relative text-xs">
            <li
              class="flex items-center gap-1.5 cursor-pointer font-bold"
              :class="cartState.wizardStep === 1 ? 'text-bubble-blue dark:text-bubble-blue-ice font-black' : 'text-bubble-dark/60 dark:text-[#94a9c9]'"
              @click="cartState.wizardStep > 1 && (cartState.wizardStep = 1)"
            >
              <span class="w-5 h-5 rounded-full border flex items-center justify-center text-[10px]" :class="cartState.wizardStep === 1 ? 'bg-bubble-blue text-white border-bubble-blue' : (cartState.wizardStep > 1 ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white dark:bg-[#131d33] border-slate-300')">
                {{ cartState.wizardStep > 1 ? '✓' : '1' }}
              </span>
              <span>Услуги</span>
            </li>

            <span class="text-slate-300 dark:text-[#24355a]">→</span>

            <li
              class="flex items-center gap-1.5 cursor-pointer font-bold"
              :class="cartState.wizardStep === 2 ? 'text-bubble-blue dark:text-bubble-blue-ice font-black' : 'text-bubble-dark/60 dark:text-[#94a9c9]'"
              @click="cartState.wizardStep > 2 && (cartState.wizardStep = 2)"
            >
              <span class="w-5 h-5 rounded-full border flex items-center justify-center text-[10px]" :class="cartState.wizardStep === 2 ? 'bg-bubble-blue text-white border-bubble-blue' : (cartState.wizardStep > 2 ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white dark:bg-[#131d33] border-slate-300')">
                {{ cartState.wizardStep > 2 ? '✓' : '2' }}
              </span>
              <span>Доставка</span>
            </li>

            <span class="text-slate-300 dark:text-[#24355a]">→</span>

            <li
              class="flex items-center gap-1.5 cursor-pointer font-bold"
              :class="cartState.wizardStep === 3 ? 'text-bubble-blue dark:text-bubble-blue-ice font-black' : 'text-bubble-dark/60 dark:text-[#94a9c9]'"
              @click="cartState.wizardStep > 3 && (cartState.wizardStep = 3)"
            >
              <span class="w-5 h-5 rounded-full border flex items-center justify-center text-[10px]" :class="cartState.wizardStep === 3 ? 'bg-bubble-blue text-white border-bubble-blue' : (cartState.wizardStep > 3 ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white dark:bg-[#131d33] border-slate-300')">
                {{ cartState.wizardStep > 3 ? '✓' : '3' }}
              </span>
              <span>Оплата</span>
            </li>

            <span class="text-slate-300 dark:text-[#24355a]">→</span>

            <li
              class="flex items-center gap-1.5 font-bold"
              :class="cartState.wizardStep === 4 ? 'text-bubble-blue dark:text-bubble-blue-ice font-black' : 'text-bubble-dark/60 dark:text-[#94a9c9]'"
            >
              <span class="w-5 h-5 rounded-full border flex items-center justify-center text-[10px]" :class="cartState.wizardStep === 4 ? 'bg-bubble-blue text-white border-bubble-blue' : 'bg-white dark:bg-[#131d33] border-slate-300'">
                4
              </span>
              <span>Итог</span>
            </li>
          </ol>
        </div>

        <div class="flex-1 overflow-y-auto p-5 space-y-5">
          
          <div v-if="cartState.orderSuccessMsg" class="py-8 text-center space-y-5">
            <div class="w-14 h-14 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center text-3xl font-black shadow-brutal-sm">
              ✓
            </div>
            <div>
              <span class="inline-block px-3 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500 text-emerald-800 dark:text-emerald-200 text-[11px] font-black uppercase tracking-wider mb-2">
                Заказ принят
              </span>
              <h3 class="text-xl font-black text-bubble-dark dark:text-[#f1f5fd]">
                {{ cartState.orderSuccessMsg }}
              </h3>
              <p class="text-xs text-bubble-dark/70 dark:text-[#94a9c9] max-w-sm mx-auto mt-2 leading-relaxed">
                Спасибо! Мы уже передали заявку администратору прачечной. Скоро свяжемся с вами для подтверждения времени передачи вещей.
              </p>
            </div>

            <div class="p-4 rounded-2xl border-2 border-bubble-dark/15 dark:border-[#24355a] bg-bubble-cream/60 dark:bg-[#0c1424] text-xs text-left space-y-2">
              <div class="flex justify-between">
                <span class="font-bold text-bubble-dark/70 dark:text-[#94a9c9]">Услуги:</span>
                <span class="font-black text-bubble-blue dark:text-bubble-blue-ice">{{ cartState.services.join(' + ') }}</span>
              </div>
              <div class="flex justify-between">
                <span class="font-bold text-bubble-dark/70 dark:text-[#94a9c9]">Вес белья:</span>
                <span class="font-bold">{{ cartState.weight }} кг</span>
              </div>
              <div class="flex justify-between">
                <span class="font-bold text-bubble-dark/70 dark:text-[#94a9c9]">Получение:</span>
                <span class="font-bold">{{ cartState.delivery === 'Курьер' ? 'Курьер Bubble' : cartState.branch }}</span>
              </div>
              <div class="flex justify-between border-t border-bubble-dark/10 dark:border-[#24355a] pt-2 font-black text-sm">
                <span>Итого к оплате:</span>
                <span class="text-bubble-blue dark:text-bubble-blue-ice">{{ computedCartPrice }} BYN</span>
              </div>
            </div>

            <div class="pt-2">
              <button
                type="button"
                class="w-full inline-flex items-center justify-center min-h-[44px] px-6 rounded-full border-2 border-bubble-dark bg-bubble-yellow text-bubble-dark font-black text-xs shadow-brutal-btn hover:-translate-y-0.5 transition-all cursor-pointer"
                @click="handleDone"
              >
                Закрыть корзину
              </button>
            </div>
          </div>

          <div v-else>
            
            <div v-show="cartState.wizardStep === 1" class="space-y-4">
              <div>
                <label class="block text-xs font-black uppercase tracking-wider mb-2 text-bubble-dark/80 dark:text-[#94a9c9]">
                  1. Комплекс услуг:
                </label>
                <div class="space-y-2">
                  <div
                    v-for="srv in serviceCatalog"
                    :key="srv.name"
                    class="p-3 rounded-xl border-2 flex items-center justify-between transition-all select-none cursor-pointer"
                    :class="cartState.services.includes(srv.name) ? 'border-bubble-blue bg-bubble-blue-light/40 dark:bg-bubble-blue/20 ring-1 ring-bubble-blue' : 'border-bubble-dark/15 dark:border-[#24355a] bg-bubble-cream/30 dark:bg-[#0c1424] hover:border-bubble-dark/40'"
                    @click="toggleService(srv.name)"
                  >
                    <div class="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        :checked="cartState.services.includes(srv.name)"
                        @click.stop="toggleService(srv.name)"
                        class="w-4 h-4 rounded text-bubble-blue accent-bubble-blue"
                      />
                      <span class="text-lg leading-none">{{ srv.icon }}</span>
                      <div>
                        <strong class="text-xs font-black block">{{ srv.name }}</strong>
                        <span class="text-[10px] text-bubble-dark/60 dark:text-[#94a9c9]">{{ srv.desc }}</span>
                      </div>
                    </div>
                    <span class="text-xs font-black text-bubble-blue dark:text-bubble-blue-ice">
                      {{ srv.price.toFixed(2) }} BYN
                    </span>
                  </div>
                </div>
              </div>

              <div class="p-4 rounded-xl border-2 border-bubble-dark/15 dark:border-[#24355a] bg-bubble-cream/40 dark:bg-[#0c1424] space-y-2.5">
                <div class="flex justify-between items-center">
                  <span class="text-xs font-black">Объем и вес белья:</span>
                  <div class="flex items-center gap-2">
                    <button
                      type="button"
                      class="w-6 h-6 rounded-full border border-bubble-dark bg-white dark:bg-[#131d33] font-black text-xs flex items-center justify-center hover:bg-bubble-cream active:scale-95 transition-all cursor-pointer"
                      @click="adjustWeight(-1)"
                    >
                      -
                    </button>
                    <span class="text-xs font-black px-2.5 py-0.5 rounded-full bg-bubble-blue-light dark:bg-[#1a2640] border border-bubble-dark/20 text-bubble-blue dark:text-bubble-blue-ice">
                      {{ cartState.weight }} кг
                    </span>
                    <button
                      type="button"
                      class="w-6 h-6 rounded-full border border-bubble-dark bg-white dark:bg-[#131d33] font-black text-xs flex items-center justify-center hover:bg-bubble-cream active:scale-95 transition-all cursor-pointer"
                      @click="adjustWeight(1)"
                    >
                      +
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="1"
                  v-model.number="cartState.weight"
                  class="w-full accent-bubble-blue cursor-pointer h-2 bg-slate-200 dark:bg-[#24355a] rounded-lg"
                />
                <div class="flex justify-between text-[10px] text-bubble-dark/60 dark:text-[#94a9c9] font-bold">
                  <span>1 кг</span>
                  <span>5 кг (стандарт)</span>
                  <span>10 кг</span>
                  <span>15 кг</span>
                </div>
              </div>

              <div class="p-3.5 rounded-xl border-2 border-bubble-dark/15 dark:border-[#24355a] bg-bubble-cream/30 dark:bg-[#0c1424] space-y-2">
                <label class="block text-xs font-black">Промокод на скидку:</label>
                <div class="flex gap-2">
                  <input
                    type="text"
                    v-model="cartState.promoCode"
                    placeholder="Например: BUBBLE10 или START"
                    class="flex-1 rounded-lg border-2 border-bubble-dark/20 dark:border-[#24355a] bg-white dark:bg-[#131d33] px-3 py-1.5 text-xs font-bold uppercase tracking-wider outline-none focus:border-bubble-blue"
                  />
                  <button
                    type="button"
                    class="px-4 py-1.5 rounded-lg border-2 border-bubble-dark bg-bubble-yellow text-bubble-dark font-black text-xs shadow-sm hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                    @click="applyPromo"
                  >
                    Применить
                  </button>
                </div>
                <p v-if="cartState.promoMessage" class="text-[11px] font-bold" :class="cartState.discountPercent > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'">
                  {{ cartState.promoMessage }}
                </p>
              </div>

              <div>
                <label class="block text-xs font-black mb-1.5">Комментарий к стирке:</label>
                <textarea
                  rows="2"
                  v-model="cartState.notes"
                  placeholder="Особые пожелания по температуре или средствам..."
                  class="w-full rounded-xl border-2 border-bubble-dark/20 dark:border-[#24355a] bg-bubble-cream/20 dark:bg-[#0c1424] p-2.5 text-xs font-medium focus:ring-1 focus:ring-bubble-blue outline-none"
                ></textarea>
              </div>
            </div>

            <div v-show="cartState.wizardStep === 2" class="space-y-4">
              <label class="block text-xs font-black uppercase tracking-wider text-bubble-dark/80 dark:text-[#94a9c9]">
                2. Способ передачи белья:
              </label>

              <div class="grid grid-cols-2 gap-2.5">
                <label
                  class="p-3 rounded-xl border-2 cursor-pointer transition-all select-none"
                  :class="cartState.delivery === 'Заберу' ? 'border-bubble-blue bg-bubble-blue-light/40 dark:bg-bubble-blue/20 ring-1 ring-bubble-blue font-bold' : 'border-bubble-dark/15 dark:border-[#24355a] bg-bubble-cream/20 dark:bg-[#0c1424]'"
                >
                  <input
                    type="radio"
                    name="cartDelivery"
                    value="Заберу"
                    v-model="cartState.delivery"
                    class="w-3.5 h-3.5 text-bubble-blue accent-bubble-blue mb-1"
                  />
                  <strong class="text-xs block">Самовывоз</strong>
                  <span class="text-[10px] text-bubble-dark/60 dark:text-[#94a9c9] block">Бесплатно из филиала</span>
                </label>

                <label
                  class="p-3 rounded-xl border-2 cursor-pointer transition-all select-none"
                  :class="cartState.delivery === 'Курьер' ? 'border-bubble-blue bg-bubble-blue-light/40 dark:bg-bubble-blue/20 ring-1 ring-bubble-blue font-bold' : 'border-bubble-dark/15 dark:border-[#24355a] bg-bubble-cream/20 dark:bg-[#0c1424]'"
                >
                  <input
                    type="radio"
                    name="cartDelivery"
                    value="Курьер"
                    v-model="cartState.delivery"
                    class="w-3.5 h-3.5 text-bubble-blue accent-bubble-blue mb-1"
                  />
                  <strong class="text-xs block">Курьер Bubble</strong>
                  <span class="text-[10px] text-bubble-blue dark:text-bubble-blue-ice font-extrabold block">+5.00 BYN</span>
                </label>
              </div>

              <div v-if="cartState.delivery === 'Курьер'" class="space-y-3 p-3.5 rounded-xl border-2 border-bubble-dark/15 dark:border-[#24355a] bg-bubble-cream/30 dark:bg-[#0c1424]">
                <div>
                  <label class="block text-xs font-black mb-1">Удобное время приезда курьера:</label>
                  <select
                    v-model="cartState.deliverySlot"
                    class="w-full rounded-lg border-2 border-bubble-dark/20 dark:border-[#24355a] bg-white dark:bg-[#131d33] p-2 text-xs font-bold outline-none cursor-pointer"
                  >
                    <option value="Утро (9:00–13:00)">Утро (9:00–13:00)</option>
                    <option value="День (13:00–18:00)">День (13:00–18:00)</option>
                    <option value="Вечер (18:00–22:00)">Вечер (18:00–22:00)</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-black mb-1">Адрес выезда курьера:</label>
                  <input
                    type="text"
                    v-model="cartState.address"
                    placeholder="г. Минск, ул. Ленина, д. 15, кв. 42"
                    class="w-full rounded-lg border-2 border-bubble-dark/20 dark:border-[#24355a] bg-white dark:bg-[#131d33] p-2.5 text-xs font-medium outline-none focus:border-bubble-blue"
                  />
                </div>
              </div>

              <div v-else class="space-y-1.5">
                <label class="block text-xs font-black mb-1">Филиал прачечной:</label>
                <select
                  v-model="cartState.branch"
                  class="w-full rounded-xl border-2 border-bubble-dark/20 dark:border-[#24355a] bg-bubble-cream/40 dark:bg-[#0c1424] p-2.5 text-xs font-bold outline-none cursor-pointer"
                >
                  <option value="ул. Пузырьковая, 12">ул. Пузырьковая, 12 (Центр, 8:00–21:00)</option>
                  <option value="ул. Пенная, 45">ул. Пенная, 45 (Восток, 7:00–24:00)</option>
                  <option value="ул. Мыльная, 3">ул. Мыльная, 3 (Юг, 8:00–22:00)</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-black mb-1">Контактный телефон:</label>
                <input
                  type="tel"
                  v-model="cartState.phone"
                  placeholder="+375 (29) 000-00-00"
                  class="w-full rounded-xl border-2 border-bubble-dark/20 dark:border-[#24355a] bg-bubble-cream/40 dark:bg-[#0c1424] p-2.5 text-xs font-bold outline-none focus:border-bubble-blue"
                />
              </div>
            </div>

            <div v-show="cartState.wizardStep === 3" class="space-y-4">
              <label class="block text-xs font-black uppercase tracking-wider text-bubble-dark/80 dark:text-[#94a9c9]">
                3. Способ оплаты:
              </label>

              <div class="space-y-2.5">
                <label
                  class="p-3.5 rounded-xl border-2 flex items-center gap-3 cursor-pointer transition-all select-none"
                  :class="cartState.paymentMethod === 'card' ? 'border-bubble-blue bg-bubble-blue-light/40 dark:bg-bubble-blue/20 ring-1 ring-bubble-blue font-bold' : 'border-bubble-dark/15 dark:border-[#24355a] bg-bubble-cream/30 dark:bg-[#0c1424]'"
                >
                  <input
                    type="radio"
                    name="cartPayment"
                    value="card"
                    v-model="cartState.paymentMethod"
                    class="w-4 h-4 text-bubble-blue accent-bubble-blue"
                  />
                  <span class="text-xl">💳</span>
                  <div>
                    <strong class="text-xs block">Банковской картой при получении</strong>
                    <span class="text-[10px] text-bubble-dark/60 dark:text-[#94a9c9]">Терминал у курьера или на кассе</span>
                  </div>
                </label>

                <label
                  class="p-3.5 rounded-xl border-2 flex items-center gap-3 cursor-pointer transition-all select-none"
                  :class="cartState.paymentMethod === 'cash' ? 'border-bubble-blue bg-bubble-blue-light/40 dark:bg-bubble-blue/20 ring-1 ring-bubble-blue font-bold' : 'border-bubble-dark/15 dark:border-[#24355a] bg-bubble-cream/30 dark:bg-[#0c1424]'"
                >
                  <input
                    type="radio"
                    name="cartPayment"
                    value="cash"
                    v-model="cartState.paymentMethod"
                    class="w-4 h-4 text-bubble-blue accent-bubble-blue"
                  />
                  <span class="text-xl">💵</span>
                  <div>
                    <strong class="text-xs block">Наличными при получении</strong>
                    <span class="text-[10px] text-bubble-dark/60 dark:text-[#94a9c9]">Оплата после проверки чистого белья</span>
                  </div>
                </label>
              </div>

              <div class="p-3 rounded-xl border border-bubble-dark/15 dark:border-[#24355a] bg-bubble-yellow/20 dark:bg-[#1a2640] flex items-center gap-2.5">
                <span class="text-base">🔒</span>
                <p class="text-[11px] text-bubble-dark/80 dark:text-[#94a9c9] font-medium leading-relaxed">
                  Без предоплаты: расчет производится строго по факту оказания услуг.
                </p>
              </div>
            </div>

            <div v-show="cartState.wizardStep === 4" class="space-y-4">
              <div class="p-4 rounded-xl border-2 border-bubble-dark/15 dark:border-[#24355a] bg-bubble-cream/40 dark:bg-[#0c1424] space-y-2 text-xs">
                <div class="flex justify-between border-b border-bubble-dark/10 dark:border-[#24355a] pb-1.5 font-bold">
                  <span class="text-bubble-dark/70 dark:text-[#94a9c9]">Комплекс услуг:</span>
                  <span class="font-black text-bubble-blue dark:text-bubble-blue-ice">{{ cartState.services.join(' + ') }}</span>
                </div>
                <div class="flex justify-between border-b border-bubble-dark/10 dark:border-[#24355a] pb-1.5">
                  <span class="text-bubble-dark/70 dark:text-[#94a9c9]">Вес:</span>
                  <span class="font-bold">{{ cartState.weight }} кг</span>
                </div>
                <div class="flex justify-between border-b border-bubble-dark/10 dark:border-[#24355a] pb-1.5">
                  <span class="text-bubble-dark/70 dark:text-[#94a9c9]">Получение:</span>
                  <span class="font-bold">{{ cartState.delivery === 'Курьер' ? 'Курьер (+5 BYN)' : cartState.branch }}</span>
                </div>
                <div v-if="cartState.delivery === 'Курьер' && cartState.address" class="flex justify-between border-b border-bubble-dark/10 dark:border-[#24355a] pb-1.5">
                  <span class="text-bubble-dark/70 dark:text-[#94a9c9]">Адрес:</span>
                  <span class="font-bold truncate max-w-[200px]">{{ cartState.address }}</span>
                </div>
                <div v-if="cartState.discountPercent > 0" class="flex justify-between border-b border-bubble-dark/10 dark:border-[#24355a] pb-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Скидка промокода:</span>
                  <span>-{{ cartState.discountPercent }}%</span>
                </div>
                <div class="flex justify-between pt-1 font-black text-sm">
                  <span>Итого к оплате:</span>
                  <span class="text-base text-bubble-blue dark:text-bubble-blue-ice">{{ computedCartPrice }} BYN</span>
                </div>
              </div>

              <button
                type="button"
                class="w-full inline-flex items-center justify-center min-h-[46px] px-6 rounded-full border-2 border-bubble-dark bg-bubble-yellow text-bubble-dark font-black text-xs shadow-brutal-btn hover:-translate-y-0.5 hover:shadow-brutal-btn-hover active:translate-y-0.5 transition-all disabled:opacity-50 cursor-pointer"
                :disabled="cartState.isSubmitting"
                @click="submitOrder"
              >
                <span v-if="cartState.isSubmitting">Отправка в систему...</span>
                <span v-else>Подтвердить и отправить заказ →</span>
              </button>
            </div>

          </div>
        </div>

        <div v-if="!cartState.orderSuccessMsg" class="p-4 border-t-2 border-bubble-dark/15 dark:border-[#24355a] bg-bubble-cream/50 dark:bg-[#0c1424] flex items-center justify-between">
          <button
            type="button"
            class="px-4 py-2 rounded-full border border-bubble-dark dark:border-[#24355a] text-xs font-black transition-all cursor-pointer"
            :class="cartState.wizardStep === 1 ? 'opacity-30 cursor-not-allowed' : 'bg-white dark:bg-[#131d33] text-bubble-dark dark:text-[#f1f5fd] hover:bg-bubble-cream'"
            :disabled="cartState.wizardStep === 1"
            @click="cartState.wizardStep--"
          >
            ← Назад
          </button>

          <div class="text-xs font-black text-bubble-dark dark:text-[#f1f5fd]">
            Итого: <span class="text-bubble-blue dark:text-bubble-blue-ice text-sm font-black">{{ computedCartPrice }} BYN</span>
          </div>

          <button
            v-if="cartState.wizardStep < 4"
            type="button"
            class="px-5 py-2 rounded-full border-2 border-bubble-dark bg-bubble-yellow text-bubble-dark font-black text-xs shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer disabled:opacity-40"
            :disabled="cartState.services.length === 0"
            @click="nextStep"
          >
            Далее →
          </button>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
import {
  cartState,
  serviceCatalog,
  computedCartPrice,
  closeCart,
  toggleService,
  applyPromoCode,
  resetCart,
  submitCartOrder
} from '../cartStore.js';

export default {
  name: 'CartDrawer',
  setup() {
    return {
      cartState,
      serviceCatalog,
      computedCartPrice,
      closeCart
    };
  },
  methods: {
    toggleService(name) {
      if (this.cartState.services.includes(name)) {
        if (this.cartState.services.length > 1) {
          this.cartState.services = this.cartState.services.filter(s => s !== name);
        }
      } else {
        this.cartState.services.push(name);
      }
    },
    adjustWeight(delta) {
      const next = this.cartState.weight + delta;
      if (next >= 1 && next <= 15) {
        this.cartState.weight = next;
      }
    },
    applyPromo() {
      applyPromoCode();
    },
    nextStep() {
      if (this.cartState.wizardStep === 1) {
        if (this.cartState.services.length === 0) {
          alert('Пожалуйста, выберите хотя бы одну услугу');
          return;
        }
      }
      if (this.cartState.wizardStep === 2) {
        if (!this.cartState.phone || this.cartState.phone.trim().length < 5) {
          alert('Пожалуйста, укажите номер телефона');
          return;
        }
      }
      this.cartState.wizardStep++;
    },
    async submitOrder() {
      await submitCartOrder();
    },
    handleDone() {
      resetCart();
      closeCart();
    }
  }
};
</script>
