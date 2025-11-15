import { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

export const AuthContext = createContext({
  isLogged: false,
  checking: true,
  reload: () => {},
  logout: () => {},
  login: () => {},
  delete: () => {},
});

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [checking, setChecking] = useState(true);
  const [incidents, setIncidents] = useState([]);
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    incidentNumber: "",
    shortDescription: "",
    impact: "",
    urgency: "",
    priority: "",
  });

  /* log-in action */
  const login = useCallback(async () => {
    window.location.href = "http://localhost:3001/auth/login";
  }, []);

  /* log-out action */
  const logout = useCallback(async () => {
    await axios.get("http://localhost:3001/auth/logout", {
      withCredentials: true,
    });
    setIsLogged(false);
  }, []);

  /* reload action */
  const reload = useCallback(async () => {
    setChecking(true);
    const r = await axios.get("http://localhost:3001/auth/status", {
      withCredentials: true,
    });
    setIsLogged(Boolean(r.data.authenticated));
    setChecking(false);
  }, []);

  /* delete action */
  const onDelete = async (sys_id) => {
    try {
      await axios.delete(
        `http://localhost:3001/api/incidents/${sys_id}`,
        { withCredentials: true }
      );

      setIncidents(incidents.filter((inc) => inc.sys_id !== sys_id));
    } catch (err) {
      console.error("couldn't delete:", err.message);
    }
  };

  /* record creation action */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === "impact" || name === "urgency") {
        const priorityIndex = {
          "1-1": "1 - Critical",
          "1-2": "2 - High",
          "1-3": "3 - Moderate",
          "2-1": "2 - High",
          "2-2": "3 - Moderate",
          "2-3": "4 - Low",
          "3-1": "3 - Moderate",
          "3-2": "4 - Low",
          "3-3": "5 - Planning",
        };

        const key = `${updated.impact}-${updated.urgency}`;
        updated.priority = priorityIndex[key] || "";
      }

      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      number: formData.incidentNumber,
      short_description: formData.shortDescription,
      impact: formData.impact,
      urgency: formData.urgency,
      priority: formData.priority,
    };

    try {
      const response = await axios.post(
        `http://localhost:3001/api/incidents/`,
        body,
        { withCredentials: true }
      );

      const created = response.data?.result || response.data || null;

      if (created) {
        setIncidents((prev) => [created, ...prev]);
      }

      setFormData({
        incidentNumber: "",
        shortDescription: "",
        impact: "",
        urgency: "",
        priority: "",
      });

      alert("Incident created successfully");
      setCreating(false);
    } catch (err) {
      console.error("couldn't post:", err.response || err.message);
      const message = err.response?.data || err.message;
      alert("Failed to create incident: " + JSON.stringify(message));
    }
  };

  const createInc = useCallback(() => {
    setCreating(true);
    setEditingId(null);
    setFormData({
      incidentNumber: "",
      shortDescription: "",
      impact: "",
      urgency: "",
      priority: "",
    });
  }, []);

  /* record update action */
  const onEdit = (inc) => {
    const extractNumber = (v) => {
      if (!v) return "";
      return v.split(" ")[0]; // takes "3" from "3 - Low"
    };

    setEditingId(inc.sys_id);

    setFormData({
      incidentNumber: inc.number,
      shortDescription: inc.short_description,
      impact: extractNumber(inc.impact),
      urgency: extractNumber(inc.urgency),
      priority: extractNumber(inc.priority),
    });
  };

  const onEditSubmit = async (e) => {
    e.preventDefault();

    if (!editingId) {
      alert("No incident selected for editing");
      return;
    }

    const body = {
      number: formData.incidentNumber,
      short_description: formData.shortDescription,
      impact: formData.impact,
      urgency: formData.urgency,
    };

    try {
      const response = await axios.put(
        `http://localhost:3001/api/incidents/${editingId}`,
        body,
        { withCredentials: true }
      );

      const updatedRec = response.data?.result;

      setIncidents((prev) =>
        prev.map((inc) =>
          inc.sys_id === editingId ? { ...inc, ...updatedRec } : inc
        )
      );

      alert("Incident updated successfully");

      setFormData({
        incidentNumber: "",
        shortDescription: "",
        impact: "",
        urgency: "",
        priority: "",
      });

      setCreating(false);
      setEditingId(null);
    } catch (err) {
      console.error("couldn't update:", err.message);
      alert("Failed to update incident: " + JSON.stringify(err.message));
    }
  };

  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        checking,
        login,
        reload,
        logout,
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
