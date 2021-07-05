 let constans = {
    userLevel: {
        normal: 1,
        vip : 2
    },
    userStatus: {
        active: 1,
        pending: 2,
        disabled:3
    },
    assetType: {
        coin: 1,
        token: 2,
        fiat: 3,
    },
    assetStatus:
    {
        active: 1,
        disable: 2,
    },
    tradeType: {
        limit: 1,
        market: 2,
        stop:3
    },
    accountType: {
        spot: 1,
        margin: 2,
        futures : 3
    },
    tokenType:
    {
        signup: 1,
        login: 2,
        forget: 3
    },
    pairStatus: {
        normal : 1
    },
    walletStatus: {
        normal : 1
    }
};


let swap = (o,r={})=> Object.keys(o).map(x=>r[o[x]]=x)&&r;
for (let i in constans)
    constans[i] = swap(constans[i]);
    

export default constans;