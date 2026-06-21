---
title: "I Built RepoMind — Ask Your Codebase Anything, Locally"
description: "Every developer has stared at an unfamiliar repo wondering where to even start. I got tired of that feeling, so I built an AI that answers your questions about any codebase — no cloud, no API keys, no data leaving your machine."
date: "2026-06-21"
author: "Manish Dash Sharma"
tags: ["AI", "RAG", "Ollama", "Qdrant", "Open Source", "Python", "Local LLM"]
---

# I Built RepoMind — Ask Your Codebase Anything, Locally

A few months ago, I joined a team midway through a project. The codebase was around 80,000 lines of Python. No one had time to onboard me properly. There was a wiki, but it was three years old and wrong in half the places. There were comments, but not enough. And there were senior engineers, but asking them every ten minutes felt like a bad idea.

So I did what every developer does in that situation.

I ctrl+F'd my way through the codebase for three weeks.

That experience sat with me. Not because it was painful — every developer goes through it — but because it felt completely unnecessary. The answer to almost every question I had was *right there* in the code. I just couldn't talk to it.

That's why I built **RepoMind**.

---

## The Problem With Every Existing Solution

When you want to understand a codebase, you have a few options. You can read it top to bottom (slow, painful). You can ctrl+F for keywords (hit or miss). You can ask a senior dev (feels like a tax on their time). Or you can paste chunks of code into ChatGPT and ask questions (which works, until you hit the context limit, or until you remember that you just sent proprietary code to a third-party server).

That last one bothers me more than it probably should.

We talk a lot about AI productivity for developers, but we don't talk enough about what it costs. Every time you paste your company's code into a cloud LLM, you're making a trust decision. Sometimes that's fine. Often it isn't. And even when it is fine, there's always a token limit waiting to ruin your day.

I wanted something that worked differently. Something that understood the *entire* codebase, not just the chunk you remembered to paste. Something that ran on your machine, used your hardware, and kept your code exactly where it belongs.

## What RepoMind Actually Does

RepoMind is a CLI tool. You run it, you point it at a repo, and you start asking questions in plain English — or Hindi, which I'll get back to.

It indexes your entire codebase — every Python file, every TypeScript file, every Go file, every config — and stores it locally in a vector database. Then when you ask a question, it finds the most relevant pieces of code, builds context from them, and streams an answer using a local LLM running on your own machine via Ollama.

The whole thing runs offline. No API keys. No internet. No rate limits. No one else's server.

```
? What does the authentication middleware do?

The auth middleware (src/middleware/auth.js:12) validates JWT tokens on
every protected route. It extracts the token from the Authorization header,
verifies it against the JWT_SECRET env variable, and attaches the decoded
user object to req.user. If the token is expired or invalid, it returns
a 401 before the request reaches the controller.

Sources:
  → src/middleware/auth.js (lines 12–48)
  → src/config/jwt.js (lines 3–11)
```

That's a real answer, from a real repo, using only local compute.

## The Tech Behind It

The architecture is a classic RAG pipeline, but the interesting decisions are in the details.

**Chunking**: I use `tiktoken` with the `cl100k_base` encoding to split files by tokens, not by lines or characters. Each chunk is 400 tokens with an 80-token overlap. The overlap matters — it's what lets RepoMind understand functions that span chunk boundaries instead of cutting them off mid-definition.

**Embeddings**: `nomic-embed-text` runs through Ollama and produces 768-dimensional vectors. It's fast, it understands code better than general-purpose models, and it runs comfortably on 8GB of RAM.

**Vector storage**: Qdrant runs in Docker with a named volume, so your indexed projects survive restarts. Each project gets its own collection — `repomind_{project_name}` — so you can index multiple repos and switch between them.

**LLM**: Whatever Ollama model you want. RepoMind detects your hardware at install time and recommends the best model for your machine. M2 MacBook with 16GB? It'll suggest `llama3.1:8b` and explain why. 8GB RAM on Linux? It'll suggest `llama3.2:3b` instead.

**CLI**: Built with Typer and Rich. I put more thought into the terminal UI than I'm willing to admit. The spinners, the progress bars, the color scheme — all of it is designed to feel like a tool that respects your time.

The entire stack — Python, Ollama, Qdrant — is open source, self-hostable, and free.

## The Hindi Support

This one was personal.

I work with developers who think and write better in Hindi than in English. Most AI tools assume English. RepoMind doesn't. You can ask your questions in Hindi and get answers in Hindi, because `llama3.1:8b` handles it well without any extra configuration. It's not a feature I had to build — it's a feature I had to *not break*.

I tested it. It works. And it matters to more people than the tooling world seems to realize.

## What I Learned Building This

**Chunk size is not a slider, it's a decision.** I spent a full day experimenting with chunk sizes before settling on 400 tokens. Too small and you lose context — a function split across chunks becomes meaningless. Too large and the retrieved chunks overwhelm the LLM's context window and degrade the answer quality. 400 tokens with 80-token overlap is where signal and noise reach a reasonable equilibrium for code.

**Hardware detection is underrated UX.** The first version of RepoMind asked users to pick a model from a list. Most people had no idea what to pick. Adding automatic hardware detection — CPU cores, RAM, Apple Silicon vs Intel, GPU VRAM — and turning that into a recommendation with a reason made the install experience feel thoughtful instead of overwhelming.

**Local-first is harder than cloud-first, and worth it.** Every cloud AI tool offloads complexity to someone else's infrastructure. Local-first means you own the entire stack: the install experience, the Docker container lifecycle, the port conflicts, the model pull progress. It's more work. But when it works, it works anywhere, forever, without asking anyone's permission.

**gitignore is more important than you think.** RepoMind respects `.gitignore` when indexing. I almost skipped this. I'm glad I didn't — without it, you index `node_modules`, `__pycache__`, build artifacts, and suddenly your vector DB has 200,000 chunks of minified JavaScript and your query results are garbage.

## Why Open Source

I'm not interested in building a SaaS wrapper around Ollama. The developer community has been incredibly generous with the tools that made RepoMind possible — Ollama, Qdrant, Typer, Rich, tiktoken — and this is my way of contributing back.

If you're onboarding a new team member and want to give them a better experience than ctrl+F for three weeks, point them at RepoMind. If you're a solo developer jumping between side projects and can never remember what that utility function does, RepoMind is for you. If you work with sensitive code that can't leave your machine, RepoMind was built for exactly that.

Clone it, break it, build on top of it.

[github.com/manishdashsharma/RepoMind](https://github.com/manishdashsharma/RepoMind)

```bash
git clone https://github.com/manishdashsharma/RepoMind.git
cd RepoMind
bash scripts/install.sh
```

The install script handles everything — Ollama check, Docker, model pull, first-time setup. Five minutes and you're asking questions.

---

*The codebase was always willing to answer. We just needed to learn how to ask.*
