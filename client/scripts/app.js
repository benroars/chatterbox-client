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
        // if (!app.userFriends[$('#user').val()]) {
        //   app.userFriends[$('#user').val()] = [];
        //   app.userFriends[$('#user').val()].push(username);
        
        // } else {
        //   app.userFriends[$('#user').val()].push(username);
        // }
        e.preventDefault();
        var username = this.innerHTML.slice(0, this.innerHTML.indexOf(':'));
      //  console.log(app.userLog);
    //    if (app.userLog[$('#user')]) {
        // if (!app.userLog[$('#user').val()]['friends'][username]) {
        //   app.userLog[$('#user').val()]['friends'][username] = app.userLog[username].posts;
        // }
        // console.log('ok');
        


        app.userObj[$('#user').val()].push(username);
        app.boldClassFriends($('#user').val());

        //app.fetch();
      });
    },

    boldClassFriends: function(user) {
      // var f = app.userLog[user].friends;
      // //console.log(f);
      // //console.log(f);
      // for (var key in f) {
      //   //console.log($('.' + key));
      //   $('.' + key).each(function(i, value) {
      //     //console.log(value);
      //     // $(this).('<div class="chat mala friend"></div>');
      //     console.log($(this));
      //     $(this)[0].classList = 'chat mala friend';
      //   });
       // console.log(f[key][0]);
//        $(f[key][0])[0].addClass('friend');
       // _.each(f[key], function(value) { 
       //  //console.log(value);
       //  $(value).addClass('friend');
       // });
       //  // for (var i = 0; i < f[key]; i++) {
        //   console.log(f[key][i]);
        // //   $(f[key][i]).addClass('friend');
        // }

     // }
    for(var i = 0; i < app.userObj[user].length; i++) {
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
          //this.clearMessages();
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
              //console.log(data);
          var $messages = $('<ul></ul>');

          _.each(data, message => {
            _.each(message, val => {
              // if (!app.userLog[val.username]) {
              //   app.userLog[val.username] = {posts: [], friends: {}};

              // }
              // if (!app.userLog[$('#user').val()]) {
              //   app.userLog[$('#user').val()] = {posts: [], friends: {}};
              // }

              var $chatMessage = $('<div class="chat ' + val.username + '"></div>'); //.text(val.username + ':\n' + val.text);
              var x = $('<div class="chat username ' + val.username + '"></div>').text(val.username + ':');
              x.append($('<div class="message"></div>').text(val.text));
              $chatMessage.append(x);

              if (val.roomname === $('#roomSelect option:selected').text()) {
                $('#chats').append($chatMessage);
              }
              // if (app.userLog[val.username].posts.indexOf($chatMessage[0]) === -1) {
              //   app.userLog[val.username].posts.push($chatMessage[0]);
              // }
              //console.log(app.userLog);

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
      //$('#chats').html('');
      var myNode = $('#chats')[0];
      while (myNode.firstChild !== null) {
        myNode.removeChild(myNode.firstChild);
      }
    },

    addMessage: function(message) {
      var $chatMessage = $('<div class="chat"></div>'); //.text(val.username + ':\n' + val.text);
      var x = $('<div class="chat username"></div>').text(message.username + ':');
      x.append($('<div class="message"></div>').text(message.text));

      $('#chats').append($chatMessage);
      
      this.send(message);
      
    },

    rooms: 1,

    addRoom: function(roomName) {
      //var $room = $('<div class="' + roomName + '"></div>');
      var $room = $('<option value="' + this.rooms.length + '">' + roomName + '</option>');
      this.rooms++;
      $('#roomSelect').append($room);

     // <option value="1">Lobby</option>
    }

    

  };

  app.init();
  
  //app.fetch();

});