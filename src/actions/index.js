import {questionList} from "../initData"

export const addRecord = (time,question) => {
  return {
    type: 'ADD_RECORD',
    time,
    question,
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