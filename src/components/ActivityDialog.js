import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MultipleSelector from "@/components/ui/MultipleSelector";

const ActivityDialog = () => {
  return (
    <DialogContent className="text-sm">
      <DialogHeader>
        <DialogTitle className="text-center">ADD ACTIVITY</DialogTitle>
      </DialogHeader>
      <input
        type="text"
        placeholder="Enter a title..."
        className="rounded-md border p-2 text-gray-700 outline-none"
      />
      <MultipleSelector
        options={[
          { id: 1, label: "Communication" },
          { id: 2, label: "Teamwork" },
          { id: 3, label: "Problem Solving" },
          { id: 4, label: "Leadership" },
          { id: 5, label: "Creativity" },
          { id: 6, label: "Adaptability" },
          { id: 7, label: "Critical Thinking" },
          { id: 8, label: "Interpersonal Skills" },
        ]}
      />
      <input
        type="number"
        placeholder="Week number..."
        max={13}
        min={1}
        className="w-1/2 rounded-md border p-2 text-gray-700 outline-none"
      />
      <textarea
        placeholder="Enter description..."
        className="rounded-md border p-2 text-gray-700 outline-none"
      />
      <textarea
        placeholder="Enter reflection..."
        className="rounded-md border p-2 text-gray-700 outline-none"
      />
      <input
        type="file"
        accept="image/*"
        className="rounded-md border border-gray-200 text-sm text-gray-700 file:mr-2 file:border-0 file:bg-gray-300 file:px-2 file:py-3 file:text-gray-700 focus:z-10"
      />
      {/* <Link
    href="/surveys"
    className="text-primary_purple hover:underline"
  >
    Surveys
  </Link> */}
      <button className="w-full rounded-md bg-primary_purple p-2 text-white">
        Add
      </button>
    </DialogContent>
  );
};

export default ActivityDialog;
