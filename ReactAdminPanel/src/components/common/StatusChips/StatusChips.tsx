import { Chip } from "@mui/material";
import React from "react";

export default function StatusChips(status: string) {
  switch (status) {
    case "new":
      return <Chip label="New" color="info" />;
    case "approved":
      return <Chip label="Approved" color="success" />;
    case "rejected":
      return <Chip label="Rejected" color="error" />;
    case "shipped":
      return <Chip label="Shipped" color="success" />;
    case "cancelled":
      return <Chip label="Cancelled" color="error" />;
    case "processing":
      return <Chip label="Processing" color="warning" />;
    case "pending":
      return <Chip label="Pending" color="warning" />;
    case "delivered":
      return <Chip label="Delivered" color="success" />;
    case "paid":
      return <Chip label="Paid" color="success" />;
    default:
      return <Chip label={status} color="warning" />;
  }
}
