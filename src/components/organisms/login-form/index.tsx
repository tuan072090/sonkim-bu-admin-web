import React, {useState} from "react";
import {Box, Button, TextInput} from "../../index";
import {InsideApiService} from "../../../share";
import Image from '../../atoms/image'
import LogoUri from '../../../static/logo.png'
import MyError from "../../../share/services/error";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";
import {UpdateAccessToken, UpdateUser} from '../../../share/reducers/auth';
import {UpdateMessage} from '../../../share/reducers/modal-msg'
import {useAppSelector} from '../../../share/store'

const LoginForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState('');

    const _onUsernameChange = (event: React.FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value
        setUsername(value)
    }

    const _submitHandler = async () => {
        try {
            const {access_token, user} = await InsideApiService.AuthService.login(username, pass)
            dispatch(UpdateAccessToken(access_token))
            dispatch(UpdateUser(user))
            dispatch(UpdateMessage({status: "success", title: "Đăng nhập thành công"}))
        } catch (err) {
            dispatch(UpdateMessage(new MyError(400, "Sai thông tin đăng nhập")))
        }
    }

    return (
        <Box className="w-full max-w-md">
            <div className="pt-3 pb-5 flex justify-center">
                <Image src={LogoUri} width={100}/>
            </div>
            <h2 className="text-center text-2xl text-indigo-900 font-display font-semibold mt-3">
                Đăng nhập
            </h2>
            <div className="mt-12 px-2">
                <div>
                    <div className="text-sm font-bold text-gray-700 tracking-wide mb-2">
                        Username / Email
                    </div>
                    <TextInput onChange={_onUsernameChange} placeholder="username/email" className="w-full"/>
                </div>
                <div className="mt-8">
                    <div className="flex justify-between items-center">
                        <div className="text-sm font-bold text-gray-700 tracking-wide mb-2">
                            Mật khẩu
                        </div>
                    </div>
                    <TextInput type="password" onChange={(e) => setPass(e.target.value)} placeholder="Password"
                               className="w-full"/>
                </div>
                <div className="my-10">
                    <Button color="green" className="w-full"
                            disabled={(!(username.length > 0 && pass.length > 0))}
                            onClick={_submitHandler}>Đăng nhập</Button>
                </div>
            </div>
        </Box>
    );
};

LoginForm.propTypes = {};

export default LoginForm;
