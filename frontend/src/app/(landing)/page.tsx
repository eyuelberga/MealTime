import { CalendarIcon, CollectionIcon, RecipeIcon, StatsIcon, UserIcon } from "@/components/icons"
import { Logo } from "@/components/logo"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (<>
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-3 sm:py-0 dark:bg-gray-800 dark:border-gray-700">
      <nav
        className="relative max-w-7xl w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <Link
            className="flex-none text-xl font-semibold dark:text-white"
            href="/"
            aria-label="Brand"
          >
            <Logo />
          </Link>
        </div>
        <div
          className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
        >
          <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:pl-7">

            <Link
              className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-rose-600 sm:border-l sm:border-gray-300 sm:my-6 sm:pl-6 dark:border-gray-700 dark:text-gray-400 dark:hover:text-rose-500"
              href="/signin"
            >
              <UserIcon />
              Log in
            </Link>
          </div>
        </div>
      </nav>
    </header>

    {/* Hero */}
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
        <div>
          <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight dark:text-white">
            Organize your meals with <span className="text-rose-600">Meal Time</span>
          </h1>
          <p className="mt-3 text-lg text-gray-800 dark:text-gray-400">
            A Recipe manager and meal planner application
          </p>
          {/* Buttons */}
          <div className="mt-7 grid gap-3 w-full sm:inline-flex">
            <Link
              prefetch={false}
              className="inline-flex justify-center items-center gap-x-3 text-center bg-rose-600 hover:bg-rose-700 border border-transparent text-sm lg:text-base text-white font-medium focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800"
              href="/dashboard"
            >
              Get started
              <svg
                className="w-2.5 h-2.5"
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </svg>
            </Link>
          </div>
          {/* End Buttons */}
        </div>
        {/* End Col */}
        <div className="m-4">
          <Image
            width={0}
            height={0}
            className="w-full"
            src="/hero.svg"
            alt="Hero Image"
          />
        </div>
        {/* End Col */}
      </div>
      {/* End Grid */}
    </div>
    {/* End Hero */}
    <>
      {/* Icon Blocks */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="mx-auto">
          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
            <div className="space-y-6 lg:space-y-10">
              {/* Icon Block */}
              <div className="flex">
                <RecipeIcon className="flex-shrink-0 h-16 w-16 text-gray-800 dark:text-white" />
                <div className="ml-5 sm:ml-8">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Create Recipes
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    You can manage your recipes
                  </p>
                </div>
              </div>
              {/* End Icon Block */}

              {/* Icon Block */}
              <div className="flex">
                <CollectionIcon className="flex-shrink-0 h-16 w-16 text-gray-800 dark:text-white" />
                <div className="ml-5 sm:ml-8">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Organize Recipes with Collections
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    You can better organize your recipes by adding them to a collection
                  </p>
                </div>
              </div>
              {/* End Icon Block */}

            </div>
            {/* End Col */}
            <div className="space-y-6 lg:space-y-10">
              {/* Icon Block */}
              <div className="flex">
                <CalendarIcon className="flex-shrink-0 h-16 w-16 text-gray-800 dark:text-white" />
                <div className="ml-5 sm:ml-8">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Plan your Meals
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Plan your meals by adding recipes to the meal planner
                  </p>
                </div>
              </div>
              {/* End Icon Block */}

              {/* Icon Block */}
              <div className="flex">
                <StatsIcon className="flex-shrink-0 h-16 w-16 text-gray-800 dark:text-white" />
                <div className="ml-5 sm:ml-8">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Get Meal Plan Stats
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Get nutrition breakdown and meal plan analysis
                  </p>
                </div>
              </div>
              {/* End Icon Block */}
            </div>
            {/* End Col */}
          </div>
          {/* End Grid */}
        </div>
      </div>
      {/* End Icon Blocks */}
    </>


  </>

  )
}