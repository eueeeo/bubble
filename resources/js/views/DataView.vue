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
          Раздел управления заказами доступен только администраторам прачечной Bubble. Для просмотра таблицы заказов и канбан-доски выполните вход в систему с правами администратора.
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
          Управление заказами
        </h2>
      </div>

      <div class="flex flex-wrap items-center gap-2.5">
        <div class="inline-flex rounded-full border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#131d33] p-1 shadow-brutal-sm">
          <button
            type="button"
            class="px-4 py-1.5 rounded-full text-xs font-black transition-all"
            :class="viewMode === 'table' ? 'bg-bubble-yellow text-bubble-dark shadow-sm' : 'text-bubble-dark/70 dark:text-[#94a9c9] hover:text-bubble-dark dark:hover:text-[#f1f5fd]'"
            @click="viewMode = 'table'"
          >
            Таблица
          </button>
          <button
            type="button"
            class="px-4 py-1.5 rounded-full text-xs font-black transition-all"
            :class="viewMode === 'kanban' ? 'bg-bubble-yellow text-bubble-dark shadow-sm' : 'text-bubble-dark/70 dark:text-[#94a9c9] hover:text-bubble-dark dark:hover:text-[#f1f5fd]'"
            @click="viewMode = 'kanban'"
          >
            Канбан-доска
          </button>
          <button
            type="button"
            class="px-4 py-1.5 rounded-full text-xs font-black transition-all"
            :class="viewMode === 'analytics' ? 'bg-bubble-yellow text-bubble-dark shadow-sm' : 'text-bubble-dark/70 dark:text-[#94a9c9] hover:text-bubble-dark dark:hover:text-[#f1f5fd]'"
            @click="viewMode = 'analytics'"
          >
            Аналитика
          </button>
        </div>

        <button
          type="button"
          class="inline-flex items-center justify-center min-h-[40px] px-4 rounded-full border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#131d33] text-bubble-dark dark:text-[#f1f5fd] font-extrabold text-xs shadow-brutal-sm hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          :disabled="isLoading"
          title="Обновить список заказов"
          @click="fetchOrders(currentPage, false)"
        >
          <span :class="{ 'animate-spin': isLoading }">↻</span>
          <span class="ml-1.5 hidden sm:inline">Обновить</span>
        </button>

        <button
          class="inline-flex items-center justify-center min-h-[40px] px-5 rounded-full border-2 border-bubble-dark bg-bubble-blue text-white font-extrabold text-xs shadow-brutal-btn hover:-translate-y-0.5 hover:shadow-brutal-btn-hover active:translate-y-0.5 transition-all"
          @click="openCreateModal"
        >
          + Новый заказ
        </button>
      </div>
    </div>

    <div v-if="alertMessage" class="mb-6 p-4 bg-green-100 dark:bg-emerald-950/60 border-2 border-bubble-dark dark:border-emerald-800 text-green-900 dark:text-emerald-200 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between">
      <span>{{ alertMessage }}</span>
      <button class="font-black text-sm" @click="alertMessage = ''">&times;</button>
    </div>

    <div v-if="viewMode === 'table'">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div class="bg-white dark:bg-[#131d33] border-2 border-bubble-dark dark:border-[#24355a] rounded-2xl shadow-brutal p-4">
          <span class="text-xs font-bold text-bubble-dark/70 dark:text-[#94a9c9]">В стирке / обработке</span>
          <div class="text-2xl font-black text-bubble-dark dark:text-bubble-blue-ice mt-1">{{ activeOrdersCount }}</div>
        </div>
        <div class="bg-white dark:bg-[#131d33] border-2 border-bubble-dark dark:border-[#24355a] rounded-2xl shadow-brutal p-4">
          <span class="text-xs font-bold text-bubble-dark/70 dark:text-[#94a9c9]">Выручка (показанные)</span>
          <div class="text-2xl font-black text-bubble-dark dark:text-bubble-blue-ice mt-1">{{ totalRevenue }} BYN</div>
        </div>
        <div class="bg-white dark:bg-[#131d33] border-2 border-bubble-dark dark:border-[#24355a] rounded-2xl shadow-brutal p-4">
          <span class="text-xs font-bold text-bubble-dark/70 dark:text-[#94a9c9]">Выполненных заказов</span>
          <div class="text-2xl font-black text-bubble-dark dark:text-bubble-blue-ice mt-1">{{ completedCount }}</div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 mb-6">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Поиск по номеру заказа, телефону или услуге..."
            class="w-full min-h-[43px] px-3.5 py-2 rounded-[9px] border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#131d33] text-bubble-dark dark:text-[#f1f5fd] font-bold text-sm focus:ring-4 focus:ring-bubble-blue/20 outline-none"
          />
        </div>
        <select
          v-model="statusFilter"
          class="min-h-[43px] px-3.5 py-2 rounded-[9px] border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#131d33] text-bubble-dark dark:text-[#f1f5fd] font-bold text-sm focus:ring-4 focus:ring-bubble-blue/20 outline-none"
        >
          <option value="all">Все статусы</option>
          <option value="new">Новые</option>
          <option value="processing">В работе</option>
          <option value="done">Готовые</option>
          <option value="cancelled">Отмененные</option>
        </select>
      </div>

      <div class="overflow-x-auto rounded-[22px] border-2 border-bubble-dark dark:border-[#24355a] bg-white dark:bg-[#131d33] shadow-brutal">
        <table class="w-full text-left text-xs sm:text-sm border-collapse">
          <thead class="bg-bubble-blue-light dark:bg-[#0c1424] border-b-2 border-bubble-dark dark:border-[#24355a] text-bubble-dark dark:text-bubble-blue-ice font-black">
            <tr>
              <th class="p-3.5">ID</th>
              <th class="p-3.5">Услуга</th>
              <th class="p-3.5">Вес</th>
              <th class="p-3.5">Доставка</th>
              <th class="p-3.5">Телефон</th>
              <th class="p-3.5">Цена</th>
              <th class="p-3.5">Статус</th>
              <th class="p-3.5">Примечания</th>
              <th class="p-3.5 text-center">Действия</th>
            </tr>
          </thead>
          <tbody class="divide-y-2 divide-bubble-dark/10 dark:divide-[#24355a]">
            <tr v-if="isLoading && orders.length === 0">
              <td colspan="9" class="p-8 text-center text-bubble-dark dark:text-[#f1f5fd] font-bold">Загрузка заказов...</td>
            </tr>
            <tr v-else-if="filteredOrders.length === 0">
              <td colspan="9" class="p-8 text-center text-bubble-dark/70 dark:text-[#94a9c9] font-bold">Заказы не найдены</td>
            </tr>
            <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-bubble-cream/50 dark:hover:bg-[#1a2640] transition-colors text-bubble-dark dark:text-[#f1f5fd]">
              <td class="p-3.5 font-black text-bubble-dark dark:text-bubble-blue-ice">#{{ order.id }}</td>
              <td class="p-3.5 font-bold">{{ order.service }}</td>
              <td class="p-3.5 font-medium">{{ order.weight }} кг</td>
              <td class="p-3.5">
                <span
                  class="inline-block px-2.5 py-0.5 rounded-full border border-bubble-dark dark:border-[#24355a] text-[11px] font-bold"
                  :class="order.delivery === 'Курьер' ? 'bg-bubble-yellow dark:bg-[#1e2e54] text-bubble-dark dark:text-[#f1f5fd]' : 'bg-bubble-cream dark:bg-[#080e1c] text-bubble-dark dark:text-[#f1f5fd]'"
                >
                  {{ order.delivery }}
                </span>
              </td>
              <td class="p-3.5 font-medium whitespace-nowrap">{{ order.phone }}</td>
              <td class="p-3.5 font-black text-bubble-dark dark:text-bubble-blue-ice whitespace-nowrap">{{ Number(order.price || 0).toFixed(2) }} BYN</td>
              <td class="p-3.5">
                <span
                  class="inline-block px-2.5 py-0.5 rounded-full border border-bubble-dark dark:border-[#24355a] text-[11px] font-bold"
                  :class="statusBadgeClass(order.status)"
                >
                  {{ formatStatus(order.status) }}
                </span>
              </td>
              <td class="p-3.5 text-gray-600 dark:text-[#94a9c9] max-w-[200px] truncate font-medium">{{ order.notes || '—' }}</td>
              <td class="p-3.5 text-center whitespace-nowrap space-x-1.5">
                <button
                  class="inline-flex items-center px-3 py-1 rounded-full border-2 border-bubble-dark bg-bubble-yellow text-bubble-dark font-extrabold text-xs shadow-brutal-sm hover:-translate-y-0.5 transition-all"
                  @click="openEditModal(order)"
                >
                  Изм.
                </button>
                <button
                  class="inline-flex items-center px-3 py-1 rounded-full border-2 border-bubble-dark dark:border-[#24355a] bg-bubble-pink dark:bg-[#1a2640] text-bubble-dark dark:text-[#f1f5fd] font-extrabold text-xs shadow-brutal-sm hover:-translate-y-0.5 transition-all"
                  @click="deleteOrder(order.id)"
                >
                  Уд.
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-6 flex flex-wrap justify-between items-center gap-4">
        <div class="text-xs sm:text-sm font-bold text-bubble-dark/80 dark:text-[#94a9c9]">
          Всего записей: {{ totalRecords }} (показано: {{ orders.length }})
        </div>

        <div class="flex items-center gap-3">
          <button
            v-if="hasMorePages"
            class="inline-flex items-center justify-center px-4 py-1.5 rounded-full border-2 border-bubble-dark dark:border-[#24355a] bg-bubble-cream dark:bg-[#131d33] text-bubble-dark dark:text-[#f1f5fd] font-extrabold text-xs shadow-brutal-btn hover:-translate-y-0.5 disabled:opacity-50 transition-all"
            :disabled="isLoading"
            @click="lazyLoadMore"
          >
            Ленивая подгрузка ↓
          </button>

          <div v-if="totalPages > 1" class="flex gap-1.5">
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
              :class="p === currentPage ? 'bg-bubble-yellow dark:bg-bubble-blue text-bubble-dark dark:text-white shadow-brutal-sm scale-105' : 'bg-white dark:bg-[#131d33] text-bubble-dark dark:text-[#f1f5fd] hover:bg-bubble-cream'"
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
        </div>
      </div>
    </div>

    <div v-else-if="viewMode === 'kanban'" class="space-y-4">
      <div class="bg-bubble-cream dark:bg-[#131d33] border-2 border-bubble-dark dark:border-[#24355a] rounded-2xl p-4 flex justify-between items-center gap-3">
        <div class="text-xs font-extrabold text-bubble-blue dark:text-bubble-blue-ice">
          Активных заказов в доске: {{ orders.length }}
        </div>
      </div>

      <div class="overflow-x-auto snap-x snap-mandatory flex gap-6 pb-6 items-start">
        <section
          class="min-w-[300px] w-80 bg-bubble-cream/70 dark:bg-[#0c1424] border-2 rounded-2xl p-4 snap-center shrink-0 transition-all"
          :class="dragOverColumn === 'new' ? 'border-bubble-blue ring-4 ring-bubble-blue/20 bg-bubble-blue-light/30' : 'border-bubble-dark dark:border-[#24355a]'"
          @dragover="handleDragOver($event, 'new')"
          @dragleave="handleDragLeave($event, 'new')"
          @drop="handleDrop($event, 'new')"
        >
          <div class="flex items-center justify-between mb-3 pb-2 border-b-2 border-bubble-dark/15 dark:border-[#24355a]">
            <h3 class="text-xs font-black text-bubble-dark dark:text-bubble-blue-ice uppercase tracking-wider">Новые заказы</h3>
            <span class="text-xs font-black bg-bubble-blue-light dark:bg-[#1a2640] border border-bubble-dark dark:border-[#24355a] text-bubble-dark dark:text-[#f1f5fd] px-2.5 py-0.5 rounded-full shadow-sm">
              {{ kanbanNewOrders.length }}
            </span>
          </div>

          <div class="space-y-3">
            <div v-if="kanbanNewOrders.length === 0" class="text-center py-8 text-xs font-bold text-bubble-dark/50 dark:text-[#94a9c9]/50 border-2 border-dashed border-bubble-dark/20 dark:border-[#24355a] rounded-xl">
              Нет новых заказов
            </div>

            <article
              v-for="order in kanbanNewOrders"
              :key="order.id"
              draggable="true"
              @dragstart="handleDragStart($event, order)"
              @dragend="handleDragEnd"
              class="group bg-white dark:bg-[#131d33] rounded-xl border-2 border-bubble-dark dark:border-[#24355a] p-4 shadow-sm hover:shadow-brutal-sm cursor-grab active:cursor-grabbing transition-all select-none"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="px-2 py-0.5 rounded text-[10px] font-black bg-bubble-blue-light dark:bg-[#1a2640] text-bubble-dark dark:text-[#f1f5fd] border border-bubble-dark dark:border-[#24355a]">
                  {{ order.service }}
                </span>
                <span class="text-bubble-dark/30 dark:text-[#94a9c9]/30 group-hover:text-bubble-dark dark:group-hover:text-[#f1f5fd] text-xs font-mono select-none" title="Drag-handle">⋮⋮</span>
              </div>
              <h4 class="text-xs font-black text-bubble-dark dark:text-[#f1f5fd]">Заказ #{{ order.id }} • {{ order.weight }} кг</h4>
              <p class="text-xs text-bubble-dark/80 dark:text-[#94a9c9] mt-1 line-clamp-2 font-medium">
                {{ order.notes || 'Клиент ожидает распределения в барабан стирки.' }}
              </p>
              <div class="mt-3 pt-2.5 border-t border-bubble-dark/10 dark:border-[#24355a] flex items-center justify-between text-[11px] font-bold">
                <span class="text-bubble-dark dark:text-bubble-blue-ice font-black">{{ Number(order.price || 0).toFixed(2) }} BYN</span>
                <button
                  type="button"
                  class="px-2.5 py-1 rounded-full border border-bubble-dark dark:border-[#24355a] bg-bubble-yellow text-bubble-dark text-[10px] font-extrabold hover:-translate-y-0.5 transition-all"
                  @click="updateOrderStatus(order, 'processing')"
                >
                  В стирку →
                </button>
              </div>
            </article>
          </div>
        </section>

        <section
          class="min-w-[300px] w-80 bg-bubble-cream/70 dark:bg-[#0c1424] border-2 rounded-2xl p-4 snap-center shrink-0 transition-all"
          :class="dragOverColumn === 'processing' ? 'border-bubble-yellow ring-4 ring-bubble-yellow/30 bg-bubble-yellow/20' : 'border-bubble-dark dark:border-[#24355a]'"
          @dragover="handleDragOver($event, 'processing')"
          @dragleave="handleDragLeave($event, 'processing')"
          @drop="handleDrop($event, 'processing')"
        >
          <div class="flex items-center justify-between mb-3 pb-2 border-b-2 border-bubble-dark/15 dark:border-[#24355a]">
            <h3 class="text-xs font-black text-bubble-dark dark:text-bubble-blue-ice uppercase tracking-wider">В стирке / обработке</h3>
            <span class="text-xs font-black bg-bubble-yellow dark:bg-[#1a2640] border border-bubble-dark dark:border-[#24355a] text-bubble-dark dark:text-[#f1f5fd] px-2.5 py-0.5 rounded-full shadow-sm">
              {{ kanbanProcessingOrders.length }}
            </span>
          </div>

          <div class="space-y-3">
            <div v-if="kanbanProcessingOrders.length === 0" class="text-center py-8 text-xs font-bold text-bubble-dark/50 dark:text-[#94a9c9]/50 border-2 border-dashed border-bubble-dark/20 dark:border-[#24355a] rounded-xl">
              Стиральные машины свободны
            </div>

            <article
              v-for="order in kanbanProcessingOrders"
              :key="order.id"
              draggable="true"
              @dragstart="handleDragStart($event, order)"
              @dragend="handleDragEnd"
              class="group bg-white dark:bg-[#131d33] rounded-xl border-2 border-bubble-dark dark:border-[#24355a] p-4 shadow-sm hover:shadow-brutal-sm cursor-grab active:cursor-grabbing transition-all select-none"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="px-2 py-0.5 rounded text-[10px] font-black bg-bubble-yellow dark:bg-[#1a2640] text-bubble-dark dark:text-[#f1f5fd] border border-bubble-dark dark:border-[#24355a]">
                  {{ order.service }}
                </span>
                <span class="text-bubble-dark/30 dark:text-[#94a9c9]/30 group-hover:text-bubble-dark dark:group-hover:text-[#f1f5fd] text-xs font-mono select-none" title="Drag-handle">⋮⋮</span>
              </div>
              <h4 class="text-xs font-black text-bubble-dark dark:text-[#f1f5fd]">Заказ #{{ order.id }} • {{ order.delivery }}</h4>
              <p class="text-xs text-bubble-dark/80 dark:text-[#94a9c9] mt-1 line-clamp-2 font-medium">
                {{ order.notes || 'Выполняется стирка и сушка вещей с добавлением кондиционера.' }}
              </p>
              <div class="mt-3 pt-2.5 border-t border-bubble-dark/10 dark:border-[#24355a] flex items-center justify-between text-[11px] font-bold">
                <span class="text-bubble-dark dark:text-bubble-blue-ice font-black">{{ Number(order.price || 0).toFixed(2) }} BYN</span>
                <button
                  type="button"
                  class="px-2.5 py-1 rounded-full border border-bubble-dark dark:border-emerald-800 bg-green-200 dark:bg-emerald-950 text-green-950 dark:text-emerald-200 text-[10px] font-extrabold hover:-translate-y-0.5 transition-all"
                  @click="updateOrderStatus(order, 'done')"
                >
                  Готов →
                </button>
              </div>
            </article>
          </div>
        </section>

        <section
          class="min-w-[300px] w-80 bg-bubble-cream/70 dark:bg-[#0c1424] border-2 rounded-2xl p-4 snap-center shrink-0 transition-all"
          :class="dragOverColumn === 'done' ? 'border-emerald-500 ring-4 ring-emerald-500/20 bg-emerald-50 dark:bg-emerald-950/30' : 'border-bubble-dark dark:border-[#24355a]'"
          @dragover="handleDragOver($event, 'done')"
          @dragleave="handleDragLeave($event, 'done')"
          @drop="handleDrop($event, 'done')"
        >
          <div class="flex items-center justify-between mb-3 pb-2 border-b-2 border-bubble-dark/15 dark:border-[#24355a]">
            <h3 class="text-xs font-black text-bubble-dark dark:text-bubble-blue-ice uppercase tracking-wider">Готовы к выдаче</h3>
            <span class="text-xs font-black bg-green-200 dark:bg-emerald-950 border border-bubble-dark dark:border-emerald-800 text-bubble-dark dark:text-emerald-200 px-2.5 py-0.5 rounded-full shadow-sm">
              {{ kanbanDoneOrders.length }}
            </span>
          </div>

          <div class="space-y-3">
            <div v-if="kanbanDoneOrders.length === 0" class="text-center py-8 text-xs font-bold text-bubble-dark/50 dark:text-[#94a9c9]/50 border-2 border-dashed border-bubble-dark/20 dark:border-[#24355a] rounded-xl">
              Нет заказов, готовых к выдаче
            </div>

            <article
              v-for="order in kanbanDoneOrders"
              :key="order.id"
              draggable="true"
              @dragstart="handleDragStart($event, order)"
              @dragend="handleDragEnd"
              class="group bg-white dark:bg-[#131d33] rounded-xl border-2 border-bubble-dark dark:border-[#24355a] p-4 shadow-sm opacity-95 hover:opacity-100 cursor-grab active:cursor-grabbing transition-all select-none"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="px-2 py-0.5 rounded text-[10px] font-black bg-green-200 dark:bg-emerald-950 text-green-950 dark:text-emerald-200 border border-bubble-dark dark:border-emerald-800">
                  Готов
                </span>
                <span class="text-bubble-dark/30 dark:text-[#94a9c9]/30 group-hover:text-bubble-dark dark:group-hover:text-[#f1f5fd] text-xs font-mono select-none" title="Drag-handle">⋮⋮</span>
              </div>
              <h4 class="text-xs font-black text-bubble-dark dark:text-[#f1f5fd]">Заказ #{{ order.id }} • {{ order.phone }}</h4>
              <p class="text-xs text-bubble-dark/80 dark:text-[#94a9c9] mt-1 line-clamp-2 font-medium">
                Вещи упакованы и переданы в зону выдачи или курьеру.
              </p>
              <div class="mt-3 pt-2.5 border-t border-bubble-dark/10 dark:border-[#24355a] flex items-center justify-between text-[11px] font-bold">
                <span class="text-bubble-dark dark:text-bubble-blue-ice font-black">{{ Number(order.price || 0).toFixed(2) }} BYN</span>
                <span class="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">Завершен</span>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>

    <div v-else-if="viewMode === 'analytics'" class="space-y-6">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 sm:col-span-6 lg:col-span-3 bg-white dark:bg-[#131d33] p-5 rounded-2xl border-2 border-bubble-dark dark:border-[#24355a] shadow-brutal-sm min-w-0">
          <div class="text-xs font-bold text-bubble-dark/70 dark:text-[#94a9c9] truncate">Выручка по заказам</div>
          <div class="text-2xl font-black text-bubble-dark dark:text-bubble-blue-ice mt-1">{{ totalRevenue }} BYN</div>
        </div>

        <div class="col-span-12 sm:col-span-6 lg:col-span-3 bg-white dark:bg-[#131d33] p-5 rounded-2xl border-2 border-bubble-dark dark:border-[#24355a] shadow-brutal-sm min-w-0">
          <div class="text-xs font-bold text-bubble-dark/70 dark:text-[#94a9c9] truncate">Новые заявки</div>
          <div class="text-2xl font-black text-bubble-dark dark:text-bubble-blue-ice mt-1">{{ kanbanNewOrders.length }}</div>
        </div>

        <div class="col-span-12 sm:col-span-6 lg:col-span-3 bg-white dark:bg-[#131d33] p-5 rounded-2xl border-2 border-bubble-dark dark:border-[#24355a] shadow-brutal-sm min-w-0">
          <div class="text-xs font-bold text-bubble-dark/70 dark:text-[#94a9c9] truncate">В обработке</div>
          <div class="text-2xl font-black text-bubble-dark dark:text-bubble-blue-ice mt-1">{{ kanbanProcessingOrders.length }}</div>
        </div>

        <div class="col-span-12 sm:col-span-6 lg:col-span-3 bg-white dark:bg-[#131d33] p-5 rounded-2xl border-2 border-bubble-dark dark:border-[#24355a] shadow-brutal-sm min-w-0">
          <div class="text-xs font-bold text-bubble-dark/70 dark:text-[#94a9c9] truncate">Средний чек</div>
          <div class="text-2xl font-black text-bubble-dark dark:text-bubble-blue-ice mt-1">{{ averageCheck }} BYN</div>
        </div>
      </div>

      <div class="bg-white dark:bg-[#131d33] p-6 rounded-2xl border-2 border-bubble-dark dark:border-[#24355a] shadow-brutal-sm text-bubble-dark dark:text-[#f1f5fd]">
        <div class="flex justify-between items-center mb-4 pb-2 border-b-2 border-bubble-dark/10 dark:border-[#24355a]">
          <div>
            <h3 class="text-base font-black text-bubble-dark dark:text-bubble-blue-ice">Загрузка прачечной по дням недели</h3>
          </div>
          <span class="px-3 py-1 rounded-full border border-bubble-dark dark:border-[#24355a] bg-bubble-cream dark:bg-[#080e1c] text-[11px] font-black text-bubble-dark dark:text-[#f1f5fd]">
            Текущая неделя
          </span>
        </div>

        <div class="grid grid-cols-7 gap-3 h-48 items-end border-b-2 border-bubble-dark/20 dark:border-[#24355a] pb-3 px-2">
          <div class="flex flex-col items-center gap-1.5 group">
            <span class="text-[10px] font-bold text-bubble-dark/60 dark:text-[#94a9c9] group-hover:text-bubble-blue">45%</span>
            <div class="w-full bg-bubble-blue/40 dark:bg-bubble-blue/50 group-hover:bg-bubble-blue rounded-t-lg transition-all" style="height: 55px;"></div>
            <span class="text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd]">Пн</span>
          </div>

          <div class="flex flex-col items-center gap-1.5 group">
            <span class="text-[10px] font-bold text-bubble-dark/60 dark:text-[#94a9c9] group-hover:text-bubble-blue">65%</span>
            <div class="w-full bg-bubble-blue/60 dark:bg-bubble-blue/70 group-hover:bg-bubble-blue rounded-t-lg transition-all" style="height: 80px;"></div>
            <span class="text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd]">Вт</span>
          </div>

          <div class="flex flex-col items-center gap-1.5 group">
            <span class="text-[10px] font-bold text-bubble-dark/60 dark:text-[#94a9c9] group-hover:text-bubble-blue">60%</span>
            <div class="w-full bg-bubble-blue/60 dark:bg-bubble-blue/70 group-hover:bg-bubble-blue rounded-t-lg transition-all" style="height: 75px;"></div>
            <span class="text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd]">Ср</span>
          </div>

          <div class="flex flex-col items-center gap-1.5 group">
            <span class="text-[10px] font-bold text-bubble-dark/60 dark:text-[#94a9c9] group-hover:text-bubble-blue">85%</span>
            <div class="w-full bg-bubble-blue/80 group-hover:bg-bubble-blue rounded-t-lg transition-all" style="height: 110px;"></div>
            <span class="text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd]">Чт</span>
          </div>

          <div class="flex flex-col items-center gap-1.5 group">
            <span class="text-[10px] font-black text-bubble-blue dark:text-bubble-blue-ice">100%</span>
            <div class="w-full bg-bubble-blue rounded-t-lg transition-all" style="height: 130px;"></div>
            <span class="text-xs font-black text-bubble-blue dark:text-bubble-blue-ice">Пт</span>
          </div>

          <div class="flex flex-col items-center gap-1.5 group">
            <span class="text-[10px] font-bold text-bubble-dark/60 dark:text-[#94a9c9] group-hover:text-bubble-blue">90%</span>
            <div class="w-full bg-bubble-blue/80 group-hover:bg-bubble-blue rounded-t-lg transition-all" style="height: 115px;"></div>
            <span class="text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd]">Сб</span>
          </div>

          <div class="flex flex-col items-center gap-1.5 group">
            <span class="text-[10px] font-bold text-bubble-dark/60 dark:text-[#94a9c9] group-hover:text-bubble-blue">50%</span>
            <div class="w-full bg-bubble-blue/50 group-hover:bg-bubble-blue rounded-t-lg transition-all" style="height: 65px;"></div>
            <span class="text-xs font-extrabold text-bubble-dark dark:text-[#f1f5fd]">Вс</span>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-[#131d33] rounded-2xl border-2 border-bubble-dark dark:border-[#24355a] shadow-brutal-sm overflow-hidden min-w-0">
        <div class="p-4 border-b-2 border-bubble-dark/15 dark:border-[#24355a] flex justify-between items-center bg-bubble-cream dark:bg-[#0c1424]">
          <h3 class="text-sm font-black text-bubble-dark dark:text-bubble-blue-ice">Последние транзакции и операции</h3>
          <span class="text-xs font-bold text-bubble-dark/70 dark:text-[#94a9c9]">Всего заказов: {{ orders.length }}</span>
        </div>
        <div class="overflow-x-auto scrollbar-thin">
          <table class="w-full text-xs text-left">
            <thead class="bg-bubble-blue-light/50 dark:bg-[#080e1c] text-bubble-dark dark:text-bubble-blue-ice border-b-2 border-bubble-dark/10 dark:border-[#24355a] font-black">
              <tr>
                <th class="p-3">Номер</th>
                <th class="p-3">Телефон</th>
                <th class="p-3">Услуга</th>
                <th class="p-3">Вес</th>
                <th class="p-3">Сумма</th>
                <th class="p-3">Статус</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-bubble-dark/10 dark:divide-[#24355a]">
              <tr v-for="order in orders.slice(0, 7)" :key="order.id" class="hover:bg-bubble-cream/40 dark:hover:bg-[#1a2640] text-bubble-dark dark:text-[#f1f5fd]">
                <td class="p-3 font-black text-bubble-blue dark:text-bubble-blue-ice truncate">#{{ order.id }}</td>
                <td class="p-3 font-bold text-bubble-dark dark:text-[#f1f5fd] truncate">{{ order.phone }}</td>
                <td class="p-3 font-medium text-bubble-dark dark:text-[#f1f5fd] truncate">{{ order.service }}</td>
                <td class="p-3 font-medium text-bubble-dark dark:text-[#f1f5fd]">{{ order.weight }} кг</td>
                <td class="p-3 font-black text-bubble-dark dark:text-bubble-blue-ice">{{ Number(order.price || 0).toFixed(2) }} BYN</td>
                <td class="p-3">
                  <span
                    class="px-2.5 py-0.5 rounded-full border border-bubble-dark dark:border-[#24355a] text-[10px] font-black"
                    :class="statusBadgeClass(order.status)"
                  >
                    {{ formatStatus(order.status) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <order-modal
      :show="showModal"
      :order-data="currentOrder"
      @close="showModal = false"
      @save="handleSaveOrder"
    />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import OrderModal from '../components/OrderModal.vue';

export default {
  name: 'DataView',
  components: { OrderModal },
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
      orders: [],
      searchQuery: '',
      statusFilter: 'all',
      currentPage: 1,
      totalPages: 1,
      totalRecords: 0,
      hasMorePages: false,
      isLoading: false,
      showModal: false,
      currentOrder: null,
      alertMessage: '',
      viewMode: 'table',
      draggedOrder: null,
      dragOverColumn: null,
      pollTimer: null,
    };
  },
  computed: {
    filteredOrders() {
      return this.orders.filter(order => {
        const q = this.searchQuery.trim().toLowerCase();
        const matchQuery = !q ||
          String(order.id).includes(q) ||
          (order.phone && order.phone.toLowerCase().includes(q)) ||
          (order.service && order.service.toLowerCase().includes(q)) ||
          (order.notes && order.notes.toLowerCase().includes(q));
        const norm = this.normalizeStatus(order.status);
        const matchStatus = this.statusFilter === 'all' || norm === this.statusFilter;
        return matchQuery && matchStatus;
      });
    },
    activeOrdersCount() {
      return this.orders.filter(o => {
        const norm = this.normalizeStatus(o.status);
        return norm === 'processing' || norm === 'new';
      }).length;
    },
    totalRevenue() {
      return this.orders.reduce((sum, o) => sum + Number(o.price || 0), 0).toFixed(2);
    },
    completedCount() {
      return this.orders.filter(o => this.normalizeStatus(o.status) === 'done').length;
    },
    averageCheck() {
      if (this.orders.length === 0) return '0.00';
      const sum = this.orders.reduce((acc, o) => acc + Number(o.price || 0), 0);
      return (sum / this.orders.length).toFixed(2);
    },
    kanbanNewOrders() {
      return this.orders.filter(o => this.normalizeStatus(o.status) === 'new');
    },
    kanbanProcessingOrders() {
      return this.orders.filter(o => this.normalizeStatus(o.status) === 'processing');
    },
    kanbanDoneOrders() {
      return this.orders.filter(o => this.normalizeStatus(o.status) === 'done');
    }
  },
  mounted() {
    if (this.isAdmin) {
      this.fetchOrders(1, false);
    }
    this.pollTimer = setInterval(() => {
      if (this.isAdmin && !this.showModal && !this.isLoading) {
        this.fetchOrders(this.currentPage, false);
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
        this.fetchOrders(1, false);
      }
    },
  },
  methods: {
    async fetchOrders(page = 1, append = false) {
      this.isLoading = true;
      try {
        const response = await axios.get(`/api/orders?page=${page}`);
        const data = response.data;
        this.orders = append ? [...this.orders, ...data.data] : data.data;
        this.currentPage = data.current_page;
        this.totalPages = data.last_page;
        this.totalRecords = data.total;
        this.hasMorePages = data.current_page < data.last_page;
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
    goToPage(p) {
      if (p < 1 || p > this.totalPages || p === this.currentPage) return;
      this.fetchOrders(p, false);
    },
    lazyLoadMore() {
      if (this.hasMorePages) {
        this.fetchOrders(this.currentPage + 1, true);
      }
    },
    openCreateModal() {
      this.currentOrder = null;
      this.showModal = true;
    },
    openEditModal(order) {
      this.currentOrder = { ...order };
      this.showModal = true;
    },
    async handleSaveOrder(formData) {
      try {
        const payload = {
          service: formData.service,
          weight: Number(formData.weight) || 1,
          delivery: formData.delivery,
          phone: formData.phone,
          status: formData.status || 'new',
          price: Number(formData.price) || 0,
          notes: formData.notes || ''
        };
        if (formData.id) {
          const res = await axios.put(`/api/orders/${formData.id}`, payload);
          this.alertMessage = res.data.message || 'Заказ успешно обновлен';
        } else {
          const res = await axios.post('/api/orders', payload);
          this.alertMessage = res.data.message || 'Заказ успешно создан';
        }
        this.showModal = false;
        await this.fetchOrders(this.currentPage, false);
      } catch (error) {
        this.alertMessage = error.response?.data?.message || 'Ошибка сохранения заказа на сервере';
      }
    },
    async deleteOrder(id) {
      if (!confirm(`Удалить заказ #${id}?`)) return;
      try {
        const res = await axios.delete(`/api/orders/${id}`);
        this.alertMessage = res.data.message || 'Заказ удален';
        await this.fetchOrders(this.currentPage, false);
      } catch (error) {
        alert(error.response?.data?.message || error.message);
      }
    },
    async updateOrderStatus(order, newStatus) {
      const oldStatus = order.status;
      order.status = newStatus;
      try {
        const payload = {
          service: order.service,
          weight: Number(order.weight) || 1,
          delivery: order.delivery || 'Заберу',
          phone: order.phone || '+375 29 000-00-00',
          status: newStatus,
          price: Number(order.price) || 0,
          notes: order.notes || ''
        };
        await axios.put(`/api/orders/${order.id}`, payload);
        this.alertMessage = `Статус заказа #${order.id} изменен на "${this.formatStatus(newStatus)}"`;
        await this.fetchOrders(this.currentPage, false);
      } catch (err) {
        order.status = oldStatus;
        this.alertMessage = 'Не удалось обновить статус заказа на сервере';
      }
    },
    handleDragStart(e, order) {
      this.draggedOrder = order;
      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', String(order.id));
      }
    },
    handleDragEnd() {
      this.draggedOrder = null;
      this.dragOverColumn = null;
    },
    handleDragOver(e, status) {
      e.preventDefault();
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'move';
      }
      this.dragOverColumn = status;
    },
    handleDragLeave(e, status) {
      if (this.dragOverColumn === status) {
        this.dragOverColumn = null;
      }
    },
    handleDrop(e, status) {
      e.preventDefault();
      this.dragOverColumn = null;
      if (this.draggedOrder) {
        const order = this.draggedOrder;
        this.draggedOrder = null;
        if (this.normalizeStatus(order.status) !== status) {
          this.updateOrderStatus(order, status);
        }
      }
    },
    normalizeStatus(status) {
      const s = String(status || '').trim().toLowerCase();
      if (s === 'new' || s === 'новый') return 'new';
      if (s === 'processing' || s === 'in_progress' || s === 'в работе' || s === 'процесс') return 'processing';
      if (s === 'done' || s === 'completed' || s === 'готов' || s === 'завершен') return 'done';
      if (s === 'cancelled' || s === 'отменен') return 'cancelled';
      return s || 'new';
    },
    formatStatus(status) {
      const norm = this.normalizeStatus(status);
      const map = {
        'new': 'Новый',
        'processing': 'В работе',
        'done': 'Готов',
        'cancelled': 'Отменен',
      };
      return map[norm] || status || 'Новый';
    },
    statusBadgeClass(status) {
      const norm = this.normalizeStatus(status);
      if (norm === 'new') return 'bg-bubble-blue-light dark:bg-[#152347] text-bubble-dark dark:text-[#f1f5fd]';
      if (norm === 'processing') return 'bg-bubble-yellow dark:bg-[#1e2e54] text-bubble-dark dark:text-[#f1f5fd]';
      if (norm === 'done') return 'bg-green-200 dark:bg-emerald-950 text-bubble-dark dark:text-emerald-200';
      if (norm === 'cancelled') return 'bg-bubble-pink dark:bg-rose-950 text-bubble-dark dark:text-rose-200';
      return 'bg-slate-100 dark:bg-slate-800 text-bubble-dark dark:text-[#f1f5fd]';
    },
  },
};
</script>
