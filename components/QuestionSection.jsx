import React from "react";

const QuestionSection = ({ interviewQuestions, activeQuestionIndex }) => {
  return (
    interviewQuestions && (
      <div className="p-5 border rounded-lg">
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
        <p>{interviewQuestions[activeQuestionIndex]?.question}</p>
      </div>
    )
  );
};

export default QuestionSection;