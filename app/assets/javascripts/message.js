$(function(){

  function buildHTML(message){
    if (message.image) {
      var html = `<div class="message" data-message_id='${message.id}'>
                    <div class="message__list">
                      <p class="message__list__name">${message.user_name}</p>
                      <p class="message__list__today">${message.date}</p>
                    </div>
                    <div class="message__text">
                      <p class="message__text__content">
                        ${message.content}
                      </p>
                      <img class="message__text__image" src='${message.image}' >
                    </div>
                  </div>`
    } else {
      var html = `<div class="message" data-message_id='${message.id}'>
                    <div class="message__list">
                      <p class="message__list__name">${message.user_name}</p>
                      <p class="message__list__today">${message.date}</p>
                    </div>
                    <div class="message__text">
                      ${message.content}
                    </div>
                  </div>`
    }
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.main-messages').append(html);
      $('#new_message')[0].reset();
      $('.main-messages').animate({scrollTop: $('.main-messages')[0].scrollHeight});
      $('.submit-btn').prop("disabled", false);
      return false
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $('.submit-btn').removeAttr('data-disable-with')
    });
  })

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      last_message_id = $('.message:last').data('message_id');
      $.ajax({
        url: "api/messages",
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-messages').append(insertHTML);
        $('.main-messages').animate({scrollTop: $('.main-messages')[0].scrollHeight});
        return false
      })
      .fail(function() {
        console.log('error');
      });
    }
  };
  setInterval(reloadMessages, 7000);
});