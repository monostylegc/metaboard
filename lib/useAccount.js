import { useWeb3 } from "./web3store";
import { useEffect } from "react";
import useSWR from 'swr';

export const useAccount = () => {
    const { web3, provider } = useWeb3()

    const { data : account, mutate } = useSWR(web3?'web3/accounts' : null, 
    async () => {
        const accounts = await web3.eth.getAccounts()
        const account = accounts[0]

        if(!account){
            throw new Error("cannot retreive an account. plz refresh the browser")
        }
        return account
    })

    useEffect(() => {
        const mutator = accounts => mutate(accounts[0] ?? null)
        provider?.on("accountsChanged", mutator)
    
        return () => {
          provider?.removeListener("accountsChanged", mutator)
        }
      }, [provider])

    console.log(account)

    return {
        account,
        mutate
    }
}
