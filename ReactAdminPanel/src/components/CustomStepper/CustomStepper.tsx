import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel, { StepLabelProps } from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import { createElement } from "react";
import LocalShipping from "@mui/icons-material/LocalShipping";
import DeliveryDining from "@mui/icons-material/DeliveryDining";
import { Cancel } from "@mui/icons-material";
import { Typography, useTheme } from "@mui/material";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import StorefrontIcon from "@mui/icons-material/Storefront";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

interface Props {
  orderStatus: string;
}

interface StepProps {
  label: string;
  icon: React.ReactNode;
  errormsg?: string;
}

const steps: StepProps[] = [
  {
    label: "Order Received",
    icon: createElement(Check),
  },
  {
    label: "Approved By Admin",
    icon: createElement(SupervisorAccountIcon),
    errormsg: "Rejected By Admin",
  },
  {
    label: "Approved By Supplier",
    icon: createElement(StorefrontIcon),
    errormsg: "Rejected By Supplier",
  },
  {
    label: "Order Shipped",
    icon: createElement(LocalShipping),
  },
  {
    label: "Order Delivered",
    icon: createElement(TaskAltIcon),
  },
];
export default function CustomStepper({ orderStatus }: Props) {
  let activeStep = 0;
  let completedSteps: string[] = [];
  let cancelledSteps: string[] = [];
  const theme = useTheme();
  switch (orderStatus) {
    case "approved":
      activeStep = 1;
      completedSteps = ["Order Received", "Approved By Admin"];
      break;
    case "processing":
      activeStep = 2;
      completedSteps = ["Order Received", "Approved By Admin", "Approved By Supplier"];
      break;
    case "shipped":
      activeStep = 3;
      completedSteps = ["Order Received", "Approved By Admin", "Approved By Supplier", "Order Shipped"];
      break;
    case "rejected":
      activeStep = 5;
      completedSteps = ["Order Received"];
      cancelledSteps = ["Approved By Admin"];
      break;
    case "cancelled":
      activeStep = 4;
      completedSteps = ["Order Received", "Approved By Admin", "Approved By Supplier"];
      cancelledSteps = ["Approved By Supplier"];
      break;
    default:
      activeStep = 0;
      completedSteps = ["Order Received"];
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(({ label, icon, errormsg }, index) => (
          <Step key={label} completed={completedSteps.includes(label)}>
            <StepLabel
              sx={{
                "& .MuiStepLabel-iconContainer": {
                  backgroundColor: completedSteps.includes(label) ? "green" : cancelledSteps.includes(label) ? "red" : theme.palette.grey[100],
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  color: "inherit",
                },
              }}
              icon={
                cancelledSteps.includes(label) ? (
                  <Cancel sx={{ color: "white" }} />
                ) : completedSteps.includes(label) ? (
                  <Check sx={{ color: "white" }} />
                ) : index === activeStep ? (
                  icon
                ) : (
                  icon
                )
              }
            >
              {cancelledSteps.includes(label) ? (
                <Typography variant="caption" color={"red"}>
                  {errormsg}
                </Typography>
              ) : (
                <Typography variant="caption" color={"inherit"}>
                  {label}
                </Typography>
              )}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
