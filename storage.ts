import { StateStorage } from 'zustand/middleware'
import { MMKV } from 'react-native-mmkv'
import { create } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'
const storage = new MMKV()

export const zustandStorage: StateStorage = {
    setItem: (name, value) => {
        return storage.set(name, value)
    },
    getItem: (name) => {
        const value = storage.getString(name)
        return value ?? null
    },
    removeItem: (name) => {
        return storage.delete(name)
    },
}

interface Task {
    name: string,
}
type TaskArray = Task[]
interface MyState {
    backlog: TaskArray,
    doing: TaskArray,
    done: TaskArray,
    add: (by: string) => void,
    setDoing: (taskArray: TaskArray) => void,
    setDone: (taskArray: TaskArray) => void,
    setBacklog: (taskArray: TaskArray) => void,
}


export const useStore = create<MyState>()(
    devtools(
        persist(
            (set, get) => ({
                backlog: [],
                done: [],
                doing: [],
                add: (task) => set((state) => ({ doing: [...state.doing, { name: task }] })),
                setDoing: (taskArray: TaskArray) => set({ doing: taskArray }),
                setDone: (taskArray: TaskArray) => set({ done: taskArray }),
                setBacklog: (taskArray: TaskArray) => set({ backlog: taskArray }),
            }),
            {
                name: 'mmkv-storage',
                storage: createJSONStorage(() => zustandStorage),
            }
        )
    )
)