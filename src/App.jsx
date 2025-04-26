import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import residenza_logo from "./assets/logos/Residenza_logo.jpg";
import logo_xiris_ac from "./assets/logos/logo_xiris ac.png";
import Mantto_Main from "./components/reporte_mantto/mantto_main";
import Checklist_Main from "./components/checklist/checklist_main";
import Avisos_main from "./components/avisos_xiris/avisos_main";

//Principal
const NavBar = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "rgb(1, 98, 153)", width: "100%" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Agencia Habitat
        </Typography>
        <Button color="inherit" component={Link} to="/">Inicio</Button>
      </Toolbar>
    </AppBar>
  );
};

const Home = () => {

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    alert("¡Enlace copiado al portapapeles!");
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Selecciona la herramienta
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <Button variant="contained" component={Link} to="/checklist">
          Checklist recorrido condominio
        </Button>
        <Button variant="contained" component={Link} to="/mantto">
          Reporte de mantenimiento
        </Button>
        <Button variant="contained" component={Link} to="/Avisos">
          Avisos generales
        </Button>
      </Box>

      {/* Caja con enlace para "Formulario para Airbnb" */}
      <Container
        sx={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)"
        }}
      >
        <Box>
          <Typography variant="h6" gutterBottom>
            Link de formulario para Alojamientos temporales.
          </Typography>
          <Typography>
            Copia el link y mándalo al propietario para que llene el formulario, al final, por favor solicita que te envíen la imagen generada.
          </Typography>
          <Box display="flex" alignItems="center" gap={1} marginTop={1}>
            <Button 
              variant="contained" 
              onClick={() => handleCopy("https://agenciah.github.io/alojamientos_temporales_xiris/")} 
              sx={{ backgroundColor: "#26A9E1", color: "#fff" }}
            >
              Copiar
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Nueva Caja con enlace para "Entrada Mudanza Xiris" */}
      <Container
        sx={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)"
        }}
      >
        <Box>
          <Typography variant="h6" gutterBottom>
            Link de formulario para Entrada Mudanza.
          </Typography>
          <Typography>
            Copia el link y mándalo al propietario para que llene el formulario, al final, por favor solicita que te envíen la imagen generada.
          </Typography>
          <Box display="flex" alignItems="center" gap={1} marginTop={1}>
            <Button 
              variant="contained" 
              onClick={() => handleCopy("https://agenciah.github.io/entrada_mudanza_xiris/")} 
              sx={{ backgroundColor: "#26A9E1", color: "#fff" }}
            >
              Copiar
            </Button>
          </Box>
        </Box>
        
      </Container>
      <Container
          sx={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)"
          }}
        >
        <Box>
          <Typography variant="h6" gutterBottom>
            Link de formulario aceptación de reglamento.
          </Typography>
          <Typography>
            Copia el link y mándalo al propietario para que llene el formulario, al final, por favor solicita que te envíen el pdf generado.
          </Typography>
          <Box display="flex" alignItems="center" gap={1} marginTop={1}>
            <Button 
              variant="contained" 
              onClick={() => handleCopy("https://agenciah.github.io/residenza_responsiva_xiris/")} 
              sx={{ backgroundColor: "#26A9E1", color: "#fff" }}
            >
              Copiar
            </Button>
          </Box>
        </Box>
        </Container>
        <Container
        sx={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)"
        }}
        >
        <Box>
          <Typography variant="h6" gutterBottom>
            Link de formulario Solicitud de Tag.
          </Typography>
          <Typography>
            Copia el link y mándalo al propietario para que llene el formulario, al final, por favor solicita que te envíen el pdf generado.
          </Typography>
          <Box display="flex" alignItems="center" gap={1} marginTop={1}>
            <Button 
              variant="contained" 
              onClick={() => handleCopy("https://agenciah.github.io/residenza_tag_playas_conchal/")} 
              sx={{ backgroundColor: "#26A9E1", color: "#fff" }}
            >
              Copiar
            </Button>
          </Box>
        </Box>
        </Container>
        <Container
        sx={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)"
        }}
        >
        </Container>
        
        
    </Container>
  );
};

function App() {
  return (
    <Router>
      <NavBar />

      <Box sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        paddingTop: "40px", // Espacio para el navbar fijo
        position: "relative"
      }}>
        
      </Box>

      <Container sx={{ maxWidth: "1200px", marginTop: "10px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mantto" element={<Mantto_Main />} />
          <Route path="/checklist" element={<Checklist_Main />} />
          <Route path="/Avisos" element={<Avisos_main />} />
        </Routes>
      </Container>

    </Router>
  );
}

export default App;
