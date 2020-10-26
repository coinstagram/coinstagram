import axios from 'axios';
import { UserState } from '../../type';

interface IEditService {
    edit:(user_profile:string,
        user_name:string,        
        user_id:string,
        user_introduce:string,
        user_email:string,
        user_phone:string,
        user_gender:string) => Promise<UserState>;
    delete:(user_id:string) => Promise<UserState>;
}

const editService = class {
    static async edit(user_profile:string,
        user_name:string,
        user_id:string,
        user_introduce:string,
        user_email:string,        
        user_phone:string,
        user_gender:string,
        token:string) {
        const res=await axios ({
            method:'PATCH',
            url:'/api/user',
            data: {
                user_profile,
                user_name,
                user_id,
                user_introduce,
                user_email,
                user_phone,
                user_gender
            },
            headers: {
                Authorization:`Bearer ${token}`
            }
        });        
        return res.data;
        }

    static async delete(user_id:string, token:string) {
        const res=await axios ({
            method:'DELETE',
            url:'/api/user',
            data: {
                user_id               
            },
            headers: {
                Authorization:`Bearer ${token}`
            }
        })
        return res.data;
        }
}
export default editService;