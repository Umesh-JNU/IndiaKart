import React, { useState } from "react";
import { Form } from "@mui/material"
import { Form, Button, InputGroup } from "react-bootstrap";
import { Search as SearchIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const Search = () => {
  

  return (
    <>
      <Form className="d-flex m-auto middle" onSubmit={searchSubmitHandler}>
        <InputGroup>
          <Form.Control
            placeholder="Search a product ..."
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button type="submit" variant="outline-secondary" id="button-addon2">
            <SearchIcon />
          </Button>
        </InputGroup>
      </Form>
    </>
  );
};

export default Search;
