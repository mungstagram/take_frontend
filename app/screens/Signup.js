import {View, Text, StyleSheet, Alert, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import AuthInput from '../components/AuthInput';
import AuthButton from '../components/common/AuthButton';
import KaKaoLogin from '../components/kakaologin/KaKaoLogin';
import AuthNavigateButton from '../components/AuthNavigateButton';
import {
  uncheckEmail,
  uncheckNick,
  __checkUser,
  __postUsers,
} from '../redux/modules/loginSlice';
import {Colors} from '../constants/colors';
const Signup = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // 비밀번호 보여줄 지 말지 선택 버튼
  const [secureSetter, setSecureSetter] = useState(true);

  //입력 초기값
  const initialState = {
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
  };
  //멤버 스테이트 형성
  const [user, setUser] = useState(initialState);
  //멤버 스테이트 구조분해 할당
  const {email, nickname, password, passwordCheck} = user;
  //가입 조건 초기값
  const [emailInput, setEmailInput] = useState('');
  const [nicknameInput, setNicknameInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [passCheckInput, setPassCheckInput] = useState('');

  // 입력 조건 정규식 validation?
  const regEmail =
    /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;
  const regNickname = /^[a-zA-Z0-9]{3,}$/;
  const regPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])?[A-Za-z\d$@$!%*#?&]{8,}$/;
  //유효성 검사 및 유즈스테이트 작성
  const onChangeUserHandler = (name, value) => {
    setUser({...user, [name]: value});
    if (name === 'email')
      !regEmail.test(value)
        ? setEmailInput(`이메일 형식이 아닙니다.`)
        : setEmailInput('');
    if (name === 'nickname')
      !regNickname.test(value)
        ? setNicknameInput(`영문과 숫자로 된 3글자 이상의 닉네임`)
        : setNicknameInput('');

    if (name === 'password')
      !regPassword.test(value)
        ? setPassInput(`@$!%*#?&와 영어 숫자로 된 8글자 이상의 비밀번호`)
        : setPassInput('');

    if (name === 'passwordCheck')
      password !== value
        ? setPassCheckInput('비밀번호가 불일치합니다')
        : setPassCheckInput('');
  };

  //버튼 비활성화 변수 선언
  const [submitDisabled, setSubmitDisabled] = useState(true);

  // 특정값들 업데이트시 버튼 비활성화 버튼 활성화
  useEffect(() => {
    if (
      password.trim() !== '' &&
      passwordCheck.trim() !== '' &&
      !passCheckInput &&
      !passInput
    ) {
      setSubmitDisabled(false);
    }
  }, [password, passwordCheck, email, nickname]);

  //중복확인 여부 스테이트
  const {isEmailChecked} = useSelector(state => state.login);
  const {isNickNameChecked} = useSelector(state => state.login);
  //아이디 및 닉네임 중복확인 기능 함수
  const onCheckUsabilityHandler = (name, value) => {
    if (
      (name === 'email' && emailInput === '' && email.trim() !== '') ||
      (name === 'nickname' && nicknameInput === '' && nickname.trim() !== '')
    ) {
      dispatch(__checkUser({[name]: value}));
    }
  };
  // 이메일 및 닉네임 값 업데이트시 체크 state해제
  useEffect(() => {
    dispatch(uncheckEmail());
  }, [email]);

  useEffect(() => {
    dispatch(uncheckNick());
  }, [nickname]);
  // 제출버튼
  const onSubmitUserHandler = e => {
    e.preventDefault();
    if (
      email.trim() === '' ||
      password.trim() === '' ||
      passwordCheck.trim() === '' ||
      nickname.trim() === ''
    ) {
      return Alert.alert('모든 내용을 작성해주세요');
    }
    if (!isEmailChecked) {
      return Alert.alert('이메일 중복확인 해주세요');
    }
    if (!isNickNameChecked) {
      return Alert.alert('닉네임 중복확인 해주세요');
    }

    dispatch(
      __postUsers({
        email,
        password,
        nickname,
      }),
    );
  };

  // 사인업 성공시 true됨

  const {isSuccessedSignup} = useSelector(state => state.login);
  // 회원가입 성공시 페이지 이동
  useEffect(() => {
    if (isSuccessedSignup) {
      navigation.replace('AuthStartScreen');
    }
  }, [isSuccessedSignup]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.buttonPosionter}>
        <AuthNavigateButton />
      </View>
      <View style={styles.inputWrapper}>
        <View>
          <View>
            <AuthInput
              placeholder="id"
              checkUsability
              helper={emailInput}
              onUpdateValue={onChangeUserHandler.bind(this, 'email')}
              value={email}
              isInvalid={regEmail.test(email)}
              // keyboardType="email-address"
            />
            <View style={styles.buttonResizer}>
              <View style={dynamicStyles().buttonPositioner}>
                <Pressable
                  style={dynamicStyles().buttonPositioner}
                  onPress={() => onCheckUsabilityHandler('email', email)}>
                  <Text style={dynamicStyles().buttonText}>중복 확인</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View>
            <AuthInput
              placeholder="nickname"
              checkUsability
              helper={nicknameInput}
              onUpdateValue={onChangeUserHandler.bind(this, 'nickname')}
              value={nickname}
              isInvalid={regNickname.test(nickname)}
            />
            <View style={styles.buttonResizer}>
              <View style={dynamicStyles().buttonPositioner}>
                <Pressable
                  style={dynamicStyles().buttonPositioner}
                  onPress={() => onCheckUsabilityHandler('nickname', nickname)}>
                  <Text style={dynamicStyles().buttonText}>중복 확인</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <AuthInput
            placeholder="password"
            helper={passInput}
            onUpdateValue={onChangeUserHandler.bind(this, 'password')}
            value={password}
            secure={secureSetter}
            setSecureSetter={setSecureSetter}
            isInvalid={regPassword.test(password)}
          />
          <AuthInput
            placeholder="password-check"
            helper={passCheckInput}
            onUpdateValue={onChangeUserHandler.bind(this, 'passwordCheck')}
            value={passwordCheck}
            secure={secureSetter}
            setSecureSetter={setSecureSetter}
            isInvalid={password === passwordCheck && passwordCheck !== ''}
          />
        </View>
        <View style={styles.submitButtonPositioner}>
          <AuthButton disabled={submitDisabled} onPress={onSubmitUserHandler}>
            입력 완료
          </AuthButton>
        </View>
      </View>
      <View style={styles.socialLoginBox}>
        <KaKaoLogin />
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: 'white',
    // width: width,
    flex: 1,
  },
  buttonPosionter: {
    width: '100%',
    alignItems: 'flex-start',
    marginTop: 16,
    marginLeft: '7%',
  },
  inputContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  inputWrapper: {
    width: '90%',
    // backgroundColor: 'red',
    marginTop: 192,
  },
  buttonResizer: {
    position: 'absolute',
    right: 12,
    height: '100%',
    paddingBottom: 12,
    justifyContent: 'center',
  },
  submitButtonPositioner: {
    marginTop: 18,
  },
  socialLoginBox: {
    width: '100%',
    marginTop: 60,
  },
});

const dynamicStyles = value =>
  StyleSheet.create({
    buttonPositioner: {
      height: '68%',
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      width: 90,
      borderRadius: 4,
    },
    buttonText: {
      color: Colors.mainColorBright,
      fontSize: 14,
      fontWeight: 'bold',
    },
    buttonView: {
      opacity: value === '' ? 1 : 0.5,
    },
  });
