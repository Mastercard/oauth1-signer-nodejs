const assert = require("assert");
const sinon = require("sinon");
const OAuth = require("../src/OAuth");
const getOAuthParams = require("../src/OAuth").getOAuthParams;

describe("OAuth Signer", function() {
	describe("#getOAuthParams()", function() {

		const consumerKey = "aaa!aaa";
		const myPayload = `{ my: "payload" }`;
		const fixedNonce = "fixed-nonce";
		const fixedTimestamp = "1234567890";

		beforeEach(function() {
			sinon.stub(OAuth, "getNonce").returns(fixedNonce);
			sinon.stub(OAuth, "getTimestamp").returns(fixedTimestamp);
		});

		afterEach(function() {
			sinon.restore();
		});

		[
			{
				desc: "uses RSA-SHA256 by default with empty payload",
				payload: undefined,
				signatureMethod: undefined,
				expectedSignatureMethod: "RSA-SHA256"
			},
			{
				desc: "uses RSA-PSS when requested",
				payload: myPayload,
				signatureMethod: OAuth.SignatureMethod.RSA_PSS_SHA256,
				expectedSignatureMethod: "RSA-PSS"
			}
		].forEach(function(testCase) {
			it(`Creates a Map with expected values (${testCase.desc})`, function() {
				const oauthParams = getOAuthParams(consumerKey, testCase.payload, testCase.signatureMethod);
				const expectedBodyHash = OAuth.getBodyHash(testCase.payload || "");
				const expectedEntries = [
					["oauth_body_hash", expectedBodyHash],
					["oauth_consumer_key", consumerKey],
					["oauth_nonce", fixedNonce],
					["oauth_signature_method", testCase.expectedSignatureMethod],
					["oauth_timestamp", fixedTimestamp],
					["oauth_version", "1.0"]
				];

				assert.deepEqual(Array.from(oauthParams.entries()), expectedEntries);
			});
		});
	});
});
