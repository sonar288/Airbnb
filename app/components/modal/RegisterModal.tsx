'use client'
import axios from 'axios';
import {AiFillGithub} from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import { useCallback,useState } from 'react';
import{FieldValues,SubmitHandler,useForm} from 'react-hook-form';
import useRegisterModel from '../hooks/useRegisterModel';
import Modal from './modal';
import Heading from '../Heading';
import Input from '../Input/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
const RegisterModel = () => {  
    const RegisterModal = useRegisterModel();
    const[isLoading,setIsLoading] = useState(false);
    const{
        register,
        handleSubmit,
        formState:{errors}} = useForm<FieldValues>({
            defaultValues:{
                name:'',
                email:'',
                password:'',
            }
        });

        const onsubmit : SubmitHandler<FieldValues> =(data)=>{
            setIsLoading(true);

            axios.post('/api/auth/register',data)
            .then(()=>{
                RegisterModal.onClose();
            })
            .catch((error) =>{
                toast.error('Something Went Wrong');})
                .finally(() => {
                    setIsLoading(false);
                })
        } 
       const bodyContent=(
        <div className='flex flex-col gap-4'>
            <Heading 
            title='Welcome to Airbnb'
            subtitle='Create an account!'/>
            <Input
            id="email"
            label="Email"
            disabled={isLoading}
            register={register}
            errors={errors}
            requried />
            <Input
            id="name"
            label="Name"
            disabled={isLoading}
            register={register}
            errors={errors}
            requried />

            <Input
            id="password"
            label="Password"
            type='password'
            disabled={isLoading}
            register={register}
            errors={errors}
            requried />
        </div>
       )
       const footerContent =(
        <div className='flex flex-col gap-4 mt-3'>
            <hr/>
            <Button
            outline
            label='Continue with Google'
            icon={FcGoogle}
            onClick={() => {}}
            />
            <Button
            outline
            label='Continue with Github'
            icon={AiFillGithub}
            onClick={() => {}}
            />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='justify-center flex flex-row items-center gap-2'>
                <div>Already have an account?</div>
                <div onClick={RegisterModal.onClose} className='text-neutral-800 cursor-pointer hover:underline' > Log in</div>
                </div>
            </div>
        </div>
       )

    return (
        <Modal
         disabled={isLoading}
         isOpen={RegisterModal.isOpen}
         title='Register'
         actionLabel='continue'
         onClose={RegisterModal.onClose}
         onSubmit={handleSubmit(onsubmit)}
         body={bodyContent}
         footer={footerContent}
        />
    )
}
 
export default RegisterModel;