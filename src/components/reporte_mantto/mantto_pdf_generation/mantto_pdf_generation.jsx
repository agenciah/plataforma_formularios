//pdf generator
import PropTypes from 'prop-types';
import jsPDF from 'jspdf';
import { manttoPdfStyles } from './mantto_pdf_styles';
import background from "../mantto_assets/reporte de mantenimiento base.jpg";
import { Button } from '@mui/material';

function Mantto_PDFGeneration({ title, comments, images }) {
  const getFormattedDate = () => {
    const meses = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const año = fecha.getFullYear();
    return `Mex, Mex, a ${dia} de ${mes} de ${año}`;
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    // Cargar imagen de fondo
    if (background) {
      doc.addImage(
        background,
        'JPEG',
        0,
        0,
        doc.internal.pageSize.getWidth(),
        doc.internal.pageSize.getHeight()
      );
    } else {
      console.error("La imagen de fondo no se ha podido cargar.");
    }

    // Estilo de la fecha
    doc.setFontSize(10); // Ajusta el tamaño de la fuente según necesites
    doc.setTextColor('#000000'); // Color de la fecha
    doc.setFont('helvetica', 'normal'); // Fuente de la fecha
    doc.text(getFormattedDate(), 136.8, 20); // Posición de la fecha (ajusta x e y según tu diseño)


    // Estilo del título
    const titleX = manttoPdfStyles.title.x || 10;
    const titleY = manttoPdfStyles.title.y || 10;
    const maxWidth = 100; // Ajustar ancho máximo del título

    doc.setFontSize(manttoPdfStyles.title.fontSize || 16);
    doc.setFont(manttoPdfStyles.title.fontStyle || 'bold');
    doc.setTextColor(manttoPdfStyles.title.color || '#000000');

    // Dibujar el título y obtener la altura ocupada
    doc.text(
      title || 'Reporte de Mantenimiento',
      titleX,
      titleY,
      { maxWidth }
    );

    const titleHeight = doc.getTextDimensions(
      title || 'Reporte de Mantenimiento',
      { maxWidth }
    ).h;

    let currentY = titleY + titleHeight + 10; // 10 es el margen entre el título y el cuerpo del texto

    // Estilo del cuerpo del mensaje (Comentarios)
    if (comments) {
      doc.setFontSize(manttoPdfStyles.comments.fontSize || 12);
      doc.setFont(manttoPdfStyles.comments.fontStyle || 'normal');
      doc.setTextColor(manttoPdfStyles.comments.color || '#000000');

      doc.text(
        manttoPdfStyles.comments.title || '',
        manttoPdfStyles.comments.x || 10,
        currentY
      );

      currentY += 6;

      doc.text(
        comments,
        manttoPdfStyles.comments.x || 20,
        currentY,
        {
          maxWidth,
        }
      );

      currentY += doc.getTextDimensions(comments, { maxWidth }).h + 10;
    }

    // Añadir imágenes
    if (images && Array.isArray(images)) {
      images.forEach((image, index) => {
        if (image && manttoPdfStyles.images[index]) {
          const { x, y, width, height } = manttoPdfStyles.images[index];
          doc.addImage(image, 'JPEG', x, y, width, height);
        }
      });
    }

    // Guardar el PDF
    doc.save('Reporte.pdf');
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#FF0000',
          '&:hover': {
            backgroundColor: '#D00000', // Un rojo más oscuro al pasar el cursor
          },
        }}
        onClick={handleGeneratePDF}
      >
        Descargar PDF
      </Button>
    </div>
  );
}

// Validación de props
Mantto_PDFGeneration.propTypes = {
  title: PropTypes.string.isRequired, // Asegura que title sea un string y obligatorio
  comments: PropTypes.string.isRequired, // Asegura que comments sea un string y obligatorio
  images: PropTypes.arrayOf(PropTypes.string), // Asegura que images sea un array de strings (base64)
};

export default Mantto_PDFGeneration;