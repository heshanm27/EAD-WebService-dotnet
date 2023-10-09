import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

export default function SearchField() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    navigate("/list", { state: { search } });
  };
  return (
    <Paper variant="outlined" component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "100%" }}>
      <InputBase
        onChange={(e) => setSearch(e.target.value)}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Products"
        inputProps={{ "aria-label": "search products" }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
