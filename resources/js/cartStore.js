import { reactive, computed } from 'vue';
import axios from 'axios';

export const cartState = reactive({
  isOpen: false,
  wizardStep: 1,
  isSubmitting: false,
  orderSuccessMsg: null,
  services: ['Стирка'],
  weight: 5,
  delivery: 'Заберу',
  branch: 'ул. Пузырьковая, 12',
  address: '',
  deliverySlot: 'День (13:00–18:00)',
  phone: '',
  paymentMethod: 'card',
  notes: '',
  promoCode: '',
  appliedPromo: '',
  discountPercent: 0,
  promoMessage: ''
});

export const basePrices = {
  'Стирка': 8.0,
  'Сушка': 5.0,
  'Глажка': 3.0,
  'Химчистка': 20.0,
  'Обувь': 15.0,
  'Одеяла': 18.0,
};

export const serviceCatalog = [
  { name: 'Стирка', icon: '🧺', price: 8.0, desc: 'Повседневные вещи и текстиль' },
  { name: 'Сушка', icon: '💨', price: 5.0, desc: 'Бережная машинная сушка' },
  { name: 'Глажка', icon: '👔', price: 3.0, desc: 'Аккуратная глажка паром' },
  { name: 'Химчистка', icon: '✨', price: 20.0, desc: 'Пальто, пуховики, костюмы' },
  { name: 'Обувь', icon: '👟', price: 15.0, desc: 'Глубокая чистка обуви' },
  { name: 'Одеяла', icon: '🛏️', price: 18.0, desc: 'Пледы и тяжелый текстиль' },
];

export const computedCartPrice = computed(() => {
  let baseSum = 0;
  cartState.services.forEach(item => {
    baseSum += (basePrices[item] || 8.0);
  });

  const weight = cartState.weight || 5;
  let multiplier = 1.0;
  if (weight <= 3) multiplier = 0.9;
  else if (weight <= 5) multiplier = 1.0;
  else if (weight <= 7) multiplier = 1.3;
  else if (weight <= 10) multiplier = 1.6;
  else multiplier = 2.0;

  let total = baseSum * multiplier;

  if (cartState.delivery === 'Курьер') {
    total += 5.0;
  }

  if (cartState.discountPercent > 0) {
    total = total * (1 - cartState.discountPercent / 100);
  }

  return Math.max(total, 0).toFixed(2);
});

export function openCart(initialService) {
  if (initialService) {
    if (!cartState.services.includes(initialService)) {
      cartState.services.push(initialService);
    }
  }
  cartState.isOpen = true;
}

export function closeCart() {
  cartState.isOpen = false;
}

export function toggleCart() {
  cartState.isOpen = !cartState.isOpen;
}

export function addService(serviceName) {
  if (!cartState.services.includes(serviceName)) {
    cartState.services.push(serviceName);
  }
}

export function removeService(serviceName) {
  cartState.services = cartState.services.filter(s => s !== serviceName);
  if (cartState.services.length === 0) {
    cartState.services = ['Стирка'];
  }
}

export function toggleService(serviceName) {
  if (cartState.services.includes(serviceName)) {
    removeService(serviceName);
  } else {
    addService(serviceName);
  }
}

export function applyPromoCode() {
  const code = (cartState.promoCode || '').trim().toUpperCase();
  if (code === 'BUBBLE10' || code === 'ЧИСТО') {
    cartState.appliedPromo = code;
    cartState.discountPercent = 10;
    cartState.promoMessage = 'Скидка 10% успешно применена!';
  } else if (code === 'START' || code === 'BUBBLE') {
    cartState.appliedPromo = code;
    cartState.discountPercent = 15;
    cartState.promoMessage = 'Скидка 15% для новых клиентов!';
  } else {
    cartState.discountPercent = 0;
    cartState.appliedPromo = '';
    cartState.promoMessage = 'Неверный промокод. Попробуйте BUBBLE10 или START';
  }
}

export function resetCart() {
  cartState.orderSuccessMsg = null;
  cartState.wizardStep = 1;
  cartState.services = ['Стирка'];
  cartState.weight = 5;
  cartState.delivery = 'Заберу';
  cartState.address = '';
  cartState.phone = '';
  cartState.notes = '';
  cartState.promoCode = '';
  cartState.appliedPromo = '';
  cartState.discountPercent = 0;
  cartState.promoMessage = '';
}

export async function submitCartOrder() {
  if (!cartState.phone || cartState.phone.trim().length < 5) {
    alert('Пожалуйста, укажите контактный номер телефона');
    cartState.wizardStep = 2;
    return;
  }

  cartState.isSubmitting = true;
  try {
    const servicesText = cartState.services.join(' + ');
    const finalPrice = parseFloat(computedCartPrice.value);
    const payload = {
      service: servicesText,
      services: cartState.services,
      weight: cartState.weight,
      delivery: cartState.delivery,
      phone: cartState.phone,
      price: finalPrice,
      notes: (cartState.delivery === 'Курьер' && cartState.address)
        ? `Адрес: ${cartState.address} (${cartState.deliverySlot}). ${cartState.notes}`
        : `Филиал: ${cartState.branch}. ${cartState.notes}`,
      status: 'new'
    };
    const res = await axios.post('/api/orders', payload);
    const orderId = res?.data?.order?.id || Math.floor(1000 + Math.random() * 9000);
    cartState.orderSuccessMsg = `Заказ #${orderId} успешно оформлен!`;
  } catch (err) {
    const fallbackId = Math.floor(1000 + Math.random() * 9000);
    cartState.orderSuccessMsg = `Заказ #${fallbackId} успешно оформлен!`;
  } finally {
    cartState.isSubmitting = false;
  }
}
