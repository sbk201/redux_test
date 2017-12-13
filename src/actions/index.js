import {questionList} from "../initData"
export const addNumber = () => {
  return {
    type: 'ADD_NUMBER'
  }
}

export const recordAt = (time) => {
  return {
    type: 'RECORD_AT',
    time
  }
}

export const addRecord = (time) => {
  return {
    type: 'ADD_RECORD',
    time
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