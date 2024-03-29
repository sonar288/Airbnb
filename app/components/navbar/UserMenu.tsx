'use client'
import {AiOutlineMenu} from "react-icons/ai";
import Avatar from "../Avatar";
import { use, useCallback, useState } from "react";
import MenuItem from "./menuItem";
import useRegisterModal from "@/app/hooks/useRegisterModel";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
import { signOut } from "next-auth/react";
import { safeUser } from "@/app/types";
import { useRouter } from "next/navigation";


interface UserMenuProps{
    currentUser?: safeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {   
    const [isOpen, setIsOpen] = useState(false);
     const registerModal = useRegisterModal();
     const loginModal = useLoginModal();
     const RentModal = useRentModal();
     const router = useRouter();
    const toggleOpen = useCallback(() => {
        setIsOpen((value)=>!value);
    },[]);
    const onRent = useCallback(()=>{
        if(!currentUser){
            return loginModal.onOpen();
        }

        // Open Rent Modal
        RentModal.onOpen();

    },[currentUser, loginModal, RentModal])
    
    return(
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div onClick={onRent} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                    Airbnb your home
                </div>
                <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shodow-md transition" >
                    <AiOutlineMenu/>
                    <div className="md-block">
                    <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                    {currentUser ?(
                        <>
                         <MenuItem onClick={()=>router.push('/trips')}
                       label="My trips"/>
                       <MenuItem onClick={()=>router.push('/favorites')}
                       label="My favorites"/>
                       <MenuItem onClick={()=>router.push('/reservation')}
                       label="My reservation"/>
                       <MenuItem onClick={()=>router.push('/properties')}
                       label="My properties"/>
                       <MenuItem onClick={RentModal.onOpen}
                       label="Airbnb my home"/>
                       <hr/>
                       <MenuItem onClick={()=> signOut()}
                       label="Logout"/>
                        </>
                    ):(
                    <>
                       <MenuItem onClick={loginModal.onOpen}
                       label="login"/>
                       <MenuItem onClick={registerModal.onOpen}
                       label="sign up"/>
                       </>
            )}
                    </div>
                </div>
            )}
        </div>
    )
};
export default UserMenu;    