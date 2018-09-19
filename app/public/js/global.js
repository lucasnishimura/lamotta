$("option").each(function() {
    $(this).text($(this).text().charAt(0).toUpperCase() + $(this).text().slice(1));
});