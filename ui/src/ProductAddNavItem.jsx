/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  NavItem, Modal, Form, FormGroup, FormControl, ControlLabel,
  Button, ButtonToolbar, Tooltip, OverlayTrigger, Glyphicon,
} from 'react-bootstrap';
import graphQLFetch from './graphQLFetch.js';
import Toast from './Toast.jsx';

class ProductAdddNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
      toastVisible: false,
      toastMessage: '',
      toastType: 'success',
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  showModal() {
    this.setState({ showing: true });
  }

  hideModal() {
    this.setState({ showing: false });
  }

  showError(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'danger',
    });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.hideModal();
    const form = document.forms.productAdd;
    const product = {
      name: form.Product_Name.value,
      // Price: Price > null ? Price : null,
      // Price: form.Price.value.replace('$', ''),
      Image: form.Image_URL.value,
      category: form.category.value,
    };
    const query = `mutation addProduct($newProduct: ProductInputs!) {
        addProduct(product: $newProduct) {
          id
        }
      }`;
    const data = await graphQLFetch(query, { product }, this.showError);
    if (data) {
      const { history } = this.props;
      history.push(`/edit/${data.productAdd.id}`);
    }
  }

  render() {
    const { showing } = this.state;
    const { toastVisible, toastMessage, toastType } = this.state;
    return (
      <React.Fragment>
        <NavItem onClick={this.showModal}>
          <OverlayTrigger
            placement="left"
            delayShow={1000}
            overlay={<Tooltip id="create-product">Create Product</Tooltip>}
          >
            <Glyphicon glyph="plus" />
          </OverlayTrigger>
        </NavItem>
        <Modal keyboard show={showing} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form name="productAdd">
              <FormGroup>
                <ControlLabel>name</ControlLabel>
                <FormControl name="name" autoFocus />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Image_URL</ControlLabel>
                <FormControl name="Image_uRL" />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button
                type="button"
                bsStyle="primary"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
              <Button bsStyle="link" onClick={this.hideModal}>Cancel</Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
        <Toast
          showing={toastVisible}
          onDismiss={this.dismissToast}
          bsStyle={toastType}
        >
          {toastMessage}
        </Toast>
      </React.Fragment>
    );
  }
}
export default withRouter(ProductAdddNavItem);
