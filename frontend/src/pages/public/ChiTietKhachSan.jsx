import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Rating,
  Chip,
  Stack,
  Button,
  ImageList,
  ImageListItem,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import {
  LocationOn,
  Pool,
  Wifi,
  Restaurant,
  Spa,
  LocalParking,
  AcUnit,
  Room,
} from "@mui/icons-material";

const mockKhachSan = {
  id: 1,
  ten: "Vinpearl Resort & Spa Nha Trang",
  hinhAnh: [
    "https://statics.vinpearl.com/styles/images/2021/07/28/Vinpearl-Nha-Trang.jpg.webp",
    "https://statics.vinpearl.com/vinpearl-luxury-nha-trang-2_1665736603.jpg",
    "https://statics.vinpearl.com/vinpearl-resort-spa-nha-trang-bay-28_1665995753.jpg",
    "https://statics.vinpearl.com/vinpearl-resort-spa-nha-trang-bay-21_1665995752.jpg",
  ],
  rating: 4.5,
  soReview: 1234,
  diaChi: "Đảo Hòn Tre, Nha Trang, Khánh Hòa",
  gia: 2500000,
  tienIch: [
    "Hồ bơi",
    "Wifi miễn phí",
    "Nhà hàng",
    "Spa",
    "Bãi đậu xe",
    "Điều hòa",
    "Phòng gym",
  ],
  moTa: "Vinpearl Resort & Spa Nha Trang là khu nghỉ dưỡng 5 sao sang trọng tọa lạc trên đảo Hòn Tre xinh đẹp. Resort cung cấp các phòng nghỉ và biệt thự sang trọng với tầm nhìn ra biển, hồ bơi ngoài trời rộng lớn, spa đẳng cấp và nhiều nhà hàng phục vụ ẩm thực đa dạng.",
  cacPhong: [
    {
      ten: "Phòng Deluxe Hướng Biển",
      gia: 2500000,
      dienTich: 45,
      soNguoi: 2,
      giuong: "1 giường đôi lớn",
      hinhAnh:
        "https://statics.vinpearl.com/styles/images/2021/07/28/Deluxe-Room.jpg.webp",
    },
    {
      ten: "Phòng Suite Gia Đình",
      gia: 4500000,
      dienTich: 65,
      soNguoi: 4,
      giuong: "2 giường đôi lớn",
      hinhAnh:
        "https://statics.vinpearl.com/styles/images/2021/07/28/Family-Suite.jpg.webp",
    },
  ],
};

const ChiTietKhachSan = () => {
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getTienIchIcon = (tienIch) => {
    switch (tienIch) {
      case "Hồ bơi":
        return <Pool />;
      case "Wifi miễn phí":
        return <Wifi />;
      case "Nhà hàng":
        return <Restaurant />;
      case "Spa":
        return <Spa />;
      case "Bãi đậu xe":
        return <LocalParking />;
      case "Điều hòa":
        return <AcUnit />;
      default:
        return <Room />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {mockKhachSan.ten}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Rating value={mockKhachSan.rating} readOnly precision={0.5} />
        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
          ({mockKhachSan.soReview} đánh giá)
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
          <LocationOn fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
            {mockKhachSan.diaChi}
          </Typography>
        </Box>
      </Box>

      <ImageList sx={{ width: "100%", height: 450 }} cols={2} rowHeight={450}>
        {mockKhachSan.hinhAnh.map((item, index) => (
          <ImageListItem key={index}>
            <img
              src={item}
              alt={`Hình ảnh ${index + 1}`}
              loading="lazy"
              style={{ objectFit: "cover" }}
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Box sx={{ mt: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Tổng quan" />
          <Tab label="Phòng" />
          <Tab label="Tiện ích" />
        </Tabs>
        <Divider />

        <Box sx={{ mt: 2 }}>
          {tabValue === 0 && (
            <Typography variant="body1" paragraph>
              {mockKhachSan.moTa}
            </Typography>
          )}

          {tabValue === 1 && (
            <Grid container spacing={3}>
              {mockKhachSan.cacPhong.map((phong, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Paper elevation={3}>
                    <img
                      src={phong.hinhAnh}
                      alt={phong.ten}
                      style={{ width: "100%", height: 200, objectFit: "cover" }}
                    />
                    <Box sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        {phong.ten}
                      </Typography>
                      <Box sx={{ mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Diện tích: {phong.dienTich}m² • {phong.soNguoi} người
                          • {phong.giuong}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography variant="h6" color="primary">
                            {phong.gia.toLocaleString("vi-VN")}đ
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            /đêm
                          </Typography>
                        </Box>
                        <Button variant="contained" color="primary">
                          Đặt phòng
                        </Button>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}

          {tabValue === 2 && (
            <Grid container spacing={2}>
              {mockKhachSan.tienIch.map((tienIch, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper elevation={3} sx={{ p: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {getTienIchIcon(tienIch)}
                      <Typography sx={{ ml: 1 }}>{tienIch}</Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ChiTietKhachSan;
