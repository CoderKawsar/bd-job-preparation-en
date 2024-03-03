import Image from "next/image";
import img1 from "../../../assets/images/benefit1.svg";
import img2 from "../../../assets/images/benefit2.svg";
import img3 from "../../../assets/images/benefit3.svg";
import img4 from "../../../assets/images/benefit4.svg";
import img5 from "../../../assets/images/benefit5.svg";
import img6 from "../../../assets/images/benefit6.svg";
import img7 from "../../../assets/images/benefit7.svg";
import img8 from "../../../assets/images/benefit8.svg";

const data = [
  {
    id: 1,
    img: img8,
    title: "ইন্ডাস্ট্রি এক্সপার্টদের কন্টেন্ট",
    desc: "আমাদের প্রতিটা কন্টেন্ট ইন্ডাস্ট্রির টপ এক্সপার্টদের সরাসরি সাপোর্ট, গাইডেন্স ও ফিডব্যাক দিয়ে বানানো।",
  },
  {
    id: 2,
    img: img1,
    title: "মেন্টরদের সরাসরি সাপোর্ট",
    desc: "কোর্স করতে গিয়ে সমস্যায় পড়লে নির্দিষ্ট সাপোর্ট আওয়ারে যোগাযোগ করলেই সমাধান পাবেন আমাদের অভিজ্ঞ মেন্টরদের কাছ থেকে।",
  },
  {
    id: 3,
    img: img2,
    title: "প্রজেক্ট ও অ্যাসাইনমেন্ট",
    desc: "মার্কেট স্ট্যান্ডার্ড প্র্যাকটিক্যাল প্রজেক্ট ও অ্যাসাইনমেন্ট করানো হবে, যেগুলো নিজের পোর্টফোলিওতে যুক্ত করতে পারবেন।",
  },

  {
    id: 4,
    img: img3,
    title: "ফ্রিল্যান্সিং সাপোর্ট",
    desc: "কোর্স শেষে ফ্রিল্যান্সিং করতে চাইলে তার বিস্তারিত গাইডলাইন আর সাপোর্ট দেয়া হবে।",
  },
  {
    id: 5,
    img: img4,
    title: "জব ও ইন্টার্নশিপের সম্ভাবনা",
    desc: "জব ও ইন্টার্নশিপের সম্ভাবনা বেস্ট পারফর্মারদের জব ক্যান্ডিডেট প্রোফাইল সরাসরি শেয়ার করা হবে আমাদের পার্টনার প্রতিষ্ঠানগুলোর সাথে।",
  },
  {
    id: 6,
    img: img5,
    title: "ক্যারিয়ার ও ইন্টারভিউ প্রস্তুতি",
    desc: "আপনার সিভি, LinkedIn প্রোফাইল, GitHub প্রোফাইল আর চাকরির ইন্টারভিউর ব্যাপারে সরাসরি সাপোর্ট পাবেন আমাদের কাছে।",
  },
  {
    id: 7,
    img: img6,
    title: "ভেরিফাইড সার্টিফিকেট",
    desc: "কোর্স শেষে আপনার পারফরম্যান্সের উপর গ্রেডিং করা হবে। সে অনুযায়ী আপনি বহুব্রীহি থেকে সার্টিফিকেট পাবেন।",
  },
  {
    id: 8,
    img: img7,
    title: "সুবিধামতো সময়ে শেখা",
    desc: "নিজের সুবিধামতো সময়ে ও গতিতে আমাদের কোর্সের লার্নিং ম্যাটেরিয়ালগুলো থেকে শিখতে পারবেন আপনি।",
  },
];

const Benefits = () => {
  return (
    <div className="lg:px-14 py-10 px-3">
      <h2 className="lg:text-3xl md:text-xl font-bold pt-5 pb-10 dark:text-cyanPrimary">
        {" "}
        ইজি জব প্রিপারেশন থেকে আপনি কী কী সুবিধা পাবেন
      </h2>

      <div className="grid lg:grid-cols-2 gap-4">
        {data?.map((item) => (
          <div
            key={item?.id}
            className="hover:bg-white border rounded shadow-md hover:shadow-2xl py-5 cursor-pointer"
          >
            <div className="flex gap-5  px-4">
              <div>
                <Image src={item?.img} alt="benefit8" height={200} width={200} />
              </div>
              <div>
                <h4 className="font-semibold text-xl py-2">{item?.title}</h4>
                <p className="text-md font-medium">{item?.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
