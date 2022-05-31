import React, { Component } from "react"
import SC1 from "./contracts/SC1.json"
import SC2 from "./contracts/SC2.json"
import getWeb3 from "./getWeb3"
import detectEthereumProvider from '@metamask/detect-provider'
import { ethers } from "ethers"
import "./App.css"

class App extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    contract2: null,
    name: "",
    title: "",
    amount: null,
    hash: null,
    eth: null
  }

  componentDidMount = async () => {
    try {
      /* // trying to get active address trhough ethers.js.....plz pray!
      const ethProvider = new ethers.providers.Web3Provider(window.ethereum, "any")
      // Prompt user for account connections
      await ethProvider.send("eth_requestAccounts", [])
      const signer = ethProvider.getSigner()
      console.log("Account:", await signer.getAddress()) */
      // Get network provider and web3 instance.
      const web3 = await getWeb3()
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts()
      // metamask provider
      const provider = await detectEthereumProvider()
      this.setState({ eth: provider })
      // Get the contract instance.
      const networkId = await web3.eth.net.getId()
      const deployedNetwork = SC1.networks[networkId]
      const deployedNetwork2 = SC2.networks[networkId]
      const instance = new web3.eth.Contract(
        SC1.abi,
        deployedNetwork && deployedNetwork.address
      )
      const instance2 = new web3.eth.Contract(
        SC2.abi,
        deployedNetwork2 && deployedNetwork2.address
      )
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance, contract2: instance2 },()=>console.log(this.state.accounts))
    }
    catch (error) {
      // Catch any errors for any of the above operations.
      alert(`Failed to load web3, accounts, or contract. Check console for details.`)
      console.error(error)
    }
  }

  sendErcToken = async (to, from) => {
    let tokenAddress = '0x60F20dE663942e73C2Cc157b52ecfd829bC1Fa40' // Demo Token contract address
    let toAddress = to // where to send it
    let fromAddress = from // your wallet
    let amount = this.state.web3.utils.toHex(this.state.web3.utils.toWei("100"))
    let data = this.state.name + this.state.amount + this.state.title
    let txObj = {
      "gas": this.state.web3.utils.toHex(100000),
      "to": toAddress,
      "data": this.state.web3.utils.toHex(data),
      "from": fromAddress,
      "value": "0x00"
    }
    // using metamask to invoke web3.eth.sendTransaction method
    const txHash = await this.state.eth.request({
      method: 'eth_sendTransaction',
      params: [txObj],
    })
    this.setState({ hash: txHash })
  }

  NameHandle = (e) => {
    this.setState({ name: e.target.value })
  }

  TitleHandle = (e) => {
    this.setState({ title: e.target.value })
  }

  AmountHandle = (e) => {
    this.setState({ amount: e.target.value })
  }

  SubmissionHandle = async (e) => {
    e.preventDefault()
    await this.sendErcToken("0x79f553dcE43134F45ce87977f1a09Ad9B9A4D3Ea", "0x00A7e65D40f030efeB90FBceDF385fbba24a70dE")
    let success = await this.state.contract.methods.transact("0x79f553dcE43134F45ce87977f1a09Ad9B9A4D3Ea", 42000000000).send({ from: this.state.accounts[0] })
    if (success) {
      this.state.contract2.methods.SetName(this.state.name).send({ from: this.state.accounts[0] })
      this.state.contract2.methods.SetTitle(this.state.title).send({ from: this.state.accounts[0] })
      this.state.contract2.methods.SetAmount(this.state.amount).send({ from: this.state.accounts[0] })
      this.state.contract2.methods.SetHash(this.state.hash).send({ from: this.state.accounts[0] })
    }
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>
    }
    return (
      <div className="App">
        <div className="InputWrapper">
          <form onSubmit={this.SubmissionHandle}>
              <input type="text" name="name" id="name" placeholder="name" onChange={this.NameHandle} />
              <input type="text" name="title" id="title" placeholder="title" onChange={this.TitleHandle} />
              <input type="number" step="any" name="amount" id="amount" placeholder="amount" onChange={this.AmountHandle} />
            <input type="submit" value="Register" id="register" />
          </form>
        </div>
      </div>
    )
  }
}

export default App
