import MetaMaskOnboarding from '@metamask/onboarding'

const SHOMIN_ABI = [{
  'inputs': [
    { 'internalType': 'string', 'name': 'newURI', 'type': 'string' },
  ],
  'name': 'buyMembership',
  'outputs': [],
  'stateMutability': 'payable',
  'type': 'function',
}, {
  'inputs': [],
  'name': 'getLastID',
  'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }],
  'stateMutability': 'view',
  'type': 'function',
}, {
  'inputs': [{ 'internalType': 'uint256', 'name': 'tokenId', 'type': 'uint256' }],
  'name': 'ownerOf',
  'outputs': [{ 'internalType': 'address', 'name': '', 'type': 'address' }],
  'stateMutability': 'view',
  'type': 'function',
}]

const BUTTON = document.getElementById('BUTTON')
const BUTTONb = document.getElementById('BUTTONb')
const buyBUTTONbONE = document.getElementById('buyBUTTONbONE')
const buyBUTTONbBNB = document.getElementById('buyBUTTONbBNB')
const AREAm = document.getElementById('MessageArea')

const Web3 = require('web3')

const web3ONE = new Web3('https://api.harmony.one')
const web3BNB = new Web3('https://bsc-dataseed.binance.org/')
const contractAddsONE = '0x0F10823132B05F5B18751414E3FA164b4d0Dfa38'
const contractAddsBNB = '0x0F10823132B05F5B18751414E3FA164b4d0Dfa38'
const SHOMINcontractONE = new web3ONE.eth.Contract(SHOMIN_ABI, contractAddsONE)
const SHOMINcontractBNB = new web3BNB.eth.Contract(SHOMIN_ABI, contractAddsBNB)

const currentUrl = new URL(window.location.href)
const forwarderOrigin =
  currentUrl.hostname === 'localhost' ? 'http://localhost:9010' : undefined

const totalPriceONE = Number(100.0)
const totalPriceBNB = Number(0.0068)
let strIDONE = ''
let strIDBNB = ''
let strURLONE = '{"image": "https://raw.githubusercontent.com/Asvoria/ShominHarmonyNFT/main/nft/SCCcard2022v1.json?token=GHSAT0AAAAAABXEMZSDZD7K66B5QNBFN6A4YXN67IQ"}'
let strURLBNB = '{"image": "https://raw.githubusercontent.com/Asvoria/ShominHarmonyNFT/main/nft/SCCcard2022v2.json?token=GHSAT0AAAAAABXEMZSD54ZSPXX2VCDBCXOQYXN67VQ"}'

const runMetamask = () => {
  const isMetaMaskInstalled = () => {
    const { ethereum } = window
    return Boolean(ethereum && ethereum.isMetaMask)
  }
  const onboarding = new MetaMaskOnboarding({ forwarderOrigin })

  const onClickBuyONE = async () => {
    try {
      await ethereum.request({ method: 'eth_requestAccounts' })
      const _accounts = await ethereum.request({
        method: 'eth_accounts',
      })

      const totalONE = await totalPriceONE * (10 ** 18)
      const txHash = await SHOMINcontractONE.methods.buyMembership(strURLONE).encodeABI()
      const txO = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          to: contractAddsONE,
          from: _accounts[0],
          value: web3ONE.utils.toHex(totalONE),
          data: txHash,
        }],
      }).then((result) => {
        strIDONE = ''
        strURLONE = ''
      })

      console.log(tx0)
      buyBUTTONbONE.classList.add('hideclass')
      buyBUTTONbONE.classList.remove('is-visible')
      buyBUTTONbBNB.classList.add('hideclass')
      buyBUTTONbBNB.classList.remove('is-visible')
      AREAm.innerText = 'Thank You for your support!'
    } catch (error) {
      console.error('error')
      console.error(error)
    }
  }

  const onClickBuyBNB = async () => {
    try {
      await ethereum.request({ method: 'eth_requestAccounts' })
      const _accounts = await ethereum.request({
        method: 'eth_accounts',
      })

      const totalBNB = await totalPriceBNB * (10 ** 18)
      const txHash = await SHOMINcontractBNB.methods.buyMembership(strURLBNB).encodeABI()
      const txO = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          to: contractAddsBNB,
          from: _accounts[0],
          value: web3BNB.utils.toHex(totalBNB),
          data: txHash,
        }],
      }).then((result) => {
        strIDBNB = ''
        strURLBNB = ''
      })

      buyBUTTONbONE.classList.add('hideclass')
      buyBUTTONbONE.classList.remove('is-visible')
      buyBUTTONbBNB.classList.add('hideclass')
      buyBUTTONbBNB.classList.remove('is-visible')
      AREAm.innerText = 'Thank You for your support!'
    } catch (error) {
      console.error('error')
      console.error(error)
    }
  }

  const onClickConnect = async () => {
    try {
      await ethereum.request({ method: 'eth_requestAccounts' })
      const _accounts = await ethereum.request({
        method: 'eth_accounts',
      })
      buyBUTTONbONE.classList.add('is-visible')
      buyBUTTONbONE.classList.remove('hideclass')
      buyBUTTONbBNB.classList.add('is-visible')
      buyBUTTONbBNB.classList.remove('hideclass')
      BUTTONb.classList.add('hideclass')
      BUTTONb.classList.remove('is-visible')
    } catch (error) {
      console.error('error')
      console.error(error)
    }

    BUTTON.onclick = onClickConnect
    buyBUTTONONE.onclick = onClickBuyONE
    buyBUTTONBNB.onclick = onClickBuyBNB
  }

  const onClickInstall = () => {
    BUTTON.innerText = 'Onboarding in progress'
    onboarding.startOnboarding()
  }

  const MetaMaskClientCheck = () => {
    buyBUTTONbONE.classList.add('is-visible')
    buyBUTTONbONE.classList.remove('hideclass')
    buyBUTTONbBNB.classList.add('is-visible')
    buyBUTTONbBNB.classList.remove('hideclass')
    BUTTONb.classList.add('is-visible')
    BUTTONb.classList.remove('hideclass')
    if (isMetaMaskInstalled()) {
      BUTTON.innerText = 'LOGIN with METAMASK!'
      BUTTON.onclick = onClickConnect
    } else {
      BUTTON.innerText = 'INSTALL METAMASK!'
      BUTTON.onclick = onClickInstall
    }
  }
  MetaMaskClientCheck()
  BUTTON.onclick = onClickConnect
  buyBUTTONONE.onclick = onClickBuyONE
  buyBUTTONBNB.onclick = onClickBuyBNB
}

runMetamask()

window.addEventListener('DOMContentLoaded', () => {
  runMetamask()
  buyBUTTONbONE.classList.add('hideclass')
  buyBUTTONbONE.classList.remove('is-visible')
  buyBUTTONbBNB.classList.add('hideclass')
  buyBUTTONbBNB.classList.remove('is-visible')
  BUTTONb.classList.add('is-visible')
  BUTTONb.classList.remove('hideclass')
  console.log('DOM fully loaded and parsed')
})
