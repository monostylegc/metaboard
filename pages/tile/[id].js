import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { useWeb3 } from "../../lib/web3store"
import useSWR from "swr"
import { useAccount } from '../../lib/useAccount';

export default function Tile() {
    const router = useRouter()
    const { contract, changeImgUrl } = useWeb3()
    const { account } = useAccount()
    const { handleSubmit, register } = useForm()
    //id에 맞는 타일 정보를 가져온다.
    const { data:tile } = useSWR('tile',async()=>{
        const tile = await contract.methods.getTile(router.query.id).call()

        console.log(tile)
        return tile
    })
   
    const onVaild = (url) =>{
        console.log(url.ImgUrl)

        changeImgUrl(router.query.id, url.ImgUrl, account)
    }

    return (
        <div className="pt-11">
           
            <form onSubmit={handleSubmit(onVaild)} className='flex flex-col space-y-4 p-3' >
                <label className="text-xl text-center text-gray-600">
                   Set Your Tile Image URL
                </label>
                <div className="w-96 h-96 bg-slate-300 rounded-md mx-auto">Tile 그림 state로 저장해야함</div>
                <input type='text' {...register('ImgUrl', {required:true})} required placeholder="image url" className="border border-orange-400 rounded-md p-2"/>
                <button className="p-1 bg-orange-400 rounded-md">수정하기</button>
            </form>
        </div>
    )
}