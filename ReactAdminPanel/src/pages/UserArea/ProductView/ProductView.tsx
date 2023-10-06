import {
  Badge,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Paper,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import Navbar from "../../../components/common/navbar/navbar";
import Footer from "../../../components/common/footer/Footer";

import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { useLocation, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../../../api/productApi";
import CustomCirculerProgress from "../../../components/common/CustomCirculerProgress/CustomCirculerProgress";
import CustomSnackBar from "../../../components/common/snackbar/Snackbar";
import { Editor } from "@tinymce/tinymce-react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { addReview, fetchAllProductReviews } from "../../../api/reviewApi";
import { useAppDispatch, useAppSelector } from "../../../redux/redux-hooks";
import { addToCart } from "../../../redux/cartslice";

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];
// Example data set
// const reviewData = {
//   title: "Great product",
//   ratings: [
//     { rating: 1, votes: 0 },
//     { rating: 2, votes: 0 },
//     { rating: 3, votes: 0 },
//     { rating: 4, votes: 3 },
//     { rating: 5, votes: 5 },
//   ],
//   reviews: [
//     { name: "John", rating: 5, review: "I absolutely love this product! It exceeded my expectations." },
//     { name: "Sarah", rating: 4, review: "Great product! It works well and is easy to" },
//     { name: "Michael", rating: 3, review: "It's an okay product. It gets the job done, but could be improved." },
//     { name: "Emily", rating: 4.5, review: "I'm very happy with this product. It's reliable and efficient." },
//     // Add more reviews here...
//   ],
// };
interface IImageGallery {
  original: string;
  thumbnail: string;
}
function convertImageGalleryArray(items: string[]): IImageGallery[] {
  return items
    ? items?.map((item: any) => {
        return {
          original: item,
          thumbnail: item,
        };
      })
    : [];
}

export default function ProductView() {
  const parms = useParams();
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState<number>(1);
  const editorRef = useRef<any>(null);
  const [richText, setRichText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "error",
    title: "",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["product", parms.id],
    queryFn: () => fetchProduct(parms.id ?? ""),
    onError: (error: any) => {
      setNotify({
        isOpen: true,
        message: error.message,
        type: "error",
        title: "Error",
      });
    },
  });

  const { data: reviews, isLoading: isReview } = useQuery({
    queryKey: ["one-product-reviews", parms.id],
    queryFn: () => fetchAllProductReviews(parms?.id!),
  });

  const { mutate, isLoading: isReviewLooding } = useMutation({
    mutationFn: addReview,
    onSuccess: (data: any) => {
      setNotify({
        isOpen: true,
        message: data.message,
        type: "success",
        title: "Success",
      });
      setRating(0);
      editorRef.current.setContent("");
    },
    onError: (error: any) => {
      setNotify({
        isOpen: true,
        message: error.message,
        type: "error",
        title: "Error",
      });
    },
  });

  console.log(data);
  if (isLoading) {
    return <CustomCirculerProgress />;
  }
  const handleEditorChange = (content: any, editor: any) => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      if (setRichText.length > 100) {
        alert("You need to enter 100 words or more.");
        return;
      }
      setRichText(editorRef.current.getContent());
    }
  };

  const handleDecrease = () => {
    if (quantity <= 1) {
      setNotify({
        isOpen: true,
        message: "You can't add less than 1",
        type: "error",
        title: "Error",
      });
      return;
    }
    setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const handleIncrease = () => {
    if (quantity >= data?.product.stock) {
      setNotify({
        isOpen: true,
        message: "You can't add more than available stock",
        type: "error",
        title: "Error",
      });
      return;
    }
    console.log(quantity);
    setQuantity((prevQuantity: number) => prevQuantity + 1);
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleReviewSubmit = () => {
    console.log(richText, rating, parms.id);
    if (rating === 0) {
      setNotify({
        isOpen: true,
        message: "Please select rating",
        type: "error",
        title: "Error",
      });
      return;
    }
    if (richText.length < 1) {
      setNotify({
        isOpen: true,
        message: "You need to enter comment",
        type: "error",
        title: "Error",
      });
      return;
    }
    mutate({
      comment: richText,
      rating: rating,
      product: parms.id,
    });
  };
  const handleCart = () => {
    const productID = data?.product._id;
    const productName = data?.product.name;
    const productPrice = data?.product.price;
    const productImg = data?.product.images[0];
    const productStock = data?.product.stock;

    dispatch(addToCart({ productID, productName, productPrice, productImg, productStock }));
  };
  console.log("reviews", reviews);
  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} order={{ xs: 2, sm: 1 }}>
            <ImageGallery
              items={convertImageGalleryArray(data?.product.images)}
              thumbnailPosition="bottom"
              showFullscreenButton={false}
              showNav={false}
              autoPlay
            />
          </Grid>
          <Grid item xs={12} md={5} order={{ xs: 1, sm: 2 }}>
            <Stack direction="column" justifyContent="start" alignItems="start" spacing={1}>
              <Typography variant="h6" align="left" sx={{ textOverflow: "ellipsis", overflow: "hidden" }}>
                {data?.product.name}
              </Typography>
              <Typography variant="subtitle1" align="left" sx={{ textOverflow: "ellipsis", overflow: "hidden" }}>
                by{" "}
                <Link href="#" underline="hover">
                  {'underline="hover"'}
                </Link>
              </Typography>
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <Rating name="avg-rating" precision={0.5} value={5} readOnly />
              </Stack>
              <Divider sx={{ width: "100%" }} flexItem />
              <Typography></Typography>
              <Chip variant="outlined" color="primary" size="small" label={`Avaliable Stock ${data?.product.stock}`} />
              <Divider sx={{ width: "100%" }} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={3} order={{ xs: 3, sm: 3 }}>
            <Paper sx={{ p: 2 }} variant="outlined">
              <Typography variant="h4" align="left" sx={{ mb: 3 }}>
                US ${data?.product.price.toFixed(2)}
              </Typography>
              <Stack direction="column" justifyContent="center" alignItems="center" textAlign={"end"} spacing={2} width={"100%"}>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                  <Typography variant="h6" component="span" sx={{ textAlign: "center" }}>
                    Quantity:
                  </Typography>
                  <TextField
                    label="Quantity"
                    type="number"
                    value={quantity}
                    inputProps={{ min: 1, max: data?.product.stock, style: { textAlign: "center" }, readOnly: true }}
                    sx={{ "& .MuiInputBase-input": { textAlign: "center" } }}
                    InputProps={{
                      startAdornment: (
                        <IconButton onClick={handleDecrease}>
                          <RemoveIcon />
                        </IconButton>
                      ),
                      endAdornment: (
                        <>
                          <IconButton onClick={handleIncrease}>
                            <AddIcon />
                          </IconButton>
                        </>
                      ),
                    }}
                  />
                </Stack>
                <Button variant="contained" color="primary" sx={{ mb: 1, width: "50%" }} onClick={handleCart}>
                  Add to Cart
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
        <Box p={1}>
          <Paper sx={{ p: 2 }} variant="outlined">
            <Typography variant="h6">Product Overview</Typography>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Box sx={{ p: 2 }}>
              <div dangerouslySetInnerHTML={{ __html: data?.product.description }}></div>
            </Box>
          </Paper>
          {/* Add review and rating */}

          <Paper sx={{ p: 2, mt: 5, mb: 5 }} variant="outlined">
            <Stack direction={"column"} spacing={2}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="h6">Rate this product</Typography>
                <Rating
                  name="rating"
                  value={rating}
                  onChange={(event, newValue) => {
                    handleRatingChange(newValue!);
                  }}
                />
              </Stack>
              <Editor
                onInit={(evt, editor) => (editorRef!.current = editor)}
                onChange={handleEditorChange}
                apiKey="dzmmscs8w6nirjr0qay6mkqd0m5h0eowz658h3g6me0qe9s9"
                init={{
                  height: 200,
                  menubar: false,

                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help" +
                    "| image",
                  content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
              <Box mt={2} display="flex" justifyContent="end">
                <Button variant="contained" color="primary" onClick={handleReviewSubmit}>
                  {isReviewLooding ? <CircularProgress /> : "Submit Your Review"}
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Box>

        <ProductReview ratings={reviews?.review?.rateData} reviews={reviews?.review?.reviews} avgRating={reviews?.review?.avgRating} />
      </Container>
      <CustomSnackBar notify={notify} setNotify={setNotify} />
      <Footer />
    </>
  );
}
interface ReviewItem {
  name: string;
  review: string;
  rating: number;
}

interface ProductReviewProps {
  ratings: { rating: number; count: number }[];
  reviews: any;
  avgRating?: number;
}

const ProductReview: React.FC<ProductReviewProps> = ({ ratings, reviews, avgRating }) => {
  console.log("ggg", ratings, reviews);
  // Group reviews by rating in the same range (1-5)
  // const reviewsByRating: { [key: number]: ReviewItem[] } = {};
  // reviews.forEach((review:any) => {
  //   const rating = Math.floor(review.rating);
  //   if (!reviewsByRating[rating]) {
  //     reviewsByRating[rating] = [];
  //   }
  //   reviewsByRating[rating].push(review);
  // });

  // Display up to 10 reviews

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2 }} variant="outlined">
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Stack direction={"row"} spacing={2}>
              <Typography variant="h3">{avgRating?.toFixed(1)}</Typography>
              <Stack>
                <Rating name="avg-rating" precision={0.5} value={avgRating!} readOnly sx={{ my: 1 }} />
                <Typography variant="body1">Based on {reviews?.length} reviews</Typography>
              </Stack>
            </Stack>
            <Box sx={{ mt: 1 }}>
              {ratings?.map(({ rating, count }, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                  <Rating value={rating} max={5} precision={0.5} readOnly />
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    ({count} {count === 1 ? "vote" : "votes"})
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={9}>
        <Box sx={{ overflow: "auto", height: 400 }}>
          {reviews?.map((val: any, index: number) => (
            <Paper sx={{ p: 2, borderRadius: "10px", mt: index > 0 ? 2 : 0, mb: 2 }} variant="outlined">
              <Box key={index}>
                <Typography variant="subtitle1">{val?.user?.firstName + val.user.lastName}</Typography>
                <Rating value={val?.rating} max={5} precision={0.5} readOnly />
                <div dangerouslySetInnerHTML={{ __html: val.comment }}></div>
              </Box>
            </Paper>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};
