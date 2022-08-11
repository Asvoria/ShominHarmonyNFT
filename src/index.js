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
}, {
  'anonymous': false,
  'inputs': [
    { 'indexed': true, 'internalType': 'address', 'name': 'owner', 'type': 'address' },
    { 'indexed': true, 'internalType': 'address', 'name': 'approved', 'type': 'address' },
    { 'indexed': true, 'internalType': 'uint256', 'name': 'tokenId', 'type': 'uint256' },
  ],
  'name': 'Approval',
  'type': 'event',
}, {
  'anonymous': false,
  'inputs': [
    { 'indexed': true, 'internalType': 'address', 'name': 'owner', 'type': 'address' },
    { 'indexed': true, 'internalType': 'address', 'name': 'operator', 'type': 'address' },
    { 'indexed': false, 'internalType': 'bool', 'name': 'approved', 'type': 'bool' },
  ],
  'name': 'ApprovalForAll',
  'type': 'event',
}, {
  'anonymous': false,
  'inputs': [
    { 'indexed': true, 'internalType': 'address', 'name': 'from', 'type': 'address' },
    { 'indexed': true, 'internalType': 'address', 'name': 'to', 'type': 'address' },
    { 'indexed': true, 'internalType': 'uint256', 'name': 'tokenId', 'type': 'uint256' },
  ],
  'name': 'Transfer',
  'type': 'event',
}]

const sleep = (ms) => new Promise((res) => setTimeout(res, ms))

const TitleText = document.getElementById('Title')
const BUTTON = document.getElementById('BUTTON')
const BUTTONb = document.getElementById('BUTTONb')
const buyBUTTONbONE = document.getElementById('buyBUTTONbONE')
const buyBUTTONbBNB = document.getElementById('buyBUTTONbBNB')
const AREAm = document.getElementById('MessageArea')
const ContentArea = document.getElementById('ContentArea')

const Web3 = require('web3')

const web3ONE = new Web3('https://api.harmony.one')
const web3BNB = new Web3('https://bsc-dataseed.binance.org/')
const HarmonyChainID = '1666600000'
const BinanceChainID = '56'
const contractAddsONE = '0xAa993f353aA3Dc670237e73b08533D0adA45Db5A'
const contractAddsBNB = '0x54e0e3b3adC1FD0FAbCa8e97fd43CBE24eF2E206'
const SHOMINcontractONE = new web3ONE.eth.Contract(SHOMIN_ABI, contractAddsONE)
const SHOMINcontractBNB = new web3BNB.eth.Contract(SHOMIN_ABI, contractAddsBNB)

const currentUrl = new URL(window.location.href)
const forwarderOrigin =
  currentUrl.hostname === 'localhost' ? 'http://localhost:9010' : undefined

const totalPriceONE = Number(100.0)
const totalPriceBNB = Number(0.0068)

const strURLONE = 'https://asvoria.github.io/Author/nft/SCCcard2022v1.json'
const strURLBNB = 'https://asvoria.github.io/Author/nft/SCCcard2022v2.json'

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
      let txlog = ''

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
          txlog = result
        }).catch((error) => {
          console.log(error)
        })
        console.log(txO)
        console.log(txlog)
        await sleep(600)
        let getRxLog = ''
        for (let i = 0; i < 5; i++) {
          console.log('waiting...')
          getRxLog = await web3ONE.eth.getTransactionReceipt(txlog)
          await sleep(100)
          if (getRxLog) {
            console.log('rx not null...')
            break
          }
          await sleep(600)
        }

        console.log(getRxLog.logs[0].topics[3])
        const idOnly = await web3ONE.utils.hexToNumber(getRxLog.logs[0].topics[3])
        console.log(idOnly)
        buyBUTTONbONE.classList.add('hideclass')
        buyBUTTONbONE.classList.remove('is-visible')
        buyBUTTONbBNB.classList.add('hideclass')
        buyBUTTONbBNB.classList.remove('is-visible')
        AREAm.classList.remove('Error')
        AREAm.classList.add('Success')
        AREAm.innerText = `Thank You for your support!\nYou may add the NFT token to your Metamask Mobile Wallet with following informtion.\nContract Address: ${contractAddsONE}\nToken ID: ${idOnly}\nRefresh the page and connect to Metamask to view the secret contents!`
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
      let txlog = ''

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
          txlog = result
        }).catch((error) => {
          console.log(error)
        })
        console.log(txO)
        console.log(txlog)
        await sleep(600)
        let getRxLog = ''
        for (let i = 0; i < 5; i++) {
          console.log('waiting...')
          getRxLog = await web3BNB.eth.getTransactionReceipt(txlog)
          await sleep(100)
          if (getRxLog) {
            console.log('rx not null...')
            break
          }
          await sleep(600)
        }

        console.log(getRxLog.logs[0].topics[3])
        const idOnly = await web3BNB.utils.hexToNumber(getRxLog.logs[0].topics[3])
        console.log(idOnly)
        buyBUTTONbBNB.classList.add('hideclass')
        buyBUTTONbBNB.classList.remove('is-visible')
        buyBUTTONbBNB.classList.add('hideclass')
        buyBUTTONbBNB.classList.remove('is-visible')
        AREAm.classList.remove('Error')
        AREAm.classList.add('Success')
        AREAm.innerText = `Thank You for your support!\nYou may add the NFT token to your Metamask Mobile Wallet with following informtion.\nContract Address: ${contractAddsBNB}\nToken ID: ${idOnly}\nRefresh the page and connect to Metamask to view the secret contents!`
      } else {
        AREAm.classList.add('Error')
        AREAm.innerText = `Your selected network on Metamask Wallet does not match! Please Select Binance Smart Chain Mainnet.`
      }
    } catch (error) {
      console.error('error')
      console.error(error)
    }
  }

  const onClickConnect = async () => {
    let OwnerCheckONE = 0
    let OwnerCheckBNB = 0
    let PassOwner = 0
    try {
      await ethereum.request({ method: 'eth_requestAccounts' })
      const _accounts = await ethereum.request({
        method: 'eth_accounts',
      })
      const ChainID = await ethereum.request({ method: 'net_version' })
      console.log(_accounts[0])
      if (ChainID === HarmonyChainID) {
        const BalanceInContractONE = await SHOMINcontractONE.methods.balanceOf(_accounts[0]).call()
        if (BalanceInContractONE > 0) {
          OwnerCheckONE = BalanceInContractONE
        }
        ContentArea.innerHTML = `<div id="sscONE">Passes on Harmony: ${OwnerCheckONE}</div>`
        buyBUTTONbONE.classList.add('is-visible')
        buyBUTTONbONE.classList.remove('hideclass')
      } else if (ChainID === BinanceChainID) {
        const BalanceInContractBNB = await SHOMINcontractBNB.methods.balanceOf(_accounts[0]).call()
        console.log(BalanceInContractBNB)
        if (BalanceInContractBNB > 0) {
          OwnerCheckBNB = BalanceInContractBNB[0]
        }
        ContentArea.innerHTML = `<div id="sscBNB">Passes on Binance: ${OwnerCheckBNB}</div>`
        buyBUTTONbBNB.classList.add('is-visible')
        buyBUTTONbBNB.classList.remove('hideclass')
      } else {
        console.log('Wrong Chain!')
        AREAm.classList.add('Error')
        AREAm.innerText = `Wrong network detected!\nPlease set Metamask Network to Harmony Shard 0 Mainnet or Binance Smart Chain Mainnet.`
        TitleText.innerText = 'Please change to the correct Metamask network and then refresh the page.'
      }

      if (OwnerCheckONE > 0) {
        PassOwner += OwnerCheckONE
      }
      if (OwnerCheckBNB > 0) {
        PassOwner += OwnerCheckBNB
      }

      if (PassOwner > 0) {
        console.log('Allow display of restricted posts.')
        TitleText.innerText = 'Welcome Back!\nYou may still be able to purchase more passes.'
        AREAm.innerText = 'Thank you for your support! You are truely an amazing supporter!'
        ContentArea.innerHTML += '<object style="display: flex; width: 100%; height: 600px;" type="text/html" data="https://asvoria.github.io/Author/bundled/display.html"></object>'
      }

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
