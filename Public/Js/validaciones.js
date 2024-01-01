$('#productId').on('input', function() {
    let descripcionEncontrada = '';
    const productId = $('#productId').val();
    $.ajax({
        type: "GET",
        url: 'Public/db/productos.csv',  // Reemplaza 'productos.csv' con el nombre real de tu archivo CSV
        dataType: "text",
        success: function (data) {
            const rows = data.split('\n');
            // productTableBody.empty();  // Limpiar la tabla antes de agregar nuevas filas

            // Procesar cada fila del CSV
            
            rows.forEach(row => {
                
                const columns = row.split(',');
                const codigo = columns[0];
                
                if (codigo === productId) {
                    descripcionEncontrada = columns[1];
                    
                }
                
            });
            $('#productDetalle').val(descripcionEncontrada);
        },
        error: function (error) {
            console.error("Error al cargar el archivo CSV:", error);
        }
    });

});
$('#productContenedor').on('input', function(){
    const productId = $('#productContenedor').val();
    const contenedor = document.getElementById('nombreContenedor');
    contenedor.textContent = productId.toString();
});
$('#productPrecinto').on('input', function(){
    const productPrecinto = $('#productPrecinto').val();
    const precinto = document.getElementById('nombrePrecinto');
    precinto.textContent = productPrecinto.toString();
});
$('#productFactura').on('input', function(){
    const productFactura = $('#productFactura').val();
    const Factura = document.getElementById('nombreFactura');
    Factura.textContent = productFactura.toString();
});

function mostrarExtra() {
    const datosExtras = document.getElementById('DatosExtras');
    datosExtras.classList.remove('hidden', 'h-0');
    datosExtras.classList.add('h-auto');
  }
  
  function ocultarExtra() {
    const datosExtras = document.getElementById('DatosExtras');
    datosExtras.classList.remove('h-auto');
    datosExtras.classList.add('h-0');
    setTimeout(() => {
      datosExtras.classList.add('hidden');
    }, 500); // Ajusta el tiempo de espera según la duración de la transición
  }
  

function sumacantidad() {
    const celdasCantidad = document.querySelectorAll('#productTable .cantidad');
    let sumaCantidades = 0;
    celdasCantidad.forEach((celda) => {
        const cantidad = parseInt(celda.textContent, 10) || 0; // Convertir el texto a número, o usar 0 si no se puede convertir
        sumaCantidades += cantidad;
      }); 
    const elementoSuma = document.getElementById('cuentabultos');
    elementoSuma.textContent = sumaCantidades.toString();
}

function verificarCodigoExistente(productId) {
    // Obtener todas las filas de la tabla
    const filas = document.querySelectorAll('#productTable tbody tr');

    // Verificar si el código ya existe en alguna fila
    for (let i = 0; i < filas.length; i++) {
        const codigoEnFila = filas[i].cells[2].textContent.trim(); // Índice 2 para la tercera columna (base 0)

        if (codigoEnFila === productId) {
            return true; // El código ya existe
        }
    }

    return false; // El código no existe
}
function sumaPesoBruto() {
    const celdasPesos = document.querySelectorAll('#productTable .pesobruto');
    let sumaPesos = 0;

    celdasPesos.forEach((celda) => {
        const peso = parseFloat(celda.textContent) || 0; // Convertir el texto a número de punto flotante, o usar 0 si no se puede convertir
        sumaPesos += peso;
    });

    // Formatear la suma con dos decimales
    const sumaPesosFormateada = sumaPesos.toFixed(2);

    // Actualizar el elemento HTML con la suma formateada
    const elementoPesos = document.getElementById('cuentapesos');
    elementoPesos.textContent = sumaPesosFormateada;
}

function mostrarAdvertencia(a) {
    Swal.fire({
        icon: 'warning',
        title: '¡Advertencia!',
        text: a,
            confirmButtonColor: '#1056e3',
    });
}

function mostrarError(a) {
    Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: a,
    });
}
function mostrarSuccess(a) {
    Swal.fire({
        position: "center",
        icon: "success",
        title: a,
        showConfirmButton: false,
        timer: 1500
      });
      
}
function irArriba(){
    document.body.scrollTop = 0; // Para navegadores Safari
    document.documentElement.scrollTop = 0; // Para otros navegadores
}