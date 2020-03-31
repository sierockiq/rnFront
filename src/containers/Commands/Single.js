import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../../components/Commands/Single';

class CommandsSingleContainer extends Component {
  constructor(props) {
    super();

    this.state = {
      error: null, loading: false,
    };
  }
  /**
   * Render
   */
  render = () => {
    const {commands} = this.props;
    const { loading, error } = this.state;
    return (
      <Layout
        commands={commands}
        error={error}
        loading={loading}
      />
    );
  };
}
CommandsSingleContainer.propTypes = {
  commands: PropTypes.shape({
    listCommands: PropTypes.arrayOf(PropTypes.shape({})),
    price:PropTypes.number,
    quantity : PropTypes.number
  }).isRequired,
};

CommandsSingleContainer.defaultProps = {
  commands: {},
};

const mapStateToProps = (state) => ({
  commands : state.commands.singleCommand
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CommandsSingleContainer);
