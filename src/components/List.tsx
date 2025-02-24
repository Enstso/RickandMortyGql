import { gql, useQuery } from "@apollo/client";

const GET_CHARACTERS = gql`
  query {
    characters {
      results {
        name
        image
      }
    }
  }
`;

export default function ListCharacters() {
  const { data, loading, error } = useQuery(GET_CHARACTERS);

  if (loading) return <p className="text-center text-lg">Chargement...</p>;
  if (error) return <p className="text-center text-red-500">Erreur: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Liste des Personnages</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Nom</th>
              <th className="py-2 px-4 border">Image</th>
            </tr>
          </thead>
          <tbody>
            {data.characters.results.map((character, index) => (
              <tr key={index} className="text-center border">
                <td className="py-2 px-4 border">{character.name}</td>
                <td className="py-2 px-4 border">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-16 h-16 rounded-full mx-auto"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
