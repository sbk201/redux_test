import { connect } from 'react-redux'
import { updateUI,selectEmp } from '../Actions.js'
import Allocate from '../components/Allocate'
import { mergeClone,uniqueArrKey } from '../init/global';
const contName="Allocate";
const mapStateToProps = (state) => {
  const UI=state.localUI[contName] || {};
  const loading= UI.status==='loading';
  const finished= UI.status==='finished';
  const shareObj= UI.shareObj||{};
  const {pageView,employee,customers:customers_}=state;
  const customers=(function(){
    if(!customers_) return [];
    const selected= customers_.filter(ele=>ele.selected);
    const noRepeated=selected.filter(uniqueArrKey('globalCustNbr'));
    return noRepeated
  })();

  return {
    pageView,employee,customers, shareObj,UI, status:{loading,finished}
  }
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}))
  const getShare=params=>{
      const {e:{target:{value}},ele:{GlobalEmpNbr:id},theShareObj}=params
      const intValue=value|0;
      const item={[id]:intValue};
      const shareObj=theShareObj||{};
      return mergeClone(shareObj,item)
  }
  const sum=obj=>Object.entries(obj)
  .map(ele=>ele[1])
  .reduce((acc,next)=> ~~acc+~~next)
  return {
    updateUI:cmd=>dispatchUI(cmd),
    selectEmp:id=>dispatch(selectEmp(id)),
    updateShare:params=>{
      const shareObj=getShare(params);
      const total=sum(shareObj);
      dispatchUI({shareObj})
      if(total!==100) return dispatchUI({warning:true,confirm:false,message:`Total is ${total}%,it must be 100%`});
      if(total===100) return dispatchUI({warning:false,confirm:true});
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Allocate)