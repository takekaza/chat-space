$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="message">
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
                  </div>` //メッセージに画像が含まれる場合のHTMLを作る
    } else {
      var html = `<div class="message">
                    <div class="message__list">
                      <p class="message__list__name">${message.user_name}</p>
                      <p class="message__list__today">${message.date}</p>
                    </div>
                    <div class="message__text">
                      ${message.content}
                    </div>
                  </div>` //メッセージに画像が含まれない場合のHTMLを作る
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
});