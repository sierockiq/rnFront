import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../../components/Products/Single';

class ProductsSingleContainer extends Component {
  constructor() {
    super();
    this.state = { loading: false, error: null, product: {} };
  }

  componentDidMount = () => this.fetchProduct();

  /**
   * Fetch Data
   */
  fetchProduct = async () => {
    const { fetchProduct, id } = this.props;

    this.setState({ loading: true, error: null });

    try {
      const product = await fetchProduct(id);
      this.setState({ loading: false, error: null, product : product });
    } catch (err) {
      this.setState({ loading: false, error: err.message, product: {} });
    }
  };

  /**
   * Render
   */
  render = () => {
    const { loading, error, product } = this.state;

    return <Layout loading={loading} error={error} product={product} reFetch={this.fetchProduct} />;
  };
}

ProductsSingleContainer.propTypes = {
  fetchProduct: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ProductsSingleContainer.defaultProps = {
  id: null,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  fetchProduct: dispatch.products.fetchProduct,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsSingleContainer);
