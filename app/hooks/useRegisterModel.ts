import {create} from 'zustand';



interface RegisterModel {

    isOpen:boolean;
    onOpen:() => void;
    onClose: () =>void;
}

const useRegisterModel = create<RegisterModel>((set) => ({
    isOpen : false,
    onOpen: () => set(() => ({isOpen:true})),
    onClose: () => set(() => ({isOpen:false})),
}));    

export default useRegisterModel;