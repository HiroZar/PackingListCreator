$(document).ready(function () {
    const filePath = '/Public/db/productos.csv';
    $.ajax({
        type: "GET",
        url: filePath,
        dataType: "text",
        success: function (data) {
            const rows = data.split('\n');
            rows.forEach(row => {
                const columns = row.split(',');
                console.log(columns);
            });
        },
        error: function (error) {
            console.error("Error al cargar el archivo CSV:", error);
        }
    });
});
