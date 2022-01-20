const token = require('./get_token');
const dotenv = require('dotenv');
const { request, gql } = require('graphql-request')

token.get_token_bedrock(function(token){

    let blockchain_list = [
        {"blockchain":"ADA","address":"addr_test1qz60lv9fgyf20a4dukq6ue4u86pear0w78dy4uu0znp93pmeteday5sw4jg0j8fewh2k03am6gjz82zwuqh6t84ahvrqc2kjr9"},//testnet
        {"blockchain":"ADA","address":"addr1q9ht9nz0r3j5y7a4scmnfymuummvrzkdyqw723ncaxxpmnnflmywqj7fp3m7sy827tv56pe0ptj8a9uud8klgadhnuqsl4v5e6"}//mainnet
    ]

    async function validate_address(blockchains) {
        for (let value of blockchains) {
            const endpoint = process.env.bedrock_api_graph
            const headers = {Authorization: 'Bearer '+token}
            const query = gql`
                query validateAddress($blockchain: Blockchain, $address: String){
                    validateAddress(blockchain: $blockchain, address: $address)
                }
            `
            const variables = {
                blockchain: value.blockchain,
                address: value.address
            }
            data = await request(endpoint, query, variables, headers)
            await console.log(JSON.stringify(data, undefined, 2))
        }
    }
    validate_address(blockchain_list).catch((error) => console.error(error))
})