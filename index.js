const express = require('express');
const PORT =  3001;
const server = express();
const axios = require('axios');
server.use(express.json());
server.use(express.urlencoded({
    extended: true
}));

var webhookUrl = "https://intel.webhook.office.com/webhookb2/be09f196-4d79-41bb-81bd-84b5e81f4fd9@46c98d88-e344-4ed4-8496-4ed7712e255d/IncomingWebhook/4a2189a9e3fe41428a69d97dbc705ec7/e4976a87-adb1-4ac7-a460-7bf933a82b79";

server.post('/api/Send', (req, res) => {
    webhookUrl = req.body.webhookUrl;
    var cardJson = JSON.parse(req.body.cardBody);

    axios.post(req.body.webhookUrl, cardJson)
        .then(res => {
            console.log(`statusCode: ${res.status}`)
            console.log(res)
        })
        .catch(error => {
            console.error(error)
        })
});

server.post('/api/save', (req, res) => {
    var response = JSON.stringify(req.body);
    var card = {
        "type": "message",
        "attachments": [
            {
                "contentType": "application/vnd.microsoft.card.adaptive",
                "contentUrl": null,
                "content": {
                    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                    "type": "AdaptiveCard",
                    "version": "1.2",
                    "body": [
                        {
                            "type": "TextBlock",
                            "text": "Submitted response:"+ response
                        }
                    ]
                }
            }
        ]
    }

    axios.post(webhookUrl, card).then(res => {
        console.log(`statusCode: ${res.status}`)
        console.log(res)
        })
        .catch(error => {
            console.error(error)
        })
})

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});