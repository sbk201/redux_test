import {questionList} from "../initData"
export const addNumber = () => {
  return {
    type: 'ADD_NUMBER'
  }
}

export const addRecord = () => {
  return {
    type: 'ADD_RECORD'
  }
}

export const newQuestion = () => {
  const random=~~(Math.random()*questionList.length);
  const q=questionList[random];
  const question={ask:q.full,answer:q.short};
  return {
    type: 'NEW_QUESTION'
    ,question
  }
}