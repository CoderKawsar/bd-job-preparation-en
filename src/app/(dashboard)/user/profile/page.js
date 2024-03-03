

const UserProfile = () => {
  return (
    <div>
      <header>User dash</header>
      <div className="flex justify-start items-center gap-5">
        <div className="bg-gray-500 h-screen">
          sidebar
        </div>
        <div className="bg-gray-300 h-screen w-100">
          content
        </div>
      </div>
      <footer >
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
      </footer>
    </div>
  )
}

export default UserProfile