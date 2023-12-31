function buscarProducto() {
    const productId = $('#productId').val();

    // Realizar la solicitud AJAX para cargar el contenido del archivo CSV
    $.ajax({
        type: "GET",
        url: 'PackingListCreator/Public/db/productos.csv',  // Reemplaza 'productos.csv' con el nombre real de tu archivo CSV
        dataType: "text",
        success: function (data) {
            const rows = data.split('\n');
            const productTableBody = $('#productTable tbody');
            productTableBody.empty();  // Limpiar la tabla antes de agregar nuevas filas

            // Procesar cada fila del CSV
            rows.forEach(row => {
                const columns = row.split(',');
                const codigo = columns[0];
                const descripcion = columns[1];
                const peso = columns[2];
                // Agregar a la tabla solo si el ID coincide
                if (codigo === productId) {
                    const newRow = `<tr><td>${codigo}</td><td>${descripcion}</td><td>${peso}</td></tr>`;
                    productTableBody.append(newRow);
                }
            });
        },
        error: function (error) {
            console.error("Error al cargar el archivo CSV:", error);
        }
    });
}