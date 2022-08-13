# ShominHarmonyNFT
NFT minting of secret corner
```
yarn install
yarn deploy
```
```
npx prettier --write
```

# Test
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

# Mainnet
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
const conAbiONE = new web3ONE.eth.Contract(SSC_ABI, ChainConAdr[1])
const conAbiBNB = new web3BNB.eth.Contract(SSC_ABI, ChainConAdr[2])
const conAbiCELO = new web3CELO.eth.Contract(SSC_ABI, ChainConAdr[3])
const ChainConABI = ['0', conAbiONE, conAbiBNB, conAbiCELO]

const ChainName = ['ERROR', 'Harmony Shard 0 Mainnet', 'Binance Smart Chain', 'Celo Mainnet']
const ChainShort = ['ERROR', 'HARMONY', 'BINANCE', 'CELO']
const ChainSym = ['ERROR', 'ONE', 'BNB', 'CELO']
const ChainID = ['0', '1666600000', '56', '42220']


# Latest issue
Process buy run through but with returned undefined.