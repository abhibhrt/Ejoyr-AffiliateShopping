const express = require('express');
const crypto = require('crypto');
const axios = require('axios');
const router = express.Router();

const accessKey = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_KEY;
const associateTag = process.env.AWS_ASSOCIATE_TAG;
const region = process.env.AWS_REGION || 'us-east-1';
const host = 'webservices.amazon.in';
const path = '/paapi5/searchitems';
const endpoint = `https://${host}${path}`;

router.get('/products', async (req, res) => {
    const keywords = req.query.keywords || 'laptop';

    const payloadObject = {
        "Keywords": "laptop",
        "Resources": [
            "BrowseNodeInfo.BrowseNodes",
            "BrowseNodeInfo.BrowseNodes.Ancestor",
            "BrowseNodeInfo.BrowseNodes.SalesRank",
            "BrowseNodeInfo.WebsiteSalesRank",
            "CustomerReviews.Count",
            "CustomerReviews.StarRating",
            "Images.Primary.Small",
            "Images.Primary.Medium",
            "Images.Primary.Large",
            "Images.Primary.HighRes",
            "Images.Variants.Small",
            "Images.Variants.Medium",
            "Images.Variants.Large",
            "Images.Variants.HighRes",
            "ItemInfo.ByLineInfo",
            "ItemInfo.ContentInfo",
            "ItemInfo.ContentRating",
            "ItemInfo.Classifications",
            "ItemInfo.ExternalIds",
            "ItemInfo.Features",
            "ItemInfo.ManufactureInfo",
            "ItemInfo.ProductInfo",
            "ItemInfo.TechnicalInfo",
            "ItemInfo.Title",
            "ItemInfo.TradeInInfo",
            "Offers.Listings.Availability.MaxOrderQuantity",
            "Offers.Listings.Availability.Message",
            "Offers.Listings.Availability.MinOrderQuantity",
            "Offers.Listings.Availability.Type",
            "Offers.Listings.Condition",
            "Offers.Listings.Condition.ConditionNote",
            "Offers.Listings.Condition.SubCondition",
            "Offers.Listings.DeliveryInfo.IsAmazonFulfilled",
            "Offers.Listings.DeliveryInfo.IsFreeShippingEligible",
            "Offers.Listings.DeliveryInfo.IsPrimeEligible",
            "Offers.Listings.DeliveryInfo.ShippingCharges",
            "Offers.Listings.IsBuyBoxWinner",
            "Offers.Listings.LoyaltyPoints.Points",
            "Offers.Listings.MerchantInfo",
            "Offers.Listings.Price",
            "Offers.Listings.ProgramEligibility.IsPrimeExclusive",
            "Offers.Listings.ProgramEligibility.IsPrimePantry",
            "Offers.Listings.Promotions",
            "Offers.Listings.SavingBasis",
            "Offers.Summaries.HighestPrice",
            "Offers.Summaries.LowestPrice",
            "Offers.Summaries.OfferCount",
            "ParentASIN",
            "RentalOffers.Listings.Availability.MaxOrderQuantity",
            "RentalOffers.Listings.Availability.Message",
            "RentalOffers.Listings.Availability.MinOrderQuantity",
            "RentalOffers.Listings.Availability.Type",
            "RentalOffers.Listings.BasePrice",
            "RentalOffers.Listings.Condition",
            "RentalOffers.Listings.Condition.ConditionNote",
            "RentalOffers.Listings.Condition.SubCondition",
            "RentalOffers.Listings.DeliveryInfo.IsAmazonFulfilled",
            "RentalOffers.Listings.DeliveryInfo.IsFreeShippingEligible",
            "RentalOffers.Listings.DeliveryInfo.IsPrimeEligible",
            "RentalOffers.Listings.DeliveryInfo.ShippingCharges",
            "RentalOffers.Listings.MerchantInfo",
            "SearchRefinements"
        ],
        "PartnerTag": "ejoyr-21",
        "PartnerType": "Associates",
        "Marketplace": "www.amazon.in",
        "Operation": "SearchItems"
    };

    const payload = JSON.stringify(payloadObject);

    // Date setup
    const now = new Date();
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '') + 'Z';
    const dateStamp = amzDate.slice(0, 8);

    const hashedPayload = crypto.createHash('sha256').update(payload).digest('hex');

    const canonicalHeaders =
        'content-encoding:amz-1.0\n' +
        'content-type:application/json; charset=UTF-8\n' +
        `host:${host}\n` +
        `x-amz-date:${amzDate}\n` +
        'x-amz-target:com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems\n';

    const signedHeaders = 'content-encoding;content-type;host;x-amz-date;x-amz-target';

    const canonicalRequest = [
        'POST',
        path,
        '',
        canonicalHeaders,
        signedHeaders,
        hashedPayload
    ].join('\n');

    const credentialScope = `${dateStamp}/${region}/execute-api/aws4_request`;

    const stringToSign = [
        'AWS4-HMAC-SHA256',
        amzDate,
        credentialScope,
        crypto.createHash('sha256').update(canonicalRequest).digest('hex')
    ].join('\n');

    const getSignatureKey = (key, dateStamp, regionName, serviceName) => {
        const kDate = crypto.createHmac('sha256', 'AWS4' + key).update(dateStamp).digest();
        const kRegion = crypto.createHmac('sha256', kDate).update(regionName).digest();
        const kService = crypto.createHmac('sha256', kRegion).update(serviceName).digest();
        return crypto.createHmac('sha256', kService).update('aws4_request').digest();
    };

    const signingKey = getSignatureKey(secretKey, dateStamp, region, 'execute-api');
    const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');

    const authorizationHeader = `AWS4-HMAC-SHA256 Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    const headers = {
        'Content-Encoding': 'amz-1.0',
        'Content-Type': 'application/json; charset=UTF-8',
        'Host': host,
        'X-Amz-Date': amzDate,
        'X-Amz-Target': 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems',
        'Authorization': authorizationHeader
    };

    try {
        const response = await axios.post(endpoint, payload, { headers });
        res.json(response.data);
    } catch (error) {
        console.error('Amazon API Error:', error.response?.data || error.message);
        res.status(500).json({
            error: 'Amazon API request failed',
            details: error.response?.data || error.message
        });
    }
});

module.exports = router;
