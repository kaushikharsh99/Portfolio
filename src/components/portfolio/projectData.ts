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
  technicalImplementation: string;
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
      "🧠 Runs 35B MoE models on entry-level ~6 GB VRAM GPUs",
      "🚀 ~21× performance speedup vs. baseline prototype",
      "⚡ Reached 2.3 tok/s throughput on an NVIDIA RTX 3050 Laptop",
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
    technicalImplementation:
      "The system core is built in Python, coordinating weight transfers and model layouts. It features a MemoryManager that registers every tensor metadata block. During a layer's forward execution, the manager queries whether the requested expert weight exists in GPUMemory. If absent, it loads the tensor from CPUMemory (RAM) or streams it directly from safetensors on SSD (Disk), dynamically handling VRAM evictions using an active caching policy.",
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
    codeSnippet: {
      language: "python",
      filename: "memory_manager.py",
      code: `def move_to_gpu(self, name: str) -> torch.Tensor:
    """Moves a tensor from CPU to GPU memory cache. Handles GPU cache evictions."""
    if name not in self.tensor_registry:
        raise KeyError(f"Tensor '{name}' is not registered.")

    tensor_obj = self.tensor_registry[name]

    # Return GPU cached tensor if already resident
    if self.gpu_memory.exists(name):
        return self.gpu_memory.get(name)

    # Load to CPU RAM first if not present
    cpu_data = self.load_tensor(name)

    # Copy data to GPU device
    gpu_data = cpu_data.to(self.device_manager.device)

    # Cache in GPU memory and handle evicted tensors
    evicted_names = self.gpu_memory.add(name, gpu_data, tensor_obj)
    for evicted in evicted_names:
        evicted_obj = self.tensor_registry[evicted]
        if self.cpu_memory.exists(evicted):
            evicted_obj.device = "cpu"
            evicted_obj.data = self.cpu_memory.get(evicted)
        else:
            evicted_obj.device = "disk"
            evicted_obj.loaded = False
            evicted_obj.data = None

    return gpu_data`
    },
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
      "🧠 Trained a 17.2M parameter custom decoder-only Transformer from scratch",
      "📚 Curated and processed 2.1M synthetic story data inputs with zero padding",
      "📈 Achieved fluent grammar, dialogue syntax, and narrative coherence",
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
    technicalImplementation:
      "I wrote the custom decoder layers in PyTorch using tensor operations. The tokenizer was trained on the synthetic TinyStories corpus using SentencePiece to produce an 8,000 token vocabulary. Training leveraged Mixed Precision (BF16) on a single GPU with gradient scaling to maintain stability during peak learning rates.",
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
    codeSnippet: {
      language: "python",
      filename: "model.py",
      code: `@torch.compile
class SwiGLU(nn.Module):
    def __init__(self, dim: int, hidden_dim: int):
        super().__init__()
        self.w1 = nn.Linear(dim, hidden_dim, bias=False)
        self.w2 = nn.Linear(hidden_dim, dim, bias=False)
        self.w3 = nn.Linear(dim, hidden_dim, bias=False)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        # Swish(x * W1) * (x * W3) projected through W2
        return self.w2(F.silu(self.w1(x)) * self.w3(x))`
    },
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
    id: "llm-post-training",
    name: "LLM Post-training",
    status: "Research",
    tagline: "SFT / LoRA / QLoRA across specialized domains",
    description:
      "Adapter-based fine-tuning experiments across math, code, and legal corpora. Focus on data mixture, LoRA rank/target module ablations, and eval alignment.",
    stack: ["PyTorch", "PEFT", "TRL", "bitsandbytes"],
    achievements: [
      "LoRA/QLoRA sweeps across ranks 4–128",
      "Domain-specialized checkpoints: math, code, legal",
      "Eval harness spanning 8 downstream tasks",
    ],
    githubUrl: "https://github.com/kaushikharsh99",
    huggingfaceUrl: "https://huggingface.co/kaushik-harsh-99",
    motivation:
      "Pretrained base models have vast knowledge but struggle with specific formats, logic structures, and domain jargon. Post-training (Supervised Fine-Tuning and Parameter-Efficient Fine-Tuning) is where models are sculpted for production tasks. I designed these experiments to ablate how rank (r) and target projection paths in LoRA affect general capabilities versus specialized domain accuracy.",
    problemStatement:
      "Catastrophic forgetting is the major risk when adapting models. Fine-tuning too aggressively on math or legal documents often erases basic language instruction adherence. I needed to build a data mixture framework that balances custom domain instructions with a baseline alignment dataset.",
    architectureDesc:
      "The system implements LoRA adapters injected directly into the Query, Key, Value, and Output projection matrices of the base transformer. In QLoRA configs, the base model is quantized to NormalFloat4 (NF4) and dynamically dequantized during runtime.",
    architectureDiagram: `┌────────────────────────────────────────────────────────┐
│                   TRANSFORMER INPUT                    │
└──────────────────────────┬─────────────────────────────┘
                           ▼
               ┌───────────────────────┐
               │    Base Model (NF4)   │
               │   Frozen Parameters   │
               └───────────┬───────────┘
                           ├────────────────────────┐
                           │ (Direct Output)        │ (Adapter Path)
                           ▼                        ▼
                           │                  ┌───────────┐
                           │                  │  LoRA A   │
                           │                  │ (r x d)   │
                           │                  └─────┬─────┘
                           │                        ▼
                           │                  ┌───────────┐
                           │                  │  LoRA B   │
                           │                  │ (d x r)   │
                           │                  └─────┬─────┘
                           │                        │ (Scale factor)
                           ▼                        ▼
                       [  +  ]◄─────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│                  TRANSFORMER OUTPUT                    │
└────────────────────────────────────────────────────────┘`,
    technicalImplementation:
      "Fine-tuning was conducted on 8B parameter foundations using PyTorch, PEFT, and bitsandbytes. I wrote scripts to automate LoRA target hyperparameter sweeps (ablation ranks: 8, 16, 32, 64, 128) across different linear attention modules (q_proj, k_proj, v_proj, o_proj, gate_proj, up_proj, down_proj) and integrated standard evaluations into the loop.",
    keyFeatures: [
      "Automated rank (r) and alpha (α) optimization scripts",
      "Custom data pipeline supporting token-packing for zero-pad efficiency",
      "Quantized NF4 adapter mapping with low degradation margins",
      "Fully integrated task evaluations using Hugging Face LightEval",
    ],
    challenges:
      "Fine-tuning models on domain-specific corpora occasionally caused gradient explosions due to sequence padding waste and high-loss outlier samples in specialized instruction sets.",
    solutions:
      "I implemented sample packing, concatenating multiple short instructions into a single 4096 sequence separated by EOS tokens, which reduced pad token count to 0. Outlier samples were pruned using sequence-level cross-entropy sorting.",
    metrics: [
      { value: "4-128", label: "LoRA Rank Range Sweep" },
      { value: "8+", label: "Downstream Tasks Evals" },
      { value: "↓ 70%", label: "VRAM Save with QLoRA" },
      { value: "+14%", label: "Logic Score on Legal Eval" },
    ],
    inspirations: [
      { title: "LoRA: Low-Rank Adaptation of Large Language Models", link: "https://arxiv.org/abs/2106.09685" },
      { title: "QLoRA: Efficient Finetuning of Quantized LLMs", link: "https://arxiv.org/abs/2305.14314" },
    ],
    futureWork:
      "Extend this post-training suite to incorporate Direct Preference Optimization (DPO) and ORPO pipelines directly in PyTorch.",
    codeSnippet: {
      language: "python",
      filename: "finetune.py",
      code: `from peft import LoraConfig, get_peft_model
from transformers import AutoModelForCausalLM, BitsAndBytesConfig

# Create highly memory-efficient QLoRA configuration
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_use_double_quant=True,
    bnb_4bit_compute_dtype=torch.bfloat16
)

model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Meta-Llama-3-8B",
    quantization_config=bnb_config,
    device_map="auto"
)

lora_config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],
    bias="none",
    task_type="CAUSAL_LM"
)
model = get_peft_model(model, lora_config)`
    }
  },
  {
    id: "dataset-engineering",
    name: "Dataset Engineering",
    status: "Ongoing",
    tagline: "Instruction data pipelines at scale",
    description:
      "Tooling for large-scale text preprocessing: cleaning, near-duplicate detection, quality filtering, and Parquet-native pipelines that stream from disk.",
    stack: ["Python", "Parquet", "Multiprocessing", "MinHash"],
    achievements: [
      "MinHash-LSH deduplication over 40M docs",
      "Streaming Parquet reader with backpressure",
      "Instruction dataset builder with schema validation",
    ],
    githubUrl: "https://github.com/kaushikharsh99",
    huggingfaceUrl: "https://huggingface.co/kaushik-harsh-99",
    motivation:
      "The quality of instruction data is the single most important factor for language model alignment. While deep learning researchers focus on model weights, the underlying data pipelines are often fragile, slow, and prone to memory overheads. I built this suite of Parquet-native tools to demonstrate that we can process and deduplicate tens of millions of documents on single workstations using parallelized hashing and streams.",
    problemStatement:
      "Processing text datasets larger than RAM capacity usually causes memory faults. Near-duplicate document detection (such as boilerplates or license terms) using standard nested-loop strings comparisons is computationally intractable at scale (O(N^2)).",
    architectureDesc:
      "The dataset engineering toolkit uses a stream-based multiprocessing pipeline. The pipeline streams chunks from Parquet archives on disk, computes document shingle signatures, resolves near-duplicates via MinHash Locality-Sensitive Hashing (LSH), and writes verified instruction packages back to disk.",
    architectureDiagram: `┌────────────────────────────────────────────────────────┐
│                   PARQUET DATA STREAMS                 │
└──────────────────────────┬─────────────────────────────┘
                           ▼
             ┌──────────────────────────┐
             │ Multiprocessing Reader   │  ◄─── Backpressure Feed
             └─────────────┬────────────┘
                           ▼
             ┌──────────────────────────┐
             │  MinHash Signature Gen   │  ◄─── 50 Hashes / Doc
             └─────────────┬────────────┘
                           ▼
             ┌──────────────────────────┐
             │ LSH Deduplication Table  │  ◄─── Bucket Collision Match
             └─────────────┬────────────┘
                           ▼
             ┌──────────────────────────┐
             │ Schema Validation Filter │  ◄─── Strict Json Types
             └─────────────┬────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│                   CLEANSED PARQUET                     │
└────────────────────────────────────────────────────────┘`,
    technicalImplementation:
      "The deduplication engine computes MinHash signatures (length 128) for 3-gram document shingles. These hashes are grouped into bands to resolve buckets using Locality-Sensitive Hashing. The CPU parallelization is managed via a custom multiprocessing worker pool with structured queues to handle backpressure and throttle disk reads.",
    keyFeatures: [
      "MinHash-LSH deduplication pipeline optimized for consumer multi-core CPUs",
      "Memory-efficient streaming dataset builder bypassing full-RAM caching",
      "Robust instruction validation layer checking token lengths and structure templates",
      "Zero-copy serialization pipelines writing directly to parquet buffers",
    ],
    challenges:
      "Managing Python's GIL (Global Interpreter Lock) and inter-process communication (IPC) overhead during large data transfers between queues was causing CPU core starvation.",
    solutions:
      "I refactored the pipeline to transfer raw byte buffers or NumPy signature arrays instead of Python string dictionaries. Workers serialize data at worker level, eliminating IPC bottlenecking and scaling throughput linearly with CPU cores.",
    metrics: [
      { value: "40M+", label: "Processed Documents" },
      { value: "18.4GB", label: "RAM peak utilization" },
      { value: "O(N)", label: "Deduplication complexity" },
      { value: "15,000/s", label: "Document processing rate" },
    ],
    inspirations: [
      { title: "Mining of Massive Datasets (Chapter 3)", link: "http://www.mmds.org/" },
      { title: "C4 (Colossal Clean Crawled Corpus)", link: "https://arxiv.org/abs/1910.10683" },
    ],
    futureWork:
      "Implement GPU-accelerated MinHash computation using CuPy to further scale deduplication limits.",
    codeSnippet: {
      language: "python",
      filename: "dedup.py",
      code: `import numpy as np
from hashlib import sha1

def make_minhash(shingles: list[str], num_perm: int = 128) -> np.ndarray:
    # Deterministic generation of permutation hashes
    # to avoid full O(N^2) comparison pass
    min_hashes = np.full(num_perm, np.inf)
    for shingle in shingles:
        val = int(sha1(shingle.encode('utf-8')).hexdigest(), 16)
        for i in range(num_perm):
            # Compute mock permutation hash value
            h = (val * (i + 1) + 12345) % 4294967291
            if h < min_hashes[i]:
                min_hashes[i] = h
    return min_hashes`
    }
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
      "🎯 Multi-class email classification across Ham, Spam, and Phishing categories",
      "📉 Compressed teacher model by 40× (80M to 2M params) via Knowledge Distillation",
      "⚡ Maintained high accuracy (98.12% student vs 98.38% teacher) with low latency",
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
           └────────────────┬────────────────┘
                            │ (Soft Logits)
                            ▼
           ┌─────────────────────────────────┐
           │    KNOWLEDGE DISTILLATION       │ (KL Divergence Loss)
           │      [Temperature: 3.0]         │
           └────────────────┬────────────────┘
                            ▼
           ┌─────────────────────────────────┐
           │        STUDENT MODEL (2M)       │ (Embeddings: 128d + Attention)
           └─────────────────────────────────┘`,
    technicalImplementation:
      "The system runs on PyTorch and Scikit-learn. The classical baseline uses TF-IDF word unigrams and bigrams. The teacher model is built with dense multi-layer residual paths, incorporating dropout and batch normalization. Distillation is coordinated using a custom loss module that combines Cross-Entropy with KL Divergence scaled by a temperature factor of 3.0. The student model uses self-attention layers to extract contextual representations from 128d word vectors, bounding its parameter footprint to 2M.",
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
    codeSnippet: {
      language: "python",
      filename: "distill.py",
      code: `import torch
import torch.nn as nn
import torch.nn.functional as F

class DistillationLoss(nn.Module):
    def __init__(self, temperature: float = 3.0, alpha: float = 0.5):
        super().__init__()
        self.temperature = temperature
        self.alpha = alpha
        self.cross_entropy = nn.CrossEntropyLoss()
        
    def forward(self, student_logits: torch.Tensor, teacher_logits: torch.Tensor, labels: torch.Tensor) -> torch.Tensor:
        # Standard Cross-Entropy loss on true labels
        student_loss = self.cross_entropy(student_logits, labels)
        
        # Soft label loss using KL Divergence
        soft_student = F.log_softmax(student_logits / self.temperature, dim=-1)
        soft_teacher = F.softmax(teacher_logits / self.temperature, dim=-1)
        
        # Multiply by temperature^2 to scale gradients properly
        kl_loss = F.kl_div(soft_student, soft_teacher, reduction='batchmean') * (self.temperature ** 2)
        
        # Balanced loss combination
        return (1.0 - self.alpha) * student_loss + self.alpha * kl_loss`
    },
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
  }
];
