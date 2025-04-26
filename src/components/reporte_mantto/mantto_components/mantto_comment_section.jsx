import PropTypes from 'prop-types';
import { TextField, Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

function ManttoCommentsSection({ comments: initialComments, handleComentariosChange: initialHandleComentariosChange }) {
  const [comments, setComments] = useState(initialComments);
  const [caracteresRestantes, setCaracteresRestantes] = useState(400);

  useEffect(() => {
    setComments(initialComments);
    setCaracteresRestantes(400 - initialComments.length);
  }, [initialComments]);

  const handleComentariosChange = (event) => {
    const { value } = event.target;
    if (value.length <= 400) {
      setComments(value);
      setCaracteresRestantes(400 - value.length);
      initialHandleComentariosChange(event); // Llama a la función original para actualizar el estado en el padre
    }
  };

  return (
    <Box sx={{ my: 3 }}>
      <Typography variant="h6">Cuerpo del Mensaje (Máximo 400 caracteres)</Typography>
      <TextField
        label="Comentarios"
        multiline
        rows={5}
        variant="outlined"
        fullWidth
        value={comments}
        onChange={handleComentariosChange}
        sx={{ mt: 1 }}
      />
      <Typography variant="caption" color={caracteresRestantes < 0 ? 'error' : 'textSecondary'} sx={{ mt: 0.5, display: 'block' }}>
        {caracteresRestantes < 0 ? `¡Te has excedido en ${Math.abs(caracteresRestantes)} caracteres!` : `${caracteresRestantes} caracteres restantes`}
      </Typography>
    </Box>
  );
}

// Definir los tipos de props esperadas
ManttoCommentsSection.propTypes = {
  comments: PropTypes.string.isRequired, // comments debe ser un string obligatorio
  handleComentariosChange: PropTypes.func.isRequired, // Debe ser una función obligatoria
};

export default ManttoCommentsSection;