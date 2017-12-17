import { connect } from "react-redux";
import { newQuestion,addRecord } from "../actions";
import Selection from "../components/Selection";


const mapStateToProps = (state) => {
	return {
		question:state.question,
		recordAt:state.recordAt,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		newQuestion:({time,question})=>{
			dispatch(newQuestion());
			dispatch(addRecord(time,question));
		},
		testFn:(e)=>{
			switch (e.key){
      case 'F2': 
        window.loop(2)(()=>{
          const answer=window.store.getState().question.answer;
          dispatch(addRecord(new Date(),answer));
          dispatch(newQuestion());
        });
        return;
			case 'F3': 
        console.log('f3')
				return;
			default:return;
			}
		},
	};
};

const SelectionContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Selection);

export default SelectionContainer;