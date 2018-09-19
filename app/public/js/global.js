$("option").each(function() {
    $(this).text($(this).text().charAt(0).toUpperCase() + $(this).text().slice(1));
});

$('#preco').maskMoney({prefix:'R$ ', allowNegative: true, thousands:',', decimal:'.', affixesStay: false})

$('#valor').maskMoney({prefix:'R$ ', allowNegative: true, thousands:',', decimal:'.', affixesStay: false})

$("#data" ).datepicker({
    changeMonth: true,
    changeYear: true,
    dateFormat: 'dd/mm/yy',
    dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'],
    dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
    dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
    monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
});