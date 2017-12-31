export const ranUnique=(_self,len,record)=>{
	const self=Array.isArray(_self) ? _self : [_self];
	const removeList=record.slice(-len);
	const cleanList=self.filter(ele=>!removeList.includes(ele));
	const ran=~~(Math.random()*cleanList.length);
	return cleanList[ran];
};

export const uniqueKey=({self,removing})=>{
	const output=self.arr.filter(ele=>{
  		const matched=removing.arr.find(ele2=>{
			return ele[self.key] === ele2[removing.key];
		});
		return !matched;
	});
	return output;
};
export const ran=(arr)=> arr[~~(Math.random()*arr.length)];


// Object.defineProperty(Array.prototype, "ran", {
 	// value: function() { return this[~~(Math.random()*this.length)]; }
// });

window.localSet=(key,thing)=>
  typeof thing === 'string' ?
  localStorage.setItem(key,thing):
  localStorage.setItem(key,JSON.stringify(thing));

window.localGet=key=> {
  try{
    return JSON.parse(localStorage.getItem(key))
  }catch(e){
    return localStorage.getItem(key)
  }
}
window.applyState= _id=>{
	const lastId= window.localGet('state').length-1;
	const id= Number.isInteger(_id) ? _id : lastId;
	id===-1 ?
	window.localSet('stateId',undefined) :
	window.localSet('stateId',id);

	window.location.reload();
};

const loop= x => f => {
	if (x > 0) {
		f();
		loop (x - 1) (f);
	}
};
// https://stackoverflow.com/a/30452949/1507207
export default {loop};