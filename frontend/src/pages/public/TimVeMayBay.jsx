import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Button,
  InputAdornment,
  Divider,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import PersonIcon from "@mui/icons-material/Person";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";

const TimVeMayBay = () => {
  const [tripType, setTripType] = useState("oneWay");
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const handlePassengerChange = (type, value) => {
    setPassengers((prev) => ({
      ...prev,
      [type]: Math.max(0, parseInt(value) || 0),
    }));
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", py: 4 }}>
      <Container>
        {/* Hero Section */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Mở cánh cửa khám phá cùng 🐒D Luffy
          </Typography>
          <Typography variant="h5" color="text.secondary">
            🐒D Luffy - Đặt chân lên đỉnh mây với một bước nhảy
          </Typography>
        </Box>

        {/* Search Form */}
        <Card sx={{ mb: 6 }}>
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={3}>
              {/* Trip Type Selection */}
              <Grid item xs={12}>
                <RadioGroup
                  row
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                >
                  <FormControlLabel
                    value="oneWay"
                    control={<Radio />}
                    label="Một chiều"
                  />
                  <FormControlLabel
                    value="roundTrip"
                    control={<Radio />}
                    label="Khứ hồi"
                  />
                  <FormControlLabel
                    value="multiCity"
                    control={<Radio />}
                    label="Vé rẻ nhất tháng"
                  />
                </RadioGroup>
              </Grid>

              {/* Departure & Arrival */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Điểm đi"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FlightTakeoffIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Điểm đến"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FlightLandIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Dates */}
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Ngày đi"
                    value={departureDate}
                    onChange={(newValue) => setDepartureDate(newValue)}
                    sx={{ width: "100%" }}
                  />
                </LocalizationProvider>
              </Grid>
              {tripType === "roundTrip" && (
                <Grid item xs={12} md={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Ngày về"
                      value={returnDate}
                      onChange={(newValue) => setReturnDate(newValue)}
                      sx={{ width: "100%" }}
                    />
                  </LocalizationProvider>
                </Grid>
              )}

              {/* Passengers */}
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Người lớn"
                  type="number"
                  value={passengers.adults}
                  onChange={(e) =>
                    handlePassengerChange("adults", e.target.value)
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Trẻ em"
                  type="number"
                  value={passengers.children}
                  onChange={(e) =>
                    handlePassengerChange("children", e.target.value)
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ChildCareIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Em bé"
                  type="number"
                  value={passengers.infants}
                  onChange={(e) =>
                    handlePassengerChange("infants", e.target.value)
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BabyChangingStationIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Search Button */}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Tìm chuyến bay
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Reviews Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Đánh giá từ những người đã trải nghiệm
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Khách hàng chia sẻ về những kỷ niệm tuyệt vời trên chuyến du lịch
            với chúng tôi.
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    "Chuyến bay của chị và gia đình đi chơi rất thuận lợi em ạ.
                    May là chị đặt vé bên em. Bên em tư vấn chọn chuyến cho chị
                    xong lại check in online cho chị nữa nên cả nhà được ngồi
                    gần nhau. Bạn lớn nhà chị được ngồi cạnh cửa sổ nhìn ngắm
                    lúc cất cánh thích lắm! Nhà chị cũng thường xuyên đi chơi
                    nên chị sẽ đặt vé bên em nhiều nhiều!"
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    - Chị Lê Thủy
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Partners Section */}
        <Box>
          <Typography variant="h4" align="center" gutterBottom>
            Đối tác cùng các hãng máy bay lớn
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Đối tác hàng đầu với các hãng máy bay lớn: Ưu đãi độc quyền dành
            riêng cho bạn
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {/* Placeholder for airline logos */}
            {[1, 2, 3, 4, 5].map((item) => (
              <Grid item key={item}>
                <Box
                  component="img"
                  src={`/images/airline-${item}.png`}
                  alt={`Airline ${item}`}
                  sx={{ height: 60, filter: "grayscale(100%)", opacity: 0.7 }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default TimVeMayBay;
