export interface EvolutionStep {
  version: string;
  throughput: number;
  description?: string;
}

export interface PlatformBenchmark {
  name: string;
  specs: string[];
  throughput: string;
  model: string;
}

export interface GenerationExample {
  prompt: string;
  output: string;
}

export interface ModelComparison {
  name: string;
  accuracy: string;
  parameters: string;
  purpose: string;
}

export interface TimelineNode {
  title: string;
  description: string;
  status: "completed" | "current" | "pending";
}

export interface BeforeAfterExample {
  query: string;
  before: string;
  after: string;
}

export interface ProjectDetail {
  id: string;
  name: string;
  status: "Ongoing" | "Completed" | "Research";
  tagline: string;
  description: string;
  stack: string[];
  achievements: string[];
  githubUrl: string;
  huggingfaceUrl?: string;
  demoUrl?: string;
  featured?: boolean;
  terminalLog?: string;

  // Rich Case Study Details
  motivation: string;
  problemStatement: string;
  architectureDesc: string;
  architectureDiagram?: string; // HTML-safe ASCII diagram or schematic
  technicalImplementation?: string;
  keyFeatures: string[];
  challenges: string;
  solutions: string;
  metrics: { value: string; label: string }[];
  inspirations: { title: string; link?: string }[];
  futureWork: string;
  codeSnippet?: {
    language: string;
    code: string;
    filename: string;
  };
  
  // Custom Visual Metrics
  evolution?: EvolutionStep[];
  platforms?: PlatformBenchmark[];
  benchmarkImage?: string;

  // TinyStories Specific Research Fields
  generationExamples?: GenerationExample[];
  trainingConfig?: { label: string; value: string }[];
  limitations?: string[];
  lessons?: { title: string; content: string }[];

  // Spam Detection Specific ML Fields
  modelComparison?: ModelComparison[];

  // Indian Legal LLM Specific Research Fields
  timeline?: TimelineNode[];
  modelVersions?: { version: string; baseModel: string; size: string; dataset: string; format: string; reason: string }[];
  beforeAfter?: BeforeAfterExample[];
  observedImprovements?: string[];
  whatWentWrong?: { issue: string; details: string }[];
  keyInsight?: string;
  currentDirection?: string[];
}

export const projectsData: ProjectDetail[] = [
  {
    id: "turbollm",
    name: "Turbo-LLM",
    status: "Ongoing",
    tagline: "Fast Memory-Efficient Inference Engine for Large MoE Models",
    description:
      "Turbo-LLM is an experimental inference engine designed to run very large Mixture-of-Experts language models under strict VRAM constraints using dynamic expert execution and adaptive memory management.",
    stack: ["Python", "PyTorch", "CUDA", "C++", "Hugging Face"],
    achievements: [
      "Runs 35B MoE models on entry-level ~6 GB VRAM GPUs",
      "~21× performance speedup vs. baseline prototype",
      "Reached 2.3 tok/s throughput on an NVIDIA RTX 3050 Laptop",
    ],
    githubUrl: "https://github.com/kaushikharsh99/Turbo-LLM",
    huggingfaceUrl: "https://huggingface.co/kaushik-harsh-99",
    featured: true,
    terminalLog: `$ turbo-llm --model Qwen/Qwen3.6-35B-A3B-FP8 --prompt "Who is Donald Trump?" --max_new_tokens 512
[init] loading Qwen3.6-35B-A3B-FP8 weights...
[memory] hierarchical VRAM cache size: 5.4 GB
[runtime] generation active (RTX 3050: 2.30 tok/s)`,
    motivation:
      "Running large Mixture-of-Experts (MoE) language models locally is heavily bottlenecked by GPU memory bandwidth and capacity. On consumer hardware (e.g., 6 GB or 16 GB nodes), traditional inference engines require loading all weights into VRAM, making 30B+ parameters models impossible to run. Turbo-LLM exists to explore alternative execution patterns: shifting from static full-model residency in VRAM to dynamic, sequential offloading hierarchies to execute massive models locally on entry-level hardware.",
    problemStatement:
      "Traditional inference engines load the full model weights into VRAM, which requires far more memory than consumer GPUs provide. For instance, a 35B MoE model in FP8 requires almost 35 GB of VRAM, rendering it completely unrunnable on standard 6 GB consumer laptops. OS-level swapping or naive paging causes severe trashing and performance collapse down to 0.11 tokens/second.",
    architectureDesc:
      "Turbo-LLM uses a hierarchical offloading execution pipeline. Instead of storing the full model inside GPU VRAM, it manages a cache across SSD, CPU RAM (Host Memory), and GPU VRAM (Device Memory). Weights are streamed layer-by-layer: during the forward pass, only the active attention blocks and routed top-k experts are loaded dynamically into VRAM cache slots. Inactive experts are cached in host memory or evicted, and key-value (KV) states are tracked sequentially.",
    architectureDiagram: `┌────────────────────────────────────────────────────────┐
│                   INFERENCE REQUEST                    │
└──────────────────────────┬─────────────────────────────┘
                           ▼
             ┌───────────────────────────┐
             │  Layer-by-Layer Streaming │
             └─────────────┬─────────────┘
                           ▼
             ┌───────────────────────────┐
             │  Dynamic Expert Routing   │ (Top-K Active Selection)
             └─────────────┬─────────────┘
                           ▼
             ┌───────────────────────────┐
             │   Hierarchical Memory     │ (Weight Registry Coordinator)
             │        Manager            │
             └───────┬───────┬───────┬───┘
                     │       │       │
                     ▼       ▼       ▼
                  [ SSD ] [ RAM ] [ VRAM ]
                  (Disk)  (Host)  (Device Cache)`,
    keyFeatures: [
      "Dynamic expert streaming into GPU cache memory slots during active tokens routing",
      "SSD → RAM → VRAM hierarchical memory offloading caching layers",
      "Sequential MoE execution bounding memory overhead during forward passes",
      "Automatic Hugging Face model download and local model caching support",
      "Interactive CLI with customizable YAML configuration override files",
      "Benchmark logging mode to track token throughput and memory profiling statistics",
    ],
    challenges:
      "The major bottleneck of this approach is the latency introduced by moving heavy expert weight tensors across the PCIe bus from host CPU RAM to GPU VRAM for every token generation step, resulting in a baseline throughput of just 0.11 tok/s.",
    solutions:
      "I implemented double buffering (Ping-Pong buffers) to hide transfer latency behind active calculations, asynchronous prefetching, warm caching for high-probability routed experts, and active parameter pinning in GPU memory to reduce allocation overheads, boosting speed to 2.3 tok/s.",
    metrics: [
      { value: "35B MoE", label: "Model Scale Supported" },
      { value: "~6 GB", label: "Peak VRAM Consumption" },
      { value: "2.3 tok/s", label: "RTX 3050 Laptop Speed" },
      { value: "~21.0×", label: "Throughput Gain vs Baseline" },
    ],
    inspirations: [
      { title: "AirLLM: Running 70B models on single consumer GPUs", link: "https://github.com/lm-sys/FastChat" },
      { title: "Mixtral of Experts (MoE) Architecture Paper", link: "https://arxiv.org/abs/2401.04088" },
    ],
    futureWork:
      "Implement higher throughput scheduling, extend kernel optimizations for attention scaling, add multi-GPU split streaming profiles, and design more efficient expert caching algorithms.",
    evolution: [
      { version: "Baseline", throughput: 0.11, description: "Naive layer streaming from disk" },
      { version: "Prefetch + Cache", throughput: 0.87, description: "Asynchronous prefetching & CPU cache pool" },
      { version: "Decode Optimization", throughput: 1.14, description: "Minimized CPU-GPU sync steps" },
      { version: "Static Buffers", throughput: 1.33, description: "Persistent pre-allocated GPU buffers" },
      { version: "Active Pinning", throughput: 1.82, description: "Pinning key attention parameters" },
      { version: "Warm Cache", throughput: 1.92, description: "Expert routing bias warm cache" },
      { version: "Current", throughput: 2.30, description: "Double-buffered execution pipeline" },
    ],
    platforms: [
      { name: "NVIDIA RTX 3050 Laptop", specs: ["16 GB RAM", "6 GB VRAM"], throughput: "2.30 tok/s", model: "Qwen/Qwen3.6-35B-A3B-FP8" },
      { name: "Intel ULTRA 7 CPU", specs: ["16 GB RAM", "No GPU (CPU-only)"], throughput: "0.42 tok/s", model: "Qwen/Qwen3-30B-A3B-Instruct-2507-FP8" },
      { name: "Apple M4", specs: ["16 GB Unified Memory", "Apple Silicon"], throughput: "0.31 tok/s", model: "Qwen/Qwen3-30B-A3B-Instruct-2507-FP8" },
    ],
    benchmarkImage: "/benchmark.png",
  },
  {
    id: "tinystories-17m",
    name: "TinyStories-17M",
    status: "Completed",
    tagline: "Training a 17.2M Parameter Language Model From Scratch",
    description:
      "TinyStories-17M is a decoder-only Transformer trained entirely from scratch on 2.1 million TinyStories-style synthetic stories to explore how capable modern Small Language Models can become through high-quality data and efficient architecture.",
    stack: ["PyTorch", "SentencePiece", "Parquet", "Hugging Face", "Python"],
    achievements: [
      "Trained a 17.2M parameter custom decoder-only Transformer from scratch",
      "Curated and processed 2.1M synthetic story data inputs with zero padding",
      "Achieved fluent grammar, dialogue syntax, and narrative coherence",
    ],
    githubUrl: "https://github.com/kaushikharsh99/TinyStories-17M",
    huggingfaceUrl: "https://huggingface.co/kaushik-harsh-99",
    featured: true,
    terminalLog: `$ turbo-llm --model Qwen/Qwen3.6-35B-A3B-FP8 --prompt "Who is Donald Trump?" --max_new_tokens 512
[init] loading Qwen3.6-35B-A3B-FP8 weights...
[memory] hierarchical VRAM cache size: 5.4 GB
[runtime] generation active (RTX 3050: 2.30 tok/s)`,
    motivation:
      "While large language models are trained on thousands of GPUs, the core principles of optimization, training stability, and emergent grammar apply equally at smaller scales. I built TinyStories-17M to gain a deep, first-principles understanding of generative pretraining. The goal was to build the entire pipeline—from tokenizing raw corpora to writing custom transformer layers and handling multi-threaded batch streams—with no framework abstractions.",
    problemStatement:
      "Teaching a model coherent storytelling with limited parameters requires exceptionally clean and structured datasets. Raw web data contains too much noise, and tokenization boundary mismatches can destabilize gradients. The pipeline required strict data curation and robust training parameters to prevent early loss divergence.",
    architectureDesc:
      "The model is a GPT-style decoder-only transformer featuring SwiGLU non-linearities, pre-layer normalization via RMSNorm, and Rotary Position Embeddings (RoPE) instead of traditional absolute position encodings.",
    architectureDiagram: `┌────────────────────────────────────────────────────────┐
│                      INPUT TOKENS                      │
└──────────────────────────┬─────────────────────────────┘
                           ▼
                 ┌──────────────────┐
                 │ Token Embedding  │ (Tied Weights)
                 └─────────┬────────┘
                           ▼
                 ┌──────────────────┐  ◄─── RoPE Rotations
                 │ RMSNorm Layer    │
                 └─────────┬────────┘
                           ▼
                 ┌──────────────────┐
                 │ Causal Attention │  ◄─── Flash-Attention SDPA
                 └─────────┬────────┘
                           ▼
                 ┌──────────────────┐
                 │ SwiGLU MLP Block │  ◄─── Gated Projections
                 └─────────┬────────┘
                           ▼
                 ┌──────────────────┐
                 │   RMSNorm + LM   │
                 └─────────┬────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│                   PROBABILITY DIST                     │
└────────────────────────────────────────────────────────┘`,
    keyFeatures: [
      "SentencePiece BPE tokenizer optimized for child vocabulary subset",
      "Pre-LN architecture with RMSNorm layers for gradient stability",
      "SwiGLU activation functions replacing standard GeLU blocks",
      "Custom dataset indexing allowing instant random-access on Parquet files",
    ],
    challenges:
      "Early training was plagued by loss spikes and NaNs when learning rate warmups were too aggressive, which caused gradients to overflow.",
    solutions:
      "I implemented gradient clipping at 1.0, coupled with a cosine decay learning rate scheduler featuring a longer linear warmup period of 2,000 steps. This stabilized the initial attention weights and kept parameters bound.",
    metrics: [
      { value: "17.2M", label: "Trained Parameters" },
      { value: "2.1M", label: "Synthetic Stories" },
      { value: "8 Layers", label: "Transformer Depth" },
      { value: "512", label: "Context Window Length" },
    ],
    inspirations: [
      { title: "TinyStories: How Small Can Language Models Be?", link: "https://arxiv.org/abs/2305.07759" },
      { title: "LLaMA: Open and Efficient Foundation Models", link: "https://arxiv.org/abs/2302.13971" },
    ],
    futureWork:
      "Increase training dataset to 3.7M stories, run architecture experiments using Grouped-Query Attention (GQA), train for longer steps with larger effective batch sizes, and optimize tokenizer bounds.",
    generationExamples: [
      {
        prompt: "Once upon a time, there was a little girl named Lily. She loved to play in the garden with her toys. One day, she saw a big, beautiful butterfly.",
        output: "She wanted to catch it, but she was careful not to hurt it. She sat very still, and the butterfly landed on her hand. Lily was so happy. She ran to tell her mom all about her new friend. Her mom said, \"Lily, you are very gentle. That is a good thing to be.\" Lily smiled and went back to look at the butterfly again."
      },
      {
        prompt: "Lily and Ben were playing in the park. Lily found a small, round stone on the ground.",
        output: "She showed it to Ben. \"Look, Ben!\" she said. \"This stone is shiny and green.\" Ben touched the stone. It felt cold. They decided to bury the stone under the tree. They dug a little hole with a stick. Then they put the stone inside and covered it with dirt. \"Now it has a home,\" Ben said. They went home for lunch, feeling very proud."
      }
    ],
    trainingConfig: [
      { label: "Optimizer", value: "AdamW (lr=5e-4, beta=(0.9, 0.95), weight_decay=0.1)" },
      { label: "Precision", value: "BF16 Mixed Precision (AMP)" },
      { label: "LR Scheduler", value: "Cosine Annealing with linear warmup (2,000 steps)" },
      { label: "Epochs", value: "8 Epochs" },
      { label: "Batch Size", value: "70 (Micro-batch)" },
      { label: "Context Length", value: "512 tokens" },
      { label: "Vocabulary Size", value: "8000 (SentencePiece BPE)" }
    ],
    limitations: [
      "Limited general knowledge because training is restricted to children's themes",
      "Susceptibility to loop repetitions in very long generation contexts (>300 tokens)",
      "Small scale prevents complex mathematical calculations, translation, or logical coding steps",
      "Lack of real-world historical facts or technical domain information"
    ],
    lessons: [
      {
        title: "Clean Data Over Scale",
        content: "For small parameter language models, low token noise is critical. Clean synthetic text enables grammar representation to emerge at much lower step counts."
      },
      {
        title: "BF16 Convergence Stability",
        content: "We faced severe gradient overflow spikes in early iterations. Restricting gradient norms to 1.0 combined with 2,000 warmup steps kept training curves stable."
      },
      {
        title: "Vocabulary Sizing Constraints",
        content: "Setting vocabulary capacity to 8,000 words balanced model embedding size with token sequence lengths, forcing early representation learning onto layers."
      }
    ]
  },
  {
    id: "spam-detection",
    name: "Spam Detection Model",
    status: "Completed",
    tagline: "From Classical Machine Learning to Knowledge Distillation",
    description:
      "An end-to-end email classification system that explores multiple machine learning paradigms, progressing from TF-IDF baselines to deep neural networks and finally a lightweight distilled model for efficient deployment.",
    stack: ["Python", "PyTorch", "Scikit-learn", "NumPy", "Pandas"],
    achievements: [
      "Multi-class email classification across Ham, Spam, and Phishing categories",
      "Compressed teacher model by 40× (80M to 2M params) via Knowledge Distillation",
      "Maintained high accuracy (98.12% student vs 98.38% teacher) with low latency",
    ],
    githubUrl: "https://github.com/kaushikharsh99/Spam-Detection-Model",
    huggingfaceUrl: "https://huggingface.co/kaushik-harsh-99",
    featured: true,
    terminalLog: `$ python train.py --distill --temperature 3.0 --alpha 0.5
[init] loading locuoco/the-biggest-spam-ham-phish-email-dataset-300000...
[data] loaded 300,000 emails | classes: ham, spam, phish
[teacher] accuracy: 98.38% (80M params)
[distill] epoch 5/5 | student loss: 0.124 | student accuracy: 98.12%`,
    motivation:
      "Developing text classifiers for production environments requires finding the optimal trade-off between model accuracy and inference latency. Large deep learning models deliver top-tier predictive capabilities but suffer from high computational overhead, making them expensive or slow to run at scale. I built the Spam Detection Model to explore the transition from classical TF-IDF architectures to high-capacity neural network teachers, and then condense that knowledge into a compact, deployable student classifier using distillation techniques.",
    problemStatement:
      "Organizations must filter legitimate mail (ham), unsolicited ads (spam), and high-risk security threats (phishing). Detecting phishing attempts requires analyzing subtle wording cues rather than simple keywords, demanding high-capacity models. However, serving an 80M parameter neural network model to scan millions of inbound emails in real time introduces substantial host costs and processing latency. We need a model that runs with minimal VRAM and CPU cycles while matching deep model accuracy.",
    architectureDesc:
      "The project is structured in three development phases. First, Logistic Regression and Linear SVM classifiers establish TF-IDF baselines. Second, an 80M parameter deep neural network is trained as a Teacher model using 512-dimension word embeddings, residual blocks, and global max pooling. Finally, a lightweight 2M parameter Student model is trained via distillation, leveraging an attention mechanism, 128-dimension embeddings, and a combined loss function mapping both ground-truth tags and soft teacher logits.",
    architectureDiagram: `┌────────────────────────────────────────────────────────┐
│                    TRAINING DATASET                    │
└──────────────────────────┬─────────────────────────────┘
                           ▼
             ┌───────────────────────────────┐
             │       Tokenized Sequences     │ (Fixed Len: 150)
             └──────────────┬────────────────┘
                            ▼
           ┌─────────────────────────────────┐
           │        TEACHER MODEL (80M)      │ (Embeddings: 512d)
           └──────────────────┬──────────────┘
                              │ (Soft Logits)
                              ▼
           ┌─────────────────────────────────┐
           │    KNOWLEDGE DISTILLATION       │ (KL Divergence Loss)
           │      [Temperature: 3.0]         │
           └──────────────────┬──────────────┘
                              ▼
           ┌─────────────────────────────────┐
           │        STUDENT MODEL (2M)       │ (Embeddings: 128d + Attention)
           └─────────────────────────────────┘`,
    keyFeatures: [
      "Multi-class classification logic categorizing Ham, Spam, and Phish messages",
      "Knowledge Distillation pipeline using temperature-scaled KL Divergence loss",
      "Classical ML benchmarks utilizing Logistic Regression and Linear SVM configurations",
      "Deep neural teacher model structured with residual blocks, layer normalization, and dropout",
      "Lightweight student architecture utilizing self-attention with compact vocab lists",
      "Class weighting logic to handle severe category imbalances in email data",
    ],
    challenges:
      "The primary challenge was the training dataset imbalance, where phishing emails were heavily underrepresented compared to ham, causing the model to initially misclassify phishing attempts as ham.",
    solutions:
      "I calculated class weights based on inverse frequency ratios and integrated them directly into the Cross-Entropy loss functions. For knowledge distillation, I tuned the alpha ratio to balance ground-truth categories with soft teacher outputs, boosting phishing classification precision.",
    metrics: [
      { value: "98.38%", label: "Teacher Accuracy" },
      { value: "98.12%", label: "Distilled Model" },
      { value: "80M", label: "Teacher Parameters" },
      { value: "2M", label: "Student Parameters" },
    ],
    inspirations: [
      { title: "Distilling the Knowledge in a Neural Network", link: "https://arxiv.org/abs/1503.02531" },
      { title: "locuoco/the-biggest-spam-ham-phish-email-dataset-300000", link: "https://huggingface.co/datasets/locuoco/the-biggest-spam-ham-phish-email-dataset-300000" },
    ],
    futureWork:
      "Integrate character-level embeddings to improve robustness against obfuscated spelling or typo-based email bypasses, and package the distilled student model as a WebAssembly module for browser-native email scanning.",
    trainingConfig: [
      { label: "Teacher Parameters", value: "~80 Million" },
      { label: "Student Parameters", value: "~2 Million" },
      { label: "Sequence Length", value: "150 tokens" },
      { label: "Temperature", value: "3.0" },
      { label: "Alpha Ratio", value: "0.5 (loss balancing)" },
      { label: "Vocabulary Size", value: "20,000 tokens" },
      { label: "Loss Metrics", value: "CrossEntropy + KL Div" }
    ],
    limitations: [
      "Vulnerable to novel adversarial obfuscations or unicode spelling bypasses in email text",
      "Limited accuracy on languages other than English due to dataset focus",
      "Does not analyze email attachments or embedded hyperlinks directly, only text content",
      "Requires model retuning as spam/phishing campaign topics evolve over time"
    ],
    lessons: [
      {
        title: "TF-IDF Baselines Stand Strong",
        content: "Logistic Regression and SVM benchmarks achieved ~95.4% accuracy, proving that classical algorithms remain essential checkpoints before building deep systems."
      },
      {
        title: "Logits Are Dense Representations",
        content: "By learning soft teacher probabilities rather than hard binary targets, the 2M student generalized better and avoided the overfitting pitfalls typical of small networks."
      },
      {
        title: "Weights Balance Imbalances",
        content: "Phishing threats represent a small percentage of raw email datasets. Applying inverse class frequency multipliers in the loss function was critical to make training convergent."
      }
    ],
    modelComparison: [
      { name: "Logistic Regression", accuracy: "95.30%", parameters: "~20K (Vocabulary weight vectors)", purpose: "TF-IDF baseline classification" },
      { name: "Support Vector Machine (SVM)", accuracy: "95.40%", parameters: "~20K (Vocabulary weight vectors)", purpose: "Margin-based baseline" },
      { name: "Neural Teacher", accuracy: "98.38%", parameters: "80,000,000 (Residual network)", purpose: "Maximum accuracy checkpoint" },
      { name: "Distilled Student", accuracy: "98.12%", parameters: "2,000,000 (Self-attention + 128d embed)", purpose: "Lightweight, low-latency deployment" }
    ]
  },
  {
    id: "indian-legal-llm",
    name: "Indian Legal LLM",
    status: "Research",
    tagline: "Domain Adaptation of Open Language Models for Indian Legal Reasoning",
    description:
      "A series of domain-specific fine-tuning experiments exploring how high-quality legal instruction datasets improve small language models for Indian legal question answering, structured reasoning, and long-form explanation.",
    stack: ["PyTorch", "Transformers", "GGUF", "Hugging Face", "Python"],
    achievements: [
      "Domain adaptation experiments tuning Qwen models for legal reasoning",
      "Assembled custom Indian Legal Dataset V3 with over 171K+ samples",
      "Compiled GGUF weights for local inference, debugging, and experimentation",
    ],
    githubUrl: "https://github.com/kaushikharsh99",
    huggingfaceUrl: "https://huggingface.co/kaushik-harsh-99",
    featured: true,
    terminalLog: `$ ./llama-cli -m qwen3-1.7b-legal.gguf -p "Explain Section 420 IPC"
[init] loaded model qwen3-1.7b-legal.gguf
[eval] reasoning paths aligned with statutory provisions...
[output] Section 420 IPC deals with cheating and dishonestly inducing delivery of property...`,
    motivation:
      "Teaching compact language models domain-specific legal reasoning is highly challenging. General-purpose baseline models excel at broad instruction following but fall short on statutory precision, legal formatting styles, and jurisdictional nuances. I started this iterative research project to investigate how small language models (under 2B parameters) adapt when exposed to dense, structured Indian legal instruction sets, observing how dataset quality drives reasoning consistency.",
    problemStatement:
      "Standard LLMs produce vague, generic responses when queried about Indian statutory codes, civil litigation, or judicial procedures. Alternatively, increasing parameter scale to resolve domain gaps increases hardware demands. We need to explore whether post-training domain adaptation can align a 0.5B or 1.7B parameter model to provide coherent legal summaries, and understand what data factors prevent hallucinations.",
    architectureDesc:
      "This project focuses on supervised fine-tuning (SFT) over two generations. V1 trained a Qwen 2.5 (0.5B) model on Dataset V2 (~171K samples). Based on failure analysis (hallucinated implications, unsupported conclusions), V2 shifted to Qwen 3 (1.7B) trained on Dataset V3 (~194k samples). Model checkpoints are quantized to GGUF to support local execution and fast debugging runs.",
    architectureDiagram: `┌────────────────────────────────────────────────────────┐
│               RAW INDIAN LEGAL ARCHIVES                │
└──────────────────────────┬─────────────────────────────┘
                           ▼
             ┌───────────────────────────┐
             │    Preprocessing & OCR    │ (Cleaning & Normalization)
             └─────────────┬─────────────┘
                           ▼
             ┌───────────────────────────┐
             │  Instruction Builder (SFT)│ (Formatter & Tokenizer)
             └─────────────┬─────────────┘
                           ▼
             ┌───────────────────────────┐
             │   Qwen SFT Fine-Tuning    │ (BF16 Tensor Parallelism)
             └───────┬───────────┬───────┘
                     │           │
                     ▼           ▼
               [ V1 Model ] [ V2 Model ]
                 (0.5B)       (1.7B)`,
    keyFeatures: [
      "Instruction-tuned legal Q&A capability focused on Indian Penal Code (IPC)",
      "Structured formatting parser aligning outputs with statutory sections",
      "Model weights exported to GGUF format for local edge execution",
      "Iterative training pipeline evaluating dataset bias over multiple versions",
      "Drafting templates collection containing complain, notice, and petition structures",
      "Cleaned, deduplicated legal corpora covering civil, criminal, and constitutional laws",
    ],
    challenges:
      "During V1 evaluation, although the model adopted legal terminology successfully, it frequently hallucinated interpretations and added speculative operational conclusions not backed by the statutory text.",
    solutions:
      "I restructured the Dataset V3 target outputs to follow a shorter, denser summary format (Section Summary ➔ Key Provision ➔ Brief Explanation ➔ Short Conclusion) rather than long essay-style templates, forcing the model to stay close to facts.",
    metrics: [
      { value: "2 Models", label: "Versions Trained" },
      { value: "171K+", label: "Legal Instructions" },
      { value: "1.7B", label: "Max Parameters" },
      { value: "GGUF", label: "Deployment Format" },
    ],
    inspirations: [
      { title: "Qwen LLM Technical Report", link: "https://arxiv.org/abs/2412.15115" },
      { title: "Indian Penal Code, 1860 Statute Records", link: "https://www.indiacode.nic.in/" },
    ],
    futureWork:
      "Integrate Retrieval-Augmented Generation (RAG) to enforce strict document-grounded context verification, expand drafting templates, and run evaluations against legal benchmarks.",
    timeline: [
      { title: "Dataset V2", description: "Assembled initial ~171K samples focusing on statutory definitions and Q&A.", status: "completed" },
      { title: "Qwen 2.5 Fine-tuning", description: "Supervised fine-tuning of Qwen 2.5 (0.5B) model over 3 epochs.", status: "completed" },
      { title: "Evaluation Checks", description: "Noticed clear style improvements but identified severe hallucination issues.", status: "completed" },
      { title: "Dataset Analysis", description: "Traced factual drift back to overly verbose, essay-style targets in V2.", status: "completed" },
      { title: "Dataset V3", description: "Redesigned dataset to include drafting templates and brief, grounded provision summaries.", status: "completed" },
      { title: "Qwen 3 Fine-tuning", description: "Fine-tuned Qwen 3 (1.7B) using the refined V3 dataset.", status: "completed" },
      { title: "Current Research", description: "Developing strict source-faithful evaluation loops and fact-grounding checks.", status: "current" },
    ],
    modelVersions: [
      { version: "Version 1", baseModel: "Qwen 2.5", size: "0.5B parameters", dataset: "Indian Legal Dataset V2", format: "GGUF", reason: "Establish baseline feasibility on highly compressed architecture." },
      { version: "Version 2", baseModel: "Qwen 3", size: "1.7B parameters", dataset: "Indian Legal Dataset V3", format: "GGUF", reason: "Scale capacity and apply refined, shorter, grounded target data structures." }
    ],
    beforeAfter: [
      {
        query: "What should I do if my employer refuses to pay my salary?",
        before: "You can consult a lawyer. They will give you advice on your office work and tell you what to write to them. Or you can complain to the police.",
        after: "Under Indian law, you have multiple legal remedies: 1. Issue a formal demand notice to your employer. 2. File a complaint before the Labour Commissioner under the Payment of Wages Act. 3. If applicable, approach the Labour Court for recovery of unpaid dues."
      },
      {
        query: "What is Section 420 IPC?",
        before: "Section 420 is a rule in the code. It is about money problems and when someone gets hurt. It is a crime.",
        after: "Section 420 of the Indian Penal Code (IPC) deals with cheating and dishonestly inducing delivery of property. It is a cognizable and non-bailable offense, punishable with imprisonment of up to 7 years along with a fine."
      }
    ],
    observedImprovements: [
      "Structured formatting using numbered lists and clear sections",
      "Precise statutory terminology (e.g., cognizable, non-bailable, statutory remedies)",
      "Improved readability and readability flow across long-form answers",
      "Drastic reduction in vague or generic advice templates",
      "Better structural coherence during drafting instructions"
    ],
    whatWentWrong: [
      { issue: "Hallucinated Statutory Interpretations", details: "The model occasionally generated plausible-sounding legal statements or administrative summaries that were not backed by the statutory wording." },
      { issue: "Weak Source Grounding", details: "Outputs frequently over-interpreted provision scopes, adding operational implications or policy-level explanations beyond the source text." },
      { issue: "Speculative Claims", details: "Long essay-style targets trained the model to write broad significance paragraphs, leading to legally incorrect details." }
    ],
    keyInsight: "The biggest limitation wasn't the model. It was the dataset.",
    currentDirection: [
      "Transitioning dataset targets from long essay-style text to concise, structured summary blocks",
      "Introducing strict source-faithful templates separating legal codes from operational summaries",
      "Reducing speculative and interpretive phrases during SFT dataset preprocessing",
      "Establishing strict validation metrics targeting factual alignment over styling accuracy"
    ]
  },
  {
    id: "mathinstruct-v1",
    name: "MathInstruct v1",
    status: "Completed",
    tagline: "Supervised Fine-Tuning for Mathematical Reasoning",
    description:
      "MathInstruct v1 is a mathematics-focused instruction-tuned language model created by supervised fine-tuning Qwen3-0.6B on NVIDIA OpenMathInstruct-2 to improve mathematical instruction following, solution generation, and benchmark performance.",
    stack: ["PyTorch", "Transformers", "Hugging Face", "Python", "Supervised Fine-Tuning"],
    achievements: [
      "Supervised fine-tuning Qwen3-0.6B on OpenMathInstruct-2 dataset",
      "Completed training for 0.1 epoch to preserve general language capabilities",
      "Improved mathematical solution generation and instruction following",
    ],
    githubUrl: "https://github.com/kaushikharsh99",
    huggingfaceUrl: "https://huggingface.co/kaushik-harsh-99",
    featured: true,
    terminalLog: `$ python inference.py --model mathinstruct-v1 --prompt "Solve: 12x + 5 = 29"
[init] loaded mathinstruct-v1 (Qwen3-0.6B-SFT)
[eval] generating step-by-step reasoning chain...
[output] Subtract 5 from both sides: 12x = 24. Divide by 12: x = 2.`,
    motivation:
      "Teaching compact language models mathematical reasoning is a core challenge in post-training alignment. While large models naturally acquire mathematical competence through vast pretraining scales, smaller models under 1B parameters struggle with multi-step calculations and intermediate reasoning paths. I developed MathInstruct v1 to study supervised fine-tuning (SFT) workflows on compact models, evaluating how structured math instruction datasets improve logical step generation without degrading generic language utility.",
    problemStatement:
      "Compact models like Qwen3-0.6B fail to sustain correct reasoning paths over multi-step algebra or arithmetic instructions. The parameters collapse into repetitive loops or output wrong equations. Training from scratch is computationally expensive. Therefore, we need an efficient SFT post-training workflow to align existing pretrained base weights specifically for math instruction following.",
    architectureDesc:
      "The project adapts Qwen3-0.6B (600M parameters) using a single-run Supervised Fine-Tuning (SFT) configuration. Instead of training across multiple epochs which risks catastrophic forgetting of the base model's general grammar, we trained the weights on the NVIDIA OpenMathInstruct-2 dataset for a brief 0.1 epoch. Model checkpoints are fully compatible with standard transformer layers.",
    architectureDiagram: `┌────────────────────────────────────────────────────────┐
│                   PRETRAINED BASE LLM                  │
│                      (Qwen3-0.6B)                      │
└──────────────────────────┬─────────────────────────────┘
                           ▼
             ┌───────────────────────────┐
             │   OpenMathInstruct-2 Dataset│ (Instruction-Response Pairs)
             └─────────────┬─────────────┘
                           ▼
             ┌───────────────────────────┐
             │   Instruction Formatting  │ (Dense Math templates)
             └─────────────┬─────────────┘
                           ▼
             ┌───────────────────────────┐
             │  Supervised Fine-Tuning   │ (0.1 Epoch, preserved distribution)
             └─────────────┬─────────────┘
                           ▼
             ┌───────────────────────────┐
             │    MathInstruct v1 Check   │ (Unified math reasoning alignment)
             └───────────────────────────┘`,
    keyFeatures: [
      "Aligned mathematical instruction following across diverse arithmetic topics",
      "Supervised Fine-Tuning (SFT) pipeline targeting step-by-step solutions",
      "Preservation of general-purpose language capacities via constrained 0.1 epoch run",
      "Minimal preprocessing schema keeping the original dataset distribution intact",
      "Standard PyTorch/Hugging Face transformers formatting for instant load support",
    ],
    challenges:
      "Mathematical training risks causing the model to overfit on calculations and collapse on general conversation templates (catastrophic forgetting), especially when dealing with smaller parameter profiles.",
    solutions:
      "I limited the training duration strictly to 0.1 epoch and preserved the original dataset's formatting distribution. This lightweight exposure was sufficient to inject reasoning structures while maintaining general abilities.",
    metrics: [
      { value: "600M", label: "Parameters (Qwen3-0.6B)" },
      { value: "0.1 Epoch", label: "Training Duration" },
      { value: "OpenMath-2", label: "Fine-Tuning Dataset" },
      { value: "SFT", label: "Alignment Protocol" },
    ],
    inspirations: [
      { title: "NVIDIA OpenMathInstruct-2 Technical Report", link: "https://arxiv.org/abs/2410.01515" },
      { title: "Qwen3 Open Foundation Models", link: "https://huggingface.co/Qwen" },
    ],
    futureWork:
      "Integrate Direct Preference Optimization (DPO) using mathematical feedback pairs, run longer training epochs combined with general SFT data to prevent forgetting, and perform evaluations on MATH datasets.",
    modelComparison: [
      { name: "Qwen3-0.6B (Base Model)", accuracy: "Baseline", parameters: "600,000,000", purpose: "Pretrained generalist starting weights" },
      { name: "MathInstruct v1 (Fine-Tuned)", accuracy: "Improved Math Q&A", parameters: "600,000,000", purpose: "Mathematics instruction following & step-by-step reasoning" }
    ],
    trainingConfig: [
      { label: "SFT Protocol", value: "Supervised Fine-Tuning" },
      { label: "Fine-Tuning Epoch", value: "0.1 Epoch" },
      { label: "Dataset Source", value: "NVIDIA OpenMathInstruct-2" },
      { label: "Base Architecture", value: "Qwen3-0.6B" },
      { label: "Data Filtering", value: "None (original distribution preserved)" },
      { label: "Preprocessing", value: "Minimal for formatting compatibility" }
    ],
    limitations: [
      "May occasionally generate incorrect math steps or wrong arithmetic sums",
      "Susceptibility to logical hallucinations in long-context problems",
      "Not intended for high-stakes financial, scientific, or critical engineering applications",
      "Limited factual grounding on non-mathematical topics due to small parameter scale"
    ],
    lessons: [
      {
        title: "Tuning is Data Efficient",
        content: "We verified that even a brief 0.1 epoch SFT exposure aligns attention weights to output step-by-step calculations, proving domain tuning is highly efficient."
      },
      {
        title: "Tradeoffs of Compact Tuning",
        content: "Compact models (600M parameters) require very careful epoch bounds. Standard long SFT runs cause general syntax decay, making brief training runs essential."
      },
      {
        title: "Noisy Data Tolerance",
        content: "MathInstruct v1 was trained with minimal dataset filtering, demonstrating that models can tolerate a baseline rate of noisy distribution samples when learning formatting styles."
      }
    ],
    benchmarkImage: "/math_benchmark.png"
  }
];
