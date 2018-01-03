import blankData from "./blankData";
import {flow,curry,merge,cloneDeep as clone} from "lodash"; 
// import curry from "lodash/curry"; 
import {format as dateFormat} from 'date-fns'
// import { transform } from "babel-core";
// import jsonToProptypes from "babel-plugin-json-to-proptypes"



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

const localSet=(key,thing)=>
  typeof thing === 'string' ?
  localStorage.setItem(key,thing):
  localStorage.setItem(key,JSON.stringify(thing));

const localGet=key=> {
  try{
    return JSON.parse(localStorage.getItem(key))
  }catch(e){
    return localStorage.getItem(key)
  }
}
const idApplied=localGet('stateId');
const idLast=()=>localGet('state').length-1;
const State={
	get: cmd=> {
		if(cmd==='all') return localGet('state');
		if(Number.isInteger(cmd)) return localGet('state')[cmd];
		return localGet('state')[idLast()];
	},
	getAll:()=> State.get('all'),
	apply:id=>{localSet('stateId',id);window.location.reload();},
	applyNot:()=>State.apply(undefined),
	applyLast:()=>State.apply(idLast()),
	set:(_state)=>{
		const stateArray=State.get('all').concat(_state);
		localSet('state',stateArray);
		localSet('stateId',idLast());
		window.location.reload();
	},
	reapply:(_id)=>{
		const id= Number.isInteger(_id) ? _id : idApplied;
		flow([merge,clone,State.set])(blankData,State.get(id));
		console.log(`reapply from id ${id}`);
	},
	save:(store,_createdAt_a,now)=>{
	const oldState=localGet('state') || [];
	const _createdAt=dateFormat(_createdAt_a,'DMMM h:mm:ss');
	const _updatedAt=()=>({_updatedAt:dateFormat(now,'DMMM h:mm:ss')});
	const nowState=()=>({...store.getState(),_createdAt,..._updatedAt()});
	console.log(_createdAt)
	localSet('state',oldState.concat(nowState()));
	},
	test:(num1,num2)=>{
		const add=(a,b)=>a+b;
		const sub5=(a)=>a-5;
		console.log(flow([add,sub5])(num1,num2));
	},
	test2:()=> flow([add,sub5])
	,
}
		const add=(a,b)=>a+b;
		const sub5=(a)=>a-5;
// view,load last,load specific one,unset,reset and merge what I have
window.curry=curry;
const loop= x => f => {
	if (x > 0) {
		f();
		loop (x - 1) (f);
	}
};

// const toProp=(json)=> transform(json, {plugins: [jsonToProptypes] });
Object.assign(window,{localSet, localGet,State,loop,flow,curry,merge,clone})


// https://stackoverflow.com/a/30452949/1507207
export default {...State}
