import React from "react";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import Navbar from "../../../components/common/navbar/navbar";
import Footer from "../../../components/common/footer/Footer";

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Box sx={{ pt: 5, pb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Welcome to Nature Ayur
            </Typography>
            <Typography variant="body1" paragraph>
              We are your one-stop shop for all your Ayurvedic needs. Our online store offers a wide range of Ayurvedic products that cater to various
              categories, including health care, personal care, lifestyle, and baby care.
            </Typography>
            <Typography variant="body1" paragraph>
              Established in 2023, Nature Ayur is dedicated to providing high-quality and authentic Ayurvedic products to our customers. We understand the
              importance of using natural ingredients for overall well-being and believe in the power of Ayurveda to help maintain a healthy lifestyle.
            </Typography>
            <Typography variant="body1" paragraph>
              Our product range includes popular brands such as Green Hopes,Naturelle, O’nelle Naturals, Kasturi, Kashvi, And Himalaya Herbals. Each of these
              brands has been carefully selected to ensure that our customers receive only the best products.
            </Typography>
            <Typography variant="body1" paragraph>
              At Nature Ayur, we prioritize our customers' safety and convenience. We provide secure payment methods and reliable shipping options to ensure
              that our customers have a hassle-free shopping experience.
            </Typography>
            <Typography variant="body1" paragraph>
              Thank you for choosing Nature Ayur. We look forward to serving you and helping you achieve a healthier and happier life with our Ayurvedic
              products.
            </Typography>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </>
  );
}
