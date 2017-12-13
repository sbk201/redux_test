import { connect } from 'react-redux'
import { newQuestion,addRecord } from '../actions'
import Records from '../components/Records'

const toTimeSpent= records=>{
  const result=records.slice(1)
  .map((ele,th)=>ele-records[th])
  .map(ele=>~~(ele/100)/10)
  return result
}

const mapStateToProps = (state) => {
  return {
    spentArr:toTimeSpent(state.records)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // newQuestion:(time)=>{
      // dispatch(newQuestion());
      // dispatch(addRecord(time));
    // }
  }
}

const SelectionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Records)

export default SelectionContainer