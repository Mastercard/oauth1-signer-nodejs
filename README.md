# Table of contents
- [Overview](#overview)
  * [Compatibility](#compatibility)
  * [References](#references)
- [Usage](#usage)
  * [Prerequisites](#prerequisites)
  * [Creating a valid OAuth string](#creating-a-valid-oauth-string)

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
