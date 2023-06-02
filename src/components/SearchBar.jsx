import React from "react";
import { Button, TextField, List, ListItem } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/CancelOutlined';
import bookService from "../service/book.service";
import { useState } from "react";

function SearchBar() {
    const [query, setQuery] = useState("");
    const [bookList, setBookList] = useState([]);
    const [openSearchResult, setOpenSearchResult] = useState(false);

    const searchBook = async () => {
        const res = await bookService.searchBook(query);
        setBookList(res.data.result);
    };

    const search = () => {
        searchBook();
        setOpenSearchResult(true);
    }
    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", columnGap: "10px" }}>
                <TextField id="outlined-basic" label="What are you looking for..." variant="outlined" style={{ height: "20px" }} onChange={(e) => { setQuery(e.target.value); }} />
                <Button variant="contained" color="success" startIcon={<SearchIcon />} style={{ height: "55px" }} onClick={search} >Search</Button>
                <Button variant="contained" color="error" startIcon={<CancelIcon />} style={{ height: "55px" }} onClick={() => { setOpenSearchResult(false); setQuery(""); }} >Cancel</Button>
            </div>
            {openSearchResult && (
                <div style={{ position: "absolute", padding: "15px", borderRadius: "5px", backgroundColor: "aquamarine"}}>
                    <List>
                        {bookList?.length > 0 && bookList.map((item, index) => (
                            <ListItem key={index}>
                                <div>
                                    <div>
                                        <p>{item.name}</p>
                                        <p>{item.description}</p>
                                    </div>
                                    <div>
                                        <p>{item.price}</p>
                                        <Button sx={{ color: "#f14d54", textTransform: "capitalize" }}>
                                            Add to Cart
                                        </Button>
                                    </div>
                                </div>
                            </ListItem>
                        ))}
                    </List>
                </div>
            )}
        </>
    );
};

export default SearchBar;