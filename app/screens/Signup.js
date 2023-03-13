import {
  View,
  StyleSheet,
  Alert,
  Dimensions,
  Pressable,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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
import MyText from '../components/common/MyText';
import LoadingModal from '../components/common/LoadingModal';
import {ActivityIndicator} from 'react-native-paper';
const windowHeight = Dimensions.get('window').height;

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

  // 회원가입시 로딩처리
  const {isLoading} = useSelector(state => state.login);
  //중복확인시 로딩처리
  const {isChecking} = useSelector(state => state.login);

  // 입력 조건 정규식 validation?
  const regEmail =
    /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;
  const regNickname = /^[a-zA-Z0-9]{3,10}$/;
  const regPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@!#&])?[A-Za-z\d$@$!%*#?&]{8,}$/;
  //유효성 검사 및 유즈스테이트 작성
  const onChangeUserHandler = (name, value) => {
    setUser({...user, [name]: value});
    if (name === 'email')
      !regEmail.test(value)
        ? setEmailInput(`이메일 형식이 아닙니다.`)
        : setEmailInput('');
    if (name === 'nickname')
      !regNickname.test(value)
        ? setNicknameInput('영문 또는 숫자 3~10자를 입력해야합니다.')
        : setNicknameInput('');

    if (name === 'password')
      !regPassword.test(value)
        ? setPassInput(
            `영문,숫자, !,@,#,&로 구성된 8글자 이상으로 입력해야합니다.`,
          )
        : setPassInput('');

    if (name === 'passwordCheck')
      password !== value
        ? setPassCheckInput('비밀번호가 일치하지 않습니다.')
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
    <KeyboardAwareScrollView
      contentContainerStyle={{
        width: '100%',
        height: windowHeight,
        backgroundColor: 'white',
      }}>
      <View style={styles.wrapper}>
        <View style={styles.buttonPosionter}>
          <AuthNavigateButton />
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/LogoMedium.png')}
            resizeMode={'cover'}
          />
          <MyText style={styles.imageText}>회원가입 하기</MyText>
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
              />
              <View style={styles.buttonResizer}>
                <View style={dynamicStyles().buttonPositioner}>
                  {isChecking ? (
                    <ActivityIndicator
                      color={Colors.mainColorBright}
                      size={15}
                    />
                  ) : (
                    <Pressable
                      style={({pressed}) =>
                        dynamicStyles(pressed).buttonPositioner
                      }
                      onPress={() => onCheckUsabilityHandler('email', email)}>
                      <MyText style={dynamicStyles().buttonText}>
                        중복 확인
                      </MyText>
                    </Pressable>
                  )}
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
                  {isChecking ? (
                    <ActivityIndicator
                      color={Colors.mainColorBright}
                      size={15}
                    />
                  ) : (
                    <Pressable
                      style={({pressed}) =>
                        dynamicStyles(pressed).buttonPositioner
                      }
                      onPress={() =>
                        onCheckUsabilityHandler('nickname', nickname)
                      }>
                      <MyText style={dynamicStyles().buttonText}>
                        중복 확인
                      </MyText>
                    </Pressable>
                  )}
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
      <LoadingModal modalHandler={isLoading} />
    </KeyboardAwareScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  imageText: {
    marginTop: 4,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 'bold',
    textAlign: 'center',
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
    marginTop: 20,
  },
  buttonResizer: {
    position: 'absolute',
    right: 12,
    height: '100%',
    paddingBottom: 12,
    justifyContent: 'center',
  },
  submitButtonPositioner: {
    marginTop: 40,
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
      opacity: value ? 0.5 : 1,
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
