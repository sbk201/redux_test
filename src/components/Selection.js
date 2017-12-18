import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {questionList} from "../initData";
class Selection extends Component {
	componentDidMount() {
    window.addEventListener('keyup', this.props.testFn);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.props.testFn);
  }
	render(){
		const {question,newQuestion}=this.props;
		const listOne=questionList.filter(ele=>ele.index==="one");
		const listTwo=questionList.filter(ele=>ele.index==="two");
		const list=listOne.map((ele1,th)=>{
			const ele2=listTwo[th] ? listTwo[th] : {full:""};
			return [ele1.short,ele2.short];
		});
		const checkAnswer= e=>{
			const picked=e.target.innerText;
			const answer=question.answer;
			// const timeSpent=() - recordAt;
			picked===answer?
				actNewQuestion() :
				console.log("wrong");
		};
		const actNewQuestion=()=>newQuestion({time:new Date(),question:question.answer});
		const Button=styled.button`
		width:8em;
		height:2em;
		display: ${props => props.children ? "inherit" : "none" };
		`;
					/*<tr><th>希伯來語 及<br/>阿拉米語經卷</th><th>希臘語經卷</th></tr>*/
		return (
			<table>
				<thead>
					<tr><th>First</th><th>Second</th></tr>
				</thead>
				<tbody>
					{list.map((name,index)=>(
						<tr key={index}><td>
							<Button onClick={e=>checkAnswer(e)}>{name[0]}</Button>
						</td>
						<td>
							<Button onClick={e=>checkAnswer(e)}>{name[1]}</Button>
						</td></tr>))}
				</tbody>
			
			</table>
		);
		
	}

}

Selection.propTypes = {
	testFn:PropTypes.func.isRequired,
	newQuestion:PropTypes.func.isRequired,
	question:PropTypes.shape({
		ask: PropTypes.string.isRequired,
		answer: PropTypes.string.isRequired,
	}).isRequired,
};
export default Selection;