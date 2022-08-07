# ShominHarmonyNFT
NFT minting of secret corner
```
yarn install
yarn deploy
```
```
npx prettier --write
```

const web3ONE = new Web3('https://api.harmony.one')
const web3BNB = new Web3('https://bsc-dataseed.binance.org/')
const HarmonyChainID = '1666600000'
const BinanceChainID = '56'

const web3ONE = new Web3('https://api.s0.ps.hmny.io')
const web3BNB = new Web3('https://bsc-dataseed.binance.org/')
const HarmonyChainID = '1666900000'
const BinanceChainID = '56'

//CORS Problem

```Access to fetch at 'https://explorer.ps.hmny.io/' from origin 'https://[username].github.io' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.```

Only happen on Devnet. No problem on Mainnet