# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

This project is a simple CRUD application built with React and Supabase. 
It features:

- Create User: A form to add new users with fields for name, age, and gender.
- Read Users: A dynamic table that fetches and displays all users from the database.
- Update User: An editable form that appears when clicking the "Edit" button in the table, allowing modification of user details.
- Delete User: A "Delete" button in the table to remove a user from the database.