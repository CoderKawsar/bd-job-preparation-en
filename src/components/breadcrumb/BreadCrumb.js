"use client";

const BreadCrumb = ({items}) => {
  return (
    <div>
    <div className="text-sm breadcrumbs">
      <ul>
        {items?.map((item, index) => (
          <li key={index}>
            {item.link ? (
              <a href={item.link} >{item.label}</a>
            ) : (
              <span className="text-md font-bold">{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
};

export default BreadCrumb;
