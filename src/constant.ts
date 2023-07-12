import Icon from "react-native-vector-icons/Feather";

export const RED = "#ec6337";
export const YELLOW = "#f2cb78";
export const GREEN = "#4E937A"

export const ROUTE = {
    Backlog: "Backlog",
    Doing: "Doing",
    AddTodo: "AddTodo",
    Done: "Done",
    SelectTime:"SelectTime"
}

export interface Time {
    title:string,
    icon?:React.FC
}

export const TIMES: Time[] = [{
    title:'Later +3h',
    
},{
    title:'Tomorrow Eve',
   
},{
    title:'Tomorrow',
   
},{
    title:'Monday',
   
},{
    title:'This Weekend',
   
},{
    title:'Next Week',
   
},{
    title:'Unspecified',
   
},{
    title:'At Location',
   
},{
    title:'Pick A Date',
   
}]