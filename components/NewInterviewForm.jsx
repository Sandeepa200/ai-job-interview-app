"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AI_PROMPT, QUES_COUNT } from "@/constants/strings";
import { chatSession } from "@/utils/geminiAiModel";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";

import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { useRouter } from "next/navigation";
import { getInterviewRoute, INTERVIEW_ROUTE } from "@/constants/routes";

const NewInterviewForm = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      console.log(jobPosition, jobDescription, difficulty, jobExperience);

      const FINAL_PROMPT = AI_PROMPT.replace("{jobPosition}", jobPosition)
        .replace("{jobDescription}", jobDescription)
        .replace("{expYears}", jobExperience)
        .replace("{quesDifficulty}", difficulty)
        .replace("{quesCount}", QUES_COUNT);

      console.log(FINAL_PROMPT);
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const MockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      console.log(JSON.parse(MockJsonResp));
      setJsonResponse(JSON.parse(MockJsonResp));

      if (MockJsonResp) {
        //saving in the database
        const resp = await db
          .insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResponse: MockJsonResp,
            jobPosition: jobPosition,
            jobDesc: jobDescription,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("YYYY-MM-DD"),
          })
          .returning({ mockId: MockInterview.mockId });

        console.log("Inserted ID: ", resp);
        if(resp){
          setOpenDialog(false);
          router.push(getInterviewRoute(resp[0]?.mockId));
        }
      } else {
        console.log("Error in AI Data");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-fit xs:max-w-sm sm:max-w-lg md:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interview
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Add details about your job position/role, Job description and years
            of experience
          </DialogDescription>
          <div>
            <form onSubmit={onSubmit}>
              <div>
                <div className="mt-7 my-2 flex flex-col justify-start">
                  <label>Job Role/Job Position</label>
                  <Input
                    className="mt-2"
                    placeholder="Ex. Software Engineer"
                    required
                    autoComplete="on"
                    pattern="^(?!\s).*"
                    title="Spaces are not allowed at the beginning"
                    onChange={(e) => setJobPosition(e.target.value)}
                  />
                </div>
                <div className="mt-5 my-2">
                  <label>Job Description/ Tech Stack (In Short)</label>
                  <Textarea
                    className="mt-2"
                    placeholder="Ex. .NET, React, Node.js"
                    required
                    autoComplete="on"
                    pattern="^(?!\s).*"
                    title="Spaces are not allowed at the beginning"
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
                <div className="mt-5 my-2">
                  <label>Question Difficulty</label>
                  <Select
                    required
                    onValueChange={(value) => setDifficulty(value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select a difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basic">Basic</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mt-5 my-2">
                  <label>Years of Experience</label>
                  <Input
                    className="mt-2"
                    placeholder="Ex. 5"
                    type="number"
                    min="0"
                    autoComplete="on"
                    max="40"
                    required
                    onChange={(e) => setJobExperience(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-5 justify-end mt-7">
                <Button
                  variant="outline"
                  onClick={() => setOpenDialog(false)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  {loading ? (
                    <>
                      <LoaderCircle className="mr-2 animate-spin" />
                      Generating From AI
                    </>
                  ) : (
                    "Start Interview"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewInterviewForm;
