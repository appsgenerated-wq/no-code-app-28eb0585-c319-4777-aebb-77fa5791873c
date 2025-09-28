# Newtonium: An Interactive Encyclopedia

Welcome to Newtonium, a web application dedicated to exploring the profound discoveries and principles of Sir Isaac Newton. This application is built entirely on the Manifest platform, showcasing a powerful, database-backed frontend with user authentication and content management capabilities.

## Features

- **Backend by Manifest**: The entire backend, including database, API, and authentication, is generated and managed by Manifest.
- **User Authentication**: Users can sign up as 'contributors' to add new content. An admin role is also available for full management.
- **Dynamic Content**: Browse a growing list of Newton's discoveries and principles.
- **Content Contribution**: Authenticated contributors can add new discoveries and principles through a simple dashboard interface.
- **Ownership**: Each piece of content is owned by the contributor who created it, and only they can edit or delete it.
- **Admin Panel**: A complete admin interface is available at `/admin` for managing users and all content.

## Getting Started

### Prerequisites

- Node.js and npm
- A running Manifest backend instance for this application.

### Running the Frontend

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Start the development server:**
    ```bash
    npm run dev
    ```

3.  Open your browser and navigate to `http://localhost:5173`.

### Default Credentials

- **Contributor:**
  - **Email:** `contributor@manifest.build`
  - **Password:** `password`

- **Admin (for the Admin Panel):**
  - **Email:** `admin@manifest.build`
  - **Password:** `admin`

Access the powerful auto-generated admin panel by visiting `${config.BACKEND_URL}/admin`.
