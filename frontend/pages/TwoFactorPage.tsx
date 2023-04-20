import { getAuth, signOut } from "firebase/auth";

export default function TwoFactorPage (){
    try{
        const auth = getAuth();
        const user = auth.currentUser
        console.log("user", user)
        console.log(auth)
    } catch (e) {
        console.log(e)
    }
    return (
        <>
            Hello
        </>
    )
}

