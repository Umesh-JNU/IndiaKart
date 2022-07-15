import React, { useState } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { CgSearch } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
const Search = () => {
    const navigate = useNavigate();

    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        console.log(keyword)
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate(`/products`);
        }
    };

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
                        <CgSearch />
                    </Button>
                </InputGroup>
            </Form>
        </>
    )
}

export default Search