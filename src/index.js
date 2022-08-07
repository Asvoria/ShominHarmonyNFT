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
  'inputs': [{ 'internalType': 'uint256', 'name': 'tokenId', 'type': 'uint256' }],
  'name': 'ownerOf',
  'outputs': [{ 'internalType': 'address', 'name': '', 'type': 'address' }],
  'stateMutability': 'view',
  'type': 'function',
}, {
  'inputs': [],
  'name': '_tokenIds',
  'outputs': [{ 'internalType': 'uint256', 'name': '_value', 'type': 'uint256' }],
  'stateMutability': 'view',
  'type': 'function',
}, {
  'inputs': [{ 'internalType': 'address', 'name': 'owner', 'type': 'address' }],
  'name': 'balanceOf',
  'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }],
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

const web3ONE = new Web3('https://explorer.ps.hmny.io/')
const web3BNB = new Web3('https://bsc-dataseed.binance.org/')
const HarmonyChainID = '1666900000'
const BinanceChainID = '56'
const contractAddsONE = '0x95cB678022ec33dEf1579AAbDf8d9eB5A5e066cD'
const contractAddsBNB = '0x0F10823132B05F5B18751414E3FA164b4d0Dfa38'
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
        let txO = await ethereum.request({
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
        txO = await SHOMINcontractONE.methods._tokenIds().call()
        console.log(txO)
        console.log(txO[0])
        console.log(txO[1])
        buyBUTTONbONE.classList.add('hideclass')
        buyBUTTONbONE.classList.remove('is-visible')
        buyBUTTONbBNB.classList.add('hideclass')
        buyBUTTONbBNB.classList.remove('is-visible')
        AREAm.classList.remove('Error')
        AREAm.classList.add('Success')
        AREAm.innerText = `Thank You for your support!\nYou may add the NFT token to your Metamask Mobile Wallet with following informtion.\nContract Address: |${contractAddsONE}|\nToken ID: |${txO}|\nRefresh the page and connect to Metamask to view the secret contents!`
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
      console.log('Get Network ID: ')
      const ChainID = await ethereum.request({ method: 'net_version' })
      console.log(ChainID)

      if (ChainID === BinanceChainID) {
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
        buyBUTTONbONE.classList.add('hideclass')
        buyBUTTONbONE.classList.remove('is-visible')
        buyBUTTONbBNB.classList.add('hideclass')
        buyBUTTONbBNB.classList.remove('is-visible')
        AREAm.classList.remove('Error')
        AREAm.classList.add('Success')
        AREAm.innerText = 'Thank You for your support!\nYou may add the NFT token to your Metamask Mobile Wallet with following informtion.\nContract Address: \nToken ID: '
      } else {
        AREAm.classList.add('Error')
        console.log('Error! Chain ID not match! Ask user to switch the network in wallet.')
        AREAm.innerText = 'Your selected network on Metamask Wallet does not match! Please Select Smart Chain Mainnet.'
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
      if (ChainID === HarmonyChainID) {
        let OwnerCheckONE = 0
        const BalanceInContractONE = await SHOMINcontractONE.methods.balanceOf(`${_accounts[0]}`).encodeABI()
        if (BalanceInContractONE > 0) {
          OwnerCheckONE = BalanceInContractONE[0]
        }
        ContentArea.innerHTML = `<div id="sscONE">ONE: |${OwnerCheckONE}|</div>`
      } else if (ChainID === BinanceChainID) {
        let OwnerCheckBNB = 0
        const BalanceInContractBNB = await SHOMINcontractBNB.methods.balanceOf(`${_accounts[0]}`).encodeABI()
        if (BalanceInContractBNB > 0) {
          OwnerCheckBNB = BalanceInContractBNB[0]
        }
        ContentArea.innerHTML = `<div id="sscBNB">BNB: |${OwnerCheckBNB}|</div>`
      } else {
        console.log('Wrong Chain!')
        AREAm.classList.add('Error')
        AREAm.innerText = `Wrong network detected!\nPlease set Metamask Wallet Network to Harmony Shard 0 Mainnet or Binance Smart Chain Mainnet.`
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
