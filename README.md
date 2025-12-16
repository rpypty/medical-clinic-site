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
wrangler deploy 
```
Надо чтобы был установлен wrangler cli (npm install wrangler) и добавлена зависимость в проект

## Секреты для Telegram
Перед деплоем сохраните ключи в секретах Cloudflare:
```
wrangler secret put TELEGRAM_BOT_TOKEN
wrangler secret put TELEGRAM_CHAT_ID
```
