"use client";

import { useGetSingleUserQuery, useUpdateUserMutation } from "@/redux/api/authApi";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UserProfileEditPage = ({params}) => {
  const router = useRouter()
  const {id} = params;
  const {data} = useGetSingleUserQuery(id);

  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [contact_no , setContact_no] = useState("");
  // const [name , setName] = useState("");
  // (data,'single user')
  const defaultValues = {
    name: data?.name,
    email: data?.email,
    contact_no: data?.contact_no,
    // password: data?.password
    
  };
  const { register, handleSubmit,setValue } = useForm({
    defaultValues: defaultValues
  });

  const [updateUser] = useUpdateUserMutation();

useEffect(()=>{
  setName(data?.name) ;
  setEmail(data?.email) ;
  setContact_no(data?.contact_no) 
},[data])
  


  const onHandleSubmit = async (e) => {
    e.preventDefault()
    // (values)
    try {
      // (name,contact_no,email)
       const res = await updateUser({
        id, name, email, contact_no
       });
      //  (res, 'afetr api')
       if(res){
        toast.success("Profile updated successfully");
        // router.push("/profile");
       }
       else{
        toast.error("Something is wrong to update user")
       }
       
      
      
    } catch (err) {
      toast.error(err.message);
    }
  };

 
 
  return (
    <>
    <h2 className="text-xl font-bold pb-5">Update Your Profile</h2>
    <div className="bg-white rounded-lg py-6 border border-gray-200 px-10 ">
      <form onSubmit={onHandleSubmit} >
      
       
          <input
          // {...register("name")}
          type="text"
          value={name}
          onChange={(e)=> setName(e.target.value)}
          placeholder="আপনার নাম"
          className="input input-bordered input-md w-full max-w-xs mr-5 outline-none mb-4"
        />
        
      
          <input
          // {...register("email")}
          type="email"
          value={email}
          // defaultValue={data?.email}
          onChange={(e)=> setEmail(e.target.value)}
          placeholder="আপনার ইমেইল"
          className="input input-bordered input-md w-full max-w-xs mb-4 mr-5"
        />
       
      
          <input
          // {...register("contact_no")}
          type="number"
          value={contact_no}
          // defaultValue={data?.contact_no}
          onChange={(e)=> setContact_no(e.target.value)}
          placeholder="আপনার মোবাইল নাম্বার"
          className="input input-bordered input-md w-full max-w-xs mb-4 mr-5"
        />
        
        {/* {data?.password && (
          <input
          {...register("password")}
          type="password"
          defaultValue={data?.password}
          placeholder="আপনার password"
          className="input input-bordered input-md w-full max-w-xs mb-4 mr-5"
        />
        )} */}
        {/* <input
          {...register("profession")}
          type="text"
          placeholder="আপনার পেশা"
          className="input input-bordered input-md w-full max-w-xs mb-4 mr-5"
        /> */}
        {/* <input
          {...register("address")}
          type="text"
          placeholder="আপনার ঠিকানা"
          className="input input-bordered input-md w-full max-w-xs mb-4 mr-5"
        /> */}
        {/* <input
          {...register("bateofbirth")}
          type="date"
          placeholder="আপনার জন্ম তারিখ"
          className="input input-bordered input-md w-full max-w-xs mb-4 mr-5"
        /> */}

        {/* <select
          className="select select-bordered w-full max-w-xs mb-4 mr-5"
          {...register("gender")}
          placeholder="gender"
        >
          <option disabled selected>
            Male
          </option>
          <option>Male</option>
          <option>Female</option>
          <option>Others</option>
        </select> */}

        {/* <select
          className="select select-bordered w-full max-w-xs mb-4 mr-5"
          {...register("gender")}
        >
          <option  selected>
            Primary Job
          </option>
          <option >
            Primary Job
          </option>
          <option>NTRCA Job</option>
          <option>BCS Job</option>
          <option>Others</option>
        </select>
        <textarea
          {...register("desc")}
          placeholder="নিজের সম্পর্কে লিখুন"
          className="textarea textarea-bordered textarea-lg w-full max-w-xs mb-4"
        ></textarea> */}
        <br />

        <input
          type="submit"
          value="সেভ করুন"
          className="flex items-center gap-3 bg-sky-900 text-white transition-all  hover:bg-blue-900 cursor-pointer px-5 py-2 rounded"
        />
      </form>
    </div>
    </>
  );
};

export default UserProfileEditPage;
