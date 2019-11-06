$(function(){
  function buildHTML(message){
    var image = message.image ? `<img src= ${message.image}>` : "";
    var html = `<div class="message" data-message-id="${message.id}"> 
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                      ${message.user_name}
                    </div>
                    <div class="message__upper-info__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="message__text">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                    ${image}
                  </div>
                </div>`
    return html;
  }
  
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formdata = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,  
      type: 'POST',  
      data: formdata,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('.submit').prop('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('form')[0].reset();
    })

    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
    return false;
  });
  
  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      //groups/グループID/messagesのパスとマッチしたら以下を実行する。
      var last_message_id = $('.message:last').data("message-id");
console.log(last_message_id)
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {last_id: last_message_id}
      })
      .done(function (messages) {
        var insertHTML = '';
        messages.forEach(function (message) {//配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 5000);
});