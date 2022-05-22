import {useState} from 'react'
import {ethers} from 'ethers'

import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';

const greeterAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'

console.log(Greeter.abi)

function App() {

  const [greeting, setGreetingValue] = useState("");

  async function requestAccount(){
    await window.ethereum.request({method: 'eth_requestAccounts'});
  }

  async function fetchGreeting(){
    if (typeof window.ethereum !== 'undefined'){
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);

      try {
        const data = await contract.greet();
        console.log('data', data)
      } catch {
        console.log('Error')
      }

    }
  }

  async function setGreeting(){
    if(!greeting) return
    if(typeof window.ethereum !== 'undefined'){
      await requestAccount();
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(greeting)
      await transaction.wait()
      fetchGreeting()

    }
  }

  return (
    <div className="App">
        <p className="text-center w-full">
          Learn Web3 Development
        </p>


        <div className='w-1/2 mx-auto flex flex-row justify-around mt-10'>
          <button className="bg-blue-200 rounded-full p-2" onClick={fetchGreeting}>
            Fetch Greeting
          </button>

          <button className="bg-blue-200 rounded-full p-2" onClick={setGreeting}>
            Set Greeting
          </button>
          <input onChange={e => setGreetingValue(e.target.value)} placeholder="Set greeting" />
        </div>
    </div>
  );
}

export default App;
