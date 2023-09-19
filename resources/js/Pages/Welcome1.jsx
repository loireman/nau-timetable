import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
  return (
    <>
      <Head title="Welcome" />
      <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
        <div className="container">
          <img
            src="https://images.unsplash.com/photo-1553544260-f87e671974ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=807&q=80"
            alt="background"
            className="h-full absolute top-0 right-0"
          />
          <div className="offer mt-[-30] text-black dark:text-white">
            <span className="emoji text-3xl animate-wave ml-10">👋</span>
            <h1 className="font-bold text-4xl mt-5 ml-10">Привіт!</h1>
            <div className="text1 font-bold text-xl mt-2 ml-10">
              <p>Ми - магазин одягу.</p>
            </div>
            <div className="text2 font-normal text-xl mt-4 ml-10">
              <p>У нас ви можете купити одяг на будь-який смак.</p>
            </div>
            <div className="mt-5 ml-10">
              <a href="#" className="btn bg-red-700 hover:bg-red-800 dark:bg-blue-500  dark:hover:bg-blue-600 text-white py-4 px-8 inline-block uppercase font-bold rounded-lg">Замовити</a>

            </div>
          </div>
        </div>
        <div className="sm:fixed sm:top-0 sm:left-0 sm:flex items-center space-x-4 p-6 ml-14">
          <Link
            href={route('dashboard')}
            className="font-bold text-black dark:text-white hover:text-red-500 dark:hover:text-blue-500"
          >
            Головна
          </Link>
        </div>
        <div className="sm:fixed sm:top-0 sm:right-0 sm:flex items-center space-x-4 p-6">
          {auth.user ? (
            <Link
              href={route('dashboard')}
              className="font-bold text-white hover:text-red-500 dark:text-white dark:hover:text-blue-500"
            >
              Логін
            </Link>
          ) : (
            <>
              <Link
                href={route('login')}
                className="font-bold text-white hover:text-red-500 dark:text-white dark:hover:text-blue-500"
              >
                Логін
              </Link>
              <Link
                href={route('register')}
                className="font-bold text-white hover:text-red-500 dark:text-white dark:hover:text-blue-500"
              >
                Реєстрація
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
