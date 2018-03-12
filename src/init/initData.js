const blankData={
	// apidata:
	// {"created": "2013-11-04T13:26:13.772349", "id": 1, "image": "/media/img/1383571573.78.png", "modified": "2013-11-04T13:26:13.772310", "name": "Bulbasaur_red_blue", "pokemon": {"name": "bulbasaur", "resource_uri": "/api/v1/pokemon/1/"}, "resource_uri": "/api/v1/sprite/1/"}
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
export {blankData}
export default stateExport