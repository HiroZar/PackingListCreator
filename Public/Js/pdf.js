
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
    irArriba();
    html2pdf(elemento, opciones)
        .then(() => {
            mostrarSuccess('Packing List generado exitosamente.');
        })
        .catch((error) => {
            mostrarError('Error al general el PDF.')
        });
 }
 
function exportarBPDF() {
    // Seleccionar el elemento que quieres convertir a PDF
    const elemento = document.querySelector('.exportar');
 
    // Opciones de configuración para la conversión
    const opciones = {
        margin: 10,
        filename: 'PackingList',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 3 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
 
    // Usar html2pdf para generar el PDF
    irArriba();
    html2pdf(elemento, opciones)
        .then(() => {
            mostrarSuccess('Boleta de pago generada exitosamente.');
        })
        .catch((error) => {
            mostrarError('Error al general la boleta.')
        });
 }