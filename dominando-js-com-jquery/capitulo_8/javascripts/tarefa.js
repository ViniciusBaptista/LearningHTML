$(function() {
  var meu_login = "vinicius",
      server = 'http://livro-capitulo07.herokuapp.com',
      $lastClicked;
 
  function updateTarefa(text, id) {
    $.post(server + "/tarefa", {tarefa_id: id, texto: text});
  }

  function newTarefa(text, $div) {
    $.post(server + "/tarefa", 
      {usuario: meu_login, 
        texto: text, 
        _method: "PUT"})
      .done(function(data) {
        $div.text(data.id);
      });
  }

  function onTarefaDeleteClick() {
    
    $(this).parent(".tarefa-item")
    .off('click')
    .hide('slow', function() {
      $this = $(this);
      
      $.post(server + "/tarefa", 
        {usuario: meu_login, 
          tarefa_id: $this.children(".tarefa-id").text(), 
          _method: "DELETE"});

      $(this).remove();
    });
  }

  function addTarefa(text, id) {
    id = id || 0;

    var $tarefa = $("<div />")
                  .addClass("tarefa-item")
                  .append($("<div />")
                    .addClass("tarefa-id")
                    .text(id))
                  .append($("<div />")
                    .addClass("tarefa-text")
                    .text(text))
                  .append($("<div />")
                    .addClass("tarefa-delete"))
                  .append($("<div />")
                    .addClass("clear"));

    $("#tarefa-list").append($tarefa);
    $(".tarefa-delete").click(onTarefaDeleteClick);
    $(".tarefa-item").click(onTarefaItemClick);

    if (id === 0) {
      var div = $($tarefa.children(".tarefa-id"));
      console.log('id', div);
      newTarefa(text, $(div));
    }
  }

  function onTarefaKeydown(event) {
    if (event.which === 13) {
      addTarefa($("#tarefa").val());
      $("#tarefa").val("");
    }
  }

  function onTarefaEditKeydown(event) {
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

      var text = $lastClicked.children('.tarefa-text').text(),
          id = $lastClicked.children('.tarefa-id').text(),
          content = "<div class='tarefa-id'>" + id + "</div>" +
        "<input type='text' class='tarefa-edit' value='" + 
        text + "'>";

      $lastClicked.html(content);

      $(".tarefa-edit").keydown(onTarefaEditKeydown);
    } 
  }

  function savePendingEdition($tarefa) {
    var text = $tarefa.children('.tarefa-edit').val(),
        id = $tarefa.children('.tarefa-id').text();

    $tarefa.empty();
    $tarefa.append($("<div />")
        .addClass("tarefa-id")
        .text(id))
      .append($("<div />")
        .addClass("tarefa-text")
        .text(text))
      .append($("<div />")
        .addClass("tarefa-delete"))
      .append($("<div />")
        .addClass("clear"));

    updateTarefa(text, id);
    $(".tarefa-delete").click(onTarefaDeleteClick);
    $tarefa.click(onTarefaItemClick);
  }

  function loadTarefas() {
    $("#tarefa").empty();

    $.getJSON(server + "/tarefas", {usuario: meu_login})
      .done(function(data) {
        for(var tarefa = 0; tarefa < data.length; tarefa++) {
          addTarefa(data[tarefa].texto, data[tarefa].id);
        }
      });
  }

  $(".tarefa-delete").click(onTarefaDeleteClick);
  $(".tarefa-item").click(onTarefaItemClick);
  $("#tarefa").keydown(onTarefaKeydown);
  loadTarefas();
});