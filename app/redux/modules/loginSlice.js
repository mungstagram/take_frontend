import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../api/http';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  users: [
    {
      email: '',
      nickname: '',
      password: '',
    },
  ],
  isLogin: false,
  isLoading: false,
  error: null,
  myNick: '',
};

//로그인 POST요청
export const __postLogin = createAsyncThunk(
  'POST_LOGIN',
  async (payload, thunkAPI) => {
    try {
      const data = await http.post('/auth/login', payload).then(res => {
        AsyncStorage.setItem('authorization', res.headers.authorization);
        return res;
      });
      AsyncStorage.setItem('nickname', data.data.nickname);
      if (data.status === 200) {
        alert('로그인 성공');
      }
      // 직렬화 에러 해결하기 위해서 sendData 선언
      const sendData = {
        token: data.headers.authorization,
        nickname: data.data.nickname,
        // data.data.nickname 은 바디에 오는 닉네임
        //data.headers.authorization 헤더에 담겨오는 인증 토큰
      };
      return thunkAPI.fulfillWithValue(sendData);
    } catch (error) {
      if (error.response.status === 401) {
      }
      return thunkAPI.rejectWithValue(error);
    }
  },
);
//회원가입 POST요청
export const __postUsers = createAsyncThunk(
  'POST_SIGNUP',
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const {data} = await http.post('/users/signup', payload);
      console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        Alert.alert('이미 사용중인 닉네임 및 비밀번호 입니다.');
      }
      //   if (error.response.status === 404) {
      //     // alert('작성 조건을 지켜주세요.');
      //   }
      return thunkAPI.rejectWithValue(error);
    }
  },
);
// //아이디 중복확인
// export const __checkMemberId = createAsyncThunk(
//   'CHECK_MEMBERID',
//   async (payload, thunkAPI) => {
//     console.log(payload);
//     try {
//       const {data} = await http.post('/members/join/check/Id', {
//         memberId: payload,
//       });
//       return thunkAPI.fulfillWithValue(data);
//     } catch (error) {
//       if (error.response.status === 409) {
//         alert('이미 존재하는 아이디입니다.');
//       }
//       return thunkAPI.rejectWithValue(error);
//     }
//   },
// );
// // 닉네임 중복확인
// export const __checkMemberNick = createAsyncThunk(
//   'CHECK_MEMBERNICK',
//   async (payload, thunkAPI) => {
//     try {
//       const {data} = await http.post('/members/join/check/nickname', {
//         nickname: payload,
//       });
//       return thunkAPI.fulfillWithValue(data);
//     } catch (error) {
//       if (error.response.status === 409) {
//         alert('이미 존재하는 닉네임입니다.');
//       }

//       return thunkAPI.rejectWithValue(error);
//     }
//   },
// );

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    //로그인 여부 관리 리듀서
    checkLogin: (state, action) => {
      state.isLogin = true;
    },
    checkLogout: (state, action) => {
      state.isLogin = false;
    },
  },
  extraReducers: {
    //post
    [__postUsers.pending]: state => {
      state.isLoading = true;
    },
    [__postUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      Alert.alert('회원가입이 완료되었습니다.');
    },
    [__postUsers.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }, //post
    [__postLogin.pending]: state => {
      state.isLoading = true;
    },
    [__postLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLogin = true;
      state.nickname = action.payload.nickname;
    },
    [__postLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    ////아이디와 닉네임부분
    // [__checkMemberId.pending]: state => {
    //   state.isLoading = true;
    // },
    // [__checkMemberId.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.idNotChecked = false;

    // },
    // [__checkMemberId.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.idNotChecked = true;

    //   state.error = action.payload;
    // },
    // [__checkMemberNick.pending]: state => {
    //   state.isLoading = true;
    // },
    // [__checkMemberNick.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.nickNotChecked = false;
    //   alert('중복 확인 되었습니다.');
    // },
    // [__checkMemberNick.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.nickNotChecked = true;

    //   state.error = action.payload;
    // },
  },
});
export const {checkLogin, checkLogout} = loginSlice.actions;
export default loginSlice.reducer;
