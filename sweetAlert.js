// alerta del boton comprar 
$('.comprar').click(function () {
    Swal.fire({
        title: "Listo!",
        text: "Tu compra ha sido realizada",
        icon: 'success'
    });
    { localStorage.clear(); }
});