import { Avatar, Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Navbar from "../../../components/common/navbar/navbar";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Grid from "@mui/material/Grid";
import Footer from "../../../components/common/footer/Footer";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import GppGoodIcon from "@mui/icons-material/GppGood";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CarousalSlide, { ICrousalProps } from "../../../components/CarousalSlide/CarousalSlide";
import NewArrivals from "./NewArrivals/NewArrivals";
import PopularProducts from "./PopularProducts/PopularProducts";
import TopBrand from "./TopBrands/TopBrand";
export default function HomeView() {
  const items: ICrousalProps[] = [
    {
      button: "Buy Now",
      title: "Organic Hair Oil",
      description:
        "Ayurveda is a traditional Indian system of medicine. It aims to preserve health and wellness by keeping the mind, body, and spirit in balance and preventing disease rather than treating it. Ayurveda brings health and keeping the doshas in balance.",
      image: "https://cdn.shopify.com/s/files/1/0055/9064/6857/products/Chyavanaprasam_360x.jpg?v=1563436530",
    },
    {
      button: "Buy Now",
      title: "Kunkumadi Tailam",
      description:
        "Discoloration of face, pimples, wrinkles, premature greying of hair. For external application as well as nasyam. Gives colour and complexion for the skin.",
      image: "https://www.ayurkart.com/cdn/shop/products/Kumkumadi-tailam-kottakkal1_5e97adb7-7ff0-417b-8b1e-c059c19fb7d4_1200x1200.jpg?v=1599410994",
    },
    {
      button: "Buy Now",
      title: "Brahmi Caps",
      description:
        "Brahmi Caps (Bacopa monnieri) - very well known ayurvedic medicine for memory power, used as a memory booster, and other brain-related disorders",
      image: "https://www.ayurkart.com/cdn/shop/products/Brahmi-Caps_1200x1200.jpg?v=1563436516",
    },
    {
      button: "Buy Now",
      title: "Vilwadi Leham",
      description: "Ayurveda understand the cycle of nature, it provides what you need and makes the rhythm of life enjoyable in this dynamic circumstances.",
      image: "https://www.ayurkart.com/cdn/shop/products/Vilwadi-Leham_600x.jpg?v=1563436722",
    },
  ];

  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ marginTop: "20px" }}>
        <Box sx={{ maxHeight: "330px" }}>
          <Carousel
            animation="slide"
            cycleNavigation={true}
            NextIcon={<ArrowCircleRightIcon />}
            PrevIcon={<ArrowCircleLeftIcon />}
            swipe={true}
            indicators={false}
            fullHeightHover={true}
            autoPlay={true}
            navButtonsWrapperProps={{
              style: {},
            }}
            navButtonsProps={{
              style: {
                backgroundColor: "white",
                color: "#494949",
                borderRadius: "50%",
              },
            }}
          >
            {items.map((item, i) => (
              <CarousalSlide button={item.button} description={item.description} image={item.image} title={item.title} url={item.url} key={i} />
            ))}
          </Carousel>
        </Box>
        <NewArrivals />
        <PopularProducts />
        <TopBrand />

        <Wrapper />
      </Container>
      <Footer />
    </>
  );
}

function Item(props: any) {
  return (
    <Paper style={{ height: "300px", cursor: "pointer", pointerEvents: "none" }}>
      <Stack direction="row" justifyContent="space-around" alignItems="center" spacing={2}>
        {/* <Box width={"50%"} height={"300px"} sx={{ backgroundColor: "black" }}>
          <h2>{props.item.name}</h2>
          <p>{props.item.description}</p>
        </Box> */}
        <Box sx={{ p: 0 }}>
          <img src={props.item.img} alt="" style={{ height: "300px", width: "100%", zIndex: -1, objectFit: "cover" }} />
        </Box>
      </Stack>
    </Paper>
  );
}

function Wrapper() {
  const data = [
    {
      cover: <LocalShippingIcon color="primary" sx={{ width: "35px", height: "35px" }} />,
      title: "Free Delivery",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
    {
      cover: <PaymentIcon color="primary" sx={{ width: "35px", height: "35px" }} />,
      title: "Safe Payment",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
    {
      cover: <GppGoodIcon color="primary" sx={{ width: "35px", height: "35px" }} />,
      title: "Shop With Confidence ",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
    {
      cover: <SupportAgentIcon color="primary" sx={{ width: "35px", height: "35px" }} />,
      title: "24/7 Support ",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
  ];

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 5 }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {data.map((item, i) => (
            <Grid item xs={6} md={3} lg={3}>
              <Paper sx={{ p: 3, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <Avatar variant="circular" sx={{ bgcolor: "#f3f5f9", width: "70px", height: "70px" }}>
                  {item.cover}
                </Avatar>
                <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2, mb: 2 }} align="center">
                  {item.decs}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
