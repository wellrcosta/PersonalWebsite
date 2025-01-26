# **Personal Website**

This is my **personal website project** built with **Next.js 15**, **Shadcn UI**, and **TailwindCSS**.  
The site includes:

- **Blog:** Where I share content and ideas.
- **Personal Tasks:** A space to manage my daily tasks.

Data is persisted using **Supabase**, ensuring a dynamic and interactive experience.

---

## **📂 Project Structure**

```plaintext
├── app/               # Main site pages
├── components/        # Reusable components
├── supabase/          # Have a SQL script to create tables and rules
├── utils/             # Utility functions
├── hooks/             # Only have a toast hook for now
├── lib/               # Custom libraries
├── supabase/          # Supabase configuration and SQL
│   └── supabase.sql   # Script to create tables and rules
├── public/            # Public assets (images, icons, etc.)
└── README.md          # This file
```

---

## **🚀 Technologies Used**

- [Next.js 15](https://nextjs.org/)
- [Shadcn UI](https://shadcn.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)

---

## **📦 Installation**

### **1. Clone the repository**

```bash
git clone https://github.com/your-username/your-project.git
cd your-project
```

### **2. Install dependencies**

Ensure you have Node.js installed, then run:

```bash
npm install
```

### **3. Configure the environment**

Create a **`.env.local`** file in the project root with the following variables:

```plaintext
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

> Replace `your-supabase-url` and `your-anon-key` with the values provided in your Supabase dashboard.

### **4. Set up Supabase**

1. Log in to your Supabase dashboard.
2. Navigate to the **SQL Editor** tab and copy the contents of:  
   `supabase/supabase.sql`.
3. Run the script to create the necessary tables and rules.

---

## **💻 Running the Project**

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

---

## **🛠 Useful Commands**

- **Build for Production:**
  ```bash
  npm run build
  ```
- **Start Production Server:**
  ```bash
  npm start
  ```
- **Lint and Format Code:**
  ```bash
  npm run lint
  ```

---

## **🌟 Key Features**

1. **Dynamic Blog:**
   - Simple and intuitive interface.
   - Data stored and fetched from Supabase.
2. **Task Manager:**

   - Create, edit, and organize personal tasks.
   - Data persistence using Supabase.

3. **Test User:**
   - A test account is available for exploring the app.
     - **Email:** `test@test.com`
     - **Password:** `test`

---

## **📝 Contributing**

If you want to contribute:

1. Fork the project.
2. Create a branch for your feature:
   ```bash
   git checkout -b my-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Added new feature"
   ```
4. Push your branch:
   ```bash
   git push origin my-feature
   ```

---

## **📄 License**

This project is licensed under the MIT License.
