const blank={todos:[],visibleFilter:'all'};
// {text:'',done:false,_createdAt:NaN}
const stateId=window.localGet('stateId');
const stateSaved=()=>{
	const stateSaved_=window.localGet('state');
	if (!Number.isInteger(stateId) || !stateSaved_) return null
	const {_createdAt, _updatedAt,...stateSaved}=stateSaved_[stateId];
	return stateSaved
}
const stateExport=stateSaved() || blank;
console.log(`state ${stateId || ''} exported`,stateExport);

export default stateExport