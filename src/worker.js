export default {
  async fetch(request, env) {
    try {
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
          }), { headers: { 'Content-Type': 'application/json' } });
        }

        if (request.method === 'PUT') {
          const body = await request.json().catch(() => ({}));
          return new Response(JSON.stringify({
            message: 'Заказ успешно обновлен',
            order: body
          }), { headers: { 'Content-Type': 'application/json' } });
        }

        return new Response(JSON.stringify({
          data: [
            { id: 101, service: 'Стирка повседневной одежды', weight: 5, delivery: 'Заберу', phone: '+375 29 111-22-33', price: 8, status: 'done', created_at: '2026-11-20 12:00:00' },
            { id: 102, service: 'Химчистка верхней одежды', weight: 3, delivery: 'Курьер', phone: '+375 29 444-55-66', price: 25, status: 'processing', created_at: '2026-11-21 15:30:00' },
            { id: 103, service: 'Стирка одеял и пледов', weight: 7, delivery: 'Заберу', phone: '+375 29 777-88-99', price: 18, status: 'new', created_at: '2026-11-22 10:15:00' },
            { id: 104, service: 'Стирка и чистка обуви', weight: 2, delivery: 'Курьер', phone: '+375 29 555-77-11', price: 15, status: 'new', created_at: '2026-11-22 16:40:00' }
          ],
          current_page: 1,
          last_page: 1,
          total: 4
        }), { headers: { 'Content-Type': 'application/json' } });
      }

      if (url.pathname.startsWith('/api/logs')) {
        return new Response(JSON.stringify({
          data: [
            { id: 1, action: 'CREATE', entity_type: 'Order', entity_id: 104, user_name: 'Admin', before_state: null, after_state: { id: 104, service: 'Стирка и чистка обуви', status: 'new' }, created_at: '2026-11-22 16:40:00' },
            { id: 2, action: 'UPDATE', entity_type: 'Order', entity_id: 102, user_name: 'Admin', before_state: { status: 'new' }, after_state: { status: 'processing' }, created_at: '2026-11-21 15:35:00' }
          ],
          current_page: 1,
          last_page: 1,
          total: 2
        }), { headers: { 'Content-Type': 'application/json' } });
      }

      if (url.pathname.startsWith('/api/auth/user')) {
        return new Response(JSON.stringify({
          authenticated: false,
          user: null
        }), { headers: { 'Content-Type': 'application/json' } });
      }

      if (url.pathname.startsWith('/api/auth/login')) {
        const body = await request.json().catch(() => ({}));
        const email = (body.email || '').toLowerCase().trim();
        const isAdmin = email === 'admin@admin.com' || email.includes('admin');
        const user = isAdmin ? {
          id: 1,
          name: 'Администратор',
          email: body.email || 'admin@admin.com',
          role_id: 1,
          is_admin: true,
          role: 'admin'
        } : {
          id: 2,
          name: body.email ? body.email.split('@')[0] : 'Пользователь',
          email: body.email,
          role_id: 2,
          is_admin: false,
          role: 'user'
        };
        return new Response(JSON.stringify({
          message: 'Успешная авторизация',
          user
        }), { headers: { 'Content-Type': 'application/json' } });
      }

      if (url.pathname.startsWith('/api/auth/register')) {
        const body = await request.json().catch(() => ({}));
        const email = (body.email || '').toLowerCase().trim();
        const isAdmin = email === 'admin@admin.com' || email.includes('admin');
        const user = isAdmin ? {
          id: 1,
          name: body.name || 'Администратор',
          email: body.email || 'admin@admin.com',
          role_id: 1,
          is_admin: true,
          role: 'admin'
        } : {
          id: Date.now(),
          name: body.name || (body.email ? body.email.split('@')[0] : 'Пользователь'),
          email: body.email,
          role_id: 2,
          is_admin: false,
          role: 'user'
        };
        return new Response(JSON.stringify({
          message: 'Регистрация успешно завершена',
          user
        }), { headers: { 'Content-Type': 'application/json' } });
      }

      if (url.pathname.startsWith('/api/auth/logout')) {
        return new Response(JSON.stringify({ message: 'Успешный выход' }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }

      if (url.pathname.startsWith('/api/auth/forgot-password')) {
        return new Response(JSON.stringify({
          message: 'Если аккаунт с таким адресом существует, на него отправлена ссылка для восстановления пароля.'
        }), { headers: { 'Content-Type': 'application/json' } });
      }

      if (env && env.ASSETS && typeof env.ASSETS.fetch === 'function') {
        return await env.ASSETS.fetch(request);
      }

      return new Response('Not found', { status: 404 });
    } catch (e) {
      return new Response('Internal error: ' + e.message, { status: 500 });
    }
  }
};
