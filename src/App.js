import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import '../src/style.css'

import api from './services/api';

function App() {

  const [input, setInput] = useState('')
  const [zip, setZip] = useState({});

  async function handleSearch(){
    
    if(input == ''){
      alert("Your Postcode/Zip")
      return;
    }

    try{
      const response = await api.get(`${input}/json`)
      setZip(response.data)
      setInput("");

    }catch{
      alert("Oops...error");
      setInput("")
    }

  }

  return (
    <div className="container">
      <h1 className='title'>Postcode Finder</h1>
      <h6 className='subtitle'>Brazil</h6>

      <div className="containerInput">
        <input
        type="text"
        placeholder="Start typing the address..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"/>
        </button>
      </div>
        {Object.keys(zip).length > 0 && (
          <main className='main'>
            <h2>CODEPOST: {zip.cep}</h2>

            <span>{zip.logradouro}</span>
            <span>{zip.complemento}</span>
            <span>{zip.bairro}</span>
            <span>{zip.localidade} - {zip.uf}</span>

          </main>
        )}
      
    </div>
  );
}

export default App;
