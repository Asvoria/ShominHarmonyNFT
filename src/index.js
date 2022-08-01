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
const buyBUTTON = document.getElementById('buyBUTTON')
const BUTTONb = document.getElementById('BUTTONb')
const buyBUTTONb = document.getElementById('buyBUTTONb')
const AREAm = document.getElementById('MessageArea')

const Web3 = require('web3')

const web3 = new Web3('https://api.s0.ps.hmny.io')
const contractAdds = '0x07DaFAf783bC253ac310692856e863b659d8F3cA'
const SHOMINcontract = new web3.eth.Contract(SHOMIN_ABI, contractAdds)

const currentUrl = new URL(window.location.href)
const forwarderOrigin =
  currentUrl.hostname === 'localhost' ? 'http://localhost:9010' : undefined

let totalPrice
let strID = ''
let strURL = ''

const runMetamask = () => {
  const isMetaMaskInstalled = () => {
    const { ethereum } = window
    return Boolean(ethereum && ethereum.isMetaMask)
  }
  const onboarding = new MetaMaskOnboarding({ forwarderOrigin })

  const onClickBuy = async () => {
    try {
      await ethereum.request({ method: 'eth_requestAccounts' })
      const _accounts = await ethereum.request({
        method: 'eth_accounts',
      })
      console.log('_accounts[0]: ')
      console.log(_accounts[0] || 'Not able to get accounts')
      console.log('xx strID: ')
      console.log(strID)
      console.log('xx strURL: ')
      console.log(strURL)

      totalPrice = Number(20.0)
      const totalONE = await totalPrice * (10 ** 18)
      const txHash = await SHOMINcontract.methods.buyMembership(strURL).encodeABI()
      const txO = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          to: contractAdds,
          from: _accounts[0],
          value: web3.utils.toHex(totalONE),
          data: txHash,
        }],
      }).then((result) => {
        console.log('result')
        console.log(result)
        strID = ''
        strURL = ''
      })
      console.log('txO')
      console.log(txO)
      buyBUTTONb.classList.add('hideclass')
      buyBUTTONb.classList.remove('is-visible')
      buyBUTTON.innerText = 'BUY AGAIN!'
      BUTTONb.classList.add('hideclass')
      BUTTONb.classList.remove('is-visible')
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
      console.log('_accounts[0]: ')
      console.log(_accounts[0] || 'Not able to get accounts')
      console.log('xx strID: ')
      console.log(strID)
      console.log('xx strURL: ')
      console.log(strURL)
      buyBUTTON.innerText = 'Buy the Secret Corner Pass!'
      buyBUTTONb.classList.add('is-visible')
      buyBUTTONb.classList.remove('hideclass')
      BUTTONb.classList.add('hideclass')
      BUTTONb.classList.remove('is-visible')
    } catch (error) {
      console.error('error')
      console.error(error)
    }

    BUTTON.onclick = onClickConnect
    buyBUTTON.onclick = onClickBuy
  }

  const onClickInstall = () => {
    BUTTON.innerText = 'Onboarding in progress'
    onboarding.startOnboarding()
  }

  const MetaMaskClientCheck = () => {
    buyBUTTONb.classList.add('is-visible')
    buyBUTTONb.classList.remove('hideclass')
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
  buyBUTTON.onclick = onClickBuy
}

runMetamask()

window.addEventListener('DOMContentLoaded', () => {
  runMetamask()
  buyBUTTONb.classList.add('hideclass')
  buyBUTTONb.classList.remove('is-visible')
  BUTTONb.classList.add('is-visible')
  BUTTONb.classList.remove('hideclass')
  console.log('DOM fully loaded and parsed')
})
