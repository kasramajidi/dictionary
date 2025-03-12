import React, { useState } from "react";
import UseData from "./components/UseData";
import UseImage from "./components/UseImage";

const App: React.FC = () => {
  const [word, setWord] = useState<string>("");

  const {
    data: wordData,
    isLoading: isWordLoading,
    isError: isWordError,
  } = UseData(word);
  const {
    data: imageData,
  } = UseImage(word);

  const searchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  return (
    <main className="flex flex-col max-w-6xl items-center mx-auto gap-5 pt-4">
      <h1 className="text-white text-3xl">Dictionary</h1>
      <input
        type="text"
        placeholder="Enter text..."
        value={word}
        onChange={searchChange}
        className="bg-white border-none py-4 text-black rounded-3xl px-8 focus:outline-none focus:border-none shadow-sm w-full outline-black"
      />

      {isWordLoading ? <p>Loading...</p>:null}
      {isWordError && <p>Error fetching word data.</p>}

      {(imageData || wordData) && (
        <div className="flex w-[1150px] items-center justify-between gap-5 bg-white border rounded-2xl px-3 py-2 shadow-lg">
          {imageData ? (
            <div className="shrink-0">
              <img
                src={imageData.urls.full}
                alt={word}
                className="w-[400px] h-[350px] rounded-lg object-cover"
              />
            </div>
          ):(
            <div className="bg-gray-400 w-[400px] h-[350px] flex items-center justify-center">No image available</div>
          )}

          {wordData && (
            <div className="text-black flex flex-col gap-3">
              <h2 className="text-red-400">Meaning:</h2>
              <p>{wordData.meanings[0].definitions[0].definition}</p>

              <h3 className="text-red-400">Synonyms:</h3>
              <div className="grid grid-cols-4 gap-5">
                {wordData?.meanings[1]?.synonyms?.length > 0 ? (
                  wordData.meanings[1].synonyms.map((synonym: string, index:number) => (
                    <span key={index} className="text-black">
                      {synonym}
                    </span>
                  ))
                ): (
                  <p className="text-gray-500">No synonyms found.</p>
                )}
              </div>

              <h3 className="text-red-400">Antonyms:</h3>
              <div className="grid grid-cols-4 gap-5">
                {wordData?.meanings[1]?.antonyms?.length > 0 ? (
                  wordData.meanings[1].antonyms.map(
                    (antonym: string, index: number) => (
                      <span
                        key={index}
                        className="text-black"
                      >
                        {antonym}
                      </span>
                    )
                  )
                ) : (
                  <p className="text-gray-500">No antonyms found.</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default App;
