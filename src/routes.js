const express = require('express');
const { extractParameters, getRecommendation } = require('./llm');
const { queryRestaurants, getUserHistory } = require('./data');

const router = express.Router();

router.post('/process-order', async (req, res) => {
    try {
        const { user_query, user_id = "mock_user_1", chat_history = [] } = req.body;

        if (!user_query) {
            return res.status(400).json({ error: "user_query is required" });
        }

        // Step A: Intent Parsing
        console.log("Step A: Extracting parameters for query:", user_query);
        const filters = await extractParameters(user_query, chat_history);
        console.log("Extracted Filters:", filters);

        // Step B: DB Query
        console.log("Step B: Querying restaurants mock DB...");
        const availableOptions = queryRestaurants(filters);
        console.log(`Found ${availableOptions.length} available restaurants matching filters.`);

        // Step C: Personalization
        console.log("Step C: Fetching user history...");
        const history = getUserHistory(user_id);

        // Step D: Final Selection
        console.log("Step D: Getting LLM recommendation...");
        const recommendation = await getRecommendation(availableOptions, history, chat_history);

        return res.json(recommendation);

    } catch (error) {
        console.error("Error processing order:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
});

module.exports = router;
