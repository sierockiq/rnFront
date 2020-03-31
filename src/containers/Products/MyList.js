import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyProductsList from '../../components/Products/MyList';
import { Actions } from 'react-native-router-flux';
class MyProductsListContainer extends Component {
  constructor() {
    super();
    this.state = { loading: false, error: null, myProducts : [],
                    errorDelete: null, successDelete: null, loadingDelete: false };
  }

  componentDidMount = () => this.fetchProduct();

  deleteProduct = async (id) => {
    const { deleteProduct} = this.props;
    this.setState({ errorDelete: null, successDelete: null, loadingDelete: true });
    try {
      const products = await deleteProduct(id);
      this.setState({ errorDelete: null, successDelete: "Produit bien supprimé", loadingDelete: false,myProducts : products});
    } catch (error) {
      this.setState({ errorDelete: error.message, successDelete: null, loadingDelete: false  });
    }
  }

  /**
   * Fetch Data
   */
  fetchProduct = async () => {
    const { fetchProduct, id } = this.props;

    this.setState({ loading: true, error: null,user: {} });

    try {
      const myProducts = await fetchProduct();
      this.setState({ loading: false, error: null, myProducts : myProducts });
    } catch (err) {
      this.setState({ loading: false, error: err.message, user: []});
    }
  };

  /**
   * Render
   */
  render = () => {
    const { loading, error, myProducts ,errorDelete, loadingDelete,successDelete} = this.state;
    return <MyProductsList
              loading={loading}
              error={error}
              myProducts={myProducts}
              reFetch={this.fetchProduct}
              deleteProduct={this.deleteProduct}
              errorForm={errorDelete}
              loadingForm={loadingDelete}
              successForm={successDelete}
            />;
  };
}

MyProductsListContainer.propTypes = {
  fetchProduct: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  deleteProduct: PropTypes.func.isRequired,
};

MyProductsListContainer.defaultProps = {
  id: null,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  fetchProduct: dispatch.products.fetchProduct,
  deleteProduct: dispatch.products.deleteProduct,
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProductsListContainer);
