import { useWeb3 } from '../lib/web3store';
import { useAccount } from '../lib/useAccount';

export default function Tile({id, imgUrl, owner}) {
    const { mint } = useWeb3()
    const { account } = useAccount()

    return (
        owner == '0x0000000000000000000000000000000000000000' ?
        <div className="w-24 h-24 bg-transparent text-slate-300 text-center shrink cursor-pointer" onClick={()=>{
            mint(id)
            }}>
            Get it
        </div> : 
        <div className={owner == account ? "w-24 h-24 border border-yellow-200":"w-24 h-24" }>
            {owner}
        </div>
    )
}

//owner가 없는 타일에는 mint
//owner 타일에는 자기거가 표시되도록 
//자기거 클릭하면 url을 수정할 수 있게 