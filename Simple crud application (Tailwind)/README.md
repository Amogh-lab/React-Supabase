# Simple CRUD Application

This is a simple, user-friendly application that allows you to efficiently manage user data using CRUD operations — **Create, Read, Update, Delete**. It provides an intuitive interface to perform these operations seamlessly with real-time updates.

---

## Features

- **Create**: Add new user information (Name, Age, Gender).
- **Read**: View all existing user data in a table format.
- **Update**: Edit and modify the details of any existing user.
- **Delete**: Remove unwanted user data.
- **Responsive UI**: Optimized for both desktop and mobile views.

---

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Supabase (as a database service)

---

## Installation and Usage

Follow these steps to run the project locally:

### Prerequisites
1. Install [Node.js](https://nodejs.org/) (v14+ recommended).
2. Create a free account on [Supabase](https://supabase.io/) and set up a new project.

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/Amogh-lab/crud-app.git
   cd crud-app

2. Install Dependencies
   ```bash
   npm install

3. Setup Supabase
- Go to [Supabase](supabase.com) and create a project 
- Create a Table named "users" with following structure
| Column Name | Data Type | Description                 |
|-------------|-----------|-----------------------------|
| id          | integer   | Primary key, auto-increment |
| name        | text      | User's name                 |
| age         | integer   | User's age                  |
| gender      | text      | User's gender (optional)    |

4. Obtain Supabase Connection Details:
- From your Supabase project dashboard, navigate to the Settings tab.
- Under API, copy the URL and Anon Key.

5. Create/edit a createClient.js file in the root directory and add the following code:
   ```bash
   import { createClient } from '@supabase/supabase-js';
     const supabaseUrl = 'YOUR_SUPABASE_URL';
     const supabaseKey = 'YOUR_SUPABASE_API_KEY';
   export const supabase = createClient(supabaseUrl, supabaseKey);
   
6. Start Server
   ```bash 
   npm run dev
- or
   ```bash
   npm start
