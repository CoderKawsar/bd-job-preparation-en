import BreadCrumb from "../breadcrumb/BreadCrumb";


const Commonbanner = ({title,breadcrumbItems}) => {

  return (
    <div >
      <div className="banner  py-14">
        <div className="flex justify-center items-center">
            <div>
            <h2 className="font-bold text-2xl"> {title}</h2>
            <BreadCrumb items={breadcrumbItems}  />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Commonbanner;
