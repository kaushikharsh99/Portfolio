export const posts = [
  {
    id: 'intro-to-transformers',
    title: 'Demystifying the Transformer Architecture',
    excerpt: 'A deep dive into the "Attention Is All You Need" paper and how Transformers revolutionized NLP.',
    date: 'October 15, 2024',
    readTime: '10 min read',
    category: 'Deep Learning',
    tags: ['NLP', 'Transformers', 'Attention', 'Deep Learning'],
    author: {
      name: 'Harsh Kaushik',
      avatar: 'https://ui-avatars.com/api/?name=Harsh+Kaushik&background=3B82F6&color=fff',
      role: 'Senior Data Scientist'
    },
    image: 'https://images.unsplash.com/photo-1655720357761-f18ea9e5e7e6?q=80&w=2940&auto=format&fit=crop',
    content: `
      <p class="lead">The Transformer architecture has become the backbone of modern Natural Language Processing. Since the release of "Attention Is All You Need" in 2017, it has replaced RNNs and LSTMs as the go-to architecture for sequence modeling.</p>
      
      <h2>The Encoder-Decoder Structure</h2>
      <p>Unlike RNNs, which process data sequentially, Transformers process the entire input sequence in parallel. This allows for massive parallelization on GPUs, enabling the training of huge models like GPT-4 and Llama 3.</p>
      <p>The architecture consists of two main stacks:</p>
      <ul>
        <li><strong>Encoder:</strong> Processes the input text and creates a deep representation of it.</li>
        <li><strong>Decoder:</strong> Uses the encoder's output to generate the target text (e.g., translation).</li>
      </ul>

      <h2>Multi-Head Attention</h2>
      <p>The key innovation is the <em>Self-Attention</em> mechanism. It allows the model to weigh the importance of different words in the sentence relative to the current word being processed.</p>
      <blockquote>
        "Attention is not just about focus; it's about understanding context."
      </blockquote>
      <p>By using <strong>Multi-Head Attention</strong>, the model can jointly attend to information from different representation subspaces at different positions. For example, one head might focus on grammatical structure, while another focuses on semantic meaning.</p>

      <h2>Positional Encoding</h2>
      <p>Since the model contains no recurrence and no convolution, the authors added "positional encodings" to the input embeddings to inject information about the relative or absolute position of the tokens in the sequence.</p>

      <h3>Why It Matters</h3>
      <p>This architecture paved the way for BERT, GPT, and the current Generative AI boom. Understanding it is crucial for any modern AI Engineer.</p>
    `
  },
  {
    id: 'rag-vs-finetuning',
    title: 'RAG vs. Fine-Tuning: Which Strategy to Choose?',
    excerpt: 'Comparing Retrieval-Augmented Generation and Fine-Tuning for adapting LLMs to your specific domain data.',
    date: 'November 2, 2024',
    readTime: '8 min read',
    category: 'LLMs',
    tags: ['RAG', 'Fine-Tuning', 'LLMs', 'GenAI'],
    author: {
      name: 'Harsh Kaushik',
      avatar: 'https://ui-avatars.com/api/?name=Harsh+Kaushik&background=3B82F6&color=fff',
      role: 'Senior Data Scientist'
    },
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2560&auto=format&fit=crop',
    content: `
      <p class="lead">When customizing Large Language Models (LLMs) for specific business needs, developers often face a critical choice: should I fine-tune a model or use Retrieval-Augmented Generation (RAG)? The answer isn't always binary.</p>
      
      <h2>Retrieval-Augmented Generation (RAG)</h2>
      <p>RAG connects your LLM to your private data sources (PDFs, databases, Wikis) dynamically.</p>
      <h4>Pros:</h4>
      <ul>
        <li><strong>Up-to-date info:</strong> The model always has access to the latest data without retraining.</li>
        <li><strong>Traceability:</strong> You can cite sources for every answer.</li>
        <li><strong>Cost-effective:</strong> Cheaper than training runs.</li>
      </ul>

      <h2>Fine-Tuning</h2>
      <p>Fine-tuning involves updating the weights of the pre-trained model on a specific dataset.</p>
      <h4>Pros:</h4>
      <ul>
        <li><strong>Style & Format:</strong> Excellent for teaching the model a specific voice or output format (e.g., JSON, SQL).</li>
        <li><strong>Domain Vocabulary:</strong> Helps the model understand niche jargon (e.g., medical or legal terms).</li>
        <li><strong>Latency:</strong> Can potentially remove the need for long prompts/context, speeding up inference.</li>
      </ul>

      <h3>The Verdict</h3>
      <p>For <strong>knowledge</strong>, use RAG. For <strong>behavior</strong>, use Fine-Tuning. In many enterprise cases, a hybrid approach works best: fine-tune a small model to follow instructions well, and use RAG to feed it the relevant facts.</p>
    `
  },
  {
    id: 'data-cleaning-pandas',
    title: 'Advanced Data Cleaning with Pandas',
    excerpt: 'Practical techniques for handling missing values, outliers, and messy datasets in Python.',
    date: 'December 1, 2024',
    readTime: '6 min read',
    category: 'Data Science',
    tags: ['Python', 'Pandas', 'Data Cleaning', 'Data Engineering'],
    author: {
      name: 'Harsh Kaushik',
      avatar: 'https://ui-avatars.com/api/?name=Harsh+Kaushik&background=3B82F6&color=fff',
      role: 'Senior Data Scientist'
    },
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop',
    content: `
      <p class="lead">Data cleaning is 80% of a Data Scientist's job. While <code>dropna()</code> is tempting, real-world data requires more sophisticated approaches.</p>
      
      <h2>Handling Missing Data</h2>
      <p>Beyond simple dropping, we explore imputation techniques:</p>
      <pre><code class="language-python">from sklearn.impute import KNNImputer
imputer = KNNImputer(n_neighbors=5)
df_filled = imputer.fit_transform(df)</code></pre>
      
      <p><strong>KNN Imputation</strong> is powerful because it uses the "nearest" rows to estimate the missing value, rather than just using a mean or median which might distort the distribution.</p>

      <h2>Outlier Detection</h2>
      <p>Using the Z-score or IQR (Interquartile Range) method is standard, but for multivariate data, consider <strong>Isolation Forests</strong>.</p>
      
      <h2>String Manipulation</h2>
      <p>Pandas <code>.str</code> accessor is your best friend. Use regex extraction to pull structured data out of messy logs.</p>
      
      <h3>Conclusion</h3>
      <p>Clean data beats fancy models every time. Invest time in your preprocessing pipeline.</p>
    `
  },
  {
    id: 'future-of-ai-agents',
    title: 'The Rise of Autonomous AI Agents',
    excerpt: 'Why 2025 will be the year of the Agent, and how frameworks like LangGraph are enabling it.',
    date: 'January 10, 2025',
    readTime: '7 min read',
    category: 'AI Agents',
    tags: ['Agents', 'LangChain', 'Future Tech', 'Automation'],
    author: {
      name: 'Harsh Kaushik',
      avatar: 'https://ui-avatars.com/api/?name=Harsh+Kaushik&background=3B82F6&color=fff',
      role: 'Senior Data Scientist'
    },
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2906&auto=format&fit=crop',
    content: `
      <p class="lead">We are moving from "Chatbots" that talk to "Agents" that do. Autonomous agents can plan, execute, and reflect on their actions.</p>
      
      <h2>What is an Agent?</h2>
      <p>An agent is an LLM equipped with tools (web search, calculator, API access) and a planning loop (like ReAct: Reason + Act).</p>

      <h2>LangGraph & CrewAI</h2>
      <p>New frameworks are emerging to orchestrate multi-agent systems. Imagine a "Research Agent" finding data, passing it to a "Writer Agent", which is reviewed by a "Critique Agent".</p>

      <h3>Challenges Ahead</h3>
      <p>Reliability and infinite loops are the main hurdles. Controlling the "temperature" and giving agents strict guardrails is key to production deployment.</p>
    `
  }
];
