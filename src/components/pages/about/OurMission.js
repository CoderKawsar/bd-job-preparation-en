import React from "react";

const OurMission = () => {
  return (
    <div className="px-14">
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-5">
          <h5 className="text-bluePrimary font-semibold uppercase">Our Mission</h5>
          <h2 className="text-3xl font-bold">Education In Continuing A Proud Tradition</h2>
          <p className="text-black text-justify">
            EduVibe offers a diverse range of courses, spanning various subjects and levels of
            difficulty, to cater to learners with different interests and skill levels. We leverage
            innovative technology, such as artificial intelligence and machine learning, to enhance
            the learning experience, provide personalized feedback and recommendations, and improve
            the effectiveness of its courses.
          </p>
        </div>
        <div className="space-y-5">
          <h5 className="text-bluePrimary font-semibold uppercase">OUR VISION</h5>
          <h2 className="text-3xl font-bold">Education Is About Creating Leaders For Tomorrow</h2>
          <p className="text-black text-justify">
            As an online learning platform, EduVibe’s vision is to make education accessible to
            everyone, regardless of their location, background, or socioeconomic status. Its primary
            goal should be to empower individuals with knowledge and skills that can help them
            succeed in their personal and professional lives. Our aim to create a platform that
            understands each learner’s needs and preferences
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurMission;
