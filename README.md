
# Project Setup

## Clone Repository

Untuk menjalankan project ini secara lokal, pertama-tama clone repositorinya:
```bash
git clone https://github.com/Rakhulsr/lazy-task-app.git
```




## Backend Setup

1. Pindah ke direktori backend:
    ```bash
    cd backend
    ```

2. Install dependencies:

    Menggunakan npm:
    ```bash
    npm install
    ```

    Atau jika menggunakan Bun:
    ```bash
    bun install
    ```

3. Buat file `.env` di folder backend dengan isi sebagai berikut:

    ```env
    DATABASE_URL="postgresql://username:password@localhost:5432/db-name?schema=public"
    PORT=5000
    JWT_SECRET='create your own key'
    NODE_ENV=development
    ```

4. Jalankan aplikasi backend:

    Menggunakan npm:
    ```bash
    npm run dev
    ```

    Atau jika menggunakan Bun:
    ```bash
    bun dev
    ```

## Client Setup

1. Pindah ke direktori client:

    ```bash
    cd client
    ```

2. Install dependencies:

    Menggunakan npm:
    ```bash
    npm install
    ```

    Atau jika menggunakan Bun:
    ```bash
    bun install
    ```

3. Jalankan aplikasi client:

    Menggunakan Vite:
    ```bash
    vite
    ```

    Atau jika menggunakan Bun:
    ```bash
    bun run dev
    ```



