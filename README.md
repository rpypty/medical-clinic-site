# React + TypeScript + Vite

## Запуск 
```bash
npm run build - билдит в ./dest
```
```bash
npm run dev - запускает хост
```

## Деплой в cloudflare pages 
```bash
wrangler pages deploy dist
```
Надо чтобы был установлен wrangler cli (npm install wrangler) и добавлена зависимость в проект

## Секреты для Telegram
Перед деплоем сохраните ключи в секретах Cloudflare:
```
wrangler secret put TELEGRAM_BOT_TOKEN
wrangler secret put TELEGRAM_CHAT_ID
```

## Локальный запуск с Pages Functions
Обычный `npm run dev` поднимает только Vite и не проксирует запросы в `/api/*`, поэтому `/api/send_telegram_form` там будет 404.
Соберите проект и запустите эмулятор Cloudflare Pages:
```
npm run dev:cf
```
Это откроет локальный хост, где функция `functions/api/send_telegram_form.js` будет доступна по `/api/send_telegram_form`.
