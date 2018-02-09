import { connect } from "react-redux";
import { newQuestion,addRecord } from "../Actions.js";
import Selection from "../components/Selection";


const mapStateToProps = (state) => {
	return {
		question:state.question,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		newQuestion:({time,question})=>{
			dispatch(addRecord(time,question));
			dispatch(newQuestion());
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
			case 'F4': 
        console.log('f4')
        console.log(process.env);
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