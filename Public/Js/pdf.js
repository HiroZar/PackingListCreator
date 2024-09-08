
function exportarAPDF() {
    const elemento = document.querySelector('.exportar');
    const opciones = {
        margin: 10,
        filename: 'PackingList',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 3 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };
 
    irArriba();
    html2pdf(elemento, opciones)
        .then(() => {
            mostrarSuccess('Packing List generado exitosamente.');
        })
        .catch((error) => {
            mostrarError('Error al general el PDF.')
        });
 }
 
