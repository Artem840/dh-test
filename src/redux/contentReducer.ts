import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findIndexById } from "../findIndexById";
import { RootState } from "./store";

export interface ContentItemDTO {
    id: number
    title: string
    children: ContentItemDTO[] | []
}

interface ContentState {
    data: ContentItemDTO[] | []
    isLoading: boolean
    error?: string
}

const initialState: ContentState = {
    data: [],
    isLoading: true,
    error: ''
}

export const fetchContentList = createAsyncThunk(
    'content/fetchContentList',
    async () => 
        await fetch(`${process.env.REACT_APP_API_HOST}/content`).then(
            (response) => response.json()
        ) as Promise<ContentItemDTO>
)

export const fetchContentItem = createAsyncThunk(
    'content/fetchContentItem',
    async (id: number) => 
        await fetch(`${process.env.REACT_APP_API_HOST}/content?dirId=${id}`).then(
            (response) => response.json()
        ) as Promise<ContentItemDTO>
) 

const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContentList.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchContentList.fulfilled, (state, action) => {
                state.data = [...action.payload.children]
                state.isLoading = false
            })
            .addCase(fetchContentList.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            
            .addCase(fetchContentItem.fulfilled, (state, action) => {
                const path = findIndexById(state.data, action.payload.id)
                if (path) {
                    if (path.length > 1) {
                        let parent: any = state.data;
                        for (let i = 0; i < path.length - 1; i++) {
                            if (i === 0) {
                                parent = parent[path[i]]
                            } else {
                                parent = parent.children[path[i]]
                            }
                        }
                        parent.children[path[path.length - 1]] = action.payload
                    } else {
                        state.data[path[0]] = action.payload
                    }
                }
            })
    }
})

export const selectContent = (state: RootState) => state.content

export const contentReducer = contentSlice.reducer