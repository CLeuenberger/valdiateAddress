const request = require('request');
const dotenv = require('dotenv');
dotenv.config();

function get_token_bedrock(callback){
    const headers = {
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded'
    };
    const body_string = `grant_type=client_credentials&scope=offline%20io.ethos.custody.reader%20io.etho.custody.address_assigner&client_id=${process.env.client_id_bedrock}&client_secret=${process.env.client_secret_bedrock}`;
    const options = {
        url: process.env.access_token_url_bedrock,
        method: 'POST',
        headers: headers,
        body: body_string
    };

    request(options, function (error, response) {
        if (!error && response.statusCode == 200) {
            
            let j_response = JSON.parse(response.body)
            callback(j_response.access_token)
        }
    })

}
// get_token_bedrock(function(response){
//     console.log('Bedrock Token: '+ response)
// })


module.exports = {
    get_token_bedrock: get_token_bedrock
}