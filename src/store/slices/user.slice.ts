import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Credentials, User, UserEditPayload, ResumiaUser } from 'components/types/user.types'
import { signIn } from 'next-auth/react';

const API = '/api'
const users: User[] = [];

type Status = 'idle' | 'loading' | 'succeeded'
interface UserInitial {
  user: ResumiaUser
  status: Status
}

interface InitialState {
  list: User[]
  currentUser: UserInitial
  status: Status
}

const currentUser: UserInitial  = {
  user:  {
    id: '',
    fullName: '',
    email: '',
    image: '',
    name: ''
  },
  status: 'idle',
}

const initialState: InitialState= {
  list: users,
  currentUser,
  status: 'idle'
}


export const userSlice = createSlice({
  name: 'Users',
  initialState: initialState,
  reducers: {
    setUsersList: (state, action: PayloadAction<User[]>) => {
      state.list = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<ResumiaUser>) => {
      state.currentUser.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.list = [...state.list, payload]
      state.status = 'succeeded'
    }),
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.currentUser.user = { ...payload };
      state.currentUser.status = 'succeeded';
      state.status = 'succeeded'
    }),
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.currentUser.user = { ...payload };
      state.status = 'succeeded'
    })
    builder.addCase(createUser.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(createUser.rejected, (state) => {
      state.status = 'idle'
    })
  },
});

export const createUser = createAsyncThunk<User, User>('users/postUser', async (user, thunkAPI) => {
  try {
    const { data } = await axios.post<User>(`${API}/auth/sign-up`, user)

    signIn('credentials', {
      email: user.email,
      password: user.password,
      redirect: false,
      callbackUrl: '/'
    })

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const login = createAsyncThunk<User, Credentials>('users/login', async (credentials, thunkAPI) => {
  try {
    const { data } = await axios.post<User>(API, credentials)

    return data;

  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateUser = createAsyncThunk<User, UserEditPayload>('users/editUser', async (payload, thunkAPI) => {
  try {
    const { data } = await axios.patch<User>(`/api/user/${payload.userId}`, payload.user)
    return data;

  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getUser = createAsyncThunk<ResumiaUser, string>('users/getUser', async (userId, thunkAPI) => {
  try {
    const { data } = await axios.get<ResumiaUser>(`/api/user/${userId}`)
    return data;

  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const { setUsersList, setCurrentUser } = userSlice.actions;
export default userSlice.reducer;