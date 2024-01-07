'use client';
import {create} from 'zustand';



interface RentModaleStore {

    isOpen:boolean;
    onOpen:() => void;
    onClose: () =>void;
}

const useRentModal = create<RentModaleStore>((set) => ({
    isOpen : false,
    onOpen: () => set(() => ({isOpen:true})),
    onClose: () => set(() => ({isOpen:false})),
}));    

export default useRentModal;