export const projects = [
  {
    id: 'rag-document-assistant',
    title: 'RAG Document Assistant',
    description: 'An intelligent document chatbot using Retrieval-Augmented Generation. Users can upload PDFs and ask questions in natural language.',
    longDescription: 'This project leverages LangChain and OpenAI GPT-4 to create a conversational interface for documents. It uses Pinecone for vector storage to enable semantic search, ensuring the model answers based on the uploaded content rather than hallucinations.',
    tags: ['Python', 'LangChain', 'OpenAI', 'Pinecone', 'Streamlit'],
    github: '#',
    demo: '#',
    image: 'https://via.placeholder.com/500x300',
    features: [
      'PDF & Text File Ingestion',
      'Semantic Search with Vector Database',
      'Context-aware Responses',
      'Source Citation'
    ]
  },
  {
    id: 'customer-churn-prediction',
    title: 'Customer Churn Prediction',
    description: 'A machine learning pipeline to predict customer churn for a telecom company using XGBoost and Scikit-learn.',
    longDescription: 'This end-to-end ML project involves data preprocessing, feature engineering, and model training. It uses XGBoost to achieve 92% accuracy in identifying at-risk customers. The model is served via a FastAPI endpoint.',
    tags: ['Python', 'Scikit-learn', 'XGBoost', 'FastAPI', 'Pandas'],
    github: '#',
    demo: '#',
    image: 'https://via.placeholder.com/500x300',
    features: [
      'Data Cleaning & Feature Engineering',
      'Model Hyperparameter Tuning',
      'Real-time Inference API',
      'Dockerized Deployment'
    ]
  },
  {
    id: 'traffic-sign-recognition',
    title: 'Traffic Sign Recognition',
    description: 'Computer Vision model capable of classifying traffic signs in real-time using Convolutional Neural Networks (CNNs).',
    longDescription: 'Built with TensorFlow and Keras, this CNN model was trained on the GTSRB dataset. It achieves high accuracy in varying lighting conditions. The project includes a web interface for uploading images to test the classifier.',
    tags: ['TensorFlow', 'Keras', 'OpenCV', 'Python', 'Deep Learning'],
    github: '#',
    demo: '#',
    image: 'https://via.placeholder.com/500x300',
    features: [
      'Custom CNN Architecture',
      'Data Augmentation Techniques',
      'Real-time Image Processing',
      'High Classification Accuracy'
    ]
  },
  {
    id: 'stock-market-forecasting',
    title: 'Stock Market Forecasting',
    description: 'Time-series forecasting model using LSTM neural networks to predict stock price trends based on historical data.',
    longDescription: 'This project utilizes Long Short-Term Memory (LSTM) networks to analyze historical stock data. It includes a dashboard built with Plotly Dash to visualize predicted trends vs. actual market movement.',
    tags: ['PyTorch', 'LSTM', 'Plotly', 'Pandas', 'Time Series'],
    github: '#',
    demo: '#',
    image: 'https://via.placeholder.com/500x300',
    features: [
      'LSTM Sequence Modeling',
      'Historical Data Analysis',
      'Interactive Dashboards',
      'Trend Visualization'
    ]
  }
];