"use client";
import CommonLayout from "@/app/layouts/common-layout";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { toast } from "sonner";

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
          {/* information section  */}
          <div className="flex flex-col my-5 justify-start items-start gap-5">
            <div className="flex flex-col p-5 rounded-lg border gap-5">
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
          </div>

          {/* camera section */}
          <div>
            {interviewData && webcamEnabled ? (
              <Webcam
                onUserMedia={() => setWebcamEnabled(true)}
                onUserMediaError={() => setWebcamEnabled(false)}
                mirrored={true}
                style={{ width: 300, height: 300 }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <WebcamIcon className="h-72 my-7 w-full p-20 bg-secondary rounded-lg border" />
                <Button onClick={() => setWebcamEnabled(true)}>
                  Enable Web Cam and Microphone
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default Interview;
