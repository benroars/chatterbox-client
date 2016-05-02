// $.ajax({
//       url: 'https://api.parse.com/1/classes/messages',
//       type: 'GET',
//     //  data: {
//     //    limit: 30
//     //  },
//       contentType: 'application/json',
      
//       error: function() {
//         console.log(data);
//         $('.chats').html('<p>An error has occurred</p>');
//       },
      
//       success: function(data) {
//         //console.log(data.results);
//         _.each(data.results, function(value) {
//            console.log(value);
//         });
//         var $username = $('<h1>').text(data.username);
//         var $text = $('<p>').text(data.text);
//         var $roomname = $('<h5>').text(data.roomname);
//         $('.chat')
//           .append($username)
//           .append($text)
//           .append($roomname);
//       }    
//     });
var app = {};
// // YOUR CODE HERE:
$(document).ready(function() {
  app = {

    init: function() {
      console.log('asdfasd');
      //click handlers

      $('.refresh-button').on('click', () => {
        this.fetch();
      });

      $('.clear-button').on('click', () => {
        this.clearMessages();
      });
    },

    server: 'https://api.parse.com/1/classes/messages',

    send: function(message) {
      //submits a POST request via $.ajax()
      
      // var message = {
      //   username: 'Mel Brooks',
      //   text: 'Never underestimate the power of the Schwartz!',
      //   roomname: 'lobby'
      // };
      console.log('send fxn');
      $.ajax({
    // This is the url you should use to communicate with the parse API server.
        url: this.server,
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (data) {
          console.log('chatterbox: Message sent');
          //this.clearMessages();
          this.fetch();
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message', data);
        }
      });

    },



    fetch: function() {
      //submits a GET request via $.ajax()

      $.ajax({
        url: this.server,
        type: 'GET',
        data: {
          limit: 30
        },
        contentType: 'application/json',
        
        error: function() {
          $('#chats').html('<p>An error has occurred</p>');
        },
        
        success: function(data) {
              //console.log(data);
          var $messages = $('<ul></ul>');

          _.each(data, message => {
            _.each(message, val => {
              console.log(val);

              var $username = $('<h5></h5>').text(val.username + val.text + val.roomname);
              //var $text = $('<p>').text(val.text);
              //var $roomname = $('<h5></h5>').text('Chatroom: ' + val.roomname);

              $('#chats')
                .append($username);
               // .append($text)
              //  .append($roomname);
            });
          });
        }
      });   
    },


    clearMessages: function() {
      //$('#chats').html('');
      var myNode = $('#chats')[0];
      while (myNode.firstChild !== null) {
        myNode.removeChild(myNode.firstChild);
      }
    },

    addMessage: function(message) {
      var $username = $('<h5></h5>').text(message.username + message.text + message.roomname);
      $('#chats').append($username);
      
      //console.log(message);
      
      this.send(message);
      //this.fetch();
    },

    addRoom: function() {
      
    }

    

  };

  app.init();
  
  //app.fetch();

});