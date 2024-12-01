 import React, { useState, useRef, ChangeEvent } from "react";
 import { HiUpload } from "react-icons/hi";
 import { SlArrowDown } from "react-icons/sl";

 interface Document {
   file: File;
   dateUploaded: string;
   type: string;
   response: string;
 }

 const Prediction: React.FC = () => {
   const [documents, setDocuments] = useState<Document[]>([]);
   const fileInputRef = useRef<HTMLInputElement>(null);


   const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
  const files = event.target.files;
  if (files) {
    const newDocuments: Document[] = Array.from(files).map((file) => ({
      file,
      dateUploaded: new Date().toLocaleDateString(),
      type: file.type,
      response: "Pending", // Assuming response is initially pending
    }));
    setDocuments((prevDocuments) => [...prevDocuments, ...newDocuments]);
  }
};


   const openFileInput = () => {
     if (fileInputRef.current) {
       fileInputRef.current.click();
     }
   };

   return (
     <div className="container mx-auto">
       <div className="flex items-center bg-ground rounded-lg mt-2 h-screen">
         <div className="mb-10 h-96 mx-auto justify-between w-auto overflow-auto items-center rounded-lg">
           <div className="mb-10">
             <table className="table-auto w-full">
               <thead>
                 <tr>
                   <th className="px-4 py-2 text-xs">
                     <div className="  items-center mr-80 mt-10">
                       <span>Document/Image</span>
                       <div
                         className="ml-2 cursor-pointer flex items-center justify-center w-36 h-10 bg-white
                         hover:text-white text-black rounded-l transition duration-300 hover:bg-green-800"
                         onClick={openFileInput}
                       >
                         <div className="flex ">
                           <HiUpload /> Upload Image
                         </div>
                         <input
                           type="file"
                           ref={fileInputRef}
                           onChange={handleFileUpload}
                           multiple
                           className="hidden"
                         />
                       </div>
                     </div>
                   </th>
                   <th>
                     <div className="px-4 py-2 text-xs mr-5">Date Uploaded</div>
                   </th>
                   <th>
                     <div className="px-4 py-2 text-xs mr-20">Type</div>
                   </th>
                   <th>
                     <div className="px-4 py-2 text-xs mr-10">Response</div>
                   </th>
                 </tr>
               </thead>
               <tbody>
                 {documents.map((document, index) => (
                   <tr key={index}>
                     <td className="border px-4 py-2">{document.file.name}</td>
                     <td className="border px-4 py-2">
                       {document.dateUploaded}
                     </td>
                     <td className="border px-4 py-2">{document.type}</td>
                     <td className="border px-4 py-2 relative">
                       {document.response}
                       <button className="absolute top-1/2 transform -translate-y-1/2 left-12">
                         <SlArrowDown className="w-2 h-3" />
                       </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </div>
       </div>
     </div>
   );
 };

 export default Prediction;
