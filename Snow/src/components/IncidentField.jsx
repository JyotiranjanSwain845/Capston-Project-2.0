import { useState } from "react";
import { motion, AnimatePresence, scale } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";

const IncidentField = () => {
  const {
    isLogged,
    incidents,
    setIncidents,
    onDelete,
    creating,
    createInc,
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    onEdit,
    onEditSubmit,
    editingId,
  } = useContext(AuthContext);

  const [checked, setChecked] = useState(false);

  const handlechange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box sx={{ width: "fit-content" }}>
      <Button
        onClick={handlechange}
        variant="contained"
        sx={{
          backgroundColor: "#16a34a",
          mt:"-1%",
          px: { xs: 2, sm: 3 },
          py: { xs: 1, sm: 1.5 },
          borderRadius: 50,
          boxShadow: 3,
          transition: "0.2s ease ",
          textTransform: "none",
          backdropFilter: "none",
          "&:hover": {
            backgroundColor: "#1d801aff ",
            boxShadow: 8,
          },
        }}
      >
        Incident
      </Button>
      {checked && (
        <Box sx={{ display: "flex", position: "absolute", mt: 5, ml: 2.5 }}>
          <Grow
            in={checked}
            {...(checked ? { timeout: 1000 } : {})}
            style={{ transformOrigin: "center center" }}
          >
              <Fab
                onClick={() => {
                  setFormData({
                    short_description: "",
                    description: "",
                    category: "",
                    urgency: "",
                    impact: "",
                    assignment_group: "",
                    assigned_to: "",
                  });
                  createInc();
                  handlechange();
                }}
                sx={{
                  backgroundColor: "#16a34a",
                  color: "white",
                  transition: "all 0.2s ease !important",
                  boxShadow : 5,
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#16a34a",
                    transform: "scale(1.08) !important",
                  },
                }}
              >
                <AddIcon />
              </Fab>
          </Grow>
        </Box>
      )}
    </Box>
  );
};
export default IncidentField;
