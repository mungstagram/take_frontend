import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../api/http';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  isLogin: false, //로그인 상태 관리 변수
  isLoading: false,
  error: null,
  myNick: '',
  isSuccessLogin: true, //실패로그 관리 변수
  isEmailChecked: false, //중복확인 변수들
  isNickNameChecked: false,
  isSuccessedSignup: false,
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

      // 직렬화 에러 해결하기 위해서 sendData 선언// 토큰을 보내다가 이제 보내지 않음.
      const sendData = {
        nickname: data.data.nickname,
        // data.data.nickname 은 바디에 오는 닉네임
        //data.headers.authorization 헤더에 담겨오는 인증 토큰
      };

      return thunkAPI.fulfillWithValue(sendData);
    } catch (error) {
      console.log(error);
      if (error.response.status === 500) {
        ('서버가 닫혀 있습니다.');
      }
      return thunkAPI.rejectWithValue(error.response.data.data);
    }
  },
);

//카카오로그인
export const __postKaKaoLogin = createAsyncThunk(
  'POST_KAKAOLOGIN',
  async (payload, thunkAPI) => {
    try {
      const data = await http.post('/auth/kakao', payload).then(res => {
        AsyncStorage.setItem('authorization', res.headers.authorization);
        return res;
      });
      if (data.data.nickname === null) {
        AsyncStorage.setItem('nickname', '');
        return thunkAPI.fulfillWithValue({nickname: ''});
      } else {
        AsyncStorage.setItem('nickname', data.data.nickname);
      }
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error, '카카오로그인시 애러');
      if (error.response.status === 500) {
        ('서버가 닫혀 있습니다.');
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
//회원가입 POST요청
export const __postUsers = createAsyncThunk(
  'POST_SIGNUP',
  async (payload, thunkAPI) => {
    try {
      const {data} = await http.post('/users/signup', payload);
      // console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      if (error.response.status === 409) {
        Alert.alert('이미 가입되어있습니다.');
      }
      if (error.response.status === 500) {
        ('서버가 닫혀 있습니다.');
      }
      return thunkAPI.rejectWithValue(error.response.data.data);
    }
  },
);
//아이디 중복확인
export const __checkUser = createAsyncThunk(
  'CHECK_USER',
  async (payload, thunkAPI) => {
    try {
      const {data} = await http.post('/users/signup/check', payload);
      const keyOfPayload = Object.keys(payload);
      Alert.alert('사용 가능합니다');

      return thunkAPI.fulfillWithValue(keyOfPayload[0]);
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        Alert.alert('요청에 실패했습니다.');
      }
      if (error.response.status === 409) {
        Alert.alert('이미 존재합니다');
      }
      if (error.response.status === 500) {
        ('서버가 닫혀 있습니다.');
      }

      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const __kakaoNick = createAsyncThunk(
  'KAKAO_NICK',
  async (payload, thunkAPI) => {
    try {
      const data = await http.put('/auth/nickname', payload);
      AsyncStorage.setItem('nickname', payload.nickname);
      return thunkAPI.fulfillWithValue(payload.nickname);
    } catch (error) {
      if (error.response.status === 400) {
        Alert.alert('중복된 닉네임입니다.');
      }
      return thunkAPI.rejectWithValue(error.response);
    }
  },
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    //로그인 여부 관리 리듀서
    checkLogin: (state, action) => {
      state.isLogin = true;
    },
    // 로그인 스테이트 해제(false)
    checkLogout: (state, action) => {
      state.isLogin = false;
      state.myNick = '';
    },
    // 로그인 실패 상태 초기화
    deleteFailLog: (state, action) => {
      state.isSuccessLogin = true;
    },
    //중복확인 관리
    uncheckEmail: (state, action) => {
      state.isEmailChecked = false;
    },
    uncheckNick: (state, action) => {
      state.isNickNameChecked = false;
    },
    newSignup: (state, action) => {
      state.isSuccessedSignup = false;
    },
    setMyNick: (state, action) => {
      state.myNick = action.payload;
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
      state.isSuccessedSignup = true;
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
      state.isSuccessLogin = true;
      state.myNick = action.payload.nickname;
    },
    [__postLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSuccessLogin = false;
      state.isLogin = false;
    },
    //아이디와 닉네임부분
    [__checkUser.pending]: state => {
      state.isLoading = true;
    },
    [__checkUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      // email 중복확인시 이메일 체크했다, 아니면 닉네임 체크했다
      action.payload === 'email'
        ? (state.isEmailChecked = true)
        : (state.isNickNameChecked = true);
    },
    [__checkUser.rejected]: (state, action) => {
      state.isLoading = false;
      // state.idNotChecked = true;
      state.error = action.payload;
    },
    [__postKaKaoLogin.pending]: state => {
      state.isLoading = true;
    },
    [__postKaKaoLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLogin = true;
      state.myNick = action.payload.nickname;
    },
    [__postKaKaoLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isLogin = false;
      Alert.alert('카카오 로그인에 실패하였습니다.');
    },
    [__kakaoNick.pending]: state => {
      state.isLoading = true;
    },
    [__kakaoNick.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.myNick = action.payload;
    },
    [__kakaoNick.rejected]: (state, action) => {
      state.isLoading = false;
      // state.idNotChecked = true;
      state.error = action.payload;
    },
  },
});
export const {
  checkLogin,
  checkLogout,
  deleteFailLog,
  uncheckEmail,
  uncheckNick,
  newSignup,
  setMyNick,
} = loginSlice.actions;
export default loginSlice.reducer;
