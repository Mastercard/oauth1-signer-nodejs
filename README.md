# Table of contents
- [Overview](#overview)
  * [Compatibility](#compatibility)
  * [References](#references)
- [Usage](#usage)
  * [Prerequisites](#prerequisites)
  * [Creating a valid OAuth string](#creating-a-valid-oauth-string)
  * [Initializing the private key](#initializing-the-private-key)
  
# Overview
Zero dependency library for generating a Mastercard API compliant OAuth signature.

## Compatibility
Node 6.12.3+

## References
[OAuth 1.0a specification](https://tools.ietf.org/html/rfc5849)

[Body hash extension for non application/x-www-form-urlencoded payloads](https://tools.ietf.org/id/draft-eaton-oauth-bodyhash-00.html)

# Usage
## Prerequisites
Before using this library, you will need to set up a project and key in the [Mastercard Developers Portal](https://developer.mastercard.com). 

The two key pieces of information you will need are:

* Consumer key
* Private key matching the public key uploaded to Mastercard Developer Portal

## Creating a valid OAuth string
The method that does all the heavy lifting is `OAuth.getAuthorizationHeader`. You can call into it directly and as long as you provide the correct parameters, it will return a string that you can add into your request's `Authorization` header.

```javascript
	const consumerKey = "<insert consumer key from developer portal>";
	const signingKey = "<initialize private key matching the consumer key>";
	const uri = "https://sandbox.api.mastercard.com/service";
	const method = "GET";
	const payload = "Hello world!";

	const authHeader = OAuth.getAuthorizationHeader(uri, method, payload, consumerKey, signingKey);
```

## Initializing the private key
The following script shows how to intialize the private key using `node-forge`.

```javascript
const forge = require("node-forge");
const fs = require("fs");

const keyStorePath = "<insert path to p12 file>";
const keyAlias = "<insert key alias from developer portal>";
const keyPassword = "<insert keystore password>";

const p12Content = fs.readFileSync(keyStorePath, 'binary');

const _getPrivateKey = function (p12Content, alias, password) {

    // Get asn1 from DER
    var p12Asn1 = forge.asn1.fromDer(p12Content, false);

    // Get p12 using the password
    var p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, password);

    // Get Key from p12
    var keyObj = p12.getBags({
        friendlyName: alias,
        bagType: forge.pki.oids.pkcs8ShroudedKeyBag
    }).friendlyName[0];

    var key = keyObj.key;

    // Get private key as PEM
    var pem = forge.pki.privateKeyToPem(key);

    return pem;
};
```
