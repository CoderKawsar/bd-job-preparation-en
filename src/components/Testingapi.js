'use client'
import React from 'react';
import { useForm } from "react-hook-form";


const AddProduct = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const validToken = user.token;
  

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    
    const formData = new FormData();
    var allPics = []
    formData.append('avatar', data.icon['0']);

    
    for (let i = 0; i < (data.allImages.length); i += 1) {
    formData.append('pictures', data.allImages[i]);

      
    }
    

    formData.append('description', data.description);
    // (allPics);
    
    // formData.append('pictures', allPics);
    // (formData.entries());
    for (var key of formData.entries()) {
      (key[0] + ', ' + key[1]);
  }


    formData.append('name', data.name);
    formData.append('category', data.category);
    formData.append('sku', data.sku);
    formData.append('packageSize', data.packageSize);
    formData.append('rate', data.rate);
    formData.append('tax', data.tax);
    formData.append('mrp', data.mrp);
    formData.append('shipperSize', data.shipperSize);
    formData.append('cv', data.cv);
    formData.append('remarks',data.remarks);

    // let allImages
   

    fetch("http://localhost:7070/prd/new", {
      method: "POST",
      headers: {
        'authorization': `Bearer ${validToken}`,
        
      },
      body: formData
      
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        (result);
        if ('error' in result) {
          alert(result.error)
        } else {
          alert(result.msg)
        }
      })
      .catch(error => {
        (error);
      });

    reset();



  };
  return (
    <>

      <div className="text-start  container " >
        <div className="wrapper">
          <div className="title">
            <h2 style={{ color: '#4abd00' }} className="">Add New Product</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form">
               <div className="inputfield">
                <label>Product Name</label>
                <input type="text" className="input" placeholder='Add Product Name' name="name"
                  

                  {...register("name", { required: true })} />
              </div>
              <div className="inputfield">
                <label>Category</label>
                <input type="text" className="input" placeholder='Add Product category' name="category"
                  
                  {...register("category", { required: true })} />
              </div>
              <div className="inputfield">
                <label>Product Code</label>
                <input type="text" className="input" placeholder='Add Product Code' name="sku"
                  
                  {...register("sku", { required: true })} />
              </div>
              <div className="inputfield">
                <label>Package Size</label>
                <input type="text" className="input" placeholder='Add Package kg /ml' name="packageSize"
                 
                  {...register("packageSize", { required: true })} />
              </div>

             {/* <div className="inputfield">
                <label>Package Size</label>
                <div className="custom_select">
                  <select type="text" name="packageSize"
                    // onChange={e => setPackageSize(e.target.value)} required
                    {...register("packageSize", { required: true })}>
                    <option value="">Select</option>
                    <option value="kg"></option>
                    <option value="ml"></option>
                  </select>
                </div>
              </div> */}
              

              <div className="inputfield">
                <label>Shipper size</label>
                <input type="text" className="input" placeholder="Add Shipper Size/pics" name="shipperSize"
                 
                  {...register("shipperSize", { required: true })} />
              </div>
              <div className="inputfield">
                <label>Product Rate</label>
                <input type="number" className="input" placeholder="Add Product Rate" name="rate"
                  
                  {...register("rate", { required: true })} />
              </div>
              <div className="inputfield">
                <label>Tax</label>
                <input type="number" className="input" placeholder="Add Product Tax" name="tax"
                 
                  {...register("tax", { required: true })} />
              </div>
              <div className="inputfield">
                <label>MRP</label>
                <input type="number" className="input" placeholder="Add MRP" name="mrp"
                 

                  {...register("mrp", { required: true })} />
              </div>
              <div className="inputfield">
                <label>CV</label>
                <input type="number" className="input" placeholder="Add CV" name="cv"
                 
                  {...register("cv", { required: true })} />
              </div> 
              <div className="inputfield">
                <label>Product Icon</label>
                <input type="file" className="input" placeholder="Add Icon" name="avatar"
                  
                  {...register("icon", { required: true })} />
              </div>
              <div className="inputfield">
                <label>Pictures</label>
                <input type="file" className="input" placeholder="img url" name="pictures" multiple="multiple"
                  
                  {...register("allImages", { required: true })} />
              </div>
              <div className="inputfield">
                <label>Description</label>
                <textarea className="textarea" type='text' placeholder="Write some Description" name="description"
                  
                  {...register("description", { required: true })}></textarea>
              </div>
              <div className="inputfield">
                <label>Remarks</label>
                <textarea className="textarea" placeholder="Write Some remarks" name="remarks"
                 
                  {...register("remarks", {})}></textarea>
              </div>



              <div className="inputfield">
                <input type="submit" value="ADD " className="add-btn" />
              </div>
            </div>
          </form>
        </div>

      </div>
    </>
  );

}

export default AddProduct;