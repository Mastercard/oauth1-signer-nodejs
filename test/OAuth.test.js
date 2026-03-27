const assert = require('assert');
const sinon = require("sinon");
const OAuth = require("../src/OAuth");

describe("OAuth Signer", function() {
	describe("#getAuthorizationHeader()", function() {
		const uri = "HTTPS://SANDBOX.api.mastercard.com/merchantid/v1/merchantid?MerchantId=GOOGLE%20LTD%20ADWORDS%20%28CC%40GOOGLE.COM%29&Type=ExactMatch&Format=JSON";
		const method = "GET";
		const consumerKey = "aaa!aaa";
		const signingKey = "dummy";
		let sandbox;
		let oauthParamsSpy;
		let signSbsStub;

		beforeEach(function() {
			sandbox = sinon.createSandbox();
			oauthParamsSpy = sandbox.spy(OAuth, "getOAuthParams");
			sandbox.stub(OAuth, "getNonce").returns("uTeLPs6K");
			sandbox.stub(OAuth, "getTimestamp").returns("1524771555");
			signSbsStub = sandbox.stub(OAuth, "signSignatureBaseString").returns("RSA_SIGNATURE");
		});

		afterEach(function() {
			sandbox.restore();
		});

		it("Creates a valid OAuth1.0a header value", function() {
			const header = OAuth.getAuthorizationHeader(uri, method, "{}", consumerKey, signingKey);
			assert.equal(header, `OAuth oauth_body_hash="RBNvo1WzZ4oRRq0W9+hknpT7T8If536DEMBg9hyq/4o=",oauth_consumer_key="aaa!aaa",oauth_nonce="uTeLPs6K",oauth_signature_method="RSA-SHA256",oauth_timestamp="1524771555",oauth_version="1.0",oauth_signature="RSA_SIGNATURE"`);
		});

		it("Creates a valid OAuth1.0a header value with body hash of the empty string when no payload", function() {
			const header = OAuth.getAuthorizationHeader(uri, method, null, consumerKey, signingKey);
			assert.equal(header, `OAuth oauth_body_hash="47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",oauth_consumer_key="aaa!aaa",oauth_nonce="uTeLPs6K",oauth_signature_method="RSA-SHA256",oauth_timestamp="1524771555",oauth_version="1.0",oauth_signature="RSA_SIGNATURE"`);
		});

		[
			{
				desc: "defaults to RSA-SHA256",
				signatureMethod: undefined,
				expectedMethod: OAuth.SignatureMethod.RSA_SHA256,
				payload: "{}"
			},
			{
				desc: "uses RSA-PSS when provided",
				signatureMethod: OAuth.SignatureMethod.RSA_PSS_SHA256,
				expectedMethod: OAuth.SignatureMethod.RSA_PSS_SHA256,
				payload: "{}"
			}
		].forEach(function(testCase) {
			it(`passes signatureMethod through (${testCase.desc})`, function() {
				OAuth.getAuthorizationHeader(uri, method, testCase.payload, consumerKey, signingKey, testCase.signatureMethod);

				assert.equal(oauthParamsSpy.calledOnce, true);
				const oauthArgs = oauthParamsSpy.firstCall.args;
				assert.deepEqual(oauthArgs, [consumerKey, testCase.payload, testCase.expectedMethod]);

				assert.equal(signSbsStub.calledOnce, true);
				const signArgs = signSbsStub.firstCall.args;
				assert.equal(signArgs[2], testCase.expectedMethod);
			});
		});
	});
});
