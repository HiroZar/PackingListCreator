$(document).ready(function () {
    // Ruta del archivo CSV
    const filePath = '/Public/db/productos.csv';

    // Realizar la solicitud AJAX para cargar el contenido del archivo CSV
    $.ajax({
        type: "GET",
        url: filePath,
        dataType: "text",
        success: function (data) {
            const rows = data.split('\n');

            // Procesar cada fila del CSV
            rows.forEach(row => {
                const columns = row.split(',');
                console.log(columns);
                // Puedes hacer algo con cada columna, por ejemplo:
                // columns.forEach(column => console.log(column));
            });
        },
        error: function (error) {
            console.error("Error al cargar el archivo CSV:", error);
        }
    });
});