import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { graphql } from '../gql';

const GET_CHARACTERS = graphql(`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        image
      }
    }
  }
`);

export default function ListCharacters() {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useQuery(GET_CHARACTERS, {
    variables: { page },
  });

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
  const totalPages = data?.characters?.info?.pages || 1;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Character List
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map((character) => (
          <div
            key={character?.id}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform"
          >
            <Link to={`/character/${character?.id}`}>
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg">
                  <img
                    src={character?.image ? character.image :''}
                    alt={character?.image ? character.image : ''}
                    className="w-full h-full object-cover transform transition duration-300 ease-in-out hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-500 transition duration-300 ease-in-out">
                  {character?.name}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-4 mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={!data?.characters?.info?.prev}
          className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="text-lg">{`Page ${page} of ${totalPages}`}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={!data?.characters?.info?.next}
          className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}
