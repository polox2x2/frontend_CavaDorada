import { jsPDF } from "jspdf";

const GenerarPDF = ({ clientData, cartData }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Agregar título
    doc.setFontSize(20);
    doc.text("Factura de Compra", 20, 20);

    // Información del cliente
    doc.setFontSize(12);
    doc.text(`Nombre: ${clientData.nombre} ${clientData.apellido}`, 20, 30);
    doc.text(`Dirección: ${clientData.direccion}`, 20, 40);
    doc.text(`Teléfono: ${clientData.telefono}`, 20, 50);
    doc.text(`Correo: ${clientData.email}`, 20, 60);
    doc.text(`Cédula: ${clientData.documentoIdentidad}`, 20, 70);

    // Detalles de la compra
    let yOffset = 80;
    cartData.forEach((item, index) => {
      doc.text(`${item.nombre} - ${item.cantidad} x S/. ${item.precios}`, 20, yOffset);
      yOffset += 10;
    });

    // Total
    const total = cartData.reduce((sum, item) => sum + item.precios * item.cantidad, 0);
    doc.text(`Total: S/. ${total}`, 20, yOffset);

    // Generar y descargar el PDF
    doc.save("compra.pdf");
  };

  return (
    <div>
      <button onClick={generatePDF}>Generar PDF</button>
    </div>
  );
};

// Asegúrate de exportar el componente como export default
export default GenerarPDF;
