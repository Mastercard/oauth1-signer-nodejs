const assert = require("assert");
const OAuth = require("../src/OAuth");
const toOAuthParamString = require("../src/OAuth").toOAuthParamString;

OAuth.getNonce = () => "uTeLPs6K";
OAuth.getTimestamp = () => "1524771555";

describe("OAuth Signer", function() {
	describe("#toOAuthParamString()", function() {
		const queryParams = OAuth.extractQueryParams(`HTTPS://SANDBOX.api.mastercard.com/merchantid/v1/merchantid?MerchantId=GOOGLE%20LTD%20ADWORDS%20%28CC%40GOOGLE.COM%29&Format=XML&Type=ExactMatch&Format=JSON`);
		const oauthParams = OAuth.getOAuthParams("aaa!aaa");

		it("Creates a correctly encoded and sorted OAuth parameter string", function() {
			const paramString = toOAuthParamString(queryParams, oauthParams);
			assert.equal(paramString, "Format=JSON&Format=XML&MerchantId=GOOGLE%20LTD%20ADWORDS%20%28CC%40GOOGLE.COM%29&Type=ExactMatch&oauth_consumer_key=aaa!aaa&oauth_nonce=uTeLPs6K&oauth_signature_method=RSA-SHA256&oauth_timestamp=1524771555&oauth_version=1.0");
		});
	});
});
