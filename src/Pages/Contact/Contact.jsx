import { useRef } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_enlyukm",
        "template_ymkuiwa",
        form.current,
        "vlQ0eeWPnSc81To5i"
      )
      .then(
        (result) => {
          console.log(result);
          if (result.status == 200) {
            toast.success("Message Send!");
            form.current.reset();
          }
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <section className="w-10/12 mx-auto pt-20 pb-40">
      <h2 className="text-center text-xl sm:text-3xl pt-0">Contact us</h2>
      <div className="h-0.5 w-[10%] bg-gray-300 mx-auto rounded-full mt-2"></div>
      <div className="h-0.5 w-[13%] bg-gray-300 mx-auto rounded-full mt-1 mb-20"></div>
      <div className="grid md:grid-cols-2">
        <div className="">
          <img
            className="w-full h-full rounded-2xl"
            src="https://images.pexels.com/photos/4195409/pexels-photo-4195409.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
        <form
          className="p-2 md:p-10 text-gray-800 dark:text-stone-200"
          ref={form}
          onSubmit={sendEmail}
        >
          <div className="relative mb-8 group">
            <label>Name</label>
            <div className="w-0 h-0.5 group-hover:w-full transition-all duration-1000 absolute bottom-0 bg-blue-500"></div>
            <input
              className="w-full focus:outline-none py-2 bg-transparent border-b-2 focus:border-green-500 border-gray-400"
              type="text"
              placeholder="Your name"
              required
              name="user_name"
            />
          </div>
          <div className="relative mb-8 group">
            <label>Email</label>
            <div className="w-0 h-0.5 group-hover:w-full transition-all duration-1000 absolute bottom-0 bg-blue-500"></div>
            <input
              className="w-full focus:outline-none py-2 bg-transparent border-b-2 focus:border-green-500 border-gray-400"
              type="email"
              placeholder="Your email"
              required
              name="user_email"
            />
          </div>
          <div className="relative mb-8 group">
            <label>Message</label>
            <div className="w-0 h-0.5 group-hover:w-full transition-all duration-1000 absolute bottom-0 bg-blue-500"></div>
            <input
              className="w-full focus:outline-none py-2 bg-transparent border-b-2 focus:border-green-500 border-gray-400"
              placeholder="Message here . . ."
              required
              name="message"
            />
          </div>
          <button
            type="submit"
            className="inline-flex relative bg-[#000000] rounded-full px-8 py-2 text-lg font-semibold text-gray-100 dark:text-gray-900"
          >
            Send it
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
