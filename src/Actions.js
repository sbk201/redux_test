import dataImport from "./data";
import {isDev} from "./init/global";
// import store from "../index";
export const updateUI=cmd=>({type: "UPDATE_UI", ...cmd});
export const getMessage=message=>({type: "GET_MESSAGE", message });
export const addMessage=message=> ( {type: "ADD_MESSAGE", ...message});
export const delMessage=_id=> ( {type: "DELETE_MESSAGE", _id});
export const getIdeas=ideas=>({type: "GET_IDEAS", ideas });
// const link={
	// message:"http://localhost:5000/data",
// }
export const smart=(function() {
	return {
		getIdeas: ()=>async dispatch => {
			// const get=()=>isDev ? dataImport : getIdeasApi();
			// dispatch(getIdeas(await get()));
		},
		// getMessage: ()=>async dispatch => {
		// 	const message=await getMessageApi();
		// 	dispatch(getMessage(message));
		// 	console.log('got message,',message);
		// },
		// addMessage: param=> async dispatch => {
		// 	const {text,date}=await addMessageApi(param);
		// 	dispatch(addMessage({text,date}));
		// },
		// delMessage: _id=> async dispatch => {
		// 	const result=await delMessageApi(_id);
		// 	dispatch(delMessage(_id));
		// }
	}
})();
export const getIdeasApi=()=> {
    var clientContext = new window.SP.ClientContext("/teams/CI");
    var eventList = clientContext.get_web().get_lists().getByTitle('Ideas');
    var eventCamlQuery = new window.SP.CamlQuery();
    eventCamlQuery.set_viewXml(
        "<View><Query><Where><Neq><FieldRef Name='Status'/><Value Type='Text'>Closed</Value></Neq></Where></Query></View>"
    );
    let deferred=(function (){
    	let defer = {};
	    const promise = new Promise(function(resolve, reject) {
	    	defer={resolve, reject};
	    });
	    defer.promise = promise;
	    return defer;
    })();
    var collListItem = eventList.getItems(eventCamlQuery);
    clientContext.load(collListItem);
    clientContext.executeQueryAsync(
        Function.createDelegate(this, onFetchIdeasSucceeded),
        Function.createDelegate(this, onQueryError)
    );
    function onQueryError(sender, args) {
    	deferred.reject(args.get_message());
        alert(args.get_message());
    }
    function onFetchIdeasSucceeded(sender, args) {
        let ideaDataSet = [];
        let ideasList = collListItem.getEnumerator();
        if (collListItem.$2_0.$1H_0.length > 0) {
            while (ideasList.moveNext()) {
                var cListItem = ideasList.get_current();
                ideaDataSet.push({
                    "ID" : cListItem.get_item("ID"),
                    "Title": cListItem.get_item("Title"),
                    "Detail": cListItem.get_item("Detail"),
                    "Area": cListItem.get_item("Area"),
                    "Status": cListItem.get_item("Status"),
                    "Created": cListItem.get_item("Created"),
                    "DateDue": cListItem.get_item("DateDue"),
                    "DateCompleted": cListItem.get_item("DateCompleted"),
                });
            }
        }
    	deferred.resolve(ideaDataSet);
        // console.log('callback data',ideaDataSet);
        // getIdeas(ideaDataSet);
    }
    return deferred.promise;
} 
