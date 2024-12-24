const Legend = ({ header }) => {
  return (
    <div className="absolute px-4">
      <p className="relative top-2 mb-2 bg-white text-3xl font-bold text-gray-600">
        {header}
      </p>
      <div className="my-4 bg-white text-xs">
        <h6 className="underline">Node types</h6>
        <div className="flex items-center gap-2">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="6,1 11,6 6,11 1,6" fill="#888" />
          </svg>
          <p>Course</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="ml-0.5 h-2 w-2 bg-[#888]"></div>
          <p>Activity</p>
        </div>
        <div className="ml-0.5 flex items-center gap-2">
          <svg
            width="10"
            height="10"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="6" cy="6" r="6" fill="#888" />
          </svg>
          <p>Skill</p>
        </div>
      </div>

      <div className="bg-white text-xs">
        <h6 className="underline">Skill categories</h6>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-primary_purple_table"></div>
          <p>Professional self</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-primary_lightblue"></div>
          <p>Thinking development</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-primary_green"></div>
          <p>Mindset</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-primary_orange"></div>
          <p>Emotional quotient</p>
        </div>
      </div>
    </div>
  );
};

export default Legend;
