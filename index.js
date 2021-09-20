window.onload = function () {
    total = 0;

    // CARRITO
    const cajaCarrito = document.querySelector('.cajaCarrito');

    // abrir carrito 
    $('.iconCarrito').on('click', function () {
        cajaCarrito.classList.add('active');
    });

    // cerrar carrito 
    $('.fa-close').on('click', function () {
        cajaCarrito.classList.remove('active');
    });

    // agregar mensaje de principio 
    $(".servicios").prepend("<h2> Seleccione los servicios que desea comprar: </h2>");

    // LOCAL STORAGE 
    const agrCarritoBtn = document.getElementsByClassName('agrCarrito');
    let items = [];

    for (let i = 0; i < agrCarritoBtn.length; i++) {

        agrCarritoBtn[i].addEventListener("click", function (e) {
            if (typeof (Storage) !== 'undefined') {
                let item = {
                    id: i + 1,
                    nombre: e.target.parentElement.children[0].textContent,
                    precio: e.target.parentElement.children[1].children[0].textContent,
                    num: 1,
                    precioTotal: total
                };
                if (JSON.parse(localStorage.getItem('items')) === null) {
                    items.push(item);
                    localStorage.setItem("items", JSON.stringify(items));
                    window.location.reload();
                } else {
                    const localItems = JSON.parse(localStorage.getItem("items"));
                    localItems.map(data => {
                        if (item.id == data.id) {
                            item.num = data.num + 1;
                        } else {
                            items.push(data);
                        }
                    });
                    items.push(item);
                    localStorage.setItem('items', JSON.stringify(items))
                    window.location.reload();
                }
            } else {
                console.log('NO FUNCIONA');
            }
        });
    }

    // agregar al carrito 
    const iconCarritoP = document.querySelector('.iconCarrito p');
    let num = 0;
    JSON.parse(localStorage.getItem('items')).map(data => {
        num = num + data.num;
    });

    iconCarritoP.innerHTML = num;

    // agregar al carrito (tabla) 
    const cajaCarritoTabla = cajaCarrito.querySelector('table');
    let datosTabla = '';
    datosTabla += '<tr><th class="tituloTabla">Id</th><th class="tituloTabla">Nombre</th><th class="tituloTabla">Cantidad</th><th class="tituloTabla">Precio</th><th class="tituloTabla"></th></tr>';
    if (JSON.parse(localStorage.getItem('items'))[0] == null) {
        datosTabla += `<p> No agregó ningún item </p>`;
    } else {
        JSON.parse(localStorage.getItem('items')).map(data => {
            datosTabla += `<tr><th>` + data.id + `</th><th>` + data.nombre + `</th><th>` + data.num + `</th><th>$` + (data.precio * data.num) + `</th><th class="btnEliminar"><a href="#" onclick=eliminar(this);>Eliminar</a></th></tr>`;
            // mostrar 
            precio = parseInt(data.precio) * parseInt(data.num);
            total = total + precio;
            console.log(total);
        });
    }
    let cajaMostrarTotal = document.getElementById("total");

    // mostrar tabla y total carrito  
    cajaMostrarTotal.textContent = "$" + total;
    cajaCarritoTabla.innerHTML = datosTabla;
}

// eliminar items del carrito 
function eliminar(e) {
    let items = [];
    JSON.parse(localStorage.getItem('items')).map(data => {
        if (data.id != e.parentElement.parentElement.children[0].textContent) {
            items.push(data);
        }
    });
    localStorage.setItem('items', JSON.stringify(items));
    window.location.reload();
};

// ANIMACIONES 
$("#contenedorAbajo").hide();
$("#ocultar").hide();

// mostrar caja 
$('#mostrar').click(function () {
    $('#contenedorAbajo').css("background-color", "black")
        .slideDown(1000)
    $("#ocultar").fadeIn(1000);
});

// cerrar caja 
$('#ocultar').click(function () {
    $('#contenedorAbajo')
        .slideUp(1000)
    $("#ocultar").fadeOut(1000);
});

// animacion concatenada 
$(".contenidoverMas").hide();

$('#verMas').click(function () {
    $('.contenidoverMas')
        .slideDown(1000)
        .delay(3000)
        .slideUp(1000);
});

// galeria (slider)
$(document).ready(function () {
    var x = 0;
    // cambiar img 
    $('.btn-next').click(function () {

        x = (x <= 300) ? (x + 100) : 0;
        $('figure').css('left', -x + '%');
    });

    // ir atras 
    $('.btn-prev').click(function () {

        x = (x >= 100) ? (x - 100) : 400;
        $('figure').css('left', -x + '%');
    });
});


// nombre y apellido 
$("#form").submit(function (e) {
    e.preventDefault();
    let inicioSesion = $(e.target).children();

    localStorage.setItem('Nombre', JSON.stringify(inicioSesion[1].value));
    localStorage.setItem('Apellido', JSON.stringify(inicioSesion[3].value));

    nombre = inicioSesion[1].value;
    apellido = inicioSesion[4].value;

    $(".sectionSesion").slideToggle();
    $("<p class='usuario'>Nombre: " + nombre + " " + apellido + "</p>").insertAfter(".comprar");
});
