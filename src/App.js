import { AppBar, Button, Grid, ThemeProvider } from '@mui/material';
import './App.css';
import { useState } from 'react';
import { createTheme } from '@mui/material';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import About from './sections/About';


const theme = createTheme({
  palette: {
    primary: {
      main: '#0c343d  '
    },
    secondary: {
      main: '#45818e'
    },
  }
});



function App() {


  const [ModusB, setModusB] = useState(true)

  const handleClick = () => {
    ModusB ?
      setModusB(false) :
      setModusB(true)
  }


  return (
    <div className={ModusB ? "App" : "App dark"}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppBar position='sticky' color='primary' sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", p: "1rem" }}>
            <Link style={{ color: '#f5f7f9' }} to="/" >Home</Link>
            <Link style={{ color: '#f5f7f9' }} to="/page" >page</Link>
            <Link style={{ color: '#f5f7f9' }} to="/about">About us</Link>
            <Button variant='contained' color='secondary' onClick={handleClick}>
              {ModusB ? "light" : "dark"}
            </Button>

          </AppBar>
          <Grid display={"flex"} justifyContent={"center"} width="100%" >
            <Routes>
              <Route exact path="/" element={<p>home</p>
              } />
              <Route path="/page" element={<p>page 2</p>
              } />
              <Route path="/about" element={<About />
              } />
            </Routes>
          </Grid>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
