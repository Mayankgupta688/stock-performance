export default function(state, action) {
    if(action.type === "COMPANY_DETAILS") {
        return action.payload;
    } else if(action.type === "ADD_COMPANY") {
        return [action.payload, ...state]
    } else return null;
}