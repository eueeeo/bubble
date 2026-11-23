<template>
  <div>
    <div v-if="!isAdmin" class="w-[min(680px,calc(100%-48px))] mx-auto py-16 text-center">
      <div class="bg-bubble-cream dark:bg-[#131d33] border-2 border-bubble-dark dark:border-[#24355a] rounded-[22px] shadow-brutal p-8 sm:p-10">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-bubble-pink border-2 border-bubble-dark flex items-center justify-center text-2xl font-black text-bubble-dark shadow-brutal-sm">
          !
        </div>
        <h2 class="text-bubble-blue dark:text-bubble-blue-ice font-black text-2xl sm:text-3xl tracking-tight mb-3">
          Доступ ограничен
        </h2>
        <p class="text-xs sm:text-sm text-bubble-dark/80 dark:text-[#94a9c9] max-w-md mx-auto mb-6 font-medium">
          Журнал системных действий доступен только администраторам прачечной Bubble. Для просмотра истории изменений и аудита выполните вход в систему с правами администратора.
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          <router-link
            to="/auth"
            class="inline-flex items-center justify-center min-h-[42px] px-6 rounded-full border-2 border-bubble-dark bg-bubble-yellow text-bubble-dark font-extrabold text-sm shadow-brutal-btn hover:-translate-y-0.5 hover:shadow-brutal-btn-hover active:translate-y-0.5 transition-all"
          >
            Войти как администратор
          </router-link>
          <router-link
            to="/"
            class="inline-flex items-center justify-center min-h-[42px] px-6 rounded-full border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#0c1424] text-bubble-dark dark:text-[#f1f5fd] font-extrabold text-sm shadow-brutal-btn hover:-translate-y-0.5 hover:shadow-brutal-btn-hover active:translate-y-0.5 transition-all"
          >
            На главную
          </router-link>
        </div>
      </div>
    </div>

    <div v-else class="w-[min(1180px,calc(100%-48px))] mx-auto py-10">
    <div class="flex flex-wrap justify-between items-center gap-4 mb-6">
      <div>
        <h2 class="text-bubble-blue dark:text-bubble-blue-ice font-black text-3xl sm:text-4xl tracking-[-1.5px] text-shadow-title">
          Журнал действий
        </h2>
      </div>
      <button
        class="inline-flex items-center justify-center min-h-[42px] px-6 rounded-full border-2 border-bubble-dark dark:border-[#24355a] bg-bubble-cream dark:bg-[#131d33] text-bubble-dark dark:text-[#f1f5fd] font-extrabold text-sm shadow-brutal-btn hover:-translate-y-0.5 hover:shadow-brutal-btn-hover active:translate-y-0.5 transition-all cursor-pointer"
        :disabled="isLoading"
        @click="fetchLogs(currentPage)"
      >
        <span :class="{ 'animate-spin': isLoading }" class="mr-1.5">↻</span>
        Обновить журнал
      </button>
    </div>

    <div class="overflow-x-auto rounded-[22px] border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#131d33] shadow-brutal transition-colors">
      <table class="w-full text-left text-xs sm:text-sm border-collapse">
        <thead class="bg-bubble-blue-light dark:bg-[#0c1424] border-b-2 border-bubble-dark dark:border-[#24355a] text-bubble-dark dark:text-[#f1f5fd] font-black">
          <tr>
            <th class="p-3.5">ID</th>
            <th class="p-3.5">Действие</th>
            <th class="p-3.5">Объект</th>
            <th class="p-3.5">Пользователь</th>
            <th class="p-3.5">Описание</th>
            <th class="p-3.5">Дата и время</th>
            <th class="p-3.5 text-center">Сравнение</th>
          </tr>
        </thead>
        <tbody class="divide-y-2 divide-bubble-dark/10 dark:divide-[#24355a] text-bubble-dark dark:text-[#f1f5fd]">
          <tr v-if="isLoading">
            <td colspan="7" class="p-8 text-center text-bubble-dark dark:text-[#f1f5fd] font-bold">Загрузка журнала...</td>
          </tr>
          <tr v-else-if="logs.length === 0">
            <td colspan="7" class="p-8 text-center text-bubble-dark/70 dark:text-[#94a9c9] font-bold">Записей в журнале нет</td>
          </tr>
          <tr v-for="log in logs" :key="log.id" class="hover:bg-bubble-cream/50 dark:hover:bg-[#1a2640]/50 transition-colors">
            <td class="p-3.5 font-black text-bubble-dark dark:text-[#f1f5fd]">#{{ log.id }}</td>
            <td class="p-3.5">
              <span class="inline-block px-2.5 py-0.5 rounded-full border border-bubble-dark dark:border-[#24355a] text-[11px] font-bold bg-bubble-yellow text-bubble-dark">
                {{ log.action }}
              </span>
            </td>
            <td class="p-3.5 font-mono text-xs font-bold text-bubble-blue dark:text-bubble-blue-ice">
              {{ log.entity_type }} #{{ log.entity_id || '—' }}
            </td>
            <td class="p-3.5 font-bold">{{ log.user_name }}</td>
            <td class="p-3.5 text-bubble-dark/85 dark:text-[#f1f5fd]/85 font-medium max-w-[260px] truncate">{{ log.details }}</td>
            <td class="p-3.5 text-bubble-dark/70 dark:text-[#94a9c9] whitespace-nowrap text-xs font-semibold">{{ formatDate(log.created_at) }}</td>
            <td class="p-3.5 text-center whitespace-nowrap">
              <button
                class="inline-flex items-center px-3 py-1 rounded-full border-2 border-bubble-dark dark:border-[#24355a] bg-bubble-cream dark:bg-[#0c1424] text-bubble-dark dark:text-[#f1f5fd] font-extrabold text-xs shadow-brutal-sm hover:-translate-y-0.5 transition-all"
                @click="openCompareModal(log)"
              >
                Сравнить
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="totalPages > 1" class="mt-6 flex justify-end gap-1.5">
      <button
        class="w-8 h-8 rounded-full border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#131d33] text-bubble-dark dark:text-[#f1f5fd] flex items-center justify-center font-extrabold text-xs shadow-brutal-sm disabled:opacity-40"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        &laquo;
      </button>
      <button
        v-for="p in totalPages"
        :key="p"
        class="w-8 h-8 rounded-full border-2 border-bubble-dark dark:border-[#24355a] flex items-center justify-center font-extrabold text-xs transition-all"
        :class="p === currentPage ? 'bg-bubble-yellow text-bubble-dark shadow-brutal-sm scale-105' : 'bg-white dark:bg-[#131d33] text-bubble-dark dark:text-[#f1f5fd] hover:bg-bubble-cream dark:hover:bg-[#1a2640]'"
        @click="goToPage(p)"
      >
        {{ p }}
      </button>
      <button
        class="w-8 h-8 rounded-full border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#131d33] text-bubble-dark dark:text-[#f1f5fd] flex items-center justify-center font-extrabold text-xs shadow-brutal-sm disabled:opacity-40"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >
        &raquo;
      </button>
    </div>

    <base-modal
      :show="showCompare"
      title="Сравнение объекта (до и после)"
      size="lg"
      @close="showCompare = false"
    >
      <template #body>
        <div v-if="activeLog">
          <div class="mb-4 p-3 bg-bubble-blue-light/50 dark:bg-[#0c1424] border-2 border-bubble-dark dark:border-[#24355a] rounded-xl text-xs text-bubble-dark dark:text-[#f1f5fd] font-bold">
            {{ activeLog.action }} — {{ activeLog.entity_type }} #{{ activeLog.entity_id || '—' }} ({{ activeLog.user_name }})
          </div>
          <vue-json-compare
            :before="activeLog.before_state"
            :after="activeLog.after_state"
          />
        </div>
      </template>
      <template #footer>
        <button
          type="button"
          class="inline-flex items-center justify-center px-5 py-2 rounded-full border-2 border-bubble-dark dark:border-[#24355a] bg-bubble-cream dark:bg-[#131d33] text-bubble-dark dark:text-[#f1f5fd] font-extrabold text-xs shadow-brutal-btn hover:-translate-y-0.5 active:translate-y-0.5 transition-all"
          @click="showCompare = false"
        >
          Закрыть
        </button>
      </template>
    </base-modal>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import BaseModal from '../components/BaseModal.vue';
import VueJsonCompare from '../components/VueJsonCompare.vue';

export default {
  name: 'LogView',
  components: { BaseModal, VueJsonCompare },
  props: {
    user: {
      type: Object,
      default: null,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      logs: [],
      currentPage: 1,
      totalPages: 1,
      isLoading: false,
      showCompare: false,
      activeLog: null,
      pollTimer: null,
    };
  },
  mounted() {
    if (this.isAdmin) {
      this.fetchLogs(1);
    }
    this.pollTimer = setInterval(() => {
      if (this.isAdmin && !this.showCompare && !this.isLoading) {
        this.fetchLogs(this.currentPage);
      }
    }, 5000);
  },
  beforeUnmount() {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
    }
  },
  watch: {
    isAdmin(val) {
      if (val) {
        this.fetchLogs(1);
      }
    },
  },
  methods: {
    async fetchLogs(page = 1) {
      this.isLoading = true;
      try {
        const response = await axios.get(`/api/logs?page=${page}`);
        this.logs = response.data.data;
        this.currentPage = response.data.current_page;
        this.totalPages = response.data.last_page;
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
    goToPage(p) {
      if (p < 1 || p > this.totalPages) return;
      this.fetchLogs(p);
    },
    openCompareModal(log) {
      this.activeLog = log;
      this.showCompare = true;
    },
    formatDate(dt) {
      if (!dt) return '—';
      return new Date(dt).toLocaleString('ru-RU');
    },
  },
};
</script>
