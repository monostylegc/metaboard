import { useWeb3 } from '../lib/web3store';
import { useAccount } from '../lib/useAccount';

export default function Navbar() {
    const { web3, connect } = useWeb3()
    const { account } = useAccount()

    return (
        <div className="w-full bg-purple-400 fixed top-0 right-0 left-0">
            <header className="flex justify-between px-6 py-2 max-w-5xl mx-auto align-baseline">
                <div className="text-xl font-bold text-gray-50">
                    MetaBoard
                </div>
                <div >
                    {web3?
                        account?
                        <div className="text-gray-50 text-lg font-bold bg-purple-600 px-4 rounded-md hover:bg-purple-700">Disconnect</div>
                        :<div onClick={ connect } className="text-gray-50 text-lg font-bold bg-purple-600 px-4 rounded-md hover:bg-purple-700 cursor-pointer">Connect</div>
                    :<div className="text-gray-50 text-lg font-bold bg-purple-600 px-4 rounded-md hover:bg-purple-700 cursor-pointer">Please Install MetaMask</div>}
                </div>
            </header>
        </div>
    )
}