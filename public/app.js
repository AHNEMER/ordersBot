document.addEventListener("DOMContentLoaded", () => {
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-input");
    const chatMessages = document.getElementById("chat-messages");
    const userSelect = document.getElementById("user-select");

    // Chat history state
    let conversationHistory = [];

    // Scroll to bottom
    const scrollToBottom = () => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const submitMessage = async (text) => {
        const userUserId = userSelect.value;
        appendUserMessage(text);
        
        appendTypingIndicator();

        try {
            const response = await fetch('/process-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_query: text,
                    user_id: userUserId,
                    chat_history: conversationHistory
                })
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.error || "Server failed to respond properly.");
            }

            const json = await response.json();
            appendAIMessage(json);
        } catch (err) {
            console.error("Chat Error:", err);
            appendAIMessage({ error: err.message });
        }
    };

    // Add user message
    const appendUserMessage = (text) => {
        conversationHistory.push({ role: "user", text });
        
        const msgDiv = document.createElement("div");
        msgDiv.className = "message user";
        msgDiv.innerHTML = `<div class="bubble">${text}</div>`;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    };

    // Add typing indicator
    const appendTypingIndicator = () => {
        const msgDiv = document.createElement("div");
        msgDiv.className = "message ai";
        msgDiv.id = "typing-indicator";
        msgDiv.innerHTML = `
            <div class="bubble">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>`;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
        return msgDiv;
    };

    // Render Basket
    const renderReceipt = (data) => {
        if (!data.basket) {
            return `<p>${data.match_reason || "I couldn't find anything matching."}</p>`;
        }

        const itemsHtml = data.basket.map(item => `
            <div class="basket-item">
                <div><span class="item-qty">${item.quantity}x</span> ${item.item_name}</div>
                <div>${item.price.toFixed(2)} SAR</div>
            </div>
        `).join('');
        
        const deliveryHtml = data.delivery_fee !== undefined ? `
            <div class="basket-item" style="color: #a1a1aa; border-top: 1px dashed rgba(255,255,255,0.1); margin-top: 8px; padding-top: 8px;">
                <div>رسوم التوصيل</div>
                <div>${data.delivery_fee.toFixed(2)} SAR</div>
            </div>
        ` : '';

        return `
            <p>لقيت لك الطلب المناسب!</p>
            <div class="receipt">
                <div class="receipt-header">
                    <h3>${data.restaurant} <span class="eta">${data.estimated_arrival}</span></h3>
                </div>
                ${itemsHtml}
                ${deliveryHtml}
                <div class="receipt-total">
                    <span>المجموع</span>
                    <span>${data.total_price.toFixed(2)} SAR</span>
                </div>
                <div class="match-reason">
                    ${data.match_reason}
                </div>
            </div>
        `;
    };

    // Add AI message
    const appendAIMessage = (data) => {
        const typingIndicator = document.getElementById("typing-indicator");
        if (typingIndicator) typingIndicator.remove();

        const msgDiv = document.createElement("div");
        msgDiv.className = "message ai";
        
        let contentHtml = "";

        if (data.error) {
            contentHtml = `<p style="color: #ff6b6b;">Error: ${data.error}</p>`;
        } else if (data.status === "clarification") {
            // Conversational clarifying state
            conversationHistory.push({ role: "assistant", text: data.question });
            
            const choicesHtml = (data.choices || []).map(choice => 
                `<button class="choice-btn" data-val="${choice.replace(/"/g, '&quot;')}">${choice}</button>`
            ).join('');

            contentHtml = `
                <p>${data.question}</p>
                <div class="choice-buttons">
                    ${choicesHtml}
                </div>
            `;
        } else {
            // Recommendation State
            conversationHistory.push({ role: "assistant", text: data.match_reason || "Presented recommendation." });
            
            if (data.basket && data.basket.length === 0) {
                contentHtml = `<p>${data.match_reason || "No items matched your constraints."}</p>`;
            } else {
                contentHtml = renderReceipt(data);
            }
        }

        msgDiv.innerHTML = `<div class="bubble">${contentHtml}</div>`;
        
        // Bind choice button clicks
        const btns = msgDiv.querySelectorAll('.choice-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const choiceText = btn.getAttribute('data-val');
                chatInput.value = "";
                // remove button hover so they look deactivated
                btns.forEach(b => b.style.pointerEvents = 'none');
                submitMessage(choiceText);
            });
        });

        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    };

    chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (!text) return;
        chatInput.value = "";
        submitMessage(text);
    });

    // Handle initial focus
    chatInput.focus();
});
