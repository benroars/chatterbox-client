$.ajax({
      url: 'https://api.parse.com/1/classes/messages',
      type: 'GET',
    //  data: {
    //    limit: 30
    //  },
      contentType: 'application/json',
      
      error: function() {
        console.log(data);
        $('.chat').html('<p>An error has occurred</p>');
      },
      
      success: function(data) {
        //console.log(data.results);
        _.each(data.results, function(value) {
           console.log(value);
        });
        var $username = $('<h1>').text(data.username);
        var $text = $('<p>').text(data.text);
        var $roomname = $('<h5>').text(data.roomname);
        $('.chat')
          .append($username)
          .append($text)
          .append($roomname);
      }    
    });

// // YOUR CODE HERE:
// var app = {

//   init: function() {
//     console.log('asdfasd');
//   },

//   send: function(message) {
//     //submits a POST request via $.ajax()
//     var messages = {
//       username: message.username,
//       text: message.text,
//       roomname: message.roomname
//     };

//     $.ajax({
//   // This is the url you should use to communicate with the parse API server.
//       url: 'https://api.parse.com/1/classes/messages',
//       type: 'POST',
//       data: JSON.stringify(message),
//       contentType: 'application/json',
//       success: function (data) {
//         console.log('chatterbox: Message sent');
//       },
//       error: function (data) {
//         // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//         console.error('chatterbox: Failed to send message', data);
//       }
//     });
//   },

//   fetch: function() {
//     //submits a GET request via $.ajax()
1
//     $.ajax({
//       url: 'https://api.parse.com/1/classes/messages',
//       type: 'GET',
//     //  data: {
//     //    limit: 30
//     //  },
//       contentType: 'application/json',
      
//       error: function() {
//         console.log(data);
//         $('.chat').html('<p>An error has occurred</p>');
//       },
      
//       success: function(data) {
//         console.log(data);
//         var $username = $('<h1>').text(data.username);
//         var $text = $('<p>').text(data.text);
//         var $roomname = $('<h5>').text(data.roomname);
//         $('.chat')
//           .append($username)
//           .append($text)
//           .append($roomname);
//       }    
//     });


//   },


//   clearMessages: function() {

//   },

//   addMessage: function() {
    
//   },

//   addRoom: function() {
    
//   }

// };