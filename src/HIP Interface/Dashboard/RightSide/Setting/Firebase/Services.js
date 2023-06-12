import { db } from "./Config"

import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore"

const BharatCollectionRef = collection(db, "BharatSeva")