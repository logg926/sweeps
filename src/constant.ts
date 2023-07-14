import { RootStackParamList } from "./navigation/router";

export const RED = "#ec6337";
export const YELLOW = "#f2cb78";
export const GREEN = "#4E937A"

interface ROUTE{
    Backlog: keyof RootStackParamList ,
    Doing: keyof RootStackParamList ,
    AddTodo: keyof RootStackParamList ,
    Done: keyof RootStackParamList ,
    SelectTime:keyof RootStackParamList
}

export const ROUTE: ROUTE = {
    Backlog: "Backlog",
    Doing: "Doing",
    AddTodo: "AddToDo",
    SelectTime:'SelectTime',
    Done:"Done"
}

export interface Time {
    title:string,
}

export const TIMES: (Time)[] = [ 
    {
    title: 'Later +3h',
  },
  {
    title: 'Tomorrow Eve',
  },
  {
    title: 'Tomorrow',
  },
  {
    title: 'Monday',
  },
  {
    title: 'This Weekend',
  },
  {
    title: 'Next Week',
  },
  {
    title: 'Unspecified',
  },
  {
    title:'At Location',
  },
  {
    title:'Pick A Date',
  }
]