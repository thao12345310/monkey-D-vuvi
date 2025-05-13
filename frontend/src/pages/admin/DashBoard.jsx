import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import CountUp from "react-countup";

const DashboardCard = ({ title, value }) => {
  return (
    <Card className="shadow-md rounded-2xl">
      <CardContent>
        <Typography variant="h6" className="mb-2 text-gray-700">
          {title}
        </Typography>
        <Typography variant="h4" className="text-blue-600 font-bold">
          <CountUp end={value} separator="," />
        </Typography>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const data = [
    { title: "Active Users", value: 112893 },
    { title: "New Signups", value: 54321 },
    { title: "Total Sales", value: 78901 },
  ];

  return (
    <Grid container spacing={3}>
      {data.map((item, index) => (
        <Grid item xs={12} md={4} key={index}>
          <DashboardCard title={item.title} value={item.value} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Dashboard;
