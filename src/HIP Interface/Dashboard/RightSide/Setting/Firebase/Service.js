import { db } from "./Config"

import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore"

const BharatCollectionRef = collection(db, "BharatSeva")


class Hospitals {
    
    GetAllRecords(){
        return getDocs(BharatCollectionRef);
    }

    U_Records(id, data){
        const NewData = doc(db, "BharatSeva", id)
        return updateDoc(NewData, data)
    }
}


export default new Hospitals()