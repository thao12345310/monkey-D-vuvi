import React, { useState, useEffect } from "react";
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
  Pagination,
  Stack,
} from "@mui/material";
import { Search, LocationOn, CalendarToday, Person } from "@mui/icons-material";
import LongCard from "../components/LongCard";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import axios from "axios";

const TimDuThuyen = () => {
  const [ships, setShips] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

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

  const fetchShips = async (page) => {
    try {
      setLoading(true);
      console.log("Đang tải dữ liệu cho trang:", page);
      const response = await axios.get(
        `http://localhost:8080/api/ship?currentPage=${page}&pageSize=6`
      );
      const data = response.data;
      console.log("Dữ liệu nhận được:", data);
      setShips(data.result || []);
      setTotalPages(data.meta?.pages || 1);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShips(currentPage);
  }, [currentPage]);

  const handleSearch = () => {
    console.log("Tìm kiếm với params:", searchParams);
    setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
    fetchShips(1);
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

  const handlePageChange = (event, value) => {
    console.log("Chuyển sang trang:", value);
    setCurrentPage(value);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <div className="absolute inset-0 bg-[url('/background-pattern.svg')] bg-cover opacity-5 -z-10"></div>

      {/* Search Bar */}
      <Paper elevation={3} sx={{ px: 4, py: 5, borderRadius: 5, mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
          Bạn lựa chọn du thuyền nào?
        </Typography>
        <Typography align="center" color="text.secondary" mb={4}>
          Hơn 100 du thuyền hạng sang giá tốt đang chờ bạn
        </Typography>

        <Box
          display="flex"
          flexDirection={{ xs: "column", lg: "row" }}
          alignItems="center"
          gap={2}
        >
          <Box
            display="flex"
            alignItems="center"
            width={{ xs: "100%", lg: "40%" }}
            bgcolor="grey.100"
            px={2}
            py={1.5}
            borderRadius="50px"
          >
            <SearchIcon sx={{ color: "grey.500", mr: 1 }} />
            <input
              type="text"
              placeholder="Nhập tên khách sạn"
              className="bg-transparent outline-none w-full text-sm"
              onChange={(e) =>
                setSearchParams({
                  ...searchParams,
                  tenDuThuyen: e.target.value,
                })
              }
            />
          </Box>

          <Box
            display="flex"
            alignItems="center"
            width={{ xs: "100%", lg: "20%" }}
            bgcolor="grey.100"
            px={2}
            py={1.5}
            borderRadius="50px"
            sx={{ cursor: "pointer" }}
          >
            <LocationOnIcon sx={{ color: "grey.500", mr: 1 }} />
            <Typography variant="body2">Tất cả địa điểm</Typography>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            width={{ xs: "100%", lg: "20%" }}
            bgcolor="grey.100"
            px={2}
            py={1.5}
            borderRadius="50px"
            sx={{ cursor: "pointer" }}
          >
            <AttachMoneyIcon sx={{ color: "grey.500", mr: 1 }} />
            <Typography variant="body2">Tất cả mức giá</Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              bgcolor: "#EC80B1",
              borderRadius: "50px",
              px: 4,
              py: 1.5,
              textTransform: "none",
              width: { xs: "100%", lg: "20%" },
            }}
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Đang tìm..." : "Tìm kiếm"}
          </Button>
        </Box>
      </Paper>

      {/* Kết quả tìm kiếm */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ borderRadius: 5, p: 2 }}>
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

        <Grid item xs={12} md={9}>
          <Paper elevation={3} sx={{ borderRadius: 5, p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Danh sách du thuyền {loading && "(Đang tải...)"}
            </Typography>
            {!loading && ships.length === 0 && (
              <Typography align="center" color="text.secondary" py={4}>
                Không tìm thấy du thuyền nào phù hợp
              </Typography>
            )}
            {ships.map((ship) => (
              <LongCard
                data={ship}
                type="du-thuyen"
                idField="shipId"
                nameField="shipName"
                priceField="shipPrice"
              />
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <Stack spacing={2} alignItems="center" mt={3}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  shape="rounded"
                  disabled={loading}
                />
              </Stack>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TimDuThuyen;
