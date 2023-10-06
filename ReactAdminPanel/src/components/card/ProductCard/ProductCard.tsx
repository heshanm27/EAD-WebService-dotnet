import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, Stack } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppDispatch, useAppSelector } from "../../../redux/redux-hooks";
import { addToCart } from "../../../redux/cartslice";
import { useNavigate } from "react-router-dom";
interface ProductProps {
  productName: string;
  productPrice: number;
  productCode: string;
  productID: string;
  productImg: string;
  productStock: number;
}

export default function ProductCard({ productCode, productID, productImg, productName, productPrice, productStock }: ProductProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, total } = useAppSelector((state) => state.cartSlice);
  const handleAddToCart = () => {
    dispatch(addToCart({ productID, productName, productPrice, productImg, productStock }));
  };
  const handleBuyNow = () => {
    dispatch(addToCart({ productID, productName, productPrice, productImg, productStock }));
    navigate("/cart");
  };
  return (
    <Card sx={{ width: 280, height: "auto", maxHeight: 380, minHeight: 380 }}>
      <CardActionArea onClick={() => navigate(`/product/${productID}`)}>
        <CardMedia component="img" height="200" image={productImg} alt="Paella dish" />
        <CardContent sx={{ height: 120 }}>
          <Typography component={"p"} color="text.secondary" style={{ fontSize: "14px", overflow: "hidden", textOverflow: "ellipsis", lineHeight: "1.5em" }}>
            {productName}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>{`$${productPrice}`}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
          <Button variant="outlined" disabled={productStock <= 0 ? true : false} onClick={handleBuyNow}>
            Buy Now
          </Button>
          <Button variant="contained" disabled={productStock <= 0 ? true : false} startIcon={<ShoppingCartIcon />} onClick={handleAddToCart}>
            Add Cart
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
