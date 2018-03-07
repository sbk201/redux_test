import {blankData} from "./initData"
import {flow,merge,cloneDeep as clone} from "lodash"; 
import {format as dateFormat} from 'date-fns'

export const isDev=process.env.NODE_ENV==='development';

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
	localSet('state',oldState.concat(nowState()));
	},
	clear:()=> {
		const length=State.getAll().length
		localSet('state',[])
		console.info(`${length} records cleared`);
	},
	test:()=>{
	},
}

// window.addEventListener('keyup', this.props.testFn);
// window.removeEventListener('keyup', this.props.testFn);
if(isDev) Object.assign(window,{localSet, localGet,State});

// https://stackoverflow.com/a/30452949/1507207
export default {...State}
