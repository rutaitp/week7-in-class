window.addEventListener('load', () => {
  //access the feed section
  let feed = document.querySelector('#feed');

  //STEP 6. Fetch all the messages from the server
  fetch('/messages')
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data);
      //7. add the messages to html
      let messages = data.data;
      for (let i = 0; i < messages.length; i++) {
        let message = messages[i].message;
        let time = messages[i].time;
        //for every message create a p
        let newMessage = document.createElement('p');
        newMessage.innerHTML = time + ": " + message;
        //append it to the feed
        feed.appendChild(newMessage);
      }
    })
    .catch(error => {
      console.log(error);
    });

  //8. get the new message value
  let msg = document.querySelector("#msg-input");
  let button = document.querySelector('#msg-submit');
  button.addEventListener('click', () => {
    //Access a message
    // console.log(msg.value);
    let message = msg.value;
    //16. clean the input field
    msg.value = "";

    //9.1
    let messageObject = {
      message: message
    }

    //9.2
    let messageObjectJSON = JSON.stringify(messageObject);

    //9.3.
    fetch('/new-message', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: messageObjectJSON
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        //Do something with the data that comes back from the server
        console.log(data);
        //15. update the feed
        let message = data.message;
        let time = data.time;
        //for every message create a p
        let newMessage = document.createElement('p');
        newMessage.innerHTML = time + ": " + message;
        //append it to the feed
        feed.insertBefore(newMessage, feed.firstChild);
      })
      .catch(error => {
        console.log(error);
      });
  });
});
