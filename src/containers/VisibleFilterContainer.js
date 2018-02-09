import { connect } from 'react-redux'
import { toggleFilter } from '../Actions.js'
import VisibleFilter from '../components/VisibleFilter'

const mapStateToProps = (state) => {
  return {
    visibleFilter:state.visibleFilter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleFilter:(filter)=>dispatch(toggleFilter(filter)) 
  }
}

const VisibleFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VisibleFilter)

export default VisibleFilterContainer