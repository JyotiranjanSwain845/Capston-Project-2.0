import {
  Stack,
  Button,
  Card,
  CardContent,
  Grid,
  Box,
  TextField,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";
import IncidentField from "./IncidentField";
export default function Home() {
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
  useEffect(() => {
    async function fetchData() {
      if (isLogged) {
        const incidentList = await axios.get(
          "http://localhost:3001/api/incidents",
          { withCredentials: true }
        );
        setIncidents(incidentList.data.result);
        console.log(incidentList);
      }
    }
    fetchData();
  }, [isLogged]);
  return (
    <>
      
      {isLogged && incidents ? (
        <>
          
          <Box
            sx={{
              position: "sticky",
              top: 60,
              zIndex: 10,
              backgroundColor: "none",
              py: 1,
            }}
          >
            
            <IncidentField />
          </Box>
          <Stack sx={{ width: "100%" }}>
            
            {creating ? (
              <Grid
                container
                spacing={3}
                alignItems="flex-start"
                sx={{
                  transition: "all 0.3s ease",
                  width: "100%",
                  flexWrap: "nowrap",
                }}
              >
                
                <Grid
                  item
                  sx={{ flex: "0 0 50%", pr: 2, boxSizing: "border-box" }}
                >
                  
                  <Box
                    sx={{
                      maxHeight: "70vh",
                      overflowY: "auto",
                      "&::-webkit-scrollbar": {
                        display: "none",
                        width: 0,
                        height: 0,
                      },
                      msOverflowStyle: "none",
                    }}
                  >
                    
                    {incidents.map((inc) => (
                      <Box key={inc.sys_id} sx={{ mb: 2 }}>
                        
                        <Typography>{inc.number}</Typography>
                        <Card
                          sx={{
                            width: "100%",
                            height: 200,
                            borderRadius: "15px",
                          }}
                        >
                          
                          <CardContent>
                            
                            <Typography variant="h6">
                              
                              Incident: {inc.number}
                            </Typography>
                            <Typography variant="body2">
                              
                              Description: {inc.short_description}
                            </Typography>
                            <Typography variant="body2">
                              
                              Impact: {inc.impact}
                            </Typography>
                            <Typography variant="body2">
                              
                              Urgency: {inc.urgency}
                            </Typography>
                            <Typography variant="body2">
                              
                              priority: {inc.priority}
                            </Typography>
                            <Button
                              sx={{
                                mt: 1,
                                backgroundColor: "rgb(98 216 78 / 40%)",
                                color: "#032d42",
                              }}
                              variant="contained"
                              onClick={() => onEdit(inc)}
                            >
                              
                              Edit
                            </Button>
                            <Button
                              sx={{
                                mt: 1,
                                mx: 1,
                                backgroundColor: "#db8f8f",
                                color: "#032d42",
                              }}
                              variant="contained"
                              onClick={() => onDelete(inc.sys_id)}
                            >
                              
                              Delete
                            </Button>
                          </CardContent>
                        </Card>
                      </Box>
                    ))}
                  </Box>
                </Grid>
                <Grid item sx={{ flex: "0 0 60%", boxSizing: "border-box" }}>
                  
                  <Paper
                    elevation={3}
                    sx={{
                      p: 4,
                      borderRadius: 5,
                      width: "80%",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      mb={2}
                      color="primary"
                    >
                      
                      {editingId ? "Update Incident" : "Create Incident"}
                    </Typography>
                    <Box
                      component="form"
                      onSubmit={editingId ? onEditSubmit : handleSubmit}
                    >
                      
                      <Stack spacing={2.5}>
                        
                        <TextField
                          label="Incident Number"
                          name="incidentNumber"
                          value={formData.incidentNumber}
                          onChange={handleChange}
                          fullWidth
                          required
                        />
                        <TextField
                          label="Short Description"
                          name="shortDescription"
                          value={formData.shortDescription}
                          onChange={handleChange}
                          multiline
                          rows={3}
                          fullWidth
                          required
                        />
                        <TextField
                          select
                          label="Impact"
                          name="impact"
                          value={formData.impact}
                          onChange={handleChange}
                          fullWidth
                          required
                        >
                          
                          <MenuItem value="1">High</MenuItem>
                          <MenuItem value="2">Medium</MenuItem>
                          <MenuItem value="3">Low</MenuItem>
                        </TextField>
                        <TextField
                          select
                          label="Urgency"
                          name="urgency"
                          value={formData.urgency}
                          onChange={handleChange}
                          fullWidth
                          required
                        >
                          
                          <MenuItem value="1">Critical</MenuItem>
                          <MenuItem value="2">Moderate</MenuItem>
                          <MenuItem value="3">Low</MenuItem>
                        </TextField>
                        <TextField
                          disabled
                          id="outlined-disabled"
                          label="Priority"
                          name="Priority"
                          value={formData.priority}
                          onChange={handleChange}
                          fullWidth
                          required
                        >
                          
                          <MenuItem value="1">Critical</MenuItem>
                          <MenuItem value="1">High</MenuItem>
                          <MenuItem value="2">Moderate</MenuItem>
                          <MenuItem value="3">Low</MenuItem>
                        </TextField>
                        <Button
                          type="submit"
                          sx={{
                            mt: 2,
                            py: 1.2,
                            backgroundColor: "#63df4e",
                            color: "#032d42",
                            borderRadius: "25px",
                            "&:hover": {
                              backgroundColor: "#ffffff",
                              outline: "2px solid #63df4e",
                            },
                          }}
                        >
                          
                          {editingId ? "Update" : "Submit"}
                        </Button>
                      </Stack>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            ) : (
              <>
                
                <Typography
                  variant="h5"
                  sx={{ alignSelf: "center", textAlign: "center", py: 3 }}
                >
                  
                  Incident Records:
                </Typography>
                <Grid
                  container
                  spacing={2}
                  justifyContent={"space-around"}
                  alignSelf={"center"}
                  sx={{
                    maxWidth: creating ? "30%" : "100%",
                    transition: "all 0.3s ease",
                  }}
                >
                  
                  {incidents.map((inc) => (
                    <Grid key={inc.sys_id}>
                      
                      <Card sx={{ width: 300, height: 200 }}>
                        
                        <CardContent>
                          
                          <Typography variant="h6">
                            
                            Incident #: {inc.number}
                          </Typography>
                          <Typography variant="body2">
                            
                            Description: {inc.short_description}
                          </Typography>
                          <Typography variant="body2">
                            
                            Impact: {inc.impact}
                          </Typography>
                          <Typography variant="body2">
                            
                            Urgency: {inc.urgency}
                          </Typography>
                          <Typography variant="body2" disabled>
                            
                            Priority: {inc.priority}
                          </Typography>
                          <Button
                            sx={{
                              mt: 1,
                              backgroundColor: "rgb(98 216 78 / 40%)",
                              color: "#032d42",
                            }}
                            variant="contained"
                            onClick={() => {
                              console.log("clicked with inc having number :",inc.number);
                              onEdit(inc)}}
                          >
                            
                            Edit
                          </Button>
                          <Button
                            sx={{
                              mt: 1,
                              mx: 1,
                              backgroundColor: "#db8f8f",
                              color: "#032d42",
                            }}
                            variant="contained"
                            onClick={() => onDelete(inc.sys_id)}
                          >
                            
                            Delete
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </Stack>
        </>
      ) : (
        <Typography>Please log in</Typography>
      )}
    </>
  );
}
