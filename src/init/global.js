import React from "react";
import {blankData} from "./initData"
import {curry,flow,merge,cloneDeep as clone,reduce,mapValues} from "lodash"; 
import {format as dateFormat,differenceInDays} from 'date-fns'
import store from '../index';
import * as R from "ramda";
// const {sort,sortBy, prop, pick, map, mapObjIndexed, pipe}=R;
export const mapIndex= R.addIndex(R.map);
window.differenceInDays=differenceInDays;
global.cancelAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};
export const rename=(obj,from,to)=>{
  const {[from]:_,...rest}=obj;
  return {...rest,[to]:_};
}
export const _Input=that=>({refer,...rest})=><input ref={ele=>that[refer]=ele} {...{...rest}}/>;
export const switchFP=curry((val="",fp)=> {
  const res=fp(val).find(ele=>ele[0]);
  return res ? res[1] : null;
});
/*
switchFP(5,x=>[
  [x>3,"x is bigger than 3"],
  [x>5,"x is bigger than 5"],
  [x<5,"x is smaller than 5"],
  [x===5,"x is equal to 5"],
  [true,"default case,it's not a number"]
])
*/
export const mapProp= fn=> obj=> Object.values(obj)[0].map(fn);
export const mapProps= fn=> obj=> {
    const [array,...rest]=Object.values(obj);
    return array.map((tag,i)=> fn(tag,i)(rest));
  };
export const objMap=(obj,fn)=> Object.entries(obj).map(([key,va])=>fn([key,va]));
export const objMap2=(obj,fn)=> Object.entries(obj).map(([key,va])=>({[key]:fn([key,va])}));

export const objLoop=(obj,fn)=> Object.entries(obj).reduce((acc,[key,va])=>(Object.assign({},acc,fn([key,va]))),{});
export const objLoop2=(obj,fn)=> Object.entries(obj).reduce((acc,[key,va])=>(Object.assign({},acc,{[key]:fn([key,va])})),{});
// export const objLoop3=fn=>obj=> Object.entries(obj).reduce((acc,[key,va])=>(Object.assign({},acc,fn([key,va]))),{});
export const sumOfObjectBy=(array,key)=>array.reduce((self,value)=>self+value[key],0)

const toEntrie2=it=>Array.isArray(it)? it.map(e=>Object.entries(e)[0]) : Object.entries(it);
export const accum=(target,fn)=> toEntrie2(target).reduce((self,pair)=>self+fn(pair),0);
export const statBy=curry((theKey,array)=>
  array.map(e=>e[theKey]).reduce((self,key)=>{
  const amount= self[key] ? self[key]+1 : 1;
  // {amount:123,name:"key"}
  return Object.assign({},self,{[key]:amount})
  },{}))
// map(object,([key,va])=>{
  // return (key==='a' || key==='c') && 123
// })
export const assignWhere =(_object,_args)=>{
  const loop=(object,[key,fn])=>{
    const va=fn(object[key]);
    const pair={[key]:va};
    return Object.assign({},object,pair)
  }
  const loops=(object,args)=>{
    const [arg,...rest]=args;
    const newObj=loop(object,arg);
    if(rest.length===0) return newObj;
    return loops(newObj,rest)
  }
  const toArr=it=> (it.length===1) ? [it] : it;
  return loops(_object,toArr(_args));
}
export const assignWhereArr =(_array,_args)=>{
  const loop=(array,[key,fn])=> array.map(([k,v])=> ( k===key && [k,fn(v)] ) || [k,v]);
  const loops=(array,args)=>{
    const [arg,...rest]=args;
    const newArr=loop(array,arg);
    if(rest.length===0) return newArr;
    return loops(newArr,rest)
  }
  const toArr=it=> (it[0] && Array.isArray(it[0][0])) ? it : [it];
  return loops(_array,toArr(_args));
}

window.lib={mapValues,reduce,objMap,objMap2,objLoop,objLoop2,sumOfObjectBy,accum,statBy,toEntrie2,differenceInDays,assignWhere,assignWhereArr};
Object.assign(window,{...R})

/*
Usage:
var array=[{a:1},{b:2},{c:3}];
var object={a:1,b:2,c:3};

** objLoop2

objLoop2(obj,([key,va])=>va+5); //output {"a": 6, "b": 7, "c": 8 }
objLoop2(obj,([key,va])=>key==="a" ? va+10 : va); //output {"a": 11, "b": 2, "c": 3 }

** map

lib.map(array,([key,va])=>{
  if (key==='a' || key==='c'){
  return va+10
  }else{
  return 0
  }
})
only add 10 if it's a or c,then return the added value;
output: [ 11, 0, 13 ]

** accum

lib.accum(array,([key,va])=>{
  if (key==='a' || key==='c'){
  return va+10
  }else{
  return 0
  }
})
only add 10 if it's a or c,then return the sum of them
output:24
1+10 + 3+10=24

** statBy

var statArray=[
{fruit:"apple",other:"thing"},
{fruit:"banana",other:"things"},
{fruit:"apple",some:"thing"},
]
statBy(statArray,"fruit")
output : {apple:2,banana:1}

** assignWhere
assignWhere(object,[["a",v=>v+10]]) //{"a": 11, "b": 2, "c": 3 }
assignWhere(object,[["a",v=>v+10],["b",v=>v*100]]) //{"a": 11, "b": 200, "c": 3 }
*/

export const mergeClone=(...arg)=>merge(...arg.map(clone));
export const isDev = process.env.REACT_APP_SERVER_ENV === 'development';
export const uniqueArrKey = key => (ele, pos,self)=> self.findIndex(el2=>el2[key]===ele[key]) === pos;

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

export const loop= x => f => {
	if (x > 0) {
		f();
		loop (x - 1) (f);
	}
};

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
		if(Number.isInteger(cmd)) return localGet('state')[cmd];
		if(cmd==='all') return localGet('state');
		if(cmd==='saved') return localGet('state')[idLast()];
		if(!cmd) return store.getState();
	},
	getAll:()=> State.get('all'),
	getSaved:()=> State.get('saved'),
	apply:id=>{localSet('stateId',id);window.location.reload();},
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
	_save:(store,_createdAt_a)=>{
	const oldState=localGet('state') || [];
	const _createdAt=dateFormat(_createdAt_a,'DMMM h:mm:ss');
	const nowState={...store.getState(),_createdAt};
	localSet('state',oldState.concat(nowState));
	},
	save:async ()=>{
		const createdAt=new Date();
		State._save(store,createdAt);
		State.apply(idLast());
		console.log('saved at',idLast());
	},
	clear:()=> {
		const length=State.getAll().length
		localSet('state',[])
		localSet('stateId',0)
		console.info(`${length} records cleared`);
	},
	get test(){
		return this
	},
}
const clearState=()=> {delete localStorage.lastState};
// window.addEventListener('keyup', this.props.testFn);
// window.removeEventListener('keyup', this.props.testFn);
if (isDev) Object.assign(window, { clearState, localSet, localGet, State, flow, statBy });

// https://stackoverflow.com/a/30452949/1507207
export default {...State};
const save = (state) => {
  localSet("lastState",state)
}
export {save}
;(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());