import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { DeleteSummaryResponse, SummaryListResponse, SummaryResponse } from 'components/types/summary.types';

const API = '/api/summary'
const YT_API = '/api/summary/youtube'
/* interface SummaryInitial {
  status: string
  summary: SummaryResponse
} */

const summarys: SummaryListResponse[] = [];

/* const currentSummary: SummaryInitial = {
  status: 'idle',
  summary: {
    summary: {
      id: ''
    }
  }
} */

export const summarySlice = createSlice({
  name: 'Summarys',
  initialState: {
    list: summarys,
    errors: null,
    status: 'idle'
  },
  reducers: {
    setSummaryList: (state, action: PayloadAction<SummaryListResponse[]>) => {
      state.list = action.payload;
    },
/*     setCurrentSummaryStatus: (state, action: PayloadAction<string>) => {
      state.currentSummary.status = action.payload;
    }, */
  },
  extraReducers: (builder) => {
    builder.addCase(createSummaryFromYoutube.fulfilled, (state, { payload }) => {
      state.list = [...state.list, payload.summary]
      state.status = 'succeeded'
    }),
      builder.addCase(createSummaryFromYoutube.pending, (state) => {
        state.status = 'loading'
      }),
      builder.addCase(createSummaryFromYoutube.rejected, (state) => {
        state.status = 'rejected'
      }),
      builder.addCase(createSummary.fulfilled, (state, { payload }) => {
        state.list = [...state.list, payload.summary]
        state.status = 'succeeded'
      }),
      builder.addCase(createSummary.pending, (state) => {
        state.status = 'loading'
      }),
      builder.addCase(createSummary.rejected, (state, action) => {
        state.status = 'rejected'
      }),
      builder.addCase(getSummarys.fulfilled, (state, { payload }) => {
        state.list = [...payload]
        state.status = 'succeeded'
      }),
      builder.addCase(deleteSummary.fulfilled, (state, { payload }) => {
        state.list = [...state.list.filter(sum => sum.id !== payload.id)]
        state.status = 'succeeded'
      })
  }
});

export const createSummary = createAsyncThunk<SummaryResponse, FormData | undefined>('summarys/postSummary', async (video, thunkAPI) => {
  try {
    const source = video as FormData
    const { data } = await axios.post<SummaryResponse>(`${API}/file`, source)

    return data;

  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createSummaryFromYoutube = createAsyncThunk<SummaryResponse, string>('summarys/postSummaryFromYT', async (videoLink, thunkAPI) => {
  try {
    const { data } = await axios.post<SummaryResponse>(YT_API, { link: videoLink })
    return data;

  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getSummarys = createAsyncThunk<SummaryListResponse[]>('summary/getSummarys', async (_, thunkAPI) => {
  try {
    const { data } = await axios.get<SummaryListResponse[]>(API)
    return data;

  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteSummary = createAsyncThunk<DeleteSummaryResponse, string>('summary/deleteSummary', async (summaryId, thunkAPI) => {
  try {
    const { data } = await axios.delete<DeleteSummaryResponse>(`${API}/${summaryId}`)
    return data;

  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const { setSummaryList } = summarySlice.actions;
export default summarySlice.reducer;