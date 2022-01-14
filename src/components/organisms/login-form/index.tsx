import React, { useState } from "react";
import { Box, Button, TextInput } from "../../index";
import { InsideApiService } from "../../../share";
import Image from "../../atoms/image";
import LogoUri from "../../../static/logo.png";
import { useDispatch } from "react-redux";
import { UpdateAccessToken, UpdateUser } from "../../../share/reducers/auth";
import { UpdateError, UpdateMessage } from "../../../share/reducers/modal-msg";
import { useForm } from "react-hook-form";
import Loader from "../../atoms/loader";

interface IFormInputs {
    username: string;
    password: string;
}
const LoginForm = () => {
    const dispatch = useDispatch();
    const {register, handleSubmit, formState: { errors },} = useForm<IFormInputs>();
    const [loading, setLoading] = useState(false);

    const _onSubmit = async (data: IFormInputs) => {
        try {
            setLoading(true)
            const { username, password } = data;
            const { access_token, user } =
                await InsideApiService.AuthService.login(username, password);
            dispatch(UpdateAccessToken(access_token));
            dispatch(UpdateUser(user));
            dispatch(
                UpdateMessage({
                    status: "success",
                    title: "Đăng nhập thành công",
                })
            );
            setLoading(false)
        } catch (error) {
            setLoading(false)
            dispatch(UpdateError(error));
        }
    };
    return (
        <Box className="w-full max-w-md mx-auto mt-4">
            <div className="pt-3 pb-5 flex justify-center">
                <Image src={LogoUri} width={100} />
            </div>
            <h2 className="text-center text-2xl text-indigo-900 font-display font-semibold mt-3">
                Business Unit Portal
            </h2>
            <form className="mt-12 px-2" onSubmit={handleSubmit(_onSubmit)}>
                <div>
                    <label className="block text-sm font-bold text-gray-700 tracking-wide mb-2">
                        Username / Email
                    </label>
                    <input
                        placeholder="username/email"
                        className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2"
                        {...register("username", {
                            required: true,
                            maxLength: 20,
                        })}
                    />
                    {errors?.username?.type === "required" && (
                        <p className="italic text-xs text-red-500">
                            *Không được để trống Username
                        </p>
                    )}
                    {errors?.username?.type === "maxLength" && (
                        <i className="mt-1 text-xs text-red-500">
                            *Không được quá 20 kí tự
                        </i>
                    )}
                </div>
                <div className="mt-8">
                    <label className="block text-sm font-bold text-gray-700 tracking-wide mb-2">
                        Mật khẩu
                    </label>
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2"
                        {...register("password", { required: true })}
                    />
                    {errors?.password?.type === "required" && (
                        <i className="mt-1 text-xs text-red-500">
                            *Không được để trống password
                        </i>
                    )}
                </div>
                <div className="my-10">
                    <div className="relative">
                        {
                            loading && <div className="absolute w-full h-full flex justify-center items-center z-40"><Loader/></div>
                        }
                        <Button disabled={loading} className="w-full">Đăng nhập</Button>
                    </div>
                </div>
            </form>
        </Box>
    );
};

LoginForm.propTypes = {};

export default LoginForm;
