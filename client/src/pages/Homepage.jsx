import { Link } from "react-router-dom";

function Homepage() {
  return (
    <>
      <div className="flex bg-primary text-white min-h-screen">
        <div className="container mx-auto px-6 py-12 lg:px-24 lg:py-16">
          <div className="hero-content flex flex-col lg:flex-row-reverse items-center lg:items-start justify-center lg:justify-between ">
            <img
              src="src/assets/lazy.svg"
              alt="Hero"
              className="max-w-md h-auto max-h-96 shadow-2xl rounded-2xl mb-10 lg:mb-0 "
            />

            <div className="text-center lg:text-left max-w-lg lg:px-1 me-20 mt-5">
              <span className="text-2xl font-semibold mb-2 block">
                Welcome to
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Lazy Task Management App
              </h1>
              <p className="py-4 text-lg">
                A simple task management tool to help you organize your tasks
                easily and comfortably.
              </p>

              <Link to="/login">
                <button className="btn btn-primary">Get Started</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
