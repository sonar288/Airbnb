'use client';

import {IconType} from "react-icons";

interface CategoryInputProps{
    label: string;
    selected: boolean;
    icon: IconType;
    onClick: (value:string)=>void;
}

const CategoryInput: React.FC<CategoryInputProps>=({
    label,
    selected,
    icon : Icon,
    onClick
})=>{
    return(
        <div
       onClick={()=>onClick(label)}
       className={`
       rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer
       ${selected ? 'border-black': 'bordr-neural-200'}
       `}
        >
            <Icon size={32}/>
            <div className="font-semiblod">{label}</div>
        </div>
    )
}

export default CategoryInput;