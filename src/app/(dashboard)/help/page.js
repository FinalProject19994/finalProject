export const metadata = {
  title: "Help",
  description: "Learn more about the core skills site.",
};

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HelpPage = () => {
  return (
    <div className="mx-4 my-2 h-[98%] overflow-auto rounded-md bg-white shadow-md dark:bg-gray-500">
      <h1 className="p-4 text-4xl font-bold text-primary_purple dark:text-primary_purple_table">
        Help Page
      </h1>
      <span className="block p-4 text-lg text-gray-700 dark:text-gray-50">
        Welcome to the Help Page! Here&apos;s everything you need to know to
        navigate the website and use its features effectively.
      </span>

      <Accordion
        type="single"
        collapsible
        className="mx-auto my-2 w-3/4 rounded-md p-4 transition duration-300 ease-in-out"
      >
        {/*  Understanding the Graph */}
        <AccordionItem value="item-1">
          <AccordionTrigger className="rounded-md px-2 text-xl">
            Understanding the Graph
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-2 text-base text-gray-700 dark:text-gray-300">
              The graph is the central feature of the website, visually
              connecting the three main components:
            </p>
            <ul className="list-inside list-disc space-y-1 text-base text-gray-700 dark:text-gray-300">
              <li>Skills</li>
              <li>Activities</li>
              <li>Courses</li>
            </ul>
            <p className="mb-2 mt-4 text-base font-semibold text-gray-700 dark:text-gray-300">
              Key Features:
            </p>
            <ul className="list-inside list-disc space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>
                <b>Interactive Nodes and Edges:</b> Each node represents a
                skill, activity, or course. Edges show the relationships between
                these components.
              </li>
              <li>
                <b>Clickable Navigation:</b> Click on a skill, activity, or
                course in the graph to go directly to its corresponding page.
              </li>
              <li>
                <b>Highlighting:</b> Interactions on other pages (like clicking
                a skill or activity) will highlight the relevant node in the
                graph for better context.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/*  Viewing and Managing Skills, Activities, and Courses */}
        <AccordionItem value="item-2">
          <AccordionTrigger className="rounded-md px-2 text-xl">
            Viewing and Managing Skills, Activities, and Courses
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-2 text-base text-gray-700 dark:text-gray-300">
              This section explains how to interact with the core components of
              the website:
            </p>

            {/* Skills */}
            <h4 className="mb-2 mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
              Skills
            </h4>
            <p className="mb-2 text-base font-semibold text-gray-700 dark:text-gray-300">
              What You&apos;ll See:
            </p>
            <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>A table listing all available skills.</li>
            </ul>
            <p className="mb-2 mt-2 text-base font-semibold text-gray-700 dark:text-gray-300">
              What You Can Do:
            </p>
            <ul className="list-inside list-disc space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>
                <b>View Activities for a Skill:</b> Click the three dots next to
                a skill to see which activities practice it.
              </li>
              <li>
                <b>Graph Interaction:</b> Clicking on a skill highlights it in
                the graph for easy visualization of related components.
              </li>
            </ul>

            {/* Activities */}
            <h4 className="mb-2 mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
              Activities
            </h4>
            <p className="mb-2 text-base font-semibold text-gray-700 dark:text-gray-300">
              What You&apos;ll See:
            </p>
            <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>A list of all activities.</li>
            </ul>
            <p className="mb-2 mt-2 text-base font-semibold text-gray-700 dark:text-gray-300">
              What You Can Do:
            </p>
            <ul className="list-inside list-disc space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>
                <b>View Activity Details:</b> Click on an activity to open its
                <b>Activity Card</b>, which shows details like related skills,
                courses, and lecturers.
              </li>
              <li>
                All related items (skills, courses, lecturers) are clickable,
                allowing easy navigation.
              </li>
              <li>
                <b>Graph Interaction:</b> Clicking on an activity highlights it
                in the graph.
              </li>
              <li>
                <b>Manage Activities:</b>
                <ul className="list-inside list-disc space-y-1 pl-4 text-sm text-gray-700 dark:text-gray-300">
                  <li>
                    <b>Create</b> a new activity.
                  </li>
                  <li>
                    <b>Edit</b> or <b>Delete</b> activities that belong to you.
                  </li>
                </ul>
              </li>
            </ul>

            {/* Courses */}
            <h4 className="mb-2 mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
              Courses
            </h4>
            <p className="mb-2 text-base font-semibold text-gray-700 dark:text-gray-300">
              What You&apos;ll See:
            </p>
            <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>A list of all courses.</li>
            </ul>
            <p className="mb-2 mt-2 text-base font-semibold text-gray-700 dark:text-gray-300">
              What You Can Do:
            </p>
            <ul className="list-inside list-disc space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>
                <b>View Activities for a Course:</b> Click the three dots next
                to a course to see the activities associated with it.
              </li>
              <li>
                <b>Graph Interaction:</b> Clicking on a course highlights it in
                the graph.
              </li>
              <li>
                <b>Manage Courses:</b>
                <ul className="list-inside list-disc space-y-1 pl-4 text-sm text-gray-700 dark:text-gray-300">
                  <li>
                    <b>Create</b> a new course.
                  </li>
                  <li>
                    <b>Edit</b> an existing course.
                  </li>
                </ul>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/*  Working with Lecturers */}
        <AccordionItem value="item-3">
          <AccordionTrigger className="rounded-md px-2 text-xl">
            Working with Lecturers
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-2 text-base text-gray-700 dark:text-gray-300">
              The website also helps you explore the contributions of lecturers.
            </p>
            <p className="mb-2 mt-4 text-base font-semibold text-gray-700 dark:text-gray-300">
              What You&apos;ll See:
            </p>
            <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>A list of all registered lecturers on the platform.</li>
            </ul>
            <p className="mb-2 mt-2 text-base font-semibold text-gray-700 dark:text-gray-300">
              What You Can Do:
            </p>
            <ul className="list-inside list-disc space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>
                <b>View Lecturer Details:</b> Click the three dots next to a
                lecturer to view their related courses or activities.
              </li>
              <li>
                Navigate seamlessly to courses or activities related to a
                specific lecturer.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/*  Managing Your Content */}
        <AccordionItem value="item-4">
          <AccordionTrigger className="rounded-md px-2 text-xl">
            Managing Your Content
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-2 text-base text-gray-700 dark:text-gray-300">
              If you are authorized to create or edit content, you can manage
              the following:
            </p>
            <ul className="list-inside list-disc space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>
                <b>Create New Content:</b> Add activities and courses.
              </li>
              <li>
                <b>Edit or Delete Your Content:</b> Modify or remove activities
                and courses that belong to you.
              </li>
              <li>
                Use the graph and page-specific features to visualize and track
                changes instantly.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/*  Favorites Feature */}
        <AccordionItem value="item-6">
          <AccordionTrigger className="rounded-md px-2 text-xl">
            Using Favorites
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-2 text-base text-gray-700 dark:text-gray-300">
              The Favorites feature allows you to bookmark activities that you
              find particularly useful or want to easily access later.
            </p>
            <p className="mb-2 mt-4 text-base font-semibold text-gray-700 dark:text-gray-300">
              What You Can Do:
            </p>
            <ul className="list-inside list-disc space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>
                <b>Favorite Activities:</b> Click the heart icon on an Activity
                Card in the Activities table or on the Activity Detail page to
                add it to your favorites.
              </li>
              <li>
                <b>Access Your Favorites List:</b> Click on the <b>Favorites</b>
                link in the sidebar menu to view a dedicated page listing all
                your favorited activities in a table.
              </li>
              <li>
                <b>Unfavorite Activities:</b> Click the filled heart icon again
                to remove an activity from your favorites list.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/*  Likes  Feature */}
        <AccordionItem value="item-7">
          <AccordionTrigger className="rounded-md px-2 text-xl">
            Using Likes
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-2 text-base text-gray-700 dark:text-gray-300">
              The Likes feature allows you to show appreciation for activities
              and see how many other lecturers find them useful.
            </p>
            <p className="mb-2 mt-4 text-base font-semibold text-gray-700 dark:text-gray-300">
              What You Can Do:
            </p>
            <ul className="list-inside list-disc space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>
                <b>Like an Activity:</b> Click the thumbs up icon on an Activity
                Card or Activity Detail page to like an activity.
              </li>
              <li>
                <b>View Likes Count:</b> The number next to the thumbs up icon
                indicates how many lecturers have liked the activity.
              </li>
              <li>
                <b>See Who Liked:</b> Click on the thumbs up count to open a
                popover listing the names of lecturers who have liked the
                activity.
              </li>
              <li>You can like each activity only once.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/*  forum System */}
        <AccordionItem value="item-8">
          <AccordionTrigger className="rounded-md px-2 text-xl">
            Forum System
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-2 text-base text-gray-700 dark:text-gray-300">
              The Forum System provides a platform for all lecturers to engage
              in open discussions and share insights with the entire Core Skills
              community. It functions like a group chat, where every message
              posted is visible to all lecturers.
            </p>
            <p className="mb-2 mt-4 text-base font-semibold text-gray-700 dark:text-gray-300">
              Key Features:
            </p>
            <ul className="list-inside list-disc space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>
                <b>Public Forum:</b> All messages posted in the forum are
                visible to all registered lecturers on the platform.
              </li>
              <li>
                <b>Broadcast Messaging:</b> Every message sent is broadcast to
                the entire lecturer community, fostering open communication and
                knowledge sharing.
              </li>
              <li>
                <b>Real-time Updates:</b> Messages are displayed in a chat-like
                interface, providing a real-time view of ongoing discussions.
              </li>
              <li>
                Ideal for general announcements, platform-wide discussions, and
                sharing resources relevant to all lecturers.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Quick Tips for Effective Navigation */}
        <AccordionItem value="item-5">
          <AccordionTrigger className="rounded-md px-2 text-xl">
            Quick Tips for Effective Navigation
          </AccordionTrigger>
          <AccordionContent>
            <ul className="list-inside list-disc space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>
                Use the <b>graph on the Homepage</b> to explore relationships
                between skills, activities, and courses visually.
              </li>
              <li>
                The <b>three dots menu</b> next to items like skills,
                activities, or courses offers additional options for viewing
                related content.
              </li>
              <li>
                <b>Clickable links within Activity Cards</b> make it easy to
                move between related pages.
              </li>
              <li>
                The <b>Create</b> and <b>Edit</b> options are available only for
                content you own.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default HelpPage;
