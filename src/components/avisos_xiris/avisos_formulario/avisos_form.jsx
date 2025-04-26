import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import background from '../avisos_assets/avisos.jpg';

function Avisos_form() {
  const [formData, setFormData] = useState({
    titulo: '',
    cuerpoDelMensaje: ''
  });
  const [caracteresRestantes, setCaracteresRestantes] = useState(400);
  const [titleHeight, setTitleHeight] = useState(0);
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      setTitleHeight(titleRef.current.clientHeight);
    }
  }, [formData.titulo]);

  const getFormattedDate = () => {
    const meses = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const año = fecha.getFullYear();
    return `Mex, Mex. A ${dia} de ${mes} de ${año}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cuerpoDelMensaje') {
      if (value.length <= 400) {
        setFormData({ ...formData, [name]: value });
        setCaracteresRestantes(400 - value.length);
      }
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleGenerateImage = () => {
    const input = document.getElementById('capture');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `Comunicado.jpg`;
      link.click();
    });
  };

  const handleGeneratePDF = () => {
    const input = document.getElementById('capture');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [800, 1000]
      });
      pdf.addImage(imgData, 'JPEG', 0, 0, 800, 1000);
      pdf.save('Comunicado.pdf');
    });
  };

  const formatText = (text, maxLength) => {
    const regex = new RegExp(`.{1,${maxLength}}`, 'g');
    return text.match(regex) || [];
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
      <form>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Título del mensaje:</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Cuerpo del Mensaje (Máximo 400 caracteres):</label>
          <textarea
            name="cuerpoDelMensaje"
            value={formData.cuerpoDelMensaje}
            onChange={handleChange}
            style={{ width: '100%', height: '150px', padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <p style={{ fontSize: '0.9em', color: caracteresRestantes < 0 ? 'red' : 'gray', marginTop: '5px' }}>
            {caracteresRestantes < 0 ? `¡Te has excedido en ${Math.abs(caracteresRestantes)} caracteres!` : `${caracteresRestantes} caracteres restantes`}
          </p>
        </div>
        <button
          type="button"
          onClick={handleGenerateImage}
          style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}
        >
          Generar Imagen JPG
        </button>
        <button
          type="button"
          onClick={handleGeneratePDF}
          style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Generar PDF
        </button>
      </form>

      <div
        id="capture"
        style={{
          position: 'absolute',
          left: '-9999px',
          width: '800px',
          height: '1000px'
        }}
      >
        <img
          src={background}
          alt="Formato"
          style={{ width: '100%', height: '100%' }}
        />

        {/* FECHA AUTOMÁTICA */}
        <div
          style={{
            position: 'absolute',
            top: '155px',  // Ajusta según el diseño
            left: '445px',
            maxWidth: "80%",
            color: 'black',
            fontSize: '20px',
            fontWeight: 'bold'
          }}
        >
          {getFormattedDate()}
        </div>

        {/* TÍTULO */}
        <div
          ref={titleRef}
          style={{
            position: 'absolute',
            top: '200px',
            left: '55px',
            maxWidth: "80%",
            color: 'black',
            fontSize: '22px',
            fontWeight: 'bold',
            whiteSpace: 'pre-wrap'
          }}
        >
          {formatText(formData.titulo, 250).map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>

        {/* CUERPO DEL MENSAJE */}
        <div
          style={{
            position: 'absolute',
            top: `${250 + titleHeight + 15}px`,
            left: '50px',
            maxWidth: "88%",
            color: 'black',
            fontSize: '18px',
            textAlign: 'justify',
            whiteSpace: 'pre-wrap'
          }}
        >
          {formatText(formData.cuerpoDelMensaje, 2019).map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Avisos_form;