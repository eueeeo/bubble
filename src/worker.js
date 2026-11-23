export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);

      if (url.pathname === '/admin' || url.pathname.startsWith('/admin')) {
        const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Панель управления Voyager — Bubble</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #080e1c; color: #f1f5fd; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }
    .card { background: #131d33; border: 2px solid #24355a; border-radius: 20px; padding: 36px; max-width: 540px; text-align: center; box-shadow: 4px 4px 0px #000; }
    .badge { display: inline-block; background: #fed7aa; color: #9a3412; font-weight: 800; font-size: 11px; padding: 4px 12px; border-radius: 99px; text-transform: uppercase; margin-bottom: 16px; border: 1px solid #f97316; }
    h1 { color: #facc15; font-size: 26px; font-weight: 900; margin: 0 0 14px 0; }
    p { font-size: 14px; line-height: 1.6; color: #94a9c9; margin: 0 0 20px 0; }
    .info { background: #0c1424; border: 1px solid #1f2d47; border-radius: 12px; padding: 14px; text-align: left; font-size: 13px; color: #cbd5e1; margin-bottom: 24px; }
    .info code { color: #38bdf8; font-weight: bold; }
    .btn { display: inline-flex; align-items: center; justify-content: center; background: #facc15; color: #080e1c; font-weight: 800; font-size: 13px; padding: 12px 24px; border-radius: 99px; text-decoration: none; border: 2px solid #000; box-shadow: 3px 3px 0px #000; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">Laravel Voyager Admin</span>
    <h1>Панель администратора</h1>
    <p>Админ-панель Voyager работает на бэкенд-сервере PHP и базе данных SQLite.</p>
    <div class="info">
      <div>Локальный сервер: <code>php artisan serve</code></div>
      <div>Адрес панели: <code>http://127.0.0.1:8000/admin</code></div>
      <div>Вход: <code>admin@admin.com</code> / <code>password</code></div>
    </div>
    <a href="/" class="btn">← Вернуться на главную страницу</a>
  </div>
</body>
</html>`;
        return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
      }

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

        return new Response(JSON.stringify({
          data: [
            { id: 101, service: 'Стирка повседневной одежды', weight: 5, delivery: 'Заберу', phone: '+375 29 111-22-33', price: 8, status: 'completed', created_at: '2026-11-20 12:00:00' },
            { id: 102, service: 'Химчистка верхней одежды', weight: 3, delivery: 'Курьер', phone: '+375 29 444-55-66', price: 25, status: 'in_progress', created_at: '2026-11-21 15:30:00' },
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
            { id: 2, action: 'UPDATE', entity_type: 'Order', entity_id: 102, user_name: 'Admin', before_state: { status: 'new' }, after_state: { status: 'in_progress' }, created_at: '2026-11-21 15:35:00' }
          ],
          current_page: 1,
          last_page: 1,
          total: 2
        }), { headers: { 'Content-Type': 'application/json' } });
      }

      if (url.pathname.startsWith('/api/auth/user')) {
        return new Response(JSON.stringify({
          authenticated: true,
          user: { id: 1, name: 'Admin', email: 'admin@admin.com', role_id: 1, role: 'admin' }
        }), { headers: { 'Content-Type': 'application/json' } });
      }

      if (url.pathname.startsWith('/api/auth/login')) {
        return new Response(JSON.stringify({
          message: 'Успешная авторизация',
          user: { id: 1, name: 'Admin', email: 'admin@admin.com', role_id: 1, role: 'admin' }
        }), { headers: { 'Content-Type': 'application/json' } });
      }

      if (url.pathname.startsWith('/api/auth/logout')) {
        return new Response(JSON.stringify({ message: 'Успешный выход' }), {
          headers: { 'Content-Type': 'application/json' }
        });
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
