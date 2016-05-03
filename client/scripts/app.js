var app = {};
// // YOUR CODE HERE:
$(document).ready(function() {

  app = {

    init: function() {
      console.log('asdfasd');
      //click handlers

      $('.refresh-button').on('click', (e) => {
        e.preventDefault();
        app.clearMessages();
        app.fetch();
      });

      $('.clear-button').on('click', (e) => {
        e.preventDefault();
        app.clearMessages();
      });

      $('#messageForm').on('submit', function(e) {
        e.preventDefault();
        var $user = $('#user').val();
        var $message = $('#mess').val();
        var $room = $('#roomSelect option:selected').text();

        var messageObj = {
          username: $user,
          text: $message,
          roomname: $room
        };

        app.addMessage(messageObj);
        app.fetch();
      });

      $('#addRoom').on('submit', function(e) {
        e.preventDefault();
        var $room = $('#nameroom').val();
        app.addRoom($room);
      });
    
      $('body').on('click', '.username', function(e) {
        
        e.preventDefault();
        var username = this.innerHTML.slice(0, this.innerHTML.indexOf(':'));

        app.userObj[$('#user').val()].push(username);
        app.boldClassFriends($('#user').val());

      });
    },

    boldClassFriends: function(user) {
 
      for (var i = 0; i < app.userObj[user].length; i++) {
        $('.' + app.userObj[user][i]).each(function() {
          $(this).addClass('friend');
        });
      }

    },

    server: 'https://api.parse.com/1/classes/messages',

    send: function(message) {
      //submits a POST request via $.ajax()
      $.ajax({
    // This is the url you should use to communicate with the parse API server.
        url: this.server,
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (data) {
          console.log('chatterbox: Message sent');
          app.fetch();
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message', data);
        }
      });

    },

    userObj: {},

    fetch: function() {
      //submits a GET request via $.ajax()
      app.clearMessages();

      $.ajax({
        url: this.server,
        type: 'GET',
        contentType: 'application/json',
        
        error: function() {
          $('#chats').html('<p>An error has occurred</p>');
        },
        
        success: function(data) {
          var $messages = $('<ul></ul>');

          _.each(data, message => {
            _.each(message, val => {

              var $chatMessage = $('<div class="chat ' + val.username + '"></div>'); 
              var x = $('<div class="chat username ' + val.username + '"></div>').text(val.username + ':');
              x.append($('<div class="message"></div>').text(val.text));
              $chatMessage.append(x);

              if (val.roomname === $('#roomSelect option:selected').text()) {
                $('#chats').append($chatMessage);
              }

              if (!app.userObj[val.username]) { 
                app.userObj[val.username] = [];
              }
              

            });
          });
        }
      });   
    },

    userLog: {},

    clearMessages: function() {
      var myNode = $('#chats')[0];
      while (myNode.firstChild !== null) {
        myNode.removeChild(myNode.firstChild);
      }
    },

    addMessage: function(message) {
      var $chatMessage = $('<div class="chat"></div>'); 
      var x = $('<div class="chat username"></div>').text(message.username + ':');
      x.append($('<div class="message"></div>').text(message.text));

      $('#chats').append($chatMessage);
      
      this.send(message);
      
    },

    rooms: 1,

    addRoom: function(roomName) {
      var $room = $('<option value="' + this.rooms.length + '">' + roomName + '</option>');
      this.rooms++;
      $('#roomSelect').append($room);
    }

  
  };

  app.init();

});