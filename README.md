# 🌱 AI-Driven Soybean Crop Disease Prediction

An AI-powered, web-based application designed to detect soybean crop diseases from leaf images using Deep Learning and provide disease-related information and management recommendations.

## 📌 Project Overview

Soybean crops are affected by various diseases that can reduce crop quality and agricultural productivity. Early identification of these diseases can help farmers take appropriate preventive and management measures.

The **AI-Driven Soybean Crop Disease Prediction and Management System** uses a Convolutional Neural Network (CNN) to analyze uploaded soybean leaf images and predict the possible disease.

The application is specifically designed for soybean plants. Images of other plants are not supported.

## 🎯 Objectives

- Detect soybean leaf diseases using Artificial Intelligence.
- Apply Deep Learning techniques for image classification.
- Provide disease-related information and management recommendations.
- Develop a user-friendly web application for disease prediction.
- Help users identify potential crop diseases at an early stage.

## ✨ Features

- **Soybean Disease Detection:** Analyze uploaded soybean leaf images.
- **CNN-Based Prediction:** Use a Convolutional Neural Network for image classification.
- **Plant Validation:** Restrict disease detection to soybean plant images.
- **Disease Information:** Display information about the predicted disease.
- **Management Recommendations:** Provide relevant disease management guidance.
- **User Interface:** Simple and user-friendly web interface.
- **Backend Integration:** Supabase integration for backend functionality and database connectivity.

## 🛠️ Technologies Used

| Category | Technologies |
|---|---|
| Frontend | React.js, TypeScript |
| Styling | Tailwind CSS |
| Build Tool | Vite |
| UI Components | shadcn/ui |
| AI / Deep Learning | Convolutional Neural Network (CNN) |
| Backend / Database | Supabase |
| Programming Language | Python |
| Version Control | Git and GitHub |

## ⚙️ System Workflow

1. User opens the web application.
2. User uploads a soybean leaf image.
3. The system validates the uploaded image.
4. The CNN model analyzes the image.
5. The system predicts the possible soybean disease.
6. Disease information and management recommendations are displayed.

**Workflow:**

`Image Upload → Plant Validation → Image Analysis → Disease Prediction → Management Recommendations`

## 📂 Project Structure

```text
AI-Driven-Soybean-Crop-Disease-Prediction/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/
│   │   ├── About.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Demo.tsx
│   │   └── ...
│   │
│   ├── hooks/
│   ├── integrations/
│   │   └── supabase/
│   ├── lib/
│   ├── pages/
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
│
├── supabase/
│   ├── functions/
│   │   └── analyze-plant/
│   ├── migrations/
│   └── config.toml
│
├── .gitignore
├── package.json
├── package-lock.json
├── index.html
├── vite.config.ts
└── README.md
```

## 🚀 Installation and Setup

### Prerequisites

- Node.js
- npm
- Git
- Supabase project and credentials

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/AI-Driven-Soybean-Crop-Disease-Prediction.git
```

### 2. Navigate to the Project Folder

```bash
cd AI-Driven-Soybean-Crop-Disease-Prediction
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add your Supabase credentials:

```env
VITE_SUPABASE_PROJECT_ID=your-project-id
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Do not upload your `.env` file or any secret keys to GitHub.

### 5. Run the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal to access the application.

## 🗄️ Backend Configuration

This project uses Supabase for backend integration.

The `supabase/` directory contains:

- Edge Functions
- Database migration files
- Supabase configuration

Configure your Supabase project and deploy the required backend functions and migrations before using backend-dependent features.

## 🔮 Future Enhancements

- Improve prediction accuracy using larger and more diverse datasets.
- Support additional soybean disease categories.
- Add multilingual support for farmers.
- Integrate weather information for better crop management.
- Develop a mobile-friendly application.
- Provide more detailed disease prevention recommendations.

## 🎓 Project Information

**Project Title:** AI-Driven Soybean Crop Disease Prediction 
**Project Domain:** Artificial Intelligence, Machine Learning and Deep Learning

**Project Type:** Web-Based Application


## 📜 License

This project is developed for academic and educational purposes.
