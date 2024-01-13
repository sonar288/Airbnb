'use client';
import { useMemo, useState } from "react";
import Modal from "./modal";
import { useForm , FieldValues , SubmitHandler } from "react-hook-form";

import useRentModal from "@/app/hooks/useRentModal"
import { set } from "react-hook-form";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CatagoryInput";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/imageUplode";
import Input from "../inputs/Intput";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";



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
    const router = useRouter();

     const [step, setStep] = useState<STEPS>(STEPS.CATEGORY);
     const [isLoading, setIsLoading] = useState(false);
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
    const Location = watch("location");
    const guestCount = watch("guestCount");
    const roomCount = watch("roomCount");
    const bathroomCount = watch("bathroomCount");
    const imageSrc = watch("imageSrc");
     const Map = useMemo(() => dynamic(() => import('../Map'), { 
        ssr: false 
      }), []);
     const setCustomValue = (id:string, value:any)=>{
        setValue(id,value,{
            shouldDirty:true,
            shouldTouch:true,
            shouldValidate:true
        })
     }
      const onSubmit:SubmitHandler<FieldValues> = (data) => {
        if(step !== STEPS.PRICE){
            return onNext();
        }
        setIsLoading(true);

        axios.post('/api/listings',data)
        .then(()=>{
            toast.success("Listing Created");
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            RentModal.onClose();
        })
        .catch(()=>{
            toast.error("Something went wrong");
        })
        .finally(()=>{
            setIsLoading(false);
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
          let bodyContent = (
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
              if(step === STEPS.LOCATION){
                bodyContent=(
                    <div className=" flex flex-col gap-8">
                        <Heading
                        title="Wher is your place located"
                        subtitle="Help guest find you!"
                        />
                        <CountrySelect
                        value={Location}
                        onChange={(value) => setCustomValue('location',value)}/>
                        <Map center={Location?.latlng}/>
                     </div>
                )
              }
              if (step === STEPS.INFO){
                bodyContent=(
                    <div className="flex flex-col gap-8">
                        <Heading
                        title="Share some basics about your place"
                        subtitle="What amenities do you offer?"
                        />
                        <Counter
                        title="Guest"
                        subtitle="How many guest do you allow?"
                        value={guestCount}
                        onChange={(value)=> setCustomValue('guestCount',value)}/>
                        <hr />
                        <Counter
                        title="Rooms"
                        subtitle="How many rooms do you have?"
                        value={roomCount}
                        onChange={(value)=> setCustomValue('roomCount',value)}/>
                        <hr />
                        <Counter
                        title="Bathrooms"
                        subtitle="How many Bathrooms do you have?"
                        value={bathroomCount}
                        onChange={(value)=> setCustomValue('bathroomCount',value)}/>
                    </div>
                )
              }
              if(step === STEPS.IMAGES){
                bodyContent=(
                    <div className="flex flex-col gap-8">
                        <Heading
                        title="Add a photo of your place"
                        subtitle="Show guest what your place looks like!"
                        />
                        <ImageUpload
                         value={imageSrc}
                         onChange={(value)=> setCustomValue('imageSrc',value)}
                        />
                    </div>
                )
              }
              if(step === STEPS.DESCRIPTION){
                bodyContent=(
                    <div className="flex flex-col gap-8">
                        <Heading
                        title="How would you describe your place?"
                        subtitle="Short and sweet works best"
                        />
                        <Input
                        id="title"
                        label="Title"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                        />
                        <hr />
                        <Input
                        id="description"
                        label="Description"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                        />
                    </div>

                )
              }
              if(step === STEPS.PRICE){
                bodyContent = (
                      <div className="flex flex-col gap-8">
                        <Heading
                        title="Now set your price!"
                        subtitle="How much do you charge per night?"
                        />
                        <Input
                        id="price"
                        label="Price"
                        formatPrice
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                        />
                      </div> 
                )
              }


    return( 
           <Modal
           isOpen={RentModal.isOpen}
           onClose={RentModal.onClose}
           onSubmit={handleSubmit(onSubmit)}
           actionLabel={actionlabel}
           secondaryActionLabel={secondActionLabel}
           secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
           title="Airbnb your home"
           body={bodyContent}

           />
    )
}
export default RentModal;