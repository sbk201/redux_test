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

const loop= x => f => {
	if (x > 0) {
		f();
		loop (x - 1) (f);
	}
};
// https://stackoverflow.com/a/30452949/1507207
export default {loop};