;(function($) {
  
  var validarCpf = function(text) {
    text = text.replace(/\D/g, '');

    if (text.length === 11) {
      var digitos = [];

      for(var pos = 0; pos < text.length; pos++) {
        digitos[pos] = text.charCodeAt(pos) - 48;
      }

      // primeiro digito.
      var soma = 0;

      for(var pos = 0; pos < 9; pos++) {
        soma += digitos[pos] * (10 - pos);
      }

      var primeiroDigito = 11 - (soma % 11);

      if (primeiroDigito > 9) {
        primeiroDigito = 0;
      }

      if (digitos[9] !== primeiroDigito) {
        return false;
      }

      // segundo digito
      soma = 0;

      for(var pos = 0; pos < 10; pos++) {
        soma += digitos[pos] * (11 - pos);
      }
      
      var segundoDigito = 11 - (soma % 11);

      if (segundoDigito > 9) {
        segundoDigito = 0;
      }

      return digitos[10] === segundoDigito;
    }

    return false;
  }

  $.fn.validador = function(options) {
    var init = function() {

      var element = $(this),
          settings = $.extend({
            "function": validarCpf
          }, options),
          isValid = function(text) {
            return settings["function"](text);
          };

      var onElementBlur = function() {
        var texto = element.val();

        if (isValid(texto)) {
          element.removeClass("erro");
          element.addClass("valido");
        } else {
          element.removeClass("valido");
          element.addClass("erro");
        }
      }

      element.on("blur.validador", onElementBlur);
    }

    return this.each(init);
  };
})(jQuery);
