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
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"


const NewInterviewForm = () => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-fit xm:max-w-lg sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interview
            </DialogTitle>
            <DialogDescription>
              <div>
                <p className="text-black font-medium">
                  Add details about your job position/role, Job description and
                  years of experience
                </p>
                <div className="mt-7 my-2 flex flex-col justify-start">
                    <label>Job Role/Job Position</label>
                    <Input className="mt-2" placeholder="Ex. Software Engineer" />
                </div>
                <div className="mt-5 my-2">
                    <label>Job Description/ Tech Stack (In Short)</label>
                    <Textarea className="mt-2" placeholder="Ex. .NET, React, Node.js" />
                </div>
                <div className="mt-5 my-2">
                    <label>Years of Experience</label>
                    <Input className="mt-2" placeholder="5" type="number" />
                </div>
              </div>
              <div className="flex gap-5 justify-end mt-7">
                <Button variant="outline" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button>Start Interview</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewInterviewForm;
