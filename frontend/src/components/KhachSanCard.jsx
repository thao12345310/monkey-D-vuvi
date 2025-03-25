import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  Chip,
  Stack,
  Button,
} from "@mui/material";
import { LocationOn, Pool, Wifi, Restaurant } from "@mui/icons-material";

const KhachSanCard = ({ khachSan }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/khach-san/${khachSan.id}`);
  };

  return (
    <Card
      sx={{
        display: "flex",
        mb: 2,
        position: "relative",
        cursor: "pointer",
        "&:hover": {
          boxShadow: 6,
        },
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        sx={{ width: 280, height: 210 }}
        image={khachSan.hinhAnh}
        alt={khachSan.ten}
      />
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            {khachSan.ten}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Rating
              value={khachSan.rating}
              readOnly
              precision={0.5}
              size="small"
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({khachSan.soReview} đánh giá)
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <LocationOn fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
              {khachSan.diaChi}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            {khachSan.tienIch.map((tienIch, index) => (
              <Chip
                key={index}
                size="small"
                icon={
                  tienIch === "Hồ bơi" ? (
                    <Pool fontSize="small" />
                  ) : tienIch === "Wifi miễn phí" ? (
                    <Wifi fontSize="small" />
                  ) : tienIch === "Nhà hàng" ? (
                    <Restaurant fontSize="small" />
                  ) : null
                }
                label={tienIch}
                variant="outlined"
              />
            ))}
          </Stack>
        </CardContent>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 2,
            mt: "auto",
          }}
        >
          <Box>
            <Typography variant="h6" color="primary">
              {khachSan.gia.toLocaleString("vi-VN")}đ
            </Typography>
            <Typography variant="caption" color="text.secondary">
              /đêm
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/khach-san/${khachSan.id}/dat-phong`);
            }}
          >
            Đặt ngay
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default KhachSanCard;
