import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material";
import { Link, Routes, Route, Outlet } from "react-router-dom";
import styles from "./App.module.css";
import { useContext } from "react";
import { AuthContext } from "./components/AuthProvider.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import NotFound from "./components/NotFound.jsx";

function App() {
  function Layout() {
    const { isLogged, logout, login, setCreating } = useContext(AuthContext);

    return (
      <Box>
        <AppBar position="sticky">
          <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h4">Capstone</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1,ml:10 }}>
              {isLogged && (
                <>
                  <Link
                    className={styles.link}
                    to="/"
                    onClick={() => setCreating(false)}
                  >
                    Home
                  </Link>
                  <Link className={styles.link} to="/about">
                    About
                  </Link>
                  <Link className={styles.link} to="/does-not-exist">
                    404 Test
                  </Link>
                </>
              )}
            </Box>
            <Box sx={{ marginLeft: 'auto' }}>
              {isLogged ? (
                <Link className={styles.link} onClick={logout}>
                  Logout
                </Link>
              ) : (
                <Link className={styles.link} onClick={login}>
                  Login
                </Link>
              )}
            </Box>
          </Toolbar>
        </AppBar>

        <Container >
          <Outlet />
        </Container>
      </Box>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
