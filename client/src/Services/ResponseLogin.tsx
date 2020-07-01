import { USER_EXIST, PHOTOS, CREATE_USER } from '../query';
import client from '../apollo';
import CheckUser from './CheckUser';


const responseLogin = async (response: any, tempProvider: any,setUserSocialId:any,setUserSocialName:any) => {
    
    let userIdForQuery: any;
    let userNameForQuery: any;
    

    if (tempProvider == 'google') {
      userIdForQuery = response.googleId;
      userNameForQuery = response.profileObj.name;
      window.sessionStorage.setItem('userId', userIdForQuery);
      window.sessionStorage.setItem('userName', userNameForQuery);
      setUserSocialId(userIdForQuery);
      setUserSocialName(userNameForQuery);
    } else if (tempProvider == 'kakao') {
      userIdForQuery = String(response.profile.id);
      userNameForQuery = response.profile.kakao_account.profile.nickname;
      window.sessionStorage.setItem('userId', userIdForQuery);
      window.sessionStorage.setItem('userName', userNameForQuery);
      setUserSocialName(userNameForQuery);
      setUserSocialId(userIdForQuery);
      //setLoginButtonClick(!loginButtonClick);
    } else if (tempProvider == 'naver') {
      
      userIdForQuery = String(response.id);
      userNameForQuery = response.name;
      window.sessionStorage.setItem('userId', userIdForQuery);
      window.sessionStorage.setItem('userName', userNameForQuery);
      setUserSocialName(userNameForQuery);
      setUserSocialId(userIdForQuery);
      //setLoginButtonClick(!loginButtonClick);
    }
    console.log(userIdForQuery)
    if (await CheckUser(window.sessionStorage.getItem('userId'), window.sessionStorage.getItem('userName'))==false)  {
                 
          client.mutate({
            variables: {
              userId: userIdForQuery,
              userName: userNameForQuery,
              userNickName: '',
              userInstagram: '',
            },
            mutation: CREATE_USER,
          });
        
      }
      
      window.location.reload();
  };


export default responseLogin;