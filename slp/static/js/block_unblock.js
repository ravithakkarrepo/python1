// merchant block/unblock
// $(document).ready(function(){
  // console.log('kokok');
  $('.block_unblock').on('click','.m_block',function(e){
    e.preventDefault();
    console.log('block merchant');
    var result = confirm('are you sure you want to block merchant?');
    console.log('result---->',result);
    if (result){
      var url_link = $(this).attr("data-url");
      console.log(url_link);
      var m_unblock_html = `<button type="button" data-url = "` + url_link + `" id = "m_unblock_id" class ="btn btn-danger  text-center waves-effect text-center m_unblock" onclick="m_unblock()" >Unblock </button>`;
      var m_block_data = "{{ is_blocked }}";
      console.log('bbbbbbbbbb',m_block_data);

      $.ajax({
        url: url_link,
        dataType: 'text',
        data: {
          'is_blocked':m_block_data,
        },
        success: function(data){
          // console.log('success');
          // $(this).remove();
          $('#m_block_id').remove();
          $('.switch-custom').append(m_unblock_html);
          $("#m_unblock_id").attr('title', 'merchant is blocked click here to unblock merchant');

        }
      });
    }
    else{
      console.log('eeeeeeeeeeee');
    }
  });
// });

function m_unblock() {
  console.log("unblock fun");
  var res = confirm('are you sure you want to Unblock merchant?')
  console.log('res---->',res);
  if (res){
    var url_link = $('.m_unblock').attr("data-url");
    console.log('url_link-->',url_link);
    var m_block = `<button type="button" data-url = "`+url_link+`" class="btn btn-primary  text-center waves-effect text-center m_block" id="m_block_id" >Block </button>`;

    // console.log(m_block);
    var block = "{{ is_blocked }}"
    console.log(block);
    $.ajax({
      url: url_link,
      dataType: 'text',
      data: {
        'is_blocked':block,
      },
      success: function(data){
        console.log('success')
        // $(this).remove();
        $('#m_unblock_id').remove();
        $('.switch-custom').append(m_block);
        $("#m_block_id").attr('title', 'merchant is Unblocked click here to block merchant');

      }
    });
  }
  else{
    // console.log('eeeeeeeeeeee')
  }
};




// user block/unblock


// $(document).ready(function(){
  // console.log('kokok');
  $('#unblock_block_user').on('click','.user_block',function(e){
    e.preventDefault();
    console.log('block');
    var result = confirm('are you sure you want to block user?');
    console.log('result---->',result);
    if (result){
      var url_link = $(this).attr("data-url");
      console.log(url_link);
      var user_unblock_html = `<button type="button" data-url = "` + url_link + `" id="unblock_user" class="btn btn-danger  text-center waves-effect text-center user_unblock" onclick="unblock()"> UnBlock </button>`;

      var block = "{{ is_blocked }}";
      // console.log('bbbbbbbbbb',block);

      $.ajax({
        url: url_link,
        dataType: 'text',
        data: {
          'is_blocked':block,
        },
        success: function(data){
          // console.log('success');
          // $(this).remove();
          $('#block_user').remove();
          $('#unblock_block_user').append(user_unblock_html);
          $("#unblock_user").attr('title', 'User is blocked click here to unblock User');

        }
      });
    }
    else{
      console.log('eeeeeeeeeeee');
    }
  });
// });
function unblock() {
  // console.log("unblock fun");
  var res = confirm('are you sure you want to Unblock user?')
  // console.log('res---->',res);
  if (res){
    var url_link = $('.user_unblock').attr("data-url");
    // console.log('url_link-->',url_link);
    var user_block = `<button type="button" id="block_user" data-url = "` + url_link + `" class="btn btn-primary  text-center waves-effect text-center user_block" onclick="block()">Block </button>`;
    // console.log(m_block);
    var block = "{{ is_blocked }}"
    // console.log(block);
    $.ajax({
      url: url_link,
      dataType: 'text',
      data: {
        'is_blocked':block,
      },
      success: function(data){
        // console.log('success')
        // $(this).remove();
        $('#unblock_user').remove();
        $('#unblock_block_user').append(user_block);
        $("#block_user").attr('title', 'User is Unblocked click here to block User');

      }
    });
  }
  else{
    // console.log('eeeeeeeeeeee')
  }
};

