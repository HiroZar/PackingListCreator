function buscarProducto() {
    const productId = $('#productId').val();
    const productCant = $('#productCantidad').val();
    const productDetalle = $('#productDetalle').val();
    const codigoExistente = verificarCodigoExistente(productId);
    let item = 0;
    var radios = document.getElementsByName('list-radio');
    var valorSeleccionado = '';

    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            valorSeleccionado = radios[i].value;
            break;
        }
    }
    if (productId.trim() !== ''){
        if (productDetalle.trim() !== '') {
            if (productCant.trim() !== ''){
                if (!codigoExistente) {
                                  
                $.ajax({
                    type: "GET",
                    url: 'Public/db/productos.csv',  
                    dataType: "text",
                    success: function (data) {
                        const rows = data.split('\n');
                        const productTableBody = $('#productTable tbody');
            
                        rows.forEach(row => {
                            
                            const columns = row.split(',');
                            const codigo = columns[0];
                            const descripcion = columns[1];
                            const peso = columns[2];
                            const um = columns[3];
                            const pesobruto = (peso*productCant).toFixed(2);
            
            
                            if (codigo === productId) {
                                item ++;
                                const newRow = `<tr class="${valorSeleccionado}"><td class="border-2 border-black">${productTableBody.find('tr').length + 1}</td><td class="border-2 border-black cantidad editable">${productCant}</td><td class="border-2 border-black">${codigo}</td><td class="border-2 border-black">${descripcion}</td><td class="border-2 border-black">${um}</td><td class="border-2 border-black">${peso}</td><td class="border-2 border-black pesobruto">${pesobruto}</td></tr>`;
                                productTableBody.append(newRow);
                                sumacantidad();
                                sumaPesoBruto();
                                mostrarSuccess('Producto agregado exitosamente');
                                $('#productId').val('');
                                $('#productCantidad').val('');
                                $('#productDetalle').val('');
                            }
                        });
                    },
                    error: function (error) {
                        mostrarError('Error al leer los productos.');
                    }
                }); 
                } else {
                    mostrarAdvertencia('El producto ya está en la tabla');
                }

            }
            else{
                
                mostrarAdvertencia('Debe agregar la cantidad');
            }
        }   
        else {
            mostrarError('Producto no encontrado');
        }
    }
    else{
        mostrarAdvertencia('Debe agregar el código del producto');
    }
    $('#productId').focus();
}
function eliminarUltimaFila() {
    var miTabla = document.getElementById("productTable");

    if (miTabla.rows.length > 1) {
      miTabla.deleteRow(-1);
      sumacantidad();
      sumaPesoBruto();
      mostrarSuccess('Producto eliminado exitosamente');
      $('#productId').focus();
    } else {
        mostrarError('No hay filas para eliminar.');
    }
  }
  let contadorItems = 0;

function buscarProductoBoleta() {
    const productId = $('#productId').val();
    const productCant = $('#productCantidad').val();
    const productDetalle = $('#productDetalle').val();

    var fechaSeleccionada = new Date($('#boletaFecha2').val()+ 'T00:00:00-05:00');
    var fechaFormateada = fechaSeleccionada.toLocaleDateString('es-PE', {
        day: '2-digit',
        month: 'short'
      });
    
    const productPrec = $('#productPrecio').val();
    const codigoExist = verificarCodigoExistente(productId);
    var tabla = document.getElementById("productTables").getElementsByTagName('tbody')[0];
    var filas = tabla.getElementsByTagName("tr");

    if (productId.trim() !== ''){
        if (productDetalle.trim() !== '') {
            if (productCant.trim() !== ''){
                if (!codigoExist) {
                $.ajax({
                    type: "GET",
                    url: 'Public/db/productos.csv', 
                    dataType: "text",
                    success: function (data) {
                        const rows = data.split('\n');
                        const productTableBody = $('#productTables tbody');
                        
                        rows.forEach(row => {
                            const columns = row.split(',');
                            const codigo = columns[0];
                            const descripcion = columns[1];
                        
                            if (codigo === productId) {
                                for (var i = 0; i < filas.length; i++) {
                                    var celdas = filas[i].getElementsByTagName("td");
                                    var todasCeldasVacias = Array.from(celdas).every(function(celda) {
                                        return celda.textContent.trim() === "";
                                    });
                        
                                    if (todasCeldasVacias) {
                                        celdas[0].textContent = contadorItems;
                                        celdas[1].textContent = productCant;
                                        celdas[2].textContent = fechaFormateada.toString();
                                        celdas[3].textContent = descripcion;
                                        let divContenedorFlex = document.createElement('div');
                                        divContenedorFlex.style.display = 'flex';
                                        divContenedorFlex.style.justifyContent = 'space-between';
                                        let divSimboloDolar4 = document.createElement('div');
                                        divSimboloDolar4.textContent = '$';

                                        let divValorNumerico4 = document.createElement('div');
                                        divValorNumerico4.textContent = parseFloat(productPrec).toFixed(3);
                                        divValorNumerico4.classList.add('pPrecioU'); 

                                        divContenedorFlex.appendChild(divSimboloDolar4);
                                        divContenedorFlex.appendChild(divValorNumerico4);

                                        celdas[4].innerHTML = '';
                                        celdas[4].appendChild(divContenedorFlex);

                                        let divContenedorFlex2 = document.createElement('div');
                                        divContenedorFlex2.style.display = 'flex';
                                        divContenedorFlex2.style.justifyContent = 'space-between';
                        
                                        let divSimboloDolar5 = document.createElement('div');
                                        divSimboloDolar5.textContent = '$';
                        
                                        let divValorNumerico5 = document.createElement('div');
                                        divValorNumerico5.textContent = (productPrec * productCant).toFixed(3);
                                        divValorNumerico5.classList.add('pPrecioT'); 

                                        divContenedorFlex2.appendChild(divSimboloDolar5);
                                        divContenedorFlex2.appendChild(divValorNumerico5);

                                        celdas[5].innerHTML = '';
                                        celdas[5].appendChild(divContenedorFlex2);
                                        return;
                                    }
                                }
                        
                                
                                mostrarSuccess('Producto agregado exitosamente');
                                $('#productId').val('');
                                $('#productCantidad').val('');
                                $('#productDetalle').val('');
                            }
                        });
                        
                    },
                    error: function (error) {
                        mostrarError('Error al leer los productos.');
                    }
                }); 
                } else {
                    mostrarAdvertencia('El producto ya está en la tabla');
                }

            }
            else{
                
                mostrarAdvertencia('Debe agregar la cantidad');
            }
        }   
        else {
            mostrarError('Producto no encontrado');
        }
    }
    else{
        mostrarAdvertencia('Debe agregar el código del producto');
    }
    contadorItems++;
    $('#productId').focus();
}


function addPago() {
    const bolTipo = $('#boletaTipoPago').val();
    const bolMonto = $('#boletaMonto').val();
    var fechaSeleccionada = new Date($('#boletaFecha3').val()+ 'T00:00:00-05:00');
    var fechaFormateada = fechaSeleccionada.toLocaleDateString('es-PE', {
        day: '2-digit',
        month: 'short'
      });
    var tabla = document.getElementById("productTables").getElementsByTagName('tbody')[0];
    var filas = tabla.getElementsByTagName("tr");


        if (bolMonto.trim() !== '') {
                for (var i = 0; i < filas.length; i++) {
                    var celdas = filas[i].getElementsByTagName("td");
                    var todasCeldasVacias = Array.from(celdas).every(function(celda) {
                        return celda.textContent.trim() === "";});
        
                    if (todasCeldasVacias) {
                        celdas[0].textContent = '';
                        celdas[1].textContent = '';
                        celdas[2].textContent = fechaFormateada.toString();
                        celdas[2].style.color = 'red';
                        celdas[3].textContent = bolTipo;
                        celdas[3].style.color = 'red';
                        celdas[4].textContent = '-';
                        celdas[4].style.color = 'red';

                        let divContenedorFlex2 = document.createElement('div');
                        divContenedorFlex2.style.display = 'flex';
                        divContenedorFlex2.style.justifyContent = 'space-between';
                        divContenedorFlex2.classList.add('text-red-400');

                        let divSimboloDolar5 = document.createElement('div');
                        divSimboloDolar5.textContent = '$';
        
                        let divValorNumerico5 = document.createElement('div');
                        divValorNumerico5.textContent = parseFloat(bolMonto).toFixed(3);
                        divValorNumerico5.classList.add('pPago'); 

                        divContenedorFlex2.appendChild(divSimboloDolar5);
                        divContenedorFlex2.appendChild(divValorNumerico5);

                        celdas[5].innerHTML = '';
                        celdas[5].appendChild(divContenedorFlex2);
                        return;
                    }
                }
            }
            else{
                mostrarAdvertencia('Debe agregar la cantidad que se pagó.');
            }
    $('#productId').focus();
}

function sumaPreciosProductos() {
    var totalPrecios = 0;
    var totalPagos = 0;
    $('.pPago').each(function() {
        var contenidoDiv = $(this).text();
        totalPagos += parseFloat(contenidoDiv) || 0;
    });
    $('.pPrecioT').each(function() {
        var contenidoDiv = $(this).text();
        totalPrecios += parseFloat(contenidoDiv) || 0; 
    });
    var tabla = document.getElementById("productTables").getElementsByTagName('tbody')[0];
    var filas = tabla.getElementsByTagName("tr");
                for (var i = 0; i < filas.length; i++) {
                    var celdas = filas[i].getElementsByTagName("td");
                    var todasCeldasVacias = Array.from(celdas).every(function(celda) {
                        return celda.textContent.trim() === "";});
        
                    if (todasCeldasVacias) {
                        celdas[0].textContent = '';
                        celdas[1].textContent = '';
                        celdas[2].textContent = '';
                        celdas[3].textContent = '';
                        celdas[3].style.color = '';
                        celdas[4].textContent = 'TOTAL';
                        celdas[4].style.color = 'red';

                        let divContenedorFlex2 = document.createElement('div');
                        divContenedorFlex2.style.display = 'flex';
                        divContenedorFlex2.style.justifyContent = 'space-between';
                        divContenedorFlex2.style.color = 'red';

                        let divSimboloDolar5 = document.createElement('div');
                        divSimboloDolar5.textContent = '$';
        
                        let divValorNumerico5 = document.createElement('div');
                        var diferencia = totalPrecios-totalPagos;
                        
                        divValorNumerico5.textContent = diferencia.toLocaleString('es-ES', {
                            minimumFractionDigits: 3,
                            maximumFractionDigits: 3
                        });
                       divValorNumerico5 = divValorNumerico5.replace(/,/g, '.');

                        divContenedorFlex2.appendChild(divSimboloDolar5);
                        divContenedorFlex2.appendChild(divValorNumerico5);

                        celdas[5].innerHTML = '';
                        celdas[5].appendChild(divContenedorFlex2);
                        return;
                    }
                }
    $('#productId').focus();
}

function calcularSaldos() {
    var totalPagos = 0;
    var totalPrecios = 0;

    $('.pPago').each(function() {
        
        var contenidoDiv = $(this).text();
        totalPagos += parseFloat(contenidoDiv) || 0; 
    });

    $('.pPrecioT').each(function() {
       
        var contenidoDiv = $(this).text();
        totalPrecios += parseFloat(contenidoDiv) || 0; 
    });
    var tabla = document.getElementById("productTables").getElementsByTagName('tbody')[0];
    var filas = tabla.getElementsByTagName("tr");
                for (var i = 0; i < filas.length; i++) {
                    var celdas = filas[i].getElementsByTagName("td");
                    var todasCeldasVacias = Array.from(celdas).every(function(celda) {
                        return celda.textContent.trim() === "";});
        
                    if (todasCeldasVacias) {
                        celdas[0].textContent = '';
                        celdas[1].textContent = '';
                        celdas[2].textContent = '';
                        celdas[3].textContent = '';
                        celdas[3].style.color = '';
                        celdas[4].textContent = 'SALDO';
                        celdas[4].style.color = 'red';

                        let divContenedorFlex2 = document.createElement('div');
                        divContenedorFlex2.style.display = 'flex';
                        divContenedorFlex2.style.justifyContent = 'space-between';
                        divContenedorFlex2.style.color = 'red';

                        let divSimboloDolar5 = document.createElement('div');
                        divSimboloDolar5.textContent = '$';
        
                        let divValorNumerico5 = document.createElement('div');
                        divValorNumerico5.textContent = parseFloat(totalPrecios-totalPagos).toFixed(3);

                        divContenedorFlex2.appendChild(divSimboloDolar5);
                        divContenedorFlex2.appendChild(divValorNumerico5);

                        celdas[5].innerHTML = '';
                        celdas[5].appendChild(divContenedorFlex2);
                        return;
                    }
                }
    $('#productId').focus();
}
