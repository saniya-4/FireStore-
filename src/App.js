import {getFirestore ,collection,addDoc,doc,getDoc,query,where,getDocs,updateDoc} from "firebase/firestore"
import {app} from './firebase'

import './App.css';
const firestore=getFirestore(app);
function App() {
  const writeData=async ()=>
  {
   const result=await  addDoc(collection(firestore,'cities'),
  {
    name:"Delhi",
    pinCode:1234,
    lat:123,
    long:456
  })
  console.log("Result",result);
  }
  const makeSubCollections=async()=>{
    await addDoc(collection(firestore,"cities/Dk7nvpEjbDM84B3BPITh/places"),{
      name:"This is a place",
      desc:"This is capital of India",
      date:Date.now(),
    })
  }
  const getDocument=async()=>
  {
    const ref=doc(firestore,"cities","Dk7nvpEjbDM84B3BPITh");
    const snap=await getDoc(ref);
    console.log(snap.data());
  }
  const getDocumentByQuery=async()=>
  {
    const collectionRef=collection(firestore,"users");
    const q=query(collectionRef,where("isMale","==",true));
    const snap=await getDocs(q);
    snap.forEach((data)=>console.log(data.data()));

  }
  const update=async()=>
  {
    const docRef=doc(firestore,'cities',"Dk7nvpEjbDM84B3BPITh");
    await updateDoc(docRef,{
      name:"hello",
    })
  }
  return (
    <div className="App">
      <h1>Firebase Firestore</h1>
      <button onClick={writeData}>Put Data</button>
      <button onClick={makeSubCollections}>Put Sub data </button>
      <button onClick={getDocument}>Get Document</button>
      <button onClick={getDocumentByQuery}>Get Document By Query</button>
      <button onClick={update}>Update</button>
     
    </div>
  );
}

export default App;
