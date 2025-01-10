import { Button } from "flowbite-react";
import React from "react";

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1  justify-center  flex flex-col ">
        <h2 className="text-2xl">Want to Learn More about JavaScript?</h2>
        <p className="text-gray-500 my-2">
          Checkout these resourses with JavaScript MDN , W3Schools, and
          FreeCodeCamp
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a
            href="https://developer.mozilla.org/en-US/"
            target="_blank"
            rel="noopener noreferrer"
          >
            JavaScript
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThki-9VcEdan2fveCVH8Oa1_cWnVU0wQN9A&s"
          alt=""
        />
      </div>
    </div>
  );
};

export default CallToAction;
