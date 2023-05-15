import { db } from "./Config"

import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore"

const BharatCollectionRef = collection(db, "BharatSeva")


class Hospitals {
    // U_PatBioCreated(id, data) {
    //     const NewPatBioData = doc(db, "BharatSeva", id)
    //     console.log(id, data)
    //     return updateDoc(NewPatBioData, data)
    // }
    // U_RecordsCreated(id, data) {
    //     const NewPatBioData = doc(db, "BharatSeva", id)
    //     return updateDoc(NewPatBioData, data)
    // }
    // U_RecordsViewd(id, data) {
    //     const NewPatBioData = doc(db, "BharatSeva", id)
    //     return updateDoc(NewPatBioData, data)
    // }
    // U_TotalRecordsViewd(id, data) {
    //     const NewPatBioData = doc(db, "BharatSeva", id)
    //     return updateDoc(NewPatBioData, data)
    // }
    
    GetAllRecords(){
        return getDocs(BharatCollectionRef);
    }

    U_Records(id, data){
        const NewData = doc(db, "BharatSeva", id)
        return updateDoc(NewData, data)
    }
    // U_availability(id, data) {
    //     const NewPatBioData = doc(db, "BharatSeva", id)
    //     return updateDoc(NewPatBioData, data)
    // }
    // U_email(id, data) {
    //     const NewPatBioData = doc(db, "BharatSeva", id)
    //     return updateDoc(NewPatBioData, data)
    // }
}


export default new Hospitals()