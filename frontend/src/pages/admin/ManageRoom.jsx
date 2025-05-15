import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Stack,
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export default function ManageRoom() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editRoom, setEditRoom] = useState(null);
  const [open, setOpen] = useState(false);
  const hotelId = 1;

  const roomFeatureOptions = [
    "Wi-Fi",
    "Air Conditioning",
    "TV",
    "Mini Bar",
    "Balcony",
    "Sea View",
    "Bathtub",
    "Room Service",
  ];

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/hotel/${hotelId}/rooms`
      );
      setRooms(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch rooms", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (room) => {
    setEditRoom({ ...room });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditRoom(null);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/room/${editRoom.roomId}`,
        editRoom
      );
      fetchRooms(); // reload data
      handleClose();
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditRoom((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRemoveImage = (index) => {
    setEditRoom((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const columns = [
    { field: "roomName", headerName: "Room Name", flex: 1 },
    { field: "roomPrice", headerName: "Price", flex: 1 },
    { field: "size", headerName: "Size (m²)", flex: 1 },
    { field: "maxPersons", headerName: "Max Persons", flex: 1 },
    { field: "bedType", headerName: "Bed Type", flex: 1 },
    { field: "view", headerName: "View", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleEdit(params.row)}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Box p={4}>
      <Typography variant="h5" mb={2}>
        Manage Hotel Rooms
      </Typography>

      {loading ? (
        <Typography color="text.secondary">Loading rooms...</Typography>
      ) : rooms.length === 0 ? (
        <Typography color="error">No rooms found for this hotel.</Typography>
      ) : (
        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={rooms.map((r) => ({ ...r, id: r.roomId }))}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
          />
        </Box>
      )}

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            maxHeight: "90vh",
            overflowY: "auto",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" mb={2}>
            Edit Room
          </Typography>

          {editRoom && (
            <Stack spacing={2}>
              <TextField
                label="Room Name"
                name="roomName"
                value={editRoom.roomName}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Price"
                name="roomPrice"
                type="number"
                value={editRoom.roomPrice}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Size (m²)"
                name="size"
                type="number"
                value={editRoom.size}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Max Persons"
                name="maxPersons"
                type="number"
                value={editRoom.maxPersons}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Bed Type"
                name="bedType"
                value={editRoom.bedType}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="View"
                name="view"
                value={editRoom.view}
                onChange={handleChange}
                fullWidth
              />

              {/* Features */}
              <Autocomplete
                multiple
                options={roomFeatureOptions}
                value={editRoom.roomFeatures || []}
                onChange={(event, newValue) =>
                  setEditRoom((prev) => ({
                    ...prev,
                    roomFeatures: newValue,
                  }))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Room Features"
                    placeholder="Select features"
                  />
                )}
              />

              {/* Images */}
              <Box>
                <Typography variant="subtitle1" mb={1}>
                  Room Images
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {editRoom.images?.map((img, idx) => (
                    <Box
                      key={idx}
                      sx={{ position: "relative", width: 80, height: 80 }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveImage(idx)}
                        sx={{
                          position: "absolute",
                          top: -8,
                          right: -8,
                          backgroundColor: "white",
                          boxShadow: 1,
                          zIndex: 1,
                          "&:hover": {
                            backgroundColor: "#f8d7da",
                            color: "red",
                          },
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                      <img
                        src={img}
                        alt={`room-${idx}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 8,
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  ))}
                </Stack>
              </Box>

              {/* Add new image URL */}
              <TextField
                label="Add new image URL"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    e.preventDefault();
                    const url = e.target.value.trim();
                    setEditRoom((prev) => ({
                      ...prev,
                      images: [...(prev.images || []), url],
                    }));
                    e.target.value = "";
                  }
                }}
                fullWidth
                placeholder="Paste image URL and press Enter"
              />

              <Box textAlign="right">
                <Button onClick={handleClose} sx={{ mr: 2 }}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleSave}>
                  Save
                </Button>
              </Box>
            </Stack>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
