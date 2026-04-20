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



## ☁️ Enterprise-Grade Deployment Strategy

Following the architectural standards of leading regional platforms like **HungerStation**, this project is designed for high availability and regional compliance (Saudi Data Residency).

### 1. Production Cloud Hosting (Frontend & API)
To match the scalability of professional delivery apps, the web service and Node.js backend are hosted on **Google Cloud Platform (GCP)** or **Railway**. 
* **Global Availability:** High-uptime hosting ensures users can access the bot 24/7.
* **Regional Performance:** For the Saudi market, we recommend deploying to the **Google Cloud Riyadh Region (me-central2)** to ensure ultra-low latency and compliance with local data regulations.

### 2. Hybrid AI Infrastructure (Cost Optimization)
While large enterprises scale their LLMs on massive cloud clusters, **ordersBot** supports a **Hybrid-Edge** model to drastically reduce operational costs:

* **Cloud Layer:** Uses Google Gemini for high-performance reasoning during peak loads.
* **Private Edge Layer:** Redirects "heavy" inference tasks to a local/private server using **Ollama** or **vLLM**. This mirrors how modern companies use "Private Clouds" to process sensitive data without per-token costs.

### 3. Secure Tunneling & Networking
In a real-world production environment, we use **Cloudflare Tunnels** to bridge our private AI hardware with our public cloud frontend. This ensures that:
1. User data remains encrypted in transit.
2. The internal AI infrastructure is never exposed directly to the public internet.
3. We achieve the same "Local Data Hosting" benefits touted by providers like **stc Cloud**.

---

**Current Status:** The project is configured for immediate deployment via GitHub to **Render/Railway**, with optional hooks for a local-first AI fallback.
