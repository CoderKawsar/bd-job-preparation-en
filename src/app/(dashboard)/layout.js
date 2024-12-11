import DashboardMetadata from "@/components/dashboard/DashboardMetadata";

export const metadata = {
  title: "Dashboard",
};
const DashBoardLayout = ({ children }) => {
  return (
    <>
      <DashboardMetadata children={children} />
    </>
  );
};

export default DashBoardLayout;
