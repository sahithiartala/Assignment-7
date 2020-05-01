/* eslint-disable react/jsx-no-target-blank */


/* eslint linebreak-style: ["error", "windows"] */


import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import React from 'react';
import {
  Button, Glyphicon, OverlayTrigger, Tooltip, Table,
} from 'react-bootstrap';


export default function ProductTable({ products, deleteProduct }) {
  const productRows = products.map((product, index) => (

    <ProductRow
      key={product.id}
      product={product}
      deleteProduct={deleteProduct}
      index={index}
    />
  ));

  return (

    <Table bordered condensed hover responsive>
      <thead>

        <tr>
          <th>Product Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {productRows}
      </tbody>
    </Table>
  );
}
const editTooltip = (
  <Tooltip id="Edit-tooltip" placement="top">Edit Product</Tooltip>
);
const deleteTooltip = (
  <Tooltip id="delete-tooltip" placement="top">Delete Product</Tooltip>
);


const ProductRow = withRouter(({
  product, index, deleteProduct,

}) => (
  <tr>

    <td>{product.name}</td>
    <td>{product.category}</td>
    <td>{product.Price}</td>
    <td><a href={`/viewimage/${product.id}`} target="_blank"> View</a></td>
    <td>
      <LinkContainer to={`/edit/${product.id}`}>
        <OverlayTrigger delayShow={100} overlay={editTooltip}>
          <Button bsSize="xsmall">
            <Glyphicon glyph="edit" />
          </Button>
        </OverlayTrigger>
      </LinkContainer>

      <OverlayTrigger delayShow={100} overlay={deleteTooltip}>
        <Button bsSize="xsmall" type="button" onClick={() => { deleteProduct(index); }}>

          <Glyphicon glyph="trash" />
        </Button>
      </OverlayTrigger>


    </td>
  </tr>
));
