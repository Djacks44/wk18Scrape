$.getJSON('/articles', function(data) {
  console.log(data)
  for (var i = 0; i<data.length; i++){
    $('#articles').append('<div id="boo"><p data-id="' + data[i]._id +'">'+ data[i].title + '<br />' +'<a target="_blank" href="'+data[i].link+'">'+data[i].link+'</a>'+ '</p></div>');
  }
});


$(document).on('click', 'p', function(){
  $('#notes').empty();
  var thisId = $(this).attr('data-id');

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId,
  })
    .done(function( data ) {
      console.log(data);
      $('#notes').append('<h2>' + data.title + '</h2>');
      $('#notes').append('<input id="titleinput" name="title" >');
      $('#notes').append('<textarea id="bodyinput" name="body"></textarea>');
      $('#notes').append('<button data-id="' + data._id + '" id="savenote">Save Note</button>');

      console.log(data.note._id)
      $('#notes').append('<button data-note="' +data.note._id+ '" id="dnote">delete Note</button>');

      if(data.note){
        $('#titleinput').val(data.note.title);
        $('#bodyinput').val(data.note.body);
      }
    });
});

$(document).on('click', '#savenote', function(){
  var thisId = $(this).attr('data-id');

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $('#titleinput').val(),
      body: $('#bodyinput').val()
    }
  })
    .done(function( data ) {
      console.log(data);
      $('#notes').empty();
    });


  $('#titleinput').val("");
  $('#bodyinput').val("");
});

$(document).on('click', '#dnote', function(){
  var selected = $(this).attr('data-note');
  
  console.log(selected)
  // console.log(selected.note)
  $.ajax({
    type: "POST",
    url: '/delete/' + selected,
    success: function(response){
      console.log(response._id);
    }
  });
});

