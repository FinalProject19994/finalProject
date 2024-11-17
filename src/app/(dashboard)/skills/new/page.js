"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/firebase";
import { setDoc, doc } from "firebase/firestore";

const Page = () => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  //   const categoryRef = useRef(null);

  const goBack = () => {
    router.push("/skills");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await setDoc(doc(db, "skills", Date.now().toString()), {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      //   TODO: add category from the predefined categories
      category: "category",
    });

    nameRef.current.value = null;
    descriptionRef.current.value = null;

    router.push("/skills");
  };

  return (
    <div className="mx-4 h-[90dvh] flex-col gap-4 rounded-md bg-white p-4 shadow-md">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-600">New Skill</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="cursor-pointer rounded-full p-2 hover:bg-gray-200">
              <X />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure you want to leave?</DialogTitle>
              <DialogDescription>
                Your progress will be lost if you leave this page.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={goBack}>
                Leave
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mx-auto max-w-6xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="title">Skill name</Label>
            <input
              placeholder="Enter skill name..."
              ref={nameRef}
              required
              className="rounded-md border p-2 text-gray-700 outline-none"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="title">category</Label>
            <input
              placeholder="Enter category..."
              required
              className="rounded-md border p-2 text-gray-700 outline-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Description</Label>
            <Textarea
              ref={descriptionRef}
              required
              placeholder="Enter description..."
            />
          </div>

          <Button
            type="submit"
            className="mx-auto mt-10 flex w-1/3 bg-primary_purple"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
