# fydne.app-2023 🌵

[![GitHub stars](https://img.shields.io/github/stars/Shiro-nn/fydne.app-2023?style=social)](https://github.com/Shiro-nn/fydne.app-2023/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Shiro-nn/fydne.app-2023?style=social)](https://github.com/Shiro-nn/fydne.app-2023/network/members)
[![GitHub issues](https://img.shields.io/github/issues/Shiro-nn/fydne.app-2023)](https://github.com/Shiro-nn/fydne.app-2023/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/Shiro-nn/fydne.app-2023)](https://github.com/Shiro-nn/fydne.app-2023/commits)
[![License: MIT](https://img.shields.io/github/license/Shiro-nn/fydne.app-2023)](LICENSE)
[![Status: Archived](https://img.shields.io/badge/status-archived-lightgrey.svg)](https://github.com/Shiro-nn/fydne.app-2023)

![Repo Stats](https://github-readme-stats.vercel.app/api/pin/?username=Shiro-nn&repo=fydne.app-2023)

> **fydne.app-2023** — старое приложение на Electron для одноименного проекта. 🌵 Дизайн неполный, но красивый. До конца не доделал, нужды в этом не было. Репозиторий переведён в архивный режим, код доступен "как есть" для ознакомления и экспериментов.

---

## 📂 Состав репозитория

Репозиторий содержит исходный код приложения, разделённый на три основные части, согласно diff.txt:

| Директория   | Описание                                                                 |
|--------------|-------------------------------------------------------------------------|
| **`api`**    | RESTful API на Node.js (`fastify`, `mongoose`) для взаимодействия с MongoDB и WebSocket. |
| **`desktop`**| Клиентское приложение на Electron с фронтендом (HTML, CSS, JS) и серверной логикой.      |
| **`socket`** | WebSocket-сервер на Node.js (`socket.io`) для real-time обновлений и сессий.            |

> **Примечание:** Компоненты связаны между собой, но проект не завершен, поэтому функциональность ограничена.

---

## 🚀 Быстрый старт (локально)

### Установка и запуск desktop

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/Shiro-nn/fydne.app-2023.git
   cd fydne.app-2023/desktop
   ```

2. Установите зависимости:
   ```bash
   npm install
   ```

3. Запустите приложение:
   ```bash
   npm test  # Использует "electron ." из package.json
   ```

> **Важно:** Для работы API и WebSocket требуется MongoDB и настройка `config.js` в `api` и `socket`.

### Запуск API

1. Перейдите в директорию:
   ```bash
   cd ../api
   ```

2. Установите зависимости:
   ```bash
   npm install
   ```

3. Настройте `config.js` (укажите MongoDB URI) и запустите:
   ```bash
   node init.js  # Слушает на localhost:4524
   ```

### Запуск WebSocket

1. Перейдите в директорию:
   ```bash
   cd ../socket
   ```

2. Установите зависимости:
   ```bash
   npm install
   ```

3. Настройте `config.js` и запустите:
   ```bash
   node init.js  # Слушает на localhost:4964
   ```

---

## 🧩 Архитектура проекта

```mermaid
graph LR
    A[Desktop Client] -->|HTTP| B[API]
    A -->|WebSocket| C[Socket]
    B -->|MongoDB| D[(Database)]
    C -->|MongoDB| D[(Database)]
```

- **Desktop**: Electron-приложение с интерфейсом (HTML, CSS, JS) и локальным сервером (порт 35621).
- **API**: Обеспечивает endpoints, такие как `/token/validate`, `/trade/stats`, и кэшированные данные.
- **Socket**: Real-time обновления через `socket.io`, включая сессии и данные пользователя.

---

## 🛠️ Системные требования

- **Node.js 18+** для `api` и `socket`.
- **Electron 25+** для `desktop`.
- **MongoDB 6+** для хранения сессий и статистики.

---

## 📸 Скриншоты

<img width="1278" height="720" alt="{506BF1C6-88F7-4283-B454-717CB8234922}" src="https://github.com/user-attachments/assets/8679ec76-a43c-4714-9b9d-fb358038a8d8" />

<img width="1286" height="732" alt="{F3E3AD0A-A139-4676-A08B-D0E8B5C9E59E}" src="https://github.com/user-attachments/assets/44e155b2-0e78-4b99-a27f-256292ac1064" />

<img width="1298" height="744" alt="{39F0BF3A-BEDB-40CB-A45C-4EE2D46F0F6E}" src="https://github.com/user-attachments/assets/fbf0a694-e2ba-4d88-9005-209078e455c7" />

<img width="1301" height="740" alt="{4F9565BA-FFDD-4BDF-B65C-341FE0D1FCE7}" src="https://github.com/user-attachments/assets/5300fc1c-95c7-4087-a964-e7b7679b3497" />

---

## ⚖️ Лицензия

Код распространяется под лицензией **MIT**. Используйте свободно, но без гарантий.

---

## 🤝 Вклад

Репозиторий **архивирован**, PR не принимаются. Форкайте и экспериментируйте с кодом для своих целей.
