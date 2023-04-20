import { getAuth, signOut } from "firebase/auth";

export default function TwoFactorPage (){
    const auth = getAuth();
    const user = auth.currentUser
    console.log("user", user)
    console.log(auth)
    return (
        <>
            Hello
        </>
    )
}

