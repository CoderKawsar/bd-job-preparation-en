"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const ContactForm = () => {
  const form = useRef();
  const [submissionStatus, setSubmissionStatus] = useState("submitNow");

  const sendEmail = (e) => {
    e.preventDefault();

    setSubmissionStatus("submitting");

    emailjs
      .sendForm(
        "service_3enyp94",
        "template_58eqzje",
        form.current,
        "ZM_l5RHz-XAPu2mYN"
      )
      .then(
        (result) => {
          if (result.status === 200) {
            setSubmissionStatus("submitted");
            toast.success("Your mail is submitted successfully!");
          }
        },
        (error) => {
          setSubmissionStatus("submitNow");
          toast.error(error.text);
        }
      );
  };
  return (
    <div>
      <form ref={form} onSubmit={sendEmail} className="space-y-4">
        <input
          type="text"
          name="from_name"
          className="px-4 py-3 bg-gray-200 w-full outline-none text-xl rounded "
          placeholder=" Your Name*"
          required
        />
        <input
          type="text"
          className="px-4 py-3 bg-gray-200 w-full outline-none text-xl rounded "
          placeholder=" Your Email *"
          name="from_email"
          required
        />
        <input
          type="text"
          className="px-4 py-3 bg-gray-200 w-full outline-none text-xl rounded "
          placeholder="Your Mobile Number *"
          name="from_con"
          pattern="^01\d{9}$"
          title="Mobile Number must be in the format: 01XXXXXXXXX"
          required
        />

        <textarea
          rows={5}
          type="text"
          className="px-4 py-3 bg-gray-200 w-full outline-none text-xl rounded "
          placeholder="Write Your Message  *"
          name="message"
          required
        />
        <input
          type="submit"
          className={`px-4 py-3 bg-bluePrimary w-full text-white outline-none text-lg rounded cursor-pointer hover:bg-cyanPrimary transition-all duration-500 delay-500 ${
            submissionStatus === "submitting" &&
            "opacity-50 pointer-events-none"
          }`}
          value={
            submissionStatus === "submitNow"
              ? " Submit"
              : submissionStatus === "submitting"
              ? "Submitting..."
              : "Submitted"
          }
          disabled={submissionStatus === "submitting"}
        />
      </form>
    </div>
  );
};

export default ContactForm;
