import { gql, useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";

const GET_CHARACTER_DETAIL = gql`
  query GetCharacterDetail($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        name
      }
      location {
        name
      }
      image
      episode {
        name
      }
      created
    }
  }
`;

interface CharacterDetail {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
  image: string;
  episode: Array<{ name: string }>;
  created: string;
}

export default function DetailCharacter() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_CHARACTER_DETAIL, {
    variables: { id },
  });

  const navigate = useNavigate(); // To navigate programmatically

  const handleGoBack = () => {
    navigate(-1); // This will take the user back to the previous page
  };

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

  const character: CharacterDetail = data.character;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Character Details</h2>

      {/* Back Button */}
      <div className="flex justify-start mb-4">
        <button
          onClick={handleGoBack}
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition-all duration-300 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row p-6 space-y-6 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/3">
            <img
              className="w-full h-auto rounded-lg shadow-lg"
              src={character.image}
              alt={character.name}
            />
          </div>
          <div className="w-full md:w-2/3">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{character.name}</h3>
            <div className="space-y-3">
              <p className="text-lg text-gray-700">
                <strong>Status:</strong> {character.status}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Species:</strong> {character.species}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Type:</strong> {character.type || "N/A"}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Gender:</strong> {character.gender}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Origin:</strong> {character.origin.name}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Location:</strong> {character.location.name}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Episodes:</strong> {character.episode.length}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Created:</strong> {new Date(character.created).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
