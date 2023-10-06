import { Box, Stack, useTheme, Typography, Button, Container, CircularProgress, Divider, Paper, Grid, Skeleton } from "@mui/material";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchOneOrder } from "../../../api/orderApi";
import ProductTable from "../../../components/common/table/ProductTable/ProductTable";
import StatusChips from "../../../components/common/StatusChips/StatusChips";
import CustomSnackBar from "../../../components/common/snackbar/Snackbar";
import CustomStepper from "../../../components/CustomStepper/CustomStepper";

export default function UserOrderView() {
  const { id } = useParams();
  const theme = useTheme();
  const [docID, setDocID] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "error",
    title: "",
  });

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["order-view", docID],
    queryFn: () => fetchOneOrder(docID),
  });

  useEffect(() => {
    setDocID(id!);
  }, [id]);

  console.log("id", data);
  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ mt: 5 }}>
        <SkeltonLoader />
      </Container>
    );
  }

  if (isError) {
    setNotify({
      isOpen: true,
      message: "Error occured while data loading",
      type: "error",
      title: "Error",
    });
  }
  return (
    <Container maxWidth="xl">
      <Stack sx={{ mt: 3, mb: 3 }} direction={"row"} justifyContent={"space-between"} alignContent={"baseline"}>
        <Typography variant="h4" fontWeight={"bold"}>
          Order Number #{data?.orderId}
        </Typography>
      </Stack>
      <Paper sx={{ p: 4 }}>
        <CustomStepper orderStatus={data?.status} />
      </Paper>

      <Grid container spacing={5} sx={{ mb: 5, mt: 5 }}>
        <Grid item xs={12} md={8}>
          <Stack direction="column" spacing={2}>
            <ProductTable cartItems={data?.orderItems ?? []} isLoading />
            <CustomerDetails
              email={data?.user?.email}
              isPaid={data?.isPaid}
              name={data?.user?.firstName + data?.user?.lastName}
              phone={data?.user?.contactNo}
              status={data?.status}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack direction="column" spacing={3}>
            <OrderSummary
              orderCreated={new Date(data?.createdAt).toLocaleDateString()}
              orderTime={new Date(data?.createdAt).toLocaleTimeString()}
              shipping={data?.shippingPrice?.toFixed(2)}
              subTotal={data?.totalPrice?.toFixed(2)}
            />
            <Paper>
              <Stack direction="row" justifyContent={"space-between"} alignItems={"center"} spacing={2} sx={{ p: 2 }}>
                <Typography variant="h5" fontWeight={"bold"}>
                  Total Price
                </Typography>
                <Typography variant="h5" fontWeight={"bold"}>
                  ${(data?.totalPrice + data?.shippingPrice).toFixed(2)}
                </Typography>
              </Stack>
            </Paper>
            <ShippingDetail
              address={data?.shippingAddress?.address}
              city={data?.shippingAddress?.city}
              country={data?.shippingAddress?.country}
              postalCode={data?.shippingAddress?.postalCode}
            />
          </Stack>
        </Grid>
      </Grid>
      <CustomSnackBar notify={notify} setNotify={setNotify} />
    </Container>
  );
}

interface ICustomerDetails {
  name: string;
  email: string;
  phone: string;
  status: string;
  isPaid: boolean;
}
function CustomerDetails({ name, email, phone, status, isPaid }: ICustomerDetails) {
  const details = [
    {
      name: "Customer Name",
      value: name,
    },
    {
      name: "Customer Email",
      value: email,
    },
    {
      name: "Customer Phone",
      value: phone,
    },
    {
      name: "Order Status",
      status: status,
      chip: true,
    },
    {
      name: "Payment Status",
      status: isPaid ? "paid" : "Not Paid",
      chip: true,
    },
  ];
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ pb: 5 }}>
        Customer And Order Details
      </Typography>
      <Divider />
      {details.map((detail, index) => {
        return (
          <Box sx={{ pt: 2, pb: 2 }}>
            <Stack key={detail.name + index} direction={"row"} justifyContent={"space-between"}>
              <Typography fontWeight={"bold"}>{detail.name}</Typography>

              {detail.chip ? StatusChips(detail.status) : <Typography>{detail.value}</Typography>}
            </Stack>
            <Divider />
          </Box>
        );
      })}
      <Stack direction={"row"} justifyContent={"space-between"}></Stack>
    </Paper>
  );
}

interface IOrderSummary {
  orderCreated: string;
  orderTime: string;
  subTotal: number;
  shipping: number;
}

function OrderSummary({ orderCreated, orderTime, subTotal, shipping }: IOrderSummary) {
  const val: string = "0.00";
  const details = [
    {
      name: "Order Created",
      value: orderCreated,
    },
    {
      name: "Order Time",
      value: orderTime,
    },
    {
      name: "Sub Total",
      value: subTotal,
    },
    {
      name: "Shipping",
      value: shipping,
      chip: true,
    },
  ];
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ pb: 3 }}>
        Order Summary
      </Typography>
      <Divider />
      {details.map((detail, index) => {
        return (
          <Box sx={{ pt: 2, pb: 2 }}>
            <Stack key={detail.name + index} direction={"row"} justifyContent={"space-between"}>
              <Typography fontWeight={"bold"}>{detail.name}</Typography>
              {detail.chip && detail.value <= 0 ? StatusChips("Free Shipping") : <Typography>{detail.value}</Typography>}
            </Stack>
          </Box>
        );
      })}
      <Stack direction={"row"} justifyContent={"space-between"}></Stack>
    </Paper>
  );
}

interface IShippingDetails {
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

function ShippingDetail({ address, city, country, postalCode }: IShippingDetails) {
  const details = [
    {
      name: "Address Line",
      value: address,
    },
    {
      name: "City",
      value: city,
    },
    {
      name: "Country",
      value: country,
    },
    {
      name: "Postal Code",
      value: postalCode,
    },
  ];
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ pb: 3 }}>
        Order Summary
      </Typography>
      <Divider />
      {details.map((detail, index) => {
        return (
          <Box sx={{ pt: 2, pb: 2 }}>
            <Stack key={detail.name + index} direction={"row"} justifyContent={"space-between"}>
              <Typography fontWeight={"bold"}>{detail.name}</Typography>
              <Typography>{detail.value}</Typography>
            </Stack>
          </Box>
        );
      })}
      <Stack direction={"row"} justifyContent={"space-between"}></Stack>
    </Paper>
  );
}

function SkeltonLoader() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <Stack direction="column" spacing={2}>
          <Skeleton variant="rectangular" width={"100%"} height={400} animation="wave" />
          <Skeleton variant="rounded" width={"100%"} height={400} animation="wave" />
        </Stack>
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack direction="column" spacing={3}>
          <Skeleton variant="rounded" width={"100%"} height={150} animation="wave" />
          <Skeleton variant="rounded" width={"100%"} height={150} animation="wave" />
          <Skeleton variant="rounded" width={"100%"} height={150} animation="wave" />
        </Stack>
      </Grid>
    </Grid>
  );
}
