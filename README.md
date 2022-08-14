# What is this?
This is a demo on how to use an ERC721 token as a form of membership pass.  

Since this website is hosted on github open source, it is not a secure way to keep secret content. The website is to show how to use ERC721 token as a form of unique membership pass that works like Patreon pages.  

This demo page is using Harmony DevNet, Celo Alfajores Testnet and BSC Testnet. You may play with it and hack it too! [hint: the token price is set within the javascript, hack it so that you may mint the NFT with lowest price possible.]  
I teach programming, this is just a sample code writen as a teaching material. It can be hacked. Please do not use this as your project reference without placing your own security measures.  

You may visit my DEMO page at:
https://asvoria.github.io/ShominHarmonyNFT/  

Shomin's Author Page:  
https://asvoria.github.io/Author/

## How to?
Fork this to your own repo, or download it as .zip.  
Best is you use VS Code to start working on it.  
```
yarn install
```  
Then...  
```
yarn deploy
```  
If you made any html changes, do run prettier...  
```
npx prettier --write .
```  

## Test Networks
``` js
const web3ONE = new Web3('https://api.s0.ps.hmny.io')
const web3BNB = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/')
const web3CELO = new Web3('https://alfajores-forno.celo-testnet.org')
const ChainWeb3 = ['0', web3ONE, web3BNB, web3CELO]

const ChainConAdr = [
  '0',
  '[Your own contract address on Harmony Shard 0]',
  '[Your own contract address on Binance]',
  '[Your own contract address on Celo]',
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
  'https://asvoria.github.io/Author/nft/SCCcard2022v1.json',
  'https://asvoria.github.io/Author/nft/SCCcard2022v2.json',
  'https://asvoria.github.io/Author/nft/SCCcard2022v3.json',
]
```  

# Latest issue [Aug 2022]
...  