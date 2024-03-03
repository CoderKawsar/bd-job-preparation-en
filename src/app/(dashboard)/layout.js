
import DashboardMetadata from "@/components/dashboard/DashboardMetadata";


export const metadata = {
  title: 'ড্যাশবোর্ড',
}
const DashBoardLayout = ({ children }) => {



  return (
    <>
      <DashboardMetadata children={children} />

    </>
  )
}




export default DashBoardLayout;








