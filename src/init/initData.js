const blankData={
	jobs: [
		{ "id": 9997, salary: 10000, "url": "https://hk.jobsdb.com/hk", "title": "Developer", "preDay": 300, "preHour": 100, "totalHours": 9 },
		{ "id": 9998, salary: 11000, "url": "https://www.ctgoodjobs.hk/", "title": "Casher", "preDay": 400, "preHour": 200, "totalHours": 9 },
		{ "id": 9999, salary: 12000, "url": "https://www.jobmarket.com.hk/", "title": "Sales", "preDay": 500, "preHour": 300, "totalHours": 9 },
	]
};
const localGet=key=> {
  try{
    return JSON.parse(localStorage.getItem(key))
  }catch(e){
    return localStorage.getItem(key)
  }
}
const stateId=localGet('stateId');
const stateSaved=()=>{
	const stateSaved_=localGet('state');
	if (!Number.isInteger(stateId) || !stateSaved_) return null
	if(!stateSaved_[stateId]) return blankData;
	const {_createdAt, _updatedAt,...stateSaved}=stateSaved_[stateId];
	return stateSaved
}
const stateExport=stateSaved() || blankData;
console.log(`state ${stateId || ''} exported`,stateExport);

const lastState = () => {
	const state = localGet('lastState') || blankData;
	return state
}

export { blankData, lastState };
export default stateExport