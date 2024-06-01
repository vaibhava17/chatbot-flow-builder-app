## Project Name

Chatbot Flow Builder - [DEMO](https://chatbot-flow-builder-app.vercel.app/)

### Overview

The Chatbot Flow Builder project aims to provide a platform for users to create and visualize chatbot conversation flows easily. It offers a graphical interface where users can drag and drop nodes representing different chatbot components and connect them to define the flow of conversation. The project utilizes ReactJS with Next.js framework to build the frontend, providing a seamless user experience.

### Folder Structure

The project follows a typical Nextjs project structure:

```
project-root/
│
├── src/
│   ├── components/
│   │   ├── ChatbotFlowBuilder.tsx
│   │   ├── CustomButton.tsx
│   │   ├── CustomNode.tsx
│   │   ├── Header.tsx
│   │   ├── NodePanel.tsx
│   │   └── SettingsPanel.tsx
│   │
│   ├── utils/
│   │   ├── helper.ts
│   │   └── initialElements.ts
│   │
│   └── app/
│       ├── ...
│       ├── layout.ts
│       └── page.tsx      
│ 
├── ...
└── README.md
```

### Components

#### ChatbotFlowBuilder Component

The ChatbotFlowBuilder component is the main component of the application responsible for rendering the graphical flow editor. It allows users to interactively create and modify chatbot conversation flows by adding, connecting, and configuring nodes.

#### NodePanel Component

The NodePanel component is responsible for rendering a sidebar panel that contains a list of available chatbot node types. Users can drag nodes from this panel and drop them onto the flow editor to add them to the conversation flow.

#### SettingsPanel Component

The SettingsPanel component displays a panel where users can view and modify the settings of a selected node. It allows users to change properties such as the text or behavior (future referance) of the node.

### Deployment

The project is deployed using GitHub Actions and Vercel. A GitHub Actions workflow is defined in the `.yml` file to automate the deployment process. The workflow triggers on push events to the main branch, builds the project, and deploys it to Vercel using the Vercel token and project ID stored as secrets.

### Usage

To run the project locally, clone the repository and install dependencies using `npm install`. Then, start the development server with `npm run dev`. Access the application at `http://localhost:3000`.
