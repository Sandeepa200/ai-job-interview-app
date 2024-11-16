import { QUESTION_DESCRIPTION } from "@/constants/strings";
import { Lightbulb } from "lucide-react";
import React from "react";
import RecordAnswerSection from "./RecordAnswerSection";

const QuestionSection = ({ interviewQuestions, activeQuestionIndex }) => {
  return (
    interviewQuestions && (
        <div className="p-5 border rounded-lg ">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {interviewQuestions.map((question, index) => (
              <h2
                key={index} // This is the key prop added here
                className={`rounded-full p-2 text-xs md:text-sm text-center cursor-pointer ${
                  index === activeQuestionIndex
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary"
                }`}
              >
                Question #{index + 1}
              </h2>
            ))}
          </div>
          <div>
            <p className="my-5 text-md md:text-lg">
              {interviewQuestions[activeQuestionIndex]?.question}
            </p>
            <div className="border rounded-lg p-5 bg-purple-200 mt-20">
              <h2 className="flex gap-2 items-center text-primary">
                <Lightbulb />
                <strong>Note:</strong>
              </h2>
              <p className="text-sm text-primary my-2">
                {QUESTION_DESCRIPTION}
              </p>
            </div>
          </div>
        </div>
        

    )
  );
};

export default QuestionSection;
