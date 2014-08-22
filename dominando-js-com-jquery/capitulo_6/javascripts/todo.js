$(function() {
  var $lastClicked;

  function onTarefaDeleteClick() {
    
    $(this).parent(".tarefa-item")
    .off('click')
    .hide('slow', function() {
      $(this).remove();
    });
  }

  function addTarefa(text) {
    var $tarefa = $("<div />")
                  .addClass("tarefa-item")
                  .append($("<div />")
                    .addClass("tarefa-texto")
                    .text(text))
                  .append($("<div />")
                    .addClass("tarefa-delete"))
                  .append($("<div />")
                    .addClass("clear"));

    $("#tarefa-list").append($tarefa);

    $(".tarefa-delete").click(onTarefaDeleteClick);

    $(".tarefa-item").click(onTarefaItemClick);
  }

  function onTarefaKeydown(event) {
    if (event.which === 13) {
      addTarefa($("#tarefa").val());
      $("#tarefa").val("");
    }
  }

  function onTarefaEditKeyDown(event) {
    if (event.which === 13) {
      savePendingEdition($lastClicked);
      $lastClicked = undefined;
    }
  }

  function onTarefaItemClick() {

    if (!$(this).is($lastClicked)) {
      if ($lastClicked !== undefined) {
        savePendingEdition($lastClicked);
      }
      $lastClicked = $(this);

      var text = $(this).children('.tarefa-texto').text(),
          html = "<input type='text' " +
                 "class='tarefa-edit' value=' " +
                 text + "'>"

      $lastClicked.html(html);

      $(".tarefa-edit").keydown(onTarefaEditKeyDown);
    } 
  }

  function savePendingEdition($tarefa) {
    var text = $tarefa.children('.tarefa-edit').val();
    $tarefa.empty();
    $tarefa.append($("<div />")
        .addClass("tarefa-texto")
        .text(text))
      .append($("<div />")
        .addClass("tarefa-delete"))
      .append($("<div />")
        .addClass("clear"));

    $(".tarefa-delete").click(onTarefaDeleteClick);
    $tarefa.click(onTarefaItemClick);
  }

  $(".tarefa-delete").click(onTarefaDeleteClick);
  $(".tarefa-item").click(onTarefaItemClick);
  $("#tarefa").keydown(onTarefaKeydown);
});