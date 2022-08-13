import MetaMaskOnboarding from '@metamask/onboarding'

const SSC_ABI = [{
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

const sleep = (ms) => new Promise((res) => setTimeout(res, ms))

const TitleText = document.getElementById('Title')
const BTNlogin = document.getElementById('BTNlogin')
const buyBTN = document.getElementById('buyBTN')
const buyBTNtext = document.getElementById('buyBTNtext')
const MsgArea = document.getElementById('MsgArea')
const CntArea = document.getElementById('CntArea')

const Web3 = require('web3')

const web3ONE = new Web3('https://api.harmony.one')
const web3BNB = new Web3('https://bsc-dataseed.binance.org/')
const web3CELO = new Web3('https://forno.celo.org')
const ChainWeb3 = ['0', web3ONE, web3BNB, web3CELO]

const ChainConAdr = [
  '0',
  '0xAa993f353aA3Dc670237e73b08533D0adA45Db5A',
  '0x54e0e3b3adC1FD0FAbCa8e97fd43CBE24eF2E206',
  '0xf520dA05364af929e19866Bbd6c4fFAC2eca0EDa',
]
const conAbiONE = new web3ONE.eth.Contract(SSC_ABI, ChainConAdr[0])
const conAbiBNB = new web3BNB.eth.Contract(SSC_ABI, ChainConAdr[1])
const conAbiCELO = new web3CELO.eth.Contract(SSC_ABI, ChainConAdr[2])
const ChainConABI = ['0', conAbiONE, conAbiBNB, conAbiCELO]

const ChainName = ['ERROR', 'Harmony Shard 0 Mainnet', 'Binance Smart Chain', 'Celo Mainnet']
const ChainShort = ['ERROR', 'HARMONY', 'BINANCE', 'CELO']
const ChainSym = ['ERROR', 'ONE', 'BNB', 'CELO']
const ChainID = ['0', '1666600000', '56', '42220']
const ChainPrice = [Number(0), Number(200.0), Number(0.0068), Number(2)]
const ChainStrURL = [
  'ERROR',
  'https://asvoria.github.io/Author/nft/SCCcard2022v1.json',
  'https://asvoria.github.io/Author/nft/SCCcard2022v2.json',
  'https://asvoria.github.io/Author/nft/SCCcard2022v2.json',
]

const currentUrl = new URL(window.location.href)
const forwarderOrigin =
  currentUrl.hostname === 'localhost' ? 'http://localhost:9010' : undefined

const runMetamask = () => {
  const isMetaMaskInstalled = () => {
    const { ethereum } = window
    return Boolean(ethereum && ethereum.isMetaMask)
  }
  const onboarding = new MetaMaskOnboarding({ forwarderOrigin })

  const onClickBuyX = async (cName, cID, cWeb3, cConABI, cPrice, cURL, cConAds) => {
    try {
      await ethereum.request({ method: 'eth_requestAccounts' })
      const detChainID = await ethereum.request({ method: 'net_version' })
      let txlog = ''

      if (detChainID === cID) {
        const _accounts = await ethereum.request({
          method: 'eth_accounts',
        })

        const totalToken = await cPrice * (10 ** 18)
        const txHash = await cConABI.methods.buyMembership(cURL).encodeABI()
        const txO = await ethereum.request({
          method: 'eth_sendTransaction',
          params: [{
            to: cConAds,
            from: _accounts[0],
            value: cWeb3.utils.toHex(totalToken),
            data: txHash,
          }],
        }).then((result) => {
          console.log('Chain response: ')
          console.log(result)
          txlog = result
        }).catch((error) => {
          console.log(error)
        })
        console.log(txO)
        await sleep(600)
        let getRxLog = ''
        for (let i = 0; i < 30; i++) {
          console.log('Waiting...')
          getRxLog = await cWeb3.eth.getTransactionReceipt(txlog)
          MsgArea.innerText += `.`
          await sleep(200)
          if (getRxLog) {
            console.log('rx not null...')
            break
          }
          await sleep(600)
        }

        console.log(getRxLog.logs[0].topics[3])
        const idOnly = await cWeb3.utils.hexToNumber(getRxLog.logs[0].topics[3])
        console.log(idOnly)
        buyBTN.classList.add('hideclass')
        buyBTN.classList.remove('is-visible')
        MsgArea.classList.remove('Error')
        MsgArea.classList.add('Success')
        CntArea.innerText = `Thank You for your support!\nYou may add the NFT token to your Metamask Mobile Wallet with following informtion.\nContract Address: ${cConAds}\nToken ID: ${idOnly}\nRefresh the page and connect to Metamask to view the secret contents!`
      } else {
        MsgArea.classList.add('Error')
        MsgArea.innerText = `Your selected network on Metamask Wallet does not match! Please Select ${cName}.`
      }
    } catch (error) {
      console.error('error')
      console.error(error)
      CntArea.innerText = `Network busy. Don't worry, check out your transaction hash and refresh this page.`
    }
  }

  const CheckOwner = async (chkName, chkShort, chkSym, chkConABI, chkPrice) => {
    let OwnToken = ''
    try {
      const BalanceInContract = await chkConABI.methods.balanceOf(_accounts[0]).call()
      if (BalanceInContract > 0) {
        OwnToken = BalanceInContract
      }
      CntArea.innerHTML = `<div>Passes on ${chkName}: ${OwnToken}</div>`
      buyBTNtext.innerHTML = `${chkShort}<br> ${chkPrice} ${chkSym}`
    } catch (error) {
      console.error(error)
    }
    return OwnToken
  }

  const onClickConnect = async () => {
    try {
      let ChainSelect = ''
      await ethereum.request({ method: 'eth_requestAccounts' })
      const _accounts = await ethereum.request({
        method: 'eth_accounts',
      })
      const ChainIDsel = await ethereum.request({ method: 'net_version' })
      console.log(_accounts[0])
      console.log(ChainID)
      let ownNFTbalance = 0

      if (ChainIDsel === ChainID[0]) {
        ChainSelect = Number(1)
      } else if (ChainIDsel === ChainID[1]) {
        ChainSelect = Number(2)
      } else if (ChainIDsel === ChainID[2]) {
        ChainSelect = Number(3)
      } else {
        ChainSelect = Number(0)
        console.log('Wrong Chain!')
      }

      if (ChainSelect === 0) {
        MsgArea.classList.add('Error')
        MsgArea.innerText = `Unsupported network detected!\nPlease set Metamask Network to Harmony Shard 0 Mainnet, Binance Smart Chain Mainnet or Celo Mainnet.`
        TitleText.innerText = 'Please change to the supported Metamask network and then refresh the page.'
      } else {
        ownNFTbalance = await CheckOwner(ChainName[ChainSelect], ChainShort[ChainSelect], ChainSym[ChainSelect], ChainConABI[ChainSelect], ChainPrice[ChainSelect])
      }

      if (ownNFTbalance > 0) {
        console.log('Allow display of restricted posts.')
        TitleText.innerText = 'Welcome Back!\nYou may still be able to purchase more passes.'
        MsgArea.innerText = 'Thank you for your support! You are truely an amazing supporter!'
        CntArea.innerHTML += '<object style="display: flex; width: 98%; height: 560px;" type="text/html" data="https://asvoria.github.io/Author/bundled/display.html"></object>'
      } else {
        console.log('Allow display of restricted posts.')
        TitleText.innerText = 'Welcome to Shomin\'s Secret Corner!\nClick the following buttons to buy the Secret Corner Pass:'
      }
      TitleText.classList.add('is-visible')
      TitleText.classList.remove('hideclass')
    } catch (error) {
      console.error('error')
      console.error(error)
    }

    BTNlogin.onclick = onClickConnect
    buyBTN.onclick = onClickBuyX(ChainName[ChainSelect], ChainID[ChainSelect], ChainWeb3[ChainSelect], ChainConABI[ChainSelect], ChainPrice[ChainSelect], ChainStrURL[ChainSelect], ChainConAdr[ChainSelect])
  }

  const onClickInstall = () => {
    BTNlogin.innerText = 'Onboarding in progress'
    onboarding.startOnboarding()
  }

  const MetaMaskClientCheck = () => {
    buyBTN.classList.remove('is-visible')
    buyBTN.classList.add('hideclass')
    BTNlogin.classList.add('is-visible')
    BTNlogin.classList.remove('hideclass')
    if (isMetaMaskInstalled()) {
      BTNlogin.innerText = 'LOGIN with METAMASK!'
      BTNlogin.onclick = onClickConnect
    } else {
      BTNlogin.innerText = 'INSTALL METAMASK!'
      BTNlogin.onclick = onClickInstall
    }
  }
  MetaMaskClientCheck()
  BTNlogin.onclick = onClickConnect
}

runMetamask()

window.addEventListener('DOMContentLoaded', () => {
  TitleText.classList.add('hideclass')
  runMetamask()
  buyBTN.classList.add('hideclass')
  buyBTN.classList.remove('is-visible')
  BTNlogin.classList.add('is-visible')
  BTNlogin.classList.remove('hideclass')
  console.log('DOM fully loaded and parsed')
})
