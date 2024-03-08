import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import { VscAccount } from "react-icons/vsc";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";

const LeftSidebar = () => {
    const { user } = useUserContext();
    const navigate = useNavigate();
    const { mutate:signOut, isSuccess } = useSignOutAccount();
    const { pathname } = useLocation();
    useEffect(()=>{
        if(isSuccess){
            navigate(0);
        }
    },[isSuccess])
    return (
        <nav className="leftsidebar">
            <div className="flex flex-col gap-11">
                <Link to='/' className="flex gap-3 items-center">
                    <img className="w-12" src="/assets/images/logo.png" alt="logo" />
                    <span className="pl-5 text-2xl font-mono">Amigos</span>
                </Link>
                <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
                    {user.imageUrl ? (
                        <img src={user.imageUrl} alt="ProfileImg" className="w-9 rounded-full" />
                    ) : (
                        <VscAccount className="text-xl" />
                    )}
                    <div className="flex flex-col">
                        <p className="body-bold">{user.name}</p>
                        <p className="small-regular text-[#EA1111]">@{user.username}</p>
                    </div>
                </Link>
                <ul className="flex flex-col gap-6">
                    {sidebarLinks.map((link: INavLink) => {
                        const isActive = pathname === link.route;
                        return (
                            <li key={link.label} className={`leftsidebar-link group ${isActive && "bg-[#7e2020]"}`}>
                                <NavLink to={link.route} className="flex gap-4 items-center p-4">
                                    <img src={link.imgURL} alt={link.label} className={`group-hover:invert-white ${isActive && 'invert-white'}`} />
                                    {link.label}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <Button variant="ghost" className="shad-button_ghost" onClick={() => signOut()}>
                <img src="/assets/icons/logout.svg" alt="logout" className={`group-hover:invert-white hover:invert-white`} />
                <p className="small-medium lg:base-medium">Logout</p>
            </Button>
        </nav>
    )
}

export default LeftSidebar