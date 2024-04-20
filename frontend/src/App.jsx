import { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("dall-e-2");
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(prompt);
  console.log(model);

  const getImage = async () => {
    setImages(null);
    setLoading(true);
    try {
      const option = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          model: model,
        }),
      };
      const response = await fetch("http://localhost:8001/image", option);
      const data = await response.json();
      console.log(data);
      setImages(data);
      setLoading(false);
    } catch (error) {
      console.log("The frontend error is : ", error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-500 h-screen flex flex-col justify-center items-center pb-6 pt-4 overflow-auto scroll-smooth">
      <h1 className="font-singleday text-3xl border-b-2 border-black">
        Ai Image Generator-Dall E
      </h1>
      {/* ---------Input and upload buttons-------------------- */}
      <section className="w-[80vw] flex flex-wrap justify-center mt-10 gap-4">
        <div className="flex gap-5 flex-wrap justify-center">
          <input
            type="text"
            id="prompt"
            className="w-[85vw] lg:w-[70vw] h-12 rounded-lg p-4 outline-none"
            placeholder="Enter your prompt here...😉"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            id="text"
            className="bg-gradient-to-l from-red-600 to-red-400 w-auto px-3 rounded-lg h-12 hover:scale-105 duration-300 hover:border-2 hover:border-black text-lg"
            onClick={getImage}
          >
            Generate
          </button>
        </div>

        <div className="flex items-center">
          <label htmlFor="model" className="font-bold">
            Choose the model:
          </label>
        </div>
        <select
          id="model"
          name="model"
          className="outline-none rounded-lg px-2 py-1 cursor-pointer hover:scale-105 duration-500 hover:border-2 hover:border-black"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          <option htmlFor="model" value="dall-e-2">
            Dall-E-2
          </option>
          <option htmlFor="model" value="dall-e-3">
            Dall-E-3
          </option>
        </select>
      </section>

      {/* ---------Image output Section-------------------- */}
      <section className="w-[80vw] flex flex-wrap p-10 justify-center items-center lg:h-[80vh] gap-10">
        {loading ? (
          <div className="w-10 h-10 border-4 border-dashed border-red-600 rounded-full animate-spin"></div>
        ) : (
          images?.map(({ url, revised_prompt }, index) => (
            <div
              key={index}
              className="md:h-[60vh] md:w-[60vh] flex justify-center items-center"
            >
              <img src={url} alt={revised_prompt}  className="hover:scale-110 duration-500"/>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default App;
