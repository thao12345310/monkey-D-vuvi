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
    navigate(`/khach-san/${khachSan.hotelId}`);
  };

  // Dữ liệu giả cho tiện ích và rating nếu chưa có trong DTO
  const tienIchMock = ["Hồ bơi", "Wifi miễn phí", "Nhà hàng"];
  const ratingMock = 4.2;
  const soReviewMock = 320;

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
        image={
          khachSan.hinhAnh || // nếu có trường này ở backend
          "https://picsum.photos/400/300" // ảnh mặc định
        }
        alt={khachSan.hotelName}
      />
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            {khachSan.hotelName}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Rating value={ratingMock} readOnly precision={0.5} size="small" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({soReviewMock} đánh giá)
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <LocationOn fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
              {khachSan.address}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            {tienIchMock.map((tienIch, index) => (
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
              {khachSan.hotelPrice.toLocaleString("vi-VN")}đ
            </Typography>
            <Typography variant="caption" color="text.secondary">
              /đêm
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/khach-san/${khachSan.hotelId}/dat-phong`);
            }}
            sx={{
              backgroundColor: "#EC80B1",
              "&:hover": {
                backgroundColor: "#d46f9d",
              },
              color: "#fff",
              borderRadius: "20px",
              textTransform: "none",
              px: 3,
              py: 1,
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
