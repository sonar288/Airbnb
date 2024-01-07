'use client';
import { useMemo, useState } from "react";
import Modal from "./modal";
import { useForm , FieldValues } from "react-hook-form";

import useRentModal from "@/app/hooks/useRentModal"
import { set } from "react-hook-form";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CatagoryInput";

enum STEPS{
   CATEGORY=0,
   LOCATION=1,
   INFO=2,
   IMAGES=3,
   DESCRIPTION=4,
   PRICE=5 
}


const RentModal =()=>{

    const RentModal = useRentModal(); 

     const [step, setStep] = useState<STEPS>(STEPS.CATEGORY);
     const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset
     } = useForm<FieldValues>({

        defaultValues:{
            category:"",
            location:"",
            guestCount:1,
            roomCount:1,
            bathroomCount:1,
            imageSrc:"",
            price:1,
            title:"",
            description:""
        }
     });
     const Category = watch("category");
     const setCustomValue = (id:string, value:any)=>{
        setValue(id,value,{
            shouldDirty:true,
            shouldTouch:true,
            shouldValidate:true
        })
     }
     const onBack = ()=>{
        setStep((value)=>value-1)
     };
     const onNext=()=>{
        setStep((value)=>value+1)
     }
     const actionlabel= useMemo(()=>{
        if (step === STEPS.PRICE){
            return "Create";
        }
        return "Next";
     },[step])
     const secondActionLabel = useMemo(()=>{
        if(step === STEPS.CATEGORY){
            return undefined
        }
        return "Back";
     },[step]);
          let bodyConent = (
            <div className=" flex flex-col gap-8">
                <Heading
                title="Which of these best describrs your place?"
                subtitle="Pick a Category"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                    {categories.map((item)=>(
                        <div key={item.label} className="col-span-1">
                            <CategoryInput
                             onClick={(category)=> setCustomValue('category', category)}
                             selected={Category === item.label}
                             label={item.label}
                             icon={item.icon}
                            />
                        </div>
                   ))}
                </div>
            </div>
          )
    return( 
           <Modal
           isOpen={RentModal.isOpen}
           onClose={RentModal.onClose}
           onSubmit={RentModal.onClose}
           actionLabel={actionlabel}
           secondaryActionLabel={secondActionLabel}
           secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
           title="Airbnb your home"
           body={bodyConent}

           />
    )
}
export default RentModal;