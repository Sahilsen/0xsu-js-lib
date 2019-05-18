const Web3 = require('web3')

class Du4e {
  constructor(){
    this.checkForWeb3 = this.checkForWeb3.bind(this)
    this.checkForWeb3()
  }

  checkForWeb3(){
    if (window.web3 && web3.currentProvider) {
      this.initialize()
      return
    }
    window.setTimeout(this.checkForWeb3, 100)
  }

  initialize(){
    const contractAddr = "0x5fc4c5ba2e1d22191fb239a1afe513f7ff892c9c"
    this.web3 = window.web3 || new Web3(Web3.givenProvider)
    this.contract = new this.web3.eth.contract(this.abi(), contractAddr)

  }

  abi() {
    return [
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "address"
          },
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "shortenedURLs",
        "outputs": [
          {
            "name": "",
            "type": "bytes"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "kill",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "listAccts",
        "outputs": [
          {
            "name": "",
            "type": "address[]"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_url",
            "type": "string"
          },
          {
            "name": "_short",
            "type": "bytes"
          },
          {
            "name": "paid",
            "type": "bool"
          }
        ],
        "name": "shortenURLWithSlug",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "url",
            "type": "string"
          },
          {
            "name": "paid",
            "type": "bool"
          }
        ],
        "name": "shortenURL",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_short",
            "type": "bytes"
          }
        ],
        "name": "getURL",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "url",
            "type": "string"
          },
          {
            "indexed": false,
            "name": "slug",
            "type": "bytes"
          },
          {
            "indexed": false,
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "URLShortened",
        "type": "event"
      }
    ]
  }

  shortenUrl(url, slug){

  }

  async getUrl(slug){
    const destination = await this.contract.methods.getURL(slug).call()
    return destination
  }

  async listOfUrls(acct){
    let account = acct || web3.eth.accounts[0]
    const urls = await this.contract.shortenedURLs(account).call()
    console.log(urls)
  }

  async forward(slug){
    window.location.href = await this.getUrl(slug)
  }
}

module.exports = Du4e
