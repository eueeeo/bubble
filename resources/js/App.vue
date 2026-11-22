<template>
  <div id="main-wrapper" class="min-h-screen flex flex-col bg-bubble-cream dark:bg-[#080e1c] text-bubble-dark dark:text-[#f1f5fd] font-sans selection:bg-bubble-pink selection:text-bubble-dark transition-colors duration-200">
    <header class="sticky top-0 z-50 bg-bubble-blue dark:bg-[#080e1c] border-b-2 border-bubble-border dark:border-[#1f2d47] transition-colors duration-200">
      <div class="w-[min(1180px,calc(100%-48px))] mx-auto min-h-[70px] flex items-center justify-between gap-6">
        <router-link to="/" class="text-white dark:text-bubble-blue-ice text-[26px] font-black tracking-[-1.4px] hover:opacity-90 transition-opacity">
          Bubble.
        </router-link>

        <nav class="hidden lg:flex items-center gap-3 xl:gap-5 ml-auto text-white dark:text-[#f1f5fd] text-xs xl:text-sm font-bold">
          <a href="/#prices" class="hover:opacity-75 transition-opacity">Цены</a>
          <a href="/#how" class="hover:opacity-75 transition-opacity">Как это работает</a>
          <a href="/#addresses" class="hover:opacity-75 transition-opacity">Адреса</a>
          <a href="/#faq" class="hover:opacity-75 transition-opacity">Вопросы</a>
          <a href="/#contacts" class="hover:opacity-75 transition-opacity">Контакты</a>

          <template v-if="isAdmin">
            <span class="text-white/40 dark:text-[#24355a]">|</span>
            <router-link to="/orders" class="text-bubble-yellow dark:text-bubble-yellow hover:underline transition-colors font-extrabold">
              Заказы
            </router-link>
            <router-link to="/logs" class="text-bubble-blue-ice hover:underline transition-colors">
              Журнал
            </router-link>
            <a href="/admin" target="_blank" class="text-xs text-white/80 dark:text-[#94a9c9] hover:text-white hover:underline">
              Voyager
            </a>
          </template>

          <button
            type="button"
            class="w-9 h-9 rounded-full border-2 border-bubble-dark dark:border-[#357ff1] bg-bubble-cream dark:bg-[#131d33] text-bubble-dark dark:text-[#f1f5fd] text-base font-black shadow-brutal-sm hover:-translate-y-0.5 transition-all flex items-center justify-center cursor-pointer shrink-0 select-none"
            :title="isDark ? 'Включить светлую тему' : 'Включить темную тему'"
            aria-label="Переключить тему"
            @click="toggleTheme"
          >
            <span v-if="isDark">☀</span>
            <span v-else>☾</span>
          </button>

          <template v-if="currentUser">
            <div class="flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-black border shadow-sm" :class="isAdmin ? 'bg-bubble-yellow text-bubble-dark border-bubble-dark' : 'bg-bubble-cream/90 dark:bg-[#131d33] text-bubble-dark dark:text-[#f1f5fd] border-bubble-dark dark:border-[#24355a]'">
              <img v-if="isAdmin" src="/images/admin-avatar.jpg" alt="Admin" class="w-6 h-6 rounded-full object-cover border border-bubble-dark" />
              <span class="px-1 truncate max-w-[120px]">{{ currentUser.name }}</span>
            </div>
            <button
              class="rounded-full border-2 border-bubble-dark dark:border-[#24355a] bg-bubble-cream dark:bg-[#131d33] text-bubble-dark dark:text-[#f1f5fd] px-3.5 py-1 text-xs font-extrabold shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all cursor-pointer"
              @click="handleLogout"
            >
              Выход
            </button>
          </template>
          <template v-else>
            <router-link
              to="/auth"
              class="rounded-full border-2 border-bubble-dark dark:border-[#24355a] bg-bubble-cream dark:bg-[#131d33] text-bubble-dark dark:text-[#f1f5fd] px-4 py-1 text-xs font-extrabold shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all"
            >
              Войти
            </router-link>
          </template>
        </nav>

        <a
          href="/#order"
          class="hidden sm:inline-flex items-center justify-center min-h-[42px] px-6 rounded-full border-2 border-bubble-dark bg-bubble-yellow text-bubble-dark font-extrabold text-sm shadow-brutal-btn hover:-translate-y-0.5 hover:shadow-brutal-btn-hover active:translate-y-0.5 active:shadow-[0_1px_0_#101a38] transition-all"
        >
          Заказать
        </a>

        <div class="lg:hidden flex items-center gap-2">
          <button
            type="button"
            class="w-[42px] h-[42px] rounded-full border-2 border-bubble-dark dark:border-[#357ff1] bg-bubble-cream dark:bg-[#131d33] text-bubble-dark dark:text-[#f1f5fd] shadow-brutal-sm flex items-center justify-center text-base cursor-pointer select-none"
            :title="isDark ? 'Светлая тема' : 'Темная тема'"
            aria-label="Тема"
            @click="toggleTheme"
          >
            <span v-if="isDark">☀</span>
            <span v-else>☾</span>
          </button>

          <button
            id="burger"
            type="button"
            aria-label="Меню"
            class="w-[42px] h-[42px] rounded-full border-2 border-bubble-dark dark:border-[#24355a] bg-bubble-pink shadow-[0_2px_0_#101a38] flex flex-col items-center justify-center gap-1 cursor-pointer active:translate-y-0.5 transition-transform"
            @click="isNavOpen = !isNavOpen"
          >
            <span class="w-5 h-[2px] bg-bubble-dark block rounded-full"></span>
            <span class="w-5 h-[2px] bg-bubble-dark block rounded-full"></span>
            <span class="w-5 h-[2px] bg-bubble-dark block rounded-full"></span>
          </button>
        </div>
      </div>

      <div
        v-if="isNavOpen"
        class="lg:hidden w-[min(1180px,calc(100%-48px))] mx-auto mb-4 p-5 bg-bubble-cream dark:bg-[#131d33] border-2 border-bubble-dark dark:border-[#24355a] rounded-2xl shadow-brutal flex flex-col gap-3 font-bold text-sm text-bubble-dark dark:text-[#f1f5fd]"
      >
        <a href="/#prices" class="hover:text-bubble-blue dark:hover:text-bubble-blue-ice" @click="isNavOpen = false">Цены</a>
        <a href="/#how" class="hover:text-bubble-blue dark:hover:text-bubble-blue-ice" @click="isNavOpen = false">Как это работает</a>
        <a href="/#addresses" class="hover:text-bubble-blue dark:hover:text-bubble-blue-ice" @click="isNavOpen = false">Адреса</a>
        <a href="/#faq" class="hover:text-bubble-blue dark:hover:text-bubble-blue-ice" @click="isNavOpen = false">Вопросы</a>
        <a href="/#contacts" class="hover:text-bubble-blue dark:hover:text-bubble-blue-ice" @click="isNavOpen = false">Контакты</a>

        <template v-if="isAdmin">
          <hr class="border-bubble-dark/20 dark:border-[#24355a] my-1">
          <router-link to="/orders" class="text-bubble-blue dark:text-bubble-blue-ice font-extrabold" @click="isNavOpen = false">
            Таблица заказов (CRM)
          </router-link>
          <router-link to="/logs" class="text-bubble-dark dark:text-[#f1f5fd] font-extrabold" @click="isNavOpen = false">
            Журнал действий (Log)
          </router-link>
          <a href="/admin" target="_blank" class="text-xs text-gray-600 dark:text-[#94a9c9] hover:text-bubble-blue" @click="isNavOpen = false">
            Панель Voyager
          </a>
        </template>

        <div class="pt-2 flex items-center justify-between">
          <template v-if="currentUser">
            <span class="text-xs font-bold text-gray-700 dark:text-[#f1f5fd]">{{ currentUser.name }}</span>
            <button
              class="px-3 py-1 rounded-full border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#080e1c] text-xs font-extrabold shadow-brutal-sm"
              @click="handleLogout"
            >
              Выход
            </button>
          </template>
          <template v-else>
            <router-link
              to="/auth"
              class="w-full text-center py-2 rounded-full border-2 border-bubble-dark bg-bubble-yellow text-bubble-dark text-xs font-extrabold shadow-brutal-sm"
              @click="isNavOpen = false"
            >
              Войти в систему
            </router-link>
          </template>
        </div>
      </div>
    </header>

    <main class="flex-1">
      <router-view :user="currentUser" :is-admin="isAdmin" @auth-success="onAuthSuccess" />
    </main>

    <footer class="bg-bubble-darker dark:bg-[#050812] text-white dark:text-[#f1f5fd] border-t-2 border-bubble-border dark:border-[#1f2d47] py-12 transition-colors duration-200">
      <div class="w-[min(1180px,calc(100%-48px))] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <a class="text-white dark:text-bubble-blue-ice text-[26px] font-black tracking-[-1.4px]" href="/#home">Bubble.</a>
          <p class="mt-2 text-[#dce4f5] dark:text-[#94a9c9] text-xs leading-relaxed">
            Стираем без заморочек. Современная прачечная с профессиональной техникой и быстрой доставкой чистых вещей прямо до вашей двери.
          </p>
        </div>

        <div>
          <h3 class="text-bubble-yellow font-bold text-[15px] mb-3">Услуги и цены</h3>
          <ul class="text-xs space-y-1.5 text-[#dce4f5] dark:text-[#94a9c9]">
            <li><a href="/#prices" class="hover:underline">Стирка от 8 BYN</a></li>
            <li><a href="/#prices" class="hover:underline">Сушка белья 5 BYN</a></li>
            <li><a href="/#prices" class="hover:underline">Глажка от 3 BYN</a></li>
            <li><a href="/#prices" class="hover:underline">Химчистка от 20 BYN</a></li>
            <li><a href="/#prices" class="hover:underline">Абонемент 6 стирок</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-bubble-yellow font-bold text-[15px] mb-3">Филиалы Bubble</h3>
          <p class="text-[#dce4f5] dark:text-[#94a9c9] text-xs my-1">ул. Пузырьковая, 12</p>
          <p class="text-[#dce4f5] dark:text-[#94a9c9] text-xs my-1">ул. Пенная, 45</p>
          <p class="text-[#dce4f5] dark:text-[#94a9c9] text-xs my-1">ул. Мыльная, 3</p>
          <p class="text-[#dce4f5] dark:text-[#94a9c9] text-xs my-1.5 font-bold">Ежедневно 8:00–22:00</p>
          <template v-if="isAdmin">
            <div class="mt-2 flex gap-3 text-xs">
              <router-link to="/orders" class="text-bubble-yellow hover:underline">Заказы</router-link>
              <span class="text-white/40">&bull;</span>
              <router-link to="/logs" class="text-bubble-yellow hover:underline">Журнал</router-link>
            </div>
          </template>
        </div>

        <div>
          <h3 class="text-bubble-yellow font-bold text-[15px] mb-3">Контакты и сервис</h3>
          <p class="text-[#dce4f5] dark:text-[#94a9c9] text-xs my-1">+375 29 000-00-00</p>
          <p class="text-[#dce4f5] dark:text-[#94a9c9] text-xs my-1">hello@bubble.by</p>
          <div class="flex gap-2 my-2 text-xs">
            <a href="https://t.me/" target="_blank" rel="noopener" class="text-[#dce4f5] dark:text-[#94a9c9] hover:underline">Telegram</a>
            <span class="text-white/40">&bull;</span>
            <a href="https://vk.com/" target="_blank" rel="noopener" class="text-[#dce4f5] dark:text-[#94a9c9] hover:underline">VK</a>
          </div>
          <template v-if="isAdmin">
            <div class="mt-3 flex items-center gap-3 text-xs">
              <a href="/admin" target="_blank" class="text-white/70 dark:text-[#94a9c9] hover:text-white hover:underline">Voyager</a>
            </div>
          </template>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      isNavOpen: false,
      currentUser: null,
      isDark: false,
    };
  },
  computed: {
    isAdmin() {
      if (!this.currentUser) return false;
      return (
        this.currentUser.role_id === 1 ||
        this.currentUser.email === 'admin@admin.com' ||
        this.currentUser.is_admin === true ||
        this.currentUser.role === 'admin'
      );
    }
  },
  mounted() {
    this.checkCurrentUser();
    this.initTheme();
  },
  methods: {
    initTheme() {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        this.isDark = true;
        document.documentElement.classList.add('dark');
      } else {
        this.isDark = false;
        document.documentElement.classList.remove('dark');
      }
    },
    toggleTheme() {
      this.isDark = !this.isDark;
      if (this.isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    },
    async checkCurrentUser() {
      try {
        const response = await axios.get('/api/auth/user');
        if (response.data.authenticated && response.data.user) {
          this.currentUser = response.data.user;
          localStorage.setItem('bubble_user', JSON.stringify(this.currentUser));
          return;
        }
      } catch (e) {
      }
      const saved = localStorage.getItem('bubble_user');
      if (saved) {
        try {
          this.currentUser = JSON.parse(saved);
        } catch (err) {
          this.currentUser = null;
        }
      } else {
        this.currentUser = null;
      }
    },
    onAuthSuccess(user) {
      this.currentUser = user;
      localStorage.setItem('bubble_user', JSON.stringify(user));
    },
    async handleLogout() {
      try {
        await axios.post('/api/auth/logout');
      } catch (e) {
      } finally {
        this.currentUser = null;
        localStorage.removeItem('bubble_user');
        this.$router.push('/');
      }
    }
  }
};
</script>
