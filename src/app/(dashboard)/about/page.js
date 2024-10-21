const Page = () => {
  return (
    <div className="h-screen px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-lg">
        <h1 className="text-primary_purple mb-6 text-center text-4xl font-bold">
          Welcome to Core Skills Hub
        </h1>
        <p className="mb-6 text-justify text-lg leading-relaxed text-gray-700">
          Core Skills Hub is dedicated to transforming how core skills are
          tracked, managed, and cultivated in engineering education. Whether
          you're a lecturer or student, our platform seamlessly integrates into
          the learning journey, enabling efficient tracking and development of
          essential soft skills. From communication and teamwork to
          problem-solving and leadership, we aim to enhance the holistic
          development of every student.
        </p>

        <section className="my-8">
          <h2 className="text-primary_purple mb-4 text-2xl font-semibold">
            Why Core Skills Matter
          </h2>
          <p className="text-md mb-4 text-justify leading-relaxed text-gray-700">
            In today’s workforce, possessing technical knowledge alone isn't
            enough. Core skills such as adaptability, collaboration, and
            creativity are critical for success in dynamic and interdisciplinary
            work environments. Core Skills Hub bridges this gap, giving
            educators the tools to ensure that students are prepared for
            real-world challenges.
          </p>
        </section>

        <section className="my-8">
          <h2 className="text-primary_purple mb-4 text-2xl font-semibold">
            Our Mission
          </h2>
          <p className="text-md mb-4 text-justify leading-relaxed text-gray-700">
            We strive to empower educators with a flexible, user-friendly system
            that integrates into their teaching workflow. Our goal is to ensure
            that students graduate with both technical expertise and critical
            soft skills needed for their careers. Core Skills Hub brings
            together advanced data visualization, intuitive design, and a focus
            on long-term skill development to create a unified, impactful
            platform.
          </p>
        </section>

        <section className="my-8">
          <h2 className="text-primary_purple mb-4 text-2xl font-semibold">
            Join Us in Transforming Education
          </h2>
          <p className="text-md mb-4 text-justify leading-relaxed text-gray-700">
            Core Skills Hub envisions a future where education not only imparts
            knowledge but also nurtures the soft skills essential for
            professional success. We are dedicated to reshaping engineering
            education, ensuring that every student’s potential is fully realized
            in the ever-evolving global workforce.
          </p>
        </section>

        <section className="my-8">
          <h3 className="text-primary_purple mb-4 text-2xl font-semibold">
            Contact Us
          </h3>
          <p className="text-md text-justify leading-relaxed text-gray-700">
            Interested in learning more? Feel free to reach out to us at{" "}
            <a
              href="mailto:finalprojectcoreskills@gmail.com"
              className="text-blue-500 underline"
            >
              contact@coreskillshub.com
            </a>
            , or explore our platform to discover how Core Skills Hub can
            enhance your teaching and student success.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Page;
