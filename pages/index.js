import { useWeb3 } from '../lib/web3store';
import useSWR from 'swr';
import Tile from '../components/tile';

export default function Home() {

  const { web3, contract } = useWeb3()

  //tile 정보를 불러옴
  const { data : tiles } = useSWR( web3 && contract ? 'tiles' : null, async ()=>{
    const tiles = await contract.methods.getTiles().call()
 
    return tiles
  })

  return (
    //타일정보를 받아서 그리드로 뿌려줌
    <div className='w-full pt-11 bg-black'>
      <div className="grid grid-cols-12 gap-0 w-max h-max mx-auto">
        {
          tiles?.map((tile, i)=>{
            return <Tile id={ i } owner={ tile.owner } key={ i }/>
          }) 
        }
      </div>
    </div>
  )
}
