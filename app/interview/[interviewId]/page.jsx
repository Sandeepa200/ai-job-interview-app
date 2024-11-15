"use client";
import CommonLayout from "@/app/layouts/common-layout";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { toast } from "sonner";
import { VIDEO_DESCRIPTION } from "@/constants/strings";
import Link from "next/link";
import { getInterviewStartRoute, INTERVIEW_START_ROUTE } from "@/constants/routes";

const Interview = ({ params }) => {
  const [interviewId, setInterviewId] = useState(null);
  const [interviewData, setInterviewData] = useState();
  const [webcamEnabled, setWebcamEnabled] = useState(false);

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

  //get interview data
  const GetInterviewDetails = async (interviewId) => {
    try {
      if (interviewId) {
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, interviewId));

        if (result.length > 0) {
          setInterviewData(result[0]);
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
      <div className="my-10 flex flex-col items-center justify-center">
        <h2 className="font-bold text-2xl">Let's start the interview</h2>
        <div className="grid grid-cols-1 mt-10 md:grid-cols-2 gap-10">
          {/* information section  */}
          <div className="flex flex-col my-5  justify-start items-start gap-5">
            <div className="flex flex-col p-5 rounded-lg w-full border gap-5">
              <h2 className="text-lg">
                <strong>Job Role/ Job Position:</strong>{" "}
                {interviewData?.jobPosition}
              </h2>
              <h2 className="text-lg">
                <strong>Job Description/ Tech Stack:</strong>{" "}
                {interviewData?.jobDesc}
              </h2>
              <h2 className="text-lg">
                <strong>Years of Experience:</strong>{" "}
                {interviewData?.jobExperience}
              </h2>
            </div>
            <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
              <h2 className="flex gap-2 items-center text-yellow-600">
                <Lightbulb />
                <strong>Information</strong>
              </h2>
              <p
                className="mt-3 text-yellow-600"
                dangerouslySetInnerHTML={{ __html: VIDEO_DESCRIPTION }}
              />
            </div>
          </div>

          {/* camera section */}
          <div className="flex flex-col justify-center items-center">
            {interviewData && webcamEnabled ? (
              <Webcam
                onUserMedia={() => setWebcamEnabled(true)}
                onUserMediaError={() => setWebcamEnabled(false)}
                mirrored={true}
                style={{}}
              />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <WebcamIcon className="h-72 my-7 w-full p-20 bg-secondary rounded-lg border" />
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => setWebcamEnabled(true)}
                >
                  Enable Web Cam and Microphone
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Link href={getInterviewStartRoute(interviewId)}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </CommonLayout>
  );
};

export default Interview;
