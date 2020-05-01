/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-restricted-globals */

/* eslint linebreak-style: ["error", "windows"] */


import React from 'react';

// import { Label } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import ProductTable from './ProductTable.jsx';
import ProductAdd from './ProductAdd.jsx';
import graphQLFetch from './graphQLFetch.js';

export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { products: [] };
    this.deleteProduct = this.deleteProduct.bind(this);
    this.createProduct = this.createProduct.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
      productList{
        id name Price category Image
      }
      productsCount
    }`;
    const result = await graphQLFetch(query);
    this.setState({ products: result.productList, productsCount: result.productsCount });
  }

  async createProduct(newProduct) {
    const query = `mutation addProduct($newProduct: ProductInputs!) {
        addProduct(product: $newProduct) {
          id
        }
      }`;
    const response = await graphQLFetch(query, { newProduct });
    if (response) { this.loadData(); }
  }

  async deleteProduct(index) {
    const query = `mutation productDelete($id: Int!) {
      productDelete(id: $id)
    }`;
    const { products } = this.state;
    const { id } = products[index];
    const response = await graphQLFetch(query, { id });
    // const result = await response.json();
    if (response && response.productDelete) {
      this.setState((prevState) => {
        const newList = [...prevState.products];
        // eslint-disable-next-line no-undef
        newList.splice(index, 1);
        return { products: newList };
      });
    } else {
      this.loadData();
    }
  }


  render() {
    const { productsCount } = this.state;
    return (

      <React.Fragment>
        <Panel>
          <Panel.Heading>
            <Panel.Title>{`Showing all the available ${productsCount} products`}</Panel.Title>
          </Panel.Heading>
        </Panel>

        <ProductTable products={this.state.products} deleteProduct={this.deleteProduct} />

        <h4>Add a new product to inventory</h4>
        <hr />
        <ProductAdd createProduct={this.createProduct} />
      </React.Fragment>

    );
  }
}
