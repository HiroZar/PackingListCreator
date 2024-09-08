$('#productId').on('input', function() {
    this.value = this.value.toUpperCase();
    let descripcionEncontrada = '';
    const productId = $('#productId').val();
    $.ajax({
        type: "GET",
        url: 'Public/db/productos.csv',
        dataType: "text",
        success: function (data) {
            const rows = data.split('\n');
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
$('#boletaSenor').on('input', function(){
    const boletaSenor = $('#boletaSenor').val();
    const senor = document.getElementById('DatoSenor');
    senor.textContent = boletaSenor.toString();
});
$('#boletaDireccion').on('input', function(){
    const boletaDireccion = $('#boletaDireccion').val();
    const Direccion = document.getElementById('DatoDireccion');
    Direccion.textContent = boletaDireccion.toString();
});
$('#boletaRUT').on('input', function(){
    const boletaRUT = $('#boletaRUT').val();
    const RUT = document.getElementById('DatoRUT');
    RUT.textContent = boletaRUT.toString();
});
$('#boletaNumero').on('input', function() {
    const boletaNumero = parseFloat($('#boletaNumero').val()); 
    const Numero = document.getElementById('DatoNumero');

   
    if (!isNaN(boletaNumero)) {
        const numeroFormateado = boletaNumero.toString();
        const numeroConCeros = numeroFormateado.padStart(6, '0'); 
        Numero.textContent = numeroConCeros;
    } else {
       
        console.error('El valor ingresado no es un número válido.');
    }
});


$('#boletaFecha').on('input', function(){
    var fechaSeleccionada = new Date($('#boletaFecha').val()+ 'T00:00:00-05:00');
    var fechaFormateada = fechaSeleccionada.toLocaleDateString('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });



    const Fecha = document.getElementById('DatoFecha');
    Fecha.textContent = fechaFormateada .toString();
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
    }, 500); 
  }
  

function sumacantidad() {
    const celdasCantidad = document.querySelectorAll('#productTable .cantidad');
    let sumaCantidades = 0;
    celdasCantidad.forEach((celda) => {
        const cantidad = parseInt(celda.textContent, 10) || 0; 
        sumaCantidades += cantidad;
      }); 
    const elementoSuma = document.getElementById('cuentabultos');
    elementoSuma.textContent = sumaCantidades.toString();
}

function verificarCodigoExistente(productId) {
    const filas = document.querySelectorAll('#productTable tbody tr');
    for (let i = 0; i < filas.length; i++) {
        const codigoEnFila = filas[i].cells[2].textContent.trim();

        if (codigoEnFila === productId) {
            return true;
        }
    }

    return false;
}
function sumaPesoBruto() {
    const celdasPesos = document.querySelectorAll('#productTable .pesobruto');
    let sumaPesos = 0;

    celdasPesos.forEach((celda) => {
        const peso = parseFloat(celda.textContent) || 0;
        sumaPesos += peso;
    });

    const sumaPesosFormateada = sumaPesos.toFixed(2);
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
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
var checkbox = document.getElementById("default-checkbox2");

checkbox.addEventListener("change", function() {
    if (checkbox.checked) {
      mostrarSello()
    } else {
      ocultarSello()
    }
  });

  function bajar() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }

  function mostrarSello() {
    const Isello = document.getElementById('imgSello');
    Isello.classList.remove('hidden');
  }
  
  function ocultarSello() {
    const Isello = document.getElementById('imgSello');
      Isello.classList.add('hidden');
  }

  function handleChange(radioButton) {
    var selectedValue = radioButton.value;
    const ck1 = document.getElementById('chkE');
    const ck2 = document.getElementById('chkC');
    const ck3 = document.getElementById('chkT');
    if (selectedValue == 0) {
        ck1.classList.add('hidden');
        ck2.classList.add('hidden');
        ck3.classList.add('hidden');
    }
    if (selectedValue == 1) {
        ck1.classList.remove('hidden');
        ck2.classList.add('hidden');
        ck3.classList.add('hidden');
    }
    if (selectedValue == 2) {
        ck1.classList.add('hidden');
        ck2.classList.remove('hidden');
        ck3.classList.add('hidden');
    }
    if (selectedValue == 3) {
        ck1.classList.add('hidden');
        ck2.classList.add('hidden');
        ck3.classList.remove('hidden');
    }
    
  }
  function nuevoPago(opcion) {
    if (opcion == 1) {
        const NuevoProd =  document.getElementById('addPago');
    NuevoProd.classList.remove('hidden');
    const bOperaciones =  document.getElementById('BotonOperaciones');
    bOperaciones.classList.add('hidden');
    } else {
        const NuevoProd =  document.getElementById('addPago');
    NuevoProd.classList.add('hidden');
    const bOperaciones =  document.getElementById('BotonOperaciones');
    bOperaciones.classList.remove('hidden');
    }
  }
  function botonesOperaciones(opcion){
    if (opcion == 1) {
        const NuevoProd =  document.getElementById('BotonOperaciones');
    NuevoProd.classList.remove('hidden');
    const bOperaciones =  document.getElementById('cabeceraFactura');
    bOperaciones.classList.add('hidden');
    } else {
        const NuevoProd =  document.getElementById('BotonOperaciones');
    NuevoProd.classList.add('hidden');
    const bOperaciones =  document.getElementById('cabeceraFactura');
    bOperaciones.classList.remove('hidden');
    }
  }
  function nuevoBoleta(opcion){
    if (opcion == 1) {
        const NuevoProd =  document.getElementById('cabeceraFactura');
    NuevoProd.classList.remove('hidden');
    const bOperaciones =  document.getElementById('BotonesInicio');
    bOperaciones.classList.add('hidden');
    } else {
        const NuevoProd =  document.getElementById('cabeceraFactura');
    NuevoProd.classList.add('hidden');
    const bOperaciones =  document.getElementById('BotonesInicio');
    bOperaciones.classList.remove('hidden');
    }
  }
  function nuevoProducto(opcion) {
    if (opcion == 1) {
        const NuevoProd =  document.getElementById('addProducto');
    NuevoProd.classList.remove('hidden');
    const bOperaciones =  document.getElementById('BotonOperaciones');
    bOperaciones.classList.add('hidden');
    } else {
        const NuevoProd =  document.getElementById('addProducto');
    NuevoProd.classList.add('hidden');
    const bOperaciones =  document.getElementById('BotonOperaciones');
    bOperaciones.classList.remove('hidden');
    }
    
    
  }
