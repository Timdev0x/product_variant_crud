const axios = require('axios');
const Shopify = require('shopify-api-node');
require('dotenv').config();

const { SHOPIFY_API_KEY, SHOPIFY_API_PASSWORD, SHOPIFY_STORE_NAME } = process.env;

console.log('API Key:', SHOPIFY_API_KEY);
console.log('API Password:', SHOPIFY_API_PASSWORD);
console.log('Store Name:', SHOPIFY_STORE_NAME);

const shopify = new Shopify({
  shopName: SHOPIFY_STORE_NAME,
  apiKey: SHOPIFY_API_KEY,
  password: SHOPIFY_API_PASSWORD
});

// Create variant
async function createVariant() {
  const variant = {
    product_id: 7712905592972,
    option1: "pink",
    price: "204.00"
  };

  try {
    const response = await shopify.productVariant.create(variant.product_id, variant);
    console.log('Created variant', response);
  } catch (error) {
    console.error('Error creating Variant:', error);
  }
}

// createVariant();

// Fetch all variants
async function getVariants(product_id) {
  try {
    const response = await shopify.productVariant.list(product_id);
    console.log('Product Variants:', response);
  } catch (error) {
    console.log('Error getting variants:', error);
  }
}

// Uncomment to test fetching variants
// getVariants(7712835797132);

// Update Variant
async function updateVariant(variant_id) {
  const updateVariant = {
    id: variant_id,
    option1: 'Pink',
    price: '800.00'
  };
  try {
    const response = await shopify.productVariant.update(variant_id, updateVariant);
    console.log('Updated Variant:', response);
  } catch (error) {
    console.log('Error updating variant:', error);
  }
}

// Uncomment to test updating a variant
 updateVariant(42930067439756);

// Delete Variant
async function deleteVariant(product_id, variant_id) {
  try {
    const response = await shopify.productVariant.delete(variant_id);
    console.log(`Deleted variant with id ${variant_id}`);
  } catch (error) {
    console.error('Error deleting variant:', error);
    if (error.response) {
      console.error('Response status:', error.response.statusCode);
      console.error('Response body:', error.response.body);
    }
  }
}

// Test deleting a variant
// deleteVariant(7712905592972, 42930067439756);