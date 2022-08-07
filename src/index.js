import MetaMaskOnboarding from '@metamask/onboarding'

const SHOMIN_ABI = [{
  'inputs': [{ 'internalType': 'address', 'name': 'owner', 'type': 'address' }],
  'name': 'balanceOf',
  'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }],
  'stateMutability': 'view',
  'type': 'function',
}, {
  'inputs': [{ 'internalType': 'string', 'name': 'newURI', 'type': 'string' }],
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
}, {
  'inputs': [{ 'internalType': 'uint256', 'name': 'tokenId', 'type': 'uint256' }],
  'name': 'tokenURI',
  'outputs': [{ 'internalType': 'string', 'name': '', 'type': 'string' }],
  'stateMutability': 'view',
  'type': 'function',
}]

const TitleText = document.getElementById('Title')
const BUTTON = document.getElementById('BUTTON')
const BUTTONb = document.getElementById('BUTTONb')
const buyBUTTONbONE = document.getElementById('buyBUTTONbONE')
const buyBUTTONbBNB = document.getElementById('buyBUTTONbBNB')
const AREAm = document.getElementById('MessageArea')
const ContentArea = document.getElementById('ContentArea')

const Web3 = require('web3')

const web3ONE = new Web3('https://api.s0.ps.hmny.io')
const web3BNB = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/')
const HarmonyChainID = '1666900000'
const BinanceChainID = '97'
const contractAddsONE = '0xa7c419E435D628Aa159c843D932F8E87fCa4e633'
const contractAddsBNB = '0xdc5be95754926cBCDCf7e3B73D50e28f3ba98f9b'
const SHOMINcontractONE = new web3ONE.eth.Contract(SHOMIN_ABI, contractAddsONE)
const SHOMINcontractBNB = new web3BNB.eth.Contract(SHOMIN_ABI, contractAddsBNB)

const currentUrl = new URL(window.location.href)
const forwarderOrigin =
  currentUrl.hostname === 'localhost' ? 'http://localhost:9010' : undefined

const totalPriceONE = Number(100.0)
const totalPriceBNB = Number(0.0068)

const strURLONE = '{"image": "https://raw.githubusercontent.com/Asvoria/ShominHarmonyNFT/main/nft/SCCcard2022v1.json?token=GHSAT0AAAAAABXEMZSDZD7K66B5QNBFN6A4YXN67IQ"}'
const strURLBNB = '{"image": "https://raw.githubusercontent.com/Asvoria/ShominHarmonyNFT/main/nft/SCCcard2022v2.json?token=GHSAT0AAAAAABXEMZSD54ZSPXX2VCDBCXOQYXN67VQ"}'

const runMetamask = () => {
  const isMetaMaskInstalled = () => {
    const { ethereum } = window
    return Boolean(ethereum && ethereum.isMetaMask)
  }
  const onboarding = new MetaMaskOnboarding({ forwarderOrigin })

  const onClickBuyONE = async () => {
    try {
      await ethereum.request({ method: 'eth_requestAccounts' })
      const ChainID = await ethereum.request({ method: 'net_version' })

      if (ChainID === HarmonyChainID) {
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
          console.log('ONE chain response: ')
          console.log(result)
        })
        console.log(txO)
        console.log(txO[0])
        buyBUTTONbONE.classList.add('hideclass')
        buyBUTTONbONE.classList.remove('is-visible')
        buyBUTTONbBNB.classList.add('hideclass')
        buyBUTTONbBNB.classList.remove('is-visible')
        AREAm.classList.remove('Error')
        AREAm.classList.add('Success')
        AREAm.innerText = `Thank You for your support!\nYou may add the NFT token to your Metamask Mobile Wallet with following informtion.\nContract Address: ${contractAddsONE}\nToken ID: ${txO}\nRefresh the page and connect to Metamask to view the secret contents!`
      } else {
        AREAm.classList.add('Error')
        AREAm.innerText = `Your selected network on Metamask Wallet does not match! Please Select Harmony Shard 0 Mainnet.`
      }
    } catch (error) {
      console.error('error')
      console.error(error)
    }
  }

  const onClickBuyBNB = async () => {
    try {
      await ethereum.request({ method: 'eth_requestAccounts' })
      const ChainID = await ethereum.request({ method: 'net_version' })

      if (ChainID === HarmonyChainID) {
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
          console.log('BNB chain response: ')
          console.log(result)
        })
        console.log(txO)
        console.log(txO[0])
        buyBUTTONbONE.classList.add('hideclass')
        buyBUTTONbONE.classList.remove('is-visible')
        buyBUTTONbBNB.classList.add('hideclass')
        buyBUTTONbBNB.classList.remove('is-visible')
        AREAm.classList.remove('Error')
        AREAm.classList.add('Success')
        AREAm.innerText = `Thank You for your support!\nYou may add the NFT token to your Metamask Mobile Wallet with following informtion.\nContract Address: ${contractAddsBNB}\nToken ID: ${txO}\nRefresh the page and connect to Metamask to view the secret contents!`
      } else {
        AREAm.classList.add('Error')
        AREAm.innerText = `Your selected network on Metamask Wallet does not match! Please Select Harmony Shard 0 Mainnet.`
      }
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
      const ChainID = await ethereum.request({ method: 'net_version' })
      console.log(_accounts[0])
      if (ChainID === HarmonyChainID) {
        let OwnerCheckONE = 0
        const BalanceInContractONE = await SHOMINcontractONE.methods.balanceOf(_accounts[0]).call()
        if (BalanceInContractONE > 0) {
          OwnerCheckONE = BalanceInContractONE
        }
        ContentArea.innerHTML = `<div id="sscONE">ONE: ${OwnerCheckONE}</div>`
      } else if (ChainID === BinanceChainID) {
        let OwnerCheckBNB = 0
        const BalanceInContractBNB = await SHOMINcontractBNB.methods.balanceOf(_accounts[0]).call()
        console.log(BalanceInContractBNB)
        if (BalanceInContractBNB > 0) {
          OwnerCheckBNB = BalanceInContractBNB[0]
        }
        ContentArea.innerHTML = `<div id="sscBNB">BNB: ${OwnerCheckBNB}</div>`
      } else {
        console.log('Wrong Chain!')
        AREAm.classList.add('Error')
        AREAm.innerText = `Wrong network detected!\nPlease set Metamask Network to Harmony Shard 0 Mainnet or Binance Smart Chain Mainnet.`
      }

      buyBUTTONbONE.classList.add('is-visible')
      buyBUTTONbONE.classList.remove('hideclass')
      buyBUTTONbBNB.classList.add('is-visible')
      buyBUTTONbBNB.classList.remove('hideclass')
      BUTTONb.classList.add('hideclass')
      BUTTONb.classList.remove('is-visible')
      TitleText.classList.add('is-visible')
      TitleText.classList.remove('hideclass')
      TitleText.innerText = 'Welcome to Shomin\'s Secret Corner!\nClick the following buttons to buy the Secret Corner Pass on their dedicated network:'
    } catch (error) {
      console.error('error')
      console.error(error)
    }

    BUTTON.onclick = onClickConnect
    buyBUTTONbONE.onclick = onClickBuyONE
    buyBUTTONbBNB.onclick = onClickBuyBNB
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
  buyBUTTONbONE.onclick = onClickBuyONE
  buyBUTTONbBNB.onclick = onClickBuyBNB
}

runMetamask()

window.addEventListener('DOMContentLoaded', () => {
  TitleText.classList.add('hideclass')
  runMetamask()
  buyBUTTONbONE.classList.add('hideclass')
  buyBUTTONbONE.classList.remove('is-visible')
  buyBUTTONbBNB.classList.add('hideclass')
  buyBUTTONbBNB.classList.remove('is-visible')
  BUTTONb.classList.add('is-visible')
  BUTTONb.classList.remove('hideclass')
  console.log('DOM fully loaded and parsed')
})
