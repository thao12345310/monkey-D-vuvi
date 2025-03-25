import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
} from "@mui/material";
import backgroundImage from "../assets/hinhnen.webp";

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "90vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
        }}
      >
        <Container sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              maxWidth: 600,
              color: "white",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            <Typography variant="h2" gutterBottom>
              Khám phá Việt Nam
            </Typography>
            <Typography variant="h5" gutterBottom>
              Trải nghiệm những chuyến đi đáng nhớ cùng Monkey
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                bgcolor: "primary.main",
                color: "white",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              Khám phá ngay
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Popular Tours Section */}
      <Box sx={{ py: 8 }}>
        <Container>
          <Typography variant="h3" gutterBottom align="center">
            Tour Nổi Bật
          </Typography>
          <Grid container spacing={4}>
            {[1, 2, 3].map((item) => (
              <Grid item xs={12} md={4} key={item}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`/images/tour-${item}.jpg`}
                    alt={`Tour ${item}`}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Tour Du lịch Hạ Long
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Khám phá vẻ đẹp kỳ vĩ của Vịnh Hạ Long - Di sản thiên
                      nhiên thế giới
                    </Typography>
                    <Box
                      sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6" color="primary">
                        2,990,000đ
                      </Typography>
                      <Button variant="contained" color="primary">
                        Xem chi tiết
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Popular Destinations */}
      <Box sx={{ py: 8, bgcolor: "grey.100" }}>
        <Container>
          <Typography variant="h3" gutterBottom align="center">
            Điểm Đến Phổ Biến
          </Typography>
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`/images/destination-${item}.jpg`}
                    alt={`Destination ${item}`}
                  />
                  <CardContent>
                    <Typography variant="h6">Hà Nội</Typography>
                    <Typography variant="body2" color="text.secondary">
                      36 tour
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Blog Section */}
      <Box sx={{ py: 8 }}>
        <Container>
          <Typography variant="h3" gutterBottom align="center">
            Tin Tức & Blog Du Lịch
          </Typography>
          <Grid container spacing={4}>
            {[1, 2, 3].map((item) => (
              <Grid item xs={12} md={4} key={item}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`/images/blog-${item}.jpg`}
                    alt={`Blog ${item}`}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Top 10 địa điểm du lịch không thể bỏ qua
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Khám phá những địa điểm du lịch tuyệt vời nhất Việt Nam
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
