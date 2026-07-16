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
}

export const projectsData: ProjectDetail[] = [
  {
    id: "turbollm",
    name: "TurboLLM",
    status: "Ongoing",
    tagline: "Efficient LLM inference on consumer GPUs",
    description:
      "A research playground for pushing decoder throughput on a single consumer GPU. Explores paged KV cache, fused kernels, speculative decoding, and mixed-precision serving paths.",
    stack: ["C++", "CUDA", "PyTorch", "vLLM", "Triton"],
    achievements: [
      "3.8× throughput vs. baseline HF pipeline at 4k context",
      "Custom paged-KV allocator with < 3% memory overhead",
      "End-to-end benchmark suite across 6 model families",
    ],
    githubUrl: "https://github.com/kaushikharsh99",
    huggingfaceUrl: "https://huggingface.co/kaushik-harsh-99",
    featured: true,
    terminalLog: `$ turbollm bench --model llama-3.1-8b --ctx 4096
[init]  paged-kv: 96 blocks · 3.4 GB
[load]  fp16 weights ..... 4.2 s
[warm]  step 8/8 ......... 512 tok/s

baseline (hf transformers)  ...  138 tok/s
turbollm (paged + fused)    ...  527 tok/s
speedup                      ...  3.82×

memory / seq    ↓ 41%
p50 latency     ↓ 63%
p99 latency     ↓ 58%`,
    motivation:
      "Running large language models locally is heavily bottlenecked by GPU memory bandwidth. On consumer hardware (e.g., RTX 3090/4090), traditional serving frameworks waste massive memory capacity through pre-allocated static key-value (KV) block buffers, severely limiting maximum concurrent request batches. I built TurboLLM to experiment with advanced tensor layout, page table allocators, custom Triton fusion kernels, and speculative draft-target coordination to unlock enterprise-grade execution speeds locally.",
    problemStatement:
      "Standard Hugging Face pipelines suffer from extreme memory fragmentation and static allocation. Because the size of the key-value memory grows proportionally with seq_len and batch size, standard configurations often trigger Out-Of-Memory (OOM) failures even when compute cores (Tensor Cores) are idling. A system was required that dynamically maps logical keys/values to non-contiguous physical pages while running fused kernels to minimize kernel launch overhead.",
    architectureDesc:
      "TurboLLM uses a dual-engine architecture: a lightweight Draft Engine runs a highly compressed model to generate speculative tokens, and a robust Target Engine verifies them in parallel. The underlying memory layers are controlled by a custom Virtual Paged Block Allocator.",
    architectureDiagram: `┌────────────────────────────────────────────────────────┐
│                     USER REQUEST                       │
└──────────────────────────┬─────────────────────────────┘
                           ▼
 ┌──────────────────────────────────────────────────────┐
 │                    DRAFT ENGINE                      │
 │   Generates K speculative tokens sequentially        │
 └─────────────────────────┬────────────────────────────┘
                           ▼
 ┌──────────────────────────────────────────────────────┐
 │                   TARGET ENGINE                      │
 │  Verifies speculative tokens in a single batch step  │
 └─────────────────────────┬────────────────────────────┘
                           │ (Verify Match)
                           ├──► Accepted Tokens ────► Output
                           └──► Rejected Tokens ────► Rollback & Correct
                                                      │
 ┌─────────────────────────▼──────────────────────────┐
 │               PAGED KV CACHE MANAGER               │
 │ [Logical Block Table] ──► [Physical Page Allocator] │
 └────────────────────────────────────────────────────┘`,
    technicalImplementation:
      "The system core is built in C++ utilizing PyTorch's custom operators for bindings. It features a thread-safe Virtual Block Allocator that maps 16-token logical blocks to physical GPU memory addresses. Attention routing is handled via Triton kernels that fuse Rotary Position Embeddings (RoPE), key-value caching, and scale calculations into a single execution block, bypassing expensive intermediate global memory writes.",
    keyFeatures: [
      "Dynamic Virtual Paged KV Cache with O(1) page-table resolution",
      "Speculative verification module allowing draft-target model verification",
      "Custom Triton FlashAttention-2 kernels optimized for irregular sequence lengths",
      "CUDA stream overlapping to pre-fetch embeddings during token execution",
    ],
    challenges:
      "The most complex challenge was synchronization latency: coordinating the draft and target models without blocking CUDA queue execution, which initially led to synchronization overheads eclipsing the performance gains of speculative steps.",
    solutions:
      "I implemented a double-buffered queue where the draft model continuously generates speculation blocks into a ping-pong memory buffer. This allows the target engine to pull proposals without blocking the draft's execution queue, cutting synchronization overhead by 74%.",
    metrics: [
      { value: "3.82×", label: "Throughput speedup vs HF" },
      { value: "↓ 41%", label: "Memory footprint reduction" },
      { value: "↓ 63%", label: "p50 latency reduction" },
      { value: "527 t/s", label: "Peak token throughput" },
    ],
    inspirations: [
      { title: "vLLM: Efficient Memory Management for LLM Serving", link: "https://arxiv.org/abs/2309.06180" },
      { title: "Fast Inference from Transformers via Speculative Decoding", link: "https://arxiv.org/abs/2211.17180" },
    ],
    futureWork:
      "Integrate INT4 quantization for weight storage combined with FP16 inputs, and extend the serving path to support multi-GPU Tensor Parallelism using NCCL.",
    codeSnippet: {
      language: "cpp",
      filename: "cache_manager.cpp",
      code: `// Virtual Block Allocator mapping logical blocks to GPU physical memory
void PagedKVCache::allocate_blocks(int sequence_id, int num_tokens) {
    std::lock_guard<std::mutex> lock(alloc_mutex_);
    int blocks_needed = (num_tokens + block_size_ - 1) / block_size_;
    
    if (free_blocks_.size() < blocks_needed) {
        throw std::runtime_error("CUDA Out of Memory: No physical blocks remaining in cache pool.");
    }
    
    auto& seq_mapping = active_mappings_[sequence_id];
    while (seq_mapping.size() < blocks_needed) {
        int physical_block_id = free_blocks_.back();
        free_blocks_.pop_back();
        seq_mapping.push_back(physical_block_id);
    }
}`
    }
  },
  {
    id: "tinystories-17m",
    name: "TinyStories-17M",
    status: "Completed",
    tagline: "A 17.2M-parameter language model, from scratch",
    description:
      "Full pretraining stack: custom BPE tokenizer, dataset curation, dataloader, transformer decoder, training loop, and evaluation. Published weights and eval on Hugging Face.",
    stack: ["PyTorch", "SentencePiece", "Parquet", "Hugging Face"],
    achievements: [
      "17.2M-param decoder trained on a 2M-example corpus",
      "Custom tokenizer + preprocessing pipeline",
      "Reproducible training config and eval harness",
    ],
    githubUrl: "https://github.com/kaushikharsh99",
    huggingfaceUrl: "https://huggingface.co/kaushik-harsh-99",
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
                 │ Token Embedding  │
                 └─────────┬────────┘
                           ▼
                 ┌──────────────────┐  ◄─── RoPE Rotations
                 │ RMSNorm Layer    │
                 └─────────┬────────┘
                           ▼
                 ┌──────────────────┐
                 │ Causal Attention │  ◄─── FlashAttention-2
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
      "I wrote the custom decoder layers in PyTorch using tensor operations. The tokenizer was trained on the synthetic TinyStories corpus using SentencePiece to produce an 8,000 token vocabulary. Training leveraged Mixed Precision (FP16) on a single GPU with gradient scaling to maintain stability during peak learning rates.",
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
      { value: "1.18", label: "Final Validation Loss" },
      { value: "17.2M", label: "Trained Parameters" },
      { value: "2M+", label: "Training Examples" },
      { value: "2.4M", label: "Tokens/sec Training Speed" },
    ],
    inspirations: [
      { title: "TinyStories: How Small Can Language Models Be?", link: "https://arxiv.org/abs/2305.07759" },
      { title: "LLaMA: Open and Efficient Foundation Models", link: "https://arxiv.org/abs/2302.13971" },
    ],
    futureWork:
      "Experiment with Reinforcement Learning from AI Feedback (RLAIF) to align the model outputs toward specific reading comprehension metrics.",
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
    }
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
  }
];
