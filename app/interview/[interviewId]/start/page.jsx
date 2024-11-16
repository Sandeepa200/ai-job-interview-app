"use client";
import CommonLayout from '@/app/layouts/common-layout'
import QuestionSection from '@/components/QuestionSection';
import RecordAnswerSection from '@/components/RecordAnswerSection';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const StartInterview = ({ params }) => {
  const [interviewId, setInterviewId] = useState(null);
  const [interviewData, setInterviewData] = useState();
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchParams = async () => {
      if (params) {
        const unwrappedParams = await params; // Unwrap the params
        setInterviewId(unwrappedParams.interviewId); // Now you can safely access interviewId
        GetInterviewDetails(unwrappedParams.interviewId);
      }
    };
    fetchParams();
  }, [params]); // Dependency on params to trigger the effect when they change


  const GetInterviewDetails = async (interviewId) => {
    try {
      if (interviewId) {
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, interviewId));

        if (result.length > 0) {
          setInterviewData(result[0]);
          const jsonMockResponse =JSON.parse(result[0].jsonMockResponse)
          setInterviewQuestions(jsonMockResponse);
          console.log(jsonMockResponse);
          console.log(interviewQuestions);
          toast.success("Interview details fetched successfully");
        } else {
          toast.error("Interview Not Found");
        }
      }
    } catch (error) {
      console.log("Error fetching interview details", error);
    }
  };
  return (
    <CommonLayout>
      <div>
        <div className='grid grid-cols-1 md:grid-cols-2 mt-10 gap-10'>
            {/* Questions  */}
            <QuestionSection interviewQuestions={interviewQuestions} activeQuestionIndex={activeQuestionIndex}/>
            {/* Video/Audio Recording  */}
            <RecordAnswerSection/>
        </div>
      </div>
    </CommonLayout>
    
  )
}

export default StartInterview