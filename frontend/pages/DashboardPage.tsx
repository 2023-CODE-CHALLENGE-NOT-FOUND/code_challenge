import {Auth, getAuth} from "firebase/auth";
import * as React from "react";
import {useEffect, useState} from "react";

export default function DashboardPage() {

    const [userAuth, setUserAuth] = useState(undefined as any)
    const [userUser, setUserUser] = useState(undefined as any)
    const [userName, setUserName] = useState('' as string)

    useEffect(() => {
            try {
                const auth = getAuth();
                const user = auth.currentUser
                console.log("user", user)
                console.log(auth)
                setUserAuth(auth)
                setUserUser(user)
            } catch (e) {
                console.log(e)
                setUserAuth(null)
                setUserUser(null)
            }
            if (userAuth != null) {
                setUserName(userUser.email)
            }
        }, []
    )
    return (
        <>
            <div className={"min-h-screen flex flex-col items-center justify-center bg-red-800"}>
                <div
                    className={"flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full"}>
                    <img src={"https://www.coopdaquilema.com/wp-content/uploads/2020/08/logo.svg"}
                         alt={"Banco Pichincha Logo"}
                         width={"300"}
                         height={"100"}
                    />
                    <div className={"mt-10"}>
                        <p className="text-3xl text-black">Informacion del usuario</p>
                    </div>
                    <div className={"mt-10"}>
                        <p className="text-xl text-black"><span className={"font-bold"}>Correo: </span> {userName}</p>
                        <p className="text-xl text-black"><span className={"font-bold"}>Miembro desde: </span>20220827
                        </p>
                    </div>
                    <div className={"mt-10"}>
                        <p className="text-2xl text-black">Servicios</p>
                    </div>
                    <div className={"mt-10 grid gap-8 grid-cols-3 grid-rows-2"}>
                        <div className={" h-48 border-amber-300 border-2 flex bg-red-100"}/>
                        <div className={" h-48 border-amber-300 border-2 flex bg-red-100"}/>
                        <div className={" h-48 border-amber-300 border-2 flex bg-red-100"}/>
                        <div className={" h-48 border-amber-300 border-2 flex bg-red-100"}/>
                        <div className={" h-48 border-amber-300 border-2 flex bg-red-100"}/>
                    </div>
                </div>
            </div>
        </>
    )
}