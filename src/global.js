
// var ranUnique=(len,record,that)=>{
// const removeList=record.slice(-len);
// const cleanList=that.filter(ele=>!removeList.includes(ele));
// const ran=~~(Math.random()*cleanList.length);
// console.log(cleanList[ran])
// return cleanList[ran]
// }
// ranUnique(5,[1,2,3,4,5,6,7,8,9],arr)

const loop= x => f => {
	if (x > 0) {
		f();
		loop (x - 1) (f);
	}
};
// https://stackoverflow.com/a/30452949/1507207
export default {loop};