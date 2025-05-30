# 📝 Notemaker

A simple Note-making REST API built using **pure Node.js**, without any third-party libraries like Express. This project implements a file-based CRUD system and a logger, all handled using **Node's native modules**.

---

## 🚀 Features

- 📄 Full CRUD API for managing notes
- 🧰 Uses **only Node.js core modules** (http, fs, path, etc.)
- 🗂️ Data stored in a JSON file
- 📝 Logs every request for monitoring/debugging
- ⚙️ Modular file handling via `utils/fileManager.js`

---

## 🛠️ Tech Stack

- Node.js (Native Modules)
- No external packages (zero dependencies)

---

## 📁 Project Structure


---

## 📌 API Endpoints

| Method | Endpoint       | Description           |
|--------|----------------|-----------------------|
| GET    | `/notes`       | Get all notes         |
| GET    | `/notes/:id`   | Get a note by ID      |
| POST   | `/notes`       | Create a new note     |
| PUT    | `/notes/:id`   | Update a note by ID   |
| DELETE | `/notes/:id`   | Delete a note by ID   |

> Notes are stored in `data/notes.json`. Logging is handled in `logs/access.log`.

---

## ▶️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/BADDEEP007/Notemaker.git
cd Notemaker


node server.js
