import { getAuth, signOut } from "firebase/auth";
import * as React from "react";
import {useRouter} from "next/router";
import {SubmitHandler, useForm} from "react-hook-form";

type Inputs = {
    user_voice: any
};

export default function TwoFactorPage (){
    const router = useRouter()
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data);
    }
    return (
        <>
            <div className={"min-h-screen flex flex-col items-center justify-center bg-red-800"}>
                <div className={"flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md"}>
                    <img src={"https://www.coopdaquilema.com/wp-content/uploads/2020/08/logo.svg"}
                         alt={"Banco Pichincha Logo"}
                         width={"300"}
                         height={"100"}
                    />
                    <div>
                        <span className={"text-black"}>
                            Verificacion de dos pasos
                        </span>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="user_voice"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Audio de verificacion: </label>
                            <input {...register("user_voice", {required: true})} type="file" name="user_voice"
                                   className={"w-full bg-amber-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"}
                            />
                            {errors.user_voice && <span className={"text-black"}>Es necesario subir un archivo</span>}
                        </div>
                        <div>
                            <button type="submit"
                                    className="w-full mt-4 focus:outline-none text-white bg-red-800 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-red-900"
                            >Verificar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

