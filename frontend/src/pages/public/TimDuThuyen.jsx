import React, { useState, useEffect } from "react";
import config from "../../config";
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
    MenuItem,
} from "@mui/material";
import LongCard from "../../components/public/LongCard";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import axios from "axios";
import { handleErrorToast } from "../../utils/toastHandler";

const TimDuThuyen = () => {
    const [ships, setShips] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [trip, setTrip] = useState("");
    const [priceRangeOption, setPriceRangeOption] = useState(""); // dùng preset khoảng giá
    const [results, setResults] = useState([]);
    const DIA_DIEM_OPTIONS = [
        { value: "", label: "Tất cả địa điểm" },
        { value: "Vịnh Hạ Long", label: "Vịnh Hạ Long" },
        { value: "Vịnh Lan Hạ", label: "Vịnh Lan Hạ" },
        { value: "Vịnh Bái Tử Long", label: "Vịnh Bái Tử Long" },
    ];
    const PRICE_OPTIONS = [
        { label: "Tất cả mức giá", value: "" },
        { label: "Từ 1 đến 3 triệu", value: "1000000-3000000" },
        { label: "Từ 3 đến 6 triệu", value: "3000000-6000000" },
        { label: "Trên 6 triệu", value: "6000000-999999999" },
    ];

    const TIEN_ICH_OPTIONS = [
        { id: "hoBoi", label: "Hồ bơi", field: "hasPool" },
        { id: "wifi", label: "Wifi miễn phí", field: "hasWifi" },
        { id: "nhaHang", label: "Nhà hàng", field: "hasRestaurant" },
        { id: "spa", label: "Spa", field: "hasSpa" },
    ];

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
            const response = await axios.get(`${config.api.url}/api/ship?currentPage=${page}&pageSize=6`);
            const data = response.data;
            console.log("Dữ liệu nhận được:", data);
            setShips(data.result || []);
            setTotalPages(data.meta?.pages || 1);
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            handleErrorToast(error, "Đã có lỗi xảy ra khi tìm kiếm du thuyền!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShips(currentPage);
    }, [currentPage]);

    const handleSearch = async () => {
        const params = {};

        // Chỉ thêm name nếu có giá trị
        if (name && name.trim()) {
            params.name = name.trim();
        }

        // Chỉ thêm trip nếu có chọn địa điểm cụ thể
        if (trip && trip !== "") {
            params.trip = trip;
        }

        // Chỉ thêm khoảng giá nếu có thay đổi từ mặc định
        if (filters.giaRange[0] > 0 || filters.giaRange[1] < 10000000) {
            params.minPrice = filters.giaRange[0];
            params.maxPrice = filters.giaRange[1];
        }

        // Thêm tham số phân trang
        params.currentPage = currentPage;
        params.pageSize = 6;

        try {
            console.log("Search params:", params); // Log để debug
            const res = await axios.get(`${config.api.url}/api/ship/search`, {
                params,
            });

            // Xử lý response theo cấu trúc ResponseObject
            if (res.data && res.data.data) {
                const result = res.data.data;
                const shipsData = Array.isArray(result.result) ? result.result : [];
                setShips(shipsData);
                setTotalPages(result.meta?.pages || 1);
            } else {
                setShips([]);
                setTotalPages(1);
            }
        } catch (err) {
            console.error("Lỗi khi tìm kiếm du thuyền:", err);
            setShips([]);
            setTotalPages(1);
        }
    };

    // Thêm useEffect để gọi lại search khi currentPage thay đổi
    useEffect(() => {
        handleSearch();
    }, [currentPage]);

    // Thêm useEffect để reset về trang 1 khi thay đổi bộ lọc
    useEffect(() => {
        setCurrentPage(1);
    }, [name, trip, filters.giaRange, filters.rating, filters.tienIch]);

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

        // Cuộn lên đầu danh sách du thuyền
        const element = document.getElementById("danh-sach-du-thuyen");
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <div className="absolute inset-0 bg-[url('/background-pattern.svg')] bg-cover opacity-5 -z-10"></div>

            {/* Search Bar */}
            <Paper elevation={3} sx={{ px: 4, py: 5, borderRadius: 5, mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" align="center" gutterBottom color="#EC80B1">
                    Bạn lựa chọn du thuyền nào?
                </Typography>
                <Typography align="center" color="text.secondary" mb={4}>
                    Hơn 100 du thuyền hạng sang giá tốt đang chờ bạn
                </Typography>

                <Box display="flex" flexDirection={{ xs: "column", lg: "row" }} alignItems="center" gap={2}>
                    <Box
                        display="flex"
                        alignItems="center"
                        width={{ xs: "100%", lg: "40%" }}
                        bgcolor="grey.100"
                        px={2}
                        py={1.5}
                        borderRadius="50px"
                        height="50px"
                    >
                        <SearchIcon sx={{ color: "#EC80B1", mr: 1 }} />
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

                    {/* Chọn địa điểm */}
                    <Box
                        width={{ xs: "100%", lg: "20%" }}
                        bgcolor="grey.100"
                        px={2}
                        py={1.5}
                        borderRadius="50px"
                        height="50px"
                        display="flex"
                        alignItems="center"
                    >
                        <LocationOnIcon sx={{ color: "#EC80B1", mr: 1 }} />
                        <TextField
                            select
                            variant="standard"
                            value={trip}
                            onChange={(e) => setTrip(e.target.value)}
                            InputProps={{ disableUnderline: true }}
                            fullWidth
                            sx={{ height: "100%" }}
                        >
                            {DIA_DIEM_OPTIONS.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>

                    {/* Chọn mức giá */}
                    <Box
                        width={{ xs: "100%", lg: "20%" }}
                        bgcolor="grey.100"
                        px={2}
                        py={1.5}
                        borderRadius="50px"
                        height="50px"
                        display="flex"
                        alignItems="center"
                    >
                        <AttachMoneyIcon sx={{ color: "#EC80B1", mr: 1 }} />
                        <TextField
                            select
                            variant="standard"
                            value={priceRangeOption}
                            onChange={(e) => {
                                const val = e.target.value;
                                setPriceRangeOption(val);

                                if (val) {
                                    const [min, max] = val.split("-").map(Number);
                                    setFilters((prev) => ({
                                        ...prev,
                                        giaRange: [min, max],
                                    }));
                                }
                            }}
                            InputProps={{ disableUnderline: true }}
                            fullWidth
                            sx={{ height: "100%" }}
                        >
                            {PRICE_OPTIONS.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
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
                            height: "56px",
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
                    <Paper elevation={3} sx={{ borderRadius: 5, p: 3 }}>
                        <Typography variant="h6" gutterBottom fontWeight="bold" color="#EC80B1">
                            Bộ lọc
                        </Typography>

                        {/* Bộ lọc giá */}
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                                Khoảng giá (VNĐ)
                            </Typography>
                            <Slider
                                value={filters.giaRange}
                                onChange={handleGiaRangeChange}
                                valueLabelDisplay="auto"
                                min={0}
                                max={10000000}
                                step={100000}
                                valueLabelFormat={(value) => `${value.toLocaleString("vi-VN")}đ`}
                                sx={{
                                    color: "#EC80B1",
                                    "& .MuiSlider-thumb": {
                                        "&:hover, &.Mui-focusVisible": {
                                            boxShadow: "0px 0px 0px 8px rgba(236, 128, 177, 0.16)",
                                        },
                                    },
                                }}
                            />
                            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                                <Typography variant="body2" color="text.secondary">
                                    {filters.giaRange[0].toLocaleString("vi-VN")}đ
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {filters.giaRange[1].toLocaleString("vi-VN")}đ
                                </Typography>
                            </Box>
                        </Box>

                        {/* Bộ lọc đánh giá */}
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                                Đánh giá
                            </Typography>
                            <FormGroup>
                                {[5, 4, 3, 2, 1].map((rating) => (
                                    <FormControlLabel
                                        key={rating}
                                        control={
                                            <Checkbox
                                                checked={filters.rating === rating}
                                                onChange={() =>
                                                    setFilters((prev) => ({
                                                        ...prev,
                                                        rating: prev.rating === rating ? 0 : rating,
                                                    }))
                                                }
                                                sx={{
                                                    color: "#EC80B1",
                                                    "&.Mui-checked": {
                                                        color: "#EC80B1",
                                                    },
                                                }}
                                            />
                                        }
                                        label={
                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                {[...Array(rating)].map((_, i) => (
                                                    <span key={i} style={{ color: "#FFD700" }}>
                                                        ★
                                                    </span>
                                                ))}
                                                {[...Array(5 - rating)].map((_, i) => (
                                                    <span key={i} style={{ color: "#E0E0E0" }}>
                                                        ★
                                                    </span>
                                                ))}
                                                <Typography variant="body2" sx={{ ml: 1, color: "text.secondary" }}>
                                                    {rating === 5
                                                        ? "Tuyệt vời"
                                                        : rating === 4
                                                        ? "Rất tốt"
                                                        : rating === 3
                                                        ? "Tốt"
                                                        : rating === 2
                                                        ? "Trung bình"
                                                        : "Kém"}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                ))}
                            </FormGroup>
                        </Box>

                        {/* Bộ lọc tiện ích */}
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                                Tiện ích
                            </Typography>
                            <FormGroup>
                                {TIEN_ICH_OPTIONS.map((option) => (
                                    <FormControlLabel
                                        key={option.id}
                                        control={
                                            <Checkbox
                                                checked={filters.tienIch[option.id]}
                                                onChange={handleTienIchChange(option.id)}
                                                sx={{
                                                    color: "#EC80B1",
                                                    "&.Mui-checked": {
                                                        color: "#EC80B1",
                                                    },
                                                }}
                                            />
                                        }
                                        label={option.label}
                                    />
                                ))}
                            </FormGroup>
                        </Box>

                        {/* Nút áp dụng bộ lọc */}
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleSearch}
                            sx={{
                                bgcolor: "#EC80B1",
                                "&:hover": {
                                    bgcolor: "#d66d9e",
                                },
                                borderRadius: "25px",
                                py: 1.5,
                                textTransform: "none",
                                fontWeight: "bold",
                            }}
                        >
                            Áp dụng bộ lọc
                        </Button>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={9} id="danh-sach-du-thuyen">
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
                                key={ship.shipId}
                                data={ship}
                                type="du-thuyen"
                                idField="shipId"
                                nameField="shipName"
                                priceField="shipPrice"
                                imageField="thumbnail"
                            />
                        ))}

                        {/* Phân trang */}
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 2 }}>
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                                shape="rounded"
                                disabled={loading}
                                sx={{
                                    "& .MuiPaginationItem-root": {
                                        color: "#666",
                                        "&.Mui-selected": {
                                            backgroundColor: "#EC80B1",
                                            color: "white",
                                            "&:hover": {
                                                backgroundColor: "#d66d9e",
                                            },
                                        },
                                        "&:hover": {
                                            backgroundColor: "rgba(236, 128, 177, 0.1)",
                                        },
                                    },
                                }}
                            />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default TimDuThuyen;