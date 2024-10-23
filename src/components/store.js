import { createSlice, configureStore } from '@reduxjs/toolkit';
import { applyNodeChanges as applyNodeChangesFlow, applyEdgeChanges as applyEdgeChangesFlow, addEdge as addEdgeFlow } from '@xyflow/react';
import userReducer from './userSlice';

const initialState = {
  nodes: JSON.parse(localStorage.getItem('nodes')) || {},
  edges: JSON.parse(localStorage.getItem('edges')) || {},
  nodeTexts: JSON.parse(localStorage.getItem('nodeTexts')) || {},
  actions: JSON.parse(localStorage.getItem('actions')) || {},
};

const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    updateNodeText: (state, action) => {
      const { id, text, divId } = action.payload;

      if (!state.nodeTexts[divId]) {
        state.nodeTexts[divId] = {};
      }
      state.nodeTexts[divId][id] = text;

      if (!state.nodes[divId]) {
        state.nodes[divId] = [];
      }
      const nodeIndex = state.nodes[divId].findIndex(node => node.id === id);
      if (nodeIndex !== -1) {
        state.nodes[divId][nodeIndex].data.label = text;
      }

      localStorage.setItem('nodeTexts', JSON.stringify(state.nodeTexts));
      localStorage.setItem('nodes', JSON.stringify(state.nodes));
    },
    updateEdgeLabel: (state, action) => {
      const { id, label, divId } = action.payload;

      if (!state.edges[divId]) {
        state.edges[divId] = [];
      }
      const edgeIndex = state.edges[divId].findIndex(edge => edge.id === id);
      if (edgeIndex !== -1) {
        state.edges[divId][edgeIndex].data.label = label;
      }

      localStorage.setItem('edges', JSON.stringify(state.edges));
    },
    removeNode: (state, action) => {
      const { id, divId } = action.payload;

      if (!state.nodes[divId]) {
        state.nodes[divId] = [];
      }
      state.nodes[divId] = state.nodes[divId].filter(node => node.id !== id);
      if (!state.edges[divId]) {
        state.edges[divId] = [];
      }
      state.edges[divId] = state.edges[divId].filter(edge => edge.source !== id && edge.target !== id);
      if (state.nodeTexts[divId]) {
        delete state.nodeTexts[divId][id];
      }
      localStorage.setItem('nodes', JSON.stringify(state.nodes));
      localStorage.setItem('edges', JSON.stringify(state.edges));
      localStorage.setItem('nodeTexts', JSON.stringify(state.nodeTexts));
    },
    removeEdge: (state, action) => {
      const { id, divId } = action.payload;

      if (!state.edges[divId]) {
        state.edges[divId] = [];
      }
      state.edges[divId] = state.edges[divId].filter(edge => edge.id !== id);
      localStorage.setItem('edges', JSON.stringify(state.edges));
    },
    applyNodeChanges: (state, action) => {
      const { changes, divId } = action.payload;

      if (!state.nodes[divId]) {
        state.nodes[divId] = [];
      }
      state.nodes[divId] = applyNodeChangesFlow(changes, state.nodes[divId]);
      localStorage.setItem('nodes', JSON.stringify(state.nodes));
    },
    applyEdgeChanges: (state, action) => {
      const { changes, divId } = action.payload;

      if (!state.edges[divId]) {
        state.edges[divId] = [];
      }
      state.edges[divId] = applyEdgeChangesFlow(changes, state.edges[divId]);
      localStorage.setItem('edges', JSON.stringify(state.edges));
    },
    addEdge: (state, action) => {
      const { newEdge, divId } = action.payload;

      if (!state.edges[divId]) {
        state.edges[divId] = [];
      }
      state.edges[divId] = addEdgeFlow(newEdge, state.edges[divId]);
      if (!state.actions[divId]) {
        state.actions[divId] = [];
      }
      state.actions[divId].push({ type: 'addEdge', edge: newEdge });
      console.log('Action added:', { type: 'addEdge', edge: newEdge });
      console.log('Current actions:', state.actions[divId]);
      localStorage.setItem('edges', JSON.stringify(state.edges));
      localStorage.setItem('actions', JSON.stringify(state.actions));
    },
    addNode: (state, action) => {
      const { newNode, divId } = action.payload;

      if (!state.nodes[divId]) {
        state.nodes[divId] = [];
      }
      state.nodes[divId].push(newNode);
      if (!state.actions[divId]) {
        state.actions[divId] = [];
      }
      state.actions[divId].push({ type: 'addNode', node: newNode });
      console.log('Action added:', { type: 'addNode', node: newNode });
      console.log('Current actions:', state.actions[divId]);
      localStorage.setItem('nodes', JSON.stringify(state.nodes));
      localStorage.setItem('actions', JSON.stringify(state.actions));
    },
  },
});

export const { updateNodeText, updateEdgeLabel, removeNode, removeEdge, applyNodeChanges, applyEdgeChanges, addEdge, addNode } = nodesSlice.actions;

const store = configureStore({
  reducer: {
    nodes: nodesSlice.reducer,
    user: userReducer,
  },
});

export default store;
