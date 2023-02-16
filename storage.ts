import { StateStorage } from 'zustand/middleware'
// import { MMKV } from 'react-native-mmkv'
import { create } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'
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
}

const dummyInit = [{ name: "1234", id: "1" }, { name: "hhdj", id: "2" }]

export const useStore = create<MyState>()(
    devtools(
        persist(
            (set, get) => ({
                backlog: [...dummyInit],
                done: [...dummyInit],
                doing: [...dummyInit],
                add: (task) => set((state) => ({ doing: [...state.doing, task] })),
                setDoing: (taskArray: TaskArray) => set({ doing: taskArray }),
                setDone: (taskArray: TaskArray) => set({ done: taskArray }),
                setBacklog: (taskArray: TaskArray) => set({ backlog: taskArray }),
            }),
            {
                name: 'mmkv-storage',
                // storage: createJSONStorage(() => zustandStorage),
            }
        )
    )
)