## The Problem
Many food delivery users struggle with *decision fatigue*. They often spend a long time browsing through countless options trying to find a meal that perfectly matches their specific, real-time cravings—whether that's a strict budget, a precise calorie limit, or a desire for lightning-fast delivery time. This assistant eliminates the endless scrolling by instantly analyzing their constraints and historical preferences to serve up the perfect customized recommendation.

# food order AI Assistant

An intelligent, conversational recommendation agent for food delivery built with Node.js, Express, and Google's Gemini LLM. The AI dynamically adapts to user history, current constraints (time, budget, calorie count), and resolves ambiguities by asking clarifying questions using a modern web interface.

![App Output](./Screenshot%202026-04-19%20at%202.51.12%20PM.png)


## Architecture & Logic Flow

![Logic Flow](./smart_order_assistant_flow.svg)

## Prerequisites
- Node.js installed

## Setup Instructions

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   You must set up your Google Gemini API Key before running the application.

   Create a file named `.env` in the root of the project directory based on the following pattern:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

3. **Run the Server Locally:**
   ```bash
   npm start
   ```

4. **Access the Chat Interface:**
   The server will start at `http://localhost:3000`. Navigate to this URL in your web browser.

## Deployment

This app requires a backend Node.js environment to run securely. You cannot host this on static providers like GitHub Pages.

To host the application:
1. Push your repository to GitHub.
2. Sign up on a platform like **Render**, **Railway**, or **Heroku**.
3. Create a new Node Web Service.
4. Add your `GEMINI_API_KEY` into the provider's Environment Variables or Secrets manager.
5. Deploy using the default `npm start` build command.




## 🌐 Real-World Deployment: Local LLM & Edge Inference

To eliminate API costs and ensure total data privacy, this project can be transitioned from cloud-based APIs to a **Local Edge Inference** strategy. This allows the assistant to function without per-token fees or internet-dependency for the reasoning engine.

### 1. Local Inference Setup
The architecture supports **Ollama** or **vLLM** as the inference server. These provide an OpenAI-compatible API that the Node.js backend can target.

* **Recommended Model:** `Llama-3.3-8B` (Quantized) or `Gemma-2-9B`.
* **Hardware:** A GPU with 12GB+ VRAM (e.g., RTX 3060/4060 Ti) is recommended for sub-second response times.

**To switch to local mode:**
```bash
# 1. Install Ollama and pull your preferred model
ollama pull llama3.3:8b

# 2. Update your .env to point to the local instance
AI_MODE=local
LOCAL_LLM_URL=http://localhost:11434/v1
