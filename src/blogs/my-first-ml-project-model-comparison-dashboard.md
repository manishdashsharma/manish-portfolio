---
title: "My First Real ML Project — Notes From Building a Model Comparison Dashboard"
description: "I'd never trained a model before this. Turns out most of ML is careful bookkeeping and asking 'wait, does this actually make sense?' at the right moments — filter bugs, data leakage, and a colleague's reminder that 'important' isn't the same as 'real'."
date: "2026-07-14"
author: "Manish Dash Sharma"
tags: ["Machine Learning", "Python", "Gradient Boosting", "Data Science", "MLOps"]
---

# My First Real ML Project — Notes From Building a Model Comparison Dashboard

I've never trained a model before this. I know Python, I know how to ship features, but "machine learning" always felt like a separate universe — one with math I'd need a PhD to understand. Turns out most of it is just careful bookkeeping and asking "wait, does this actually make sense?" at the right moments. Writing this down mostly for myself, so I remember what I actually learned instead of just what I built.

## The starting point

We had a stream of logs — every time our system called out to an AI model, a record got saved: which part of the product triggered it, which model responded, how many tokens it used, how much it cost, how long it took. The goal was simple on paper: build something that tells us which AI model is fastest and cheapest, and forecast what we'll be spending in the near future.

The first time I checked, there were a couple dozen records. Not enough to do anything with. By the time I checked again a few hours later, it was over a thousand — real usage had been accumulating the whole time. That alone was a good early lesson: **ML projects live or die by whether the data pipeline underneath them is actually flowing.** No amount of clever modeling matters if you're staring at a near-empty table.

## Lesson 1: A filter bug can silently kill your entire dataset

Once we had enough records, training returned **zero rows**. Not an error — just silently nothing. Took a while to find: the data-loading step required a "quality score" field to not be empty. Except that field was *always* empty — an old scoring system had been removed months back because it gave every single response the exact same fixed score (no real signal, so someone correctly killed it). Nobody had gone back and removed the now-dead filter that depended on it.

The fix was a one-line change. The lesson was bigger: **when a pipeline returns nothing, check the filters before you check the model.** It's rarely the fancy part that's broken.

## Lesson 2: ML has real, boring, OS-level dependencies

The training library I used flat out refused to import on my machine. Turns out it needs a parallel-computing runtime that isn't installed by default on Apple hardware. One package-manager install fixed it in under a minute, but it was a reminder that "install and go" is a myth. There's always a compiler, a runtime, or a system library quietly required underneath.

## What the model actually is (in terms that finally clicked for me)

I needed something that could look at a mix of numbers and categories (token counts, which model answered, which provider) and predict a number (response time). I used a **gradient boosted tree** model — and the way it was explained to me finally made it click:

Imagine grading an essay 500 times in a row. Each pass, you don't rewrite from scratch — you look at what's still wrong from the *last* pass and fix just that. The first attempt makes a rough guess. The second attempt doesn't see the original data — it only sees the first attempt's mistakes, and tries to correct them. The third corrects what's left over from the first two. Repeat up to 500 times (or stop early if there's no improvement for a while — no point grinding once it's converged).

The final prediction is the sum of every pass's small correction. That's it. No magic, just a very disciplined feedback loop.

Our result: an accuracy score in the low-90s-percent range, and an average prediction error small enough to be genuinely useful for decision-making. Better than I expected for a first pass.

## Lesson 3: the trap that actually humbled me — data leakage

Early on, the model looked *too* good. Then I noticed the single most important input was the **cost** of the API call.

Made sense on the surface: expensive calls tend to be slow calls, they're correlated. But here's the catch — we only find out the cost *after* the call finishes. We need to predict the response time *before* it happens, so the decision can actually be useful. At real prediction time, we don't have the cost yet — we'd have to feed the model a placeholder value it never once saw during training.

The model had essentially learned to cheat using information it would never have in production. I pulled cost out of the training inputs entirely. Accuracy dropped slightly — but became honest — and the most useful signal became something we genuinely do know (or can estimate) ahead of time, like expected output length. This is called **data leakage**, and apparently it's one of the most common — and most quietly dangerous — mistakes in ML. A model can look brilliant in testing and be useless in production for exactly this reason.

## Lesson 4: you can't evaluate what you don't have labels for

The next ambition was: could the model also judge *quality* — was a given response actually good? Turns out the answer is a hard no, for now. Both fields meant to hold that signal were **completely empty** across every record. An old heuristic scorer had been removed for good reason (it gave everything the same fixed score — same problem as the filter bug, just a different field). Real user feedback (a simple thumbs up/down) hasn't been wired up yet on the product side.

No labels, no supervised model — that's just how it works. You can have all the input features in the world; without a ground-truth answer to learn from, there's nothing to train against. So that part of the roadmap is parked until real feedback starts flowing in.

## Lesson 5: "important" isn't the same as "real" — statistical significance

A colleague flagged something worth internalizing: the model's built-in feature importance is just a ranking based on what it leaned on during training. It doesn't tell you whether that's a *real* signal or something that happened to look useful on a fairly small dataset (~1,000 records) by chance.

The fix was a **permutation importance test**: take the trained model, shuffle one input's values at a time, and measure how much worse its predictions get. Repeat 50 times per input, then run a statistical test to see if the performance drop is consistently larger than zero, or just noise. This produces an actual p-value per input — the same `p < 0.05` significance threshold you'd use in classical statistics.

Result: roughly 3 in 5 inputs came back statistically significant. Expected output length dominated by a wide margin. Which model answered, and which provider it came from, were next, both clearing significance too. This confirmed the model isn't just latching onto noise — genuinely reassuring, and now it's a permanent step that runs after every training pass.

## What the whole thing looks like now

It ended up as a small pipeline — a chain of scripts that each do one job and hand off to the next, all written in Python:

- A database holds the raw call logs (which feature, which model, tokens, cost, latency) — the source of truth
- One script pulls that data out
- Another turns the raw data into the number format a model can actually learn from — e.g. turning a model's name into a 0/1 column instead of text
- Another feeds that into the training algorithm and now also runs the significance test — every run gets logged so past attempts can be compared later
- A small backend service serves reporting endpoints (fastest/cheapest option per feature, a cost forecast, before/after comparisons, input significance)
- A small dashboard turns all of that into charts a non-technical person can read at a glance

The most concrete finding out of all of it: our fastest and cheapest option is barely used, while a slower, meaningfully more expensive option handles most of the traffic — with no quality data yet to say the expensive one is actually worth it.

## The biggest meta-lesson

Almost every real bug today wasn't a modeling problem — it was a **data honesty problem**: a filter silently zeroing out a dataset, an input secretly leaking the future into the past, a "quality score" that had never actually contained a signal. The algorithm part (boosting, trees, corrections) was, honestly, the easy part once explained properly. The hard part — and the actual skill, it turns out — is being suspicious of results that look *too* clean, and checking your assumptions about what the data really contains before trusting what a model tells you.

First ML project, but I don't think that lesson is specific to ML at all.
