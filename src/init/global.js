import blankData from "./blankData";
import moment from "moment";
import merge from "lodash/merge";
import clone from "lodash/cloneDeep";
import flow from "lodash/flow"; 
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
		const newState=flow([merge,clone])(blankData,State.get(id));
		State.set(newState);
		console.log(`reapply from id ${id}`);
	},
	save:(store,_createdAt_a,now)=>{
	const oldState=localGet('state') || [];
	const _createdAt=moment(_createdAt_a).format('DMMM h:mm:ss');
	const _updatedAt=()=>({_updatedAt:moment(now).format('DMMM h:mm:ss')});
	const nowState=()=>({...store.getState(),_createdAt,..._updatedAt()});
	localSet('state',oldState.concat(nowState()));
	},
	test:(num1,num2)=>{
		const add=(a,b)=>a+b;
		const sub5=(a)=>a-5;
		console.log(flow([add,sub5])(num1,num2));
	}
}
// view,load last,load specific one,unset,reset and merge what I have

const loop= x => f => {
	if (x > 0) {
		f();
		loop (x - 1) (f);
	}
};

// const toProp=(json)=> transform(json, {plugins: [jsonToProptypes] });
Object.assign(window,{localSet, localGet,State,loop})


// https://stackoverflow.com/a/30452949/1507207
export default {...State}
