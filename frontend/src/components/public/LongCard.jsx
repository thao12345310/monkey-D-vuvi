import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Box, Rating, Chip, Stack, Button } from "@mui/material";
import { LocationOn, Pool, Wifi, Restaurant } from "@mui/icons-material";

const LongCard = ({
    data,
    idField = "hotelId",
    nameField = "hotelName",
    priceField = "hotelPrice",
    type = "khach-san", // hoặc "du-thuyen"
    imageField = "hinhAnh",
    tienIch = ["Hồ bơi", "Wifi miễn phí", "Nhà hàng"],
}) => {
    const navigate = useNavigate();
    const id = data[idField];
    const name = data[nameField];
    const price = data[priceField];
    const image = data[imageField] || "https://picsum.photos/400/300";

    const handleClick = () => {
        navigate(`/${type}/${id}`);
    };

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
                alignItems: "center",
                padding: "10px",
                borderRadius: "10px",
                border: "2px solid #e0e0e0",
            }}
            onClick={handleClick}
        >
            <CardMedia component="img" sx={{ width: 280, height: 210, borderRadius: "10px" }} image={image} alt={name} />
            <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        {name}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Rating value={ratingMock} readOnly precision={0.5} size="small" />
                        <Typography variant="body2" sx={{ ml: 1 }} color="text.secondary">
                            ({soReviewMock} đánh giá)
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <LocationOn fontSize="small" color="action" />
                        <Typography variant="body2" sx={{ ml: 0.5 }} color="text.secondary">
                            {data.address}
                        </Typography>
                    </Box>

                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                        {tienIch.map((tienIch, index) => (
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
                            {price.toLocaleString("vi-VN")}đ
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            /đêm
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/${type}/${id}/dat-phong`);
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

export default LongCard;
