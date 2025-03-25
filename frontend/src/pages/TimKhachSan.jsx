import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Search, LocationOn, CalendarToday, Person } from "@mui/icons-material";
import KhachSanCard from "../components/KhachSanCard";

const danhSachKhachSan = [
  {
    id: 1,
    ten: "Vinpearl Resort & Spa Nha Trang",
    hinhAnh:
      "https://statics.vinpearl.com/styles/images/2021/07/28/Vinpearl-Nha-Trang.jpg.webp",
    rating: 4.5,
    soReview: 1234,
    diaChi: "Đảo Hòn Tre, Nha Trang, Khánh Hòa",
    gia: 2500000,
    tienIch: ["Hồ bơi", "Wifi miễn phí", "Nhà hàng"],
  },
  {
    id: 2,
    ten: "Mường Thanh Luxury Đà Nẵng",
    hinhAnh:
      "https://muongthanh.com/wp-content/uploads/2023/03/muong-thanh-luxury-da-nang-hotel.jpg",
    rating: 4.2,
    soReview: 856,
    diaChi: "Võ Nguyên Giáp, Đà Nẵng",
    gia: 1800000,
    tienIch: ["Hồ bơi", "Wifi miễn phí", "Nhà hàng"],
  },
];

const TimKhachSan = () => {
  const [searchParams, setSearchParams] = useState({
    diaDiem: "",
    ngayNhanPhong: "",
    ngayTraPhong: "",
    soNguoi: 1,
  });

  const [filters, setFilters] = useState({
    giaRange: [0, 5000000],
    rating: 0,
    tienIch: {
      hoBoi: false,
      wifi: false,
      nhaHang: false,
      spa: false,
    },
  });

  const handleSearch = () => {
    console.log("Tìm kiếm với params:", searchParams);
  };

  const handleGiaRangeChange = (event, newValue) => {
    setFilters({ ...filters, giaRange: newValue });
  };

  const handleTienIchChange = (name) => (event) => {
    setFilters({
      ...filters,
      tienIch: {
        ...filters.tienIch,
        [name]: event.target.checked,
      },
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tìm Khách Sạn
      </Typography>

      {/* Form tìm kiếm */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Địa điểm"
              value={searchParams.diaDiem}
              onChange={(e) =>
                setSearchParams({ ...searchParams, diaDiem: e.target.value })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              type="date"
              label="Ngày nhận phòng"
              value={searchParams.ngayNhanPhong}
              onChange={(e) =>
                setSearchParams({
                  ...searchParams,
                  ngayNhanPhong: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarToday />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              type="date"
              label="Ngày trả phòng"
              value={searchParams.ngayTraPhong}
              onChange={(e) =>
                setSearchParams({
                  ...searchParams,
                  ngayTraPhong: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarToday />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              type="number"
              label="Số người"
              value={searchParams.soNguoi}
              onChange={(e) =>
                setSearchParams({
                  ...searchParams,
                  soNguoi: parseInt(e.target.value),
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
                inputProps: { min: 1 },
              }}
            />
          </Grid>
          <Grid item xs={12} md={1}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{ height: "100%" }}
            >
              <Search />
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Kết quả tìm kiếm */}
      <Grid container spacing={3}>
        {/* Bộ lọc */}
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Bộ lọc
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>Khoảng giá (VNĐ)</Typography>
              <Slider
                value={filters.giaRange}
                onChange={handleGiaRangeChange}
                valueLabelDisplay="auto"
                min={0}
                max={5000000}
                step={100000}
                valueLabelFormat={(value) =>
                  `${value.toLocaleString("vi-VN")}đ`
                }
              />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">
                  {filters.giaRange[0].toLocaleString("vi-VN")}đ
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {filters.giaRange[1].toLocaleString("vi-VN")}đ
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>Tiện ích</Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.tienIch.hoBoi}
                      onChange={handleTienIchChange("hoBoi")}
                    />
                  }
                  label="Hồ bơi"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.tienIch.wifi}
                      onChange={handleTienIchChange("wifi")}
                    />
                  }
                  label="Wifi miễn phí"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.tienIch.nhaHang}
                      onChange={handleTienIchChange("nhaHang")}
                    />
                  }
                  label="Nhà hàng"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.tienIch.spa}
                      onChange={handleTienIchChange("spa")}
                    />
                  }
                  label="Spa"
                />
              </FormGroup>
            </Box>
          </Paper>
        </Grid>

        {/* Danh sách khách sạn */}
        <Grid item xs={12} md={9}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Danh sách khách sạn
            </Typography>
            {danhSachKhachSan.map((khachSan) => (
              <KhachSanCard key={khachSan.id} khachSan={khachSan} />
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TimKhachSan;
