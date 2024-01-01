function buscarProducto() {
    const productId = $('#productId').val();
    const productCant = $('#productCantidad').val();
    let item = 0;
    var radios = document.getElementsByName('list-radio');
    var valorSeleccionado = '';

    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            valorSeleccionado = radios[i].value;
            break; // Salir del bucle una vez que se encuentre el valor seleccionado
        }
    }

    // Realizar la solicitud AJAX para cargar el contenido del archivo CSV  
    $.ajax({
        type: "GET",
        url: 'Public/db/productos.csv',  // Reemplaza 'productos.csv' con el nombre real de tu archivo CSV
        dataType: "text",
        success: function (data) {
            const rows = data.split('\n');
            const productTableBody = $('#productTable tbody');
            // productTableBody.empty();  // Limpiar la tabla antes de agregar nuevas filas

            // Procesar cada fila del CSV
            
            rows.forEach(row => {
                
                const columns = row.split(',');
                const codigo = columns[0];
                const descripcion = columns[1];
                const peso = columns[2];
                const um = columns[3];


                // Agregar a la tabla solo si el ID coincide
                const pesobruto = (peso*productCant).toFixed(2);


                if (codigo === productId) {
                    item ++;
                    const newRow = `<tr class="${valorSeleccionado}"><td class="border-2 border-black">${productTableBody.find('tr').length + 1}</td><td class="border-2 border-black cantidad">${productCant}</td><td class="border-2 border-black">${codigo}</td><td class="border-2 border-black">${descripcion}</td><td class="border-2 border-black">${um}</td><td class="border-2 border-black">${peso}</td><td class="border-2 border-black pesobruto">${pesobruto}</td></tr>`;
                    productTableBody.append(newRow);
                    sumacantidad();
                    sumaPesoBruto() 
                }
            });
        },
        error: function (error) {
            console.error("Error al cargar el archivo CSV:", error);
        }
    });
    
}