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
function sumacantidad() {
    const celdasCantidad = document.querySelectorAll('#productTable .cantidad');
    let sumaCantidades = 0;
    celdasCantidad.forEach((celda) => {
        const cantidad = parseInt(celda.textContent, 10) || 0; // Convertir el texto a número, o usar 0 si no se puede convertir
        sumaCantidades += cantidad;
      }); 
    const elementoSuma = document.getElementById('cuentabultos');
    elementoSuma.textContent = sumaCantidades.toString().padStart(4, '0');
}
function sumaPesoBruto() {
    const celdasPesos = document.querySelectorAll('#productTable .pesobruto');
    let sumaPesos = 0;
    celdasPesos.forEach((celda) => {
        const Pesos = parseInt(celda.textContent, 10) || 0; // Convertir el texto a número, o usar 0 si no se puede convertir
        sumaPesos += Pesos;
      }); 
    const elementoPesos = document.getElementById('cuentapesos');
    elementoPesos.textContent = sumaPesos.toString().padStart(4, '0');
}