import React from "react";
import {blankData} from "./initData"
import {flow,merge,cloneDeep as clone} from "lodash"; 
import {format as dateFormat} from 'date-fns'
import store from '../index';

export const _Input=that=>({refer,...rest})=><input ref={ele=>that[refer]=ele} {...{...rest}}/>;
export const objMap=(obj,fn)=> Object.entries(obj).map(([key,value])=>fn(key,value));
export const objLoop=(obj,fn)=> Object.entries(obj).reduce((acc,[key,va])=> ({...acc,...fn(key,va)}),{})
export const mergeClone=(...arg)=>merge(...arg.map(clone));
export const isDev=process.env.NODE_ENV==='development';
// to stop test mode,edit file .env or .env.local
export const isTest= isDev && process.env.REACT_APP_TEST_MODE==='true';
if(isTest) console.warn('Test mode on');

export const dummyData={
	customers:[
		{"globalCustName": "_TestCust001", "globalCustNbr": "_ATEST001",
		  "custName": "_testCust001", "localCustNbr": "999999"
		}, {
		  "globalCustName": "_TestCust002", "globalCustNbr": "_ATEST002",
		  "custName": "_testCust002", "localCustNbr": "999998"
		}, {
		  "globalCustName": "_TestCust003", "globalCustNbr": "_ATEST003",
		  "custName": "_testCust003", "localCustNbr": "999997"
		}, {
		  "globalCustName": "_TestCust004", "globalCustNbr": "_ATEST004",
		  "custName": "_testCust004", "localCustNbr": "999996"
		},
	],
	employee:[
		{"globalEmpName": "Test emp1", "globalEmpNbr": "999999"},
		{"globalEmpName": "Test emp2", "globalEmpNbr": "999998"},
		{"globalEmpName": "Test emp3", "globalEmpNbr": "999997"},
	]
}


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

// window.addEventListener('keyup', this.props.testFn);
// window.removeEventListener('keyup', this.props.testFn);
if(isDev) Object.assign(window,{localSet, localGet,State,st:State.get});

// https://stackoverflow.com/a/30452949/1507207
export default {...State};

;(function ie9Polyfill() {
	global.cancelAnimationFrame = function(callback) {
	  setTimeout(callback, 0);
	};
	(function requestAnimationFrame() {
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
	})();
	(function entries() {
		if (!Object.entries)
	 	Object.entries = function( obj ){
	    var ownProps = Object.keys( obj ),
	        i = ownProps.length,
	        resArray = new Array(i); // preallocate the Array
	    while (i--)
	      resArray[i] = [ownProps[i], obj[ownProps[i]]];

	    return resArray;
  		};
	})();
}());
