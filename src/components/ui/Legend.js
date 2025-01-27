const Legend = ({ header }) => {
  return (
    <div className="absolute px-4">
      <p className="relative top-2 mb-2 bg-white text-3xl font-bold text-gray-600 dark:bg-gray-500 dark:text-gray-300">
        {header}
      </p>
      <div className="mb-2 mt-4 bg-white text-xs dark:bg-gray-500 dark:text-gray-200">
        <h6 className="underline">Node types</h6>
        <div className="flex items-center gap-2">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="6,1 11,6 6,11 1,6"
              className="fill-[#888] dark:fill-[#e5e7eb]"
            />
          </svg>
          <p>Course</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="ml-0.5 h-2 w-2 bg-black" />
          <p>Activity</p>
        </div>
      </div>

      <div className="bg-white text-xs dark:bg-gray-500 dark:text-gray-200">
        <div className="flex items-center gap-2">
          <h6 className="underline">Skill categories</h6>
        </div>
        <div className="flex items-center gap-2">
          <svg
            width="10"
            height="10"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="6"
              cy="6"
              r="6"
              className="fill-[#d396ff] dark:fill-[#d396ff]"
            />
          </svg>
          <p>Professional self</p>
        </div>
        <div className="flex items-center gap-2">
          <svg
            width="10"
            height="10"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="6"
              cy="6"
              r="6"
              className="fill-[#90dcf3] dark:fill-[#D9F3FC]"
            />
          </svg>
          <p>Thinking development</p>
        </div>
        <div className="flex items-center gap-2">
          <svg
            width="10"
            height="10"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="6"
              cy="6"
              r="6"
              className="fill-[#5de000] dark:fill-[#C6FBC8]"
            />
          </svg>
          <p>Mindset</p>
        </div>
        <div className="flex items-center gap-2">
          <svg
            width="10"
            height="10"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="6"
              cy="6"
              r="6"
              className="fill-[#ffb85c] dark:fill-[#FFE4AD]"
            />
          </svg>
          <p>Emotional quotient</p>
        </div>
      </div>
    </div>
  );
};

export default Legend;
