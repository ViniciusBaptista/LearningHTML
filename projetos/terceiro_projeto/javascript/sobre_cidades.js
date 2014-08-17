$(function() {
  $('.article').click(function() {
    $('.article').removeClass('current');
    $('.description').hide();
    
    $(this).addClass('current');
    $(this).children('.description').show();
  });

  $(document).keypress(function(event) {
    if (event.which === 111) {
      $('.current').children('.description').toggle();
    }
  });
});