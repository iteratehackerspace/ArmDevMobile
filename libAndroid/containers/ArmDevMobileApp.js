'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import ArmDevMobile from '../components/ArmDevMobile';
import * as ArmDevMobileActions from '../actions/ArmDevMobileActions';
import { connect } from 'react-redux';

class ArmDevMobileApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions } = this.props;
    return (
      <ArmDevMobile
        {...actions} />
    );
  }
}

export default connect(state => ({
    state: state.counter
  }),
  (dispatch) => ({
    actions: bindActionCreators(ArmDevMobileActions, dispatch)
  })
)(ArmDevMobileApp);
