import client from '../apollo';
import { USER_EXIST } from '../query';

function CheckUser(userId:any,userName:any){

    if(userId==null){
        alert("로그인 해주세요")
        return false;
    }

    return client
        .query({
          query: USER_EXIST,
          variables: { userId: userId},
        })
        .then((res)=>{
            
            if(res.data.User.userName!=userName){
                alert("다시 로그인 해주세요");
                return false;
            }
            return true;
        })
        
}


export default CheckUser;