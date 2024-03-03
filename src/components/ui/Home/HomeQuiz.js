
import Link from "next/link"


const HomeQuiz = () => {


  return (
    <div className="lg:px-14 py-10 px-3 rounded shadow-current">
      <div className="px-14 ">
        <div className="space-y-4">
          <h2 className="lg:text-3xl md:text-2xl font-semibold">বুঝতে পারছেন না কোথা থেকে শুরু করবেন?</h2>
          <h5 className="lg:text-lg py-4 mb-3">চিন্তার কিছু নেই! আমাদের কুইজ সেগমেন্ট আপনাকে পৌছে দেবে সঠিক সিদ্ধান্তে।।</h5>
          <Link href="/basicQuiz">
            <button className="flex items-center gap-3 bg-yellowPrimary text-white ease-out duration-500 transition-all hover:bg-cyanPrimary cursor-pointer px-6 py-3 rounded "> কুইজ শুরু করুন</button>
          </Link>


        </div>
      </div>
    </div>
  )
}

export default HomeQuiz