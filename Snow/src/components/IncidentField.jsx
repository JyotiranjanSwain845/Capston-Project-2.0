import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

const IncidentField = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isLogged,
    incidents,
    setIncidents,
    onDelete,
    creating,
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    onEdit,
    onEditSubmit,
    editingId,
  } = useContext(AuthContext);
  return (
    <div className="relative w-full flex justify-center items-center">
      {/* Pill-shaped Incident button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="contained"
        sx={{
          backgroundColor: "#16a34a",
          color: "white",
          px: { xs: 2, sm: 3 },
          py: { xs: 1, sm: 1.5 },
          borderRadius: "9999px", // pill shape
          fontSize: { xs: "12px", sm: "14px" },
          fontWeight: 600,
          textTransform: "none",
          boxShadow: 2,
          transition: "0.2s ease",
          "&:hover": {
            backgroundColor: "#15803d",
          },
        }}
      >
        Incident
      </Button>

      {/* Floating + button overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="absolute"
              style={{ bottom: "50px" }} // floats above Incident button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
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

                  onEdit(null);

                  creating((prev)=>!prev);

                  setIsOpen((prev)=>!prev);
                }}
                sx={{
                  backgroundColor: "#16a34a",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#16a34a",
                    border: "2px solid #16a34a",
                  },
                }}
              >
                <AddIcon />
              </Fab>
            </motion.div>

            {/* Overlay backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IncidentField;
