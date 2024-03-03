'use client'

import { useGetAllSubcategoriesQuery } from "@/redux/api/subcategoryApi";

const NavigationMenu = () => {

    const {data:subcategory} = useGetAllSubcategoriesQuery();
    const allData =subcategory?.subcategories;
      
    const renderSubcategories = (subcategories) => (
      <ul className="sub-menu ml-4">
        {allData?.map((subcategory) => (
          <li key={subcategory?.id} className="sub-category">
            <div className="bg-green-500 text-white p-2 rounded">
              {subcategory?.title}
            </div>
            <div className="routine ml-4">
              <a href={subcategory?.routine} className="text-blue-500">
                Routine
              </a>
            </div>
          </li>
        ))}
      </ul>
    );
  
    // const renderCategories = () =>
    //   data.map((category) => (
    //     <li key={category.id} className="category">
    //       <div className="bg-blue-500 text-white p-2 rounded">
    //         {category.sub_category_id.title}
    //       </div>
    //       {renderSubcategories(category.sub_category_id.subcategories)}
    //     </li>
    //   ));
  
    return <ul className="space-y-2" > 
        {renderSubcategories()}
    </ul>;
  };
  
  export default NavigationMenu;