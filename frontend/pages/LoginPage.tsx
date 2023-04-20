import * as React from 'react';
import {useForm, SubmitHandler} from "react-hook-form";
import {useRouter} from 'next/router'
// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import Link from "next/link";

type Inputs = {
    user_name: string,
    password: string,
};

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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


export default function LoginPage(): JSX.Element {
    const router = useRouter()
    const {register, handleSubmit, watch, formState: {errors}} = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data);
        const email = data.user_name
        const password = data.password
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user)
                const url = `https://backend-code-challenge.onrender.com/user/${user.uid}`;
                fetch(url).then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        // Handle data
                        console.log(data.data)
                        if (data.statusCode == 200 && data.data[0] != null) {
                            router.push("/TwoFactorPage").then()
                        } else {
                            user.delete().then(
                                () => {
                                    alert("Usuario no registrado")
                                }
                            )
                        }
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                console.log(errorCode)
                alert("Hubo un error al intentar ingresar. " + errorCode + errorMessage)
            });
    }

    // console.log(watch("user_name")) // watch input value by passing the name of it

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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="user_name"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Usuario</label>
                            <input type="text" id="user_name" {...register("user_name")}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="" required/>
                        </div>
                        <div>
                            <label htmlFor="password"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Contrasena:</label>
                            <input type="password" id="password" {...register("password", {required: true})}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="" required/>
                        </div>
                        {errors.password && <span>This field is required</span>}
                        <div>
                            <button type="submit"
                                    className="w-full mt-4 focus:outline-none text-white bg-red-800 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-red-900"
                            >Ingresar
                            </button>
                        </div>
                    </form>
                    <div>
                        <Link href={"/SignUpPage"} className={"text-black"}>Aun no te registras?</Link>
                    </div>
                </div>
            </div>
        </>
    )
}