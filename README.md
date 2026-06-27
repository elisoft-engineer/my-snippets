# MySnippets

A sleek, lightweight, and keyboard-optimized snippet manager built with React and TypeScript. Easily capture, store, and copy your code snippets or text chunks instantly. Your snippets are persisted locally so you never lose them.

## 🌐 Live Demo

You can access the live, fully functional application directly in your browser here:
👉 **[https://elisoft-engineer.github.io/my-snippets/](https://elisoft-engineer.github.io/my-snippets/)**

---

## 🚀 Features

* **Clipboard Magic:** Double-click any snippet to copy it instantly to your clipboard.
* **Keyboard-First Workflow:** Navigate and manage entries efficiently with built-in hotkeys.
* **Local Storage Persistence:** Automatically saves your collection locally so your data stays intact across browser refreshes.
* **Seamless CRUD Operations:** Quick creation, real-time updates, and immediate deletion of snippets.
* **Bulk Purge:** Clear your entire board instantly using the floating purge button or a global shortcut.

---

## 🛠️ Tech Stack

* **Framework:** React 19
* **Language:** TypeScript
* **Package Manager:** pnpm
* **Icons:** Lucide React

---

## ⌨️ Interaction & Keyboard Shortcuts

Make your workflow faster using the built-in interaction system:

| Action | Shortcut / Trigger | Context |
| :--- | :--- | :--- |
| **Copy Snippet** | `Double-Click` | On any snippet card |
| **Edit Snippet** | Press `E` | When a snippet card is focused |
| **Delete Snippet** | Press `DEL` | When a snippet card is focused |
| **Clear All Snippets** | Press `DEL` | Globally (when no specific input or item is focused) |

---

## 📦 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/my-snippets.git
   cd my-snippets
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   pnpm dev
   ```

4. **Build for production:**
   ```bash
   pnpm build
   ```

---

## 🚀 Continuous Deployment

This repository is configured with **GitHub Actions** for automated deployments. Pushing new changes directly to the `main` branch triggers the deployment workflow, compilation via `pnpm`, and publishes the live updates directly onto **GitHub Pages**.

---

## 📁 Project Structure

```text
├── .github/
│   └── workflows/
│       └── deploy.yml # Automated GitHub Actions deployment script
├── src/
│   ├── App.tsx       # Core application logic, hotkeys, and UI layout
│   ├── App.css       # Custom application styling and floating layouts
│   └── main.tsx      # Application entry point
├── package.json
└── tsconfig.json
```

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).