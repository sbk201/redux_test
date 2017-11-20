import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

// React component
class Counter extends Component {
  render() {
    console.log(this.props);
    const { valueAdd,valueMinus, onIncreaseClick,onMinusClick } = this.props
    return (
      <div>
        <div>{valueAdd+valueMinus}</div>
        <button onClick={onIncreaseClick}>Increase</button>
        <button onClick={onMinusClick}>Decrease</button>
      </div>
    )
  }
}


Counter.propTypes = {
  valueAdd: PropTypes.number.isRequired,
  valueMinus: PropTypes.number.isRequired,
  onIncreaseClick: PropTypes.func.isRequired,
  onMinusClick: PropTypes.func.isRequired,
}

// Action
const increaseAction = { type: 'increase' }
const minusAction = { type: 'minus' }

// Map Redux state to component props
function mapStateToProps(state) {
  console.log(state);
  return {
    valueAdd: state.count.value,
    valueMinus: state.minus.value,
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction),
    onMinusClick:()=>dispatch(minusAction)
  }
}

// Connected Component
const CounterApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

export default CounterApp