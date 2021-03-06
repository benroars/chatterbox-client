var purifyHTML = function(input) { 
/* code that returns purified HTML */ 
  var output = input.replace(/<script[^>]*?>.*?<\/script>/gi, '').
    replace(/<[\/\!]*?[^<>]*?>/gi, '').
    replace(/<style[^>]*?>.*?<\/style>/gi, '').
    replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
  return output;
};


var app = {};
// // YOUR CODE HERE:
$(document).ready(function() {

  app = {

    userObj: {},
    postObj: {},
    server: 'https://api.parse.com/1/classes/messages',


    init: function() {
      //click handlers

      $('.refresh-button').on('click', (e) => {
        e.preventDefault();
        app.clearMessages();
        app.fetch();
        //app.boldClassFriends($('#user').val(), app.userObj[$('#user').val()]);
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
      });

      $('#addRoom').on('submit', function(e) {
        e.preventDefault();
        var $room = $('#nameroom').val();
        app.addRoom($room);
      });
    

      $('body').on('click', '.username', function(e) {
        
        e.preventDefault();
       //app.fetch();
        var username = this.innerHTML.replace(' ', '').slice(0, this.innerHTML.indexOf(':'));
        if (username === '' || username === undefined) {
          username = 'user';
        }

        if (!app.userObj[$('#user').val()]) {
          app.userObj[$('#user').val()] = [];
        }
        
        app.userObj[$('#user').val()].push(username);

        app.boldClassFriends(username, app.userObj[$('#user').val()]);

      });

    },

    boldClassFriends: function(user, friendArray) {

      console.log(user);
      $('.' + user).each(function() {
        if ($(this).hasClass('friend')) {
          $(this).removeClass('friend');
          var index = friendArray.indexOf(user);
          friendArray.splice(index, 1);
        } else {
          $(this).addClass('friend');
        }
      });
    },

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

    fetch: function() {
      //submits a GET request via $.ajax()
     // if (refreshFlag) {
      app.clearMessages();
      //var $room = $('#roomSelect option:selected').text();

      $.ajax({
        url: this.server,
        type: 'GET',
        contentType: 'application/json',
        //data: 'where={"roomname":"' + $room + '"}',

        error: function() {
          $('.chats').html('<p>An error has occurred</p>');
        },
        
        success: function(data) {
          var $messages = $('<ul></ul>');

          _.each(data, message => {
            _.each(message, val => {
              if (val.username !== undefined || val.username !== '') {
                val.username = purifyHTML(val.username);
              } else {
                val.username = 'user';
              }

              if (val.username === '') {
                val.username = 'user';
              }
              val.username = val.username.replace(' ', '');
              val.username = val.username.replace(/[^a-zA-Z0-9]/gi, '');

              var $chatMessage = $('<div class="chat ' + val.username + '"></div>'); 
              var x = $('<div class="chat username ' + val.username + '"></div>').text(val.username + ':');
              var y = $('<div class="message"></div>').text(val.text);
              var $clean;
              if (val.text !== undefined) {
                $clean = purifyHTML(val.text);
              }
              y.text($clean);
              x.append(y);
              
              $chatMessage.append(x);

              if (val.roomname === $('#roomSelect option:selected').text()) {
                $('#chats').append($chatMessage);
              }

              if (!app.userObj[val.username]) { 
                app.userObj[val.username] = [];
              }
              // console.log(val.roomname);
              app.addRoom(val.roomname);
             // app.boldClassFriends(val.username, app.userObj[$('#user').val()]);
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

      // $('#chats').append($chatMessage);
      
      this.send(message);
      
    },

    rooms: 1,
    roomList: [],

    addRoom: function(roomName) {
      if (app.roomList.indexOf(roomName) === -1) {
        if (roomName) {
         // console.log('before'+roomName);
          roomName = purifyHTML(roomName);
         // console.log(roomName);
        } else {
          roomName = '';
        }
        app.roomList.push(roomName);

        var $room = $('<option value="' + this.rooms.length + '">' + roomName + '</option>');
        this.rooms++;
        
        if (roomName.length !== 0) { 
          $('#roomSelect').append($room);
        }
      }
    }
  
  };

  app.init();

});