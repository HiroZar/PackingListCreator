
function exportarAPDF() {
    // Seleccionar el elemento que quieres convertir a PDF
    const elemento = document.querySelector('.exportar');
 
    // Opciones de configuración para la conversión
    const opciones = {
        margin: 10,
        filename: 'PackingList',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 3 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };
 
    // Usar html2pdf para generar el PDF
    html2pdf(elemento, opciones)
        .then(() => {
            console.log("PDF generado exitosamente");
        })
        .catch((error) => {
            console.error("Error al generar el PDF:", error);
        });
 }