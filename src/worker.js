export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/orders')) {
      if (request.method === 'POST') {
        const body = await request.json().catch(() => ({}));
        const id = Math.floor(1000 + Math.random() * 9000);
        return new Response(JSON.stringify({
          message: 'Заказ успешно оформлен',
          order: {
            id,
            service: body.service || 'Стирка',
            weight: body.weight || 5,
            delivery: body.delivery || 'Заберу',
            phone: body.phone || '',
            price: body.price || 8,
            notes: body.notes || '',
            status: 'new',
            created_at: new Date().toISOString()
          }
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }

      if (request.method === 'GET') {
        return new Response(JSON.stringify({
          data: [
            { id: 101, service: 'Стирка', weight: 5, delivery: 'Заберу', phone: '+375 29 111-22-33', price: 8, status: 'completed', created_at: '2026-11-20 12:00:00' },
            { id: 102, service: 'Химчистка', weight: 3, delivery: 'Курьер', phone: '+375 29 444-55-66', price: 25, status: 'in_progress', created_at: '2026-11-21 15:30:00' },
            { id: 103, service: 'Стирка одеял', weight: 7, delivery: 'Заберу', phone: '+375 29 777-88-99', price: 18, status: 'new', created_at: '2026-11-22 10:15:00' }
          ],
          current_page: 1,
          last_page: 1,
          total: 3
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    if (url.pathname.startsWith('/api/auth/user')) {
      return new Response(JSON.stringify({
        authenticated: true,
        user: { id: 1, name: 'Admin', email: 'admin@admin.com', role_id: 1, role: 'admin' }
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (url.pathname.startsWith('/api/auth/login')) {
      return new Response(JSON.stringify({
        message: 'Успешная авторизация',
        user: { id: 1, name: 'Admin', email: 'admin@admin.com', role_id: 1, role: 'admin' }
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (url.pathname.startsWith('/api/auth/logout')) {
      return new Response(JSON.stringify({ message: 'Успешный выход' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return env.ASSETS.fetch(request);
  }
};
