
/* eslint linebreak-style: ["error", "windows"] */

import React from 'react';
import { Panel } from 'react-bootstrap';
import graphQLFetch from './graphQLFetch.js';

export default class ProductImage extends React.Component {
  constructor() {
    super();
    this.state = { products: [] };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const { match: { params: { id } } } = this.props;
    const query = `query Product($id: Int!) {
      Product(id: $id) {
        id category name Price Image
      }
    }`;

    const response = await graphQLFetch(query, { id });
    this.setState({ products: response.Product });
  }

  render() {
    const { products: { Image, name } } = this.state;
    return (
      <Panel>
        <Panel.Heading>
          <h2> Product Image View</h2>
          <h1>{name}</h1>
          <img src={Image} alt={name} style={{ width: 300, height: 300 }} />
        </Panel.Heading>
      </Panel>
    );
  }
}
