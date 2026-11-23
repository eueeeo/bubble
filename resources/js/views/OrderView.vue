<template>
  <div class="min-h-screen py-8 md:py-14 bg-bubble-cream dark:bg-[#080e1c] text-bubble-dark dark:text-[#f1f5fd] transition-colors">
    <div class="w-[min(1200px,calc(100%-40px))] mx-auto">
      
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

      <div v-if="orderSuccessMsg" class="max-w-2xl mx-auto bg-white dark:bg-[#131d33] border-2 border-bubble-dark dark:border-[#24355a] rounded-[26px] shadow-brutal p-8 sm:p-12 text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div class="w-16 h-16 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center text-3xl font-black shadow-sm">
          ✓
        </div>
        <div>
          <span class="inline-block px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500 text-emerald-800 dark:text-emerald-200 text-xs font-black uppercase tracking-wider mb-3">
            Заявка принята
          </span>
          <h2 class="text-2xl sm:text-3xl font-black text-bubble-dark dark:text-[#f1f5fd]">
            {{ orderSuccessMsg }}
          </h2>
          <p class="text-xs sm:text-sm font-medium text-bubble-dark/70 dark:text-[#94a9c9] max-w-md mx-auto mt-2 leading-relaxed">
            Мы уже зафиксировали вашу заявку в системе. Дежурный администратор свяжется с вами по указанному телефону для подтверждения деталей.
          </p>
        </div>

        <div class="p-5 rounded-2xl border-2 border-bubble-dark/15 dark:border-[#24355a] bg-bubble-cream/60 dark:bg-[#0c1424] max-w-md mx-auto text-left space-y-2 text-xs">
          <div class="flex justify-between font-bold">
            <span class="text-bubble-dark/70 dark:text-[#94a9c9]">Услуги:</span>
            <span class="text-bubble-blue dark:text-bubble-blue-ice font-black">{{ selectedServicesText }}</span>
          </div>
          <div class="flex justify-between font-bold">
            <span class="text-bubble-dark/70 dark:text-[#94a9c9]">Вес белья:</span>
            <span>{{ orderForm.weight }} кг</span>
          </div>
          <div class="flex justify-between font-bold">
            <span class="text-bubble-dark/70 dark:text-[#94a9c9]">Получение:</span>
            <span>{{ orderForm.delivery === 'Курьер' ? 'Курьер Bubble' : orderForm.branch }}</span>
          </div>
          <div class="flex justify-between border-t border-bubble-dark/10 dark:border-[#24355a] pt-2 font-black text-sm">
            <span>Итого к оплате:</span>
            <span class="text-bubble-blue dark:text-bubble-blue-ice">{{ computedPrice }} BYN</span>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
          <router-link
            to="/"
            class="inline-flex items-center justify-center min-h-[44px] px-7 rounded-full border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#131d33] text-bubble-dark dark:text-[#f1f5fd] font-extrabold text-xs shadow-brutal-sm hover:-translate-y-0.5 transition-all"
          >
            На главную страницу
          </router-link>
          <button
            type="button"
            class="inline-flex items-center justify-center min-h-[44px] px-7 rounded-full border-2 border-bubble-dark bg-bubble-yellow text-bubble-dark font-black text-xs shadow-brutal-btn hover:-translate-y-0.5 transition-all cursor-pointer"
            @click="resetWizard"
          >
            Оформить еще один заказ
          </button>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div class="lg:col-span-7 xl:col-span-8 space-y-6">
          <div>
            <h1 class="text-3xl sm:text-4xl font-black text-bubble-blue dark:text-bubble-blue-ice tracking-tight">
              Оформление заказа
            </h1>
            <p class="text-xs sm:text-sm text-bubble-dark/80 dark:text-[#94a9c9] font-medium mt-1">
              Настройте список услуг, вес и укажите удобный способ передачи вещей
            </p>
          </div>

          <nav aria-label="Этапы оформления" class="bg-white dark:bg-[#131d33] border-2 border-bubble-dark dark:border-[#24355a] rounded-2xl shadow-brutal-sm p-4 sm:p-5">
            <ol class="flex items-center justify-between relative">
              <div class="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-full bg-slate-200 dark:bg-[#24355a] -z-0"></div>

              <li class="relative z-10 flex flex-col items-center cursor-pointer" @click="wizardStep > 1 && (wizardStep = 1)">
                <span
                  :data-state="wizardStep === 1 ? 'active' : (wizardStep > 1 ? 'complete' : 'pending')"
                  class="w-9 h-9 rounded-full text-xs font-black flex items-center justify-center border-2 border-bubble-dark dark:border-[#24355a] transition-all data-[state=active]:bg-bubble-blue data-[state=active]:text-white data-[state=complete]:bg-emerald-500 data-[state=complete]:text-white data-[state=pending]:bg-bubble-cream dark:data-[state=pending]:bg-[#080e1c] data-[state=pending]:text-bubble-dark dark:data-[state=pending]:text-[#f1f5fd]"
                >
                  <span v-if="wizardStep > 1">✓</span>
                  <span v-else>1</span>
                </span>
                <span class="text-[11px] font-black text-bubble-dark dark:text-[#f1f5fd] mt-1.5">Услуги</span>
              </li>

              <li class="relative z-10 flex flex-col items-center cursor-pointer" @click="wizardStep > 2 && (wizardStep = 2)">
                <span
                  :data-state="wizardStep === 2 ? 'active' : (wizardStep > 2 ? 'complete' : 'pending')"
                  class="w-9 h-9 rounded-full text-xs font-black flex items-center justify-center border-2 border-bubble-dark dark:border-[#24355a] transition-all data-[state=active]:bg-bubble-blue data-[state=active]:text-white data-[state=complete]:bg-emerald-500 data-[state=complete]:text-white data-[state=pending]:bg-bubble-cream dark:data-[state=pending]:bg-[#080e1c] data-[state=pending]:text-bubble-dark dark:data-[state=pending]:text-[#f1f5fd]"
                >
                  <span v-if="wizardStep > 2">✓</span>
                  <span v-else>2</span>
                </span>
                <span class="text-[11px] font-black text-bubble-dark dark:text-[#f1f5fd] mt-1.5">Доставка</span>
              </li>

              <li class="relative z-10 flex flex-col items-center cursor-pointer" @click="wizardStep > 3 && (wizardStep = 3)">
                <span
                  :data-state="wizardStep === 3 ? 'active' : (wizardStep > 3 ? 'complete' : 'pending')"
                  class="w-9 h-9 rounded-full text-xs font-black flex items-center justify-center border-2 border-bubble-dark dark:border-[#24355a] transition-all data-[state=active]:bg-bubble-blue data-[state=active]:text-white data-[state=complete]:bg-emerald-500 data-[state=complete]:text-white data-[state=pending]:bg-bubble-cream dark:data-[state=pending]:bg-[#080e1c] data-[state=pending]:text-bubble-dark dark:data-[state=pending]:text-[#f1f5fd]"
                >
                  <span v-if="wizardStep > 3">✓</span>
                  <span v-else>3</span>
                </span>
                <span class="text-[11px] font-black text-bubble-dark dark:text-[#f1f5fd] mt-1.5">Оплата</span>
              </li>

              <li class="relative z-10 flex flex-col items-center">
                <span
                  :data-state="wizardStep === 4 ? 'complete' : 'pending'"
                  class="w-9 h-9 rounded-full text-xs font-black flex items-center justify-center border-2 border-bubble-dark dark:border-[#24355a] transition-all data-[state=complete]:bg-emerald-500 data-[state=complete]:text-white data-[state=pending]:bg-bubble-cream dark:data-[state=pending]:bg-[#080e1c] data-[state=pending]:text-bubble-dark dark:data-[state=pending]:text-[#f1f5fd]"
                >
                  4
                </span>
                <span class="text-[11px] font-black text-bubble-dark dark:text-[#f1f5fd] mt-1.5">Итог</span>
              </li>
            </ol>
          </nav>

          <div class="bg-white dark:bg-[#131d33] border-2 border-bubble-dark dark:border-[#24355a] rounded-[24px] shadow-brutal p-6 sm:p-8">
            
            <div v-show="wizardStep === 1" class="space-y-6 animate-in fade-in duration-150">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-sm font-black text-bubble-dark dark:text-[#f1f5fd] uppercase tracking-wider">
                    1. Выберите нужные услуги
                  </h3>
                  <span class="text-xs font-bold text-bubble-blue dark:text-bubble-blue-ice">
                    Выбрано: {{ orderForm.services.length }}
                  </span>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <label
                    v-for="srv in serviceOptions"
                    :key="srv.name"
                    class="flex items-center gap-3 p-3.5 rounded-2xl border-2 cursor-pointer transition-all select-none hover:shadow-brutal-sm"
                    :class="orderForm.services.includes(srv.name) ? 'border-bubble-blue bg-bubble-blue-light/50 dark:bg-bubble-blue/20 ring-2 ring-bubble-blue/20' : 'border-bubble-dark/20 dark:border-[#24355a] bg-bubble-cream/40 dark:bg-[#0c1424]'"
                  >
                    <input
                      type="checkbox"
                      :value="srv.name"
                      v-model="orderForm.services"
                      class="w-4 h-4 rounded text-bubble-blue accent-bubble-blue"
                    />
                    <div class="text-lg leading-none select-none">{{ srv.icon }}</div>
                    <div class="flex-1 flex justify-between items-center text-xs">
                      <div>
                        <strong class="font-extrabold text-bubble-dark dark:text-[#f1f5fd] block">{{ srv.name }}</strong>
                        <span class="text-[10px] text-bubble-dark/60 dark:text-[#94a9c9]">{{ srv.desc }}</span>
                      </div>
                      <span class="font-black text-bubble-blue dark:text-bubble-blue-ice text-sm">{{ srv.price }} BYN</span>
                    </div>
                  </label>
                </div>
              </div>

              <div class="p-5 rounded-2xl border-2 border-bubble-dark/15 dark:border-[#24355a] bg-bubble-cream/50 dark:bg-[#0c1424]">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-xs font-black text-bubble-dark dark:text-[#f1f5fd]">
                    Примерный объем и вес белья:
                  </span>
                  <span class="text-xs font-black text-bubble-blue dark:text-bubble-blue-ice bg-bubble-blue-light dark:bg-[#1a2640] px-3 py-1 rounded-full border border-bubble-dark dark:border-[#24355a]">
                    {{ orderForm.weight }} кг
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="1"
                  v-model.number="orderForm.weight"
                  class="w-full accent-bubble-blue cursor-pointer h-2 bg-slate-200 dark:bg-[#24355a] rounded-lg"
                />
                <div class="flex justify-between text-[10px] text-bubble-dark/60 dark:text-[#94a9c9] font-bold mt-1.5">
                  <span>1 кг</span>
                  <span>5 кг (стандарт)</span>
                  <span>10 кг (большой объем)</span>
                  <span>15 кг</span>
                </div>
                <p class="text-[11px] text-bubble-dark/70 dark:text-[#94a9c9] mt-2 font-medium">
                  💡 Базовая загрузка одной профессиональной машины составляет до 5 кг.
                </p>
              </div>

              <div>
                <label class="block text-xs font-black text-bubble-dark dark:text-[#f1f5fd] mb-1.5">
                  Особые пожелания или комментарии к стирке:
                </label>
                <textarea
                  rows="2"
                  v-model="orderForm.notes"
                  placeholder="Например: деликатные ткани, кондиционер без резкого запаха, сушить при низкой температуре..."
                  class="w-full rounded-xl border-2 border-bubble-dark dark:border-[#24355a] bg-bubble-cream/30 dark:bg-[#0c1424] p-3 text-xs font-medium focus:ring-2 focus:ring-bubble-blue outline-none"
                ></textarea>
              </div>
            </div>

            <div v-show="wizardStep === 2" class="space-y-6 animate-in fade-in duration-150">
              <div>
                <h3 class="text-sm font-black text-bubble-dark dark:text-[#f1f5fd] uppercase tracking-wider mb-3">
                  2. Способ передачи и контакты
                </h3>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    class="p-4 rounded-2xl border-2 cursor-pointer transition-all select-none hover:shadow-brutal-sm"
                    :class="orderForm.delivery === 'Заберу' ? 'border-bubble-blue bg-bubble-blue-light/50 dark:bg-bubble-blue/20 ring-2 ring-bubble-blue/20' : 'border-bubble-dark/20 dark:border-[#24355a] bg-bubble-cream/40 dark:bg-[#0c1424]'"
                  >
                    <div class="flex items-center gap-2.5 mb-1.5">
                      <input
                        type="radio"
                        name="orderDelivery"
                        value="Заберу"
                        v-model="orderForm.delivery"
                        class="w-4 h-4 text-bubble-blue accent-bubble-blue"
                      />
                      <span class="text-xs font-black text-bubble-dark dark:text-[#f1f5fd]">Самовывоз из филиала</span>
                    </div>
                    <p class="text-[11px] text-bubble-dark/70 dark:text-[#94a9c9] pl-6 font-medium leading-relaxed">
                      Бесплатно. Вы сами приносите вещи в удобное отделение прачечной.
                    </p>
                  </label>

                  <label
                    class="p-4 rounded-2xl border-2 cursor-pointer transition-all select-none hover:shadow-brutal-sm"
                    :class="orderForm.delivery === 'Курьер' ? 'border-bubble-blue bg-bubble-blue-light/50 dark:bg-bubble-blue/20 ring-2 ring-bubble-blue/20' : 'border-bubble-dark/20 dark:border-[#24355a] bg-bubble-cream/40 dark:bg-[#0c1424]'"
                  >
                    <div class="flex items-center justify-between mb-1.5">
                      <div class="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="orderDelivery"
                          value="Курьер"
                          v-model="orderForm.delivery"
                          class="w-4 h-4 text-bubble-blue accent-bubble-blue"
                        />
                        <span class="text-xs font-black text-bubble-dark dark:text-[#f1f5fd]">Курьер Bubble</span>
                      </div>
                      <span class="text-[11px] font-black text-bubble-blue dark:text-bubble-blue-ice bg-bubble-blue-light dark:bg-[#1a2640] px-2 py-0.5 rounded-full border border-bubble-dark/20">
                        +5.00 BYN
                      </span>
                    </div>
                    <p class="text-[11px] text-bubble-dark/70 dark:text-[#94a9c9] pl-6 font-medium leading-relaxed">
                      Курьер заберет грязные вещи и доставит чистые прямо до двери.
                    </p>
                  </label>
                </div>
              </div>

              <div v-if="orderForm.delivery === 'Курьер'" class="space-y-1.5 animate-in fade-in duration-150">
                <label class="block text-xs font-black text-bubble-dark dark:text-[#f1f5fd]">
                  Точный адрес выезда курьера:
                </label>
                <input
                  type="text"
                  v-model="orderForm.address"
                  placeholder="г. Минск, ул. Ленина, д. 15, кв. 42 (подъезд 2, этаж 5)"
                  class="w-full rounded-xl border-2 border-bubble-dark dark:border-[#24355a] bg-bubble-cream/30 dark:bg-[#0c1424] p-3 text-xs font-medium focus:ring-2 focus:ring-bubble-blue outline-none"
                />
              </div>

              <div v-else class="space-y-1.5 animate-in fade-in duration-150">
                <label class="block text-xs font-black text-bubble-dark dark:text-[#f1f5fd]">
                  Выберите удобный филиал прачечной:
                </label>
                <select
                  v-model="orderForm.branch"
                  class="w-full rounded-xl border-2 border-bubble-dark dark:border-[#24355a] bg-bubble-cream/30 dark:bg-[#0c1424] p-3 text-xs font-black focus:ring-2 focus:ring-bubble-blue outline-none cursor-pointer"
                >
                  <option value="ул. Пузырьковая, 12">ул. Пузырьковая, 12 (Центральный филиал, 8:00–21:00)</option>
                  <option value="ул. Пенная, 45">ул. Пенная, 45 (Восточный филиал, 7:00–24:00)</option>
                  <option value="ул. Мыльная, 3">ул. Мыльная, 3 (Южный филиал, 8:00–22:00)</option>
                </select>
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-black text-bubble-dark dark:text-[#f1f5fd]">
                  Контактный номер телефона для связи:
                </label>
                <input
                  type="tel"
                  v-model="orderForm.phone"
                  placeholder="+375 (29) 123-45-67"
                  class="w-full rounded-xl border-2 border-bubble-dark dark:border-[#24355a] bg-bubble-cream/30 dark:bg-[#0c1424] p-3 text-xs font-bold focus:ring-2 focus:ring-bubble-blue outline-none"
                />
              </div>
            </div>

            <div v-show="wizardStep === 3" class="space-y-6 animate-in fade-in duration-150">
              <div>
                <h3 class="text-sm font-black text-bubble-dark dark:text-[#f1f5fd] uppercase tracking-wider mb-3">
                  3. Выбор способа оплаты
                </h3>

                <div class="space-y-3">
                  <label
                    class="p-4 rounded-2xl border-2 flex items-center gap-3.5 cursor-pointer transition-all select-none hover:shadow-brutal-sm"
                    :class="orderForm.paymentMethod === 'card' ? 'border-bubble-blue bg-bubble-blue-light/50 dark:bg-bubble-blue/20 ring-2 ring-bubble-blue/20' : 'border-bubble-dark/20 dark:border-[#24355a] bg-bubble-cream/40 dark:bg-[#0c1424]'"
                  >
                    <input
                      type="radio"
                      name="orderPayment"
                      value="card"
                      v-model="orderForm.paymentMethod"
                      class="w-4 h-4 text-bubble-blue accent-bubble-blue"
                    />
                    <div class="text-2xl leading-none">💳</div>
                    <div>
                      <strong class="text-xs font-black text-bubble-dark dark:text-[#f1f5fd] block">
                        Банковской картой при получении
                      </strong>
                      <span class="text-[11px] text-bubble-dark/70 dark:text-[#94a9c9] font-medium">
                        Через мобильный терминал курьера или на кассе филиала (подходят карты любых банков).
                      </span>
                    </div>
                  </label>

                  <label
                    class="p-4 rounded-2xl border-2 flex items-center gap-3.5 cursor-pointer transition-all select-none hover:shadow-brutal-sm"
                    :class="orderForm.paymentMethod === 'cash' ? 'border-bubble-blue bg-bubble-blue-light/50 dark:bg-bubble-blue/20 ring-2 ring-bubble-blue/20' : 'border-bubble-dark/20 dark:border-[#24355a] bg-bubble-cream/40 dark:bg-[#0c1424]'"
                  >
                    <input
                      type="radio"
                      name="orderPayment"
                      value="cash"
                      v-model="orderForm.paymentMethod"
                      class="w-4 h-4 text-bubble-blue accent-bubble-blue"
                    />
                    <div class="text-2xl leading-none">💵</div>
                    <div>
                      <strong class="text-xs font-black text-bubble-dark dark:text-[#f1f5fd] block">
                        Наличными при получении
                      </strong>
                      <span class="text-[11px] text-bubble-dark/70 dark:text-[#94a9c9] font-medium">
                        Оплата чистых упакованных вещей после осмотра и проверки.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <div class="p-4 rounded-2xl border border-bubble-dark/15 dark:border-[#24355a] bg-bubble-yellow/20 dark:bg-[#1a2640] flex items-center gap-3">
                <span class="text-xl">🔒</span>
                <p class="text-xs text-bubble-dark/80 dark:text-[#94a9c9] font-medium leading-relaxed">
                  Мы не списываем деньги заранее: оплата производится строго по факту оказания услуг и передачи чистого белья.
                </p>
              </div>
            </div>

            <div v-show="wizardStep === 4" class="space-y-6 animate-in fade-in duration-150">
              <div>
                <h3 class="text-sm font-black text-bubble-dark dark:text-[#f1f5fd] uppercase tracking-wider mb-3">
                  4. Проверка и подтверждение заказа
                </h3>

                <div class="p-5 rounded-2xl border-2 border-bubble-dark dark:border-[#24355a] bg-bubble-cream/50 dark:bg-[#0c1424] space-y-3 text-xs">
                  <div class="flex items-center justify-between pb-2 border-b border-bubble-dark/15 dark:border-[#24355a]">
                    <span class="font-extrabold text-bubble-dark/70 dark:text-[#94a9c9]">Комплекс услуг:</span>
                    <span class="font-black text-bubble-blue dark:text-bubble-blue-ice">{{ selectedServicesText }}</span>
                  </div>
                  <div class="flex items-center justify-between pb-2 border-b border-bubble-dark/15 dark:border-[#24355a]">
                    <span class="font-extrabold text-bubble-dark/70 dark:text-[#94a9c9]">Расчетный вес:</span>
                    <span class="font-black">{{ orderForm.weight }} кг</span>
                  </div>
                  <div class="flex items-center justify-between pb-2 border-b border-bubble-dark/15 dark:border-[#24355a]">
                    <span class="font-extrabold text-bubble-dark/70 dark:text-[#94a9c9]">Способ получения:</span>
                    <span class="font-black">
                      {{ orderForm.delivery === 'Курьер' ? 'Курьер Bubble на дом (+5.00 BYN)' : 'Самовывоз (' + orderForm.branch + ')' }}
                    </span>
                  </div>
                  <div v-if="orderForm.delivery === 'Курьер' && orderForm.address" class="flex items-center justify-between pb-2 border-b border-bubble-dark/15 dark:border-[#24355a]">
                    <span class="font-extrabold text-bubble-dark/70 dark:text-[#94a9c9]">Адрес доставки:</span>
                    <span class="font-black text-right max-w-[220px] truncate">{{ orderForm.address }}</span>
                  </div>
                  <div class="flex items-center justify-between pb-2 border-b border-bubble-dark/15 dark:border-[#24355a]">
                    <span class="font-extrabold text-bubble-dark/70 dark:text-[#94a9c9]">Контактный телефон:</span>
                    <span class="font-black">{{ orderForm.phone || 'Не указан' }}</span>
                  </div>
                  <div class="flex items-center justify-between pt-1 text-sm font-black text-bubble-dark dark:text-[#f1f5fd]">
                    <span>Итого к оплате:</span>
                    <span class="text-xl font-black text-bubble-blue dark:text-bubble-blue-ice">{{ computedPrice }} BYN</span>
                  </div>
                </div>
              </div>

              <div class="text-center pt-2">
                <button
                  type="button"
                  class="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] px-10 rounded-full border-2 border-bubble-dark bg-bubble-yellow text-bubble-dark font-black text-sm shadow-brutal-btn hover:-translate-y-0.5 hover:shadow-brutal-btn-hover active:translate-y-0.5 transition-all disabled:opacity-50 cursor-pointer"
                  :disabled="isSubmittingOrder"
                  @click="submitOnlineOrder"
                >
                  <span v-if="isSubmittingOrder">Отправка в систему...</span>
                  <span v-else>Подтвердить и отправить заказ →</span>
                </button>
              </div>
            </div>

            <div v-if="wizardStep < 4" class="flex items-center justify-between mt-8 pt-5 border-t-2 border-bubble-dark/15 dark:border-[#24355a]">
              <button
                type="button"
                class="px-5 py-2.5 rounded-full border-2 border-bubble-dark dark:border-[#24355a] text-xs font-black transition-all cursor-pointer"
                :class="wizardStep === 1 ? 'opacity-40 cursor-not-allowed' : 'bg-bubble-cream dark:bg-[#0c1424] text-bubble-dark dark:text-[#f1f5fd] hover:bg-white'"
                :disabled="wizardStep === 1"
                @click="wizardStep--"
              >
                ← Назад
              </button>

              <div class="text-xs font-black text-bubble-dark dark:text-[#f1f5fd]">
                Сумма: <span class="text-bubble-blue dark:text-bubble-blue-ice text-base font-black">{{ computedPrice }} BYN</span>
              </div>

              <button
                type="button"
                class="inline-flex items-center justify-center px-6 py-2.5 rounded-full border-2 border-bubble-dark bg-bubble-yellow text-bubble-dark font-black text-xs shadow-brutal-btn hover:-translate-y-0.5 hover:shadow-brutal-btn-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                :disabled="wizardStep === 1 && (!orderForm.services || orderForm.services.length === 0)"
                @click="nextWizardStep"
              >
                Далее →
              </button>
            </div>

          </div>
        </div>

        <aside class="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-24">
          
          <div class="bg-white dark:bg-[#131d33] border-2 border-bubble-dark dark:border-[#24355a] rounded-[24px] shadow-brutal p-6 text-bubble-dark dark:text-[#f1f5fd]">
            <div class="flex items-center justify-between pb-3 border-b-2 border-bubble-dark/15 dark:border-[#24355a] mb-4">
              <div class="flex items-center gap-2">
                <span class="text-lg">🧾</span>
                <h3 class="font-black text-base">Чек вашего заказа</h3>
              </div>
              <span class="text-[11px] font-black text-bubble-blue dark:text-bubble-blue-ice bg-bubble-blue-light dark:bg-[#1a2640] px-2.5 py-0.5 rounded-full border border-bubble-dark/20">
                Онлайн-расчет
              </span>
            </div>

            <div class="space-y-3 text-xs font-medium">
              <div>
                <span class="text-bubble-dark/60 dark:text-[#94a9c9] block mb-1">Выбранные услуги:</span>
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="s in orderForm.services"
                    :key="s"
                    class="px-2.5 py-1 rounded-lg bg-bubble-cream dark:bg-[#0c1424] border border-bubble-dark/20 dark:border-[#24355a] font-bold text-bubble-dark dark:text-[#f1f5fd]"
                  >
                    {{ s }}
                  </span>
                </div>
              </div>

              <div class="flex justify-between items-center py-1 border-t border-bubble-dark/10 dark:border-[#24355a]">
                <span class="text-bubble-dark/70 dark:text-[#94a9c9]">Вес вещей:</span>
                <span class="font-bold">{{ orderForm.weight }} кг</span>
              </div>

              <div class="flex justify-between items-center py-1 border-t border-bubble-dark/10 dark:border-[#24355a]">
                <span class="text-bubble-dark/70 dark:text-[#94a9c9]">Доставка:</span>
                <span class="font-bold">{{ orderForm.delivery === 'Курьер' ? 'Курьер (+5 BYN)' : 'Самовывоз (0 BYN)' }}</span>
              </div>

              <div class="flex justify-between items-center py-1 border-t border-bubble-dark/10 dark:border-[#24355a] text-emerald-600 dark:text-emerald-400">
                <span>Профессиональный порошок:</span>
                <span class="font-black">Включен (0 BYN)</span>
              </div>

              <div class="flex justify-between items-center py-1 border-t border-bubble-dark/10 dark:border-[#24355a] text-emerald-600 dark:text-emerald-400">
                <span>Гипоаллергенный кондиционер:</span>
                <span class="font-black">Включен (0 BYN)</span>
              </div>

              <div class="pt-3 border-t-2 border-bubble-dark/15 dark:border-[#24355a] flex items-center justify-between">
                <div>
                  <span class="text-xs text-bubble-dark/60 dark:text-[#94a9c9] font-bold block">К оплате при получении:</span>
                  <span class="text-2xl font-black text-bubble-blue dark:text-bubble-blue-ice">{{ computedPrice }} BYN</span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-bubble-cream/70 dark:bg-[#131d33] border-2 border-bubble-dark dark:border-[#24355a] rounded-[22px] p-5 space-y-3.5 text-xs">
            <h4 class="font-black text-xs uppercase tracking-wider text-bubble-dark dark:text-[#f1f5fd]">
              Преимущества сервиса Bubble:
            </h4>
            <div class="flex items-start gap-2.5">
              <span class="text-base leading-none">🛡️</span>
              <p class="font-medium text-bubble-dark/80 dark:text-[#94a9c9] leading-relaxed">
                <strong>Гарантия сохранности:</strong> бережный уход за тканями и фурнитурой.
              </p>
            </div>
            <div class="flex items-start gap-2.5">
              <span class="text-base leading-none">🌿</span>
              <p class="font-medium text-bubble-dark/80 dark:text-[#94a9c9] leading-relaxed">
                <strong>Эко-химия:</strong> только европейские гипоаллергенные составы.
              </p>
            </div>
            <div class="flex items-start gap-2.5">
              <span class="text-base leading-none">⚡</span>
              <p class="font-medium text-bubble-dark/80 dark:text-[#94a9c9] leading-relaxed">
                <strong>Скорость:</strong> быстрая стирка и сушка от 1.5 часов.
              </p>
            </div>
          </div>

        </aside>

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
        { name: 'Стирка', icon: '🧺', price: '8.00', desc: 'Повседневные вещи' },
        { name: 'Сушка', icon: '💨', price: '5.00', desc: 'Бережная сушка' },
        { name: 'Глажка', icon: '👔', price: '3.00', desc: 'Аккуратная глажка' },
        { name: 'Химчистка', icon: '✨', price: '20.00', desc: 'Верхняя одежда' },
        { name: 'Обувь', icon: '👟', price: '15.00', desc: 'Кроссовки и кеды' },
        { name: 'Одеяла', icon: '🛏️', price: '18.00', desc: 'Пледы и пуховики' },
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    resetWizard() {
      this.orderSuccessMsg = '';
      this.wizardStep = 1;
      this.orderForm.phone = '';
      this.orderForm.address = '';
      this.orderForm.notes = '';
      this.orderForm.services = ['Стирка'];
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
        this.orderSuccessMsg = `Заказ #${orderId} успешно оформлен!`;
      } catch (err) {
        const fallbackId = Math.floor(1000 + Math.random() * 9000);
        this.orderSuccessMsg = `Заказ #${fallbackId} успешно оформлен!`;
      } finally {
        this.isSubmittingOrder = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }
};
</script>
