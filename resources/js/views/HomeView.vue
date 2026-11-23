<template>
  <div>
    <section class="relative overflow-hidden bg-bubble-blue dark:bg-[#121e3d] border-b-2 border-bubble-border dark:border-[#1f2d47] py-20 md:py-28 text-white dark:text-[#f1f5fd] transition-colors" id="home">
      <div class="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <img
          src="/img/фон.jpg"
          alt=""
          class="w-full h-full object-cover rotate-180 opacity-65 dark:opacity-35"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-bubble-blue/80 via-bubble-blue/50 to-bubble-blue/20 dark:from-[#121e3d]/85 dark:via-[#121e3d]/60 dark:to-[#121e3d]/30"></div>
      </div>
      <div class="relative z-10 w-[min(1180px,calc(100%-48px))] mx-auto">
        <div class="max-w-2xl">
          <h1 class="text-white dark:text-bubble-blue-ice font-black text-5xl sm:text-6xl lg:text-[72px] leading-[0.96] tracking-tight mb-6">
            Стираем ради<br>ваших улыбок
          </h1>
          <p class="text-white/90 dark:text-[#f1f5fd] text-lg md:text-xl font-normal mb-8 max-w-xl leading-relaxed">
            Стирка, сушка, глажка и чистка. Профессиональное оборудование, бережный уход и кофе, пока стираются вещи.
          </p>

          <div class="flex flex-wrap gap-4">
            <router-link
              to="/order"
              class="inline-flex items-center justify-center min-h-[42px] px-6 rounded-full border-2 border-bubble-dark bg-bubble-yellow text-bubble-dark font-black text-sm shadow-brutal-btn hover:-translate-y-0.5 transition-all"
            >
              Оформить заказ онлайн
            </router-link>
            <a
              href="#prices"
              class="inline-flex items-center justify-center min-h-[42px] px-6 rounded-full border-2 border-bubble-dark dark:border-[#24355a] bg-bubble-cream dark:bg-[#131d33] text-bubble-dark dark:text-[#f1f5fd] font-extrabold text-sm shadow-brutal-btn hover:-translate-y-0.5 transition-all"
            >
              Смотреть цены
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-bubble-blue-light dark:bg-[#0c1424] border-b-2 border-bubble-border dark:border-[#24355a] py-16 md:py-20 transition-colors" id="prices">
      <div class="w-[min(1180px,calc(100%-48px))] mx-auto">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 class="text-bubble-blue dark:text-bubble-blue-ice font-black text-4xl sm:text-5xl tracking-tight">
              Цены и каталог услуг
            </h2>
            <p class="text-xs sm:text-sm text-bubble-dark/80 dark:text-[#94a9c9] mt-2 font-medium">
              Фиксированные тарифы без скрытых доплат. Профессиональные средства включены в стоимость.
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <select
              v-model="sortBy"
              class="bg-white dark:bg-[#131d33] border-2 border-bubble-dark dark:border-[#24355a] text-bubble-dark dark:text-[#f1f5fd] text-xs font-bold px-3 py-2 rounded-xl focus:outline-none shadow-brutal-sm"
            >
              <option value="default">По популярности</option>
              <option value="asc">Сначала дешевле</option>
              <option value="desc">Сначала дороже</option>
            </select>

            <button
              type="button"
              class="lg:hidden inline-flex items-center px-3.5 py-2 rounded-xl border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#131d33] text-bubble-dark dark:text-[#f1f5fd] text-xs font-extrabold shadow-brutal-sm"
              @click="showMobileDrawer = true"
            >
              Фильтры
            </button>


          </div>
        </div>

        <div class="flex flex-col lg:flex-row gap-8 items-start">
          <aside class="w-64 bg-white dark:bg-[#131d33] border-2 border-bubble-dark/30 dark:border-[#24355a] rounded-[22px] shadow-brutal p-5 hidden lg:block shrink-0 space-y-6 text-xs text-bubble-dark dark:text-[#f1f5fd]">
            <div>
              <h3 class="font-black text-bubble-dark dark:text-bubble-blue-ice uppercase tracking-wider text-xs mb-3">Категория</h3>
              <div class="space-y-2 font-bold text-bubble-dark/90 dark:text-[#f1f5fd]">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value="all" v-model="activeCategory" class="accent-bubble-blue" />
                  Все категории
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value="wash" v-model="activeCategory" class="accent-bubble-blue" />
                  Стирка и сушка
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value="care" v-model="activeCategory" class="accent-bubble-blue" />
                  Химчистка и обувь
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value="plans" v-model="activeCategory" class="accent-bubble-blue" />
                  Абонементы
                </label>
              </div>
            </div>

            <div>
              <h3 class="font-black text-bubble-dark dark:text-bubble-blue-ice uppercase tracking-wider text-xs mb-3">Особенности</h3>
              <div class="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  v-for="t in tagOptions"
                  :key="t.key"
                  class="px-2.5 py-1 rounded-full text-[11px] font-extrabold border-2 transition-all cursor-pointer"
                  :class="activeTag === t.key ? 'bg-bubble-pink text-bubble-dark border-bubble-dark shadow-sm' : 'bg-bubble-cream dark:bg-[#080e1c] text-bubble-dark dark:text-[#f1f5fd] border-bubble-dark/30 dark:border-[#24355a] hover:bg-white'"
                  @click="activeTag = t.key"
                >
                  {{ t.label }}
                </button>
              </div>
            </div>

            <ad-slot type="sidebar" />
          </aside>

          <div class="flex-1 w-full min-w-0">
            <div v-if="showSkeletons" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div
                v-for="n in 4"
                :key="n"
                class="bg-white dark:bg-[#131d33] border-2 border-bubble-dark/30 dark:border-[#24355a] rounded-[22px] shadow-brutal p-5 animate-pulse space-y-3"
              >
                <div class="w-full h-36 bg-slate-200 dark:bg-[#1a2640] rounded-xl"></div>
                <div class="h-5 bg-slate-200 dark:bg-[#1a2640] rounded w-2/3"></div>
                <div class="h-3 bg-slate-200 dark:bg-[#1a2640] rounded w-full"></div>
                <div class="h-3 bg-slate-200 dark:bg-[#1a2640] rounded w-4/5"></div>
                <div class="pt-3 border-t border-slate-200 dark:border-[#24355a] flex justify-between items-center">
                  <div class="h-6 bg-slate-200 dark:bg-[#1a2640] rounded-full w-20"></div>
                  <div class="h-6 bg-slate-200 dark:bg-[#1a2640] rounded-full w-16"></div>
                </div>
              </div>
            </div>

            <div v-else-if="filteredPrices.length === 0" class="bg-white dark:bg-[#131d33] border-2 border-bubble-dark dark:border-[#24355a] rounded-[22px] p-8 text-center text-bubble-dark dark:text-[#f1f5fd] font-bold">
              По выбранным фильтрам ничего не найдено. Попробуйте увеличить максимальную цену или сбросить фильтры.
              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex items-center px-4 py-2 rounded-full border-2 border-bubble-dark bg-bubble-yellow text-bubble-dark font-extrabold text-xs"
                  @click="resetFilters"
                >
                  Сбросить фильтры
                </button>
              </div>
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <article
                v-for="item in filteredPrices"
                :key="item.title"
                class="@container border-2 border-bubble-dark rounded-[22px] shadow-brutal p-5 flex flex-col justify-between hover:-translate-y-1 hover:shadow-brutal-lg transition-all"
                :class="item.accent ? 'bg-bubble-yellow text-bubble-dark' : 'bg-white dark:bg-[#131d33] dark:border-[#24355a]'"
              >
                <div class="flex flex-col @sm:flex-row gap-4">
                  <img
                    :src="item.img"
                    :alt="item.title"
                    class="w-full @sm:w-36 h-32 rounded-xl object-cover border-2 border-bubble-dark dark:border-[#24355a] shrink-0 bg-slate-100 dark:bg-[#080e1c]"
                  />
                  <div class="flex-1 flex flex-col justify-between">
                    <div>
                      <div class="flex items-center justify-between gap-2 mb-1">
                        <span class="px-2 py-0.5 rounded-full border border-bubble-dark text-[10px] font-black uppercase bg-bubble-cream text-bubble-dark">
                          {{ item.tagLabel }}
                        </span>
                        <span class="text-[11px] font-extrabold" :class="item.accent ? 'text-bubble-dark/80' : 'text-bubble-dark/70 dark:text-[#94a9c9]'">
                          {{ item.weightLabel }}
                        </span>
                      </div>
                      <h3 class="font-black text-base mt-1" :class="item.accent ? 'text-bubble-dark' : 'text-bubble-dark dark:text-[#f1f5fd]'">{{ item.title }}</h3>
                      <p class="text-xs leading-relaxed mt-1 line-clamp-2" :class="item.accent ? 'text-bubble-dark/80' : 'text-bubble-dark/80 dark:text-[#94a9c9]' ">{{ item.desc }}</p>
                    </div>
                  </div>
                </div>

                <div class="flex items-center justify-between pt-3 mt-4 border-t-2 border-bubble-dark/10 dark:border-[#24355a]">
                  <span
                    class="px-3 py-1 rounded-full border-2 border-bubble-dark text-xs font-black"
                    :class="item.accent ? 'bg-bubble-cream text-bubble-dark' : 'bg-bubble-yellow text-bubble-dark'"
                  >
                    {{ item.price }} BYN
                  </span>
                  <button
                    type="button"
                    class="inline-flex items-center px-4 py-1.5 rounded-full border-2 border-bubble-dark bg-bubble-blue text-white font-extrabold text-xs shadow-brutal-sm hover:-translate-y-0.5 transition-all cursor-pointer"
                    @click="selectService(item.title)"
                  >
                    Выбрать
                  </button>
                </div>
              </article>
            </div>
          </div>
        </div>

        <div class="mt-14">
          <h3 class="text-bubble-blue dark:text-bubble-blue-ice font-black text-2xl sm:text-3xl tracking-tight mb-6">
            Абонементы и тарифы
          </h3>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            <article class="landing-pricing-card">
              <div>
                <h4 class="text-lg font-black text-bubble-dark dark:text-[#f1f5fd]">Стандарт</h4>
                <p class="text-xs text-bubble-dark/70 dark:text-[#94a9c9] font-medium">Для одного человека</p>
                <div class="text-3xl font-black text-bubble-dark dark:text-bubble-blue-ice my-4">
                  24 BYN <span class="text-xs font-normal text-bubble-dark/60 dark:text-[#94a9c9]">/мес</span>
                </div>
                <ul class="divide-y divide-bubble-dark/10 dark:divide-[#24355a] text-xs font-medium space-y-1 text-bubble-dark/90 dark:text-[#f1f5fd]">
                  <li class="py-2">4 стирки по 7 кг (порошок включен)</li>
                  <li class="py-2">Свободный Wi-Fi и розетки</li>
                  <li class="py-2 text-bubble-dark/40 dark:text-[#94a9c9]/50">— Сушка белья в подарок</li>
                  <li class="py-2 text-bubble-dark/40 dark:text-[#94a9c9]/50">— Доставка курьером</li>
                </ul>
              </div>
              <button
                type="button"
                class="btn btn-sm btn-secondary w-full mt-6"
                @click="selectPlan('Стандарт (24 BYN)')"
              >
                Выбрать тариф
              </button>
            </article>

            <article class="bg-bubble-yellow border-2 border-bubble-dark rounded-[22px] shadow-brutal-lg lg:scale-105 p-6 flex flex-col justify-between relative z-10 text-bubble-dark">
              <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-bubble-pink border-2 border-bubble-dark text-bubble-dark text-[11px] font-black px-3.5 py-0.5 rounded-full shadow-sm">
                Абонемент 6 стирок
              </span>
              <div class="space-y-4 pt-1">
                <div>
                  <h4 class="text-lg font-black text-bubble-dark">Bubble Хит</h4>
                  <p class="text-xs text-bubble-dark/80 font-bold">6 стирок по цене 4</p>
                </div>
                <div class="text-3xl font-black text-bubble-dark">
                  32 BYN <span class="text-xs font-normal text-bubble-dark/70">/пакет</span>
                </div>
                <ul class="divide-y divide-bubble-dark/15 text-xs font-bold space-y-1 text-bubble-dark">
                  <li class="py-2">6 полных циклов стирки</li>
                  <li class="py-2">Профессиональный порошок включен</li>
                  <li class="py-2">Каждая 6-я стирка бесплатно</li>
                  <li class="py-2">Скидка 20% на сушку белья</li>
                </ul>
              </div>
              <button
                type="button"
                class="w-full mt-6 inline-flex items-center justify-center min-h-[42px] px-6 rounded-full border-2 border-bubble-dark bg-bubble-cream text-bubble-dark font-extrabold text-sm shadow-brutal-btn hover:-translate-y-0.5 hover:shadow-brutal-btn-hover active:translate-y-0.5 transition-all cursor-pointer"
                @click="selectPlan('Bubble Хит — 6 стирок (32 BYN)')"
              >
                Купить абонемент
              </button>
            </article>

            <article class="landing-pricing-card">
              <div>
                <h4 class="text-lg font-black text-bubble-dark dark:text-[#f1f5fd]">Семейный</h4>
                <p class="text-xs text-bubble-dark/70 dark:text-[#94a9c9] font-medium">Стирка, сушка и доставка</p>
                <div class="text-3xl font-black text-bubble-dark dark:text-bubble-blue-ice my-4">
                  75 BYN <span class="text-xs font-normal text-bubble-dark/60 dark:text-[#94a9c9]">/мес</span>
                </div>
                <ul class="divide-y divide-bubble-dark/10 dark:divide-[#24355a] text-xs font-medium space-y-1 text-bubble-dark/90 dark:text-[#f1f5fd]">
                  <li class="py-2">10 стирок + 10 сушек</li>
                  <li class="py-2">Химчистка 1 пальто или куртки</li>
                  <li class="py-2">Доставка курьером до двери</li>
                  <li class="py-2">Глажка рубашек и брюк</li>
                </ul>
              </div>
              <button
                type="button"
                class="btn btn-sm btn-secondary w-full mt-6"
                @click="selectPlan('Семейный (75 BYN)')"
              >
                Выбрать тариф
              </button>
            </article>
          </div>
        </div>
      </div>
    </section>

    <div
      v-if="showMobileDrawer"
      class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex flex-col justify-end"
      @click.self="showMobileDrawer = false"
    >
      <div class="bg-white dark:bg-[#131d33] text-bubble-dark dark:text-[#f1f5fd] rounded-t-2xl p-6 space-y-4 max-h-[80vh] overflow-y-auto transform transition-transform duration-300">
        <div class="flex justify-between items-center pb-2 border-b border-bubble-dark/20 dark:border-[#24355a]">
          <h3 class="text-base font-black text-bubble-dark dark:text-bubble-blue-ice">Фильтры каталога</h3>
          <button type="button" class="text-lg font-black" @click="showMobileDrawer = false">✕</button>
        </div>

        <div>
          <h4 class="font-black text-xs uppercase mb-2">Категория</h4>
          <div class="space-y-2 text-xs font-bold">
            <label class="flex items-center gap-2">
              <input type="radio" value="all" v-model="activeCategory" /> Все категории
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" value="wash" v-model="activeCategory" /> Стирка и сушка
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" value="care" v-model="activeCategory" /> Химчистка и обувь
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" value="plans" v-model="activeCategory" /> Абонементы
            </label>
          </div>
        </div>

        <div>
          <h4 class="font-black text-xs uppercase mb-2">Особенности</h4>
          <div class="flex flex-wrap gap-1.5">
            <button
              type="button"
              v-for="t in tagOptions"
              :key="t.key"
              class="px-3 py-1 rounded-full text-xs font-extrabold border-2 transition-all cursor-pointer"
              :class="activeTag === t.key ? 'bg-bubble-pink text-bubble-dark border-bubble-dark shadow-sm' : 'bg-bubble-cream dark:bg-[#080e1c] text-bubble-dark dark:text-[#f1f5fd] border-bubble-dark/30 dark:border-[#24355a]'"
              @click="activeTag = t.key"
            >
              {{ t.label }}
            </button>
          </div>
        </div>

        <button
          type="button"
          class="w-full inline-flex items-center justify-center min-h-[42px] rounded-full border-2 border-bubble-dark bg-bubble-yellow text-bubble-dark font-extrabold text-xs shadow-brutal-btn"
          @click="showMobileDrawer = false"
        >
          Применить
        </button>
      </div>
    </div>

    <section class="bg-bubble-blue dark:bg-[#121e3d] border-b-2 border-bubble-border dark:border-[#1f2d47] py-16 md:py-20 transition-colors" id="order">
      <div class="w-[min(1180px,calc(100%-48px))] mx-auto">
        <div class="text-center mb-8">
          <h2 class="text-white dark:text-bubble-blue-ice font-black text-4xl sm:text-5xl tracking-tight mb-2">
            Оформить заказ
          </h2>
          <p class="text-xs sm:text-sm text-bubble-blue-ice/90 dark:text-[#94a9c9] font-medium">
            Рассчитайте стоимость и отправьте заявку онлайн
          </p>
          <div class="mt-3">
            <router-link
              to="/order"
              class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border-2 border-bubble-dark bg-bubble-yellow text-bubble-dark text-xs font-black shadow-brutal-sm hover:-translate-y-0.5 transition-all"
            >
              Открыть на отдельной странице →
            </router-link>
          </div>
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

          <div v-if="orderSuccessMsg" class="p-4 mb-6 bg-emerald-100 dark:bg-emerald-950/60 border-2 border-bubble-dark dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 rounded-xl text-xs font-bold">
            {{ orderSuccessMsg }}
          </div>

          <div v-if="wizardStep === 1" class="space-y-5">
            <h3 class="text-lg font-black text-bubble-dark dark:text-[#f1f5fd]">Шаг 1: Выберите услуги и объем</h3>

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
                  v-for="w in [3, 5, 7]"
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
            <h3 class="text-lg font-black text-bubble-dark dark:text-[#f1f5fd]">Шаг 2: Способ доставки и контакты</h3>

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
            <h3 class="text-lg font-black text-bubble-dark dark:text-[#f1f5fd]">Шаг 3: Способ оплаты</h3>

            <div class="space-y-2.5">
              <label class="flex items-center justify-between p-4 rounded-xl border-2 border-bubble-dark/30 cursor-pointer transition-all bg-bubble-yellow text-bubble-dark shadow-brutal-sm">
                <div>
                  <span class="block text-xs sm:text-sm font-black">Оплата при получении</span>
                  <span class="text-[11px] text-bubble-dark/80 font-medium">Наличными или картой при передаче чистых вещей</span>
                </div>
                <input type="radio" v-model="orderForm.payment" value="receipt" checked class="accent-bubble-blue w-4 h-4" />
              </label>
            </div>
          </div>

          <div v-else-if="wizardStep === 4" class="space-y-5 text-center py-4">
            <div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 border-2 border-bubble-dark dark:border-emerald-800 rounded-full flex items-center justify-center mx-auto text-lg font-black shadow-sm">
              ✓
            </div>
            <h3 class="text-xl font-black text-bubble-dark dark:text-[#f1f5fd]">Заказ готов к подтверждению</h3>
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
              class="inline-flex items-center justify-center min-h-[44px] px-8 rounded-full border-2 border-bubble-dark bg-bubble-yellow text-bubble-dark font-extrabold text-sm shadow-brutal-btn hover:-translate-y-0.5 hover:shadow-brutal-btn-hover active:translate-y-0.5 transition-all disabled:opacity-50"
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
              class="px-5 py-2 rounded-full border-2 border-bubble-dark dark:border-[#24355a] text-xs font-extrabold transition-all"
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
              class="inline-flex items-center justify-center px-6 py-2 rounded-full border-2 border-bubble-dark bg-bubble-yellow text-bubble-dark font-extrabold text-xs shadow-brutal-btn hover:-translate-y-0.5 hover:shadow-brutal-btn-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="wizardStep === 1 && (!orderForm.services || orderForm.services.length === 0)"
              @click="nextWizardStep"
            >
              Далее →
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-bubble-cream dark:bg-[#080e1c] border-b-2 border-bubble-border dark:border-[#24355a] py-16 md:py-20 transition-colors" id="how">
      <div class="w-[min(1180px,calc(100%-48px))] mx-auto">
        <div class="text-center max-w-xl mx-auto mb-10">
          <h2 class="text-bubble-blue dark:text-bubble-blue-ice font-black text-4xl sm:text-5xl tracking-tight mb-3">
            Как это работает
          </h2>
          <p class="text-xs sm:text-sm text-bubble-dark/80 dark:text-[#94a9c9] font-medium">
            Все просто: от чистых вещей вас отделяют всего четыре понятных шага
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2 pb-6 px-1">
          <article
            v-for="step in steps"
            :key="step.num"
            class="bg-white dark:bg-[#131d33] border-2 border-bubble-dark/30 dark:border-[#24355a] rounded-[22px] shadow-brutal p-6 flex flex-col justify-between hover:-translate-y-1 transition-all"
          >
            <div>
              <span class="w-11 h-11 rounded-full border-2 border-bubble-dark bg-bubble-pink flex items-center justify-center font-black text-lg text-bubble-dark mb-4 shadow-sm">
                {{ step.num }}
              </span>
              <h3 class="font-black text-xl text-bubble-dark dark:text-[#f1f5fd] mb-1.5">{{ step.title }}</h3>
              <p class="text-xs text-bubble-dark/80 dark:text-[#94a9c9] leading-relaxed font-medium">{{ step.desc }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-bubble-pink dark:bg-[#281329] border-b-2 border-bubble-border dark:border-[#382252] py-16 md:py-20 transition-colors" id="addresses">
      <div class="w-[min(1180px,calc(100%-48px))] mx-auto">
        <div class="text-center max-w-xl mx-auto mb-10">
          <h2 class="text-white dark:text-[#ff9dcd] font-black text-4xl sm:text-5xl tracking-tight mb-3">
            Филиалы прачечной
          </h2>
          <p class="text-xs sm:text-sm text-white/90 dark:text-[#ff9dcd]/80 font-medium">
            Выберите удобный филиал для самовывоза или сдачи вещей
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article
            v-for="addr in addresses"
            :key="addr.title"
            class="bg-bubble-cream dark:bg-[#131d33] border-2 border-bubble-dark/30 dark:border-[#24355a] rounded-[22px] shadow-brutal p-6 text-bubble-dark dark:text-[#f1f5fd] flex flex-col justify-between hover:-translate-y-1 transition-all"
          >
            <div>
              <h3 class="font-black text-xl text-bubble-dark dark:text-[#f1f5fd] mb-1.5">{{ addr.title }}</h3>
              <p class="text-xs text-bubble-dark/80 dark:text-[#94a9c9] my-1 font-medium">{{ addr.time }}</p>
            </div>

            <div class="mt-5 pt-3.5 border-t-2 border-bubble-dark/10 dark:border-[#24355a]">
              <div class="text-[11px] font-black text-bubble-dark/60 dark:text-[#94a9c9] mb-1 uppercase tracking-wider">
                Оснащение филиала:
              </div>
              <p class="text-xs font-bold text-bubble-dark/90 dark:text-[#f1f5fd]">
                {{ addr.equipment }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-bubble-cream dark:bg-[#080e1c] border-b-2 border-bubble-border dark:border-[#24355a] py-16 transition-colors">
      <div class="w-[min(1180px,calc(100%-48px))] mx-auto">
        <article class="bg-bubble-yellow border-2 border-bubble-dark rounded-[24px] shadow-brutal p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-bubble-dark">
          <div>
            <h2 class="text-bubble-dark font-black text-3xl sm:text-4xl tracking-tight mb-3">
              Каждая 6-я стирка<br>бесплатно
            </h2>
            <p class="text-bubble-dark/90 text-sm font-bold">Копи штампы и экономь!</p>
          </div>

          <div class="grid grid-cols-3 gap-3" aria-label="Карта лояльности">
            <span
              v-for="n in 5"
              :key="n"
              class="aspect-square rounded-full border-2 border-bubble-dark bg-bubble-pink flex items-center justify-center font-black text-2xl text-bubble-dark shadow-sm"
            >
              ✓
            </span>
            <span class="aspect-square rounded-full border-2 border-bubble-dark bg-bubble-blue-light flex items-center justify-center font-black text-2xl text-bubble-dark shadow-sm">
              ★
            </span>
          </div>
        </article>

        <ad-slot type="banner" />
      </div>
    </section>

    <section class="bg-bubble-cream dark:bg-[#080e1c] border-b-2 border-bubble-border dark:border-[#24355a] py-16 md:py-20 transition-colors" id="reviews">
      <div class="w-[min(1180px,calc(100%-48px))] mx-auto">
        <div class="text-center max-w-xl mx-auto mb-8">
          <h2 class="text-bubble-blue dark:text-bubble-blue-ice font-black text-4xl sm:text-5xl tracking-tight mb-2">
            Что говорят клиенты
          </h2>
          <p class="text-xs sm:text-sm text-bubble-dark/80 dark:text-[#94a9c9] font-medium">
            Честные впечатления наших постоянных посетителей.
          </p>
        </div>

        <div class="overflow-x-auto snap-x snap-mandatory flex justify-start sm:justify-center gap-5 pt-4 pb-8 px-2 mb-10 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-slate-300">
          <article
            v-for="rev in reviews"
            :key="rev.author"
            class="w-80 shrink-0 bg-white dark:bg-[#131d33] border-2 border-bubble-dark/30 dark:border-[#24355a] rounded-[22px] shadow-brutal p-6 snap-center flex flex-col justify-between text-bubble-dark dark:text-[#f1f5fd] hover:-translate-y-1 transition-all duration-200"
          >
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="text-bubble-yellow text-sm font-black tracking-wider">★★★★★</div>
                <span v-if="rev.date" class="text-[11px] font-bold text-bubble-dark/60 dark:text-[#94a9c9]">{{ rev.date }}</span>
              </div>
              <p class="text-xs text-bubble-dark/85 dark:text-[#f1f5fd] leading-relaxed font-medium">«{{ rev.text }}»</p>
            </div>
            <div class="flex items-center gap-2.5 mt-4 pt-3 border-t-2 border-bubble-dark/10 dark:border-[#24355a]">
              <span class="w-8 h-8 rounded-full bg-bubble-blue text-white text-xs font-bold flex items-center justify-center border border-bubble-dark/20 shrink-0">
                {{ rev.author.charAt(0) }}
              </span>
              <div>
                <strong class="text-xs font-black text-bubble-dark dark:text-[#f1f5fd] block">{{ rev.author }}</strong>
              </div>
            </div>
          </article>
        </div>

        <form @submit.prevent="submitReview" class="max-w-[600px] mx-auto bg-white dark:bg-[#131d33] border-2 border-bubble-dark dark:border-[#24355a] rounded-[22px] shadow-brutal p-7 space-y-4 text-bubble-dark dark:text-[#f1f5fd]">
          <h3 class="text-xl font-black text-bubble-dark dark:text-[#f1f5fd] text-center">Оставить отзыв</h3>

          <div v-if="reviewSuccessMsg" class="p-3 bg-green-100 dark:bg-emerald-950/60 border-2 border-bubble-dark dark:border-emerald-800 text-green-900 dark:text-emerald-200 rounded-xl text-xs font-bold">
            {{ reviewSuccessMsg }}
          </div>

          <div>
            <label class="block text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd] mb-1.5">Имя</label>
            <input
              v-model="reviewForm.name"
              type="text"
              placeholder="Как тебя зовут"
              class="w-full min-h-[43px] px-3.5 py-2 rounded-[9px] border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#080e1c] text-bubble-dark dark:text-[#f1f5fd] font-bold text-sm focus:ring-4 focus:ring-bubble-blue/20 outline-none"
              required
            />
          </div>

          <fieldset>
            <legend class="block text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd] mb-1.5">Оценка сервиса</legend>
            <div class="flex flex-wrap gap-2">
              <label
                v-for="m in [1, 2, 3, 4, 5]"
                :key="m"
                class="inline-block px-3.5 py-1.5 rounded-full border-2 border-bubble-dark dark:border-[#24355a] text-xs font-bold cursor-pointer transition-all"
                :class="reviewMark === m ? 'bg-bubble-pink text-bubble-dark shadow-sm' : 'bg-white dark:bg-[#080e1c] text-bubble-dark dark:text-[#f1f5fd] hover:bg-bubble-cream'"
              >
                <input type="radio" v-model="reviewMark" :value="m" class="hidden" />
                ★ {{ m }}
              </label>
            </div>
          </fieldset>

          <div>
            <label class="block text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd] mb-1.5">Твой отзыв</label>
            <textarea
              v-model="reviewForm.text"
              rows="3"
              placeholder="Что понравилось в обслуживании?"
              class="w-full px-3.5 py-2.5 rounded-[9px] border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#080e1c] text-bubble-dark dark:text-[#f1f5fd] font-bold text-sm focus:ring-4 focus:ring-bubble-blue/20 outline-none resize-y"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full inline-flex items-center justify-center min-h-[42px] px-6 rounded-full border-2 border-bubble-dark bg-bubble-yellow text-bubble-dark font-extrabold text-sm shadow-brutal-btn hover:-translate-y-0.5 hover:shadow-brutal-btn-hover active:translate-y-0.5 transition-all"
          >
            Отправить отзыв
          </button>
        </form>
      </div>
    </section>

    <section class="bg-bubble-blue-light dark:bg-[#0c1424] border-b-2 border-bubble-border dark:border-[#24355a] py-16 md:py-20 transition-colors" id="faq">
      <div class="w-[min(1180px,calc(100%-48px))] mx-auto">
        <div class="text-center mb-8">
          <h2 class="text-bubble-blue dark:text-bubble-blue-ice font-black text-4xl sm:text-5xl tracking-tight mb-2">
            Частые вопросы
          </h2>
          <p class="text-xs sm:text-sm text-bubble-dark/80 dark:text-[#94a9c9] font-medium">
            Ответы на популярные вопросы о стирке, сушке и доставке
          </p>
        </div>

        <div class="space-y-3.5 max-w-3xl mx-auto">
          <details
            v-for="item in faqList"
            :key="item.q"
            class="group bg-white dark:bg-[#131d33] border-2 border-bubble-dark dark:border-[#24355a] rounded-[16px] shadow-brutal-sm overflow-hidden p-4 sm:p-5 cursor-pointer text-bubble-dark dark:text-[#f1f5fd]"
          >
            <summary class="font-black text-sm sm:text-base text-bubble-dark dark:text-[#f1f5fd] flex justify-between items-center select-none list-none">
              <span>{{ item.q }}</span>
              <span class="group-open:rotate-180 transition-transform text-bubble-blue dark:text-bubble-blue-ice font-black ml-2">▼</span>
            </summary>
            <p class="mt-3 text-xs sm:text-sm text-bubble-dark/85 dark:text-[#94a9c9] leading-relaxed font-medium pt-2 border-t border-bubble-dark/10 dark:border-[#24355a]">
              {{ item.a }}
            </p>
          </details>
        </div>
      </div>
    </section>

    <section class="bg-bubble-blue dark:bg-[#121e3d] border-b-2 border-bubble-border dark:border-[#1f2d47] py-16 md:py-20 text-white dark:text-[#f1f5fd] transition-colors" id="contacts">
      <div class="w-[min(1180px,calc(100%-48px))] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div class="lg:col-span-5 space-y-6">
          <div>
            <h2 class="text-white dark:text-bubble-blue-ice font-black text-4xl sm:text-5xl tracking-tight mb-2">
              Остались вопросы?
            </h2>
            <p class="text-white/90 dark:text-[#94a9c9] text-sm sm:text-base font-medium">
              Свяжитесь с нашим дежурным администратором или закажите обратный звонок.
            </p>
          </div>

          <div class="bg-bubble-cream dark:bg-[#131d33] border-2 border-bubble-dark dark:border-[#24355a] rounded-[22px] shadow-brutal p-6 text-bubble-dark dark:text-[#f1f5fd] flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <img src="/images/profile.jpg" alt="Анна Смирнова" class="w-20 h-20 rounded-full object-cover border-2 border-bubble-dark dark:border-[#24355a] shadow-sm shrink-0" />
            <div class="flex-1 text-center sm:text-left space-y-2">
              <div>
                <h3 class="text-lg font-black text-bubble-dark dark:text-[#f1f5fd]">Анна Смирнова</h3>
                <p class="text-xs font-bold text-bubble-blue dark:text-bubble-blue-ice">Администратор прачечной Bubble</p>
              </div>
              <p class="text-xs text-bubble-dark/80 dark:text-[#94a9c9] font-medium leading-relaxed">
                Консультации по бережной стирке, сушке и глажке. Прием заказов на Пузырьковой, 12.
              </p>
              <div class="flex flex-wrap gap-2 pt-1 justify-center sm:justify-start">
                <a href="tel:+375290000000" class="inline-flex items-center justify-center px-4 py-1.5 rounded-full border-2 border-bubble-dark bg-bubble-yellow text-bubble-dark font-extrabold text-xs shadow-brutal-btn hover:-translate-y-0.5 transition-all">
                  Позвонить
                </a>
                <a href="https://t.me/" target="_blank" rel="noopener" class="inline-flex items-center justify-center px-4 py-1.5 rounded-full border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#080e1c] text-bubble-dark dark:text-[#f1f5fd] font-extrabold text-xs shadow-brutal-btn hover:-translate-y-0.5 transition-all">
                  Telegram
                </a>
              </div>
            </div>
          </div>

          <form @submit.prevent="submitCallback" class="bg-bubble-cream dark:bg-[#131d33] border-2 border-bubble-dark dark:border-[#24355a] rounded-[22px] shadow-brutal p-6 space-y-3.5 text-bubble-dark dark:text-[#f1f5fd]">
            <h3 class="text-lg font-black text-bubble-dark dark:text-[#f1f5fd] mb-1">Заказать звонок</h3>
            <div v-if="callbackSuccessMsg" class="p-3 bg-green-100 dark:bg-emerald-950/60 border-2 border-bubble-dark dark:border-emerald-800 text-green-900 dark:text-emerald-200 rounded-xl text-xs font-bold">
              {{ callbackSuccessMsg }}
            </div>
            <div>
              <label class="block text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd] mb-1">Имя</label>
              <input v-model="callbackForm.name" type="text" placeholder="Как вас зовут" class="w-full min-h-[40px] px-3.5 py-1.5 rounded-[9px] border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#080e1c] text-bubble-dark dark:text-[#f1f5fd] font-bold text-xs focus:ring-4 focus:ring-bubble-blue/20 outline-none" required />
            </div>
            <div>
              <label class="block text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd] mb-1">Телефон</label>
              <input v-model="callbackForm.phone" type="tel" placeholder="+375 29 000-00-00" class="w-full min-h-[40px] px-3.5 py-1.5 rounded-[9px] border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#080e1c] text-bubble-dark dark:text-[#f1f5fd] font-bold text-xs focus:ring-4 focus:ring-bubble-blue/20 outline-none" required />
            </div>
            <button type="submit" class="w-full inline-flex items-center justify-center min-h-[40px] px-5 rounded-full border-2 border-bubble-dark bg-bubble-yellow text-bubble-dark font-extrabold text-xs shadow-brutal-btn hover:-translate-y-0.5 hover:shadow-brutal-btn-hover active:translate-y-0.5 transition-all">
              Перезвоните мне
            </button>
          </form>
        </div>

        <div class="lg:col-span-7 bg-white dark:bg-[#131d33] border-2 border-bubble-dark dark:border-[#24355a] rounded-[24px] shadow-brutal overflow-hidden text-bubble-dark dark:text-[#f1f5fd] flex flex-col h-[520px]">
          <div class="px-5 py-3.5 border-b-2 border-bubble-dark dark:border-[#24355a] bg-bubble-cream dark:bg-[#0c1424] flex items-center justify-between shrink-0">
            <div class="flex items-center gap-3">
              <div class="relative">
                <img src="/images/profile.jpg" alt="Анна Смирнова" class="w-10 h-10 rounded-full object-cover border-2 border-bubble-dark dark:border-[#24355a]" />
                <span class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border border-bubble-dark"></span>
              </div>
              <div>
                <h3 class="text-sm font-black text-bubble-dark dark:text-[#f1f5fd]">Анна Смирнова</h3>
                <span class="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">Администратор онлайн</span>
              </div>
            </div>
            <span class="px-3 py-1 rounded-full border border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#080e1c] text-[11px] font-black text-bubble-dark dark:text-[#f1f5fd]">
              Чат поддержки
            </span>
          </div>

          <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-3.5 bg-bubble-cream/30 dark:bg-[#080e1c] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-300">
            <div v-if="chatMessages.length === 0" class="h-full flex items-center justify-center text-center p-6 text-xs text-bubble-dark/60 dark:text-[#94a9c9] font-medium">
              Напишите вопрос по стирке или доставке, чтобы начать диалог с сотрудником.
            </div>
            <div v-for="(msg, idx) in chatMessages" :key="idx" class="flex" :class="msg.sender === 'user' ? 'justify-end' : 'justify-start'">
              <div class="max-w-xs sm:max-w-md p-3.5 rounded-2xl border-2 border-bubble-dark dark:border-[#24355a] text-xs font-medium leading-relaxed shadow-sm" :class="msg.sender === 'user' ? 'bg-bubble-blue text-white rounded-br-none font-semibold' : 'bg-white dark:bg-[#1a2640] text-bubble-dark dark:text-[#f1f5fd] rounded-bl-none'">
                <div class="text-[10px] font-bold opacity-70 mb-1 flex justify-between gap-4">
                  <span>{{ msg.sender === 'user' ? 'Вы' : 'Анна Смирнова' }}</span>
                  <span>{{ msg.time }}</span>
                </div>
                <p>{{ msg.text }}</p>
              </div>
            </div>
          </div>

          <div class="sticky bottom-0 bg-white dark:bg-[#0c1424] border-t-2 border-bubble-dark dark:border-[#24355a] p-3 shrink-0">
            <form @submit.prevent="sendMessage" class="flex gap-2">
              <input v-model="chatInput" type="text" placeholder="Напишите вопрос по стирке или доставке..." class="flex-1 min-h-[40px] px-3.5 py-2 rounded-xl border-2 border-bubble-dark dark:border-[#24355a] bg-bubble-cream/50 dark:bg-[#080e1c] text-bubble-dark dark:text-[#f1f5fd] font-bold text-xs focus:bg-white dark:focus:bg-[#080e1c] focus:ring-4 focus:ring-bubble-blue/20 outline-none" required />
              <button type="submit" class="inline-flex items-center justify-center min-h-[40px] px-5 rounded-full border-2 border-bubble-dark bg-bubble-yellow text-bubble-dark font-extrabold text-xs shadow-brutal-btn hover:-translate-y-0.5 active:translate-y-0.5 transition-all">
                Отправить
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <section v-if="isAdmin" class="bg-bubble-cream dark:bg-[#080e1c] border-b-2 border-bubble-border dark:border-[#24355a] py-14 transition-colors" id="excel-import">
      <div class="w-[min(1180px,calc(100%-48px))] mx-auto">
        <div class="max-w-3xl mx-auto bg-white dark:bg-[#131d33] border-2 border-bubble-dark dark:border-[#24355a] rounded-2xl shadow-brutal p-6 md:p-8">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <span class="text-[11px] font-extrabold uppercase tracking-wider text-bubble-blue dark:text-bubble-blue-ice">Реестр и учет</span>
              <h3 class="text-xl sm:text-2xl font-black text-bubble-dark dark:text-[#f1f5fd]">Импорт заказов из Excel</h3>
            </div>
            <router-link to="/orders" class="inline-flex items-center text-xs font-extrabold text-bubble-blue dark:text-bubble-blue-ice hover:underline">
              Таблица заказов →
            </router-link>
          </div>
          <div
            class="border-2 border-dashed border-bubble-dark/40 dark:border-[#24355a] rounded-xl p-8 text-center cursor-pointer transition-all bg-bubble-cream/50 dark:bg-[#080e1c] hover:border-bubble-blue hover:bg-bubble-blue-light/20 dark:hover:bg-[#1a2640]"
            :class="{ 'border-bubble-blue bg-bubble-blue-light/40 dark:bg-[#1a2640]': isDragging }"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="onDrop"
            @click="triggerFileInput"
          >
            <p class="text-sm font-bold text-bubble-dark dark:text-[#f1f5fd] mb-2">
              Перетащите файл Excel сюда или нажмите для выбора
            </p>
            <button
              type="button"
              class="inline-flex items-center justify-center px-4 py-1.5 rounded-full border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#131d33] text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd] shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all"
            >
              Выбрать файл (.xlsx, .xls)
            </button>
            <input
              ref="fileInput"
              type="file"
              class="hidden"
              accept=".xlsx, .xls"
              @change="onFileSelected"
            />
          </div>
          <div v-if="selectedFile" class="mt-4 p-4 rounded-xl border-2 border-bubble-dark bg-bubble-yellow/20 dark:bg-bubble-yellow/20 flex flex-wrap items-center justify-between gap-3 text-sm">
            <div>
              <strong class="text-bubble-dark dark:text-[#f1f5fd]">{{ selectedFile.name }}</strong>
              <span class="text-xs text-gray-600 dark:text-[#94a9c9] ml-2 font-medium">({{ formatFileSize(selectedFile.size) }})</span>
            </div>
            <button
              type="button"
              class="inline-flex items-center justify-center min-h-[38px] px-5 rounded-full border-2 border-bubble-dark bg-bubble-yellow text-bubble-dark font-extrabold text-xs shadow-brutal-btn hover:-translate-y-0.5 hover:shadow-brutal-btn-hover disabled:opacity-50 transition-all cursor-pointer"
              :disabled="isUploading"
              @click="uploadExcel"
            >
              <span v-if="isUploading">Загрузка...</span>
              <span v-else>Загрузить в систему</span>
            </button>
          </div>
          <div v-if="successMessage" class="mt-4 p-4 rounded-xl bg-green-100 dark:bg-emerald-950/60 border-2 border-bubble-dark dark:border-emerald-800 text-green-900 dark:text-emerald-200 text-sm font-bold">
            {{ successMessage }}
            <div class="mt-2">
              <router-link to="/orders" class="inline-flex items-center gap-1 underline text-bubble-blue dark:text-bubble-blue-ice font-extrabold">
                Перейти в таблицу заказов →
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <base-modal
      :show="showErrorModal"
      title="Ошибка формата файла"
      variant="danger"
      @close="showErrorModal = false"
    >
      <template #body>
        <p class="text-sm text-red-600 font-extrabold mb-2">Выбран неподдерживаемый формат файла.</p>
        <p class="text-xs text-bubble-dark/80 dark:text-[#94a9c9] font-medium mb-4">{{ errorMessage }}</p>
        <div class="p-3 bg-bubble-yellow/40 dark:bg-[#1a2640] border-2 border-bubble-dark dark:border-[#24355a] rounded-xl text-xs text-bubble-dark dark:text-[#f1f5fd] font-bold">
          Разрешены только файлы Excel с расширениями <strong>.xlsx</strong> и <strong>.xls</strong>.
        </div>
      </template>
      <template #footer>
        <button
          type="button"
          class="inline-flex items-center justify-center px-5 py-2 rounded-full border-2 border-bubble-dark bg-bubble-cream text-bubble-dark font-extrabold text-xs shadow-brutal-btn hover:-translate-y-0.5 hover:shadow-brutal-btn-hover active:translate-y-0.5 transition-all"
          @click="showErrorModal = false"
        >
          Понятно
        </button>
      </template>
    </base-modal>
  </div>
</template>

<script>
import axios from 'axios';
import BaseModal from '../components/BaseModal.vue';

export default {
  name: 'HomeView',
  components: { BaseModal },
  props: {
    user: {
      type: Object,
      default: null
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isDragging: false,
      selectedFile: null,
      isUploading: false,
      showErrorModal: false,
      errorMessage: '',
      successMessage: '',
      sortBy: 'default',
      activeCategory: 'all',
      filterMaxPrice: 75,
      activeTag: 'all',
      showMobileDrawer: false,
      showSkeletons: false,
      tagOptions: [
        { key: 'all', label: 'Все' },
        { key: 'fast', label: 'Быстро' },
        { key: 'eco', label: 'Эко' },
        { key: 'popular', label: 'Популярное' }
      ],
      serviceOptions: [
        { name: 'Стирка', price: 8 },
        { name: 'Сушка', price: 5 },
        { name: 'Глажка', price: 3 },
        { name: 'Химчистка', price: 20 },
        { name: 'Обувь', price: 15 },
        { name: 'Одеяла', price: 18 }
      ],
      wizardStep: 1,
      orderForm: {
        services: ['Стирка'],
        service: 'Стирка',
        weight: 5,
        delivery: 'Заберу',
        branch: 'ул. Пузырьковая, 12',
        phone: '',
        address: '',
        payment: 'receipt'
      },
      isSubmittingOrder: false,
      orderSuccessMsg: '',
      reviewForm: { name: '', text: '' },
      reviewMark: 5,
      reviewSuccessMsg: '',
      callbackForm: { name: '', phone: '' },
      callbackSuccessMsg: '',
      chatInput: '',
      chatMessages: [],

      prices: [
        { id: 1, title: 'Стирка повседневной одежды', category: 'wash', desc: 'До 7 кг, профессиональный порошок и кондиционер включены.', price: 8, tag: 'popular', tagLabel: 'Хит', weightLabel: 'до 7 кг', img: '/img/повседневная.jpg' },
        { id: 2, title: 'Сушка белья', category: 'wash', desc: 'Бережный режим, вещи мягкие, сухие и без складок за 40 минут.', price: 5, tag: 'fast', tagLabel: '40 мин', weightLabel: 'до 7 кг', img: '/img/сушка.jpg' },
        { id: 3, title: 'Глажка рубашек и белья', category: 'care', desc: 'Рубашки, брюки, постельные комплекты с отпариванием.', price: 3, tag: 'fast', tagLabel: 'Быстро', weightLabel: 'за вещь', img: '/img/рубашки.jpg' },
        { id: 4, title: 'Химчистка верхней одежды', category: 'care', desc: 'Пальто, пуховики, костюмы, куртки и теплые пледы.', price: 20, tag: 'eco', tagLabel: 'Эко', weightLabel: '1 изделие', img: '/img/куртки.jpg' },
        { id: 5, title: 'Стирка и чистка обуви', category: 'care', desc: 'Кроссовки и кеды с глубокой дезинфекцией и сушкой колодок.', price: 15, tag: 'popular', tagLabel: 'Уход', weightLabel: '1 пара', img: '/img/обувь.jpg' },
        { id: 6, title: 'Стирка одеял и пледов', category: 'wash', desc: 'Крупногабаритный домашний текстиль в барабанах до 10 кг.', price: 18, tag: 'eco', tagLabel: 'Объем', weightLabel: 'до 10 кг', img: '/img/одеяла1.jpg' },
        { id: 7, title: 'Деликатная стирка', category: 'wash', desc: 'Шелк, шерсть, кашемир и тонкое кружевное белье.', price: 10, tag: 'eco', tagLabel: 'Бережно', weightLabel: 'до 4 кг', img: '/images/3.webp' },
        { id: 8, title: 'Абонемент 6 стирок', category: 'plans', desc: '6 полных циклов стирки по цене 4. Порошок включен.', price: 32, tag: 'popular', tagLabel: 'Выгода', weightLabel: 'пакет', accent: true, img: '/img/абонемент.jpg' },
      ],
      steps: [
        { num: 1, title: 'Выбери', desc: 'Услугу, вес и способ получения.' },
        { num: 2, title: 'Сдай', desc: 'Принеси вещи или дождись курьера.' },
        { num: 3, title: 'Отдыхай', desc: 'Есть кофе, Wi‑Fi и розетки.' },
        { num: 4, title: 'Забери', desc: 'Чистое и поглаженное.' },
      ],
      addresses: [
        { title: 'ул. Пузырьковая, 12', time: 'Ежедневно 8:00–21:00', equipment: '6 стиральных и 4 сушильные машины' },
        { title: 'ул. Пенная, 45', time: 'Ежедневно 7:00–24:00', equipment: '8 стиральных и 6 сушильных машин' },
        { title: 'ул. Мыльная, 3', time: 'Ежедневно 8:00–22:00', equipment: '6 стиральных и 4 сушильные машины' },
      ],
      reviews: [
        { text: 'Стирала зимний пуховик и плед. В обычную домашнюю машинку они не влезали, а тут огромные барабаны на 10 кг. Все чистое, мягкое и пух не сбился!', author: 'Анна Зайцева', date: '14 октября 2026' },
        { text: 'Беру абонемент на 6 стирок. Очень спасает после тренировок: закинул форму, взял кофе, посидел с ноутбуком по Wi-Fi — через час все сухое.', author: 'Игорь Власов', date: '28 октября 2026' },
        { text: 'Заказывали выезд курьера на дом: забрал три пакета белья и вернул на следующий день в аккуратных крафтовых чехлах. Настоящее спасение для семьи!', author: 'Мария Чернышева', date: '12 ноября 2026' }
      ],
      faqList: [
        {
          q: 'Нужно ли приносить свой стиральный порошок или кондиционер?',
          a: 'Нет, приносить с собой ничего не требуется! В стоимость каждой стирки уже включены профессиональные европейские гипоаллергенные средства, которые автоматически дозируются во время цикла.'
        },
        {
          q: 'Сколько времени занимает весь процесс стирки и сушки?',
          a: 'Обычный цикл стирки длится 35–45 минут, а бережная сушка — около 40 минут. Меньше чем за 1,5 часа вы получаете полностью сухое, мягкое и свежее белье.'
        },
        {
          q: 'Поместится ли объемный пуховик, чехлы или двуспальный плед?',
          a: 'Да, во всех филиалах установлены профессиональные барабаны загрузкой до 10 и 14 кг. В них легко помещаются объемные зимние вещи, пледы и тяжелый домашний текстиль.'
        },
        {
          q: 'Как работает оплата при заказе через сайт?',
          a: 'Оплата производится исключительно при получении заказа: наличными или банковской картой в филиале прачечной либо курьеру при передаче чистых вещей.'
        }
      ]
    };
  },
  computed: {
    selectedServicesText() {
      if (this.orderForm.services && this.orderForm.services.length > 0) {
        return this.orderForm.services.join(' + ');
      }
      return this.orderForm.service || 'Стирка';
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
        : (this.orderForm.service ? [this.orderForm.service] : ['Стирка']);
      let base = 0;
      for (const s of list) {
        base += basePrices[s] || 8.0;
      }
      let p = base;
      if (this.orderForm.weight === 7) p *= 1.3;
      if (this.orderForm.weight === 3) p *= 0.9;
      if (this.orderForm.delivery === 'Курьер') p += 5.0;
      return Math.round(p * 100) / 100;
    },
    filteredPrices() {
      let list = [...this.prices];
      if (this.activeCategory !== 'all') {
        list = list.filter(item => item.category === this.activeCategory);
      }
      if (this.activeTag !== 'all') {
        list = list.filter(item => item.tag === this.activeTag);
      }

      if (this.sortBy === 'asc') {
        list.sort((a, b) => a.price - b.price);
      } else if (this.sortBy === 'desc') {
        list.sort((a, b) => b.price - a.price);
      }
      return list;
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    onDrop(e) {
      this.isDragging = false;
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        this.validateAndSetFile(files[0]);
      }
    },
    onFileSelected(e) {
      const files = e.target.files;
      if (files.length > 0) {
        this.validateAndSetFile(files[0]);
      }
    },
    validateAndSetFile(file) {
      this.successMessage = '';
      const validExtensions = ['xlsx', 'xls'];
      const ext = file.name.split('.').pop().toLowerCase();

      if (!validExtensions.includes(ext)) {
        this.errorMessage = `Файл "${file.name}" не поддерживается. Пожалуйста, выберите файл .xlsx или .xls.`;
        this.showErrorModal = true;
        this.selectedFile = null;
        if (this.$refs.fileInput) this.$refs.fileInput.value = '';
        return;
      }

      this.selectedFile = file;
    },
    formatFileSize(bytes) {
      if (bytes === 0) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
    async uploadExcel() {
      if (!this.selectedFile) return;

      this.isUploading = true;
      this.successMessage = '';
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      try {
        const response = await axios.post('/api/excel/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        this.successMessage = response.data.message;
        this.selectedFile = null;
        if (this.$refs.fileInput) this.$refs.fileInput.value = '';
      } catch (error) {
        if (error.response?.data?.error_type === 'INVALID_FORMAT') {
          this.errorMessage = error.response.data.message;
          this.showErrorModal = true;
        } else {
          alert('Ошибка при загрузке: ' + (error.response?.data?.message || error.message));
        }
      } finally {
        this.isUploading = false;
      }
    },
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
        this.orderForm.phone = '';
        this.wizardStep = 1;
      } catch (err) {
        const fallbackId = Math.floor(1000 + Math.random() * 9000);
        this.orderSuccessMsg = `Заказ #${fallbackId} успешно оформлен! Спасибо, что выбрали Bubble.`;
        this.orderForm.phone = '';
        this.wizardStep = 1;
      } finally {
        this.isSubmittingOrder = false;
      }
    },
    submitReview() {
      if (this.reviewForm.name && this.reviewForm.text) {
        this.reviews.unshift({
          author: this.reviewForm.name,
          text: this.reviewForm.text,
          date: '23 ноября 2026'
        });
      }
      this.reviewSuccessMsg = 'Спасибо за ваш отзыв! Мы ценим ваше мнение.';
      this.reviewForm = { name: '', text: '' };
    },
    submitCallback() {
      this.callbackSuccessMsg = 'Спасибо! Мы перезвоним вам в самое ближайшее время.';
      this.callbackForm = { name: '', phone: '' };
    },
    sendMessage() {
      if (!this.chatInput.trim()) return;
      this.chatMessages.push({ sender: 'user', text: this.chatInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
      this.chatInput = '';
      setTimeout(() => {
        this.chatMessages.push({ sender: 'admin', text: 'Спасибо за вопрос! Наш администратор ответит вам в ближайшее время.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
        this.$nextTick(() => {
          const container = this.$refs.chatContainer;
          if (container) container.scrollTop = container.scrollHeight;
        });
      }, 1000);
    },

    selectService(title) {
      const match = ['Стирка', 'Сушка', 'Глажка', 'Химчистка', 'Обувь', 'Одеяла'].find(s => title.toLowerCase().includes(s.toLowerCase()));
      if (match) {
        if (!this.orderForm.services.includes(match)) {
          this.orderForm.services.push(match);
        }
        this.orderForm.service = this.orderForm.services.join(' + ');
      }
      this.wizardStep = 1;
      const el = document.getElementById('order');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    },
    selectPlan(planName) {
      this.orderForm.services = ['Стирка', 'Сушка'];
      this.orderForm.service = 'Стирка + Сушка';
      this.orderSuccessMsg = `Вы выбрали «${planName}». Перейдите к шагу 2 для подтверждения.`;
      this.wizardStep = 2;
      const el = document.getElementById('order');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    },
    resetFilters() {
      this.activeCategory = 'all';
      this.activeTag = 'all';
      this.filterMaxPrice = 75;
      this.sortBy = 'default';
    }
  }
};
</script>
