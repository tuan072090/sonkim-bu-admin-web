import React, { useState } from "react";
import { Box, Button, TextInput } from "../../index";
import { InsideApiService } from "../../../share";
import Image from "../../atoms/image";
import LogoUri from "../../../static/logo.png";
import { useDispatch } from "react-redux";
import { UpdateAccessToken, UpdateUser } from "../../../share/reducers/auth";
import { UpdateError, UpdateMessage } from "../../../share/reducers/modal-msg";
import { useForm } from "react-hook-form";

interface IFormInputs {
    username: string;
    password: string;
}
const LoginForm = () => {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInputs>();

    const _onSubmit = async (data: IFormInputs) => {
        try {
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
        } catch (error) {
            dispatch(
                UpdateError({status:400,message:"Sai thông tin đăng nhập"})
            );
        }
        console.log("xong roi ne");
    };
    return (
        <Box className="w-full max-w-md mx-auto mt-4">
            <div className="pt-3 pb-5 flex justify-center">
                <Image src={LogoUri} width={100} />
            </div>
            <h2 className="text-center text-2xl text-indigo-900 font-display font-semibold mt-3">
                Đăng nhập
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
                        <p className="italic text-xs text-red-500">
                            *Không được quá 20 kí tự
                        </p>
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
                        <p className="italic text-xs text-red-500">
                            *Không được để trống password
                        </p>
                    )}
                </div>
                <div className="my-10">
                    <input
                        type="submit"
                        value="Đăng nhập"
                        className="w-full bg-green-500 rounded-lg border border-green-500 ripple text-white hover:bg-green-700 py-2 px-4 text-base"
                    />
                </div>
            </form>
        </Box>
    );
};

LoginForm.propTypes = {};

export default LoginForm;
