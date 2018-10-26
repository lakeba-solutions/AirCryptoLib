
exports.headergen = function (MID, httpmethod, URI, timestamp, nonce, payload, APIkey) {
    var crypto = require("crypto");
    if (payload === "") { // if getRate request
        var sign = ''
        var base64Payload = ''
        var md5 = crypto.createHash('md5')
        try {
            var a = MID + httpmethod + URI + timestamp + nonce + base64Payload
            var signatureRawData = a.toString()
            let newBuff = Buffer.from(APIkey, 'base64')
            var secretKeyByteArray = Buffer.from(newBuff, 'utf8')
            var signature1 = new Buffer(signatureRawData).toString('utf8')
            var requestSignatureBase64String = crypto.createHmac('sha256', secretKeyByteArray).update(signature1).digest('base64')
            sign = MID+"||"+ requestSignatureBase64String+"||"+ nonce+ "||"+timestamp
            return sign
        } catch(e) {
            console.log(e)
        }
    } else {
        var CryptoJS = require("crypto-js");
        var JSON = require ("json-serialize")
        var base64 = require('base-64')
        var pl = payload;
        var apikey = APIkey

        function md5(string) {
            return crypto.createHash('md5').update(Buffer(string)).digest('base64');
        }
        try {
            var base64Payload = md5(pl)
        }
        catch (e) {
            console.log(e)
        }
        function hm() {
            var a = MID + httpmethod + URI + timestamp + nonce + base64Payload
            var signatureRawData = a.toString()
            let newBuff = Buffer.from(APIkey, 'base64')
            var secretKeyByteArray = Buffer.from(newBuff, 'utf8')
            var signature1 = new Buffer(signatureRawData).toString('utf8')
            var requestSignatureBase64String = crypto.createHmac('sha256', secretKeyByteArray).update(signature1).digest('base64');
            return requestSignatureBase64String;
        }
        try {
            var rs = hm();
            var sign = MID + "||" + rs + "||" + nonce + "||" + timestamp;
            return sign;

        } catch (e) {
            console.log(e)
        }
    }
}

