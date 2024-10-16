//Data array
let messages = [
  {
    message: "This is the first y message",
    time: "Mon Oct 18 2022 15:36:27 GMT+0300 (Eastern European Summer Time)"
  },
  {
    message: "Hello hello!",
    time: "Mon Oct 18 2022 15:37:05 GMT+0300 (Eastern European Summer Time)"
  }
];

//STEP 1. Set up a server
// let express = require('express');
import express from 'express';
let app = express();

//18. Import lowdb
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

//21. Connect to db
const defaultData = { messages: [] };
const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);

//Serve a public folder
app.use(express.static('public'));
app.use(express.json()); //11. parse the message data
//Listen
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server listening on localhost:', port);
});

/*ROUTES */
//STEP 4-7. GET all the messages as an object
app.get('/messages', (request, response) => {
  //23. get messages from the db
  db.read()
    .then(() => {
      //5. Send data as an object
      let messageData = {
        data: db.data.messages
      }
      response.json(messageData);
    })
});

//STEP 10. POST for a new message
app.post('/new-message', (request, response) => {
  // console.log(request.body);
  let messageData = request.body;
  messageData.time = Date(); //12. update with time
  // console.log(messageData);

  //13. add new message to the messages array
  // messages.push(messageData);
  // console.log(messages);
  //22. add new message to the db
  db.data.messages.push(messageData)
  db.write()
    .then(() => {
      //14. send new message back to teh client
      response.json(messageData);
    })

});
