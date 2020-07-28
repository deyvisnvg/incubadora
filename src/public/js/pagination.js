setInterval(() => {
    $(function () {
        $('.current').each(function (indice, valor) {
            $(`.current:eq(${indice})`).css({ "color": "white", "background": "#0c0cd0" });
        });
    })
}, 300);