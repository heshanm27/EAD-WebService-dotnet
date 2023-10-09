import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  List,
  ListItem,
  Box,
  Typography,
  Slider,
  Stack,
  Pagination,
  CircularProgress,
  ListItemButton,
  ListItemText,
  Collapse,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import Navbar from "../../../components/common/navbar/navbar";
import Footer from "../../../components/common/footer/Footer";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { IFilter, fetchAllProducts } from "../../../api/productApi";
import ProductCard from "../../../components/card/ProductCard/ProductCard";
import CustomCirculerProgress from "../../../components/common/CustomCirculerProgress/CustomCirculerProgress";
import { fetchAllCategories } from "../../../api/categoryApi";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SortIcon from "@mui/icons-material/Sort";
import NoProductsIMG from "../../../assets/images/noproducts.svg";
import ClearIcon from "@mui/icons-material/Clear";
import { useLocation } from "react-router-dom";
export default function ProductListView() {
  const location = useLocation();
  console.log("loationstate", location);
  const queryClient = new QueryClient();
  const [filter, setFilter] = useState<IFilter>({
    cat: "",
    limit: 12,
    order: -1,
    page: 1,
    search: "",
    sortBy: "createdAt",
    subCat: [],
  });
  const [showClearButton, setShowClearButton] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuButton = (filterValue: string) => {
    setShowClearButton(true);
    switch (filterValue) {
      case "oldest":
        setFilter((prev: any) => ({
          ...prev,
          sortBy: "createdAt",
          order: 1,
        }));
        break;
      case "lowPrice":
        setFilter((prev: any) => ({
          ...prev,
          sortBy: "price",
          order: 1,
        }));
        break;
      case "highPrice":
        setFilter((prev: any) => ({
          ...prev,
          sortBy: "price",
          order: -1,
        }));
        break;
      default:
        setFilter((prev: any) => ({
          ...prev,
          sortBy: "createdAt",
          order: -1,
        }));
        break;
    }
    setAnchorEl(null);
  };
  function valuetext(value: number) {
    return `${value}USD`;
  }
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
    setFilter((prev: any) => ({
      ...prev,
      page,
    }));
  };

  const { data, error, isLoading, isError, isFetched } = useQuery({
    queryKey: ["productlist", filter],
    queryFn: () => fetchAllProducts(filter),
  });

  const { data: categories, isLoading: categoryLoading } = useQuery({
    queryFn: fetchAllCategories,
    queryKey: ["product-category"],
  });
  // const [minPrice, setMinPrice] = React.useState(1);
  // const [maxPrice, setMaxPrice] = React.useState(10000);
  console.log("productlist", data?.products);
  const mainCategoreySelect = (value: string) => {
    setShowClearButton(true);
    setFilter((prev: any) => ({
      ...prev,
      cat: value,
      subCat: [],
    }));
  };

  const subCategoreySelect = (value: string, mainId: string) => {
    setShowClearButton(true);
    setFilter((prev: any) => ({
      ...prev,
      subCat: value,
    }));
  };
  const handleClearFilters = () => {
    setFilter({
      cat: "",
      limit: 10,
      order: -1,
      page: 1,
      search: "",
      sortBy: "createdAt",
      subCat: [],
    });
    setShowClearButton(false);
  };
  useEffect(() => {
    if (location?.state?.search) {
      setShowClearButton(true);
      setFilter((prevFilter) => ({
        ...prevFilter,
        search: location?.state?.search,
      }));
    }
  }, [location]);
  return (
    <>
      <Navbar />

      <Container maxWidth="xl">
        <Grid container justifyContent={"space-between"}>
          <Grid item md={2}>
            <Box sx={{ minHeight: "60vh", width: "auto", p: 5 }}>
              <Typography>Shop by Category</Typography>
              <List>
                {categoryLoading ? (
                  <CircularProgress />
                ) : (
                  categories?.categories.map((category: any) => (
                    <CategoryButton
                      mainCategory={{
                        id: category._id,
                        name: category.name,
                      }}
                      key={category._id}
                      subCategories={category?.subCategory}
                      mainOnClick={mainCategoreySelect}
                      subOnClick={subCategoreySelect}
                    />
                  ))
                )}
              </List>

              {/* <Typography> FILTER BY BRANDS</Typography> */}
              {/* <List>{categoryLoading ? <CircularProgress /> : categories?.map((category: any) => <ListItem key={category}>{category}</ListItem>)}</List> */}
              {/* <Stack spacing={2}>
                <Typography> FILTER BY Price</Typography>
                <Slider
                  aria-label="Custom marks"
                  getAriaValueText={valuetext}
                  step={0.5}
                  valueLabelDisplay="auto"
                  marks={[
                    {
                      value: data?.minProductsPrice,
                      label: `$${data?.minProductsPrice}`,
                    },

                    {
                      value: data?.maxProductsPrice,
                      label: `$${data?.maxProductsPrice}`,
                    },
                  ]}
                />
              </Stack> */}
            </Box>
          </Grid>
          <Grid item md={10}>
            <Stack direction={showClearButton ? "row-reverse" : "row"} justifyContent={"space-between"} sx={{ mb: 5 }}>
              {showClearButton && (
                <Button variant="outlined" color="error" endIcon={<ClearIcon />} onClick={handleClearFilters}>
                  Clear Filters
                </Button>
              )}
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                endIcon={<SortIcon />}
              >
                Filters
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={() => handleMenuButton("newest")}>Newest</MenuItem>
                <MenuItem onClick={() => handleMenuButton("oldest")}>Oldest</MenuItem>
                <MenuItem onClick={() => handleMenuButton("lowPrice")}>Lower Price</MenuItem>
                <MenuItem onClick={() => handleMenuButton("highPrice")}>High Price</MenuItem>
              </Menu>
            </Stack>
            {!data?.products ? (
              <CustomCirculerProgress />
            ) : (
              <Grid container spacing={4} justifyContent={data?.products.length > 0 ? "start" : "center"}>
                {data?.products.length > 0 ? (
                  data?.products.map((item: any) => (
                    <Grid item xs={12} sm={6} md={6} lg={3} key={item._id}>
                      <ProductCard
                        productCode={item?.productCode}
                        productID={item._id}
                        productImg={item.images[0]}
                        productName={item.name}
                        productPrice={item.price}
                        productStock={item.stock}
                      />
                    </Grid>
                  ))
                ) : (
                  <NoProductToShow />
                )}
              </Grid>
            )}
          </Grid>
        </Grid>
        <Stack direction={"row"} justifyContent={"center"} sx={{ mt: 5 }}>
          <Pagination color="primary" page={page} count={data?.total} variant="outlined" shape="rounded" onChange={handlePageChange} />
        </Stack>
      </Container>

      <Footer />
    </>
  );
}

interface CategoryButtonProps {
  mainCategory: {
    name: string;
    id: string;
  };
  subCategories: string[];
  mainOnClick: (value: string) => void;
  subOnClick: (value: string, mainId: string) => void;
  key: any;
}
function CategoryButton({ mainCategory, subCategories, mainOnClick, subOnClick, key }: CategoryButtonProps) {
  const [open, setOpen] = useState(false);
  const [isCatActive, setIsActive] = useState("");
  const [isSubAtive, setIsSubActive] = useState("");

  const handleMainClick = () => {
    mainOnClick(mainCategory.id);
    setIsActive(mainCategory.id);
    setOpen((prev) => !prev);
  };

  const handleSubClick = (item: string) => {
    setIsSubActive(item);
    subOnClick(item, mainCategory.id);
  };

  const handleClearActive = () => {
    setIsActive("");
    setIsSubActive("");
  };

  console.log("check selectd", isCatActive, mainCategory.name);
  console.log("check select", isCatActive === mainCategory.name);
  return (
    <>
      <ListItemButton
        key={key}
        // sx={{ backgroundColor: isCatActive === mainCategory.name ? "#E9FBAD" : "" }}
        onClick={() => {
          setIsSubActive("");
          setIsActive("");
          setIsActive(mainCategory.name);
          setOpen((prev) => !prev);
          mainOnClick(mainCategory.id);
        }}
      >
        <ListItemText primary={mainCategory.name} />
        {subCategories.length > 0 ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItemButton>
      {subCategories.length > 0 ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List>
            {subCategories.map((item: string) => (
              <ListItemButton
                sx={{ backgroundColor: isSubAtive === item ? "#E9FBCD" : "inherit" }}
                key={item}
                onClick={() => {
                  setIsSubActive(item);
                  subOnClick(item, mainCategory.id);
                }}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      ) : null}
    </>
  );
}

function NoProductToShow() {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "50vh",
      }}
    >
      <Typography>Sorry! No Products Found</Typography>
      <img src={NoProductsIMG} alt="no product" width={200} height={200} />
    </Stack>
  );
}
