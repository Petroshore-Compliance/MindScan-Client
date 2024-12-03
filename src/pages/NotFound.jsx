import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-indigo-600 dark:text-indigo-400">404!</h1>
      <p className="text-xl text-zinc-800 dark:text-zinc-200 mt-4">
        La página que buscas no existe.
      </p>
      <Link
        to="/"
        className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
      >Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;