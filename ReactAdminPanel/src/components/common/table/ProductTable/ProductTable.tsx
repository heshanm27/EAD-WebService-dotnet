import { Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import EmptyCartSVG from "../../../../assets/images/emptycart.svg";
import { OneKPlusOutlined } from "@mui/icons-material";

export default function ProductTable({ cartItems, isLoading }: any) {
  console.log("cartItems", cartItems[0]?.quantity);
  console.log("cartItemsggg", cartItems);
  return (
    <TableContainer component={Paper} variant="outlined" style={{ maxHeight: "50vh", overflowY: "auto" }}>
      <Table>
        <TableHead style={{ position: "sticky", top: 0, background: "white", zIndex: 1 }}>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            cartItems?.map((item: any) => (
              <TableRow key={item._id}>
                <TableCell sx={{ display: "flex", justifyContent: "left", alignItems: "start", flexDirection: "column" }}>
                  <img src={item?.product?.images[0]} alt={item?.name} style={{ width: "50px", height: "50px", borderRadius: "10px", margin: "5px" }} />
                  <Typography variant="caption" noWrap sx={{ textOverflow: "ellipsis", overflow: "hidden" }}>
                    {item?.product?.name}
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography sx={{ fontSize: "14px" }}>{item?.quantity} unit</Typography>
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <Typography variant="body1">${(item?.product?.price * item?.quantity).toFixed(2)}</Typography>
                  <Typography sx={{ display: "inline-flex", fontSize: "12px" }} color="text.secondary" noWrap>
                    each ${item?.product?.price.toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <CircularProgress />
          )}
        </TableBody>
      </Table>
      {isLoading ? (
        cartItems?.length === 0 && (
          <Box p={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <img src={EmptyCartSVG} alt="Empty Cart" style={{ width: "60px", height: "auto" }} />
            <Typography variant="body1" sx={{ mt: 2 }}>
              No items in the cart.
            </Typography>
          </Box>
        )
      ) : (
        <CircularProgress />
      )}
    </TableContainer>
  );
}
