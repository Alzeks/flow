import { useCallback, useState } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './App.css'
import { addNode, } from './store/nodeSlice';
import { type RootState } from './store/toolkit.ts'
import { useAppDispatch, useAppSelector } from './store/hook';
import { type Node, } from './types.ts'


export default function App() {

    const [value, setValue] = useState('')
    const [updateText, setUpdateText] = useState('')
    const [nodeId, setNodeId] = useState('')
    const [isRightBar, setIsRightBar] = useState(false)

    const { initialNodes, initialEdges } = useAppSelector((state: RootState) => state.node)
    const dispatch = useAppDispatch();

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => {
            return addEdge(params, eds)
        }),
        [setEdges],
    );

    const onElementClick = (event: any, element: Node) => {
        event//for typescript never read
        setIsRightBar((prev) => !prev);
        setNodeId(element.id)
    }

    const createNode = () => {
        const node: Node = {
            id: (nodes.length + 1).toString(),
            position: { x: 0, y: (nodes.length * 40) },
            data: { label: value }
        }
        setNodes((prev) => prev = [...prev, node])
        dispatch(addNode(node))
        setValue('')
    }

    const updateNode = () => {
        setNodes((nodes) =>
            nodes.map((node: Node) => {
                if (node.id === nodeId) {
                    return { ...node, data: { label: updateText } };
                }
                return node;
            }),
        );
    }

    return (
        <div className="container">
            <div style={{ width: '100vw', height: '92vh' }}>
                <div className='topBar'>
                    <input id='input1' name='input1' type='text'
                        onChange={(e) => setValue(e.target.value)}></input>
                    <button onClick={createNode}>Add task</button>
                </div>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    //nodeTypes={nodeTypes}
                    onNodeClick={onElementClick}
                    fitView
                >
                    <Controls />
                    <MiniMap />
                    <Background gap={12} size={1} />
                </ReactFlow>
            </div>
            {isRightBar &&
                <div className='rightBar'>
                    <input id='input2' name='input2' type='text' placeholder='Update chosen task'
                        onChange={(e) => setUpdateText(e.target.value)}></input>
                    <button onClick={updateNode}>Update</button>
                </div>
            }
        </div>
    )
}