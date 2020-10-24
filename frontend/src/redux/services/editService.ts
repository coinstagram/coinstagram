import axios from 'axios';
import { UserState } from '../../type';

interface IEditService {
    edit:(user_name:string,
        user_introduce:string,
        user_phone:string,
        user_email:string,
        user_profile:string,
        user_gender:string) => Promise<UserState>;
    delete:(user_id:string) => Promise<UserState>;
}

const editService:IEditService = class {
    static async edit(user_name:string,
        user_introduce:string,
        user_phone:string,
        user_email:string,
        user_profile:string,
        user_gender:string) {
        const res=await axios ({
            method:'PATCH',
            url:'/api/user patch',
            data: {
                user_name,
                user_introduce,
                user_phone,
                user_email,
                user_profile,
                user_gender
            }
        })
        return res.data;
        }

    static async delete(user_id:string) {
        const res=await axios ({
            method:'DELETE',
            url:'/api/user',
            data: {
                user_id
                // user_name,
                // user_introduce,
                // user_phone,
                // user_email,
                // user_profile,
                // user_gender
            }
        })
        return res.data;
        }
}
export default editService;