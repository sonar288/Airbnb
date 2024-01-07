'use client'
import { safeUser } from "@/app/types";
import Container from "../container";
import Logo from "./logo";
import Search from "./search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";
interface NavbarProps{
  currentUser?: safeUser | null;
}
const Navbar: React.FC<NavbarProps> = ({
  currentUser
})=>{
  console.log({currentUser});
    return(
        
        <div className="fixed w-full bg-white z-10 shadow-sm">
          <div className="py-4 border-b-[1px]">
            <Container>
              <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                <Logo/>
                <Search/>
                <UserMenu currentUser={currentUser}/>
                
              </div>
            </Container>
          </div>
          <Categories/>
        </div>
    );
}
export default Navbar;