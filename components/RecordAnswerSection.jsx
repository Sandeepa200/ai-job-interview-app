import { WebcamIcon } from "lucide-react";
import React from "react";
import Webcam from "react-webcam";
import { Button } from "./ui/button";

const RecordAnswerSection = () => {
  return (
    <div>
      <div className="flex flex-col my-20 justify-center items-center bg-black rounded-lg p-5">
        <WebcamIcon className="h-72 w-full text-white absolute" />
        <div>
          <Webcam
            mirrored={true}
            style={{ height: 300, width: "100%", zIndex: 10 }}
          />
        </div>
      </div>
      <div className="flex justify-end items-end text-end">
        <Button>Record Answer</Button>
      </div>
    </div>
  );
};

export default RecordAnswerSection;
