const Faq = () => {
  return (
    <div className="lg:px-14 py-10 px-3">
      <h2 className="text-center py-7 text-2xl font-bold">আপনার কিছু কমন <span className="text-bluePrimary">প্রশ্নের উত্তর</span></h2>
      <p className="text-center py-5">আপনাদের কমন কিছু প্রশ্নের উত্তর আমরা এখানে লিস্ট করে দিয়েছি। <br /> আমাদের কে প্রশ্ন করার পূর্বে এই লিস্টটি একবার পড়ে নেয়ার অনুরোধ থাকলো। <br /> তাহলে আমাদের উত্তরের জন্য আপনাকে অপেক্ষা করতে হবেনা এবং আপনার মূল্যবান সময় বেঁচে যাবে।</p>
      <div className="bg-white p-5 rounded border space-y-4">


      <div tabIndex={0} className="collapse collapse-arrow border border-gray-300 bg-base-200">
        <div className="collapse-title text-xl font-medium">কোর্স কত দিন চলবে?</div>
        <div className="collapse-content">
          <p>কোর্সটি 1৫ সপ্তাহ মানে প্রায় সাড়ে তিন মাস চলবে। কোন রকম বড় ধরণের দূর্যোগ বা অনিবার্য পরিস্থিতি তৈরী হলে কোর্স ডিউরেশন কিছুদিন বাড়তে পারে।</p>
        </div>
      </div>




      <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
        <div className="collapse-title text-xl font-medium">কোর্স ফী কত?</div>
        <div className="collapse-content">
          <p> কোর্সটির ফি নির্ধারণ করা হয়েছে এককালীন 5,000 টাকা মাত্র। তবে এনরোলমেন্টের সময় আপনি যদি বাংলাদেশি মোবাইল নাম্বার ব্যবহার না করে অন্য মোবাইল নাম্বার ব্যবহার করেন তাহলে কোর্স ফি হবে এককালীন 5,100 টাকা।</p>
        </div>
      </div>
      <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
        <div className="collapse-title text-xl font-medium"> কোর্স ফী কি ফেরত পাবো?</div>
        <div className="collapse-content">
          <p>কোর্স এনরোলমেন্ট ডেডলাইন শেষ হয়ে যাবার পর কোর্স ফি কোনভাবেই ফেরতযোগ্য নয়। তবে কোর্স এনরোলমেন্ট ডেডলাইন শেষ হয়ে যাবার আগে এবং এনরোলমেন্ট করার সর্বোচ্চ 7 দিনের মধ্যে আপনি আমাদের সাপোর্ট সেন্টার ফোন নাম্বারে কল দিয়ে উপযুক্ত কারণ জানিয়ে কোর্স ফি রিফান্ড রিকুয়েস্ট করতে পারবেন। আপনার কোর্স রিফান্ড রিকুয়েস্টটি সফল হবার পর আপনি কোর্সের সমস্ত এক্সেস হারাবেন এবং আমাদের প্লাটফর্মে আর লগইন করতে পারবেন না। তবে রিফান্ড এর জন্যে সকল প্রকার বাহ্যিক এবং প্লাটফর্ম চার্জ ক্রেতাকেই বহন করতে হবে।</p>
        </div>
      </div>
      <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
        <div className="collapse-title text-xl font-medium">কোর্সের ভিডিওগুলো কিভাবে আসবে</div>
        <div className="collapse-content">
          <p>কোর্সের ভিডিওগুলো আগে থেকে রেকোর্ডেড থাকবে। আপনি এনরোল করার পর আপনাকে দেয়া লগইন ইনফরমেশন দিয়ে লগইন করে আপনি ভিডিও গুলো যথা সময়ে দেখতে পারবেন। প্রতি সপ্তাহে 1-2টি মডিউল রিলিজ দেয়া হবে এবং প্রতিটি মডিউলে 10-12টি ভিডিও থাকবে। এই ভিডিওগুলো আপনাকে সপ্তাহের প্রথম 5 দিনের মধ্যে দেখা শেষ করতে হবে যেন বাকি 2 দিনে মডিউল শেষে দেয়া এসাইনমেন্ট করে জমা দিতে পারেন। তবে আপনি যদি ভিডিওগুলো স্বল্প সময়ে দেখে ফেলতে পারেন তাহলে এসাইনমেন্টের জন্য সময় বেশি পাবেন।</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Faq;
