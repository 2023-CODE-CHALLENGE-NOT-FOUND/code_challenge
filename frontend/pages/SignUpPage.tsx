import * as React from 'react';
import {useForm, SubmitHandler} from "react-hook-form";
import {useRouter} from 'next/router'
// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import Link from "next/link";

type Inputs = {
    user_names: string,
    user_lastnames: string,
    user_email: string,
    identity_number: string,
    fingerprint_code: string,
    password: string,
    user_voice: any,
};

const firebaseConfig = {
    apiKey: "AIzaSyB4vqc8DjTxpikBcYXzz43y4Z0c3zXfBpU",
    authDomain: "cop-daquilema.firebaseapp.com",
    projectId: "cop-daquilema",
    storageBucket: "cop-daquilema.appspot.com",
    messagingSenderId: "773173583069",
    appId: "1:773173583069:web:06fea85e7520b2fac80f34",
    measurementId: "G-VJ3LL4C84Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();


export default function SignUpPage(): JSX.Element {
    const router = useRouter()
    const {register, handleSubmit, watch, formState: {errors}} = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data);
        const user_email = data.user_email
        const password = data.password
        createUserWithEmailAndPassword(auth, user_email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                const arrayToSend: {
                    name: string;
                    lastname: string;
                    email: string;
                    identityNumber: string;
                    fingerprintCode: string;
                    googleToken: string;
                } = {
                    "name": data.user_names.toString(),
                    "lastname": data.user_lastnames.toString(),
                    "email": data.user_email.toString(),
                    "identityNumber": data.identity_number.toString(),
                    "fingerprintCode": data.fingerprint_code.toString(),
                    "googleToken": userCredential.user.uid.toString()
                };
                console.log(arrayToSend)
                // Using Fetch API
                fetch('https://backend-code-challenge.onrender.com/user', {
                    method: 'POST',
                    body: JSON.stringify({
                        // Add parameters here
                        arrayToSend
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        // Handle data
                        if (data.statusCode == 201) {
                            router.push("/DashboardPage").then()
                        }else{
                            user.delete().then()
                        }
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode + errorMessage)
            });
    }

    console.log(watch("user_names")) // watch input value by passing the name of it

    return (
        <>
            <div className={"min-h-screen flex flex-col items-center justify-center bg-red-800"}>
                <div
                    className={"flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md"}>
                    <img src={"https://www.coopdaquilema.com/wp-content/uploads/2020/08/logo.svg"}
                         alt={"Banco Pichincha Logo"}
                         width={"300"}
                         height={"100"}
                    />
                    <div>
                        <span className={"text-black"}>
                            Registro de usuario
                        </span>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="user_names"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Nombres:</label>
                            <input type="text" id="user_names" {...register("user_names")}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="" required/>
                        </div>
                        <div>
                            <label htmlFor="user_lastnames"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Apellidos:</label>
                            <input type="text" id="user_lastnames" {...register("user_lastnames")}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="" required/>
                        </div>
                        <div>
                            <label htmlFor="user_email"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Correo:</label>
                            <input type="text" id="user_email" {...register("user_email")}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="" required/>
                        </div>
                        <div>
                            <label htmlFor="identity_number"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Cedula:</label>
                            <input type="text" id="identity_number" {...register("identity_number")}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="" required/>
                        </div>
                        <div>
                            <label htmlFor="fingerprint_code"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Codigo Dactilar:</label>
                            <input type="text" id="fingerprint_code" {...register("fingerprint_code")}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="" required/>
                        </div>
                        <div>
                            <label htmlFor="password"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Contrasena: </label>
                            <input type="text" id="password" {...register("password", {required: true})}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="" required/>
                        </div>
                        {errors.password && <span>This field is required</span>}
                        <div>
                            <label htmlFor="user_voice"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Audio de
                                verificacion: </label>
                            <input {...register("user_voice", {required: true})} type="file" name="user_voice"
                                   className={"w-full bg-amber-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"}
                            />
                        </div>
                        <div>
                            <button type="submit"
                                    className="w-full mt-4 focus:outline-none text-white bg-red-800 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-red-900"
                            >Registrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}