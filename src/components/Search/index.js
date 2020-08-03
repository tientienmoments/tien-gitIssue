import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const Search = ({ searchTerm, handleSubmit, handleChange }) => {
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row}>
          <Form.Label htmlFor="search" column sm={2}>
            {" "}
            {" "}
          </Form.Label>
          <Col sm="7">
            <Form.Control
              id="search"
              type="text"
              value={searchTerm}
              onChange={handleChange}
            ></Form.Control>
          </Col>
          <Button variant="outline-danger" style={{fontWeight:"bold"}} type="submit">Submit</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Search;
