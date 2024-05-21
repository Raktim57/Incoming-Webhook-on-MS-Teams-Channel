const express = require('express');
const PORT = 3001;
const server = express();
const fs = require('fs');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
server.use(express.json());
server.use(express.urlencoded({
    extended: true
}));

// let rawdata = require('/data.json');
// let rawdata = fs.readFileSync('data.json');

// console.log(data);


var formatted_Card_Payload = {
    "type": "AdaptiveCard",
    "body": [
      {
        "type": "TextBlock",
        "size": "medium",
        "weight": "bolder",
        // "text": "${title}",
        "text":"Publish Adaptive Card Schema",
        "style": "heading",
        "wrap": true
      },
      {
        "type": "ColumnSet",
        "columns": [
          {
            "type": "Column",
            "items": [
              {
                "type": "Image",
                "style": "person",
                // "url": "${creator.profileImage}",
                "url":"https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
                "altText": "Raktim Bhuyan",
                "size": "small"
              }
            ],
            "width": "auto"
          },
          {
            "type": "Column",
            "items": [
              {
                "type": "TextBlock",
                "weight": "bolder",
                "text": "Raktim Bhuyan",
                "wrap": true
              },
              {
                "type": "TextBlock",
                "spacing": "none",
                // "text": "Created {{DATE(${string(createdUtc)}, SHORT)}}",
                "isSubtle": true,
                "wrap": true
              }
            ],
            "width": "stretch"
          }
        ]
      },
      {
        "type": "TextBlock",
        "text": "${description}",
        "wrap": true
      },
      {
        "type": "FactSet",
        "facts": [
          {
            "$data": "${properties}",
            "title": "${key}:",
            "value": "${value}"
          }
        ]
      }
    ],
    "actions": [
      {
        "type": "Action.ShowCard",
        "title": "Set due date",
        "card": {
          "type": "AdaptiveCard",
          "body": [
            {
              "type": "Input.Date",
              "label": "Enter the due date",
              "id": "dueDate"
            },
            {
              "type": "Input.Text",
              "id": "comment",
              "isMultiline": true,
              "label": "Add a comment"
            }
          ],
          "actions": [
            {
              "type": "Action.Submit",
              "title": "OK"
            }
          ],
          "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
        }
      },
      {
        "type": "Action.OpenUrl",
        "title": "View",
        "url": "${viewUrl}",
        "role": "button"
      }
    ],
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.5"
  }

  var payload2 = {
    "contentType": "application/vnd.microsoft.card.adaptive",
    "content": {
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "type": "AdaptiveCard",
      "version": "1.0",
      "body": [
        {
          "type": "Container",
          "items": [
            {
              "type": "TextBlock",
              "text": "Publish Adaptive Card schema",
              "weight": "bolder",
              "size": "medium"
            },
            {
              "type": "ColumnSet",
              "columns": [
                {
                  "type": "Column",
                  "width": "auto",
                  "items": [
                    {
                      "type": "Image",
                      "url": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
                      "size": "small",
                      "style": "person"
                    }
                  ]
                },
                {
                  "type": "Column",
                  "width": "stretch",
                  "items": [
                    {
                      "type": "TextBlock",
                      "text": "Matt Hidinger",
                      "weight": "bolder",
                      "wrap": true
                    },
                    {
                      "type": "TextBlock",
                      "spacing": "none",
                      "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                      "isSubtle": true,
                      "wrap": true
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "Container",
          "items": [
            {
              "type": "TextBlock",
              "text": "Now that we have defined the main rules and features of the format, we need to produce a schema and publish it to GitHub. The schema will be the starting point of our reference documentation.",
              "wrap": true
            },
            {
              "type": "FactSet",
              "facts": [
                {
                  "title": "Board:",
                  "value": "Adaptive Card"
                },
                {
                  "title": "List:",
                  "value": "Backlog"
                },
                {
                  "title": "Assigned to:",
                  "value": "Matt Hidinger"
                },
                {
                  "title": "Due date:",
                  "value": "Not set"
                }
              ]
            }
          ]
        }
      ],
      "actions": [
        {
          "type": "Action.ShowCard",
          "title": "Set due date",
          "card": {
            "type": "AdaptiveCard",
            "body": [
              {
                "type": "Input.Date",
                "id": "dueDate"
              }
            ],
            "actions": [
              {
                "type": "Action.Submit",
                "title": "OK"
              }
            ]
          }
        },
        {
          "type": "Action.ShowCard",
          "title": "Comment",
          "card": {
            "type": "AdaptiveCard",
            "body": [
              {
                "type": "Input.Text",
                "id": "comment",
                "isMultiline": true,
                "placeholder": "Enter your comment"
              }
            ],
            "actions": [
              {
                "type": "Action.Submit",
                "title": "OK"
              }
            ]
          }
        }
      ]
    }  
  }
  var payload3 = {
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
                      "text": "This is some text",
                      "size": "large"
                    },
                    {
                      "type": "TextBlock",
                      "text": "It doesn't wrap by default",
                      "weight": "bolder"
                    },
                    {
                      "type": "TextBlock",
                      "text": "So set **wrap** to true if you plan on showing a paragraph of text",
                      "wrap": true
                    },
                    {
                      "type": "TextBlock",
                      "text": "You can also use **maxLines** to prevent it from getting out of hand",
                      "wrap": true,
                      "maxLines": 2
                    },
                    {
                      "type": "TextBlock",
                      "text": "You can even draw attention to certain text with color",
                      "wrap": true,
                      "color": "attention"
                    }
                  ]
            }
        }
    ]
}
  
  

var webhookUrl = "https://intel.webhook.office.com/webhookb2/be09f196-4d79-41bb-81bd-84b5e81f4fd9@46c98d88-e344-4ed4-8496-4ed7712e255d/IncomingWebhook/4a2189a9e3fe41428a69d97dbc705ec7/e4976a87-adb1-4ac7-a460-7bf933a82b79";

axios.post(webhookUrl, payload2)
    .then(res => {
        console.log(`statusCode: ${res.status}`)
        // console.log(res)
    })
    .catch(error => {
        console.error(error)
    })