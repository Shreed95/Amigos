import { Link,useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { TbLogout } from "react-icons/tb";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import { VscAccount } from "react-icons/vsc";

const Topbar = () => {
    const { mutate:signOut, isSuccess } = useSignOutAccount();
    const navigate = useNavigate();
    const { user } = useUserContext();
    useEffect(()=>{
        if(isSuccess){
            navigate(0);
        }
    },[isSuccess])
    return (
        <section className="topbar">
            <div className="flex-between py-4 px-5">
                <Link to='/' className="flex gap-3 items-center">
                    <img className="w-12" src="assets/images/logo.png" alt="logo" />
                </Link>
                <div className="flex gap-4">
                    <Button variant="ghost" className="shad-button_ghost" onClick={()=>signOut()}>
                        <TbLogout className="text-2xl" />
                    </Button>
                    <Link to={`/profile/${user.id}`} className="flex-center gap-3">
                        {user.imageUrl ?(
                            <img src={user.imageUrl} alt="ProfileImg" className="w-8 h-8 rounded-full" />
                        ):(
                            <VscAccount className="text-xl" />
                        )}
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Topbar