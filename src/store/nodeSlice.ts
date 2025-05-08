import { createSlice, type PayloadAction, } from '@reduxjs/toolkit'
import { type Node, type Edge } from '../types'

type Initial = {
  initialNodes: Node[],
  initialEdges: Edge[]
}

const initialState: Initial = {
  initialNodes: [
    { id: '1', position: { x: 0, y: 0 }, data: { label: 'Start' } }
  ],
  initialEdges: [
    { id: 'e1-2', source: '1', target: '2' }
  ]
}

export const nodeSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<Node>) => {
      state.initialNodes.push(action.payload)
    },
    addAnEdge: (state, action: PayloadAction<Edge>) => {
      state.initialEdges.push(action.payload)
    },
  },
})

export const { addNode, addAnEdge } = nodeSlice.actions

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.counter.value

export default nodeSlice.reducer