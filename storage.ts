import { StateStorage } from 'zustand/middleware'
// import { MMKV } from 'react-native-mmkv'
import { create } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'

import { v4 as uuidv4 } from "uuid";
// const storage = new MMKV()



// export const zustandStorage: StateStorage = {
//     setItem: (name, value) => {
//         return storage.set(name, value)
//     },
//     getItem: (name) => {
//         const value = storage.getString(name)
//         return value ?? null
//     },
//     removeItem: (name) => {
//         return storage.delete(name)
//     },
// }

export interface Task {
    name: string,
    id: string
}
export type TaskArray = Task[]
interface MyState {
    backlog: TaskArray,
    doing: TaskArray,
    done: TaskArray,
    add: (task: Task) => void,
    setDoing: (taskArray: TaskArray) => void,
    setDone: (taskArray: TaskArray) => void,
    setBacklog: (taskArray: TaskArray) => void,
    backlogToDoing: (task: Task) => void,
    doingToDone: (task: Task) => void,
    doingToBacklog: (task: Task) => void,
    doneToDoing: (task: Task) => void,
}

const dummyInit = () => [{ name: "1234", id: uuidv4() }, { name: "hhdj", id: uuidv4() }]

type State = "backlog" | "doing" | "done"
const moveStateFactory = (from: State, to: State, set: any) => (myTask: Task) => set((state: MyState) => ({
    [from]: state[from].filter((tasks) => {
        return tasks.id !== myTask.id
    }), [to]: [...state[to], myTask]
}))



export const useStore = create<MyState>()(
    devtools(
        persist(
            (set, get) => ({
                backlog: [...dummyInit()],
                doing: [...dummyInit()],
                done: [...dummyInit()],
                add: (task) => set((state) => ({ doing: [...state.doing, task] })),
                setDoing: (taskArray: TaskArray) => set({ doing: taskArray }),
                setDone: (taskArray: TaskArray) => set({ done: taskArray }),
                setBacklog: (taskArray: TaskArray) => set({ backlog: taskArray }),
                // backlogToDoing: (myTask: Task) => set((state) => ({
                //     backlog: state.backlog.filter((backlogTask) => {
                //         return backlogTask.id !== myTask.id
                //     }), doing: [...state.doing, myTask]
                // })),
                backlogToDoing: moveStateFactory("backlog", "doing", set),
                doingToDone: moveStateFactory("doing", "done", set),

                doneToDoing: moveStateFactory("done", "doing", set),

                doingToBacklog: moveStateFactory("doing", "backlog", set),
            }),
            {
                name: 'mmkv-storage',
                // storage: createJSONStorage(() => zustandStorage),
            }
        )
    )
)