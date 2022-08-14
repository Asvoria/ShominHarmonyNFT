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
const BTNloginText = document.getElementById('BTNloginText')
const buyBTN = document.getElementById('buyBTN')
const buyBTNtext = document.getElementById('buyBTNtext')
const MsgArea = document.getElementById('MsgArea')
const CntArea = document.getElementById('CntArea')

const Web3 = require('web3')

const web3ONE = new Web3('https://api.s0.ps.hmny.io')
const web3BNB = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/')
const web3CELO = new Web3('https://alfajores-forno.celo-testnet.org')
const ChainWeb3 = ['0', web3ONE, web3BNB, web3CELO]

const ChainConAdr = [
  '0',
  '0xa6f1b130C69A4349a9Fc51bB36e01Ab2cD925EFB',
  '0x7044C20c5094697048791d4dDFf7CE56724e03Ff',
  '0x2E5adC0D61bd932C215bc7850b80Ff1602121db7',
]
const conAbiONE = new web3ONE.eth.Contract(SSC_ABI, ChainConAdr[1])
const conAbiBNB = new web3BNB.eth.Contract(SSC_ABI, ChainConAdr[2])
const conAbiCELO = new web3CELO.eth.Contract(SSC_ABI, ChainConAdr[3])
const ChainConABI = ['0', conAbiONE, conAbiBNB, conAbiCELO]

const ChainName = ['ERROR', 'Harmony Shard 0 DevNet', 'Binance Smart Chain Testnet', 'Celo Testnet']
const ChainShort = ['ERROR', 'HARMONYx', 'BINANCEx', 'CELOx']
const ChainSym = ['ERROR', 'ONE', 'BNB', 'CELO']
const ChainID = ['0', '1666900000', '97', '44787']
const ChainPrice = [Number(0), Number(200.0), Number(0.0068), Number(2)]
const ChainStrURL = [
  'ERROR',
  'https://asvoria.github.io/ShominHarmonyNFT/SCCcard2022v1.json',
  'https://asvoria.github.io/ShominHarmonyNFT/SCCcard2022v2.json',
  'https://asvoria.github.io/ShominHarmonyNFT/SCCcard2022v3.json',
]

const currentUrl = new URL(window.location.href)
const forwarderOrigin =
  currentUrl.hostname === 'localhost' ? 'http://localhost:9010' : undefined

const runMetamask = () => {
  let ChainSelect = ''
  const isMetaMaskInstalled = () => {
    const { ethereum } = window
    return Boolean(ethereum && ethereum.isMetaMask)
  }
  const onboarding = new MetaMaskOnboarding({ forwarderOrigin })

  const onClickBuyX = async () => {
    try {
      await ethereum.request({ method: 'eth_requestAccounts' })
      const detChainID = await ethereum.request({ method: 'net_version' })
      let txlog = ''

      if (detChainID === ChainID[ChainSelect]) {
        const _accounts = await ethereum.request({
          method: 'eth_accounts',
        })

        const totalToken = await ChainPrice[ChainSelect] * (10 ** 18)
        const txHash = await ChainConABI[ChainSelect].methods.buyMembership(ChainStrURL[ChainSelect]).encodeABI()
        const txO = await ethereum.request({
          method: 'eth_sendTransaction',
          params: [{
            to: ChainConAdr[ChainSelect],
            from: _accounts[0],
            value: ChainWeb3[ChainSelect].utils.toHex(totalToken),
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
        await sleep(800)
        let getRxLog = ''
        for (let i = 0; i < 30; i++) {
          console.log('Waiting...')
          getRxLog = await ChainWeb3[ChainSelect].eth.getTransactionReceipt(txlog)
          MsgArea.innerText += `.`
          await sleep(200)
          if (getRxLog) {
            console.log('rx not null...')
            break
          }
          await sleep(880)
        }

        console.log(getRxLog.logs[0].topics[3])
        const idOnly = await ChainWeb3[ChainSelect].utils.hexToNumber(getRxLog.logs[0].topics[3])
        console.log(idOnly)
        buyBTN.classList.add('hideclass')
        buyBTN.classList.remove('is-visible')
        MsgArea.classList.remove('Error')
        MsgArea.classList.add('Success')
        CntArea.innerText = `Thank You for your support!\nYou may add the NFT token to your Metamask Mobile Wallet with following informtion.\nContract Address: ${ChainConAdr[ChainSelect]}\nToken ID: ${idOnly}\nRefresh the page and connect to Metamask to view the secret contents!`
      } else {
        MsgArea.classList.add('Error')
        MsgArea.innerText = `Your selected network on Metamask Wallet does not match! Please Select ${ChainName[ChainSelect]}.`
      }
    } catch (error) {
      console.error('error')
      console.error(error)
      CntArea.innerText = `Network busy. Don't worry, check out your transaction hash and refresh this page.`
    }
  }

  const CheckOwner = async (acc) => {
    let OwnToken = 0
    try {
      const BalanceInContract = await ChainConABI[ChainSelect].methods.balanceOf(acc).call()
      if (BalanceInContract > 0) {
        OwnToken = BalanceInContract
      }
      CntArea.innerHTML = `<div>Passes on ${ChainName[ChainSelect]}: ${OwnToken}</div>`
      buyBTNtext.innerHTML = `${ChainShort[ChainSelect]}<br> ${ChainPrice[ChainSelect]} ${ChainSym[ChainSelect]}`
    } catch (error) {
      console.error(error)
    }
    return OwnToken
  }

  const onClickConnect = async () => {
    try {
      await ethereum.request({ method: 'eth_requestAccounts' })
      const _accounts = await ethereum.request({
        method: 'eth_accounts',
      })
      const ChainIDsel = await ethereum.request({ method: 'net_version' })
      console.log(_accounts[0])
      console.log(ChainIDsel)
      let ownNFTbalance = 0

      if (ChainIDsel === ChainID[1]) {
        ChainSelect = Number(1)
      } else if (ChainIDsel === ChainID[2]) {
        ChainSelect = Number(2)
      } else if (ChainIDsel === ChainID[3]) {
        ChainSelect = Number(3)
      } else {
        ChainSelect = Number(0)
        console.log('Wrong Chain!')
      }

      if (ChainSelect === 0) {
        MsgArea.classList.add('Error')
        MsgArea.innerText = `Unsupported network detected!\nPlease set Metamask Network to Harmony Shard 0 Mainnet, Binance Smart Chain Mainnet or Celo Mainnet, and then refresh the page.`
      } else {
        ownNFTbalance = await CheckOwner(_accounts[0])
        BTNlogin.classList.add('hideclass')
        BTNlogin.classList.remove('is-visible')
        buyBTN.classList.add('is-visible')
        buyBTN.classList.remove('hideclass')
      }

      if (ownNFTbalance > 0) {
        console.log('Allow display of restricted posts.')
        MsgArea.classList.add('Success')
        MsgArea.classList.remove('Error')
        TitleText.innerText = 'Welcome Back!\nYou may still be able to purchase more passes.'
        MsgArea.innerText = 'Thank you for your support! You are truely an amazing supporter!'
        CntArea.innerHTML += '<img style="display: flex; width: 98%;" src="happy.svg" alt="My Happy SVG" />'
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
    buyBTN.onclick = onClickBuyX
  }

  const onClickInstall = () => {
    BTNloginText.innerText = 'Onboarding in progress'
    onboarding.startOnboarding()
  }

  const MetaMaskClientCheck = () => {
    buyBTN.classList.remove('is-visible')
    buyBTN.classList.add('hideclass')
    BTNlogin.classList.add('is-visible')
    BTNlogin.classList.remove('hideclass')
    if (isMetaMaskInstalled()) {
      BTNloginText.innerText = 'LOGIN with METAMASK!'
      BTNlogin.onclick = onClickConnect
    } else {
      BTNloginText.innerText = 'INSTALL METAMASK!'
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
