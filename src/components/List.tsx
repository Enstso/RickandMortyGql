import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const GET_CHARACTERS = gql`
  query {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`;

interface Character {
  id: string;
  name: string;
  image: string;
}

const ITEMS_PER_PAGE = 6; // Nombre d'éléments par page

export default function ListCharacters() {
  const { data, loading, error } = useQuery(GET_CHARACTERS);
  const [currentPage, setCurrentPage] = useState(1);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500">
          Error: {error.message} <br />
          Please try again later.
        </p>
      </div>
    );

  const characters = data?.characters?.results || [];
  const totalPages = Math.ceil(characters.length / ITEMS_PER_PAGE);

  // Calculer les indices des éléments à afficher en fonction de la page courante
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPageCharacters = characters.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Character List
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPageCharacters.map((character: Character) => (
          <div
            key={character.id}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform"
          >
            <Link to={`/character/${character.id}`}>
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-full object-cover transform transition duration-300 ease-in-out hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-500 transition duration-300 ease-in-out">
                  {character.name}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-4 mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}
